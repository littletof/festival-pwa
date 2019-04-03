import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { PWAService } from '../services/pwa.service';
import { DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'imageCache'
})
export class ImageCachePipe implements PipeTransform {

  constructor(private settings: SettingsService, private pwa: PWAService, private data: DataService) {}

  transform(value: string): BehaviorSubject<string> {
    const p = new BehaviorSubject<string>(null);

    p.next('https://via.placeholder.com/140x120');

    if (value) {
      this.data.getImageURL(value).subscribe(url => p.next(url));
    } else {
      console.error('Null value url into imageCachePipe');
    }


    return p;
  }

}
