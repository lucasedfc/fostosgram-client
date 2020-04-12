import { User } from './../../interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('principalSlide', { static: true }) slides: IonSlides;



  loginUser = {
    email: 'test2@test2.com',
    password: 'test'
  };

  userRegister: User = {
    email: 'test4@test.com',
    password: '123456',
    name: 'Test',
    avatar: 'av-1.png'
  };


  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const success = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (success) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.presentAlert('User or password');
    }

  }

  async register(fRegister: NgForm) {
    console.log(fRegister.valid);
    if (fRegister.invalid) {
      return;
    }

    const success = await this.userService.register(this.userRegister);

    if (success) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.presentAlert('User already exist');
    }
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
