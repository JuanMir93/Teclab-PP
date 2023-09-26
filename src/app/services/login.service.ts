import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { ResponseI }from '../models/loginResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:String= 'http://localhost:3700/api/';

  constructor(private http:HttpClient) {
  
   }

   loginUser(form:LoginRequest):Observable<ResponseI>{
    let direccion = this.url  + "login";
    return this.http.post<ResponseI>(direccion,form);
   }
   
}

