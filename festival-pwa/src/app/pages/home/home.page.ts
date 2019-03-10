import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from 'src/app/shared/models/newsitem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    news: NewsItem[];

    constructor(private http: HttpClient) {
        this.test();
    }

    test() {
      this.http.get<NewsItem[]>('https://festapp-pwa-backend.azurewebsites.net/api/news').subscribe(news => this.news = news);
    }
}
