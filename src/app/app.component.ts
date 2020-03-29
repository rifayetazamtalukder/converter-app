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
    this.iconRegistry.addSvgIcon(
      'developer-board-black-24',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/developer_board-black-24dp.svg')
    );
    // menu white icon
    this.iconRegistry.addSvgIcon(
      'menu-white', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/menu-white-48dp.svg')
    );
    // close white icon
    this.iconRegistry.addSvgIcon(
      'close-white', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/close-white-48dp.svg')
    );
    // more_vert white icon
    this.iconRegistry.addSvgIcon(
      'more-vert-white', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/more_vert-white-48dp.svg')
    );
    // Settings dark-gray icon
    this.iconRegistry.addSvgIcon(
      'settings-dark-gray', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/settings-dark-gray-48dp.svg')
    );
    // about dark-gray icon
    this.iconRegistry.addSvgIcon(
      'announcement-dark-gray', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/announcement-dark-gray-48dp.svg')
    );
    // Help dark-gray icon
    this.iconRegistry.addSvgIcon(
      'help-dark-gray', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/help-dark-gray-48dp.svg')
    );
    // Person dark-gray icon
    this.iconRegistry.addSvgIcon(
      'person-dark-gray', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/person-dark-gray-48dp.svg')
    );
    // keyboard-left-arrow black icon
    this.iconRegistry.addSvgIcon(
      'keyboard-left-arrow-black', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/keyboard_arrow_left-48dp.svg')
    );
    // keyboard-right-arrow black icon
    this.iconRegistry.addSvgIcon(
      'keyboard-right-arrow-black', this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/keyboard_arrow_right-48dp.svg')
    );
  }
}


