import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../_services';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { getWeek} from'src/app/common_utils';
import { Imputation } from 'src/app/_models/imputation';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  
  constructor( private authenticationService:AuthenticationService, private usersServise:UserService,private projectService:ProjectService){ }
  weekdays = ["Lundi", "Mardi", "Merdi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = getWeek(this.x);  
  today = moment().format("YYYY-MM-DD");
  alllProjectList: Array<Project> = [];
  private selecledProject:Project
  selectedProjectList: Array<Project> = [];
  private map=new Map()




 
  
  ngOnInit() {
    this.getProjects()
    

  }
 



  next() {
    this.x = this.x.clone().add(1, 'week'); 
    this.currentWeek = getWeek(this.x);
    this.getImput(this.selectedProjectList,this.x.format('YYYY-MM-DD'))



  }
 
  prev() {
     this.x = this.x.clone().add(-1, 'week'); 
    this.currentWeek = getWeek(this.x);
    this.getImput(this.selectedProjectList,this.x.format('YYYY-MM-DD'))



    
  }

  formDay(date:Date){
    return moment(date).format("YYYY-MM-DD")
  }

  formWeek(date:Date){
    return moment(date).format("DD-MM")
  }
  formToday(date:Date){
    return moment(date).format("DD-MM-YYYY")
  }
///////////////////////////

                 
getProjects(){
  this.projectService.getProjects().subscribe(
    res=>{
     this.alllProjectList= res;  
     console.log("ppp",res)
      },
    err=>{
      console.log(err);
    }
  )
}
/////////////////////////////after choosing a project
onChange(selectedProject:Project){
  this.selecledProject = selectedProject
  this.selectedProjectList.push(selectedProject)
}



getImput(projectsList:Project[],date:string){
  projectsList.forEach(proj=>{
      this.projectService.getProjectWeekImputations(proj.id,date).subscribe(
        data=>{
          this.map.set(proj,data)
        }
      ),
      err=>{
        console.log(err);
      }
  })
 
 }



















add(){
this.getImput(this.selectedProjectList,this.x.format('YYYY-MM-DD'))

}



}
