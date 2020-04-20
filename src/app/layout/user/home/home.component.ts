import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ProjectService } from './../../../_services/project.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  //imputations: any=[];

  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment();
  today = moment().format("l");

  getWeek(dt) {
    var weekStart = dt.clone().startOf('isoWeek');
    var weekEnd = dt.clone().endOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format("l"));
    }
    return days;
  }
  currentWeek = this.getWeek(this.x);
  next() {
    this.x = this.x.weekday(8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
  }
  prev() {
    this.x = this.x.weekday(-8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
    
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  editField: string;

    //projectList: Array<Project> = [];
    projectList: any=[];
    awaitingProjectList: any = [];
    selectedProject: any=[];


    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.projectList[id][property] = editField;
    }

    remove(id: any) {
     // this.awaitingProjectList.push(this.projectList[id]);
      this.projectList.splice(id, 1);
    }
   

    
    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.getProjects();
  }

  

  getProjects(){
    this.projectService.getProjects().subscribe(
      res=>{
       this.projectList=res;   },
      err=>{
        console.log(err);
      }
    ) 
  }

  /////////////////////////////   Modal    //////////////////

  isVisible = false;
  private modalService: NgbModal

  openModal(targetModal) {
   this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static'
   });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ////////////////////

  add() {  
    const project = this.awaitingProjectList[0];
    this.projectList.push(project);
    this.awaitingProjectList.splice(0, 1); 
    this.handleOk()                           

}



  onChange(selectedValue){
    this.awaitingProjectList.push(selectedValue)
    console.log(selectedValue)
  }
  



}
