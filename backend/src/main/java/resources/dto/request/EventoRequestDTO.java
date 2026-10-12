package resources.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record EventoRequestDTO(
    @NotNull
    @Size(max = 20)
    String titulo,

    @NotNull
    @Size(max = 200)
    String descricao,

    @NotNull
    LocalDateTime data,

    @NotNull
    EnderecoRequestDTO endereco) {
}
