import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUpdated = new BehaviorSubject<boolean>(false);
  dataUpdated$ = this.dataUpdated.asObservable();

  notifyDataChange() {
    this.dataUpdated.next(true);
  }
}
