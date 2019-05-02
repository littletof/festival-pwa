import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { IonicModule } from '@ionic/angular';
import { OnlineStatusComponent } from './components/online-status/online-status.component';
import { ImageCachePipe } from './pipes/image-cache.pipe';
import { FavoritePipe } from './pipes/favorite.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NewsCardComponent,
    OnlineStatusComponent,
    ImageCachePipe,
    FavoritePipe,
  ],
  exports: [
    NewsCardComponent,
    OnlineStatusComponent,
    ImageCachePipe,
    FavoritePipe,
  ]
})
export class SharedModule { }
