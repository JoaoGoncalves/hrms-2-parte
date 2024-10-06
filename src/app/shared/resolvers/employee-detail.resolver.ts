import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../infrastructure/types/employee';

export const employeeDetailResolver: ResolveFn<Employee> = (route) => {
  const employee = inject(EmployeeService);
  const id = +(route.paramMap.get('id') ?? 0);

  return employee.getEmployee(id);
};
