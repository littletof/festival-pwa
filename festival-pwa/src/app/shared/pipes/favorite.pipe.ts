import { Pipe, PipeTransform } from '@angular/core';
import { Program } from '../models/program';
import { SettingsService } from '../services/settings.service';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  constructor(private settings: SettingsService) {}

  transform(programs: Program[], filter: boolean): any {
    const favs = this.settings.getFavorites();
    if (!filter) {
      return programs;
    }
    return programs.filter(p => {
      return favs.indexOf(p.internalId) !== -1;
    });
  }

}
