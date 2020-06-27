import { Component, OnInit } from '@angular/core';

import { ProjectService } from './../../../_services/project.service';
import { ImputationService } from './../../../_services/imputation.service';
@Component({
  selector: 'app-hello',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private projectService:ProjectService,private imputationService:ImputationService) { }
 private intialProjectList
 private selectedProject;
 private initial=0
 private sent=0;
 private valid=0;
 private total=0



  ngOnInit() {
    this.getProjects()
  
  }   

  getProjects() {
    this.projectService.getProjects().subscribe(
      res => {
        this.intialProjectList = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  onChange(selectedProject) {
    this.selectedProject = selectedProject
  }


  handleOk(): void {
    this.imputationService.getSum(this.selectedProject.id).subscribe(res=>{
      this.initial=this.sent=this.valid=this.total=0;
      this.initial= res[0].count;
      this.sent= res[1].count;
      this.valid= res[2].count;
      this.total= this.initial+this.sent+this.valid
    },err => {
        console.log(err);
      })  }
 
}
