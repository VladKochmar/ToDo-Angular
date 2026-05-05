import { FormsModule } from '@angular/forms';
import { Component, inject, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITaskResponse } from '../../../core/api/todo-api';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsDialog } from '../task-details-dialog/task-details-dialog';

@Component({
  selector: 'todo-task-item',
  imports: [
    FormsModule,
    MatCard,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardContent,
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {
  readonly task = input.required<ITaskResponse>();
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(TaskDetailsDialog, {
      data: { task: this.task() },
    });
  }
}
