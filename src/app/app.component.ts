import { Component } from '@angular/core';
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
  title = 'hrms';
}


/* const compose = (f:Function,g: Function) => (param:number) => f(g(param));
const pipe = (f:Function,g: Function) => (param:number) => g(f(param));

const increment = (n:number) => n + 1;
const double = (n:number) => n * 2;
const doubleAndIncrement = compose(increment, double);
const doubleAndIncrement2 = pipe(increment, double);

console.log(doubleAndIncrement(5));
console.log(doubleAndIncrement2(5));

console.log('----------------');

const numbers$ = of(1,2,3);
const doubledNumbers$ = numbers$.pipe(map(n=>n*2));
doubledNumbers$.subscribe(n => console.log(n));
console.log('----------------');
numbers$.subscribe(n => console.log(n));

console.log('----------------');

of(1,2,3,4,5).pipe(
  log('Numero ')
).subscribe() */

