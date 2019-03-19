import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { IonicModule } from '@ionic/angular';
import { OnlineStatusComponent } from './components/online-status/online-status.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [NewsCardComponent, OnlineStatusComponent],
  exports: [NewsCardComponent, OnlineStatusComponent]
})
export class SharedModule { }
