import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { enviroment } from '../enviroment/enviroment';
import { GetDebtsDto } from '../Interfaces/GetDebts';
import { Observable } from 'rxjs';
import { CreateDebt } from '../Interfaces/CreateDebt';


const API_GETDEBTS = "debt/GetDebts";
const API_GETDEBTBYID = "debt/GetDebt";
const API_CREATEDEBT = "debt/RegisterDebt";

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  constructor(private http: HttpService) { }

  GetDebts(parameters: GetDebtsDto): Observable<any>{
      return this.http.Post(enviroment.serviceUrlApi + API_GETDEBTS, parameters)
    }

  GetDebtById(debtId: number): Observable<any>{
      return this.http.Post(enviroment.serviceUrlApi + API_GETDEBTBYID, debtId)
    }

  CreateDebt(parameters: CreateDebt): Observable<any>{
    return this.http.Post(enviroment.serviceUrlApi + API_CREATEDEBT, parameters)
  }
    
}
