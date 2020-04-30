import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor(private tts: TextToSpeech) { }


/**
 * transforms inserted text into vocal sound
 * @param words 
 */
 async  textToSpeech(words: string) {
   await  this.tts.speak({ text: words, rate: 1.5 })
    .then(() => console.log('Success'))
   .catch((reason: any) => console.log(reason));
  }

}
