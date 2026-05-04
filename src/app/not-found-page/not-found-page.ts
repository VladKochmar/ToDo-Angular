import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {
  private _router = inject(Router);
  private _location = inject(Location);

  protected goHome() {
    this._router.navigate(['/']);
  }

  protected goBack() {
    this._location.back();
  }
}
