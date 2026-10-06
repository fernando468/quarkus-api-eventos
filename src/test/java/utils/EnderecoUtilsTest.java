package utils;

import domain.model.Endereco;
import resources.dto.request.EnderecoRequestDTO;

public class EnderecoUtilsTest {
    public static Endereco criarEnderecoValido() {
        return new Endereco(
            "12345000",
            "Rua Teste",
            "123 A",
            "Casa cinza",
            "Bairro Teste",
            "Cidade Teste",
            "PR"
        );
    }

    public static EnderecoRequestDTO criarEnderecoRequestDTO() {
        return new EnderecoRequestDTO("Rua Teste", "123 A", "Casa cinza", "Bairro Teste", "Cidade Teste", "PR", "12345000");
    }
}
