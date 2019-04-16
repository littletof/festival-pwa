import { Component, OnDestroy } from '@angular/core';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { FetcherService } from 'src/app/shared/services/fetcher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [FetcherService]
})
export class HomePage implements OnDestroy {

    news: NewsItem[];

    constructor(public pwa: PWAService, public fetcher: FetcherService<NewsItem[]>) {
        fetcher.register('#backend#/api/news').subscribe(news => this.news = news);
    }

    ngOnDestroy(): void {
      this.fetcher.unsubscribe();
    }
  }
