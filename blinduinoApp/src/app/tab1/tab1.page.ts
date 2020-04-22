import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { SpeechService } from '../../service/Speech/speech.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  randomFoot;
  randomHand;
  randomHead;
  time = interval(4000);
  // tslint:disable-next-line: variable-name
  constructor(private tts_service: SpeechService) {}

// tslint:disable-next-line: use-lifecycle-interface
ngOnInit() {
  // tslint:disable-next-line: deprecation
  this.time.subscribe(( ) => {this.getRandom(),
  console.log(this.randomHead); });
}
  getRandom() {
    this.randomFoot = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.randomHead = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
  }

  getHandSensor() {
    this.tts_service.textToSpeech('head Sensor');
    this.time.subscribe(( ) => {
      this.randomHand = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
      this.tts_service.textToSpeech(this.randomHead);
      console.log(this.randomHead); });
    
  }

  getSpeechFoot() {
    this.time.subscribe(( ) => {
      this.tts_service.textToSpeech(this.getSpeechFoot.toString());
     });
  }
}
