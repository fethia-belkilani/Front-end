import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project} from '../_models/project';
import { Imputation } from './../_models/imputation';
import { User } from '../_models/user';
import { AuthenticationService } from '.';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  currentUser:User

  
  
  getAll() :Observable<Array<User>>{
   
    return this.http.get<Array<User>>(`${environment.apiUrl}/users`);
   
}


update(user:User){
  return this.http.put(`${environment.apiUrl}/users/`,user);

}

addCollabs(id:number,collabs:User[])
{
  return this.http.post(`${environment.apiUrl}/users/${id}`,collabs);
}



// this will be removed later (cause we have currentUser)

getCurrentUser():Observable<User>{
  return this.http.get<User>(`${environment.apiUrl}/users/3`);


}





   

}
