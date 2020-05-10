import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../_services/user.service';
import { User } from 'src/app/_models/user';
import { element } from 'protractor';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
 
  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers()
    
  
   }

  mylist: User[] =[]


  getAllUsers(){
    let myusers: Array<any> = [];
    this.userService.getAll().subscribe(
      res=>{res.forEach(user=>{
        myusers.push(user) 
      })   
        },

      err=>{
        console.log(err);
      }
    )
   this.mylist=myusers
   console.log("my",myusers)
   console.log("this",this.mylist)

  }

  UpdateUser(u){
    this.userService.update(u)
        .subscribe(
          res => {
            console.log(res);
            console.log('okkkk')
          },
          err => console.log(err)
        )
  }

  onFilterChange($event,id,name,role,state){
    console.log("you changed the user",name)
    var userToUpdate: User = {
      id:id,
      name:name,
      role: role,
      isValidator:state
    }
    this.UpdateUser(userToUpdate)

  }

  log(value: object[]): void {
    console.log(value);
    console.log("liste:  ",this.mylist)
  }
}