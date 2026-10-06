package resources.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public record ClienteRequestDTO(
    @NotNull
    @Size(min = 3, max = 100)
    String nome,

    @NotNull
    @Size(min = 3, max = 100)
    String email,

    @NotNull
    @Size(min = 3, max = 15)
    String telefone,

    @NotNull
    @Size(min = 11, max = 11)
    @CPF
    String cpf,

    @NotNull
    EnderecoRequestDTO endereco) {
}
