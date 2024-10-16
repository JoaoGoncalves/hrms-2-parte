import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <section>
      <label for="upload">{{label}}</label>
      <input type="file" id="upload" (change)="onFileSeleted($event)">
      @if (errorMessage) {
        <div>
          {{errorMessage}}
          <p>Only the following files are accepted</p>
          <ul>
            @for (type of accept() ; track type) {
              <li>{{type}}</li>
            }
          </ul>
        </div>
      }
    </section>
  `,
  styles: ``
})
export class FileUploadComponent {

  /* @Input({required: true}) label!: string;
  @Input({transform: (value: string) => value.split(',')}) accept: string[] = [];
  @Output() selected = new EventEmitter<FileList>(); */

  //! transformar os inputs e outputs em signals, com as respectivas fuções
  label = input.required<string>();
  accept = input([], {transform: (value: string) => value.split(',')});
  selected = output<FileList>()

  errorMessage = '';

  onFileSeleted(event: any) {
    const files: FileList = event.target.files;
    this.errorMessage = Array.from(files).every( f => this.accept().includes(f.type)) ? '' : 'Invalid File Type';

    if(this.errorMessage === ''){
      this.selected.emit(files);
    }
  }

}
