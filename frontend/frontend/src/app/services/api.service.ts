import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  private url: string = 'http://localhost:3000';

  private httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getData(): Observable<any> {
    return this.http.get(`${this.url}/data`).pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      })
    );
  }
  public login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/login`, { username, password }, this.httpOptions)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Zakładając, że token jest przechowywany w localStorage
    // Tutaj możesz dodać więcej logiki, np. sprawdzenie ważności tokenu
    return !!token;
  }
  private setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
