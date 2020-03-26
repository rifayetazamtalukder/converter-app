import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



// npm i @angular/material-moment-adapter --save
// npm i moment --save


import * as _moment from 'moment';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: ['LL'],
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AgeCalculatorComponent implements OnInit, OnDestroy {

  day: number;
  month: number;
  year: number;
  public age;
  public date_error: boolean = false;

  public show_age: boolean = false;
  public show_details: boolean = false;

  public age_format: string = '';

  private mediaType: Subscription; public deviceType: string;

  // 
  constructor(private form_builder: FormBuilder, private mediaObserver: MediaObserver) {
    // 
    this.age_form.valueChanges.subscribe(() => {
      this.show_age = false;
    });
  }

  age_form = this.form_builder.group({
    "from_date": [moment(null), Validators.required],

    "to_date": [null],
  });

  get from_date() {
    return this.age_form.get('from_date');
  }

  get to_date() {
    return this.age_form.get('to_date');
  }

  // 
  ngOnInit() {
    // This will call whenever the component initializes
    // 
    // Add a subscription for the devices type
    this.mediaType = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.deviceType = change.mqAlias;
        console.log(this.deviceType);
      }
    );
  }
  // 
  // Unsubscribe all the subscription in ngOnDestroy method
  ngOnDestroy() {
    this.mediaType.unsubscribe();
  }


  onSubmit() {
    this.calculateAge();
  }

  calculateAge() {
    if (this.age_form.valid) {
      let _current_date;
      if (this.to_date.value != null) {
        _current_date = this.to_date.value;
      } else {
        _current_date = moment();
      }

      // age
      let __age = moment.duration(_current_date.diff(this.from_date.value));

      // age in only years
      let __years = _current_date.diff(this.from_date.value, 'years');
      // 
      // age in only months
      let __months = _current_date.diff(this.from_date.value, 'months');
      // 
      // age in only days
      let __days = _current_date.diff(this.from_date.value, 'days');
      // 
      // age in only hours
      let __hour = _current_date.diff(this.from_date.value, 'hours');
      // 
      // age in only minutes
      let __min = _current_date.diff(this.from_date.value, 'minutes');
      // 
      // age in only seconds
      let __sec = _current_date.diff(this.from_date.value, 'seconds');
      // 
      // age in only mili-seconds
      let __mili_sec = _current_date.diff(this.from_date.value, 'miliseconds');
      // 
      // age in only
      let __weeks = _current_date.diff(this.from_date.value, 'weeks');

      //   console.log(`
      // ${_current_date}
      // ${this.from_date.value}

      // Y_M_D: ${__age.get('year')} years   ${__age.get('month')} months   ${__age.get('day')} days

      // Total Year: ${__years}   Total Month: ${__months}  Total Days: ${__days}

      // ${__hour} hour    
      // ${__min} min
      // ${__sec} seconds   
      // ${__mili_sec} miliseconds   
      // ${__weeks} weeks

      // Total:
      // ${__age.years()} years
      // ${__age.months()} months
      // ${__age.days()} days
      // `);

      this.formatAge(__age.days(), __age.months(), __age.years());
      // Show the age
      this.show_age = true;
    }

  }

  formatAge(day, month, year) {
    let _days = 'day';
    let _months = 'month';
    let _years = 'year';
    if (day > 1) {
      _days = 'days';
    }
    if (month > 1) {
      _months = 'months';
    }
    if (year > 1) {
      _years = 'years';
    }

    this.age_format = `You are: ${year} ${_years},  ${month} ${_months} and  ${day} ${_days} old`;
  }

}