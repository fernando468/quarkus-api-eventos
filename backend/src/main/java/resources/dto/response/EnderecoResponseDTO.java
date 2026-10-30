package resources.dto.response;

import java.time.LocalDateTime;

public record EnderecoResponseDTO(
    Long id,
    String logradouro,
    String numero,
    String complemento,
    String bairro,
    String cidade,
    String estado,
    String cep,
    LocalDateTime criadoEm,
    LocalDateTime atualizadoEm) {
}
