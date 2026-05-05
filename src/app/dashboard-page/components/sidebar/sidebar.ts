import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ICategoryResponse } from '../../../core/api/todo-api';
import { SidebarHeader } from '../sidebar-header/sidebar-header';

@Component({
  selector: 'todo-sidebar',
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    SidebarHeader,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnDestroy {
  protected categories: ICategoryResponse[] = [
    { id: '1', title: 'Home' },
    { id: '2', title: 'Health' },
    { id: '3', title: 'Job' },
    { id: '4', title: 'Study' },
    { id: '5', title: 'Languages' },
    { id: '6', title: 'Products' },
    { id: '7', title: 'Sport' },
    { id: '8', title: 'Party' },
  ];

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
