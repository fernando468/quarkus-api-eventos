import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClienteService } from '../../../services/cliente-service';
import { ClienteResponse } from '../../../types/cliente.type';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  selector: 'app-cliente-listagem',
  styleUrl: './cliente-listagem.css',
  templateUrl: './cliente-listagem.html',
})
export class ClienteListagem {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone'];
  dataSource = new MatTableDataSource<ClienteResponse>([]);
  errorMessage = '';

  constructor(private clienteService: ClienteService) {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.errorMessage = '';
    this.clienteService.buscarTodos().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os clientes. Tente novamente.';
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
