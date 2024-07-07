import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthGoogleService } from './auth-google.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { evento, usuario } from '../models';
import { data } from 'jquery';
import { bD } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {


  constructor(private http: HttpClient, private AuthGoogleService : AuthGoogleService ) {}
  
  
  private token: string = this.AuthGoogleService.getToken();

  //Requests Calendar

  private readonly calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/';
  
  private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  calendarId : string= "";

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
    const url = `${this.calendarUrl}${this.calendarId}/events/${eventId}`;
    return this.http.delete(url, { headers: this.headers });
  }

  updateEvent(event: evento, eventId : string): Observable<any> {
    const url = `${this.calendarUrl}${this.calendarId}/events/${eventId}`;
    return this.http.put(url, event, { headers: this.headers });
  }
  

  //Request Files

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
    const params = new HttpParams().set('q', `'${this.folderId}' in parents and trashed = false`);
    return this.http.get(`${this.driveUrl}?${params.toString()}`, { headers: this.headers });
  }


  getFileContent(fileId: string): Observable<any> {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    return this.http.get(exportUrl, { headers: this.headers, responseType: 'blob' });
  }
  
  getFileContentText(fileId: string, mimeType: string): Observable<any> {
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${mimeType}`;
    return this.http.get(exportUrl, { headers: this.headers, responseType: 'blob' });
  }
  
  getFileMimeType(fileId: string): Observable<string> {
    return this.http.get(`${this.driveUrl}/${fileId}?fields=mimeType`, {
      headers: this.headers,
    }).pipe(
      map((response: any) => response.mimeType)
    );
  }

  //Request tareas
 
  private bddFile="";

  private addBdd(): Observable<any>{
    const body = {
      name: 'BddTareas',
      parents: [this.folderId],
      mimeType: 'application/json'
    };
    return this.http.post(this.driveUrl, body,{headers : this.headers});
  }
  
  tareasInit(): Observable<any>{
    return new Observable<any>((observer)=>{
      this.filesInit().pipe(
      switchMap(()=> this.getFilesInFolder())
    ).subscribe(
      (files: any) => {
        const bdd = files.files.find((fil: any) => fil.name === 'BddTareas');
        if (!bdd) {
          this.addBdd().subscribe(
            (response) => {
              console.log('Respuesta del servidor:', response);
              this.bddFile= response.id;
              observer.next();
              observer.complete();
            },
            (error) => {
              console.error('Error al agregar archivo:', error);
            })
        }else{
          this.bddFile = bdd.id;
          observer.next();
          observer.complete();
        }
      },
    )
    })
  }

  updateBddTareas(tareas:any){
  const body = JSON.stringify(tareas);
  return this.http.patch(`https://www.googleapis.com/upload/drive/v3/files/${this.bddFile}?uploadType=media`, body, {headers: this.headers.append('Content-Type', 'application/json')});
  }

  getTareas():Observable<any>{
    return this.http.get(`https://www.googleapis.com/drive/v3/files/${this.bddFile}/?alt=media`, { headers: this.headers, responseType: 'json' });
  }

}
