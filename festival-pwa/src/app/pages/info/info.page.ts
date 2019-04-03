import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  version: any;
  platforms = this.platform.platforms();

  constructor(private platform: Platform, public pwa: PWAService, private app: AppService) {
    this.version = app.getVersion();
   }

  ngOnInit() {
  }

}
