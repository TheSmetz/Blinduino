import { Component,  AfterViewInit, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { GoogleCloudVisionServiceService } from '../../service/google-cloud-vision-service.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SpeechService } from '../../service/Speech/speech.service';
import { HttpParams } from '@angular/common/http';
import { SuperTabs } from '@ionic-super-tabs/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page   {



  constructor(
    private st: SuperTabs,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    // private _DomSanitizer: DomSanitizer,
    private vision: GoogleCloudVisionServiceService,
    private route: Router,
    public loadingController: LoadingController,
    private tts: SpeechService,
  ) { }

  
  async takePhoto() {
    this.tts.textToSpeech('Camera activated');
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1
    };

    this.camera.getPicture(options).then(async (imageData: string ) => {
      this.tts.textToSpeech('Getting Results');
      const loading = await this.loadingController.create({
        message: 'Getting Results...',
        translucent: true
        });
      await loading.present();


      const data = {image: imageData};
      const str = JSON.stringify(data)
      
      // tslint:disable-next-line: no-shadowed-variable
      const result = this.vision.getLabels(str).subscribe(async ( result: string ) => {
        console.log(result)
        this.tts.textToSpeech(result.toString())
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));

         loading.dismiss();
  }, err => {
    console.log(err);
    });
    }, err => {
    console.log(err);
    });
    }

    textToSpeech() {
      this.tts.textToSpeech('Take a photo')
      .then(() => console.log('Success'))
     .catch((reason: any) => console.log(reason));
    }

}
