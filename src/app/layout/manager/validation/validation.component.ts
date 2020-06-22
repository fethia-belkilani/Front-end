import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../_services';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models';
import { ProjectService } from 'src/app/_services/project.service';
import { getWeek} from'src/app/common_utils';
import { Imputation } from 'src/app/_models/imputation';
import * as XLSX from 'xlsx'; 
import { ImputationService } from './../../../_services/imputation.service';
import { NzModalService } from 'ng-zorro-antd';



@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private modalService: NzModalService,private projectService:ProjectService, private imputationService:ImputationService){ }
  weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = getWeek(this.x);  
  today = moment().format("YYYY-MM-DD");
  alllProjectList: Array<Project> = [];

  private collaboratorsList:User[]=[]
  private selecledProject:Project
  private selecledCollabList:User[]=[]
  private map=new Map()
  private user=this.authenticationService.currentUserValue
  name=this.user.name+ '_'+ this.x.format('DD-MM-YYYY')
  fileName= this.name+'.xlsx';  





 
  
  ngOnInit() {
    this.getProjects()
    

  }
 



  next() {
    this.x = this.x.clone().add(1, 'week'); 
    this.currentWeek = getWeek(this.x);
    this.getImput(this.selecledCollabList,this.selecledProject,this.x.format('YYYY-MM-DD'))


  }
 
  prev() {
     this.x = this.x.clone().add(-1, 'week'); 
    this.currentWeek = getWeek(this.x);
    this.getImput(this.selecledCollabList,this.selecledProject,this.x.format('YYYY-MM-DD'))


    
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
  console.log("lp")
  this.selecledCollabList=[]
  this.map.clear()

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
    this.projectService.getSentImputations(user.id,project.id,date).subscribe(
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

 getAllimputations(){
   this.getImput(this.selecledCollabList,this.selecledProject,this.x.format('YYYY-MM-DD'))
   
 }
 sumUser(user){
  var s=0
  var list:Imputation[]= this.map.get(user)
  list.forEach(imputation=>{
    if(imputation.hours!=null)
    s+= Number(imputation.hours)
    
    });
   return s
 }




 success(): void {
  const modal = this.modalService.success({
    nzTitle: 'Opération réussie',
    nzContent: 'Cette activité a été validée'
  });

  setTimeout(() => modal.destroy(), 2000);
}
 validate(list:Imputation[]){
  var validated:Imputation[]=[]
   for(let imp of list)
   {
     if(imp.id!=null)
     validated.push(imp)

   }
   console.log("validated",validated)
   this.imputationService.changeStatus("Valid",validated).subscribe(
     res => {
       console.log("res:", res);
       this.success()
     },
     err => console.log(err)
   )
 
 }




 exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }


}
