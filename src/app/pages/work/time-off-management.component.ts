/*

6.3.2 Handling signals in Angular components

- use the set and update methods to handle the data changes

*/


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
            <button *ngIf="request.status === 'Pending'"
            (click)="approveRequest(request)">Approve</button>
            <button *ngIf="request.status === 'Pending'"
            (click)="rejectRequest(request)">Reject</button>
            <button (click)="deleteRequest(request)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``,
})
export class TimeOffManagementComponent {
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

  approveRequest(request: TimeOffRequest) {
    this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index ? { ...item, status: 'Approved' } : item
      );
    });
  }

  rejectRequest(request: TimeOffRequest) {
    this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index ? { ...item, status: 'Rejected' } : item
      );
    });
  }

  deleteRequest(request: TimeOffRequest) {
    this.requests.update((requests) =>
      requests.filter((r) => r.id !== request.id)
    );
  }
}


/* NEXT- acrescentar search por tipo de request, e acrescentar estatisica - 6.4.1 */
