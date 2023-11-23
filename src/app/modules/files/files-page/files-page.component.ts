import { Component, OnInit } from '@angular/core';
import { DriveService } from '../service/drive.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit{
  
  archivos: any[] = [];

  constructor(private DriveService : DriveService){}
 
  ngOnInit(): void {
    //this.DriveService.listaArchivosCarpeta();
    this.actualizarListaDeEventos();
    this.leerArchivo();
  }

  private actualizarListaDeEventos(): void{
    this.DriveService.iniciarFiles().pipe(
      switchMap(() => this.DriveService.listarArchivos())
    ).subscribe(
      (data: any) => {
        this.archivos = data;
        console.log('Archivos obtenidos:', this.archivos);
      },
      (error) => {
        console.error('Error al obtener archivos:', error);
      }
    );
  }
  fileId = '1eCMdReiH9HA1y41oSmTZ1bsbI568h8soUS08Ujgm6vg';
  mimeType = 'text/plain'
  fileUrl= '';

  leerArchivo(){
    this.DriveService.readFileContent(this.fileId, this.mimeType).subscribe((data)=>{
      console.log("texto: "+data);
    })
  }
}
