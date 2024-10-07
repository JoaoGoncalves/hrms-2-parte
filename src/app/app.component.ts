import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/componentes/footer.component';
import { FileUploadComponent } from './shared/componentes/file-upload.component';
import { interval, map, of } from 'rxjs';
/* import { log } from './shared/operators/has-permissions.operators'; */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hrms'

}


/// first example of signals
const count = signal(0);
console.log(count());
//TypeScript inferred the type of this signal, so in the case of count, the set method will only accept numbers
count.set(1);
console.log(count());
//We can also use other signals as values when setting a value of some signal, for instance
count.set(count() + 1);
console.log(count());

//The update method of a signal will accept a callback
const increment = () => count.update(value => value + 1);
increment();
console.log(count());
increment();
console.log(count());

console.log('--------------------');

const names = signal<string[]>([]);
//update method becomes very useful when working with arrays or objects
const addName = (name: string) => names.update( value => [...value, name])
console.log(names())
addName('Joao');
console.log(names())
addName('José');
console.log(names())
//!The callback for the update method can be any function, and we can perform a variety of operations and logical conditions here, provided it matches the types

//? guidelines as to using the update method
//? use pure functions as callbacks, always return the same value when called, and do not have side-effects


