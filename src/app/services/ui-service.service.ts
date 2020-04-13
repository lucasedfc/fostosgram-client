import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline'
        }, {
          text: 'Done',
          role: 'cancel'
        }
      ]
    });
    toast.present();

  }
}
