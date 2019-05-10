import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { ToastController } from '@ionic/angular';
import { FetcherService } from 'src/app/shared/services/fetcher.service';
import { Program } from 'src/app/shared/models/program';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss']
})
export class LocationPage implements OnInit {

  @ViewChild('slider') slider: any;
  @ViewChild('slidernews') slidernews: any;
  activeSlide = 0;

  sub: Subscription;
  id: string;

  place: Place;
  fetcher: FetcherService<Place[]>;

  programs: Program[];
  programFetcher: FetcherService<Program[]>;

  favorites: string[];

  constructor(private route: ActivatedRoute, public pwa: PWAService, public data: DataService, public settings: SettingsService,
    public app: AppService, private toastController: ToastController) {
      this.fetcher = new FetcherService<Place[]>(data, app);
      this.programFetcher = new FetcherService<Program[]>(data, app);
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetcher.register('#backend#/api/places').subscribe(places => {
        if (places) {
          // tslint:disable-next-line:triple-equals
          this.place = places.filter(p => p.placeId === this.id)[0];
          if (this.place == null) {
            window.history.back();
          }
          this.slider.update();
          this.slidernews.update();
        }
      });

      this.programFetcher.register('#backend#/api/programs').subscribe((progs: Program[]) => {
        if (progs) {
          this.programs = progs.filter(p => p.placeId === this.id).sort((p1, p2) => new Date(p1.start_Time).getTime() - new Date(p2.start_Time).getTime() );
          this.programs.map((program, index, array) => {
            const prevProg =  index === 0 ? null : array[index - 1];
            const newDate = this.isNewDate(prevProg, program);
            (program as any).onNewDate = newDate;
            return program;
          });

          this.favorites = this.settings.getFavorites();
        }
      });
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

  isNewDate(prevprog: Program, program: Program) {
    if (prevprog == null) {
      return true;
    }
    const actDate = new Date(program.start_Time);
    actDate.setHours(actDate.getHours() - 8);

    const prevDate = new Date(prevprog.start_Time);
    prevDate.setHours(prevDate.getHours() - 8);

    return actDate.getDay() !== prevDate.getDay();
  }

  checkIsFavourite(internalId) {
    return this.favorites.indexOf(internalId) !== -1;
  }

  ionViewWillEnter() {
    this.favorites = this.settings.getFavorites();
  }

}
