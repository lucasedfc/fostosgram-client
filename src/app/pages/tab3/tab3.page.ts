import { User } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {

  }

}
