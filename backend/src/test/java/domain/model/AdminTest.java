package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.Email;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static io.quarkus.elytron.security.common.BcryptUtil.matches;

class AdminTest {
    @Test
    void deveCriarAdminEArmazenarSenhaCriptografada() {
        Admin admin = new Admin("Admin principal", new Email("admin@email.com"), "12345678");

        assertEquals("Admin principal", admin.getNome());
        assertEquals("admin@email.com", admin.getEmail().getEmail());
        assertTrue(matches("12345678", admin.getSenhaEncriptada()));
    }

    @Test
    void deveImpedirCriacaoDeAdminSemNome() {
        ValidacaoException erro = assertThrows(
            ValidacaoException.class,
            () -> new Admin(" ", new Email("admin@email.com"), "12345678")
        );

        assertEquals("O nome do admin é obrigatório", erro.getMessage());
    }

    @Test
    void deveImpedirCriacaoDeAdminSemEmail() {
        ValidacaoException erro = assertThrows(
            ValidacaoException.class,
            () -> new Admin("Admin principal", null, "12345678")
        );

        assertEquals("O email do admin é obrigatório", erro.getMessage());
    }
}
