import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training-component';
import { TrainingServise } from './../traning.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  progress=0;
  timer !:number;
  constructor( private dialog: MatDialog, private trainingServise:TrainingServise) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingServise.getRuningExercise().duration /100 *1000 ;


    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingServise.completeExercise()
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingServise.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
    });

  }
}
