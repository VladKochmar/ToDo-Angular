import { Component } from '@angular/core';

import { ITaskResponse } from '../core/api/todo-api';

import { Sidebar } from './components/sidebar/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TaskItem } from './components/task-item/task-item';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-dashboard-page',
  imports: [FormsModule, MatButtonModule, MatIconModule, Sidebar, TaskItem, MatInputModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected tasks: ITaskResponse[] = [
    {
      id: '1',
      title: 'Develope todo app',
      isCompleted: false,
      description: 'Some description of a task for better understanding.',
      dueDate: '2026-05-5 16:05',
      categoryName: 'Work',
      categoryId: '2',
    },
    {
      id: '2',
      title: 'Learn C#',
      isCompleted: true,
      description: null,
      dueDate: null,
      categoryName: 'Work',
      categoryId: '2',
    },
    {
      id: '3',
      title: 'Swim',
      isCompleted: false,
      description: null,
      dueDate: null,
      categoryName: null,
      categoryId: null,
    },
  ];

  protected newTaskTitle = '';

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
