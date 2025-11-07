import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import {LocationService} from "./location.service";
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import {WeatherService} from "./weather.service";
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TabsHeaderComponent } from './tabs/tabs-header/tabs-header.component';
import { TabsBodyComponent } from './tabs/tabs-body/tabs-body.component';
import { BodyContentComponent } from './tabs/tabs-body/body-content/body-content.component';
import { TabComponent } from './tabs/tab/tab.component';
import { TabService } from './tabs/tab/tab.service';
import { LocationStoreService } from './location-store.service';
import { CacheInterceptor } from './cache/cache.interceptor';
import { CacheService } from './cache/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TabsHeaderComponent,
    TabsBodyComponent,
    BodyContentComponent,
    TabComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
      LocationService,
      WeatherService,
      TabService,
      LocationStoreService,
      CacheService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
