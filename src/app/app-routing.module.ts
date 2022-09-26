import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",component:WelcomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"training",component:TrainingComponent,canActivate:[AuthGuard]},
  {path:"photos",
  loadChildren:()=>import('./photos/photos/photos.module').then(m=>m.PhotosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
