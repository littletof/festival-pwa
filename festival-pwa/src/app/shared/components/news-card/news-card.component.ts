import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input() priority: 'warning' | 'danger' | undefined;
  @Input() content: string;
  @Input() title: string;
  @Input() moreButton: boolean;

  constructor() { }

  ngOnInit() {
  }

}
