import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public Post(URL: string, parameters: any): Observable<any>{
    let body = JSON.stringify(parameters);
    return this.http.post(URL,body, {
      headers:{'Content-Type': 'application/json'}
    });  
  }
}
