import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, get, set, keys, clear} from 'idb-keyval';
import { LocalStorageData, ProgData } from '../models/data';
import { AppService } from './app.service';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public placeholderImageUrl = 'https://widget.szigetfestival.com/imgproxy/5c7e898c1b4f8_original.jpg';
  private imageStore = new Store('FestApp', 'Images');

  constructor(private http: HttpClient, private app: AppService, public settings: SettingsService) { }

  clearAllDataCache() {
    localStorage.clear();
    this.clearImageCache();
    // legyen lista több db name és azon iteráljon végig
  }

  clearImageCache() {
    get(this.placeholderImageUrl, this.imageStore).then(img => {
      console.log(img);
      clear(this.imageStore);

      if (img) { // if it has the placeholder dont delete it.
        set(this.placeholderImageUrl, img, this.imageStore);
      }
    });

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
            console.log('Couldn\'t fetch fresh data', error);
            cache.next({wontFetch: true, error: error, src: 'web'});
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
        // console.log('return from indexedDB', data);
        urlObs.next(URL.createObjectURL(data));
      } else {

        if (!this.settings.getData(this.settings.settings_do_not_download_images)) {

          this.http.get(url, { responseType: 'blob' }).subscribe(imageBlob => {
            set(url, imageBlob, this.imageStore);
            urlObs.next(URL.createObjectURL(imageBlob));
          }, e => console.log(e));

        } else {
          this.app.nospamlog('2312', console.warn, 'No image, because setting was set not to download it.', 1);
        }

      }
    });

    return urlObs;
  }
}
