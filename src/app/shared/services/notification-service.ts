import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _durationInSeconds = 5;
  private readonly _verticalPosition = 'bottom';
  private readonly _horizontalPosition = 'right';

  private readonly _snackBar = inject(MatSnackBar);

  show(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: this._durationInSeconds * 1000,
      verticalPosition: this._verticalPosition,
      horizontalPosition: this._horizontalPosition,
    });
  }
}
