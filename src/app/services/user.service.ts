import { NavController } from '@ionic/angular';
import { User } from './../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
  ) { }

  login(email: string, password: string) {

    const data = {email, password};

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
      .subscribe(resp => {
        console.log(resp);
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

  getUser() {
    if (!this.user._id) {
      this.validateToken();
    }
    return { ...this.user};
  }

  register(user: User) {


    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user)
      .subscribe(resp => {
        console.log(resp);
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

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validateToken(): Promise<boolean> {

    await this.loadToken();
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>( resolve => {
      this.http.get(`${URL}/user/`, {headers}).subscribe(
        resp => {
        // tslint:disable-next-line:no-string-literal
        if ( resp['ok']) {
          // tslint:disable-next-line:no-string-literal
          this.user = resp['user'];
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
        });
    });
  }
}
