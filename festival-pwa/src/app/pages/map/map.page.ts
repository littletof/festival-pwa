import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  lat: number = 47.6607968; // y
  lng: number = 16.5874597; // x
  // 47.6607968,16.5864597
  // 47.6620361,16.5885741,613m

  constructor() { }

  ngOnInit() {
  }

}
