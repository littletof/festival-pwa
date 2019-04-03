import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store, get, set, keys, clear} from 'idb-keyval';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private imageStore = new Store('FestApp', 'Images');

  constructor(private http: HttpClient) { }

  clearDataCache() {
    localStorage.clear();
    clear(this.imageStore);
    // legyen lista több db name és azon iteráljon végig
  }

  getJSON<T = any>(url: string, useCache: boolean = true): Observable<T> {
    if (!useCache) {
      return this.http.get<T>(url);
    }

    const cache: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    const cachedResponse = localStorage.getItem(url);
    if (cachedResponse) {
      console.log('replay cached', JSON.parse(cachedResponse));
      cache.next(JSON.parse(cachedResponse));
      // TODO cache strategy, mi legyen
      return cache;
    }

    this.http.get<T>(url).subscribe(o => {
      cache.next(o);
      console.log('next fresh', o);
      localStorage.setItem(url, JSON.stringify(o));
    },
    error => {
      console.log('Cached data get error', error);
    });

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

/*
        this.http.get<any>(url).subscribe(image => {
          const blob = image.blob();
          set(url, blob, this.imageStore);
          console.log('set');
          urlObs.next(URL.createObjectURL(blob));
        });
*/
      }
    });

    /*
    if (cachedImage) {
      return of(URL.createObjectURL(cachedImage));
    }

    fetch(url).then(res => res.blob()).then(blob => {

    });*/

    return urlObs;
  }
}
