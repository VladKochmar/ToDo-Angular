import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-creator-dialog',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-creator-dialog.html',
  styleUrl: './category-creator-dialog.scss',
})
export class CategoryCreatorDialog {
  protected title = '';

  protected readonly dialogRef = inject(MatDialogRef<CategoryCreatorDialog>);

  cancel() {
    this.title = '';
    this.dialogRef.close();
  }
}
