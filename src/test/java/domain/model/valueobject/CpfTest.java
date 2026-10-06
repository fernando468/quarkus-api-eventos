package domain.model.valueobject;

import domain.exception.ValidacaoException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class CpfTest {
    @Test
    public void deveCriarObjetoCpfValido() {
        Cpf cpf = new Cpf("12345678910");

        assertEquals("12345678910", cpf.getCpf());
    }

    @ParameterizedTest
    @ValueSource(strings = { "1234567891", "123456789101" })
    public void deveRetornarErroQuandoCpfInvalido(String cpf) {

        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cpf(cpf);
        });

        assertEquals("O CPF é inválido", validacaoException.getMessage());
    }


    @Test
    public void deveRetornarErroQuandoCpfInvalido() {

        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Cpf(null);
        });

        assertEquals("O CPF é obrigatório", validacaoException.getMessage());
    }
}
