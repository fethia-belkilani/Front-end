import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment();
  today = moment().format("l");

  getWeek(dt) {
    var weekStart = dt.clone().startOf('isoWeek');
    var weekEnd = dt.clone().endOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format("l"));
    }
    return days;
  }

  currentWeek = this.getWeek(this.x);


  next() {
    this.x = this.x.weekday(8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
  }
  prev() {
    this.x = this.x.weekday(-8);
    this.currentWeek = this.getWeek(this.x.weekday(8));
  }

  //m=moment().weekday(8);



  title = 'modal2';
  editProfileForm: FormGroup;
  imputList = [
    { id: "1", titre: "Projet 100", lundi: "0.5", mardi: "0.25", mercredi: "1", jeudi: "0.5", vendredi: "1", samedi: "", dimanche: "" },
    { id: "2", titre: "Projet 200", lundi: "0.5", mardi: "0.25", mercredi: "1", jeudi: "0.5", vendredi: "1", samedi: "", dimanche: "" },
    { id: "3", titre: "Projet 300", lundi: "0.5", mardi: "0.25", mercredi: "1", jeudi: "0.5", vendredi: "1", samedi: "", dimanche: "" }
  ];
  constructor(private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit() {
    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
    });
  }
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email
    });
  }
  onSubmit() {
    this.modalService.dismissAll();
    console.log("res:", this.editProfileForm.getRawValue());
  }

}
