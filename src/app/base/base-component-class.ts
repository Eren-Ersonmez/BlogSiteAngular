import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponentClass {

  constructor(private spinner:NgxSpinnerService){}

  showSpinner(spinnerType:SpinnerType,defaultTime:boolean=false){
    this.spinner.show(spinnerType);
    if(defaultTime){
      setTimeout(()=>this.hideSpinner(spinnerType),750);
    }

  }

  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType{
  Timer="s1",
  Pacman="s2",
  Cog="s3",
  Fire="s4",
  CubeTransition="s5",
  BallClipRotate="s6",
  BallAtom="s7",
  LinespinClockwiseFade="s8",
  ballSquareSpin="s9",
  SquareJellyBox="s10"
}
