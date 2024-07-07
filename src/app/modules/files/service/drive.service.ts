import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { RequestsService } from 'src/app/core/services/requests.service';

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private RequestsService: RequestsService) { }

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

  readFile(fileId: string): Observable<any> {
    return this.RequestsService.getFileMimeType(fileId).pipe(
      switchMap((mimeType) => {
        switch (mimeType) {
          case 'application/pdf':
            return this.RequestsService.getFileContent(fileId).pipe(
              map(blob => {
                const url = URL.createObjectURL(blob);
                return { type: 'pdf', content: url };
              })
            );
          case 'image/jpeg':
          case 'image/png':
            return this.RequestsService.getFileContent(fileId).pipe(
              map(blob => {
                const url = URL.createObjectURL(blob);
                return { type: 'img', content: url };
              })
            );
          default:
            return this.RequestsService.getFileContentText(fileId, 'application/pdf').pipe(
              map(blob => {
                const url = URL.createObjectURL(blob);
                return { type: 'text', content: url };
              })
            );
        }
      })
    );
  }
  
}
