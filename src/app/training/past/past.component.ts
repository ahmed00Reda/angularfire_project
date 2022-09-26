import { AfterViewInit, Component, OnInit, ViewChild,OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingServise } from './../traning.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.scss']
})
export class PastComponent implements OnInit , AfterViewInit,OnDestroy{
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedsubscription:Subscription;
  @ViewChild(MatPaginator) paginator:MatPaginator


  constructor(private trainingServise:TrainingServise) { }
  ngOnDestroy(): void {
   this.exChangedsubscription.unsubscribe()
  }

  ngOnInit(): void {
   this.exChangedsubscription= this.trainingServise.finishedExercisesChanged.subscribe((exercise :Exercise[])=>{
    this.dataSource.data=exercise
    })
    this.trainingServise.getAllExercises()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator
  }


}
