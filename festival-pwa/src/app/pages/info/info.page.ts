import { Component, OnInit } from '@angular/core';

import { VERSION } from '../../../environments/version';
import { Platform } from '@ionic/angular';
import { PWAService } from 'src/app/shared/services/pwa.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  version = VERSION;
  platforms = this.platform.platforms();

  constructor(private platform: Platform, public pwa: PWAService) { }

  ngOnInit() {
  }

}
