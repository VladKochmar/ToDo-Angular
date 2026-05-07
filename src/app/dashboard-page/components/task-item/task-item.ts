import { FormsModule } from '@angular/forms';
import { Component, inject, input, output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCard, MatCardContent } from '@angular/material/card';

import { ICategoryResponse, ITaskResponse, IUpdateTaskRequest } from '../../../core/api/todo-api';

import { TaskDetailsDialog } from '../task-details-dialog/task-details-dialog';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'todo-task-item',
  imports: [
    FormsModule,

    MatCard,
    MatIconModule,
    MatCardContent,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  readonly task = input.required<ITaskResponse>();
  readonly categories = input.required<ICategoryResponse[]>();

  readonly delete = output<string>();
  readonly update = output<{ id: string; updatedTask: IUpdateTaskRequest }>();

  readonly dialog = inject(MatDialog);

  updateStatus(): void {
    this.update.emit({
      id: this.task().id!,

      updatedTask: {
        title: this.task().title,
        isCompleted: !this.task().isCompleted,
        description: this.task().description,
        dueDate: this.task().dueDate,
        categoryId: this.task().categoryId,
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDetailsDialog, {
      data: {
        task: this.task(),
        categories: this.categories(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.update.emit({
        id: this.task().id!,
        updatedTask: result,
      });
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete task',
        text: 'Are you sure you want to delete this task?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(this.task().id!);
      }
    });
  }
}
