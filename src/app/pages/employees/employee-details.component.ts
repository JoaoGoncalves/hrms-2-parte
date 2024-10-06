import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../infrastructure/types/employee';
import { TruncateDirective } from '../../shared/directives/truncate.directive';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [TruncateDirective],
  template: `
    <section>
      <h1>Employee Details</h1>
      <p>First Name: {{employee.firstName}}</p>
      <p>Last Name: {{employee.lastName}}</p>
      <p>Position: {{employee.position}}</p>

      <p appTruncate>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sed. Nobis distinctio iure perferendis provident consectetur tempora consequatur maxime nisi nulla beatae dolore cupiditate, ab autem fuga necessitatibus eius architecto?</p>

      <p appTruncate [limit]="120">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sed. Nobis distinctio iure perferendis provident consectetur tempora consequatur maxime nisi nulla beatae dolore cupiditate, ab autem fuga necessitatibus eius architecto?</p>
    </section>
  `,
  styles: ``
})
export class EmployeeDetailsComponent {
  employee = inject(ActivatedRoute).snapshot.data['employee'] as Employee;
}
