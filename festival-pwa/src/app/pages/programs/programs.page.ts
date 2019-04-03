import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  programs: Program[];

  constructor(public pwa: PWAService, private data: DataService) {
    this.doRefresh(null);
   }

  ngOnInit() {
  }

  doRefresh(event) {
    this.data.getJSON<Program[]>('https://festapp-pwa-backend.azurewebsites.net/api/news/programs').subscribe(programs => {
      console.log('GOT', programs);
      this.programs = programs;
      if (event) {
        event.target.complete();
      }
    },
    error => {
      // console.log(error);
      if (event) {
        event.target.complete();
      }
    });
  }

}
