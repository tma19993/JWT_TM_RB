import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  private url: string = "http://localhost:3000/";
  
  public getData():Observable<any>{
    return this.http.get(`${this.url}/data`).pipe(catchError(err=>{
      console.log(err)
      return EMPTY;
    }))
  }
}
