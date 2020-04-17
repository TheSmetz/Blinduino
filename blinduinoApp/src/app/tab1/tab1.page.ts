import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  randomFoot;
  randomHand;
  randomHead;
  time = interval(2000);
  constructor() {}

// tslint:disable-next-line: use-lifecycle-interface
ngOnInit() {
  // tslint:disable-next-line: deprecation
  this.time.subscribe(( ) => {this.getRandom(),
  console.log(this.randomHead); });
}
  getRandom() {
    this.randomFoot = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.randomHand = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.randomHead = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
  }
}
