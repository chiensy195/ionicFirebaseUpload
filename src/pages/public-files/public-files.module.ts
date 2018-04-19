import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicFilesPage } from './public-files';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PublicFilesPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicFilesPage),
    ComponentsModule
  ],
})
export class PublicFilesPageModule {}
