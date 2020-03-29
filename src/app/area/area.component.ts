import { Component, OnInit } from '@angular/core';

// import { DomSanitizer } from "@angular/platform-browser";

// import { MatIconRegistry } from "@angular/material/icon";



@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor(
    // private iconRegistry: MatIconRegistry,
    // private sanitizer: DomSanitizer
  ) {
    // this.iconRegistry.addSvgIcon(
    //   'subway',
    //   sanitizer.bypassSecurityTrustResourceUrl('../assets/img/svg-icon/ic_directions_subway_48px.svg'));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    alert('Form Submitted');
  }

}
