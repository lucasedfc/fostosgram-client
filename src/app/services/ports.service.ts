import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PortsService {

  postPage = 0;

  constructor(private http: HttpClient) { }

  getPost() {
    this.postPage++;
    return this.http.get(`${URL}/posts/?page=${this.postPage}`);
  }
}
