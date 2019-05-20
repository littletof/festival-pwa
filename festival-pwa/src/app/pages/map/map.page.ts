import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  overlayLat = 47.6607968; // y
  overlayLng = 16.5874597; // x

  mapZoom = 16;

  mapLat = this.overlayLat;
  mapLng = this.overlayLng;
  panned = false;

  lat;
  lng;

  locationUpdateInterval;

  constructor(public pwa: PWAService, public settings: SettingsService) {
    /* if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
        });
    } */

   }

  ngOnInit() {
  }

  setZoom(z: number) {
    this.mapZoom = z + 0.001;
    setTimeout(() => this.mapZoom = z, 10);
  }

  setMap(lat: number, lng: number) {
    this.mapLat = lat + (0.0000000000100 * Math.random());
    this.mapLng = lng + (0.0000000000100 * Math.random());
  }

  showFestival() {
    this.setMap(this.overlayLat, this.overlayLng);
    this.setZoom(16);
  }

  locateUser() {
    navigator.geolocation.getCurrentPosition(() => {});

    if (this.lat) {
      this.setMap(this.lat, this.lng);
      this.setZoom(16);
    }

    this.panned = false;
    if (navigator) {

      if (this.locationUpdateInterval) {
        clearInterval(this.locationUpdateInterval);
      }
      this.locationUpdateInterval = setInterval(() => {

        navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;

          if (!this.panned) {
            this.panned = true;
            this.setMap(this.lat, this.lng);
            this.setZoom(16);
          }
        });
      }, 5 * 1000);
    }
  }

}
