import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from './models/loginRequest';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3700/api/login'; // URL de tu API de autenticación
  private idLogueado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router :Router) {
    this.checkToken();
  }

  get esLogueado():Observable<boolean>{
    return this.idLogueado.asObservable();
  }

  autenticar(loginRequest: LoginRequest): Observable<boolean> {
    // Envía las credenciales del usuario al servidor para autenticar
    return this.http.post<any>(`${this.apiUrl}`, loginRequest).pipe(
      map(response => {
       // console.log('response =>', response);
        this.guardarToken(response.token);
        this.idLogueado.next(true);
        
        return response;
        if (response && response.token) {
          return true;
        }
        return false; // Si el servidor no devuelve un usuario autenticado, consideramos que la autenticación falló
      })
    );
  }
  private checkToken(){
    const usuarioToken = localStorage.getItem('token');

  }

  // Método para verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    const token = localStorage.getItem('token');
    
    return !!token; // Devuelve true si el token existe, lo que indica que el usuario está autenticado
    
  }
  private guardarToken(token:string): void{
    localStorage.setItem('token', token);
  }
  cerrarSesion(): void {
    localStorage.removeItem('token');
    console.log('se ha cerrado la sesion');
  }

  logueado(value: boolean): void {
    this.idLogueado.next(value);
  }

  
}