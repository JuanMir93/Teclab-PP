import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from '../services/noticia.service';
import { Router } from '@angular/router';
import { Noticia } from '../models/noticiaInterface';
@Component({
  selector: 'noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  public form!: FormGroup;
  noticias: Noticia[] = [];

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService, private router:Router) {}

  ngOnInit(): void {
    this.form = this.myForm();
    this.cargarNoticias();
  }

  private myForm(): FormGroup {
    return this.fb.group({
      imagen: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
    });
  }


  crearNoticia() {
    if (this.form.invalid) {
      return;
    }

    const nuevaNoticia: Noticia = {
      imagen: this.form.value.imagen,
      titulo: this.form.value.titulo,
      contenido: this.form.value.contenido
    };

    this.noticiasService.crearNoticia(nuevaNoticia).subscribe(
      (noticiaCreada) => {
        console.log('Noticia creada:', noticiaCreada);
        this.form.reset();
        this.noticias.push(noticiaCreada);
        this.router.navigate(['/acceso']);
      },
      (error) => {
        console.error('Error al crear la noticia:', error);
      }
    );
  }

  cargarNoticias() {
    // Llamar al método obtenerNoticias del servicio NoticiasService
    this.noticiasService.obtenerNoticias().subscribe(
      (noticias) => {
        this.noticias = noticias;
      },
      (error) => {
        console.error('Error al cargar las noticias:', error);
      }
    );
  }

  eliminarNoticia(noticiaId: number) {
    // Llamar al método eliminarNoticia del servicio NoticiasService
    this.noticiasService.eliminarNoticia(noticiaId).subscribe(
      () => {
        // Si la eliminación es exitosa, actualizar la lista de noticias
        this.cargarNoticias();
        console.log('Noticia eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar la noticia:', error);
      }
    );
  }
  
}