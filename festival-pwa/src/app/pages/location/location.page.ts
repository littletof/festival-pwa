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
import { NewsItem } from 'src/app/shared/models/newsitem';

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

  programs: (Program & {start_Time: Date, end_Time: Date})[];
  programFetcher: FetcherService<Program[]>;

  news: NewsItem[];
  newsFetcher: FetcherService<NewsItem[]>;

  favorites: string[];

  constructor(private route: ActivatedRoute, public pwa: PWAService, public data: DataService, public settings: SettingsService,
    public app: AppService, private toastController: ToastController) {
      this.fetcher = new FetcherService<Place[]>(data, app);
      this.programFetcher = new FetcherService<Program[]>(data, app);
      this.newsFetcher = new FetcherService<NewsItem[]>(data, app);
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
          this.filterNews();
          this.slider.update();
        }
      });

      this.programFetcher.register('#backend#/api/programs').subscribe((progs: Program[]) => {
        if (progs) {
          const fetchedProgs = progs;

          this.programs = [];
          for (const prog of fetchedProgs) {
            prog.event_Time = JSON.parse(prog.event_Time as unknown as string);

            prog.event_Time = prog.event_Time.map(o => {
              return {start: new Date(o.start), end: new Date(o.end)};
            });

            for (const ev of prog.event_Time) {
              this.programs.push({...prog, start_Time: ev.start, end_Time: ev.end});
            }
          }

          this.programs = this.programs.filter(p => p.placeId === this.id).sort((p1, p2) => new Date(p1.start_Time).getTime() - new Date(p2.start_Time).getTime() );
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

  isNewDate(prevprog: (Program & {start_Time: Date, end_Time: Date}), program: (Program & {start_Time: Date, end_Time: Date})) {
    // TODO hónapokon átívelve nem megy
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

  filterNews() {
    this.newsFetcher.register('#backend#/api/news').subscribe(news => {
      if (news) {
        this.news = news.filter(n => {
            const placeTags = JSON.parse(n.placeTags);
            // program tagelve
            if (placeTags.indexOf(this.place.placeId) !== -1) {
              return true;
            }
        });
        if (this.news.length) {
          setTimeout(() => this.slidernews.update(), 100);
        }
      }
    });
  }

  ionViewWillEnter() {
    this.favorites = this.settings.getFavorites();
  }

}
