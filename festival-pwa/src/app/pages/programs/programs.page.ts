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
  shownPrograms: Program[] = [];

  searchTerm: string = null;
  showSearch = false;
  showFavorites = false;

  constructor(public pwa: PWAService, private data: DataService, public app: AppService, public fetcher: FetcherService<Program[]>) {
    fetcher.register('#backend#/api/programs').subscribe(programs => {
      console.log('programs', programs);
      this.programs = programs;
      this.showPrograms();
    });
  }

  showPrograms() {
    if (this.programs) {
      const startSlice = this.shownPrograms.length;
      const toShow = this.programs.filter(this.searchFilter, this).slice(startSlice, startSlice + 16);
      this.shownPrograms = (this.shownPrograms || []).concat(toShow);
    }
  }

  ngOnInit() {
  }

  searchFilter(program: Program) {
    if (!this.searchTerm) {
      return true;
    }
    return program.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1;
  }

  ngOnDestroy(): void {
    this.fetcher.unsubscribe();
  }

  loadData(event) {

    this.showPrograms();
    event.target.complete();

    if (this.programs && this.shownPrograms.length === this.programs.length) {
      event.target.disabled = true;
    }

  }

  searchChanged(event) {
    console.log(event);
    this.searchTerm = event.detail.value;
    this.shownPrograms = [];
    this.showPrograms();
  }

  cancelSearch() {
    this.searchTerm = null;
    this.showSearch = false;
  }

  toggleFavorites() {
    this.searchTerm = null;
    this.showSearch = false;
    this.showFavorites = !this.showFavorites;
    if (this.showFavorites) {
      this.shownPrograms = this.programs;
    }
  }
}
