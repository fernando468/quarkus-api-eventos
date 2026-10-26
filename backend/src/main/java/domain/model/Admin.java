package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.Email;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Embedded
    private Email email;

    @Column(nullable = false)
    private String senhaEncriptada;

    protected Admin() {
    }

    public Admin(String nome, Email email, String senha) {
        setNome(nome);
        setEmail(email);
        setSenhaEncriptada(senha);
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Email getEmail() {
        return email;
    }

    public String getSenhaEncriptada() {
        return senhaEncriptada;
    }

    public void setSenhaEncriptada(String senha) {
        if (senha == null || senha.isBlank()) {
            throw new ValidacaoException("A senha é obrigatória");
        }

        if (senha.length() < 8 || senha.length() > 16) {
            throw new ValidacaoException("A senha deve ter de 8 a 16 caracteres");
        }

        this.senhaEncriptada = BcryptUtil.bcryptHash(senha);
    }

    private void setNome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new ValidacaoException("O nome do admin é obrigatório");
        }
        this.nome = nome;
    }

    private void setEmail(Email email) {
        if (email == null) {
            throw new ValidacaoException("O email do admin é obrigatório");
        }
        this.email = email;
    }
}
