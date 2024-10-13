import { Component, inject, Inject, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../infrastructure/types/notification';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <header>
      <h2>HRMS</h2>
      <button (click)="notificationsOpen.set(true)" title="View Notifications">
        You have {{ unreadNotifications().length }} unread notifications
      </button>
    </header>
    <dialog [open]="notificationsOpen()">
      <h3>Notifications</h3>
      <ul>
        <li *ngFor="let notification of notifications()">
          <h4>{{ notification.title }}</h4>
          <span>{{ notification.message }}</span>
          <button
            *ngIf="!notification.read"
            (click)="markNotificationAsRead(notification)"
          >
            Mark as Read
          </button>
        </li>
      </ul>
      <button (click)="notificationsOpen.set(false)">Close</button>
    </dialog>
  `,
  styles: ``
})
export class HeaderComponent {
  private readonly notificationService = inject(NotificationService);
  notifications = this.notificationService.notifications;
  unreadNotifications = this.notificationService.unreadNotifications;
  notificationsOpen =  signal(false);

  markNotificationAsRead(notification: Notification){
    this.notificationService.markAsRead(notification);
  }

  constructor(){
    this.notificationService.connect();
  }


}
