import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'programs', component: ProgramsPageComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
