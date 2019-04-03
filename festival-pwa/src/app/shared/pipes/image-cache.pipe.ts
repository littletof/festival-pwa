import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { PWAService } from '../services/pwa.service';

@Pipe({
  name: 'imageCache'
})
export class ImageCachePipe implements PipeTransform {

  constructor(private settings: SettingsService, private pwa: PWAService) {}

  transform(value: any): any {


    return null;
  }

}
