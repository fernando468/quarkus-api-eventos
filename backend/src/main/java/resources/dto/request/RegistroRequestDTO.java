package resources.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public record RegistroRequestDTO(
    @NotBlank
    @Size(min = 3, max = 100)
    String nome,

    @NotBlank
    @Email
    @Size(max = 100)
    String email,

    @NotBlank
    @Size(min = 10, max = 11)
    String telefone,

    @NotBlank
    @Size(min = 11, max = 11)
    @CPF
    String cpf,

    @NotNull
    @Valid
    EnderecoRequestDTO endereco,

    @NotBlank
    @Size(min = 8, max = 72)
    String senha) {
}
