import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, signal } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ICategoryResponse } from '../../../core/api/todo-api';

import { SidebarHeader } from '../sidebar-header/sidebar-header';
import { CategoryCreatorDialog } from '../category-creator-dialog/category-creator-dialog';
import { MatDivider } from '@angular/material/divider';
import { CategoriesList } from '../categories-list/categories-list';

@Component({
  selector: 'todo-sidebar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    SidebarHeader,
    MatDivider,
    CategoriesList,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy {
  protected readonly dialog = inject(MatDialog);

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 768px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  openDialog(): void {
    this.dialog.open(CategoryCreatorDialog);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
