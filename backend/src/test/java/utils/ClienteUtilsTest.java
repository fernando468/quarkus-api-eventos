package utils;

import domain.model.Cliente;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import resources.dto.request.ClienteRequestDTO;

public class ClienteUtilsTest {
    public static Cliente criarClienteToEntity() {
        return new Cliente(
            "José da Silva",
            new Email("jose@email.com"),
            new Telefone("4412345678"),
            new Cpf("12345678910"),
            EnderecoUtilsTest.criarEnderecoValido()
        );
    }

    public static ClienteRequestDTO criarClienteRequestDTO() {
        return new ClienteRequestDTO(
            "José da Silva",
            "jose@email.com",
            "4412345678",
            "12345678910",
            EnderecoUtilsTest.criarEnderecoRequestDTO()
        );
    }

}
