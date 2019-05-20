import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  lastOnlineKey = 'settings_last_online_date';
  settings_not_lite_mode = 'settings_not_lite_mode';
  settings_do_not_download_images = 'settings_do_not_download_images';
  settings_has_management_access = 'settings_has_management_access';
  settings_requested_user_location = 'settings_has_management_access';

  favourites_list = 'favourites';

  constructor() { }

  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  getFavorites(): string[] {
    return this.getData(this.favourites_list) || [];
  }

  addFavorite(id: string) {
    this.removeFavorite(id);
    let favs = this.getData(this.favourites_list) as string[];
    favs = favs.concat(id);
    this.saveData(this.favourites_list, favs);
  }

  removeFavorite(id: string) {
    const favs = this.getFavorites();
    const ind = favs.indexOf(id);
    if (ind !== -1) {
      favs.splice(ind, 1);
    }
    this.saveData(this.favourites_list, favs);
  }

  setSessionData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSessionData(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
