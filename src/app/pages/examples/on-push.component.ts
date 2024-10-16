import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-some',
  standalone: true,
  template: `
    <p (click)="handle()">{{user.firstName}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SomeComponent {
  @Input({ required: true }) user!: { firstName: string; lastName: string };

  handle() {}
}

/* ---------- */

@Component({
  selector: 'app-on-push',
  standalone: true,
  template: `
    <app-some  [user]="user"/>
  `,
  imports: [SomeComponent],
})
export class OnPushComponent {
  user = { firstName: 'John', lastName: 'Doe' };

  constructor() {
    setTimeout(() => {
      this.user.firstName = 'Alex';
      //this.user = {...this.user, firstName: 'Alex'};
    }, 2_000);
  }
}
