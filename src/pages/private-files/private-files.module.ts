import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivateFilesPage } from './private-files';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PrivateFilesPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivateFilesPage),
    ComponentsModule
  ],
})
export class PrivateFilesPageModule {}
