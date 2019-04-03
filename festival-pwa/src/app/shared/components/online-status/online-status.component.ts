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

  _promise: ProgData<any>;

  get promise(): ProgData<any> {
    return this._promise;
  }

  @Input('promise')
  set promise(value: ProgData<any>) {
    console.log(value);
    this._promise = value;
    this.fetchData = value;
  }

  fetchData: ProgData<any>;

  constructor(public app: AppService) { }

  ngOnInit() {}

  getDate() {
    return this.fetchData && this.fetchData.src === 'cache' && this.fetchData.cacheDate;
  }

}
