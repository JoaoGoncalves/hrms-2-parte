import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TimeOffRequest } from '../../infrastructure/types/time-off-request.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-off-management',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  template: `
    <h2>Time Off Management</h2>
    <h3>Resolved {{ resolvedRequests().length }} / {{  filteredRequests().length }} Unresolved </h3>
    <select [ngModel]="selectedType()" (ngModelChange)="selectedType.set($any($event))">
    <option value="">All</option>
    <option value="Vacation">Vacation</option>
    <option value="Sick Leave">Sick Leave</option>
    <option value="Maternity Leave">Maternity Leave</option>
    <option value="Paternity Leave">Paternity Leave</option>
    <option value="Other">Other</option>
</select>
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
        <tr *ngFor="let request of filteredRequests()">
          <td>{{ request.employeeId }}</td>
          <td>{{ request.startDate | date }}</td>
          <td>{{ request.endDate | date }}</td>
          <td>{{ request.type }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.comment }}</td>
          <td>
            <button
              *ngIf="request.status === 'Pending'"
              (click)="approveRequest(request)"
            >
              Approve
            </button>
            <button
              *ngIf="request.status === 'Pending'"
              (click)="rejectRequest(request)"
            >
              Reject
            </button>
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

  selectedType = signal<
    'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other' | ''
  >('');


  resolvedRequests = computed(() =>
    //this.requests().filter(r => r.status !== 'Pending')
    this.filteredRequests().filter(r => r.status !== 'Pending')
  );

  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter(r => (type ? r.type === type : true));

  });


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

/* //1
const count = signal(0);
const increment = () => count.update( v => v + 1);
const doubleCount = computed( () => count() * 2 );

console.log(count());
console.log(doubleCount());
increment();
console.log(count());
console.log(doubleCount()); */

/* //2
const a = signal(2);
const b = signal(3);
const sum = computed(() => a() + b());
console.log(sum());
b.set(7);
console.log(sum()) */

//3
const a = signal(2);
const b = signal(3);
const sum = computed(() => {
  console.log('Recalculating');
  return a() + b();
});
/* sum();
sum();
sum(); */
