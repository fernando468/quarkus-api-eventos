package resources.dto.response;

import domain.model.valueobject.StatusIngressoEnum;

public record IngressoResponseDTO(
    Long id,
    EnumResponseDTO status,
    EventoResponseDTO evento,
    ClienteResponseDTO cliente) {
}
