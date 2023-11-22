import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthGoogleService } from './auth-google.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { evento, usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  constructor(private http: HttpClient, private AuthGoogleService : AuthGoogleService ) {}
  
  
  private token: string = this.AuthGoogleService.getToken();

  //Requests Calendar

  private readonly calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  
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

  addEvent(event: evento): Observable<any> {
    const url = `${this.calendarUrl}${this.calendarId}/events`;
    return this.http.post(url, event, { headers: this.headers });
  }

  deleteEvent(eventId : string): Observable<any> {
    const url = `${this.calendarUrl}${this.calendarId}/events/${event}`;
    return this.http.delete(url, { headers: this.headers });
  }
  

  //Request Drive

  private readonly driveUrl = 'https://www.googleapis.com/drive/v3/files';
  private folderId =""

  private getFiles(): Observable<any>{
    return this.http.get(this.driveUrl,{headers : this.headers});
  }

  private addFolder(nombreCarpeta : string): Observable<any>{
    const body = {
      name: nombreCarpeta,
      mimeType: 'application/vnd.google-apps.folder'
    };
    return this.http.post(this.driveUrl, body,{headers : this.headers});
  }

  filesInit(): Observable<void> {
    return new Observable<void>((observer) => {
      this.getFiles().subscribe(
        (files: any) => {
          const carpeta = files.files.find((fil: any) => fil.name === 'StudyRoom');
          if (!carpeta) {
            this.addFolder('StudyRoom').subscribe(
              (createdFolder: any) => {
                this.folderId = createdFolder.id;
                observer.next();
                observer.complete();
              },
            );
          } else {
            this.folderId = carpeta.id;
            observer.next();
            observer.complete();
          }
        },
      );
    });
  }

  getFilesInFolder(): Observable<any> {
    const params = new HttpParams().set('q', `'${this.folderId}' in parents`);
    return this.http.get(`${this.driveUrl}?${params.toString()}`, { headers: this.headers });
  }


  getFileContent(fileId: string, mimeType: string): Observable<any> {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${mimeType}`;
    return this.http.get(exportUrl, { headers: this.headers, responseType: 'text' });
  }
}
