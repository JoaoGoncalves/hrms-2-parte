import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/componentes/footer.component';
import { FileUploadComponent } from './shared/componentes/file-upload.component';
import { interval, map, of } from 'rxjs';
import { SomeComponent } from "./pages/some-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, FileUploadComponent, SomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hrms'

}
