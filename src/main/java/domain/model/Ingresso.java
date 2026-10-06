package domain.model;

import domain.exception.ValidacaoException;
import jakarta.persistence.*;

@Entity
public class Ingresso {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    protected Ingresso() {
    }

    public Ingresso(Cliente cliente, Evento evento) {
        setCliente(cliente);
        setEvento(evento);
    }

    public Cliente getCliente() {
        return cliente;
    }

    private void setCliente(Cliente cliente) {
        if (cliente == null) {
            throw new ValidacaoException("O Cliente é obrigatório");
        }
        this.cliente = cliente;
    }

    public Evento getEvento() {
        return evento;
    }

    private void setEvento(Evento evento) {
        if (evento == null) {
            throw new ValidacaoException("O Evento é obrigatório");
        }
        this.evento = evento;
    }

    public Long getId() {
        return id;
    }
}
