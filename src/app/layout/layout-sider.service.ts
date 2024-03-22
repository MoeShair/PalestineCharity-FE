import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutSiderService {
  public siderSubject = new Subject<boolean>();
  private isCollapsed = true;
  constructor() { }

  getIsCollapsed(){
    return this.isCollapsed;
  }
}
