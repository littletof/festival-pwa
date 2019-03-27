import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    news: NewsItem[];

    constructor(private http: HttpClient, public pwa: PWAService, private data: DataService) {
        this.doRefresh(null);
    }

    doRefresh(event) {
      this.data.getJSON<NewsItem[]>('https://festapp-pwa-backend.azurewebsites.net/api/news').subscribe(news => {
        console.log('GOT', news);
        this.news = news;
        if (event) {
          event.target.complete();
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
