import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project, Userr } from '../_models/project';
import { Imputation } from './../_models/imputation';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAll() :Observable<Array<Userr>>{
   
    return this.http.get<Array<Userr>>(`${environment.apiUrl}/users`);
   
}
   
  
}
