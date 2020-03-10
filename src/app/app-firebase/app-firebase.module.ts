import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from './../../environments/environment.prod';




@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports :[
    AngularFireModule,
    AngularFireAuthModule

  ]
})
export class AppFirebaseModule { }
