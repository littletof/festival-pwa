import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class PWAService {

  lastOnlineKey = 'settings_last_online_date';

  isOnline = navigator.onLine;

  constructor(private connectionService: ConnectionService, private settings: SettingsService) {
    if (navigator.onLine) {
      this.nowOnline();
    }

    this.connectionService.monitor().subscribe(isOnline => {
      this.isOnline = isOnline;
      if (isOnline) {
        this.nowOnline();
      }
    });
  }

  getLastOnlineDate(): Date {
    return this.settings.getData(this.lastOnlineKey);
  }

  private nowOnline() {
    this.settings.saveData(this.lastOnlineKey, new Date());
  }

}
