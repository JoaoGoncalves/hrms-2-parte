import { Component, effect, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-untracked2',
  standalone: true,
  imports: [],
  template: `
    <p>
      untracked2 works!
    </p>
  `,
  styles: ``
})
export class Untracked2Component {
  dateTime = toSignal(interval(10000).pipe(map(() => new Date())), {initialValue: new Date()});
  numeros = toSignal(interval(1000).pipe(map(v => v)), {initialValue: 0})

  constructor(){

    effect( () => {
      const dateTime = this.dateTime();

      untracked( ()=> {
        console.log(this.numeros());
      });
    })
  }
}
