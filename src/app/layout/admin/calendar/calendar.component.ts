import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView, MOMENT } from 'angular-calendar';
import { colors } from './demo-utils/colors'
import { CalendarDateFormatter, CalendarEventAction, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { EventService } from './../../../_services/event.service';
import { Subject, Observable } from 'rxjs';
import { Event } from 'src/app/_models/event';
import * as moment from 'moment';
import { isThursday } from 'date-fns';
import { map } from 'rxjs/operators';
import { ɵWebAnimationsPlayer } from '@angular/animations/browser';




@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  constructor(private fb: FormBuilder, private modalService: NgbModal, private eventService: EventService) {}

  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();
  isVisible=false

  setView(view: CalendarView) {
    this.view = view;
  }
 



  ngOnInit() { 
    //this.createEvent(this.e)
    this.validForm()
    this.fetchEvents()
    console.log('final list events:',this.events)
  }

  
  

createEvent(e){
  this.eventService.createEvent(e)
      .subscribe(
        res => {
          console.log(res);
          console.log('okkkk')
        },
        err => console.log(err)
      )
}




  fetchEvents() {
    return this.eventService.getEvents()
    .subscribe( data => {
      this.loopThroughEvents(data);
    })
  }

  loopThroughEvents(res){
  var obj: Array<Event> = [];
  for (var i = 0; i < res.length; i++) {
    var event: Event = {
      id: res[i]['id'],
      title: res[i]['title'],
      start: new Date(res[i]['start']),
      end: new Date(res[i]['end']),
    }
    obj.push(event)
  }
  this.events = obj;
  this.refresh.next();
}

updateEvents(e:Event){
  var obj: Array<Event> = [];
  var event: Event = {
    id: e.id,
    title: e.title,
    start: e.start,
    end: e.end,
  }
  obj.push(event)
  this.events.push(obj[0])
  this.refresh.next();
}

eventClicked({ event }: { event: CalendarEvent }): void {
  console.log('Event clickedddddddd', event);
}


////////////////////////////////////////////////modal
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
 ////////////////////////////////////////////////////////form
 validateForm: FormGroup;

 validForm(): void {
  this.validateForm = this.fb.group({
    title: null,
    start: [null],
    end: [null],
  });
}

submitForm(value: { title: string; start: Date; end:Date}): void {
  const  e: Event = {
    id:null,
    title:value.title,
    start:value.start,
    end: value.end,
  };
  console.log("event from form: ",e)
  this.createEvent(e)
  this.updateEvents(e)
  this.handleOk()                           

}


 
 
 

 
  
}
