package resources.mapper;


import domain.model.Endereco;
import resources.dto.request.EnderecoRequestDTO;
import resources.dto.response.EnderecoResponseDTO;

public class EnderecoMapper {
    public static Endereco toEntity(EnderecoRequestDTO enderecoRequestDTO) {
        return new Endereco(
            enderecoRequestDTO.cep(),
            enderecoRequestDTO.logradouro(),
            enderecoRequestDTO.numero(),
            enderecoRequestDTO.complemento(),
            enderecoRequestDTO.bairro(),
            enderecoRequestDTO.cidade(),
            enderecoRequestDTO.estado()
        );
    }

    public static Endereco toUpdateEntity(EnderecoRequestDTO enderecoRequestDTO, Endereco endereco) {
        endereco.atualizarEndereco(
            enderecoRequestDTO.cep(),
            enderecoRequestDTO.logradouro(),
            enderecoRequestDTO.numero(),
            enderecoRequestDTO.complemento(),
            enderecoRequestDTO.bairro(),
            enderecoRequestDTO.cidade(),
            enderecoRequestDTO.estado()
        );
        return endereco;
    }

    public static EnderecoResponseDTO toResponseDTO(Endereco endereco) {
        return new EnderecoResponseDTO(
            endereco.getId(),
            endereco.getLogradouro(),
            endereco.getNumero(),
            endereco.getComplemento(),
            endereco.getBairro(),
            endereco.getCidade(),
            endereco.getEstado(),
            endereco.getCep()
        );
    }
}
