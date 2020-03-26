import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {
  optionList = [{ label: 'Lucy', value: 'lucy', age: 20 }, { label: 'Jack', value: 'jack', age: 22 }];
  selectedValue = null;
  listOfOption = ['validateur1', 'validateur2', 'validateur3', 'validateur4'];



  constructor() { }

  ngOnInit() {
  }

}
