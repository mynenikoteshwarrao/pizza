import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  public messages$: Observable<string[]>;
  public messages: Subscriber<string[]>;

  public set information(messages: string[]) {
      this.messages.next(messages);
  }
  
  constructor() {
    this.messages$ = new Observable(observer => {
      this.messages = observer;
    });
  }

}
