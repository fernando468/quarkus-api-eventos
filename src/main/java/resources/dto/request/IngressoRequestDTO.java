package resources.dto.request;

import jakarta.validation.constraints.NotNull;

public record IngressoRequestDTO(
    @NotNull Long clienteId,
    @NotNull Long eventoId) {
}
