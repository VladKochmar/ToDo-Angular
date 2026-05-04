import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, forkJoin, map, switchMap, take } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private _auth = inject(AuthService);
  private _httpClient = inject(HttpClient);
  private _isSynced = false;

  syncUser() {
    if (this._isSynced) return;

    forkJoin({
      idToken: this._auth.idTokenClaims$.pipe(
        take(1),
        map((claims) => claims?.__raw),
      ),
      accessToken: this._auth.getAccessTokenSilently().pipe(take(1)),
    })
      .pipe(
        filter(({ idToken, accessToken }) => !!idToken && !!accessToken),
        switchMap(({ idToken, accessToken }) => {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
            'x-id-token': idToken!,
          });

          return this._httpClient.post(`${environment.apiUrl}/users`, {}, { headers });
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Synced!', response);
          this._isSynced = true;
        },
        error: (err) => console.error('Sycn failed', err),
      });
  }
}
