import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './shared/services/app.service';

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
      icon: 'home'
    },
    {
      title: 'Programok',
      url: '/programs',
      icon: 'paper'
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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.version = this.app.getVersion().version;
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
