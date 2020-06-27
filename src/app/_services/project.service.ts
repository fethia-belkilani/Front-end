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
    this.user=this.authenticationService.currentUserValue
    return this.http.get<Array<Project>>(`${environment.apiUrl}/projects/user/${this.user.id}`); 

  }

  getProjectCollabs(projectId) :Observable<Array<User>>{
    return this.http.get<Array<User>>(`${environment.apiUrl}/users/team/${this.user.id}/${projectId}`); 

  }

getWeekImputations(userId:number,projectId:number,date:string):Observable<Array<Imputation>>{
  return this.http.get<Array<Imputation>>(`${environment.apiUrl}/imputations/weekimputations/${userId}/${projectId}/${date}`);

}

getSentImputations(userId:number,projectId:number,date:string):Observable<Array<Imputation>>{
  return this.http.get<Array<Imputation>>(`${environment.apiUrl}/imputations/sentweekimputations/${userId}/${projectId}/${date}`);

}

deleteProject(id: number): Observable<Project> {
  return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`);
}

getProjectWeekImputations(projectId:number,date:string):Observable<Array<number>>{
  return this.http.get<Array<number>>(`${environment.apiUrl}/projects/projectimputations/${projectId}/${date}`);

}

}