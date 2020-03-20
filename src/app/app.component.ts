import { Component } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";

import { MatIconRegistry } from "@angular/material/icon";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Converter App';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'subway',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/ic_directions_subway_48px.svg')
    );
    // 
    this.iconRegistry.addSvgIcon(
      'atm',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/ic_local_atm_48px.svg')
    );
    // 
    this.iconRegistry.addSvgIcon(
      'developer-board',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/developer_board-48dp.svg')
    );
    // 
    // 
    this.iconRegistry.addSvgIcon(
      'developer-board-black-24',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/developer_board-black-24dp.svg')
    );
    // 
  }
}


