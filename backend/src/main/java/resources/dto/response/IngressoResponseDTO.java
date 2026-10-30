package resources.dto.response;

import java.time.LocalDateTime;

public record IngressoResponseDTO(
    Long id,
    EnumResponseDTO status,
    EventoResponseDTO evento,
    ClienteResponseDTO cliente,
    LocalDateTime criadoEm,
    LocalDateTime atualizadoEm) {
}
