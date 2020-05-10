import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project} from '../_models/project';
import { Imputation } from './../_models/imputation';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAll() :Observable<Array<User>>{
   
    return this.http.get<Array<User>>(`${environment.apiUrl}/users`);
   
}

update(user:User){
  return this.http.put(`${environment.apiUrl}/users/`,user);

}
   
  
}
