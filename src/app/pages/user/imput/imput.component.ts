import { Component, OnInit,  ViewEncapsulation,  ChangeDetectionStrategy,

} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'app-imput',
  templateUrl: './imput.component.html',
  styleUrls: ['./imput.component.css']
})
export class ImputComponent implements OnInit {

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      //color: colors.yellow
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another event',
      //color: colors.blue
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      //color: colors.red
    }
  ];
  ngOnInit() {
  }


}
