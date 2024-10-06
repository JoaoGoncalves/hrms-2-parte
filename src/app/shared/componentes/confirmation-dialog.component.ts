import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog [open]='isConfirmationOpen'>
      <p>Are you sure to perform this action?</p>
      <button (click)="isConfirmationOpen=false">Cancel</button>
      <button (click)="isConfirmationOpen=false">Confirm</button>
    </dialog>
  `,
  styles: ``
})
export class ConfirmationDialogComponent {
  @Input() isConfirmationOpen = true;

}
