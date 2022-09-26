import { Exercise } from "./exercise.model";
import { Subject, Subscription } from 'rxjs';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  { map } from 'rxjs/operators';



@Injectable()
export class TrainingServise{
  constructor(private db : AngularFirestore){}
     exerciseChanged = new Subject<Exercise>();
     exercisesChanged = new Subject<Exercise[]>();
     finishedExercisesChanged= new Subject<Exercise[]>;

    private fbsubscribtion :Subscription[];
    private availableExercise:Exercise[]=[ ]
    private runningExercise: Exercise;
    private Finishedexercises :Exercise[]=[];
  getExercise(){
    this.db.collection('availableExercises').snapshotChanges().pipe(map((docarray) => {
    return docarray.map(doc=>{
       return{
            id :doc.payload.doc.id,
            name : doc.payload.doc.data()['name'],
            duration:doc.payload.doc.data()['duration'],
            calories:doc.payload.doc.data()['calories']
       }
      })})).subscribe((exercises:Exercise[])=>{

        this.availableExercise=exercises
        this.exercisesChanged.next([...this.availableExercise])
      })
  }
  startExercise(selectedId:string) {
   // this.db.doc('availableExercises/'+selectedId).update({lastSelected:new Date()})
    this.runningExercise=this.availableExercise.find(ex=>ex.id === selectedId);


    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise(){
    this.addDatatoDB({...this.runningExercise,date:new Date() , state:"completed" } )
    this.runningExercise=null
    this.exerciseChanged.next(null)

  }
  cancelExercise(progress:number){
    this.addDatatoDB({...this.runningExercise,
      duration:this.runningExercise.duration*(progress/100),
      calories:this.runningExercise.calories*(progress/100),
      date:new Date ,
       state:"cancelled" } )
    this.runningExercise=null
    this.exerciseChanged.next(null)

  }
  getRuningExercise(){
    return {...this.runningExercise}
  }
  getAllExercises(){
    this.db.collection('finishedExercise').valueChanges().subscribe((exercises:Exercise[])=>{
      this.Finishedexercises=exercises
      this.finishedExercisesChanged.next(exercises)

    });
  }

  private addDatatoDB(exercise:Exercise){
    this.db.collection('finishedExercise').add(exercise)

  }


}
