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
/* const count = signal(0);
console.log(count());
count.set(1);
console.log(count());
count.set(count() + 1);
console.log(count());

const increment = () => count.update(value => value + 1);
increment();
console.log(count());
increment();
console.log(count());

console.log('--------------------');

const names = signal<string[]>([]);
const addName = (name: string) => names.update( value => [...value, name])
console.log(names())
addName('Joao');
console.log(names())
addName('José');
console.log(names()) */
