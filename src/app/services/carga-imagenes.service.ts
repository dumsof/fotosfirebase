import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* import = as firebase from 'firebase'; */
import { FileItem } from '../components/models/file-item';


@Injectable()
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';
  constructor(private db: AngularFirestore) {

  }

  cargarImagenesFireBase(imagenes: FileItem[]) {
    console.log(imagenes);
  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
