/*

  - initial value of the requests signal an array of mock requests

  - We will have a service, which will utilize the HttpClient and return an Observable of time-off requests. But if it is an Observable, how do I use it as a signal in my code?

  - criar e serviço com o metodo getRequests() somente para já

  //! all the methods where we changed its value via update will now throw errors
  - because toSignal function returns a Signal, and not a WritableSignal, which is expected
  - Observables can be async and have three states (working, error, and completed)
  - this has to be reflected in some way in the signal derived from it
  - Because of this, we cannot just go assigning signals derived from Observables to properties wherever we like

  - resolveremos isso para já deixemos sem as funcionalidades restantes do serviço

*/



import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { TimeOffRequest } from '../../infrastructure/types/time-off-request.type';
import { FormsModule } from '@angular/forms';
import { TimeOffRequestService } from '../../services/time-off-request.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

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

  //private readonly injector = inject(Injector)

  private readonly timeoffRequestService = inject(TimeOffRequestService);
  requests = toSignal(this.timeoffRequestService.getRequests(), {initialValue: []});

  /* requests = signal<TimeOffRequest[]>([
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
  ]); */

  constructor() {
    effect(()=> {
      localStorage.setItem('selectedType', this.selectedType())
    })

  }


  selectedType = signal<
    | 'Vacation'
    | 'Sick Leave'
    | 'Maternity Leave'
    | 'Paternity Leave'
    | 'Other'
    | ''
  >(localStorage.getItem('selectedType') as any ?? '');

  resolvedRequests = computed(() =>
    //this.requests().filter(r => r.status !== 'Pending')
    this.filteredRequests().filter((r) => r.status !== 'Pending')
  );

  filteredRequests = computed(() => {
    const type = this.selectedType();
    return this.requests().filter((r) => (type ? r.type === type : true));
  });

  approveRequest(request: TimeOffRequest) {
    /* this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index ? { ...item, status: 'Approved' } : item
      );
    }); */
  }

  rejectRequest(request: TimeOffRequest) {
    /* this.requests.update((requests) => {
      const index = requests.findIndex((r) => r.id === request.id);
      return requests.map((item, i) =>
        i === index ? { ...item, status: 'Rejected' } : item
      );
    }); */
  }

  deleteRequest(request: TimeOffRequest) {
    /* this.requests.update((requests) =>
      requests.filter((r) => r.id !== request.id)
    ); */

    //! exemplo, mas que nao funciona, estamos a afetar o resultado a um novo Signla, quebrado os outros "Computed" signals, temos que arranjar forma de o observable de chamadas HTTp, nao termine, e re-emita novos dados

    //? solucoes destas ocorrem com bibliotecas como o NgRx, neste caso tremos que implementar a solução com uma outra estrutura, que faremos mais a frente.

    /* this.requests = toSignal(
      this.timeoffRequestService
          .deleteRequest(request.id)
          .pipe(
            switchMap(()=>this.timeoffRequestService.getRequests())
          ),{initialValue: this.requests(), injector: this.injector}
    ) */
  }
}
