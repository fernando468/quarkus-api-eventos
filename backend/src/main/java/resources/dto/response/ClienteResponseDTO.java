package resources.dto.response;

import java.time.LocalDateTime;

public record ClienteResponseDTO(
    Long id,
    String nome,
    String email,
    String telefone,
    String cpf,
    EnderecoResponseDTO endereco,
    LocalDateTime criadoEm,
    LocalDateTime atualizadoEm) {
}
