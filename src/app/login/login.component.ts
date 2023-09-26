
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { LoginRequest } from '../models/loginRequest';
import { Usuario } from '../models/usuario';


declare var $: any;
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public form:FormGroup;


  constructor(private fb:FormBuilder,private api: LoginService,private authService: AuthService, private router: Router){
    this.form = new FormGroup({
    })
  }

  ngOnInit():void {
    this.form = this.myForm();
  }

  private myForm():FormGroup{
    return this.fb.group({
      usuario:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }


  public submitFormulario1(){

    if (this.form.invalid) {
      let showError = true; // Variable para realizar un seguimiento de si el mensaje de error ya se mostró o no
    
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
    
        if (showError) {
          Notiflix.Notify.failure('Error de inicio');
          showError = false; // Marcar que el mensaje de error ya se mostró
        }
      });
    }else {
      // Si el formulario es válido, proceder a la autenticación
      const loginRequest: LoginRequest = {
        usuario: this.form.value.usuario,
        password: this.form.value.password
      };
   
     // Llamar al método de autenticación en el servicio AuthService
     this.authService.autenticar(loginRequest).subscribe(
      autenticado => {
        if (autenticado) {
          // Si la autenticación es exitosa, redirigir al usuario a la ruta deseada
          this.router.navigate(['/acceso']);
          $("#Modal").modal('hide');
          Notiflix.Notify.success('El usuario ha sido autenticado');
          this.authService.logueado(true);
          this.recargarPagina();
          } else {
          Notiflix.Notify.failure('Credenciales inválidas'); // Mostrar mensaje de error si las credenciales son inválidas
        }
      },
      error => {
        console.error('Error al autenticar el usuario', error);
        Notiflix.Notify.failure('Error al autenticar el usuario');
      }
    );
      
    
  }
  
}


  get usuarioNoValido(){
    return this.form.get('usuario')?.invalid && this.form.get('usuario')?.touched && this.form.get('usuario')?.dirty;
  }

  get passwordNoValido(){
    return this.form.get('password')?.invalid && this.form.get('password')?.touched && this.form.get('password')?.dirty;;
  } 

  recargarPagina() {
    setTimeout(() => {
      location.reload();
    }, 400);
  }
  
}
  


