import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, get, set, keys, clear} from 'idb-keyval';
import { CachedData, ProgData, HashedData } from '../models/data';
import { AppService } from './app.service';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public placeholderImageUrl = 'https://widget.szigetfestival.com/imgproxy/5c7e898c1b4f8_w360.jpg';
  private imageStore = new Store('FestApp', 'Images');
  // needs a different db right now.
  // https://github.com/jakearchibald/idb-keyval/issues/31
  private jsonStore = new Store('FestApp2', 'Api');

  constructor(private http: HttpClient, private app: AppService, public settings: SettingsService) { }

  clearAllDataCache() {
    const favs = this.settings.getFavorites();
    localStorage.clear();
    this.clearImageCache();
    clear(this.jsonStore);
    // legyen lista több db name és azon iteráljon végig

    this.settings.saveData(this.settings.favourites_list, favs);
  }

  async clearImageCache() {
    const dimgw360 = await get(this.placeholderImageUrl, this.imageStore);
    const dimgorigin = await get(this.placeholderImageUrl.replace('w360', 'original'), this.imageStore);
    clear(this.imageStore);

    if (dimgw360) { // if it has the placeholder dont delete it.
        set(this.placeholderImageUrl, dimgw360, this.imageStore);
    }
    if (dimgorigin) { // if it has the placeholder dont delete it.
      set(this.placeholderImageUrl.replace('w360', 'original'), dimgorigin, this.imageStore);
    }

  }

  lsGetItem<T = any>(key: string): CachedData<T> {
    const data = localStorage.getItem(key);
    if (!data) {
       return null;
    }

    const pData: CachedData<T> = JSON.parse(data);
    pData.cacheDate = new Date(pData.cacheDate);

    return pData;
  }

  lsSetItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify({data: data, cacheDate: new Date()} as CachedData<T>));
  }

  async getCachedData<T = any>(key: string): Promise<CachedData<T>> {
    const data = await get(key, this.jsonStore) as CachedData<T>;
    if (!data) {
        return null;
    }
    /*const pData: CachedData<T> = JSON.parse(data);
    pData.cacheDate = new Date(pData.cacheDate);*/
    return data;
  }

  saveCachedData(key: string, value: any): Promise<void> {
    return set(key, {data: value, cacheDate: new Date()}, this.jsonStore);
  }

  cacheFreshEnough(cDate: Date): boolean {
    return (new Date().getTime() - cDate.getTime()) < 60 * 1000;
  }

  getJSON<T = any>(url: string, allowJustCache: boolean = true, useCache: boolean = true): Observable<ProgData<T>> {
    const cache: BehaviorSubject<ProgData<T>> = new BehaviorSubject<ProgData<T>>(null);

    if (useCache) {
        // const cachedResponse = this.lsGetItem(url);
        this.getCachedData(url).then(cachedResponse => {
          if (cachedResponse) {
            const cacheUpToDate = this.cacheFreshEnough(cachedResponse.cacheDate) || !this.app.isOnline;
            console.log('replay cached', cachedResponse);

            cache.next({src: 'cache', payload: cachedResponse.data, cacheDate: cachedResponse.cacheDate, wontFetch: cacheUpToDate});

            if (allowJustCache && cacheUpToDate) {
              console.log('Cache fresh enough, not fetching');
              return;
            }
          }
          console.log('still gets it');
          if (this.app.isOnline) {
            this.http.get<T>(url).subscribe(o => {
                console.log('next fresh', o);
                cache.next({src: 'web', payload: o});
                // this.lsSetItem(url, o);
                // TODO
                this.saveCachedData(url, o);
              },
              error => {
                console.log('Couldn\'t fetch fresh data', error);
                cache.next({wontFetch: true, error: error, src: 'web'});
              }
            );
          }
        });
    }

    return cache;
  }

  getImageURL(url: string, useCache: boolean = true, forceHttpGet: boolean = false): Observable<string> {
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

        if (!this.settings.getData(this.settings.settings_do_not_download_images) || forceHttpGet) {

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
