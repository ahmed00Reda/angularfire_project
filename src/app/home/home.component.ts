import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  froalaForm:FormGroup;
  editorContent:any="content will be displayed here";



  constructor(private db :AngularFirestore

  ) { }

  ngOnInit(): void {
    this.froalaForm = new FormGroup({ formModel:new FormControl()}
    )
   this.db.collection("froala").valueChanges().subscribe(data=>{

    this.editorContent=data[0]['text']
   // console.log(this.editorContent);
   })


  }
  onSubmit(){
    this.editorContent =  this.froalaForm.value.formModel.toString()
    this.db.collection("froala").doc("MB89AbkUoVW0NODQIsZn").update({text:this.editorContent})



  }

}
