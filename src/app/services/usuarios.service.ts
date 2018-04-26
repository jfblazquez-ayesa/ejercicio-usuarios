import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstantsService } from './url-constants.service';
import { User } from '../models/user';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuariosService {


  subject = new Subject<User>();

  users: Array<User> = new Array();

  constructor(private httpClient: HttpClient, private httpUrls: UrlConstantsService) { }


  getUsers(refresh: boolean = false): Observable<User[]> | Array<User> {

    if (!refresh && this.users.length > 0) {
      return this.users;
    }

    // el operador "map" recive un observable y devuelve el observable trasformado
    return this.httpClient.get(this.httpUrls.get('FIREBASE_USERS_API_URL', '', '.json')).map(
      response => {
        this.users = [];
        for (let key in response) {
          this.users.push(new User(
            response[key].name,
            response[key].email,
            response[key].position,
            response[key].phone,
            response[key].age,
            response[key].isActive,
            key
          ));
        }
        return this.users;
      },
      error => {
        console.log(error);
        return error;
      }
    );
  }

}
