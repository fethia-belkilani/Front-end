import {
  Component, OnInit, ViewEncapsulation
} from '@angular/core';
// @ts-ignore
import { ItemData } from '../../../_models/ItemData';
import { UserService } from './../../../_services/user.service';
import { Subject } from 'rxjs';
import { Userr } from 'src/app/_models/project';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private userServise: UserService) {
  }
  listOfData: Array<Userr> = [];


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
    this.getAllUsers()
  }

  noResultChange(status: boolean): void {
    this.listOfData = [];
    if (!status) {
      this.ngOnInit();
    }
  }


  getAllUsers(){
    let myusers: Array<any> = [];

    this.userServise.getAll().subscribe(

      res=>{res.forEach(user=>{
        myusers.push(user)
          
      })
       
   
        },
      err=>{
        console.log("sorry no user",err);
      }
    )
   this.listOfData=myusers
   console.log("my",myusers)
   console.log("this",this.listOfData)

  }
 



}
