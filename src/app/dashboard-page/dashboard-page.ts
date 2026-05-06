import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Sidebar } from './components/sidebar/sidebar';
import { TaskItem } from './components/task-item/task-item';

import { TasksService } from '../core/api/tasks/tasks-service';

@Component({
  selector: 'todo-dashboard-page',
  imports: [
    FormsModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    Sidebar,
    TaskItem,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private readonly _tasksService = inject(TasksService);

  protected tasks = this._tasksService.tasks;
  protected isLoading = this._tasksService.isLoading;

  protected newTaskTitle = '';

  ngOnInit(): void {
    this._tasksService.load();
  }

  createTask() {
    const title = this.newTaskTitle.trim();

    if (!title) return;

    console.log('create task:', title);

    this.newTaskTitle = '';
  }

  clearInput() {
    this.newTaskTitle = '';
  }
}
