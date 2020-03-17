import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";


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

  constructor(private form_builder: FormBuilder) { }

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
    let _current_date_month = _current_date.getMonth() + 1;
    let _current_date_year = _current_date.getFullYear();

    let _birth_date = this.birth_date.value;
    let _birth_date_day = _birth_date.getDate();
    let _birth_date_month = _birth_date.getMonth() + 1;
    let _birth_date_year = _birth_date.getFullYear();

    //  && _current_date_month >= _birth_date_month && _current_date_day >= _birth_date_day
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
      this.day = Math.abs(_current_date_day - _birth_date_day);
      this.month = Math.abs(_current_date_month - _birth_date_month);
      this.year = Math.abs(_current_date_year - _birth_date_year);
    } else {
      this.date_error = true;
    }

    // This line must be after if else condition
    this.show_age = true;

    if (this.show_details) {
      // this.onSeeDetailsClick(this.day, this.month, this.year);
    }
  }

  onSeeDetailsClick(day, month, year) {
    // total_days = day + () 
    // total_month = 
    // total_year = 
  }

}
