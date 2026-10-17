package resources.dto.response;

public record IngressoResponseDTO(
    Long id,
    EnumResponseDTO status,
    EventoResponseDTO evento,
    ClienteResponseDTO cliente) {
}
