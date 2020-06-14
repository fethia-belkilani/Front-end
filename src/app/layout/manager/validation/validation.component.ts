import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../_services';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  constructor( private authenticationService:AuthenticationService, private usersServise:UserService,private projectService:ProjectService){ }
  weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = this.getWeek(this.x);  
  today = moment().format("YYYY-MM-DD");
  alllProjectList: Array<Project> = [];

  private collaboratorsList:User[]=[]
  private selecledProject:Project
  private selecledCollabList:User[]=[]
  private map=new Map()



 
  
  ngOnInit() {
    this.getProjects()
    

  }
 

  
   


  getWeek(dt) {
    var weekStart = dt.clone().startOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD')

      );
    }
    return days;
  }


  next() {
    this.x = this.x.clone().add(1, 'week'); 
    this.currentWeek = this.getWeek(this.x);
 

  }
 
  prev() {
     this.x = this.x.clone().add(-1, 'week'); 
    this.currentWeek = this.getWeek(this.x);

    
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
  this.getProjectTeam(selectedProject.id)
}


onChangeCol(selectedCollaboratorsList){
  this.selecledCollabList=selectedCollaboratorsList
}

getProjectTeam(projectId:number){
  this.projectService.getProjectCollabs(projectId).subscribe(
    res=>{
      this.collaboratorsList=res
     console.log("www",res)
      },
    err=>{
      console.log(err);
    }
  )
}






getImput(usersList:User[],project:Project,date:string){
  usersList.forEach(user=>{
    this.projectService.getWeekImputations(user.id,project.id,date).subscribe(
      imputationData=>{
        let weekImp: Array<any> = [];
        this.currentWeek.forEach(day => {
          let obj = {
            date: null,
            hours: null,
            id: null,
            status: null
          };
          imputationData.forEach(element => {
            if(day === this.formDay(new Date(element.date))) {
              obj = element;
            } 
          });   
          weekImp.push(obj)
        });
        this.map.set(user,weekImp)

      }
    )

    
  })
 
 }



 getAlllimputations(){
   this.getImput(this.selecledCollabList,this.selecledProject,this.x.format('YYYY-MM-DD'))
   
 }


}
