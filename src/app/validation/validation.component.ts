import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { EventService } from '../_services/event.service';
import { NzModalService } from 'ng-zorro-antd';
import { Project } from '../_models/project';
import * as moment from 'moment';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  constructor(private projectService:ProjectService, private eventService: EventService,
    private modal:NzModalService) { }
  
  intialProjectList: Array<Project> = [];
  projectList: Array<Project> = [];
  editField: string;
  weekImputations:any[]
  map=new Map()
  weekEvents:any[]


  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];


  ngOnInit() {
  }

 



          
 



  formWeek(date:Date){
    return moment(date).format("DD-MM")
  }
 


}
