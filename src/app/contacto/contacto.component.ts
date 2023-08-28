import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
 
  datos:FormGroup;
  constructor(private httpClient:HttpClient){
    this.datos = new FormGroup({

      correo: new FormControl ('', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")]),
      asunto: new FormControl ('', [Validators.required]),
      mensaje:new FormControl ('', [Validators.required, Validators.maxLength(200)]),
      nombre: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      telefono: new FormControl ('', [Validators.required]),
      
    }) 
  }
  
  get correoNoValido(){
    return this.datos.get('correo')?.invalid && this.datos.get('correo')?.touched;
  }


  get nombreNoValido(){
    return this.datos.get('nombre')?.invalid && this.datos.get('nombre')?.touched && this.datos.get('nombre')?.dirty;
  }

  get asuntoNoValido(){
    return this.datos.get('asunto')?.invalid && this.datos.get('asunto')?.touched && this.datos.get('asunto')?.dirty;
  }

  get mensajeNoValido(){
    return this.datos.get('mensaje')?.invalid && this.datos.get('mensaje')?.touched && this.datos.get('mensaje')?.dirty;
  }

  get telefonoNoValido(){
    return this.datos.get('telefono')?.invalid && this.datos.get('telefono')?.touched;
  }

  
  envioCorreo(){
    Loading.circle();
    let params = {
      email:this.datos.value.correo,
      asunto:this.datos.value.asunto,
      mensaje:this.datos.value.mensaje,
      nombre:this.datos.value.nombre,
      telefono:this.datos.value.telefono
    }

    if (this.datos.invalid) {
      let showError = true; // Variable para realizar un seguimiento de si el mensaje de error ya se mostró o no
    
      return Object.values(this.datos.controls).forEach(control => {
        control.markAllAsTouched();
    
        if (showError) {
          Loading.remove();
          Notiflix.Notify.failure('No se pudo enviar el mensaje');
          showError = false; // Marcar que el mensaje de error ya se mostró
        }
      });
    }

   
    this.httpClient.post('http://localhost:3700/api/envio',params).subscribe(res =>{
      console.log(res)
      Loading.remove();
      Notiflix.Notify.success('Enviado correctamente');
      this.datos.reset();
    })
    
  }

}


