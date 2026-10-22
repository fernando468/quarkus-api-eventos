package utils;

import domain.model.Cliente;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import resources.dto.request.RegistroRequestDTO;

public class ClienteUtilsTest {
    public static Cliente criarClienteToEntity() {
        Cliente cliente = new Cliente(
                "José da Silva",
                new Email("jose@email.com"),
                new Telefone("4412345678"),
                new Cpf("12345678910"),
                EnderecoUtilsTest.criarEnderecoValido(),
                "12345678"
        );
        ReflectionUtilsTest.setField(1L, cliente, "id");
        return cliente;
    }

    public static RegistroRequestDTO criarClienteRequestDTO() {
        return new RegistroRequestDTO(
            "José da Silva",
            "jose@email.com",
            "4412345678",
            "12345678910",
            EnderecoUtilsTest.criarEnderecoRequestDTO(),
                "12345678"
        );
    }

}
