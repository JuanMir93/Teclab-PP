import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasService } from './services/noticia.service';
import { Routes,RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    SobreNosotrosComponent,
    NoticiasComponent,
    NoticiaComponent,
    ContactoComponent,
    FooterComponent,
    routingComponents
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [NoticiasService],
  bootstrap: [AppComponent]
})
export class AppModule { }

