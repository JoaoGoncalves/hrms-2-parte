/*

progress counter of how many resolved time off requests are there versus the total number of requests

*/

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

    <!-- 1 - mostrar estatisticas -->
    <h3>Resolved {{ resolvedRequests().length }} / {{  filteredRequests().length }} Unresolved </h3>

    <!-- 2-
    - add a select dropdown with all the options, and bind it with this new signal using an ngModel
    //! paying attention to here: the fact that we wrote (ngModelChange)="selectedType.set($any($event))"

    //! [(ngModel)]=”something” is actually syntactic sugar, a shorthand syntax equivalent to [ngModel]=”something” (ngModelChange)=”something = $event”

    //! we would write something like [(ngModel)]=”selectedType”

    //! with signals, we cannot just assign values to them, and need to call the set method

    //! we used the $any helper function, which in Angular templates type-casts a value to type any

    -->
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
        <!-- 3-
        we can replace requests() (which represent all the requests, without any filters), with the new filteredRequests computed signal
        -->
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

  // 2 - filtering functionality based on the type of requests
  selectedType = signal<
    'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other' | ''
  >('');


  resolvedRequests = computed(() =>
    //1- this.requests().filter(r => r.status !== 'Pending')

    //4 - resolvedRequests signals can be modified to show the proportion of resolved requests among the ones filtered
    this.filteredRequests().filter(r => r.status !== 'Pending')
  );

 // 3 - Finally, we need a computed signal, which will calculate the filtered users based on the selected type:
  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter(r => (type ? r.type === type : r));

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

