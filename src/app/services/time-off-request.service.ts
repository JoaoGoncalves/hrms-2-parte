import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { TimeOffRequest } from '../infrastructure/types/time-off-request.type';

@Injectable({
  providedIn: 'root',
})
export class TimeOffRequestService {
  private readonly http = inject(HttpClient);

  getRequests() {
    return this.http.get<TimeOffRequest[]>('/time-off-requests');
  }


}
