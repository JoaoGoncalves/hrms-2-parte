import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
providers: [/* AuthService */],
  template: `
    <section>
      <h1>Login</h1>
      <form>
        <input type="text" name="email" placeholder="email" [(ngModel)]="credentials.email">
        <input type="password" name="password" placeholder="password" [(ngModel)]="credentials.password">
        <button type="submit" (click)="submit()">login</button>
        <p *ngIf="!credentials.email || !credentials.password">
          plaese fill all the fields
        </p>
      </form>
    </section>
  `,
  styles: ``
})
export class LoginComponent {
  credentials = {email: '', password: ''}

  constructor(private readonly authService: AuthService){}

  submit(){
    if(this.credentials.email && this.credentials.password){
      this.authService.login(this.credentials).subscribe();
    }
  }


}
