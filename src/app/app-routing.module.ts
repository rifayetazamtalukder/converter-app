import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from "./help/help.component";
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { LengthComponent } from './length/length.component';
import { AreaComponent } from './area/area.component';
import { VolumeComponent } from './volume/volume.component';
import { WeightComponent } from "./weight/weight.component";
import { TimeComponent } from './time/time.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'age',
    component: AgeCalculatorComponent
  },
  {
    path: 'temperature',
    component: TemperatureComponent
  },
  {
    path: 'length',
    component: LengthComponent
  },
  {
    path: 'area',
    component: AreaComponent
  },
  {
    path: 'volume',
    component: VolumeComponent
  },
  {
    path: 'weight',
    component: WeightComponent
  },
  {
    path: 'time',
    component: TimeComponent
  },


  // Wild Card ROuting. Must be at the bottom of the list
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
