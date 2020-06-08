import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../_models/project';
import { Imputation } from './../_models/imputation';
import { AuthenticationService } from 'src/app/_services';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,private authenticationService:AuthenticationService) { }
  user=this.authenticationService.currentUserValue

  getProjects() :Observable<Array<Project>>{
    return this.http.get<Array<Project>>(`${environment.apiUrl}/projects/user/${this.user.id}`); 

}

getWeekImputations(projectId:number,date:string):Observable<Array<Imputation>>{
  return this.http.get<Array<Imputation>>(`${environment.apiUrl}/projects/weekimputations/${this.user.id}/${projectId}/${date}`);


}

deleteProject(id: number): Observable<Project> {
  return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`);
}

}