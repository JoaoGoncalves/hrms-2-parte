import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe, NgComponentOutlet, NgFor } from '@angular/common';
import { ConfirmationDialogComponent } from '../../shared/componentes/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, ConfirmationDialogComponent],
  template: `
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees$ | async">
          <td>{{ employee.firstName }} {{ employee.lastName }}</td>
          <td appTruncate>{{ employee.position }}</td>
          <td>
            <button (click)="isConfirmationOpen = true">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <ng-container *ngComponentOutlet='confirmDialog'></ng-container> -->
     @defer {
      <app-confirmation-dialog [isConfirmationOpen]='isConfirmationOpen'></app-confirmation-dialog>
     }
  `,
  styles: ``
})
export class EmployeeListComponent {
  private readonly employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();

  isConfirmationOpen = false;
  confirmDialog: any;

  /* async showConfirmationDialog(){
    this.confirmDialog = await import('../../shared/componentes/confirmation-dialog.component').then( m => m.ConfirmationDialogComponent);

    this.isConfirmationOpen = true;
  } */

}
