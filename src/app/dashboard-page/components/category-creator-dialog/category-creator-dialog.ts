import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { noWhitespaceValidator } from '../../../shared/validators/no-whitespace';

import { CategoriesService } from '../../../core/api/categories/categories-service';

export interface CategoryCreatorDialogData {
  id?: string;
  title?: string;
}

@Component({
  selector: 'app-category-creator-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,

    ReactiveFormsModule,
  ],
  templateUrl: './category-creator-dialog.html',
  styleUrl: './category-creator-dialog.scss',
})
export class CategoryCreatorDialog {
  private readonly _categoriesService = inject(CategoriesService);

  protected readonly dialogRef = inject(MatDialogRef<CategoryCreatorDialog>);
  protected readonly data = inject<CategoryCreatorDialogData>(MAT_DIALOG_DATA);

  protected isLoading = this._categoriesService.isLoading;

  protected titleControl = new FormControl('', [
    noWhitespaceValidator,

    Validators.required,
    Validators.maxLength(100),
  ]);

  protected errorMessage = signal('');

  constructor() {
    merge(this.titleControl.statusChanges, this.titleControl.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    if (this.data?.title) {
      this.titleControl.setValue(this.data.title);
    }
  }

  get isEditMode() {
    return !!this.data?.id;
  }

  submit(): void {
    if (this.titleControl.invalid) {
      this.titleControl.markAsTouched();
      return;
    }

    const title = this.titleControl.value!.trim();

    if (this.isEditMode) {
      this._categoriesService.update(this.data!.id!, { title });
    } else {
      this._categoriesService.create({ title });
    }

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateErrorMessage(): void {
    if (this.titleControl.hasError('required')) {
      this.errorMessage.set('Title is required');
    } else if (this.titleControl.hasError('maxlength')) {
      this.errorMessage.set('Max length is 100 characters');
    } else if (this.titleControl.hasError('whitespace')) {
      this.errorMessage.set('Title cannot contain only spaces');
    } else {
      this.errorMessage.set('');
    }
  }
}
