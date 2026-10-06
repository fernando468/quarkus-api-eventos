package resources.dto.response;

import java.time.LocalDateTime;

public record ErrorResponseDTO(
    int status,
    String mensagem,
    LocalDateTime data) {
}
