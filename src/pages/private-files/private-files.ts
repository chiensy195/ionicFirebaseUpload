import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-private-files',
  templateUrl: 'private-files.html',
})
export class PrivateFilesPage {
  images: Observable<any>;
  loadProgress = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
    this.images = this.dataProvider.getImages(false);
  }

  logout() {
    this.dataProvider.signOut();
  }

  captureAndUpload() {
    this.dataProvider.captureImage().then(data => {
      let upload = this.dataProvider.uploadImage(data, false);

      upload.then().then(res => {
        this.dataProvider.storeImageInformation(res.metadata, false);
      });

      upload.catch(err => {
        console.log('err: ', err);
      });

      upload.percentageChanges().subscribe(change => {
        console.log('change: ', change);
        this.loadProgress = Math.floor(change);
      });
    });
  }

  deleteFile(image) {
    this.dataProvider.deleteFile(image);
  }

}
