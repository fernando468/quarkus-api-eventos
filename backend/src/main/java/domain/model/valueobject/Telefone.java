package domain.model.valueobject;

import domain.exception.ValidacaoException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Telefone {
    @Column(name = "telefone", nullable = false, length = 15)
    private String telefone;

    protected Telefone() {
    }

    public Telefone(String telefone) {
        setTelefone(telefone);
    }

    public String getTelefone() {
        return telefone;
    }

    private void setTelefone(String telefone) {
        if (telefone == null) {
            throw new ValidacaoException("O número de telefone é obrigatório");
        }

        if (telefone.length() < 10 || telefone.length() > 11) {
            throw new ValidacaoException("O número de telefone deve ter 10 ou 11 caracteres");
        }

        this.telefone = telefone;
    }

}
