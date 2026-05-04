import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { IdentityService } from './core/auth/services/identity-service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'todo-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private _auth = inject(AuthService);
  private _identityService = inject(IdentityService);

  ngOnInit(): void {
    this._auth.isAuthenticated$
      .pipe(
        take(1),
        filter((isAuthenticated) => isAuthenticated),
      )
      .subscribe(() => {
        this._identityService.syncUser();
      });
  }
}
