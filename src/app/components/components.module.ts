import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [PostsComponent]
})
export class ComponentsModule { }
