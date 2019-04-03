import { Component, OnInit, ViewChild } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('slider') slider: any;
  activeSlide = 0;

  constructor(public pwa: PWAService) { }

  ngOnInit() {
  }

  isHome() {
    return this.activeSlide === 0;
  }

  swiped(ev) {
    this.slider.getActiveIndex().then(i => this.activeSlide = i);
  }

  home() {
    this.slider.slideTo(0);
  }

}
