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
  enable = true;

  constructor(
    private postService: PortsService
  ) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?, pull: boolean = false) {

    this.postService.getPost(pull).subscribe(resp => {
      console.log(resp.posts);
      this.post.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          this.enable = false;
        }
      }
    });
  }

  doRefresh(event) {
    this.enable = true;
    this.post = [];
    this.loadData(event, true);
  }

}
