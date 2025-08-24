import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { enviroment } from '../enviroment/enviroment';
import { GetDebtsDto } from '../Interfaces/GetDebts';
import { Observable } from 'rxjs';


const API_GETDEBTS = "debt/GetDebts";
@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  constructor(private http: HttpService) { }

  GetDebts(parameters: GetDebtsDto): Observable<any>{
      return this.http.Post(enviroment.serviceUrlApi + API_GETDEBTS, parameters)
    }
}
