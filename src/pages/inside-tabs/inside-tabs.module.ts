import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsideTabsPage } from './inside-tabs';

@NgModule({
  declarations: [
    InsideTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(InsideTabsPage),
  ],
})
export class InsideTabsPageModule {}
