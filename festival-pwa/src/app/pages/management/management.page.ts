import { Component, OnInit } from '@angular/core';
import { PWAService } from 'src/app/shared/services/pwa.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FetcherService } from 'src/app/shared/services/fetcher.service';
import { Program } from 'src/app/shared/models/program';
import { Place } from 'src/app/shared/models/place';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NewsItem } from 'src/app/shared/models/newsitem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  programFetcher: FetcherService<Program[]>;
  placesFetcher: FetcherService<Place[]>;
  places: Place[];
  programs: Program[];

  selectedProgramTags: string[];
  selectedPlaceTags: string[];
  selectedDates: Date[];
  selectableDays: Date[];
  priority: undefined | 'danger' | 'warning';

  title: string;
  content: string;

  constructor(public app: AppService, public data: DataService, public pwa: PWAService, public settings: SettingsService,
                public route: ActivatedRoute, public router: Router, public http: HttpClient) {
    this.programFetcher = new FetcherService<Program[]>(data, app);
    this.placesFetcher = new FetcherService<Place[]>(data, app);
  }

  ngOnInit() {
    this.selectedProgramTags = [];
    this.selectedPlaceTags = [];
    this.selectableDays = [];
    this.selectedDates = [];
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === 'neverhaveiever') {
        this.settings.saveData(this.settings.settings_has_management_access, true);
      } else {
        if (!this.settings.getData(this.settings.settings_has_management_access)) {
          this.router.navigate(['/'], {replaceUrl: true});
        }
      }
    });
    this.placesFetcher.register('#backend#/api/places').subscribe(places => {
      this.places = places;
    });
    this.programFetcher.register('#backend#/api/programs').subscribe(programs => {
      this.programs = programs;

      if (programs != null) {
          this.selectableDays = this.filterUniqueDates([].concat(...this.programs.map(p => {

            p.event_Time = JSON.parse(p.event_Time as unknown as string);
            p.event_Time = p.event_Time.map(o => {
              return {start: new Date(o.start), end: new Date(o.end)};
            });

            return p.event_Time.map(t => {t.start.setHours(0, 0, 0, 0); return t.start; });
          }))).sort((a, b) => a.getTime() - b.getTime());
      }
    });
  }

  isSelected(tag: string, array: string[]) {
    return array.indexOf(tag) !== -1;
  }

  toggle(tag: string, array: string[]) {
    const ind = array.indexOf(tag);
    if (ind === -1) {
      array.push(tag);
    } else {
      array.splice(ind, 1);
    }
  }

  filterUniqueDates(data): Date[] {
    const lookup = new Set();

    return data.filter(date => {
       const serialised = date.getTime();
      if (lookup.has(serialised)) {
        return false;
      } else {
        lookup.add(serialised);
        return true;
      }
    });
  }

  isDateSelected(date: Date) {
    return this.selectedDates.filter(d => d.getTime() === date.getTime()).length === 1;
  }

  toggleDate(date: Date) {
    const inIt = this.selectedDates.filter(d => d.getTime() === date.getTime());
    if (inIt.length === 1) {
      this.selectedDates = this.selectedDates.filter(d => d.getTime() !== date.getTime());
    } else {
      this.selectedDates.push(date);
    }
  }

  publishNews() {
    const news: NewsItem = {
      title: this.title,
      content: this.content,
      priority: this.priority,
      published: new Date(),
      dateTags: JSON.stringify(this.selectedDates),
      placeTags: JSON.stringify(this.selectedPlaceTags),
      programTags: JSON.stringify(this.selectedProgramTags)
    };
    this.http.post(`${environment.apiUrl}/api/news`, news).subscribe(data => {
      this.title = undefined;
      this.content = undefined;
      this.priority = undefined;
      this.selectedDates = [];
      this.selectedProgramTags = [];
      this.selectedPlaceTags = [];
    });
  }

  refreshPrograms() {
    this.http.get(`${environment.apiUrl}/api/Maintenance/refreshPrograms`).subscribe(d => console.log('DONE', d));
  }

}
