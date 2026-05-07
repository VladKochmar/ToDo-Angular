import { form, FormField } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { ICategoryResponse, ITaskResponse } from '../../../core/api/todo-api';

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

export interface DialogData {
  task: ITaskResponse;
  categories: ICategoryResponse[];
}

@Component({
  selector: 'todo-task-details-dialog',
  imports: [
    FormField,

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
  ],
  templateUrl: './task-details-dialog.html',
  styleUrl: './task-details-dialog.scss',
})
export class TaskDetailsDialog {
  protected isEditMode = false;

  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<TaskDetailsDialog>);

  protected taskModel = signal({
    title: '',
    description: '',
    isCompleted: false,
    categoryId: null as string | null,
    dueDate: null as string | null,
  });

  protected taskForm = form(this.taskModel);

  enableEdit(): void {
    this.isEditMode = true;

    this.taskModel.set({
      title: this.data.task.title ?? '',
      description: this.data.task.description ?? '',
      isCompleted: this.data.task.isCompleted ?? false,
      categoryId: this.data.task.categoryId ?? null,
      dueDate: this.data.task.dueDate ?? null,
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  save(): void {
    this.dialogRef.close(this.taskModel());
  }

  close(): void {
    this.dialogRef.close();
  }
}
