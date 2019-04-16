import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { PWAService } from '../services/pwa.service';
import { DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../services/app.service';

@Pipe({
  name: 'imageCache'
})
export class ImageCachePipe implements PipeTransform {

  constructor(private settings: SettingsService, private pwa: PWAService, private data: DataService, private app: AppService) {}

  transform(value: string, qualityFirst: boolean): BehaviorSubject<string> {
    const p = new BehaviorSubject<string>(null);

    // p.next('https://via.placeholder.com/140x120'); this.san.bypassSecurityTrustResourceUrl(
    this.requireImage(this.data.placeholderImageUrl, qualityFirst, p);

    if (!this.app.isOnline && !this.settings.getData(this.settings.settings_do_not_download_images)) {
      this.whenOnlineTryAgain(value, qualityFirst, p);
    } else {
      this.requireImage(value, qualityFirst, p);
    }

    return p;
  }

  whenOnlineTryAgain(value: string, qualityFirst: boolean, p: BehaviorSubject<string>) {
    this.app.nospamlog('1233', console.log, 'Subscribed to retrive image when online', 1);
    const sub = this.app.getOnlineStatusObservable().subscribe(online => {
      if (online && !this.settings.getData(this.settings.settings_do_not_download_images)) {
        this.app.nospamlog('1263', console.log, 'Online, retriving image', 1);
        this.requireImage(value, qualityFirst, p);
        sub.unsubscribe();
      }
    });
  }

  requireImage(value: string, qualityFirst: boolean, p: BehaviorSubject<string>) {
    if (value) {
      if (qualityFirst) {
        const notLight = this.settings.getData(this.settings.settings_not_lite_mode);
        if (notLight) {
          this.data.getImageURL(value).subscribe(url => p.next(url));
          value = value.replace('w360', 'original');
        }
      }
      this.data.getImageURL(value).subscribe(url => p.next(url));
    } else {
      console.error('Null value url into imageCachePipe');
    }
  }
}
