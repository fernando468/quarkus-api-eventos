package domain.model.valueobject;

import domain.exception.ValidacaoException;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TelefoneTest {

    @ParameterizedTest
    @ValueSource(strings = { "44912345678", "4412345678" })
    public void deveCriarTelefoneValido(String numero) {
        Telefone telefone = new Telefone(numero);
        assertEquals(numero, telefone.getTelefone());
    }

    @ParameterizedTest
    @ValueSource(strings = { "123", "441234567891", "" })
    public void deveOcorrerErroQuandoTelefoneInvalido(String numero) {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
           new Telefone(numero);
        });

        assertEquals("O número de telefone é obrigatório", validacaoException.getMessage());
    }
}
