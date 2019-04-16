import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { BehaviorSubject } from 'rxjs';
import { ProgData } from '../../models/data';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent implements OnInit {

  @Input() cacheDate: Date;

  constructor(public app: AppService) { }

  ngOnInit() {}

  getDate() {
    return this.cacheDate;
  }

}
