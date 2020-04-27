import { Component } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { SpeechService } from '../../service/Speech/speech.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tab1=Tab1Page;
  tab2= Tab2Page;
  tab3=Tab3Page;
  constructor(private tts: SpeechService) {}


 speakCamera(){
   this.tts.textToSpeech('click anywhere to open camera');
 }

 speakObstacle(){
  this.tts.textToSpeech('obstacle sensors');
}
speakAbout(){
  this.tts.textToSpeech('about us');
}
}
