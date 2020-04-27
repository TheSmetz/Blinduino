import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor(private tts: TextToSpeech) { }

  textToSpeech(words: string) {
    this.tts.speak(words)
    .then(() => console.log('Success'))
   .catch((reason: any) => console.log(reason));
  

  }

}
