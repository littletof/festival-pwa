import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public pwa: PWAService, public data: DataService) { }

  ngOnInit() {
  }

}
