package resources.mapper;

import domain.model.Cliente;
import resources.dto.request.ClienteRequestDTO;
import resources.dto.response.ClienteResponseDTO;

import java.util.List;

public class ClienteMapper {
    public static Cliente toEntity(ClienteRequestDTO clienteRequestDTO) {
        return new Cliente(
            clienteRequestDTO.nome(),
            EmailMapper.toEmbeddable(clienteRequestDTO.email()),
            TelefoneMapper.toEmbeddable(clienteRequestDTO.telefone()),
            CpfMapper.toEmbeddable(clienteRequestDTO.cpf()),
            EnderecoMapper.toEntity(clienteRequestDTO.endereco())
        );
    }

    public static Cliente toUpdateEntity(ClienteRequestDTO clienteRequestDTO, Cliente cliente) {
        cliente.atualizar(
            clienteRequestDTO.nome(),
            EmailMapper.toEmbeddable(clienteRequestDTO.email()),
            TelefoneMapper.toEmbeddable(clienteRequestDTO.telefone()),
            CpfMapper.toEmbeddable(clienteRequestDTO.cpf()),
            EnderecoMapper.toUpdateEntity(clienteRequestDTO.endereco(), cliente.getEndereco())
        );
        return cliente;
    }

    public static ClienteResponseDTO toResponseDTO(Cliente cliente) {
        return new ClienteResponseDTO(
            cliente.getId(),
            cliente.getNome(),
            cliente.getEmail().getEmail(),
            cliente.getTelefone().getTelefone(),
            cliente.getCpf().getCpf(),
            EnderecoMapper.toResponseDTO(cliente.getEndereco())
        );
    }

    public static List<ClienteResponseDTO> toResponseDTOList(List<Cliente> listaCliente) {
        return listaCliente.stream()
                .map(ClienteMapper::toResponseDTO)
                .toList();
    }
}
