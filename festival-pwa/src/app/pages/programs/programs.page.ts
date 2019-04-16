import { Component, OnInit, OnDestroy } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ProgData, HashedData } from 'src/app/shared/models/data';
import { AppService } from 'src/app/shared/services/app.service';
import { FetcherService } from 'src/app/shared/services/fetcher.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
  providers: [FetcherService]
})
export class ProgramsPage implements OnInit, OnDestroy {

  programs: Program[];

  constructor(public pwa: PWAService, private data: DataService, public app: AppService, public fetcher: FetcherService<Program[]>) {
    fetcher.register('#backend#/api/programs').subscribe(programs => this.programs = programs);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.fetcher.unsubscribe();
  }

}
