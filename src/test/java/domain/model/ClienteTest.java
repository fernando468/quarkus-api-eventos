package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import org.junit.jupiter.api.Test;
import utils.ClienteUtilsTest;
import utils.EnderecoUtilsTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ClienteTest {

    @Test
    public void deveCriarObjetoClienteComSucesso() {
        Cliente cliente = ClienteUtilsTest.criarClienteToEntity();

        assertEquals("José da Silva", cliente.getNome());
        assertEquals("jose@email.com", cliente.getEmail().getEmail());
        assertEquals("4412345678", cliente.getTelefone().getTelefone());
        assertEquals("12345678910", cliente.getCpf().getCpf());
        assertEquals("12345000", cliente.getEndereco().getCep());
        assertEquals("Rua Teste", cliente.getEndereco().getLogradouro());
        assertEquals("123 A", cliente.getEndereco().getNumero());
        assertEquals("Casa cinza", cliente.getEndereco().getComplemento());
        assertEquals("Bairro Teste", cliente.getEndereco().getBairro());
        assertEquals("Cidade Teste", cliente.getEndereco().getCidade());
        assertEquals("PR", cliente.getEndereco().getEstado());
    }

    @Test
    public void deveOcorrerErroAoCriarClienteSemCpf() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cliente(
                "José da Silva",
                new Email("jose@email.com"),
                new Telefone("4412345678"),
                null,
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("O CPF do cliente é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroAoCriarClienteSemTelefone() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cliente(
                "José da Silva",
                new Email("jose@email.com"),
                null,
                new Cpf("12345678910"),
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("O telefone do cliente é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroAoCriarClienteSemEmail() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cliente(
                "José da Silva",
                null,
                new Telefone("4412345678"),
                new Cpf("12345678910"),
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("O email do cliente é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroAoCriarClienteSemEndereco() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cliente(
                "José da Silva",
                new Email("jose@email.com"),
                new Telefone("4412345678"),
                new Cpf("12345678910"),
                null
            );
        });

        assertEquals("O endereço do cliente é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroAoCriarClienteSemNome() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cliente(
                null,
                new Email("jose@email.com"),
                new Telefone("4412345678"),
                new Cpf("12345678910"),
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("O nome do cliente é obrigatório", validacaoException.getMessage());
    }

}
