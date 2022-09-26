import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
 @Output() sidenavtoggle= new EventEmitter<void>()
  isAuth=false;
  subscribtion!: Subscription;

  constructor( private authService:AuthService) { }


  ngOnInit(): void {
    this.subscribtion= this.authService.authChange.subscribe(auth=>{
      this.isAuth=auth
    })
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
  onToggle(){
    this.sidenavtoggle.emit()

  }
  onLogout(){
    this.authService.logout();

  }

}
