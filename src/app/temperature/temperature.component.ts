import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from "@angular/forms";
import { Temperature } from '../interfaces/temperature';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  constructor(private form_builder: FormBuilder) {
    // 
    this.temperature_form.valueChanges.subscribe(x => {
      this.show_result = false;
    });
  }

  ngOnInit(): void {
  }

  // Temperature Form
  temperature_form = this.form_builder.group({
    "unit_from": ['', Validators.required],
    "unit_to": ['', Validators.required],
    "temp_value": ['', Validators.required],
  });

  get unit_from() {
    return this.temperature_form.get('unit_from');
  }
  get unit_to() {
    return this.temperature_form.get('unit_to');
  }
  get temp_value() {
    return this.temperature_form.get('temp_value');
  }

  temperature_units: Temperature[] = [
    { name: 'Celsius', value: 'celsius' },
    { name: 'Fahrenheit', value: 'fahrenheit' },
    { name: 'Kelvin', value: 'kelvin' }
  ]

  selected_from = '';
  selected_to = '';
  result: number = 0;
  show_result: boolean = false;

  onSubmit() {
    // alert(`${this.temperature_form.status}`);
    if (this.temperature_form.valid) {
      // alert(`${this.selected_from} -- ${this.selected_to} -- ${this.temp_value.value}`);
      let _value = this.temp_value.value;
      if (this.selected_from === 'celsius' && this.selected_to === 'fahrenheit') {
        this.result = this.convertCelsius_ToFahrenheit(_value);
      }
      else if (this.selected_from === 'celsius' && this.selected_to === 'kelvin') {
        this.result = this.convertCelsius_ToKelvin(_value);
      }
      else if (this.selected_from === 'fahrenheit' && this.selected_to === 'kelvin') {
        this.result = this.convertFahrenheit_ToKelvin(_value);
      }
      else if (this.selected_from === 'fahrenheit' && this.selected_to === 'celsius') {
        this.result = this.convertFahrenheit_ToCelsius(_value);
      }
      else if (this.selected_from === 'kelvin' && this.selected_to === 'celsius') {
        this.result = this.convertKelvin_ToCelsius(_value);
      }
      else if (this.selected_from === 'kelvin' && this.selected_to === 'fahrenheit') {
        this.result = this.convertKelvin_ToFahrenheit(_value);
      }
      else if (this.selected_from === 'kelvin' && this.selected_to === 'kelvin') {
        this.result = _value;
      }
      else if (this.selected_from === 'fahrenheit' && this.selected_to === 'fahrenheit') {
        this.result = _value;
      }
      else if (this.selected_from === 'celsius' && this.selected_to === 'celsius') {
        this.result = _value;
      }

      // This should be at the end
      this.show_result = true;
      // alert(`Result: ${_value} ${this.selected_from} = ${this.result.toFixed(2)} ${this.selected_to}`);
    }
  }

  convertCelsius_ToFahrenheit(value) {
    let _result = ((value * (9 / 5)) + 32);
    return _result;
  }

  convertCelsius_ToKelvin(value) {
    let _result = value + 273.15;
    return _result;
  }

  convertFahrenheit_ToKelvin(value) {
    let _result = ((5 / 9) * (value - 32)) + 273.15;
    return _result;
  }

  convertFahrenheit_ToCelsius(value) {
    let _result = (5 / 9) * (value - 32);
    return _result;
  }

  convertKelvin_ToCelsius(value) {
    let _result = value - 273.15;
    return _result;
  }

  convertKelvin_ToFahrenheit(value) {
    let _result = ((value - 273.15) * (9 / 5)) + 32;
    return _result;
  }

}
