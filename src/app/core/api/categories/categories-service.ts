import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryRequest, ICategoryResponse } from '../todo-api';
import { environment } from '../../../../environments/environment.development';
import { NotificationService } from '../../../shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _baseUrl = `${environment.apiUrl}/categories`;

  private readonly _http = inject(HttpClient);
  private readonly _notificationService = inject(NotificationService);

  private readonly _categories = signal<ICategoryResponse[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly categories = this._categories.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.get<ICategoryResponse[]>(this._baseUrl).subscribe({
      next: (response) => {
        console.log(response);
        this._categories.set(response);
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this._error() as string);

        this._isLoading.set(false);
      },
    });
  }

  getById(id: string): Observable<ICategoryResponse> {
    return this._http.get<ICategoryResponse>(`${this._baseUrl}/${id}`);
  }

  create(request: ICategoryRequest): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.post<ICategoryResponse>(this._baseUrl, request).subscribe({
      next: (response) => {
        this._categories.update((prev) => [...prev, response]);
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this._error() as string);

        this._isLoading.set(false);
      },
    });
  }

  update(id: string, request: ICategoryRequest) {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.put<void>(`${this._baseUrl}/${id}`, request).subscribe({
      next: () => {
        this.load();
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this._error() as string);

        this._isLoading.set(false);
      },
    });
  }

  delete(id: string): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.delete<void>(`${this._baseUrl}/${id}`).subscribe({
      next: () => {
        this._categories.update((prev) => prev.filter((c) => c.id !== id));
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this._error() as string);

        this._isLoading.set(false);
      },
    });
  }
}
