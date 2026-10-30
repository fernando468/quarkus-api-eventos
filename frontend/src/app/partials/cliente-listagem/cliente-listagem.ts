import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClienteService } from '../../services/cliente-service';
import { NotificationService } from '../../services/notification-service';
import { ClienteResponse } from '../../types/cliente.type';
import { ErroResponse } from '../../types/erro.type';
import { formatCpf } from '../../utils/cpf.util';
import { formatEndereco } from '../../utils/endereco.util';
import { formatTelefone } from '../../utils/telefone.util';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule],
  selector: 'app-cliente-listagem',
  styleUrl: './cliente-listagem.css',
  templateUrl: './cliente-listagem.html',
})
export class ClienteListagem {
  readonly displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'endereco'];
  readonly dataSource = new MatTableDataSource<ClienteResponse>([]);
  readonly formatCpf = formatCpf;
  readonly formatTelefone = formatTelefone;
  readonly formatEndereco = formatEndereco;

  constructor(
    private clienteService: ClienteService,
    private notification: NotificationService,
  ) {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.buscarTodos().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
      },
      error: (erro: ErroResponse) => {
        this.notification.error(erro.error?.mensagem);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
