import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGoogleService } from '../../modules/login/service/auth-google.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { evento } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient, private AuthGoogleService : AuthGoogleService ) { }

  //Requests Calendar

  private readonly calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  private readonly token = this.AuthGoogleService.getAccessToken();
  private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  private calendarId : string= "";

  calendarInit(): Observable<void> {
    return new Observable<void>((observer) => {
      this.getCalendars().subscribe(
        (calendarios: any) => {
          const calendario = calendarios.items.find((cal: any) => cal.summary === 'StudyRoom');
          if (!calendario) {
            this.createCalendar('StudyRoom').subscribe(
              (createdCalendar: any) => {
                this.calendarId = createdCalendar.id;
                observer.next();
                observer.complete();
              },
            );
          } else {
            this.calendarId = calendario.id;
            observer.next();
            observer.complete();
          }
        },
      );
    });
  }

  private createCalendar(summary: string): Observable<any> {
    return this.http.post(this.calendarUrl, { summary: summary }, { headers: this.headers });
  }

  private getCalendars(): Observable<any> {
    return this.http.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', { headers : this.headers});
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.calendarUrl}${this.calendarId}/events`, { headers: this.headers })
    .pipe(
      map((data: any) => data.items),
    );
  }

  addEvent(event: any): Observable<any> {
    const url = `${this.calendarUrl}${this.calendarId}/events`;
    return this.http.post(url, event, { headers: this.headers });
  }

  deleteEvent(eventId : string): Observable<any> {
    const url = `${this.calendarUrl}${this.calendarId}/events/${event}`;
    return this.http.delete(url, { headers: this.headers });
  }
  
}
