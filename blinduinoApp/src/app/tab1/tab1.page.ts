import { Component, OnInit, HostBinding } from '@angular/core';
import { interval } from 'rxjs';
import { SpeechService } from '../../service/Speech/speech.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  randomFoot;
  randomHand: number;
  randomHead;
  colorFoot;
  colorHead;
  colorHand;
  time;
  clicked = false;
  clickedFoot = false;
  clickedHead = false;
  timeHand;
  timeFoot;

  // tslint:disable-next-line: variable-name
  constructor(private tts_service: SpeechService,
    private sanitizer: DomSanitizer) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.time = setInterval(() => { this.getRandom() }, 6000)

  }
  getRandom() {
    this.randomFoot = Math.round(((Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.colorFoot = this.getColor(this.randomFoot);
    this.randomHead = Math.round(((Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.colorHead = this.getColor(this.randomHead);
  }


  getHandSensor() {
    console.log('HAAAAAAANNNNDDDD')
    if (!this.clicked) {
      this.clicked = true;
      this.tts_service.textToSpeech('Hand Sensor');
      this.timeHand = setInterval(() => {
        console.log('HAAAAAAANNNNDDDD')
        if (!this.clickedFoot && !this.clickedHead) {
          this.randomHand = Math.round(((Math.random() * 4) + Number.EPSILON) * 100) / 100;
          this.tts_service.textToSpeech(this.randomHand.toString() + "metres");
          this.colorHand = this.getColor(this.randomHand);
        }
      }, 6000);
    }
    else {
      clearInterval(this.timeHand)
      this.clicked = false;
      this.colorHand = "white";
      this.randomHand=null;
    }
  }

    getDistanceFoot() {
    if (this.clicked) {
      clearInterval(this.timeHand)
      this.clicked = false;
      this.colorHand = "white";
      this.randomHand=null;
      console.log("FOOOOOOT")
      this.clickedFoot = true;
       this.tts_service.textToSpeech('Foot Sensor');
       this.tts_service.textToSpeech(this.randomFoot.toString()+ "metres ");
      this.clickedFoot = false;

      //this.getHandSensor();
    } else {
      console.log("FOOOOOOT")
      this.clickedFoot = true;
       this.tts_service.textToSpeech('Foot Sensor');
       this.tts_service.textToSpeech(this.randomFoot.toString()+ "metres ");
      this.clickedFoot = false;
    }

  }

   getDistanceHead() {
    if (this.clicked) {
      clearInterval(this.timeHand)
      this.clicked = false;
      this.colorHand = "white";
      this.randomHand=null;

      console.log("HEEEEAAADDD")
      this.clickedHead = true;
       this.tts_service.textToSpeech('Head Sensor');
       this.tts_service.textToSpeech(this.randomHead.toString()+ "metres ");

      this.clickedHead = false;

     // this.getHandSensor();
    } else {
      console.log("HEEEEAAADDD")
      this.clickedHead = true;
       this.tts_service.textToSpeech('Head Sensor');
       this.tts_service.textToSpeech(this.randomHead.toString()+ "metres ");
      this.clickedHead = false;
    }

  }

  getColor(num) {
    if (num >= 1.00) {
      return "green"
    } else if (num < 0.40) {
      return "red"
    } else {
      return "yellow"
    }
  }

  // getSpeechFoot() {
  //   this.time.subscribe(( ) => {
  //     this.tts_service.textToSpeech(this.getSpeechFoot.toString());
  //    });
  // }


}
