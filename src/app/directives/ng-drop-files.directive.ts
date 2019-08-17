/* para crear esta directiva se utiliza los comando del cli: ng g d directives/ngDropFiles
para utilizarla se coloca el nombre del selector en el div donde se utilizara, en este caso en el div de la imagen */
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../components/models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  /* este evento se dispara cuando se pone el mause del cuadro de [dejar caer archivo] */
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirDetener(event);
  }

  /* este evento se dispara cuando se quita el mause del cuadro de [dejar caer archivo] */
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  /* este evento se dispara cuando se arrastra algo y se suelta el mause en el cuadro de [dejar caer archivo] */
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this.getTransferecia(event);

    if (!transferencia) {
      return;
    }

    this.extraerArchivos(transferencia.files);
    this.prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  /*extender la compatibilidad en los navegadores */
  private getTransferecia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {
    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];
      if (this.archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(archivosLista);
  }

  /* validaciones */
  private archivoPuedeSerCargado(archivo: File): boolean {
    if (!this.archivoFueBorrado(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    }
    return false;
  }

  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoFueBorrado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }
    }
    return false;
  }

  private esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false :
      tipoArchivo.startsWith('image');
  }

}
