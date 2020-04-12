import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('principalSlide', { static: true }) slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3
  };

  loginUser = {
    email: 'test2@test2.com',
    password: 'test'
  };


  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }

    console.log(this.loginUser);
    this.userService.login(this.loginUser.email, this.loginUser.password);

  }

  register(fRegister: NgForm) {
    console.log(fRegister.valid);
  }

  selectAvatar(avatar) {
    this.avatars.forEach(av => av.selected = false);
    avatar.selected = true;
  }

  showRegister() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  showLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
