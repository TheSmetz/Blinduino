import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { RouteReuseStrategy } from '@angular/router';

import {  IonicRouteStrategy } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx'
import { FilePath } from '@ionic-native/file-path/ngx'
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  providers: [
    StatusBar,
    WebView,
    File,
    SplashScreen,
    TextToSpeech,
    Camera,
    FilePath,
    File,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
