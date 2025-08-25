import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

const API_GETLISTUSERS = "users/GetUsers";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) { }

  GetUsersList(): Observable<any>{
      return this.http.Post(enviroment.serviceUrlApi + API_GETLISTUSERS, null)
    }
}
