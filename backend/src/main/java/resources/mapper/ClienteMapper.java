package resources.mapper;

import domain.model.Cliente;
import resources.dto.request.RegistroRequestDTO;
import resources.dto.response.ClienteResponseDTO;

import java.util.List;

public class ClienteMapper {
    public static Cliente toEntity(RegistroRequestDTO registroRequestDTO) {
        return new Cliente(
                registroRequestDTO.nome(),
                EmailMapper.toEmbeddable(registroRequestDTO.email()),
                TelefoneMapper.toEmbeddable(registroRequestDTO.telefone()),
                CpfMapper.toEmbeddable(registroRequestDTO.cpf()),
                EnderecoMapper.toEntity(registroRequestDTO.endereco()),
                registroRequestDTO.senha()
        );
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
