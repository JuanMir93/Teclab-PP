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

  cerrarSesion() {
    // Llama al método de cerrar sesión en el servicio AuthService
    this.authService.cerrarSesion();
    // Después de cerrar sesión, redirige al contenido público (por ejemplo, la página de inicio)
    this.router.navigate(['/inicio']); // Cambia '/inicio' por la ruta de la página de inicio o contenido público
  }
}
