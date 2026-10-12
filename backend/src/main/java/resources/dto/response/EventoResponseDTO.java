package resources.dto.response;

import java.time.LocalDateTime;

public record EventoResponseDTO(
    Long id,
    String titulo,
    String descricao,
    LocalDateTime data,
    EnderecoResponseDTO endereco) {
}
