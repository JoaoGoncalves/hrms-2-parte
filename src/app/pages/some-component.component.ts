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
      <button (click)="update()">update</button>

    </article>
  `,
})
export class SomeComponent {

  counter = signal(0);

  constructor(){
    effect(() => {
      console.log(`Value is: ${this.counter()}`);
    })
  }

  update(){
    this.counter.set(7);
    this.counter.set(11)
    this.counter.set(20)
  }

}
