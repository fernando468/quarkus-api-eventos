import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomButton } from '../../components/custom-button/custom-button';
import { ClienteService } from '../../services/cliente-service';
import { ClienteResponse } from '../../types/cliente.type';
import { formatCpf, formatEndereco, formatTelefone } from '../../utils/format.util';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CustomButton, MatIconModule],
  selector: 'app-cliente-listagem',
  styleUrl: './cliente-listagem.css',
  templateUrl: './cliente-listagem.html',
})
export class ClienteListagem {
  openDialog = input.required<(cliente?: ClienteResponse) => void>();

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'telefone', 'endereco', 'acoes'];
  dataSource = new MatTableDataSource<ClienteResponse>([]);
  errorMessage = '';
  formatCpf = formatCpf;
  formatTelefone = formatTelefone;
  formatEndereco = formatEndereco;

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
