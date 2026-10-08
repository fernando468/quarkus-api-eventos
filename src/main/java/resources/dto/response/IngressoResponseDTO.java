package resources.dto.response;

import domain.model.valueobject.StatusEnum;

public record IngressoResponseDTO(
    Long id,
    StatusEnum status,
    EventoResponseDTO evento,
    ClienteResponseDTO cliente) {
}
