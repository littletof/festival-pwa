import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { PWAService } from 'src/app/shared/services/pwa.service';

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
      title: 'Slipknot',
      nationality: 'USA',
      image: 'https://widget.szigetfestival.com/imgproxy/5bf549684cab0_original.jpg'
    },
    {
      title: 'Black Eyed Peas',
      nationality: 'USA',
      image: 'https://widget.szigetfestival.com/imgproxy/5c62b9e4001ee_original.jpg'
    },
    {
      title: 'Slash',
      nationality: 'USA',
      image: 'https://widget.szigetfestival.com/imgproxy/5bf549e434264_original.jpg'
    },
    {
      title: 'Parov Stelar',
      nationality: 'AT',
      image: 'https://widget.szigetfestival.com/imgproxy/5c5d7b43a75a2_original.jpg'
    },
    {
      title: 'PapaRoach',
      nationality: 'USA',
      image: 'https://widget.szigetfestival.com/imgproxy/5c6ab35f26752_original.jpg'
    },
    {
      title: 'Punnany Massif',
      nationality: 'HU',
      image: 'https://widget.szigetfestival.com/imgproxy/5c7e732e0a148_original.jpg'
    },
    { title: 'LP',
      nationality: 'USA',
      image: 'https://widget.szigetfestival.com/imgproxy/5bf67ef85e514_original.jpg'
    },
    { title: 'Tankcsapda',
      nationality: 'HU',
      image: 'https://widget.szigetfestival.com/imgproxy/5bf678e34e86d_original.jpg'
    },
    { title: '30Y',
      nationality: 'HU',
      image: 'https://widget.szigetfestival.com/imgproxy/5c769bdf89d1d_original.jpg'
    },
    { title: 'Rúzsa Magdi',
      nationality: 'HU',
      image: 'https://widget.szigetfestival.com/imgproxy/5bffd7dd3dda3_original.jpg'
    },
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
    { title: 'Brains', nationality: 'HU'},
  ];

  constructor(public pwa: PWAService) { }

  ngOnInit() {
  }

}
