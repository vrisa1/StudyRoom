import { Component, OnInit } from '@angular/core';
import { DriveService } from '../service/drive.service';
import { map, switchMap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit{
  
  archivos: any[] = [];
  archivoSeleccionado: any;
  fileContent: SafeResourceUrl | null = null;

  constructor(private DriveService : DriveService, private sanitizer : DomSanitizer){}
 
  ngOnInit(): void {
    this.actualizarListaDeArchivos();
  }
  
  private actualizarListaDeArchivos(): void{
    this.DriveService.iniciarFiles().pipe(
      switchMap(() => this.DriveService.listarArchivos())
    ).subscribe(
      (data: any[]) => {
        this.archivos = data.filter((a:any)=> a.mimeType !== 'application/json');
        console.log('Archivos obtenidos:', this.archivos);
      },
      (error) => {
        console.error('Error al obtener archivos:', error);
      }
    );
  }
  
 
  leerArchivo(fileId: string){
    this.DriveService.readFile(fileId).subscribe((data)=>{
      this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(data.content);
    })
  }

  seleccionarArchivo(): void {
    if (this.archivoSeleccionado) {
      this.leerArchivo(this.archivoSeleccionado.id); 
    }
  }
}
