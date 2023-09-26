import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticiaInterface';

@Injectable({
  providedIn: 'any'
})
export class NoticiasService {
  private apiUrl = 'http://localhost:3700/api/acceso'; // Reemplaza con la URL de tu API de noticias

  constructor(private http: HttpClient) {}

  crearNoticia(imagen: File, titulo: string, contenido: string): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
  
    return this.http.post(this.apiUrl, formData);
  }

  obtenerNoticias(): Observable<Noticia[]> {
    // Realizar una solicitud GET al servidor para obtener la lista de noticias
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  obtenerNoticia(id: string) {
    return this.http.get<Noticia>(`${this.apiUrl}/${id}`);
  }

  eliminarNoticia(id: string) {
    // Realizar una solicitud DELETE al servidor para eliminar una noticia por su ID
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  modificarNoticia(id: string, imagen: File | null, titulo: string, contenido: string) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
}

