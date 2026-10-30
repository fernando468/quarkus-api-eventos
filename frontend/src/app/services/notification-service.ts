import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type NotificationType = 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly duration = 4000;

  private readonly defaultMessages: Record<NotificationType, string> = {
    success: 'Operação realizada com sucesso.',
    error: 'Ocorreu um erro. Tente novamente.',
  };

  success(message?: NullOrUndefined<string>): void {
    this.show(message, 'success');
  }

  error(message?: NullOrUndefined<string>): void {
    this.show(message, 'error');
  }

  private show(message: NullOrUndefined<string>, type: NotificationType): void {
    this.snackBar.open(message?.trim() || this.defaultMessages[type], 'Fechar', {
      duration: this.duration,
      panelClass: [`api-snackbar--${type}`],
    });
  }
}
