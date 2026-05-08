import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'todo-tasks-empty',
  imports: [MatIconModule],
  templateUrl: './tasks-empty.html',
  styleUrl: './tasks-empty.scss',
})
export class TasksEmpty {}
