import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {provideStorage,getStorage}from '@angular/fire/storage';


import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { MomentPipe } from './moment.pipe';


@NgModule({
  declarations: [
    PhotosComponent,
    MomentPipe
  ],
  imports: [


  CommonModule,
    PhotosRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    provideStorage(()=>getStorage())
  ]
})
export class PhotosModule { }
