import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { IonicModule } from '@ionic/angular';
import { OnlineStatusComponent } from './components/online-status/online-status.component';
import { ImageCachePipe } from './pipes/image-cache.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NewsCardComponent,
    OnlineStatusComponent,
    ImageCachePipe,
  ],
  exports: [
    NewsCardComponent,
    OnlineStatusComponent,
    ImageCachePipe,
  ]
})
export class SharedModule { }
