package domain.model.valueobject;

import domain.exception.ValidacaoException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EmailTest {

    @ParameterizedTest
    @ValueSource(strings = { "email@email.com", "email@email.com.br" })
    public void deveCriarEmailValido(String email) {
        Email telefone = new Email(email);
        assertEquals(email, telefone.getEmail());
    }

    @ParameterizedTest
    @ValueSource(strings = { "email@email", "email", "email.com" })
    public void deveOcorrerErroQuandoEmailInvalido(String email) {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
           new Email(email);
        });

        assertEquals("O email é inválido", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoEmailNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Email(null);
        });

        assertEquals("O email é obrigatório", validacaoException.getMessage());
    }
}
