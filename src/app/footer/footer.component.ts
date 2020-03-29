import { Component, OnInit } from '@angular/core';
import { CdkObserveContent } from '@angular/cdk/observers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private date: Date;
  public year: number;

  constructor() {
    this.date = new Date();

    this.year = this.date.getFullYear();

    console.log(this.year);
  }

  ngOnInit(): void {
  }

}
