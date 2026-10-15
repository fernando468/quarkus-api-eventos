package resources.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EnderecoRequestDTO(
    @NotNull
    @Size(min = 5, max = 100)
    String logradouro,

    @NotNull
    @Size(min = 1, max = 10)
    String numero,

    @Size(min = 2, max = 100)
    String complemento,

    @NotNull
    @Size(min = 2, max = 60)
    String bairro,

    @NotNull
    @Size(min = 3, max = 60)
    String cidade,

    @NotNull
    @Size(min = 2, max = 2)
    String estado,

    @NotNull
    @Size(min = 8, max = 8)
    String cep) {
}
