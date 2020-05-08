import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../_models/event';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents() :Observable<Array<Event>>{
    return this.http.get<Array<Event>>(`${environment.apiUrl}/events`);
   
  }

  getWeekEvents(date:string) :Observable<Array<Event>>{
    return this.http.get<Array<Event>>(`${environment.apiUrl}/events/${date}`);
   
  }

createEvent(event: Event): Observable<Event> {
  return this.http.post<Event>(`${environment.apiUrl}/events/`,event);
}


}
