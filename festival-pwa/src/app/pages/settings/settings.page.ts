import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastController } from '@ionic/angular';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isLite = false;
  doNotDownloadImages = false;

  constructor(public pwa: PWAService, public data: DataService, public settings: SettingsService, private toastController: ToastController) { }

  ngOnInit() {
    this.isLite = !this.settings.getData(this.settings.settings_not_lite_mode);
    this.doNotDownloadImages = this.settings.getData(this.settings.settings_do_not_download_images);
  }

  async clearCache() {
    this.data.clearAllDataCache();
    const toast = await this.toastController.create({
      message: 'Cache törölve',
      showCloseButton: false,
      position: 'bottom',
      duration: 2000
    });

    toast.present();
  }

  async clearImageCache() {
    this.data.clearImageCache();
    const toast = await this.toastController.create({
      message: 'Képek törölve',
      showCloseButton: false,
      position: 'bottom',
      duration: 2000
    });

    toast.present();
  }

  isLightChanged(value) {
    this.isLite = value;
    this.settings.saveData(this.settings.settings_not_lite_mode, !this.isLite);
  }

  imgDownloadChanged(value) {
    this.doNotDownloadImages = value;
    this.settings.saveData(this.settings.settings_do_not_download_images, this.doNotDownloadImages);
  }


}
