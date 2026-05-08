import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Sidebar } from './components/sidebar/sidebar';
import { TaskItem } from './components/task-item/task-item';

import { TasksService } from '../core/api/tasks/tasks-service';
import { IUpdateTaskRequest } from '../core/api/todo-api';
import { CategoriesService } from '../core/api/categories/categories-service';

import { noWhitespaceValidator } from '../shared/validators/no-whitespace';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'todo-dashboard-page',
  imports: [
    ReactiveFormsModule,

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

  protected newTaskTitleControl = new FormControl('', [
    noWhitespaceValidator,

    Validators.required,
    Validators.maxLength(255),
  ]);

  protected errorMessage = signal('');

  constructor() {
    merge(this.newTaskTitleControl.statusChanges, this.newTaskTitleControl.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      const categoryId = params.get('category');

      if (!categoryId) {
        this._tasksService.load();
        return;
      }

      this._tasksService.loadByCategory(categoryId);
    });
  }

  createTask(): void {
    if (this.newTaskTitleControl.invalid) {
      this.newTaskTitleControl.markAsTouched();
      return;
    }

    const title = this.newTaskTitleControl.value!.trim();

    this._tasksService.create({ title });

    this.newTaskTitleControl.reset();
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
    this.newTaskTitleControl.reset();
  }

  updateErrorMessage(): void {
    if (this.newTaskTitleControl.hasError('required')) {
      this.errorMessage.set('Title is required');
    } else if (this.newTaskTitleControl.hasError('maxlength')) {
      this.errorMessage.set('Max length is 100 characters');
    } else if (this.newTaskTitleControl.hasError('whitespace')) {
      this.errorMessage.set('Title cannot contain only spaces');
    } else {
      this.errorMessage.set('');
    }
  }
}
