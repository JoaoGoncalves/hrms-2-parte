import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe, NgComponentOutlet, NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgComponentOutlet],
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
            <button (click)="showConfirmationDialog()">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-container *ngComponentOutlet='confirmDialog'></ng-container>
  `,
  styles: ``
})
export class EmployeeListComponent {
  private readonly employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();

  isConfirmationOpen = false;
  confirmDialog: any;

  /* constructor(private readonly employeeService: EmployeeService){
    this.employees$ = this.employeeService.getEmployees();
  } */

  async showConfirmationDialog(){
    this.confirmDialog = await import('../../shared/componentes/confirmation-dialog.component').then( m => m.ConfirmationDialogComponent);

    this.isConfirmationOpen = true;
  }

}
