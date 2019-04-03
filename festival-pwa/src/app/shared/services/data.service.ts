import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, get, set, keys, clear} from 'idb-keyval';
import { LocalStorageData, ProgData } from '../models/data';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private imageStore = new Store('FestApp', 'Images');

  constructor(private http: HttpClient, private app: AppService) { }

  clearDataCache() {
    localStorage.clear();
    clear(this.imageStore);
    // legyen lista több db name és azon iteráljon végig
  }

  lsGetItem<T = any>(key: string): LocalStorageData<T> {
    const data = localStorage.getItem(key);
    if (!data) {
       return null;
    }

    const pData: LocalStorageData<T> = JSON.parse(data);
    pData.cacheDate = new Date(pData.cacheDate);

    return pData;
  }

  lsSetItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify({data: data, cacheDate: new Date()} as LocalStorageData<T>));
  }

  cacheFreshEnough(cDate: Date): boolean {
    return (new Date().getTime() - cDate.getTime()) < 60 * 1000;
  }

  getJSON<T = any>(url: string, allowJustCache: boolean = true, useCache: boolean = true): Observable<ProgData<T>> {
    const cache: BehaviorSubject<ProgData<T>> = new BehaviorSubject<ProgData<T>>(null);

    if (useCache) {
        const cachedResponse = this.lsGetItem(url);
        if (cachedResponse) {
          const cacheUpToDate = this.cacheFreshEnough(cachedResponse.cacheDate) || !this.app.isOnline;
          console.log('replay cached', cachedResponse);

          cache.next({src: 'cache', payload: cachedResponse.data, cacheDate: cachedResponse.cacheDate, wontFetch: cacheUpToDate});

          if (allowJustCache && cacheUpToDate) {
            console.log('Cache fresh enough, not fetching');
            return cache;
          }
        }
    }

    if (this.app.isOnline) {
        this.http.get<T>(url).subscribe(o => {
            console.log('next fresh', o);
            cache.next({src: 'web', payload: o});
            this.lsSetItem(url, o);
          },
          error => {
            console.log('Cached data get error', error);
          }
        );
    }

    return cache;
  }

  getImageURL(url: string, useCache: boolean = true): Observable<string> {
    if (!url) {
      return of(null);
    }
    if (!useCache) {
      return of(url);
    }
    // return of(url);
    const urlObs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    get(url, this.imageStore).then(data => {

      if (data) {
        console.log('return from indexedDB', data);
        urlObs.next(URL.createObjectURL(data));
      } else {

        this.http.get(url, { responseType: 'blob' }).subscribe(imageBlob => {
          set(url, imageBlob, this.imageStore);
          urlObs.next(URL.createObjectURL(imageBlob));
        }, e => console.log(e));
      }
    });

    return urlObs;
  }
}
