import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  text: string;
  action: Function;
}

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
})
export class ConfirmationDialog {
  private readonly _dialogRef = inject(MatDialogRef<ConfirmationDialog>);
  protected readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  close() {
    this._dialogRef.close();
  }

  confirm() {
    this.data.action();
    this._dialogRef.close();
  }
}
