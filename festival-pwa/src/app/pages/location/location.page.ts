import { Component, OnInit, ViewChild } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { ToastController } from '@ionic/angular';
import { FetcherService } from 'src/app/shared/services/fetcher.service';
import { Program } from 'src/app/shared/models/program';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  providers: [FetcherService]
})
export class LocationPage implements OnInit {

  @ViewChild('slider') slider: any;
  activeSlide = 0;

  sub: Subscription;
  id: string;

  place: Place;

  constructor(private route: ActivatedRoute, public pwa: PWAService, public data: DataService, public settings: SettingsService,
    private toastController: ToastController, public fetcher: FetcherService<Place[]>, public progFetcher: FetcherService<Program[]>) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetcher.register('#backend#/api/places').subscribe(places => {
        if (places) {
          console.log('GOT', this.id, places);
          // tslint:disable-next-line:triple-equals
          this.place = places.filter(p => p.placeId === this.id)[0];
          if (this.place == null) {
            window.history.back();
          }
        }
      });

      this.progFetcher.register('#backend#/api/programs').subscribe(progs => {
        console.log(progs);
      })
   });
  }

  isHome() {
    return this.activeSlide === 0;
  }

  swiped(ev) {
    this.slider.getActiveIndex().then(i => this.activeSlide = i);
  }

  home() {
    this.slider.slideTo(0);
  }

}
