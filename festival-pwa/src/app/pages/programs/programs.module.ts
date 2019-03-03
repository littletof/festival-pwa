import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProgramsPage } from './programs.page';
import { ProgramTileComponent } from './program-tile/program-tile.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProgramsPage, ProgramTileComponent]
})
export class ProgramsPageModule {}
