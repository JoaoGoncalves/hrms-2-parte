import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/componentes/footer.component';
import { FileUploadComponent } from './shared/componentes/file-upload.component';
import { interval, map, of } from 'rxjs';
import { SomeComponent } from "./pages/examples/some-component.component";

import { UntrackedComponent } from "./pages/examples/untracked.component";
import { Untracked2Component } from './pages/examples/untracked2.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, FileUploadComponent, SomeComponent, UntrackedComponent, Untracked2Component],
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'hrms'

}
