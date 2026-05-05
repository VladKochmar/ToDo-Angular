import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'todo-sidebar-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {
  protected logout() {
    console.log('Logged out!');
  }
}
