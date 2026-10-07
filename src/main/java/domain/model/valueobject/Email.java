package domain.model.valueobject;

import domain.exception.ValidacaoException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Email {
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    protected Email() {
    }

    public Email(String email) {
        setEmail(email);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new ValidacaoException("O email é obrigatório");
        }
        if (!email.contains("@") || !email.contains(".")) {
            throw new ValidacaoException("O email é inválido");
        }
        this.email = email;
    }
}
