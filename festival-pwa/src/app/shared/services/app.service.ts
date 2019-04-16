import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SettingsService } from './settings.service';

import { VERSION } from '../../../environments/version';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isOnline = navigator.onLine;

  mutedLogs: string[] = [];

  constructor(private connectionService: ConnectionService, private settings: SettingsService) {
    this.setupOnline();
  }

  private setupOnline() {
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

  getOnlineStatusObservable(): Observable<boolean> {
    return this.connectionService.monitor();
  }

  getLastOnlineDate(): Date {
    return this.settings.getData(this.settings.lastOnlineKey);
  }

  nospamlog(id: string, console: (any) => any, message: any, muteFor: number) {
    if (this.mutedLogs.indexOf(id) === -1) {
      this.mutedLogs.push(id);
      console(message);
      setTimeout(() => {
        this.mutedLogs = this.mutedLogs.filter(i => i !== id);
      }, muteFor * 1000);
    }
  }

  getVersion() {
    return VERSION;
  }

  private nowOnline() {
    this.isOnline = navigator.onLine;
    this.settings.saveData(this.settings.lastOnlineKey, new Date());
  }
}
