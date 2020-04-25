import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab1PageModule } from '../tab1/tab1.module';
import { Tab2PageModule } from '../tab2/tab2.module';
import { Tab3PageModule } from '../tab3/tab3.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SuperTabsModule,
    Tab2PageModule,
    Tab3PageModule,
  Tab1PageModule ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
