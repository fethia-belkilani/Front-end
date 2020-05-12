import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';
import { EventService } from './../../../_services/event.service';
import { Subject} from 'rxjs';
import { Event } from 'src/app/_models/event';
import { NzModalService } from 'ng-zorro-antd/modal';




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
  constructor(private fb: FormBuilder, private modalService: NgbModal, private eventService: EventService,private modal: NzModalService
    ) {}

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
    this.validForm()
    this.fetchEvents()
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
deleteEvent(id){
  this.eventService.deleteEvent(id)
      .subscribe(
        res => {
          console.log(res);
          console.log('deleted ')
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

updateListEvents(e:Event){
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
updateDelete(id:number){
  var event=this.events.find(e=>e.id==id)
  const index= this.events.indexOf(event)
  this.events.splice(index, 1);
  this.refresh.next();
}

eventClicked({ event }: { event: CalendarEvent }): void {
  const a= Number(event.id)
  this.showDeleteConfirm(a,event.title)
}


////////////////////////////////////////////////creattion modal
 showModal(): void {
   this.isVisible = true;
 }

 handleOk(): void {
   this.isVisible = false;

 }

 handleCancel(): void {
   this.isVisible = false;
 }
 //////////////////////////////////////////////////////// creation form
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
  this.updateListEvents(e)
  this.handleOk()                           

}
///////////////////////////Delete

showDeleteConfirm( id:number,title: string): void {
  this.modal.confirm({
    nzTitle: 'Voulez-vous vraiment supprimer?',
    nzContent: '<b>'+  title +'</b>',
    nzOkText: 'Supprimer',
    nzOkType: 'danger',
    nzOnOk: () => {
    this.deleteEvent(id)
    this.updateDelete  (id)

  },
    nzCancelText: 'Annuler'  });
}


  



}
