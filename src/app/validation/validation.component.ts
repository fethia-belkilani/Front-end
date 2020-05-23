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
  weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  x = moment();
  today = moment().format("YYYY-MM-DD");
  currentWeek = this.getWeek(this.x);
  isVisible = false;
  private modalService: NgbModal
  private selectedProject;
  private weekStartDay;

  intialProjectList: Array<Project> = [];
  selectedProjectsList: Array<Project> = [];
  editField: string;
  weekImputations:any[]
  map=new Map()
  weekEvents:any[]


  constructor(private projectService:ProjectService, private eventService: EventService,
    private modal:NzModalService) { }

  ngOnInit() {
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
    this.x = this.x.weekday(0);
    this.currentWeek = this.getWeek(this.x.weekday(8));
  

  }
 
  prev() {
    this.x = this.x.weekday(-8);
    this.currentWeek = this.getWeek(this.x.weekday(8));


    
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
}
