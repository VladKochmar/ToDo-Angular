import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Sidebar } from './components/sidebar/sidebar';
import { TaskItem } from './components/task-item/task-item';

import { TasksService } from '../core/api/tasks/tasks-service';
import { IUpdateTaskRequest } from '../core/api/todo-api';
import { CategoriesService } from '../core/api/categories/categories-service';
import { ActivatedRoute } from '@angular/router';

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
  private readonly _categoriesService = inject(CategoriesService);

  private readonly _route = inject(ActivatedRoute);

  protected tasks = this._tasksService.tasks;
  protected isLoading = this._tasksService.isLoading;

  protected categories = this._categoriesService.categories;

  protected newTaskTitle = '';

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      const categoryId = params.get('category');

      if (!categoryId) {
        this._tasksService.load();
        return;
      }

      this._tasksService.loadByCategory(categoryId);
    });

    this._tasksService.load();
  }

  createTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) return;

    this._tasksService.create({ title });

    this.newTaskTitle = '';
  }

  updateTask(id: string, updatedTask: IUpdateTaskRequest): void {
    this._tasksService.update(id, updatedTask);
  }

  deleteTask(id: string): void {
    if (id.trim()) {
      this._tasksService.delete(id);
    }
  }

  clearInput(): void {
    this.newTaskTitle = '';
  }
}
