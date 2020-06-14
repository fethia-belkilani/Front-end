import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../_services/user.service';
import { User } from 'src/app/_models/user';
import { element } from 'protractor';
import { Validators } from '@angular/forms';



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

  usersList: User[] =[]


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

  UpdateUser(u){
    this.userService.update(u)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('okkkk')
          },
          err => console.log(err)
        )
  }

  onFilterChange($event,id,name,role,state,validators,collaborators){
    console.log("you changed the user",name)
    var userToUpdate: User = {
      id:id, 
      name:name,
      isValidator:state,
      collaborators:collaborators,
      validators:validators
    }
    this.UpdateUser(userToUpdate)

  }            

  log(value: object[]): void {
    console.log(value);
    console.log("liste:  ",this.usersList)
  }
   

}