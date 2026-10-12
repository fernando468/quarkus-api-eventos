package domain.model;

import domain.exception.ValidacaoException;
import org.junit.jupiter.api.Test;
import utils.EnderecoUtilsTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EnderecoTest {
    @Test
    public void deveCriarEnderecoComSucesso() {
        Endereco endereco = EnderecoUtilsTest.criarEnderecoValido();

        assertEquals("12345000", endereco.getCep());
        assertEquals("Rua Teste", endereco.getLogradouro());
        assertEquals("123 A", endereco.getNumero());
        assertEquals("Casa cinza", endereco.getComplemento());
        assertEquals("Bairro Teste", endereco.getBairro());
        assertEquals("Cidade Teste", endereco.getCidade());
        assertEquals("PR", endereco.getEstado());
    }

    @Test
    public void deveOcorrerErroQuandoLogradouroNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                "12345000",
                null,
                "123 A",
                "Casa cinza",
                "Bairro Teste",
                "Cidade Teste",
                "PR"
            );
        });

        assertEquals("O logradouro é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoNumeroNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                "12345000",
                "Rua Teste",
                null,
                "Casa cinza",
                "Bairro Teste",
                "Cidade Teste",
                "PR"
            );
        });

        assertEquals("O número é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoBairroNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                "12345000",
                "Rua Teste",
                "123 A",
                "Casa cinza",
                null,
                "Cidade Teste",
                "PR"
            );
        });

        assertEquals("O bairro é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoCidadeNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                "12345000",
                "Rua Teste",
                "123 A",
                "Casa cinza",
                "Bairro Teste",
                null,
                "PR"
            );
        });

        assertEquals("A cidade é obrigatória", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoEstadoNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                "12345000",
                "Rua Teste",
                "123 A",
                "Casa cinza",
                "Bairro Teste",
                "Cidade Teste",
                null
            );
        });

        assertEquals("O estado é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoCepNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Endereco(
                null,
                "Rua Teste",
                "123 A",
                "Casa cinza",
                "Bairro Teste",
                "Cidade Teste",
                "PR"
            );
        });

        assertEquals("O CEP é obrigatório", validacaoException.getMessage());
    }

}
