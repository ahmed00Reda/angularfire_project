import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingServise } from './../traning.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  { map } from 'rxjs/operators';
//import { map } from 'rxjs-compat/operator/map';





@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit,OnDestroy {

  exercises:Exercise[];
  exerciseSubscription:Subscription
  constructor(private trainingServise:TrainingServise, private db :AngularFirestore) {

  }
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe()
  }

  ngOnInit(): void {
   //this.exercises= this.db.collection('availableExercises').valueChanges()
    this.exerciseSubscription= this.trainingServise.exercisesChanged.subscribe(exercise=>this.exercises=exercise)
   this.trainingServise.getExercise()

   //this.exercises = collectionData(collection(this.db,'availableExercises'))

  }
  onStartTraining(form : NgForm){
  this.trainingServise.startExercise(form.value.exercise)
  }

}
