import { Component, OnInit,ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services';
import { User } from 'src/app/_models';



@Component({
  selector: 'app-test',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: []
})

export class TestComponent implements OnInit {
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
