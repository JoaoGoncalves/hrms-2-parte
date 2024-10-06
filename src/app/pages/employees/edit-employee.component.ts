import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeForm } from '../../infrastructure/types/employee-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
            <h1>Edit</h1>
            <form [formGroup]="form">
                <input type="text"  placeholder="firstName" formControlName="firstName">
                <input type="text"  placeholder="lastName" formControlName="lastName">
                <input type="text" placeholder="Email" formControlName="email">
                <input type="text" placeholder="position" formControlName="position">
                <input type="text"  placeholder="level" formControlName="level">

                <button type="submit">save</button>
            </form>
            <article>
              <button (click)="this.permissionsService.setPermissions({EditEmployeePrivateDetails: true})">enable edition</button>

              <button (click)="this.permissionsService.revokePermission('EditEmployeePrivateDetails')">disable edition</button>
            </article>
        </div>
  `,
  styles: ``
})
export class EditEmployeeComponent implements OnInit {

  permissionsService = inject(PermissionService);
  destroyRef = inject(DestroyRef)

  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    position: new FormControl('', { nonNullable: true }),
    level: new FormControl('', { nonNullable: true }),
  });



  ngOnInit(): void {

    this.permissionsService.hasPermission('EditEmployeePrivateDetails').pipe(
      takeUntilDestroyed( this.destroyRef),
    ).subscribe( hasPermission => {
      if(!hasPermission){
        this.form.controls.firstName.disable();
        this.form.controls.lastName.disable();
        this.form.controls.email.disable();
      } else {
        this.form.controls.firstName.enable();
        this.form.controls.lastName.enable();
        this.form.controls.email.enable();
      }
    })
  }

}


