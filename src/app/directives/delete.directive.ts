import { Directive, ElementRef, EventEmitter, HostListener, Input, Renderer2 } from '@angular/core';
import { HttpClientService } from '../services/common/http-client.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Input() id: string;
  @Input() controller: string;
  @Input() callback: EventEmitter<any> = new EventEmitter;

  constructor(private renderer:Renderer2,private elementRef:ElementRef,private httpClientService:HttpClientService)
  {
     const img=renderer.createElement("img");
     img.setAttribute("src", "assets/delete.png");
     img.setAttribute("style", "cursor: pointer;");
     img.width = 25
     renderer.appendChild(elementRef.nativeElement, img);
  }

  @HostListener("click")
  onClick(){
    const td: HTMLTableCellElement = this.elementRef.nativeElement;
    this.httpClientService.delete({
      controller:this.controller
    },this.id).subscribe(()=>{
      $(td.parentElement).fadeOut(2000, () => {
        this.callback.emit()
        alert("Başarılı bir şekilde silindi")
      })
    },()=>{
      this.callback.emit()
      alert("Silinirken bir hata oluştu")
    })

  }

}
