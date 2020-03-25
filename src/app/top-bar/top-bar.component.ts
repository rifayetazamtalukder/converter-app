import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {
  // 
  // Variable Lists
  // 
  private mediaType: Subscription;
  public deviceType: string;
  public navMode: string = 'over';


  // 
  constructor(private mediaObserver: MediaObserver) { }

  // 
  ngOnInit() {
    // 
    // This Will Call WHen The Component Will Initiate
    // 
    // Subscribe the mediaObserver Here
    // 
    this.mediaType = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.deviceType = change.mqAlias;

        if (this.deviceType === 'xl' || this.deviceType === 'lg') {
          this.navMode = 'side';
        }
        else {
          this.navMode = 'over';
        }
      }
    );
  }


  // 
  ngOnDestroy() {
    // 
    // This will Call Whenever the page will destroy(User navigates to other components)
    // 
    // NOTE: Don't Unsubscribe the this.mediaType:
    //      Because It Should Render all the time.
    // 
  }

}
