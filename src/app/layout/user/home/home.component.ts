import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ProjectService } from './../../../_services/project.service';
import { Project } from './../../../_models/project';
import { EventService } from './../../../_services/event.service';
import { Imputation, Status } from './../../../_models/imputation';
import { ImputationService } from './../../../_services/imputation.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService, UserService } from 'src/app/_services';
import { User } from 'src/app/_models';
import { getWeek } from 'src/app/common_utils';
import { Event } from './../../../_models/event';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private projectService: ProjectService, private eventService: EventService,
    private modal: NzModalService, private imputationService: ImputationService,
    private authenticationService: AuthenticationService
  ) { }

  intialProjectList: Array<Project> = [];
  selectedProjectsList: Array<Project> = [];
  editField: string;
  weekImputations: any[]
  map = new Map()
  weekEvents: Event[]
  user = this.authenticationService.currentUserValue
  showError = false;
  buttonStatus = 0;
  statusMap = new Map();
  errorMessage = "";
  total = 0


  weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  x = moment().clone().startOf('isoWeek');
  currentWeek = getWeek(this.x);
  today = moment().format("YYYY-MM-DD");
  isVisible = false;
  private selectedProject;
  private CurrentUser = this.authenticationService.currentUserValue



  ngOnInit() {
    this.getProjects();
    this.getEvents(this.x.format('YYYY-MM-DD'))

  }



  next() {
    this.x = this.x.clone().add(1, 'week');
    this.currentWeek = getWeek(this.x);
    this.map.forEach((list: Imputation[], project: Project) => {
      this.getImputations(project, this.x.format('YYYY-MM-DD'))
    });
    this.getEvents(this.x.format('YYYY-MM-DD'))
  }

  prev() {
    this.x = this.x.clone().add(-1, 'week');
    this.currentWeek = getWeek(this.x);
    this.map.forEach((list: Imputation[], project: Project) => {
      this.getImputations(project, this.x.format('YYYY-MM-DD'))
    });
    this.getEvents(this.x.format('YYYY-MM-DD'))
    console.log("rr", this.map)
  }

  formDay(date: Date) {
    return moment(date).format("YYYY-MM-DD")
  }

  formWeek(date: Date) {
    return moment(date).format("DD-MM")
  }
  formToday(date: Date) {
    return moment(date).format("DD-MM-YYYY")
  }
  ///////////////////////////////////  Table code   ////////////////////////////////////////////////////
  getProjects() {
    this.projectService.getProjects().subscribe(
      res => {
        this.intialProjectList = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getImputations(project: Project, date: string) {
    this.projectService.getWeekImputations(this.user.id, project.id, date).subscribe(
      imputationData => {
        let weekImp: Array<any> = [];
        this.currentWeek.forEach(day => {
          let obj = new Imputation();
          imputationData.forEach(element => {
            if (day === this.formDay(new Date(element.date))) {
              obj = element;
            }
          });
          weekImp.push(obj)
        });
        this.map.set(project, weekImp);
        this.totale(this.map);
        this.checkStatus(weekImp, project.id);
      },
      err => {
        console.log(err);
      }
    )
  }

  getEvents(date: string) {
    this.eventService.getWeekEvents(date).subscribe(
      eventData => {
        //  console.log("aa",eventData)
        let weekEv: Array<any> = [];
        this.currentWeek.forEach(day => {
          let obj = {
            id: null,
            title: null,
            start: null,
            end: null,
          };
          eventData.forEach(element => {
            // console.log("aa",element)

            if (day === this.formDay(new Date(element.start))) {
              obj = element;
            }
          });
          weekEv.push(obj)
        });
        this.weekEvents = weekEv;
        console.log("func", this.weekEvents)
      },
      err => {
        console.log(err);
      }
    )
  }


  UpdateImputation(imputation) {
    if (imputation.status = Status.Initial) {
      this.imputationService.update(imputation)
        .subscribe(
          res => {
            console.log("res:", res);
            console.log('okkkk')
          },
          err => console.log(err)
        )
    } else {
      this.warningChange()

    }
  }

  CreateImputation(imputation, project, index) {
    this.imputationService.create(imputation)
      .subscribe(
        res => {
          console.log("res:", res);
          console.log('created')
          let projectImputations = this.map.get(project);
          projectImputations[index] = res;
          this.map.set(project, projectImputations);
        },
        err => {
          if (err.status === 406) {
            console.log(err.status);
            this.errorMessage = "Temps invalide,cette valeur dépasse la limite 1 par jour"
            setTimeout(() => { this.showError = false; }, 3000);
            this.showError = true;
          }
        }
      )
  }

  calculateSumDay(index: number) {
    let sumDay = 0;
    this.map.forEach((value, key) => {
      if (value[index].id != null && value[index].hours) {
        sumDay += Number.parseFloat(value[index].hours)
      }
    });
    return sumDay;
  }



  changeImputations(imputation: Imputation, project: Project, hours: number, index: number) {
    var dateImputation = new Date(this.x.format("YYYY-MM-DD"));
    dateImputation.setDate(dateImputation.getDate() + index);
    var user = new User(this.CurrentUser.id)
    var val = [0, 0.25, 0.5, 0.75, 1]
    console.log()
    if (this.calculateSumDay(index) <= 1) {
      if (val.includes(hours)) {
        if (imputation.id != null) {
          console.log("proj", project)
          this.UpdateImputation(imputation)
        } else {
          var imput: Imputation = {
            id: null,
            date: dateImputation,
            hours: hours,
            project: project,
            user: user,
            status: Status.Initial
          }
          this.CreateImputation(imput, project, index)
        }
      }
      else {
        console.log(hours)
        this.errorMessage = "Temps invalide, les valeurs possibles sont: 0, 0.25, 0.5, 0.75 et 1"
        setTimeout(() => { this.showError = false; }, 3000);
        this.showError = true;
      }
    } else {
      this.warningVal()
    }

  }

  warningVal(): void {
    this.modal.warning({
      nzTitle: 'Valeur  ',
      nzContent: 'Le total par jour doit etre <=1'
    });
  }


  sumDay(ind: number) {
    var s = 0
    if (this.map.size !== 0) {
      this.map.forEach((value, key) => {
        if (value[ind].id != null && value[ind].hours) {
          s += Number.parseFloat(value[ind].hours)
        }
      });
    }
    if (this.weekEvents) {
      if (this.weekEvents[ind].id !== null) return this.weekEvents[ind].title;
    }
    return s
  }




  sumWeek(project) {
    var s = 0
    var list: Imputation[] = this.map.get(project)
    list.forEach(imputation => {
      if (imputation.hours != null)
        s += Number(imputation.hours)
    });
    return s
  }

  totale(map): void {
    var t = 0
    if (map.size != 0) {
      map.forEach((list: Imputation[], project: Project) => {
        t += this.sumWeek(project)
      });
    }
    this.total = t

  }


  /////////////////////////////   Modal code   ///////////////////////////////////////////
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.getImputations(this.selectedProject, this.x.format('YYYY-MM-DD'))
  }


  handleCancel(): void {
    this.isVisible = false;
  }
  ////////////////////////////////  List Code /////////////////////////////////////////////////////////

  add() {
    if (!(this.selectedProjectsList.find(project => project.id === this.selectedProject.id))) {
      this.selectedProjectsList.push(this.selectedProject)
      this.handleOk()


    }
    else {
      this.warningSelectedproject()
    }


    //this.getImputations(this.selectedProject,this.x.format('YYYY-MM-DD'))
  }

  onChange(selectedProject) {
    this.selectedProject = selectedProject
  }


  warningSelectedproject(): void {
    this.modal.warning({
      nzTitle: 'Warning',
      nzContent: 'Ce projet est déja sélectionné'
    });
  }

  warningChange(): void {
    this.modal.warning({
      nzTitle: 'modification non autorisée ',
      nzContent: 'Cette activité a été déjà validée par votre manager '
    });
  }

  sendToValidation(list: Imputation[]) {
    var sending: Imputation[] = []
    for (let imp of list) {
      if (imp.id != null)
        sending.push(imp)

    }
    console.log("sending", sending)
    this.imputationService.changeStatus("Sent", sending).subscribe(
      (res: Imputation[]) => {
        console.log("res:", res);
        console.log('lallala');
        if (res.length > 0) this.checkStatus(res, res[0].project.id);
      },
      err => console.log(err)
    )
  }

  showConfirm(listImputations: Imputation[]): void {
    this.modal.confirm({
      nzTitle: 'Soumettre cette activité pour validation?',
      nzContent: 'Une fois validée, vous ne pourrez jamais effectuer des changements',
      nzOnOk: () => {
        this.sendToValidation(listImputations)

      }

    });

  }

  checkStatus(list: Imputation[], projectId: any): void {
    var s = 0
    for (let imp of list) {
      if (imp.id != null) {
        switch (imp.status) {
          case Status.Sent: s = 1;
            break;
          case Status.Valid: s = 2;
            break;
        }
      }
    }
    this.statusMap.set(projectId, s);
    console.log(this.statusMap);
  }


}
