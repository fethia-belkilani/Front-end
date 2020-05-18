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
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
  