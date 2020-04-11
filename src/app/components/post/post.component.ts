import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
@Input() post: Post = {};

public img1;
public img2;
public img3;
  constructor() {
    this.img1 = '/assets/perro-1.jpg';
    this.img2 = '/assets/perro-2.jpg';
    this.img3 = '/assets/perro-3.jpg';
  }

  ngOnInit() {
  }

}
