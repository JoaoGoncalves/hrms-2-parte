import { HttpInterceptorFn } from '@angular/common/http';
import { hasPermissions } from '../operators/has-permissions.operators';

export const employeePermissionsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    hasPermissions(['CreateEmployee', 'DeleteEmployee', 'EditEmployeeGeneralDetails', 'ViewEmployees'])
  );
};
