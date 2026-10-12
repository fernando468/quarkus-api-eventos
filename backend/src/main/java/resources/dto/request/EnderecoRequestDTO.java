package resources.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EnderecoRequestDTO(
    @NotNull
    @Size(max = 100)
    String logradouro,

    @NotNull
    @Size(max = 5)
    String numero,

    @Size(max = 100)
    String complemento,

    @NotNull
    @Size(max = 60)
    String bairro,

    @NotNull
    @Size(max = 60)
    String cidade,

    @NotNull
    @Size(max = 2)
    String estado,

    @NotNull
    @Size(max = 8)
    String cep) {
}
