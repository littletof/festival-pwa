import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { SettingsService } from './settings.service';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PWAService {

  public promptEvent: any;
  public canInstall: boolean;

  public updateAvailable = false;

  constructor(private swUpdate: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallprompt install was triggered.');
      this.promptEvent = event;
      this.canInstall = true;
    });

    swUpdate.available.subscribe(event => {
      console.log('UpdateAvailable. REFRESH!');
      this.updateAvailable = true;
    });
  }

  public installPWA() {
    if (this.promptEvent) {
      this.promptEvent.prompt();
      this.canInstall = false;
      console.log('prompted to install.');
    } else {
      console.log('no prompt event fired...');
    }
  }

  public refresh() {
    this.updateAvailable = false;
    window.location.reload();
  }

}
