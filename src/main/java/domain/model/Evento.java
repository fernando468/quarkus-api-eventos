package domain.model;

import domain.exception.ValidacaoException;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 20)
    private String titulo;

    @Column(nullable = false, length = 200)
    private String descricao;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    @Column(nullable = false)
    private LocalDateTime data;

    protected Evento() {
    }

    public Evento(String titulo, String descricao, LocalDateTime data, Endereco endereco) {
        setTitulo(titulo);
        setDescricao(descricao);
        setData(data);
        setEndereco(endereco);
    }

    public void atualizar(String titulo, String descricao, LocalDateTime data, Endereco endereco) {
        setTitulo(titulo);
        setDescricao(descricao);
        setData(data);
        setEndereco(endereco);
    }

    public String getTitulo() {
        return titulo;
    }

    private void setTitulo(String titulo) {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new ValidacaoException("O título do evento é obrigatório");
        }
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    private void setDescricao(String descricao) {
        if (descricao == null || descricao.trim().isEmpty()) {
            throw new ValidacaoException("A descrição do evento é obrigatória");
        }
        this.descricao = descricao;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    private void setEndereco(Endereco endereco) {
        if (endereco == null) {
            throw new ValidacaoException("O endereço do evento é obrigatório");
        }
        this.endereco = endereco;
    }

    public LocalDateTime getData() {
        return data;
    }

    private void setData(LocalDateTime data) {
        if (data == null) {
            throw new ValidacaoException("A data do evento é obrigatória");
        }
        this.data = data;
    }

    public Long getId() {
        return id;
    }

}
