import { PostsService } from './../../services/post.service';
import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

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


  constructor(
    private postService: PostsService,
    private route: Router
  ) {}

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

}
