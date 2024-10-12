import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../services/common/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private sharedService:SharedService,private router:Router){}

  search(search:string){
   this.sharedService.changeIdOrAny(search)
   this.router.navigate(['/articles',search]);

  }
}
