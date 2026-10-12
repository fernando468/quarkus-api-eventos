package resources.dto.response;

public record ClienteResponseDTO(
    Long id,
    String nome,
    String email,
    String telefone,
    String cpf,
    EnderecoResponseDTO endereco) {
}
