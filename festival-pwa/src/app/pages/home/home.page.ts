import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { PWAService } from 'src/app/shared/services/pwa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    news: NewsItem[];

    constructor(private http: HttpClient, public pwa: PWAService) {
        this.test();
    }

    test() {
      this.http.get<NewsItem[]>('https://festapp-pwa-backend.azurewebsites.net/api/news').subscribe(news => this.news = news);
    }


    doRefresh(event) {
      this.http.get<NewsItem[]>('https://festapp-pwa-backend.azurewebsites.net/api/news').subscribe(news => {
        this.news = news;
      },
      error => {
        console.log(error);
      },
      () => event.target.complete());
    }
}
