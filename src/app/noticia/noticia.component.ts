import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
@Component({
  selector: 'noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  constructor(private noticiasService: NoticiasService, private router: Router) {
    
   }

  ngOnInit(): void { }

  crearNoticia(imagenInput: HTMLInputElement, titulo: HTMLInputElement, contenido: HTMLTextAreaElement) {
    if (imagenInput.files && imagenInput.files.length > 0) {
      const imagen = imagenInput.files[0];
      this.noticiasService
        .crearNoticia(imagen, titulo.value, contenido.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            Loading.circle();
            location.reload();
            Loading.remove();
          },
          (err: Error) => console.log(err)
        );
    } else {
      console.error("Debe seleccionar una imagen.");
    }
  }

  

  
  
}