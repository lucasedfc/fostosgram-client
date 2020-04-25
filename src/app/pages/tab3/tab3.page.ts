import { PostsService } from './../../services/post.service';
import { NgForm } from '@angular/forms';
import { User } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor(
    private userService: UserService,
    private UiService: UiServiceService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.postService.postPage = 0;
    this.userService.logout();

  }

  async update(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }

    const updated = await this.userService.updateUser(this.user);

    if (updated) {
      this.UiService.presentToast('User Updated');
    } else {
      this.UiService.presentToast('Cannot update user');
    }

  }

}
