import { Component, inject, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CategoriesService } from '../../../core/api/categories/categories-service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { CategoryCreatorDialog } from '../category-creator-dialog/category-creator-dialog';

@Component({
  selector: 'todo-categories-list',
  imports: [MatIconModule, MatListModule, MatMenuModule, MatProgressSpinnerModule],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
})
export class CategoriesList implements OnInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _categoriesService = inject(CategoriesService);

  protected categories = this._categoriesService.categories;
  protected isLoading = this._categoriesService.isLoading;

  ngOnInit(): void {
    this._categoriesService.load();
  }

  openEditDialog(id: string, title: string) {
    this._dialog.open(CategoryCreatorDialog, {
      data: {
        id,
        title,
      },
    });
  }

  openConfirmationDialog(id: string) {
    const dialogRef = this._dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete category',
        text: 'Are you sure you want to delete this category?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._categoriesService.delete(id);
      }
    });
  }
}
