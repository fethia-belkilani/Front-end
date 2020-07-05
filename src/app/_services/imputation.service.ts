import { Injectable } from '@angular/core';
import { Imputation } from './../_models/imputation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '.';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {

  constructor(private http: HttpClient,private authenticationService:AuthenticationService) { }
  user=this.authenticationService.currentUserValue

  update(imput:Imputation) {
  return this.http.put(`${environment.apiUrl}/imputations/`,imput);
}

create(imput:Imputation) {
  return this.http.post(`${environment.apiUrl}/imputations/`, imput)
}

changeStatus(status:string, listImput:Imputation[]){
  return this.http.put(`${environment.apiUrl}/imputations/changestatus/${status}/`,listImput);
}

getSum(projectId:number) :Observable<any>{
  this.user=this.authenticationService.currentUserValue
  return this.http.get<any>(`${environment.apiUrl}/imputations/sum/${this.user.id}/${projectId}`); 

}
}