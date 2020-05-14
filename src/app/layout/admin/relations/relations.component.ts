import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { User } from 'src/app/_models/user';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {
  
  validatorsList:User[]=[]
  collaboratorsList:User[]=[]
  private selectedValidator:User
  private selectedCollaboratorsList:User[]=[]


  constructor(private userService:UserService) { }
 

  ngOnInit() {
    this.getAllUsers()
    console.log(this.selectedValidator)
  }
  getAllUsers(){
    let myValid: Array<any> = [];
    let myCollab: Array<any> = [];

    this.userService.getAll().subscribe(
      res=>{
        res.forEach(user=>{
          if(user.isValidator)
            {myValid.push(user) }
         myCollab.push(user)
        })   
      },
      err=>{
        console.log(err);
      }
    )
   this.validatorsList=myValid
   this.collaboratorsList=myCollab
  
  }
  onChangeVal(selectedValidator){
    this.selectedValidator= selectedValidator
    console.log(selectedValidator)
  }
  onChangeCol(selectedCollaboratorsList){
    this.selectedCollaboratorsList= selectedCollaboratorsList
    console.log(selectedCollaboratorsList)
  }
 

UpdateUser(validatorId:number,collabList:User[]){
  console.log("upcoming validator id",validatorId)
  console.log("upcoming collab list",collabList)
  this.userService.addCollabs(validatorId,collabList)
      .subscribe(
        res => {
          console.log(res);
         console.log("updated")          },
        err => console.log(err) 
      )
      this.selectedValidator=null 
      this.selectedCollaboratorsList=[] 
}
cancel(){
  this.selectedValidator=null 
      this.selectedCollaboratorsList=[] 

}



addCollabs(){
  if(this.selectedValidator!=null && this.selectedCollaboratorsList.length!=0){
this.UpdateUser(this.selectedValidator.id,this.selectedCollaboratorsList)
  }
  else
  window.alert("sélectionnez des utilisateurs")

}








}
