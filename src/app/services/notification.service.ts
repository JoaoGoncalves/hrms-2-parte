import { computed, effect, Injectable, signal } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #notifications = signal<Notification[]>(
    localStorage.getItem('notifications')
      ? JSON.parse(localStorage.getItem('notifications') ?? '')
      : []
  );
  notifications = this.#notifications.asReadonly();
    readNotifications = computed(() => this.#notifications().filter(n => n.read));
    unreadNotifications = computed(() => this.#notifications().filter(n => !n.read));

  constructor() {
    effect(() => {
      localStorage.setItem('notifications', JSON.stringify(this.#notifications()));
  })
  }

  addNotification(notification: Notification) {
    this.#notifications.update(value => [...value, notification]);
}

markAsRead(notification: Notification) {
    this.#notifications.update(value => value.map(n => n.id === notification.id ? {...n, read: true} : n));
}

markAllAsRead() {
    this.#notifications.update(value => value.map(n => ({...n, read: true})));
}
}
