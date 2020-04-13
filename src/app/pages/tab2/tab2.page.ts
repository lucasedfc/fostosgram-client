import { PostsService } from './../../services/post.service';
import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  post: Post = {
    message: '',
    coords: null,
    position: false
  };

  loadingGeo = false;


  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation
  ) { }

  async crearPost() {
    const createPost = await this.postService.createPost(this.post);

    if (createPost) {
      this.post = {
        message: '',
        coords: null,
        position: false
      };
      this.route.navigateByUrl('main/tabs/tab1');
    }
  }

  getGeo() {
    console.log(this.post);
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }
    this.loadingGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingGeo = false;
      // resp.coords.latitude
      // resp.coords.longitude
      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.post.coords = coords;
    }).catch((error) => {
      this.loadingGeo = false;

    });
  }

}
