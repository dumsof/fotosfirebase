import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
/* import = as firebase from 'firebase'; */
import { FileItem } from '../components/models/file-item';

/* necesita paquete firebase, se coloca para quitar el error */
import * as firebase from 'firebase';


@Injectable()
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';
  constructor(private db: AngularFirestore) {

  }

  cargarImagenesFireBase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      if (item.progreso >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.log('Error al subir el archivo ', error),
        () => {
          console.log('Imagen cargada correctamente.');
          item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          /* despues que se guarda en el storage de firebase, se guarda una referencia en la base de datos */
          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          });
        }
      );
    }

    console.log(imagenes);
  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
