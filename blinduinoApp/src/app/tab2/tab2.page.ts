import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { GoogleCloudVisionServiceService } from '../../service/google-cloud-vision-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectedfeature:"LABEL_DETECTION"

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private _DomSanitizer: DomSanitizer,
    private vision: GoogleCloudVisionServiceService,
    private route : Router,
    public loadingController: LoadingController,
    private tts: TextToSpeech,
  ) { }

  
  async takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1
    }

    this.camera.getPicture(options).then(async (imageData) => {
     

      const loading = await this.loadingController.create({
        message: 'Getting Results...',
        translucent: true
        });

        await loading.present();

        this.vision.getLabels(imageData,this.selectedfeature).subscribe(async (result) => {
          console.log(result.toString())
          let navigationExtras: NavigationExtras = {
          queryParams: {
          special: JSON.stringify(imageData),
          result : JSON.stringify(result.toString()),
          feature : JSON.stringify(this.selectedfeature)
          }};
     this.route.navigate(["showclass"],navigationExtras)
     await loading.dismiss()
    }, err => {
      console.log(err);
      });
      }, err => {
      console.log(err);
      });
      }
     
     
      radioGroupChange(event)
    {
        this.selectedfeature = event.detail;
    }

    textToSpeech(){
      this.tts.speak('Take a photo')
      .then(() => console.log('Success'))
     .catch((reason: any) => console.log(reason));
    }
 

  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }
}
  


  

