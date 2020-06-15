import * as moment from 'moment';

 export function getWeek(dt) {
    var weekStart = dt.clone().startOf('isoWeek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD')

      );
    }
    return days;
  }

  export function formDay(date:Date){
    return moment(date).format("YYYY-MM-DD")
  }

  export function formWeek(date:Date){
    return moment(date).format("DD-MM")
  }
  export function formToday(date:Date){
    return moment(date).format("DD-MM-YYYY")
  }


