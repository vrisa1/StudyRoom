import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RequestsService } from 'src/app/core/services/requests.service';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private RequestsService : RequestsService ) { }

  nombreCarpeta : string = "StudyRoom";

  iniciarFiles(): Observable<void> {
    return new Observable<void>((observer) => {
      this.RequestsService.filesInit().subscribe(
        () => {
          console.log('Files inicializado con éxito');
          observer.next();
          observer.complete();
        }
      );
    });
  }
  
  listarArchivos(): Observable<string[]> {
    return this.RequestsService.getFilesInFolder().pipe(
      map((data: any) => {
        return data.files;
      })
    );
  }

  listaArchivosCarpeta(){
    this.RequestsService.getFilesInFolder().subscribe(
      (data : any)=>{
        console.log(data);
      }
    )
  }

  
  readFileContent(fileId: string, mimeType: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.RequestsService.getFileContent(fileId, mimeType).subscribe(
        (content: string) => {
          observer.next(content);
          observer.complete();
        },
        (error) => {
          console.error('Error al obtener el contenido del archivo:', error);
          observer.error(error);
        }
      );
    });
  }
}
