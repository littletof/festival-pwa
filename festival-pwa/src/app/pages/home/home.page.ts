import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';
import { HashedData, ProgData } from 'src/app/shared/models/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    news: ProgData<HashedData<NewsItem[]>>;

    constructor(private http: HttpClient, public pwa: PWAService, private data: DataService) {
        this.doRefresh(null);
    }

    doRefresh(event) {
      this.data.getJSON<HashedData<NewsItem[]>>('https://festapp-pwa-backend.azurewebsites.net/api/news').subscribe(news => {
        console.log('GOT', news);
        if (news) {
            if (!this.news || (news.payload && news.payload.hash !== this.news.payload.hash)) {
              console.log('refreshed, because hash doesnt equal', news.payload.hash, this.news && this.news.payload.hash);
              this.news = news;
            }

            if (event && (news.src === 'web' || news.wontFetch)) {
              event.target.complete();
            }
        }
      },
      error => {
        // console.log(error);
        if (event) {
          event.target.complete();
        }
      });
    }
}
