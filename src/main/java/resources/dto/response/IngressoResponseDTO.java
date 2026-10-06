package resources.dto.response;

public record IngressoResponseDTO(
    Long id,
    EventoResponseDTO evento,
    ClienteResponseDTO cliente) {
}
