import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/shared/models/program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  programs: Program[] = [
    {
      title: 'Cypress Hill',
      nationality: 'USA',
      extratitle: '33 éves évforduló:',
      image: 'https://widget.szigetfestival.com/imgproxy/5c62ba4e48555_original.jpg'
    },
    {
      title: 'Alt-J',
      nationality: 'UK',
      image: 'https://d15v4l58k2n80w.cloudfront.net/file/1396975600/49573655254/width=1280/height=720/format=-1/fit=crop/crop=0x1421+4479x2519/rev=3/t=425484/e=never/k=b0bc0558/ICB+June+2018+Mads+Perch.jpg'
    },
    {
      title: 'Limp Bizkit',
      nationality: 'USA',
      image: 'https://todi.hu/wp-content/uploads/2018/05/limp-bizkit-new-album-1.jpg'
    },
    {
      title: 'Brains',
      nationality: 'HU',
      image: 'https://www.zeneszoveg.hu/img/416513_10150724045178454_60052753453_11114038_688835773_o.jpg'
    },
    {
      title: 'Papa Roach',
      nationality: 'USA',
      image: 'https://www.hardrock.hu/img/taz/hirek/1705/papar17.jpg'
    },
    {
      title: 'Slash',
      nationality: 'USA',
      image: 'https://www.revolvermag.com/sites/default/files/media/images/article/slash-getty-kevin-mazur.jpg'
    },
    {
      title: 'Birdy',
      nationality: 'UK',
      image: 'https://celebmix.com/wp-content/uploads/2016/12/artist-101-birdy-01.jpg'
    },
    {
      title: 'Punnany Massif',
      nationality: 'HU',
      image: 'https://widget.szigetfestival.com/imgproxy/5c7e732e0a148_original.jpg'
    },
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
