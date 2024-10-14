import { Component, computed, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-untracked',
  standalone: true,
  imports: [],
  template: `
    <h2>Untracked</h2>
     Full Name: {{ fullName() }}
     <button (click)="changeUser()">Change User</button>
  `,
  styles: ``
})
export class UntrackedComponent {

  user = signal({
    id: 1,
    firstName: 'Jon',
    lastName: 'Snow',
    age: 20,
  })

  dateTime = toSignal(interval(900).pipe(map( () => new Date())), {initialValue: new Date()} )

  fullName = computed(() => {
    console.log('Re-evaluating');
    const dateTime = untracked(this.dateTime); // the Signal, not the value
    return `${this.user().firstName} ${this.user().lastName}, last modified at ${dateTime}`;
  });

  //! untracked muito util em effects, onde podemos tambem definir uma função de callback para a logica que queremos "Untracked", exemplo seguinte

  changeUser() {
    this.user.update(value => ({
      ...value,
      age: 20,
      //age: 30,
    }));
  }

}
