import { Injectable } from '@angular/core';

@Injectable()
export class UrlConstantsService {

  private urls = { FIREBASE_USERS_API_URL: 'https://ejercicio-usuarios.firebaseio.com/users' };


  constructor() { }

  public get(index, preffix?: string, suffix?: string) {
    return (preffix || '') + this.urls[index] + (suffix || '');
  }
}
