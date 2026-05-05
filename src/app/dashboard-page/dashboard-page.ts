import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular';
import { Sidebar } from './components/sidebar/sidebar';
import { TaskItem } from './components/task-item/task-item';
import { ITaskResponse } from '../core/api/todo-api';

@Component({
  selector: 'todo-dashboard-page',
  imports: [CommonModule, MatButtonModule, MatIconModule, Sidebar, TaskItem],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected auth = inject(AuthService);
  protected task: ITaskResponse = {
    id: '1',
    title: 'Develope todo app',
    isCompleted: false,
    description: 'Some description of a task for better understanding.',
    dueDate: '2026-05-5 16:05',
    categoryName: 'Work',
  };

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
