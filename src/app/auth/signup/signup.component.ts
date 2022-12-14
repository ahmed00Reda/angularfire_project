import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.authService.registerUser({
      email:form.value.email ,
      password: form.value.password
    })

  }

}
