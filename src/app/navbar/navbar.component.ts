import { Component} from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent{
  constructor(private authService: AuthService, private router: Router) {}
  logueado= false;
  logusuario = false;
  cerrarSesion() {
    // Llama al método de cerrar sesión en el servicio AuthService
    this.authService.cerrarSesion();
    // Después de cerrar sesión, redirige al contenido público
    
    this.router.navigate(['/publico']);
    this.recargarPagina();
    
  }

  ngOnInit(): void {
    this.logueado = this.authService.estaAutenticado();
    if(!this.authService.estaAutenticado()){
      this.logusuario=true;
      
    };
  }

  recargarPagina() {
    location.reload();
    setTimeout(() => {
      this.logusuario=true;
    }, 2000);
    
  }
  
}
