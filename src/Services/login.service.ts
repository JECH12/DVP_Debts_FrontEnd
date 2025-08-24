import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Login } from '../Interfaces/login';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

const API_LOGIN = "login/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpService) { }

  login(parameters: Login): Observable<any>{
    return this.http.Post(enviroment.serviceUrlApi + API_LOGIN, parameters)
  }
}
