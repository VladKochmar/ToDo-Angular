import { Component, inject, signal } from '@angular/core';

import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';

import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { provideNativeDateAdapter } from '@angular/material/core';

import { ICategoryResponse, ITaskResponse } from '../../../core/api/todo-api';

import { noWhitespaceValidator } from '../../../shared/validators/no-whitespace';
import { DatePipe } from '@angular/common';

export interface DialogData {
  task: ITaskResponse;
  categories: ICategoryResponse[];
}

@Component({
  selector: 'todo-task-details-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

    MatDivider,
    MatChipsModule,
    MatButtonModule,

    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,

    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './task-details-dialog.html',
  styleUrl: './task-details-dialog.scss',
})
export class TaskDetailsDialog {
  protected isEditMode = false;

  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<TaskDetailsDialog>);

  protected taskForm = new FormGroup({
    title: new FormControl('', [
      noWhitespaceValidator,

      Validators.required,
      Validators.maxLength(255),
    ]),

    description: new FormControl<string | null>(null, [Validators.maxLength(500)]),

    isCompleted: new FormControl(false),

    categoryId: new FormControl<string | null>(null),

    dueDate: new FormControl<Date | null>(null),

    dueTime: new FormControl<string | null>(null),
  });

  protected errorMessages = signal({
    title: '',
    description: '',
  });

  constructor() {
    merge(this.taskForm.statusChanges, this.taskForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  enableEdit(): void {
    this.isEditMode = true;

    const dueDate = this.data.task.dueDate ? new Date(this.data.task.dueDate) : null;

    this.taskForm.patchValue({
      title: this.data.task.title ?? '',
      description: this.data.task.description ?? null,
      isCompleted: this.data.task.isCompleted ?? false,
      categoryId: this.data.task.categoryId ?? null,

      dueDate,

      dueTime: dueDate ? this.formatTime(dueDate) : null,
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.getRawValue();

    let dueDate: string | null = null;

    if (formValue.dueDate) {
      const date = new Date(formValue.dueDate);

      if (formValue.dueTime) {
        const [hours, minutes] = formValue.dueTime.split(':');

        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
      }

      dueDate = date.toISOString();
    }

    this.dialogRef.close({
      title: formValue.title!.trim(),
      description: formValue.description,
      isCompleted: formValue.isCompleted,
      categoryId: formValue.categoryId,
      dueDate,
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  updateErrorMessages(): void {
    const { title, description } = this.taskForm.controls;

    this.errorMessages.set({
      title: title.hasError('required')
        ? 'Title is required'
        : title.hasError('maxlength')
          ? 'Max length is 255 characters'
          : title.hasError('whitespace')
            ? 'Title cannot contain only spaces'
            : '',

      description: description.hasError('maxlength') ? 'Max length is 500 characters' : '',
    });
  }

  resetDueDate(): void {
    this.taskForm.patchValue({
      dueDate: null,
      dueTime: null,
    });
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
