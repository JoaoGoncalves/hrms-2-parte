import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { TimeOffRequest } from '../../infrastructure/types/time-off-request.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-off-management',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  template: `
    <h2>Time Off Management</h2>
    <h3>
      Resolved {{ resolvedRequests().length }} /
      {{ filteredRequests().length }} Unresolved
    </h3>
    <select
      [ngModel]="selectedType()"
      (ngModelChange)="selectedType.set($any($event))"
    >
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

  constructor() {

    // 2- Let’s use this to synchronize our selected type with localStorage
    effect(()=> {
      localStorage.setItem('selectedType', this.selectedType())
    })

    // 1 - side effects
    /* const count = signal(10);
    const increment = () => count.update((v) => v + 1);

    // callback in effect will be called when the count signal’s value changes
    //! This is because signal effects are always asynchronous, no matter if the code inside the callback does not deal with any async logic
    effect(() => {
      console.log(`Count is: ${count()}`);
    });

    increment();
    increment(); */
  }

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

  // 2- To bring that value back when the user visits the page we can just change the default value of the selectedType signal
  selectedType = signal<
    | 'Vacation'
    | 'Sick Leave'
    | 'Maternity Leave'
    | 'Paternity Leave'
    | 'Other'
    | ''
  >(localStorage.getItem('selectedType') as any ?? '');
  //!any type-casting command because localStorage.setItem returns a value of type string

  resolvedRequests = computed(() =>
    //this.requests().filter(r => r.status !== 'Pending')
    this.filteredRequests().filter((r) => r.status !== 'Pending')
  );

  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter((r) => (type ? r.type === type : true));
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


