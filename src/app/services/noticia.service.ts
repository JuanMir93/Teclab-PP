import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticiaInterface';
import { NoticiasComponent } from '../noticias/noticias.component';
import { Global } from './global';
@Injectable({
  providedIn: 'any'
})
export class NoticiasService {
  private apiUrl = 'http://localhost:3700/api/acceso'; // Reemplaza con la URL de tu API de noticias

  constructor(private http: HttpClient) {}

  crearNoticia(nuevaNoticia: Noticia):Observable<Noticia> {
    // Realizar una solicitud POST al servidor para crear una nueva noticia
    
    return this.http.post<Noticia>(this.apiUrl, nuevaNoticia);
    
  }

  obtenerNoticias(): Observable<Noticia[]> {
    // Realizar una solicitud GET al servidor para obtener la lista de noticias
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  eliminarNoticia(noticiaId: number): Observable<void> {
    // Realizar una solicitud DELETE al servidor para eliminar una noticia por su ID
    return this.http.delete<void>(`${this.apiUrl}/${noticiaId}`);
  }
}

