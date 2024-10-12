import { Component, OnInit } from '@angular/core';
import { BaseComponentClass, SpinnerType } from '../../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent extends BaseComponentClass implements OnInit {

 constructor(spinner:NgxSpinnerService){
  super(spinner);
 }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallClipRotate,true);
  }


}
