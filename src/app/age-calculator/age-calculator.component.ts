import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";
import { formattedError } from '@angular/compiler';


@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.css']
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
    this.age_form.valueChanges.subscribe(x => {
      this.show_age = false;
    });
  }

  age_form = this.form_builder.group({
    "birth_date": ['', Validators.required],

    "current_date": ['']
  });

  get birth_date() {
    return this.age_form.get('birth_date');
  }

  get current_date() {
    return this.age_form.get('current_date');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.calculateAge();
  }

  calculateAge() {
    let _current_date;
    if (this.current_date.value != '') {
      _current_date = this.current_date.value;
    } else {
      _current_date = new Date();
    }


    let _current_date_day = _current_date.getDate();
    let _current_date_month = _current_date.getMonth();
    let _current_date_year = _current_date.getFullYear();

    console.log(`0. [Current Date] ${_current_date_year} Year -- ${_current_date_month} Month -- ${_current_date_day} Day`);


    let _birth_date = this.birth_date.value;
    let _birth_date_day = _birth_date.getDate();
    let _birth_date_month = _birth_date.getMonth();
    let _birth_date_year = _birth_date.getFullYear();

    // Check if the current date is greater than or equal to from date,
    // if current date is less than from date then show error
    if (
      _current_date_year > _birth_date_year ||
      (
        _current_date_year === _birth_date_year &&
        _current_date_month >= _birth_date_month &&
        _current_date_day >= _birth_date_day
      )
    ) {
      // 
      this.date_error = false;
      // 
      this.day = _current_date_day - _birth_date_day;
      this.month = _current_date_month - _birth_date_month;
      this.year = _current_date_year - _birth_date_year;

      console.log(`1. ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);

      // Check if the month is less than equal 0 or not; If so decrease year by one
      if (this.month <= 0) {
        this.year--;
        this.month = 12 + this.month;
        console.log(`2. [month<0] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
      }
      if (this.day <= 0) {
        this.month--;
        this.day = 30 + this.day;
        console.log(`3. [cur_day < dob_day] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
      }
      if (this.month === 12) {
        this.year++;
        this.month = 0;
        console.log(`4. [month == 12] ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);
      }

    }
    else {
      this.date_error = true;
    }

    // This line must be after if else condition
    this.show_age = true;

    this.formatAge(this.day, this.month, this.year);

    console.log(`6. Final Age: ${this.year} Year -- ${this.month} Month -- ${this.day} Day`);

    if (this.show_details) {
      // this.onSeeDetailsClick(this.day, this.month, this.year);
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

    this.age_format = `You are: ${year} ${_years}, ${month} ${_months} and ${day} ${_days} old`;
  }

}
