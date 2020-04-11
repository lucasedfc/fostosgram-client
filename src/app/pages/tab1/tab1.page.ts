import { PortsService } from './../../services/ports.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  post: Post[] = [];

  constructor(
    private postService: PortsService
  ) {

  }

  ngOnInit() {
    this.postService.getPost().subscribe(resp => {
      console.log(resp.posts[0].user);
      this.post.push(...resp.posts);
    });
  }

}
