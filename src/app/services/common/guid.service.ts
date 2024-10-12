import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuidService {

  isGuid(str: string): boolean {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(str);
  }
}
