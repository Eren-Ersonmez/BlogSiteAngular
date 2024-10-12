import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private idOrAnySource = new BehaviorSubject<any>(null);
  currentIdOrAny = this.idOrAnySource.asObservable();

  changeIdOrAny(idOrAny: any) {
    this.idOrAnySource.next(idOrAny);
  }
}
