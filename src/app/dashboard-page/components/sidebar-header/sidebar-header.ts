import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-sidebar-header',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {
  private readonly auth = inject(AuthService);

  protected user$ = this.auth.user$;

  logout(): void {
    this.auth.logout({
      logoutParams: {
        redirectTo: window.location.origin,
      },
    });
  }
}
