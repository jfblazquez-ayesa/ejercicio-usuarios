import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';




import { APP_ROUTING } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlConstantsService } from './services/url-constants.service';
import { UsuariosService } from './services/usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
    UserNewComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    UrlConstantsService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
