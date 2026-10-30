import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification-service';

describe('NotificationService', () => {
  const snackBar = {
    open: vi.fn(),
  };
  let service: NotificationService;

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('uses the standard duration and success style', () => {
    service.success('Salvo com sucesso.');

    expect(snackBar.open).toHaveBeenCalledWith('Salvo com sucesso.', 'Fechar', {
      duration: 4000,
      panelClass: ['api-snackbar--success'],
    });
  });

  it('uses a default error message when no message is provided', () => {
    service.error();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Ocorreu um erro. Tente novamente.',
      'Fechar',
      {
        duration: 4000,
        panelClass: ['api-snackbar--error'],
      },
    );
  });

  it('uses a default success message when the message is empty', () => {
    service.success('  ');

    expect(snackBar.open).toHaveBeenCalledWith(
      'Operação realizada com sucesso.',
      'Fechar',
      {
        duration: 4000,
        panelClass: ['api-snackbar--success'],
      },
    );
  });
});
