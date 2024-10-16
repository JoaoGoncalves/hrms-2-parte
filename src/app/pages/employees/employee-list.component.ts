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
            <button #deleteButton (click)="isConfirmationOpen = true" >Delete</button>
            <!-- @defer (when isConfirmationOpen) { --> <!-- este defer so acontece uma vez mesmo que a variavel booleanda seja atualizada -->
             <!-- ter atencao de estar no mesmo "node" o "node" pai da interaction -->
            @defer (on interaction(deleteButton)) {
              <app-confirmation-dialog [isConfirmationOpen]='isConfirmationOpen'></app-confirmation-dialog>
            }
          </td>
        </tr>
      </tbody>
    </table>


  `,
  styles: ``
})
export class EmployeeListComponent {
  private readonly employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();

  isConfirmationOpen = false;
  confirmDialog: any;

}
