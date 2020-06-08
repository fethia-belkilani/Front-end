import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { EventService } from '../_services/event.service';
import { NzModalService } from 'ng-zorro-antd';
import { Project } from '../_models/project';
import * as moment from 'moment';
import { AuthenticationService, UserService } from 'src/app/_services';
import { User } from '../_models';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  constructor( private authenticationService:AuthenticationService, private usersServise:UserService){ }
  weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = this.getWeek(this.x);  today = moment().format("YYYY-MM-DD");
  private currentUser:User
  private collaboratorsList:User[]=[]



 
  
  ngOnInit() {
    this.getCurrentUser()
    

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
getCurrentUser(){
 this.usersServise.getCurrentUser().subscribe(
   res=>{
     this.currentUser=res
     this.collaboratorsList=this.currentUser.collaborators
     console.log(this.collaboratorsList)
     
   }
 )


  
 
}







  



}
