import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  login(email: string, password: string) {

    const data = {email, password};

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
      .subscribe(resp => {
        // tslint:disable-next-line:no-string-literal
        if (resp['ok']) {
          // tslint:disable-next-line:no-string-literal
          this.saveToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }
}
