import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDto } from '../Interfaces/payment';
import { enviroment } from '../enviroment/enviroment';
import { HttpService } from './http.service';

const API_CREATEPAYMENT = "payments/CreatePayment";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor(private http: HttpService) { }

  makePayment(parameters: PaymentDto): Observable<any>{
      return this.http.Post(enviroment.serviceUrlApi + API_CREATEPAYMENT, parameters)
  }
}
