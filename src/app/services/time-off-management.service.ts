import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TimeOffRequestService } from './time-off-request.service';
import { TimeOffRequest } from '../infrastructure/types/time-off-request.type';
import { merge, Subject, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TimeOffManagementService {
  private readonly timeOffRequestService = inject(TimeOffRequestService);
  deleteRequest$ = new Subject<TimeOffRequest>();
  approveRequest$ = new Subject<TimeOffRequest>();
  rejectRequest$ = new Subject<TimeOffRequest>();

  selectedType = signal<
    | 'Vacation'
    | 'Sick Leave'
    | 'Maternity Leave'
    | 'Paternity Leave'
    | 'Other'
    | ''
  >((localStorage.getItem('selectedType') as any) ?? '');

  requests = toSignal(
    merge(
      toObservable(this.selectedType),
      this.deleteRequest$.pipe(
        switchMap((r) => this.timeOffRequestService.deleteRequest(r.id))
      ),
      this.approveRequest$.pipe(
        switchMap((r) => this.timeOffRequestService.approveRequest(r.id))
      ),
      this.rejectRequest$.pipe(
        switchMap((r) => this.timeOffRequestService.rejectRequest(r.id))
      )
    ).pipe(
      switchMap(() => {
        return this.timeOffRequestService.getRequestsByType(
          this.selectedType()
        );
      })
    ),
    {
      initialValue: [] as TimeOffRequest[],
    }
  );

  resolvedRequests = computed(() =>
    this.requests().filter((r) => r.status !== 'Pending')
  );

  approveRequest(request: TimeOffRequest) {
    this.approveRequest$.next(request);
  }

  rejectRequest(request: TimeOffRequest) {
    this.rejectRequest$.next(request);
  }

  deleteRequest(request: TimeOffRequest) {
    this.deleteRequest$.next(request);
  }



  constructor() {
    effect(() => {
      localStorage.setItem('selectedType', this.selectedType());
    });
  }
}
