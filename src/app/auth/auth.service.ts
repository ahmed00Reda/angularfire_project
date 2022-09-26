import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingServise } from './../training/traning.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable()
export class AuthService{
  authChange = new Subject<boolean>();
  private isAuthenticated=false;

  constructor(
    private router:Router,
    private afauth :AngularFireAuth ,
    private snackbar:MatSnackBarModule
     ){}

  registerUser(authData:AuthData){
    this.afauth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(res=>{
      this.isAuthenticated=true;
      this.authChange.next(true)
      this.router.navigate(["/training"])

    })
    .catch(err=>{
      console.log(err)
    })


  }

  login(authData:AuthData){
   this.afauth.signInWithEmailAndPassword(authData.email,authData.password)
   .then(res=>{
    this.isAuthenticated=true;
    this.authChange.next(true)
    this.router.navigate(["/training"])

  })
  .catch(err=>console.log(err))
    this.authChange.next(true)
    this.router.navigate(["/training"])

  }
  logout(){

    this.authChange.next(false)
    this.isAuthenticated=false
    this.router.navigate(["/login"])
  }

  isAuth(){
    return this.isAuthenticated
  }

    // Sign in with Google
    GoogleAuth() {

      return this.AuthLogin(new GoogleAuthProvider());

    }
  AuthLogin(provider) {
    return this.afauth
      .signInWithPopup(provider)
      .then((result) => {
        this.isAuthenticated=true;
      this.authChange.next(true)
      this.router.navigate(["/training"])
      })
      .catch((error) => {
        console.log(error);
      });
    }

}
