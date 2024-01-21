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

  public addUser(data: any):Observable<any>{
    console.log(data);
    return this.http.post<any>(`${this.url}/add-user`, data, this.httpOptions).pipe(catchError(err=>{
      console.log(err);
      return EMPTY;
    }));
  }

  public addTrack(data: any):Observable<any>{
    return this.http.post<any>(`${this.url}/add-track`, data, this.
    httpOptions).pipe(catchError(err=>{
      console.log(err);
      return EMPTY;
    }));
  }

  public deleteTrack(index:number):Observable<any>{
    return this.http.delete(`${this.url}/data/${index}`).pipe(
      catchError((error) => {
        console.error('Wystąpił błąd', error)
        return EMPTY;
      })
      )
    ;
  }

  public login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, { login, password }, this.httpOptions)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  private setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
