import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IonicModule } from '@ionic/angular';
import { IconPipe } from './pipes/icon.pipe';
import { NewsCardComponent } from './shared/components/news-card/news-card.component';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    IconPipe,
    NewsCardComponent,
    ProgramsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
