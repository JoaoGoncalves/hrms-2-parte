import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-to-observable',
  standalone: true,
  imports: [],
  template: `
    <p>
      to-observable works!
    </p>
  `,
  styles: ``
})
export class ToObservableComponent {
  /* //1 -
  count = signal(0);
  count$ = toObservable(this.count);
  constructor() {
    this.count$.pipe(take(10)).subscribe(console.log);
    setInterval(() => this.count.update(value => value + 1), 1_000);
  }
  */

  // 2 - we will only see the value “3” logged in the console because the signal will wait until the current function (in this case, the constructor) stops executing before notifying subscribers about the update
  count = signal(0);
  count$ = toObservable(this.count);
  constructor() {
    this.count$.subscribe(console.log);
    this.count.set(1);
    this.count.set(2);
    this.count.set(3);
  }

}
