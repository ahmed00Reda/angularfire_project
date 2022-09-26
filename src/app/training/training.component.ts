import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingServise } from './traning.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining=false;
  exerciseSub:Subscription;
  constructor(private trainingServise:TrainingServise) { }

  ngOnInit(): void {
    this.exerciseSub=this.trainingServise.exerciseChanged.subscribe(
      exercise=>{
        if(exercise){
        this.ongoingTraining=true
      }else{
        this.ongoingTraining=false
      }
      }
    )
  }

}
