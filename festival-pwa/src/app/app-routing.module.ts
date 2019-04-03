import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'programs', loadChildren: './pages/programs/programs.module#ProgramsPageModule' },
  { path: 'program/:id', loadChildren: './pages/program/program.module#ProgramPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },

];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
