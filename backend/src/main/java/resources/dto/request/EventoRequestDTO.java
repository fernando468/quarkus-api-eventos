package resources.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record EventoRequestDTO(
    @NotNull
    @Size(min = 5, max = 20)
    String titulo,

    @NotNull
    @Size(min = 3, max = 200)
    String descricao,

    @NotNull
    LocalDateTime data,

    @NotNull
    @Valid
    EnderecoRequestDTO endereco) {
}
