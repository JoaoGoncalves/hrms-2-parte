/*
Now, we are going to add something more valuable for the HR administration, namely a page that helps handle time-off requests from employees. This page will display a list of time-offs

- admin to approve or reject them
- searching through requests by employee name, filtering approved/rejected/pending requests
- shows statistical data about how many employees

*/
//! acrescentar rotas para  "/time-off"
// ver tipo de dados do Type: "TimeOffRequest"
// criar a componente


import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TimeOffRequest } from '../../infrastructure/types/time-off-request.type';

@Component({
  selector: 'app-time-off-management',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  template: `
    <h2>Time Off Management</h2>
        <table>
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Comment</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let request of requests()">
                    <td>{{ request.employeeId }}</td>
                    <td>{{ request.startDate | date }}</td>
                    <td>{{ request.endDate | date }}</td>
                    <td>{{ request.type }}</td>
                    <td>{{ request.status }}</td>
                    <td>{{ request.comment }}</td>
                    <td>
                        <button *ngIf="request.status === 'Pending'">Approve</button>
                        <button *ngIf="request.status === 'Pending'">Reject</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
  `,
  styles: ``
})
export class TimeOffManagementComponent {

  /* initially we will only use dummy data: without a service to load the actual data */
  requests = signal<TimeOffRequest[]>([
    {
        id: 1,
        employeeId: 1,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        type: 'Vacation',
        status: 'Pending',
    },
    {
        id: 2,
        employeeId: 2,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        type: 'Sick Leave',
        status: 'Approved',
        comment: 'Feeling pretty sick today :(',
    },
]);

}

/*
NOTAS para referenciar:

- requests() no ngFor
have often heard that calling functions in the template is a sort of bad practice, eventually will take lots of (unnecessary) time to complete, impacting performance

- However, in the case of signals, this function call essentially immediately returns the value that is already there, meaning it is not something that will impact performance

*/
