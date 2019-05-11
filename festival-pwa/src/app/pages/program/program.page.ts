import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { ToastController, IonDatetime } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from 'src/app/shared/models/program';
import { DataService } from 'src/app/shared/services/data.service';
import { HashedData } from 'src/app/shared/models/data';
import { FetcherService } from 'src/app/shared/services/fetcher.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
  providers: [FetcherService]
})
export class ProgramPage implements OnInit {

  isFavourite: boolean;
  sub: Subscription;
  id: string;
  program: Program;

  offest: any;

  news: NewsItem[];
  newsFetcher: FetcherService<NewsItem[]>;

  constructor(private route: ActivatedRoute, public pwa: PWAService, public data: DataService, public app: AppService, public settings: SettingsService,
    private toastController: ToastController, public fetcher: FetcherService<Program[]>) {
      this.newsFetcher = new FetcherService<NewsItem[]>(data, app);
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.fetcher.register('#backend#/api/programs').subscribe(programs => {
        if (programs) {
          console.log('GOT', programs);
          this.program = programs.filter(p => p.internalId === this.id)[0];
          if (this.program == null) {
            window.history.back();
          }

          this.program.start_Time = new Date(this.program.start_Time);
          this.program.end_Time = new Date(this.program.end_Time);

          this.isFavourite = this.checkIsFavourite();
          this.offest = this.calcOffset();
          if (this.offest === 6) {
            this.offest = false;
          }

          this.filterNews();
        }
      });
   });
  }

  filterNews() {
    this.newsFetcher.register('#backend#/api/news').subscribe(news => {
      if (news) {
        this.news = news.filter(n => {
            const dateTags = (JSON.parse(n.dateTags) as Date[]).map(d => new Date(d));
            const placeTags = JSON.parse(n.placeTags);
            const programTags = JSON.parse(n.programTags);

            console.log(dateTags, placeTags, programTags);

            // ha nincs tagelve, akkor nem spec hír.
            if (dateTags.length === 0 && placeTags.length === 0 && programTags.length === 0) {
              return false;
            }

            // program tagelve
            if (programTags.indexOf(this.program.internalId) !== -1) {
              return true;
            }

            // dátum nincs, színpad tagelve
            if (dateTags.length === 0 && placeTags.indexOf(this.program.placeId) !== -1) {
              return true;
            }

            // hely tagelve, vagy nincs semmi hely, ÉS dátum illeszkedik.
            if ((placeTags.indexOf(this.program.placeId) !== -1 || placeTags.length === 0) && dateTags.length > 0 && this.isInDate(dateTags, this.program.start_Time, this.program.end_Time)) {
              return true;
            }

        });

      }
    });
  }

  isInDate(newsDates: Date[], start: Date, end: Date) {
    if (!newsDates || newsDates.length === 0) {
      return false;
    }

    return newsDates.filter(d => {
      const st = new Date(d);
      st.setHours(9);
      const nd = new Date(d);
      nd.setHours(32);

      console.log(d);
      d.setHours(32);
      console.log(d);
      console.log(start, end);
      return start < nd && st < end;
    }).length > 0;
  }

  toggleFavourite() {
    if (!this.isFavourite) {
      this.settings.addFavorite(this.program.internalId);
      this.addedToFavourites();
    } else {
      this.settings.removeFavorite(this.program.internalId);
      this.removedFromFavourites();
    }
    this.isFavourite = this.checkIsFavourite();
  }

  checkIsFavourite() {
    return this.settings.getFavorites().indexOf(this.program.internalId) !== -1;
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
        this.settings.addFavorite(this.program.internalId);
        this.isFavourite = this.checkIsFavourite();
      }
    });
    toast.present();
  }

  goToUrl(url: string) {
    window.open(url, '_blank');
  }

  calcOffset() {
    let items = 0;
    if (this.program.social_Web) { items++; }
    if (this.program.social_Facebook) { items++; }
    if (this.program.social_Instagram) { items++; }
    if (this.program.social_Youtube) { items++; }
    if (this.program.social_Twitter) { items++; }
    return (12 - items * 2) / 2;
  }

}
