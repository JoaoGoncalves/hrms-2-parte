import { Component, inject, Inject, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../infrastructure/types/notification';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
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
        <!-- @for() onde é facil definir o trackBy -->
        @for (notification of notifications(); track notification.id) {
          <li>
            <h1>{{ notification.title }} {{$index + 1}} / {{$count}}</h1>
            <span>{{ notification.message }}</span>
            @if (!notification.read) {
              <button (click)="markNotificationAsRead(notification)">
                Mark as Read
              </button>
            } @else {
              <span title="notification is read!"> ✔︎ </span>
            }
          </li>
        } @empty {
          <p>No Notifications to Display</p>
        }
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
