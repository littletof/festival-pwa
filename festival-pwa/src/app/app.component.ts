import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './shared/services/app.service';
import { PWAService } from './shared/services/pwa.service';

import localeHU from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';
import { SettingsService } from './shared/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  version: any;

  public appPages = [
    {
      title: 'Hírek',
      url: '/',
      icon: 'paper'
    },
    {
      title: 'Programok',
      url: '/programs',
      icon: 'book'
    },
    {
      title: 'Térkép',
      url: '/map',
      icon: 'map'
    },
    {
      title: 'Infó',
      url: '/info',
      icon: 'information-circle'
    },
    {
      title: 'Beállítások',
      url: '/settings',
      icon: 'settings'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private app: AppService,
    public pwa: PWAService,
    public settings: SettingsService,
    private statusBar: StatusBar,
  ) {
    registerLocaleData(localeHU, 'hu');
    this.initializeApp();
  }

  initializeApp() {
    if (this.settings.getData(this.settings.settings_has_management_access)) {
      this.appPages.push({
        title: 'Management',
        url: '/management',
        icon: 'bug'
      });
    }
    this.version = this.app.getVersion().version;
    /*this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });*/
  }
}
