import { Component, OnInit } from '@angular/core';
import { BaseComponentClass, SpinnerType } from '../../base/base-component-class';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent extends BaseComponentClass implements OnInit {

  constructor(spinner:NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.LinespinClockwiseFade,true);
  }

}
