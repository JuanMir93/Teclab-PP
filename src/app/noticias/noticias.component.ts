import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  
  logueado= false;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.logueado = this.authService.estaAutenticado();
  }



}
