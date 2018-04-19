import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inside-tabs',
  templateUrl: 'inside-tabs.html',
})
export class InsideTabsPage {

  privateRoot = 'PrivateFilesPage';
  publicRoot = 'PublicFilesPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
