import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensajePersonalPage } from './mensaje-personal.page';

const routes: Routes = [
  {
    path: '',
    component: MensajePersonalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MensajePersonalPage]
})
export class MensajePersonalPageModule {}
