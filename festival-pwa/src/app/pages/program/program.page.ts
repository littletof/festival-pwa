import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { ToastController } from '@ionic/angular';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {

  isFavourite: boolean;

  constructor(public pwa: PWAService, private toastController: ToastController) { }

  ngOnInit() {
  }

  toggleFavourite() {
    this.isFavourite = !this.isFavourite;
    if (this.isFavourite) {
      this.addedToFavourites();
    } else {
      this.removedFromFavourites();
    }
  }

  async addedToFavourites() {
    const toast = await this.toastController.create({
      message: 'Hozzáadva a kedvenceidhez',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Kedvencek',
      duration: 2000
    });
    toast.onDidDismiss().then((data) => {
      if (data.role === 'cancel') {
        alert('KEDVENCEK');
      }
    });
    toast.present();
  }

  async removedFromFavourites() {
    const toast = await this.toastController.create({
      message: 'Eltávolítva a kedvencek közül',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Visszavonás',
      duration: 2000
    });
    toast.onDidDismiss().then((data) => {
      if (data.role === 'cancel') {
        this.isFavourite = true;
      }
    });
    toast.present();
  }

}
