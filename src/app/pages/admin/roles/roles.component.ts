import { Component, OnInit,  ViewEncapsulation
} from '@angular/core';
// @ts-ignore
import { ItemData} from '../../../_models/ItemData';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor() {
  }

  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  bordered = false;
  loading = false;
  sizeChanger = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  fixHeader = false;
  size = 'small';
  expandable = true;
  checkbox = true;
  allChecked = false;
  indeterminate = false;
  simple = false;
  noResult = false;
  position = 'bottom';

  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData;
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
        data.checked = value;
    });
    this.refreshStatus();
  }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.listOfData.push({
        name: 'John Brown',
        id: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        checked: false,
      });
    }
  }

  noResultChange(status: boolean): void {
    this.listOfData = [];
    if (!status) {
      this.ngOnInit();
    }
  }
}
