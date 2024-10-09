import { Component, computed, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-some-component',
  standalone: true,
  template: `
    Full Name: {{ fullName() }}
    <button (click)="changeUser()">Change User</button>
  `,
})
export class SomeComponent {

  // 1 -
  user = signal({
    id: 1,
    firstName: 'Jon',
    lastName: 'Snow',
    age: 20,
  }, {
    equal: (previous, current) => {
      return previous.id === current.id
    }
  })

  fullName = computed(() => {
    console.log('Re-evaluating');
    return `${this.user().firstName} ${this.user().lastName}`;
  });

  changeUser() {
    this.user.update(value => ({
      ...value,
      age: 20,
    }));
  }


}
