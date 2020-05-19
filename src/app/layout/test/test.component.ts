import { Component, OnInit,ChangeDetectionStrategy, Input } from '@angular/core';
import { CalendarDateFormatter } from 'angular-calendar';
import { NgForm } from '@angular/forms';

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
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  @Input() public mapRecord?: any;

  public formFields: { key: string, value: string }[] = this.toFormFields({
    "Col1": "Val1",
    "Col2": "Val2",
    "Col3": "",
  });

  ngOnChanges() {
    this.formFields = this.toFormFields(this.mapRecord);
  }

  private toFormFields(data: any) {
    return Object.keys(data).map(key => ({ key, value: data[key] }));
  }

  public onSubmit(form: NgForm) {
    this.mapRecord = form.value;
    // Do submit logic
  }
}
  