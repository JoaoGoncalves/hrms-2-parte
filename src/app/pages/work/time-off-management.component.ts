/*

COMPUTED SIgnals

- Observables are immutable and we can only create new Observables from existing ones

- signals, we saw that they are mutable, but we haven’t yet approached the topic of creating new signals from existing ones
-it is very important to be able to derive new values from existing signals
- computed() : Signals created with this function are called computed signals

*/


import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
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

//1 , it takes a callback, which has no arguments, and the value that this callback returns becomes the value of the resulting signal
/* const count = signal(0);
const increment = () => count.update( v => v + 1);
const doubleCount = computed( () => count() * 2 );

console.log(count());
console.log(doubleCount());
increment();
console.log(count());
console.log(doubleCount()); */


//2 - We can also use the computed function to create signals derived from multiple other signals
/* const a = signal(2);
const b = signal(3);
const sum = computed(() => a() + b());
console.log(sum());
b.set(7);
console.log(sum()) */

//3 - signals created with computed will recalculate their value when there are changes, and store it, so reading their value does not result in a new run of the calculation
/* const a = signal(2);
const b = signal(3);
const sum = computed(() => {
  console.log('Recalculating');
  return a() + b();
});
// sum();
// sum();
// sum(); */

//! computed returns a Signal and not a WritableSignal.
//? a computed signal will be destroyed when the context in which it was created is gone
