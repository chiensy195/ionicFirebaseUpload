import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  creds = {email: '', password: ''};

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  login() {
    this.dataProvider.signIn(this.creds).then(res => {

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  register() {
    this.dataProvider.signUp(this.creds).then(res => {
      let toast = this.toastCtrl.create({
        duration: 3000,
        message: 'Succesfully created new Account!'
      });
      toast.present();
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

  openReset() {
    let inputAlert = this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          handler: data => {
            this.resetPw(data.email);
          }
        }
      ]
    });
    inputAlert.present();
  }

  resetPw(email) {
    this.dataProvider.resetPw(email).then(res => {
      let toast = this.toastCtrl.create({
        duration: 3000,
        message: 'Success! Check your Emails for more information.'
      });
      toast.present();
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
