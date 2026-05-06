import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../../core/api/categories/categories-service';

export interface CategoryCreatorDialogData {
  id?: string;
  title?: string;
}

@Component({
  selector: 'app-category-creator-dialog',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-creator-dialog.html',
  styleUrl: './category-creator-dialog.scss',
})
export class CategoryCreatorDialog {
  private readonly _categoriesService = inject(CategoriesService);
  protected readonly dialogRef = inject(MatDialogRef<CategoryCreatorDialog>);
  protected readonly data = inject<CategoryCreatorDialogData>(MAT_DIALOG_DATA);

  protected title = '';
  protected isLoading = this._categoriesService.isLoading;

  constructor() {
    if (this.data?.title) {
      this.title = this.data.title;
    }
  }

  get isEditMode() {
    return !!this.data?.id;
  }

  submit() {
    if (!this.title.trim()) return;

    if (this.isEditMode) {
      this._categoriesService.update(this.data!.id!, { title: this.title });
    } else {
      this._categoriesService.create({ title: this.title });
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
