import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';

import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import {gmapsAPI} from '../../../environments/keys';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: gmapsAPI
    })
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
