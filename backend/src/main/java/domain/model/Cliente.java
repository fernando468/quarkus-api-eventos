package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import jakarta.persistence.*;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private Email email;

    @Embedded
    private Telefone telefone;

    @Embedded
    private Cpf cpf;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    protected Cliente() {
    }

    public Cliente(String nome, Email email, Telefone telefone, Cpf cpf, Endereco endereco) {
        setNome(nome);
        setEmail(email);
        setTelefone(telefone);
        setCpf(cpf);
        setEndereco(endereco);
    }

    public void atualizar(String nome, Email email, Telefone telefone, Cpf cpf, Endereco endereco) {
        setNome(nome);
        setEmail(email);
        setTelefone(telefone);
        setCpf(cpf);
        setEndereco(endereco);
    }

    public String getNome() {
        return nome;
    }

    private void setNome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new ValidacaoException("O nome do cliente é obrigatório");
        }
        this.nome = nome;
    }

    public Email getEmail() {
        return email;
    }

    private void setEmail(Email email) {
        if (email == null) {
            throw new ValidacaoException("O email do cliente é obrigatório");
        }
        this.email = email;
    }

    public Telefone getTelefone() {
        return telefone;
    }

    private void setTelefone(Telefone telefone) {
        if (telefone == null) {
            throw new ValidacaoException("O telefone do cliente é obrigatório");
        }
        this.telefone = telefone;
    }

    public Cpf getCpf() {
        return cpf;
    }

    private void setCpf(Cpf cpf) {
        if (cpf == null) {
            throw new ValidacaoException("O CPF do cliente é obrigatório");
        }
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    private void setEndereco(Endereco endereco) {
        if (endereco == null) {
            throw new ValidacaoException("O endereço do cliente é obrigatório");
        }
        this.endereco = endereco;
    }

    public Long getId() {
        return id;
    }
}
