import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireList } from 'angularfire2/database/interfaces';


@Injectable()
export class DataProvider {

  constructor(private camera: Camera, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private afStorage: AngularFireStorage) {
    
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  signIn(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  resetPw(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }

    return this.camera.getPicture(options);
  }

  uploadImage(image, publicFile: boolean) {
    let storageRef: AngularFireStorageReference;

    let newName = `${new Date().getTime()}-${this.afAuth.auth.currentUser.uid}.png`;

    if (publicFile) {
      storageRef = this.afStorage.ref(`/public/${newName}`);
    } else {
      storageRef = this.afStorage.ref(`/private/${this.afAuth.auth.currentUser.uid}/${newName}`);
    }

    return storageRef.putString(image, 'base64', { contentType: 'image/png'});
  }

  storeImageInformation(metainfo, publicFile: boolean) {
    let toSave = {
      public: publicFile,
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }

    if (publicFile) {
      this.db.list('public').push(toSave);
    } else {
      this.db.list(`private/${this.afAuth.auth.currentUser.uid}`).push(toSave);
    }
  }

  getImages(publicFile: boolean) {
    let ref: AngularFireList<any>;

    if (publicFile) {
      ref = this.db.list('public');
    } else {
      ref = this.db.list(`private/${this.afAuth.auth.currentUser.uid}`);
    }

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteFile(image) {
    console.log('image: ', image);
    let key = image.key;
    let storagePath = image.fullPath;

    let ref: AngularFireList<any>;

    if (image.public) {
      ref = this.db.list('public');
    } else {
      ref = this.db.list(`private/${this.afAuth.auth.currentUser.uid}`);
    }

    // Delet from DB
    ref.remove(key);

    this.afStorage.ref(storagePath).delete();
  }

}
