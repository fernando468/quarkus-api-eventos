package domain.model.valueobject;

import domain.exception.ValidacaoException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Cpf {
    @Column(name = "cpf", nullable = false, length = 11, unique = true)
    private String cpf;

    protected Cpf() {}

    public Cpf(String cpf) {
        setCpf(cpf);
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        if (cpf == null || cpf.isBlank()) {
            throw new ValidacaoException("O CPF é obrigatório");
        }
        String limpo = cpf.replaceAll("\\D", "");
        if (limpo.length() != 11) {
            throw new ValidacaoException("O CPF é inválido");
        }
        this.cpf = cpf;
    }
}
