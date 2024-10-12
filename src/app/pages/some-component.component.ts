import { NgIf } from '@angular/common';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-some-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `

    <article>
    <form [formGroup]="nameForm" (ngSubmit)="onSubmit()">
      <label for="firstName">First Name</label>
      <input id="firstName" formControlName="firstName" type="text">

      <label for="lastName">Last Name</label>
      <input id="lastName" formControlName="lastName" type="text">

      <button type="submit">Submit</button>
    </form>

    <div *ngIf="submitted">
      <p>First Name: {{ nameForm.value.firstName }}</p>
      <p>Last Name: {{ nameForm.value.lastName }}</p>
    </div>
    </article>
  `,
})
export class SomeComponent {
  fb = inject(FormBuilder);
  nameForm: FormGroup;
  submitted = false;

  user = signal({
    id: 1,
    firstName: 'Jon',
    lastName: 'Snow',
    age: 20,
  });

  dateTime = toSignal(interval(2000).pipe(map(() => new Date())), {initialValue: new Date()})

  constructor() {
    this.nameForm = this.fb.group({
      firstName: [''],
      lastName: [''],
    });


    effect(()=> {
      const dateTime = this.dateTime;
      untracked(()=>{
        const formValues = this.nameForm.value;
        localStorage.setItem('formValues', JSON.stringify(formValues));
        alert(`Your PRgress has been saved at ${dateTime}`)
      })
    })
  }

  onSubmit() {
    this.submitted = true;
    this.user.update(value => ({
      ...value,
      firstName: this.nameForm.value,
      lastName: this.nameForm.value,
    }));
  }


}
