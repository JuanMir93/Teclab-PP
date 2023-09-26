import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoticiaComponent } from './noticia/noticia.component';

const routes: Routes = [{
  path:'publico',component:AppComponent
},
{ 
  path:'', redirectTo:'publico' , pathMatch: 'full' 
},
{ 
  path:'acceso', component:LoginComponent 
},
{ 
  path:'acceso', component:NoticiaComponent 
},
{
  path:"**", redirectTo:'publico'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, NoticiaComponent]
