import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from 'src/app/shared/models/program';
import { DataService } from 'src/app/shared/services/data.service';
import { HashedData } from 'src/app/shared/models/data';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {

  isFavourite: boolean;
  sub: Subscription;
  id: number;
  program: Program;

  constructor(private route: ActivatedRoute, public pwa: PWAService, public data: DataService, private toastController: ToastController) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.data.getJSON<HashedData<Program[]>>('https://festapp-pwa-backend.azurewebsites.net/api/news/programs').subscribe(programs => {
        console.log('GOT', programs);
        this.program = programs.payload.data[this.id];
      });
   });
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
