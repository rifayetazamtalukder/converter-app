import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from "./modules/material/material.module";
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LengthComponent } from './length/length.component';
import { AreaComponent } from './area/area.component';
import { VolumeComponent } from './volume/volume.component';
import { WeightComponent } from './weight/weight.component';
import { TimeComponent } from './time/time.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomePageComponent,
    TopBarComponent,
    SideBarComponent,
    AgeCalculatorComponent,
    AboutComponent,
    HelpComponent,
    TemperatureComponent,
    LengthComponent,
    AreaComponent,
    VolumeComponent,
    WeightComponent,
    TimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
