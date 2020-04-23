import { Component, OnInit, HostBinding } from '@angular/core';
import { interval } from 'rxjs';
import { SpeechService } from '../../service/Speech/speech.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  randomFoot;
  randomHand;
  randomHead;
  colorFoot;
  colorHead;
  colorHand;
  time;
  clicked = false;
  clickedFoot=false;
  
  // tslint:disable-next-line: variable-name
  constructor(private tts_service: SpeechService,
              private sanitizer: DomSanitizer) {}

// tslint:disable-next-line: use-lifecycle-interface
ngOnInit() {
  // tslint:disable-next-line: deprecation
  this.time = setInterval(() => {this.getRandom(),
    console.log(this.randomHead);},2000)
  
}
  getRandom() {
    this.randomFoot = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.colorFoot=this.getColor(this.randomFoot);
    this.randomHead = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
    this.colorHead=this.getColor(this.randomHead);
  }


  getHandSensor() {
    if(!this.clicked){
      this.clicked=true;
      this.tts_service.textToSpeech('head Sensor');
      this.time = setInterval(() => {
        this.randomHand = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
        this.tts_service.textToSpeech(this.randomHead);
        this.colorHand=this.getColor(this.randomHand);
        console.log(this.randomHead) 
      }, 2000);
    }else{
     clearInterval(this.time)
      this.clicked=false;
      this.colorHand = "white";
    }
  }


  getDistanceFoot(){
    if(!this.clickedFoot){
      this.clickedFoot=true;
      this.tts_service.textToSpeech('Foot Sensor');
      this.time = setInterval(() => {
        this.randomHand = Math.round((( Math.random() * 4) + Number.EPSILON) * 100) / 100;
        this.tts_service.textToSpeech(this.randomHead);
        this.colorHand=this.getColor(this.randomHand);
      }, 2000);
    }else{
     clearInterval(this.time)
      this.clickedFoot=false;
    }
  }

  getColor(num){
    if(num>=1.00){
      return "green"
    }else if(num < 0.40){
      return "red"
    }else{
      return "yellow"
    }
  }

  // getSpeechFoot() {
  //   this.time.subscribe(( ) => {
  //     this.tts_service.textToSpeech(this.getSpeechFoot.toString());
  //    });
  // }

 
}
