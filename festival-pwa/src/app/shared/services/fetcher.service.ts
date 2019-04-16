import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { AppService } from './app.service';
import { HashedData } from '../models/data';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetcherService<T> {

  subject: BehaviorSubject<T> = new BehaviorSubject(null);
  fetchUrl: string;

  prevHash: number = null;
  cacheDate: Date = null;
  actualGet: Subscription;
  onlineSub: Subscription;

  constructor(private data: DataService, public app: AppService) {
    console.log('construct fetcher');
  }

  register(url: string): BehaviorSubject<T> {
    this.fetchUrl = url.replace('#backend#', environment.apiUrl);
    this.onlineSub = this.app.getOnlineStatusObservable().subscribe(on => on && this.refresh(null));

    this.refresh();

    return this.subject;
  }


  refresh(event: any = null) {
    this.actualGet = this.data.getJSON<HashedData<T>>(this.fetchUrl).subscribe(data => {
      console.log('GOT', data);
      if (data) {
          if (data.payload && (!this.prevHash || (data.payload && data.payload.hash !== this.prevHash))) {
            console.log('refreshed, because hash doesnt equal', data.payload.hash, this.prevHash);
            this.prevHash = data.payload.hash;
            this.cacheDate = data.cacheDate || this.cacheDate;
            this.subject.next(data.payload.data);
          }
          if (event && (data.src === 'web' || data.wontFetch)) {
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

  getCacheDate(): Date {
    return this.cacheDate;
  }

  unsubscribe() {
    this.actualGet.unsubscribe();
    this.subject.unsubscribe();
    this.onlineSub.unsubscribe();
  }
}
