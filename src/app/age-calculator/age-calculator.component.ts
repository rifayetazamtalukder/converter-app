import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



// npm i @angular/material-moment-adapter --save
// npm i moment --save


import * as _moment from 'moment';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public amOrpmValue: string = '';
  public amOrpmValue_to: string = '';

  public showTimeField: boolean = false;
  public showTimeField_to: boolean = false;

  public from_time_text: string = 'Add Time';
  public to_time_text: string = 'Add Time';

  public age_format: string = '';

  private mediaType: Subscription; public deviceType: string;

  // 
  constructor(private form_builder: FormBuilder, private mediaObserver: MediaObserver, private snackBar: MatSnackBar) {
    // 
    this.age_form.valueChanges.subscribe(() => {
      this.show_age = false;
    });
  }

  // , Validators.min(0), Validators.max(12), Validators.pattern('[0-9]?')
  // Validators.min(0), Validators.max(59), Validators.pattern('[0-5][0-9]')
  age_form = this.form_builder.group({
    "from_date": ['', Validators.required],

    "to_date": [null],

    "hour": ['', [
      // Validators.min(1),
      // Validators.max(12),
      // Validators.pattern('[0-9]|2')
    ]],

    "minute": ['', [
      // Validators.min(0),
      // Validators.max(59),
      // Validators.pattern('[0-5]|1[0-9]|1')
    ]],

    "hour_to": ['', [
      // Validators.min(1),
      // Validators.max(12),
      // Validators.pattern('[0-9]|2')
    ]],

    "minute_to": ['', [
      // Validators.min(0),
      // Validators.max(59),
      // Validators.pattern('[0-5]|1[0-9]|1')
    ]],
  });

  get from_date() {
    return this.age_form.get('from_date');
  }

  get to_date() {
    return this.age_form.get('to_date');
  }

  get hour() {
    return this.age_form.get('hour');
  }

  get minute() {
    return this.age_form.get('minute');
  }

  get hour_to() {
    return this.age_form.get('hour_to');
  }

  get minute_to() {
    return this.age_form.get('minute_to');
  }

  amOrPmValueChange(amOrpm) {
    this.amOrpmValue = amOrpm;
  }

  amOrPm_to_ValueChange(amOrpm_to) {
    this.amOrpmValue_to = amOrpm_to;
  }

  // 
  showTimeField_from() {
    if (this.showTimeField === false) {
      this.showTimeField = true;
      this.from_time_text = 'Hide Time';

      this.hour.setValidators(
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12),
          Validators.pattern('[0-9]|2')
        ]

      )
      this.hour.updateValueAndValidity();

      this.minute.setValidators(
        [
          Validators.required,
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-5]|1[0-9]|1')
        ]
      )
      this.minute.updateValueAndValidity();
    }
    else {
      this.from_time_text = 'Add Time';
      this.showTimeField = false;

      this.hour.clearValidators();
      this.hour.updateValueAndValidity();

      this.minute.clearValidators();
      this.minute.updateValueAndValidity();
    }
  }
  // 
  showTimeField_to_func() {
    if (this.showTimeField_to === false) {
      this.showTimeField_to = true;
      this.to_time_text = 'Hide Time';

      this.hour_to.setValidators(
        [
          Validators.required,
          Validators.min(1),
          Validators.max(12),
          Validators.pattern('[0-9]|2')
        ]

      )
      this.hour_to.updateValueAndValidity();

      this.minute_to.setValidators(
        [
          Validators.required,
          Validators.min(0),
          Validators.max(59),
          Validators.pattern('[0-5]|1[0-9]|1')
        ]
      )
      this.minute_to.updateValueAndValidity();
    }
    else {
      this.to_time_text = 'Add Time';
      this.showTimeField_to = false;

      this.hour_to.clearValidators();
      this.hour_to.updateValueAndValidity();

      this.minute_to.clearValidators();
      this.minute_to.updateValueAndValidity();
    }
  }
  // 
  // See Details Button
  public show_details: boolean = false;
  detail_or_Hide_text: string = 'Show Details';
  ShowDetails_func() {
    if (this.show_details === false) {
      this.show_details = true;
      this.detail_or_Hide_text = 'Hide Details';
    }
    else {
      this.show_details = false;
      this.detail_or_Hide_text = 'Show Details';
    }
  }

  // 
  ngOnInit() {
    // This will call whenever the component initializes
    // 
    // Add a subscription for the devices type
    this.mediaType = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.deviceType = change.mqAlias;
        // console.log(this.deviceType);
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

  public age_in_months;
  public age_in_days;
  public age_in_hour;
  public age_in_min;
  public age_in_sec;
  public age_in_milisec;
  public age_in_weeks;
  // 
  public total_breath; public default_breath_per_min = 15;
  public total_hours_sleep;
  public total_hours_eat;
  public total_heart_beaten;
  public total_food_eaten;
  public total_loughed;

  calculateAge() {
    if (this.age_form.valid) {
      let _from_date, _to_date;

      //#region From Date
      // from_date
      if (this.showTimeField === true) {
        _from_date = moment(this.from_date.value);

        // Convert Hour to 24 format
        let hour_24_from = this.convertTo24Hour_from();

        _from_date.set({
          hour: hour_24_from,
          minute: this.minute.value,
          second: 0,
          milisecond: 0,
        });
      } else {
        _from_date = moment(this.from_date.value);

        _from_date.set({
          hour: 0,
          minute: 0,
          second: 0,
          milisecond: 0
        });
      }
      console.log(`From Date: ${_from_date.format('llll')}`);
      // 
      //#endregion From Date

      //#region To Date
      // to_date
      if (this.to_date.value != null) {
        _to_date = moment(this.to_date.value);
        // console.log(`Check: ${_to_date.format('llll')}`);

      } else {
        _to_date = moment();
      }
      if (this.showTimeField_to === true) {
        // Convert Hour to 24 format
        let hour_24_to = this.convertTo24Hour_to();

        _to_date.set({
          hour: hour_24_to,
          minute: this.minute_to.value,
          second: 0,
          milisecond: 0,
        });
      }
      else {
        _to_date.set({
          hour: 0,
          minute: 0,
          second: 0,
          milisecond: 0,
        });
      }
      console.log(`To Date: ${_to_date.format("LLLL")}`);
      // 
      //#endregion To date


      //#region Age Calculation
      // age
      let __age = moment.duration(_to_date.diff(this.from_date.value));

      // age in only years
      let __years = _to_date.diff(this.from_date.value, 'years');
      // 
      // age in only months
      this.age_in_months = _to_date.diff(this.from_date.value, 'months');
      // 
      // age in only days
      this.age_in_days = _to_date.diff(this.from_date.value, 'days');
      // 
      // age in only hours
      this.age_in_hour = _to_date.diff(this.from_date.value, 'hours');
      // 
      // age in only minutes
      this.age_in_min = _to_date.diff(this.from_date.value, 'minutes');
      // 
      // age in only seconds
      this.age_in_sec = _to_date.diff(this.from_date.value, 'seconds');
      // 
      // age in only mili-seconds
      this.age_in_milisec = _to_date.diff(this.from_date.value, 'miliseconds');
      // 
      // age in only
      this.age_in_weeks = _to_date.diff(this.from_date.value, 'weeks');
      // 
      //#endregion Age Calculation

      this.total_breath = this.age_in_min * this.default_breath_per_min;

      this.formatAge(__age.days(), __age.months(), __age.years());
      // Show the age
      this.show_age = true;

      this.formatDetails();
    }
    else {
      // Show Snackbar
      let message = 'Please Fill All The Required Fileds';
      let action = 'Dismiss';
      this.snackBar.open(message, action, {
        duration: 2000,
      });
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

  // 
  convertTo24Hour_from() {
    let _hour_24_from;
    if (this.showTimeField === true) {
      if (this.amOrpmValue === 'pm') {
        if (this.hour.value === 12) {
          _hour_24_from = this.hour.value;
        } else {
          _hour_24_from = 12 + this.hour.value;
        }

      }
      else {
        if (this.hour.value === 12) {
          _hour_24_from = 0;
        }
        else {
          _hour_24_from = this.hour.value;
        }

      }
    }
    return _hour_24_from;
  }
  // 
  convertTo24Hour_to() {
    let _hour_24_to;
    if (this.showTimeField_to === true) {
      if (this.amOrpmValue_to === 'pm') {
        if (this.hour_to.value === 12) {
          _hour_24_to = this.hour_to.value;
        } else {
          _hour_24_to = 12 + this.hour_to.value;
        }
      }
      else {
        if (this.hour_to.value === 12) {
          _hour_24_to = 0;
        }
        else {
          _hour_24_to = this.hour.value;
        }
      }
    }
    return _hour_24_to;
  }

  // 
  public age_in_months_str: string;
  public age_in_days_str: string;
  public age_in_hour_str: string;
  public age_in_min_str: string;
  public age_in_sec_str: string;
  public age_in_milisec_str: string;
  public age_in_weeks_str: string;
  formatDetails() {
    let _months = '';
    let _days = '';
    let _hour = '';
    let _min = '';
    let _sec = '';
    let _mili_sec;
    let _weeks = '';

    if (this.age_in_months > 1) {
      _months = 'Months';
    }
    else {
      _months = 'Month';
    }
    this.age_in_months_str = `${this.age_in_months.toLocaleString()} ${_months} Old`;

    if (this.age_in_days > 1) {
      _days = 'Days';
    }
    else {
      _days = 'Day';
    }
    this.age_in_days_str = `${this.age_in_days.toLocaleString()} ${_days} Old`;

    if (this.age_in_hour > 1) {
      _hour = 'Hours';
    }
    else {
      _hour = 'Hour';
    }
    this.age_in_hour_str = `${this.age_in_hour.toLocaleString()} ${_hour} Old`;

    if (this.age_in_min > 1) {
      _min = 'Minutes';
    }
    else {
      _min = 'Minute';
    }
    this.age_in_min_str = `${this.age_in_min.toLocaleString()} ${_min} Old`;

    if (this.age_in_sec > 1) {
      _sec = 'Seconds';
    }
    else {
      _sec = 'Second';
    }
    this.age_in_sec_str = `${this.age_in_sec.toLocaleString()} ${_sec} Old`;

    if (this.age_in_milisec > 1) {
      _mili_sec = 'Miliseconds';
    }
    else {
      _mili_sec = 'Milisecond';
    }
    this.age_in_milisec_str = `${this.age_in_milisec.toLocaleString()} ${_mili_sec} Old`;

    if (this.age_in_weeks > 1) {
      _weeks = 'Weeks';
    }
    else {
      _weeks = 'Week';
    }
    this.age_in_weeks_str = `${this.age_in_weeks.toLocaleString()} ${_weeks} Old`;
  }

}



      //   console.log(`
      // ${_to_date}
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


      // __c_date.set({
      //   hour: this.hour_to.value,
      //   minute: this.minute_to.value,
      //   second: 0,
      //   milisecond: 0
      // });