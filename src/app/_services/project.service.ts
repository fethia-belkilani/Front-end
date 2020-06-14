import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../_models/project';
import { Imputation } from './../_models/imputation';
import { User } from '../_models';
import { AuthenticationService } from '.';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,private authenticationService:AuthenticationService) { }
  user=this.authenticationService.currentUserValue

  getProjects() :Observable<Array<Project>>{
    return this.http.get<Array<Project>>(`${environment.apiUrl}/projects/user/${this.user.id}`); 

  }

  getProjectCollabs(projectId) :Observable<Array<User>>{
    return this.http.get<Array<User>>(`${environment.apiUrl}/projects/user/${this.user.id}/project/${projectId}`); 

  }

getWeekImputations(userId:number,projectId:number,date:string):Observable<Array<Imputation>>{
  return this.http.get<Array<Imputation>>(`${environment.apiUrl}/projects/weekimputations/${userId}/${projectId}/${date}`);

}

deleteProject(id: number): Observable<Project> {
  return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`);
}

}