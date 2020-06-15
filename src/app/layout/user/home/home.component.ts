import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ProjectService } from './../../../_services/project.service';
import { Project } from './../../../_models/project';
import { EventService } from './../../../_services/event.service';
import { Imputation, Status } from './../../../_models/imputation';
import { ImputationService } from './../../../_services/imputation.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService, UserService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { getWeek} from'src/app/common_utils';
   





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private projectService:ProjectService, private eventService: EventService,
    private modal:NzModalService, private imputationService:ImputationService,
    private authenticationService:AuthenticationService
    
    ) { }
  
  intialProjectList: Array<Project> = [];
  selectedProjectsList: Array<Project> = [];
  editField: string;
  weekImputations:any[]
  map=new Map()
  weekEvents:Event[]
  user=this.authenticationService.currentUserValue
  

  


  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = getWeek(this.x);  
  today = moment().format("YYYY-MM-DD");
  isVisible = false;
  private selectedProject;
  private CurrentUser=this.authenticationService.currentUserValue
  
   

  ngOnInit() { 
    this.getProjects();
    this.getEvents(this.today)
 
  }

 

  next() {
    this.x = this.x.clone().add(1, 'week'); 
    this.currentWeek = getWeek(this.x);
    this.map.forEach((list: Imputation[], project:Project) => {
      this.getImputations(project,this.x.format('YYYY-MM-DD'))
    });  

    this.getEvents(this.x.format('YYYY-MM-DD'))



  }
 
  prev() {
     this.x = this.x.clone().add(-1, 'week'); 
    this.currentWeek = getWeek(this.x);
   this.map.forEach((list: Imputation[], project:Project) => {
    this.getImputations(project,this.x.format('YYYY-MM-DD'))


  });  
    this.getEvents(this.x.format('YYYY-MM-DD'))
    console.log("rr",this.map)


    
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
  ///////////////////////////////////  Table code   ////////////////////////////////////////////////////
  getProjects(){
    this.projectService.getProjects().subscribe(
      res=>{
       this.intialProjectList= res;  
        },
      err=>{
        console.log(err);
      }
    )
  }

 getImputations(project:Project,date:string){
    this.projectService.getWeekImputations(this.user.id,project.id,date).subscribe(
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
      this.map.set(project,weekImp)
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
      //  console.log("func",this.weekEvents)    
         },
       err=>{
         console.log(err);
       }
     )   
   }
 

   UpdateImputation(imputation){
     if(imputation.status== Status.Initial ){
      this.imputationService.update(imputation)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('okkkk')
          },
          err => console.log(err)
        )}
      
        else{
          this.warningChange()

      }
  }
  CreateImputation(imputation){
    this.imputationService.create(imputation)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('created')
          },
          err => console.log(err)
        )
  }


    changeImputations(imputation,project,hours,index) {  
    var dateImputation = new Date(this.x.format("YYYY-MM-DD"));
    dateImputation.setDate(dateImputation.getDate() + index);
    var user:User={"id":this.CurrentUser.id}
    if(imputation.id!= null){
      console.log("proj",project)
      this.UpdateImputation(imputation)
    }
    else
    { 
      var imput: Imputation = { 
        
        date: dateImputation,
        hours:hours,
        project:project,
        user:user,
        status :Status.Initial   }
        this.CreateImputation(imput)
    } 
  
   }





   sumDay(ind){
    var s=0
    this.map.forEach((value,key) => {
      if(value[ind].id!=null){
    s+=Number.parseFloat(value[ind].hours)

      }  
    });
    return s
   }

  
  

   sumWeek(project){
    var s=0
    var list:Imputation[]= this.map.get(project)
    list.forEach(imputation=>{
      if(imputation.hours!=null)
      s+= Number(imputation.hours)
      
      });
     return s
   }
 

  /////////////////////////////   Modal code   ///////////////////////////////////////////
  showModal(): void {
    this.isVisible = true;
  }                                     
                      
  handleOk(): void {
    this.isVisible = false;
    this.getImputations(this.selectedProject,this.x.format('YYYY-MM-DD'))
  }


  handleCancel(): void {
    this.isVisible = false;
  }
  ////////////////////////////////  List Code /////////////////////////////////////////////////////////

  add() {  
    if(!(this.selectedProjectsList.find(project=>project.id===this.selectedProject.id)))
    {this.selectedProjectsList.push(this.selectedProject)
    this.handleOk()   }    
    else{
      this.warningSelectedproject()
    }  
    
    
    //this.getImputations(this.selectedProject,this.x.format('YYYY-MM-DD'))
  }

  onChange(selectedProject){
    this.selectedProject = selectedProject
  }


  warningSelectedproject(): void {
    this.modal.warning({
      nzTitle: 'Warning',
      nzContent: 'Ce projet est déja sélectionné'
    });
  }

  warningChange(): void {
    this.modal.warning({
      nzTitle: 'modification non autorisée ',
      nzContent: 'Cette imputation a été soumise pour validation '
    });
  }
  sendToValidation(list:Imputation[]){
   var sending:Imputation[]=[]
    for(let imp of list)
    {
      if(imp.id!=null)
      sending.push(imp)

    }
    console.log("sending",sending)
    var s="Sent"
    this.imputationService.sendToValidate(s,sending).subscribe(
      res => {
        console.log("res:", res);
        console.log('lallala')
      },
      err => console.log(err)
    )
  
  }
  showConfirm(listImputations): void {
    this.modal.confirm({
      nzTitle: 'Soumettre cette activité pour validation?',
      nzContent: 'Une fois validée, vous ne pourrez jamais effectuer des changements',
      nzOnOk: () => {
            this.sendToValidation(listImputations )}
     
    });
   
  }

  isSent(list:Imputation[]){
    var s= false
    for(let imp of list){
      if(imp.id!=null && imp.status==Status.Sent) 
      s=true
      break;
    }
    return s   
  
    }


}
