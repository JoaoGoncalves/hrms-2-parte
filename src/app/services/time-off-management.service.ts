import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TimeOffRequestService } from './time-off-request.service';
import { TimeOffRequest } from '../infrastructure/types/time-off-request.type';
import { merge, Subject, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';




@Injectable({
  providedIn: 'root'
})
export class TimeOffManagementService {

 //!  CRIAR PRIMIERO OS RESTANTES METODOS DO TimeOffREquestService

  private readonly timeOffRequestService = inject(TimeOffRequestService);

  //! criar os subjects que vao emitir as accoes com o serviço, onde estao as calls HTTp
  deleteRequest$ = new Subject<TimeOffRequest>();
  approveRequest$ = new Subject<TimeOffRequest>();
  rejectRequest$ = new Subject<TimeOffRequest>();

  //! guardar o tipo de request, para filtrar no serviço
  selectedType = signal<
    | 'Vacation'
    | 'Sick Leave'
    | 'Maternity Leave'
    | 'Paternity Leave'
    | 'Other'
    | ''
  >((localStorage.getItem('selectedType') as any) ?? '');

  //! criar um signal que irá receber as interacções da VIEW e emitir uma action de acordo com as interaccçes
  requests = toSignal(
    merge(
      toObservable(this.selectedType), //! converter o signal em observable para poder usar o merge
      this.deleteRequest$.pipe( //!quando houver um next faz a chamada http
        switchMap((r) => this.timeOffRequestService.deleteRequest(r.id))
      ),
      this.approveRequest$.pipe(//!quando houver um next faz a chamada http
        switchMap((r) => this.timeOffRequestService.approveRequest(r.id))
      ),
      this.rejectRequest$.pipe(//!quando houver um next faz a chamada http
        switchMap((r) => this.timeOffRequestService.rejectRequest(r.id))
      )
    ).pipe(
      switchMap(() => { //!aplica o filter antes da chamada consoante o tipo de request
        return this.timeOffRequestService.getRequestsByType(
          this.selectedType()
        );
      })
    ),
    {
      initialValue: [] as TimeOffRequest[], //! valor initial como uma array de request vazia
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
