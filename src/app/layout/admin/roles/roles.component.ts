import { Component, OnInit, Pipe } from '@angular/core';
import { UserService } from './../../../_services/user.service';
import { User } from 'src/app/_models/user';
import { element } from 'protractor';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  term: string;
  usersList: User[] =[]


  constructor(private userService:UserService) {
  }

  ngOnInit(): void {


    this.getAllUsers()
    
  
   }


 

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
   this.usersList=myusers
   console.log("my",myusers)
   console.log("this",this.usersList)

  }

  UpdateUser(id:number,role:boolean){
    this.userService.updateRole(id,role)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('okkkk')
          },
          err => console.log(err)
        )
  }

  onFilterChange($event,id,name,state,){
    console.log("you changed the user",name)
    
    this.userService.updateRole(id,state)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('okkkk')
          },
          err => console.log(err)
        )

  }            

  log(value: object[]): void {
    console.log(value);
    console.log("liste:  ",this.usersList)
  }
   




 
}