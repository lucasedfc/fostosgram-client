import { PostResponse, Post } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postPage = 0;

  newPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer
  ) { }

  getPost(pull: boolean = false) {

    pull ? this.postPage = 0 : this.postPage++;
    return this.http.get<PostResponse>(`${URL}/posts/?page=${this.postPage}`);
  }

  createPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });


    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers}).subscribe(resp => {
        // tslint:disable-next-line:no-string-literal
        this.newPost.emit(resp['post']);
        resolve(true);
      });
    });
  }

  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/posts/upload`, options).then(data => {
      console.log(data);
    }).catch(err => {
      console.log('err uploading', err);
    });
  }
}
