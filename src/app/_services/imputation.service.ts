import { Injectable } from '@angular/core';
import { Imputation } from './../_models/imputation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {

  constructor(private http: HttpClient) { }

  update(imput:Imputation){
  return this.http.post(`${environment.apiUrl}/imputations/`,imput);
}
}
