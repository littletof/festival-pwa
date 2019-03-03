import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  programs = [
    { title: 'Brains', nationality: 'HU', image: 'http://www.zeneszoveg.hu/img/416513_10150724045178454_60052753453_11114038_688835773_o.jpg'},
    { title: 'Alt-J', nationality: 'UK',
          extratitle: 'Nagyon tetsző embereknek való:',
          image: 'https://d15v4l58k2n80w.cloudfront.net/file/1396975600/49573655254/width=1280/height=720/format=-1/fit=crop/crop=0x1421+4479x2519/rev=3/t=425484/e=never/k=b0bc0558/ICB+June+2018+Mads+Perch.jpg'},
    { title: 'Birdy', nationality: 'HU',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62YprcmO-_bThqQadaV2q6FtgIB1ynC1nlusezR1JDgj7h-QQjw'
    },
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
