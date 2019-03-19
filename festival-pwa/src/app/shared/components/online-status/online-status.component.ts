import { Component, OnInit } from '@angular/core';
import { PWAService } from '../../services/pwa.service';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent implements OnInit {

  constructor(public pwa: PWAService) { }

  ngOnInit() {}

}
