import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {getFirestore, doc, deleteDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import  { map } from 'rxjs/operators';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  File :any ;
  private downloadUrl:any;
  photosform:FormGroup;
  willBeUploaded={}
  allphotos:any;
  constructor( private Router:Router,private db :AngularFirestore) { }

  ngOnInit(): void {
    this.photosform = new FormGroup({
      title:new FormControl("",{
        validators:[Validators.required]
      }),
      description:new FormControl("",{
        validators:[Validators.required]
      }),
      photoUrl:new FormControl("",{
        validators:[Validators.required]
      })
    })
    this.getAllphotos()

  }
  selectedfile(e){
     this.File= e.target.files[0]
  }


  async onSubmit(){

   await  this.uploadToStorage().then((res)=>{

      this.willBeUploaded={

        title: this.photosform.value.title,
        date: new Date().getTime(),
        photoUrl:this.downloadUrl,
        description:this.photosform.value.description
     }
     console.log(this.willBeUploaded)

    this.photosform.reset()



     })
     this.db.collection('photos').add(this.willBeUploaded)





  }

  uploadToStorage(){
      return new Promise((res,rej)=>{

            const storage = getStorage();
            const storageRef = ref(storage, "images/"+this.File.name);

            const uploadTask = uploadBytesResumable(storageRef, this.File);
            uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              // ...
              case 'storage/unknown':
                  console.log("unknown");
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);

              this.downloadUrl=downloadURL
              console.log(this.downloadUrl);
              res(downloadURL)
            });
          }
        );

      })


  }
  getAllphotos(){
    this.db.collection('photos').snapshotChanges().pipe(map((docarray) => {
      return docarray.map(doc=>{
         return{
              id :doc.payload.doc.id,
              photoUrl:doc.payload.doc.data()['photoUrl'],
              title : doc.payload.doc.data()['title'],
              date:doc.payload.doc.data()['date'],
              description:doc.payload.doc.data()['description']
         }
        })})).subscribe((photo)=>{

          this.allphotos=photo

        })

  }
  onDelete(id){
    console.log(id);

  this.db.collection("photos").doc(id).delete()
  console.log("deleted succesfully");

  }

}
