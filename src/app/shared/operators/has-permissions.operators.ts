import { inject } from "@angular/core";
import { filter, map, MonoTypeOperatorFunction, Observable, pipe, tap, withLatestFrom } from "rxjs";
import { PermissionService } from "../../services/permission.service";
import { Permissions } from '../../infrastructure/types/permissions';

export function hasPermissions<T>(
  permissions: Permissions[],
  permissionsService = inject(PermissionService),
): MonoTypeOperatorFunction<T> {

  console.log('teste....');
  permissionsService.readPermissions();

  return pipe(
    withLatestFrom(permissionsService.hasPermissions(permissions)),
    filter(([, hasPermissions]) => hasPermissions),
    map(([value]) => value)
  );
}
