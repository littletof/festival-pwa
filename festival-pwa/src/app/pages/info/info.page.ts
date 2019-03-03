import { Component, OnInit } from '@angular/core';

import { VERSION } from '../../../environments/version';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  version = VERSION;

  constructor() { }

  ngOnInit() {
  }

}
