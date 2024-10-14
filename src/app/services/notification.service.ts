import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Notification } from '../infrastructure/types/notification';
import { SocketService } from './socket.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly socketService = inject(SocketService);
  //#notifications = toSignal(this.socketService.notifications$, {requireSync: true});
  //! Não vamos fazer a coneccao no serviço, porque assim cada componente que utilizaria o serviço iria abrir uma ligacao ao socket, no entanto mesmo que as componentes sejam "destruidas", as ligacoes de websocket continuariam "abertas".
  //! vamos deixar essa responsabildiade para as componentes, acrescentando o metodo "connect", linha 32

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

  //! disponibilizaar o metodo para cada componente, subscrever o websocket como Observable, usar o takeUntilDestroy, para desubscrever o observable, e atualizar as notificações que virão do websocket
  connect() {
    return this.socketService.notifications$.pipe(
        takeUntilDestroyed(),
    ).subscribe(notifications => {
        this.#notifications.set(notifications);
    });
}
//! este metodos nunca é invokado no serviço,  vamos deixar as componentes fazer o connect, no constructor on sera passado para o operador takeuntil destroy o contexto de DI


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
