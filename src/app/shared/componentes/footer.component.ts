import { Component } from '@angular/core';
import { isAuth } from '../functions/is-auth';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <section>
      <hr>
      <h1>HRMS</h1>
      <p>Welcome to HRMS platform!</p>
      <div class="links">
        Follow us on social media:
        <a href="https://linkedin.com" target="_blank">Linkedin</a> /
        <a href="https://x.com" target="_blank">X (former Twitter)</a>
      </div>
      <div *ngIf="isAuth$ | async" class="legal">
        <a routerLink="/terms">Terms of Service</a> /
        <a routerLink="/privacy">Privacy Policy</a> /
        <a routerLink="/cookies">Cookies Policy</a>
      </div>
    </section>
  `,
  styles: ``
})
export class FooterComponent {
  isAuth$ = isAuth();
}
