import { Component, OnInit } from '@angular/core';

import { FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { Length } from '../interfaces/length';


@Component({
  selector: 'app-length',
  templateUrl: './length.component.html',
  styleUrls: ['./length.component.css']
})
export class LengthComponent implements OnInit {

  constructor(private form_builder: FormBuilder) {
    // 
    this.length_form.valueChanges.subscribe(x => {
      this.show_result = false;
    });
  }

  ngOnInit(): void {
  }

  show_result: boolean = false;
  result: Number;

  onSubmit() {
    // 
    if (this.length_form.valid) {
      // Add code here
      // alert(`From: ${this.from.value}, To: ${this.to.value}, Value: ${this.value.value}`);

      let _from = this.from.value;
      let _to = this.to.value;
      let _value = this.value.value;

      this.result = this.convertFromKilometre_toOther(_from, _to, _value);

      // alert(`Result: ${this.result}`);

      // This should be at the bottom
      this.show_result = true;
    }//end of if
  }

  selected_from = '';
  selected_to = '';

  // Length Form
  length_form = this.form_builder.group({
    'from': ['', Validators.required],
    'to': ['', Validators.required],
    'value': ['', Validators.required],
  });

  get from() {
    return this.length_form.get('from');
  }

  get to() {
    return this.length_form.get('to');
  }

  get value() {
    return this.length_form.get('value');
  }

  lengths: Length[] = [
    { name: 'Kilometre', value: 'kilometre' },
    { name: 'Metre', value: 'metre' },
    { name: 'Centimetre', value: 'centimetre' },
    { name: 'Millimetre', value: 'millimetre' },
    { name: 'Micrometre', value: 'micrometre' },
    { name: 'Nanometre', value: 'nanometre' },
    { name: 'Mile', value: 'mile' },
    { name: 'Yard', value: 'yard' },
    { name: 'Foot', value: 'foot' },
    { name: 'Inch', value: 'inch' },
    { name: 'Nautical mile', value: 'nautical_mile' }
  ];


  // Functions TO Convert
  convertFromKilometre_toOther(_from, _to, _value) {
    let _result;
    if (_from === 'kilometre' && _to === 'kilometre') {
      _result = _value;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'metre') {
      _result = _value * 1000;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'centimetre') {
      _result = _value * 100000;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'millimetre') {
      _result = _value * 1000000;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'micrometre') {
      _result = _value * 1000000000;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'nanometre') {
      _result = _value * 1000000000000;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'mile') {
      _result = _value * 0.62137119223;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'yard') {
      _result = _value * 1093.6132983377;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'foot') {
      _result = _value * 3280.83989501;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'inch') {
      _result = _value * 39370.078740157;
      return _result;
    }
    else if (_from === 'kilometre' && _to === 'nautical_mile') {
      _result = _value * 0.539957;
      return _result;
    }
  }


}
