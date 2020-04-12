import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertController: AlertController
  ) { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
