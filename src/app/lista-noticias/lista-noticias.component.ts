import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { NoticiasService } from '../services/noticia.service';
import { Noticia } from '../models/noticiaInterface';
import { Router, ActivatedRoute } from '@angular/router';
import { Loading } from 'notiflix';

@Component({
  selector: 'lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit{
  logueado= false;
  noticias: Noticia[] = [];
  
  id!: string;
  noticia!:Noticia;

  constructor(
    private authService: AuthService,
    private noticiasService: NoticiasService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (!this.noticia){return};
      this.noticiasService.obtenerNoticia(this.id)
        .subscribe(
          (res:any) => {
            this.noticia = res;
          },
          err => console.log(err)
        )
    });
    
      this.noticiasService.obtenerNoticias()
      .subscribe(
        (data:Noticia[])=> {
          this.noticias = data;
        },
        (err:Error) => console.log(err)
      ),
      this.logueado = this.authService.estaAutenticado();  
  }
 
  borrarNoticia(id: string) {
    const confirmacion = window.confirm('¿Está seguro de borrar esta noticia?');

  if (confirmacion) {
    this.noticiasService.eliminarNoticia(id)
      .subscribe((res:any) => {
        console.log(res)
        this.router.navigate(['/acceso']);
        location.reload();
      });
    }
  }

  modificarNoticia(imagenInput:HTMLInputElement,titulo: HTMLInputElement, contenido: HTMLTextAreaElement) {
    if (imagenInput.files && imagenInput.files.length > 0){
    const imagen = imagenInput.files[0];
    this.noticiasService.modificarNoticia(this.noticia._id!, imagen,titulo.value, contenido.value)
      .subscribe(res => {
        console.log(res);
        Loading.circle();
        location.reload();
        Loading.remove();
        this.router.navigate(['/acceso']);
      });
    } else {
        console.error("Debe seleccionar una imagen.");
      }
  }

}
