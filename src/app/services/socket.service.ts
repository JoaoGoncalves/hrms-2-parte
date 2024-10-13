import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    notifications$ = interval(5_500).pipe(map(() => []), tap(() => console.log('EMITTED')));
}
