import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateTaskRequest, ITaskResponse, IUpdateTaskRequest } from '../todo-api';
import { environment } from '../../../../environments/environment.development';
import { NotificationService } from '../../../shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _baseUrl = environment.apiUrl;

  private readonly _http = inject(HttpClient);
  private readonly _notificationService = inject(NotificationService);

  private readonly _tasks = signal<ITaskResponse[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly tasks = this._tasks.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.get<ITaskResponse[]>(`${this._baseUrl}/tasks`).subscribe({
      next: (response) => {
        this._tasks.set(response);
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this.error() as string);

        this._isLoading.set(false);
      },
    });
  }

  loadByCategory(categoryId: string): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.get<ITaskResponse[]>(`${this._baseUrl}/categories/${categoryId}/tasks`).subscribe({
      next: (response) => {
        this._tasks.set(response);
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this.error() as string);

        this._isLoading.set(false);
      },
    });
  }

  getTaskById(id: string): Observable<ITaskResponse> {
    return this._http.get<ITaskResponse>(`${this._baseUrl}/tasks/${id}`);
  }

  create(request: ICreateTaskRequest): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.post<ITaskResponse>(`${this._baseUrl}/tasks`, request).subscribe({
      next: (response) => {
        this._tasks.update((prev) => [...prev, response]);
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this.error() as string);

        this._isLoading.set(false);
      },
    });
  }

  update(id: string, request: IUpdateTaskRequest): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.put<void>(`${this._baseUrl}/tasks/${id}`, request).subscribe({
      next: () => {
        this.load();
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this.error() as string);

        this._isLoading.set(false);
      },
    });
  }

  delete(id: string): void {
    this._isLoading.set(true);
    this._error.set(null);

    this._http.delete<void>(`${this._baseUrl}/tasks/${id}`).subscribe({
      next: () => {
        this._tasks.update((prev) => prev.filter((t) => t.id !== id));
        this._isLoading.set(false);
      },
      error: (response) => {
        this._error.set(response.error.detail);
        this._notificationService.show(this.error() as string);

        this._isLoading.set(false);
      },
    });
  }
}
