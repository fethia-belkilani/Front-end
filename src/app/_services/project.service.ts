import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../_models/project';
import { Imputation } from './../_models/imputation';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects() :Observable<Array<Project>>{
    return this.http.get<Array<Project>>(`${environment.apiUrl}/projects/user/1`); 

}

getWeekImputations(projectId:number,date:string):Observable<Array<Imputation>>{
  return this.http.get<Array<Imputation>>(`${environment.apiUrl}/projects/1/${projectId}/${date}`);


}

deleteProject(id: number): Observable<Project> {
  return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`);
}

}
