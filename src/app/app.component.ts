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
//! WritableSignal is a type of a Signal whose value can be changed (hence writable)

//There are other signals, typed as simply Signal, which are immutable

// signal function is written in a way that allows TypeScript to infer the type of the signal from the default value
// there are cases when inferring the value is not really possible, For instance, we want to create a signal of an array of strings, but the default value is an empty Array, TypeScript has no way of guessing the overall type of this array
//!we should provide the type manually:
const names = signal<string[]>([]);
console.log(names())
