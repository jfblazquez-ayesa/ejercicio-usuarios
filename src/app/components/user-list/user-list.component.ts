import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConstantsService } from '../../services/url-constants.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  users: Array<User>;
  updateSubscription?: Subscription;
  suscriptionUsers?: Subscription;
  //inyectamos en el contructor el httpClient y así Angular se encarga de instanciarlo con todas sus dependencias
  constructor(private httpClient: HttpClient, private httpUrls: UrlConstantsService, private agenda: UsuariosService) {
    this.user = new User();
    this.users = new Array();
    this.updateSubscription = null;
    this.suscriptionUsers = null;
  }

  ngOnDestroy() {
    // nos desuscribimos al salir del componente
    // de este modo liberamos memoria en el navegador
    if (this.suscriptionUsers && !this.suscriptionUsers.closed) {
      this.suscriptionUsers.unsubscribe();
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required])
    });
    this.userForm.valueChanges.subscribe(value => {
      if (this.userForm.valid) {
        this.user = new User(
          this.userForm.controls['name'].value,
          this.userForm.controls['email'].value,
          this.userForm.controls['position'].value,
          this.userForm.controls['phone'].value,
          this.userForm.controls['age'].value,
          this.userForm.controls['isActive'].value,
          this.user.id
        );

        if (this.user.id) {
          this.editarUsero();
        }
      }
    });
    this.getUseros();
  }

  nuevoUsero() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    let body = JSON.stringify(this.user);
    this.httpClient.post(this.httpUrls.get('FIREBASE_USERS_API_URL', '', '.json'), body, options).subscribe(
      response => {
        console.log(response);
        console.log(response);
        this.user = new User('', '');
        this.userForm.reset();
        this.getUseros();
      },
      error => { console.error(error) },
      () => { console.log('Fin') }
    );

  }


  loadUser(user: User) {
    this.user = user;
    console.log(this.user);
    this.userForm.patchValue(user);
  }

  editarUsero() {
    // si hay una suscripción activa y no está cerrada, la cancelamos antes de volver a suscribirnos
    if (this.updateSubscription != null && !this.updateSubscription.closed) {
      this.updateSubscription.unsubscribe();
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    let body = JSON.stringify(this.user);
    this.updateSubscription = this.httpClient.put(this.httpUrls.get('FIREBASE_CONTACT_API_URL', '', '/' + this.user.id + '.json'), body, options).subscribe(
      response => {
        console.log(response);
        console.log(response);
        this.getUseros();
      },
      error => { console.error('Error al editar: ' + error) },
      () => { console.log('Fin') }
    );

  }

  deleteUser(user: User, button) {
    button.disabled = true;
    this.updateSubscription = this.httpClient.delete(this.httpUrls.get('FIREBASE_CONTACT_API_URL', '', '/' + user.id + '.json')).subscribe(
      response => {
        console.log(response)
        this.getUseros();
      },
      error => { console.error('Error al borrar: ' + error); button.disabled = false; },
      () => { console.log('Fin') }
    );

  }

  getUseros() {
    let usersObs = this.agenda.getUsers();
    // if (isObservable(usersObs)){
    if (usersObs instanceof Observable) {
      this.suscriptionUsers = usersObs.subscribe(
        response => {
          this.users = response;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.users = usersObs;
    }
  }

}
