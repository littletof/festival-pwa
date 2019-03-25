import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  lastOnlineKey = 'settings_last_online_date';

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
}
