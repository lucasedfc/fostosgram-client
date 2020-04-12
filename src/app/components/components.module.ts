import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PostsComponent, PostComponent, AvatarSelectorComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [PostsComponent, AvatarSelectorComponent]
})
export class ComponentsModule { }
