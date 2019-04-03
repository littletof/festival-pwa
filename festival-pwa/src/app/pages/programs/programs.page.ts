import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ProgData, HashedData } from 'src/app/shared/models/data';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {

  programs: ProgData<HashedData<Program[]>>;

  constructor(public pwa: PWAService, private data: DataService, public app: AppService) {
    this.doRefresh(null);
    this.app.getOnlineStatusObservable().subscribe(on => on && this.doRefresh(null));
  }

  ngOnInit() {
  }

  doRefresh(event) {
    this.data.getJSON<HashedData<Program[]>>('https://festapp-pwa-backend.azurewebsites.net/api/news/programs').subscribe(programs => {
      console.log('GOT', programs);
      if (programs) {
          if (!this.programs || (programs.payload && programs.payload.hash !== this.programs.payload.hash)) {
            console.log('refreshed, because hash doesnt equal', programs.payload.hash, this.programs && this.programs.payload.hash);
            this.programs = programs;
          }
          if (event && (programs.src === 'web' || programs.wontFetch)) {
            event.target.complete();
          }
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
