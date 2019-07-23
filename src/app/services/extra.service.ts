import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  extras: any;

  constructor() { }

  public setExtras(data) {
    this.extras = data;
  }

  public getExtras(){
    return this.extras;
  }
}
