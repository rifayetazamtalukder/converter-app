import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
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
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AgeCalculatorComponent implements OnInit {

  day: number;
  month: number;
  year: number;

  public age;
  public date_error: boolean = false;

  public show_age: boolean = false;
  public show_details: boolean = false;

  public age_format: string = '';

  constructor(private form_builder: FormBuilder) {
    // 
    this.age_form.valueChanges.subscribe(() => {
      this.show_age = false;
    });
  }

  age_form = this.form_builder.group({
    "birth_date": ['', Validators.required],

    "current_date": [null],

    "date": ['', Validators.required]
  });

  get birth_date() {
    return this.age_form.get('birth_date');
  }

  get current_date() {
    return this.age_form.get('current_date');
  }

  get date() {
    return this.age_form.get('date');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.calculateAge();
  }

  calculateAge() {
    let _current_date;
    if (this.current_date.value != null) {
      //alert(`Curr val: a${this.current_date.value}a`);
      _current_date = this.current_date.value;
      //alert(`Not moment: ${_current_date}`);
    } else {
      _current_date = moment();
      //alert(`Moment: ${_current_date}`);
    }


    // let __full = _current_date.asMonths();
    let __age = moment.duration(_current_date.diff(this.birth_date.value));

    let __years = _current_date.diff(this.birth_date.value, 'years');
    let __months = _current_date.diff(this.birth_date.value, 'months');
    let __days = _current_date.diff(this.birth_date.value, 'days');
    let __hour = _current_date.diff(this.birth_date.value, 'hours');
    let __min = _current_date.diff(this.birth_date.value, 'minutes');
    let __sec = _current_date.diff(this.birth_date.value, 'seconds');
    let __mili_sec = _current_date.diff(this.birth_date.value, 'miliseconds');
    let __weeks = _current_date.diff(this.birth_date.value, 'weeks');

    console.log(`
    ${_current_date}
    ${this.birth_date.value}
    
    Y_M_D: ${__age.get('year')} years   ${__age.get('month')} months   ${__age.get('day')} days
    Total Year: ${__years}   Total Month: ${__months}  Total Days: ${__days}

    ${__hour} hour    ${__min} min
    ${__sec} seconds   ${__mili_sec} miliseconds   
    ${__weeks} weeks
    
    Total:
    ${__age.years()} years
    ${__age.months()} months
    ${__age.days()} days

    ${__age.asYears()} As Years
    ${__age.asMonths()} As Months
    ${__age.asDays()} As Days
    
    ${__age.hours()} Hours
    ${__age.minutes()} Minutes
    ${__age.seconds()} Seconds
    ${__age.milliseconds()} miliseconds

    ${__age.asWeeks()} As Weeks
    ${__age.weeks()} Weeks
    `)


    // alert(`year:${__years} Result: ${diff.years} years  ${diff.months} months ${diff.days}days: 
    //        ${diff.hours}:${diff.minutes}:${diff.seconds}:${diff.milliseconds}
    //        ${diff.asHours} As Hours
    //        ${diff.asMinutes} As Minutes
    //        ${diff.asSeconds} As Seconds
    //        ${diff.asMilliseconds} As Mili Seconds
    //        ${diff.weeks} Weeks, 
    //        ${diff.asDays} days
    //        ${diff.asMonths} Months
    //        ${diff.asYears} Years`);

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

    this.age_format = `You are: ${year} ${_years}, ${month} ${_months} and ${day} ${_days} old`;
  }

}










// calculateAge() {
//   let _current_date;
//   if (this.current_date.value != '' || this.current_date.value != null) {
//     _current_date = this.current_date.value;
//     // alert('CD is NOT Null');
//   } else {
//     // alert('CD is Null');
//     _current_date = moment();
//   }

//   // alert(`BD: ${this.birth_date.value}\nCD: ${_current_date}\nDate: ${this.date.value}`);


//   // let _current_date_day = _current_date.getDate();
//   // let _current_date_month = _current_date.getMonth();
//   // let _current_date_year = _current_date.getFullYear();

//   // console.log(`0. [Current Date] ${_current_date_year} Year -- ${_current_date_month} Month -- ${_current_date_day} Day`);


//   // let _birth_date = this.birth_date.value;
//   // let _birth_date_day = _birth_date.getDate();
//   // let _birth_date_month = _birth_date.getMonth();
//   // let _birth_date_year = _birth_date.getFullYear();

//   // Check if the current date is greater than or equal to from date,
//   // if current date is less than from date then show error
//   if (
//     // _current_date_year > _birth_date_year ||
//     // (
//     //   _current_date_year === _birth_date_year &&
//     //   _current_date_month >= _birth_date_month &&
//     //   _current_date_day >= _birth_date_day
//     // )
//   ) {
//     // 
//     // this.date_error = false;
//     // // 
//     // this.day = _current_date_day - _birth_date_day;
//     // this.month = _current_date_month - _birth_date_month;
//     // this.year = _current_date_year - _birth_date_year;

//     // console.log(`1. ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);

//     // Check if the month is less than equal 0 or not; If so decrease year by one
//     // if (this.month <= 0) {
//     //   this.year--;
//     //   this.month = 12 + this.month;
//     //   console.log(`2. [month<0] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
//     // }
//     // if (this.day <= 0) {
//     //   this.month--;
//     //   this.day = 30 + this.day;
//     //   console.log(`3. [cur_day < dob_day] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
//     // }
//     // if (this.month === 12) {
//     //   this.year++;
//     //   this.month = 0;
//     //   console.log(`4. [month == 12] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
//     // }

//   }
//   else {
//     this.date_error = true;
//   }

//   // This line must be after if else condition
//   this.show_age = true;

//   this.formatAge(this.day, this.month, this.year);

//   // console.log(`6. Final Age: ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);

//   //let __age = moment(this.current_date) - moment(this.birth_date);

//   // alert(this.date.value);

//   if (this.show_details) {
//     // this.onSeeDetailsClick(this.day, this.month, this.year);
//   }
// }
