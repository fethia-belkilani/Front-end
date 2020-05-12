import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ProjectService } from './../../../_services/project.service';
import { Project } from './../../../_models/project';
import { EventService } from './../../../_services/event.service';
import { NzModalService } from 'ng-zorro-antd/modal';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private projectService:ProjectService, private eventService: EventService,private modal:NzModalService) { }
  
  intialProjectList: Array<Project> = [];
  projectList: Array<Project> = [];
  editField: string;
  weekImputations:any[]
  map=new Map()
  weekEvents:any[]


  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment();
  today = moment().format("YYYY-MM-DD");
  currentWeek = this.getWeek(this.x);
  isVisible = false;
  private modalService: NgbModal
  private selectedProject;
  private weekStartDay;

  ngOnInit() {
    this.getProjects();
  }

  getWeek(dt) {
    var weekStart = dt.clone().startOf('isoWeek');
    this.weekStartDay = weekStart;
    //console.log(this.weekStartDay)
    var weekEnd = dt.clone().endOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD')

      );
    }
    return days;
  }
 

  next() {
    this.x = this.x.weekday(8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
    this.getImputations(this.selectedProject.id,this.x.format('YYYY-MM-DD'))
    this.getEvents(this.x.format('YYYY-MM-DD'))


  }

  prev() {
    this.x = this.x.weekday(-8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
    this.getImputations(this.selectedProject.id,this.x.format('YYYY-MM-DD'))
    this.getEvents(this.x.format('YYYY-MM-DD'))

    
  }

  formDay(date:Date){
    return moment(date).format("YYYY-MM-DD")
  }
  ///////////////////////////////////  Table code   ////////////////////////////////////////////////////


    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.projectList[id][property] = editField;
    }

    remove(id: any) {
      this.projectList.splice(id, 1);
    }
   
 
    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
  
  getProjects(){
    this.projectService.getProjects().subscribe(
      res=>{
       this.intialProjectList= res;  
       //console.log(res)    
        },
      err=>{
        console.log(err);
      }
    )
  }

 getImputations(projectId:number,date:string){
   this.projectService.getWeekImputations(projectId,date).subscribe(
      imputationData=>{
        let weekImp: Array<any> = [];
        this.currentWeek.forEach(day => {
          let obj = {
            date: null,
            hours: null,
            id: null,
            state: null
          };
          imputationData.forEach(element => {
            if(day === this.formDay(new Date(element.date))) {
              obj = element;
            }
          });
          weekImp.push(obj)
        });
      // this.weekImputations=weekImp
      this.map.set(projectId,weekImp)
      console.log(this.map)
      // console.log(this.weekImputations)    
        },
      err=>{
        console.log(err);
      }
    )   
  }

  getEvents(date:string){
    this.eventService.getWeekEvents(date).subscribe(
       eventData=>{
         let weekEv: Array<any> = [];
         this.currentWeek.forEach(day => {
           let obj = {
             id:null,
             title: null,
             start: null,
             end: null,
           };
           eventData.forEach(element => {
             if(day === this.formDay(new Date(element.start))) {
               obj = element;
             }
           });
           weekEv.push(obj)
         });
        this.weekEvents = weekEv;  
       // console.log(this.weekEvents)    
         },
       err=>{
         console.log(err);
       }
     )   
   }
 

  /////////////////////////////   Modal code   ///////////////////////////////////////////
 

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
    this.getImputations(this.selectedProject.id,this.x.format('YYYY-MM-DD'))
    this.getEvents(this.x.format('YYYY-MM-DD'))

  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ////////////////////////////////  List Code /////////////////////////////////////////////////////////

  add() {  
    if(!(this.projectList.find(project=>project.id===this.selectedProject.id)))
    {this.projectList.push(this.selectedProject)
    this.handleOk()   }    
    else{
      this.warning()
    }                    
  }

  onChange(selectedProject){
    this.selectedProject = selectedProject
    //console.log(selectedProject)
  }



  warning(): void {
    this.modal.warning({
      nzTitle: 'Warning',
      nzContent: 'Ce projet est déja sélectionné'
    });
  }
}
