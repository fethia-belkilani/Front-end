import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CalendarDateFormatter } from 'angular-calendar';
interface Person {
  id: number;
  name: string;
  valid:boolean;
}
@Component({
  selector: 'app-test',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: []
})

export class TestComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void { }

  mylist: Person[] =
   [{ id: 1,name:'aaa' , valid:true  },
   { id: 2,name:'bbb' , valid:false  },
  ];

  log(value: object[]): void {
    console.log(value);
    console.log("liste:  ",this.mylist)
  }
}
  