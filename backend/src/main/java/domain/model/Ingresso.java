package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.StatusIngresso;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingresso {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusIngresso status;

    protected Ingresso() {
    }

    public Ingresso(Cliente cliente, Evento evento) {
        setCliente(cliente);
        setEvento(evento);
        this.status = StatusIngresso.AGUARDANDO_PAGAMENTO;
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

    public void cancelar() {
        List<StatusIngresso> listaStatusParaBloquearAlteracao = List.of(StatusIngresso.FINALIZADO, StatusIngresso.CANCELADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível cancelar ingresso finalizado ou cancelado");
        }
        this.status = StatusIngresso.CANCELADO;
    }

    public void finalizar() {
        List<StatusIngresso> listaStatusParaBloquearAlteracao = List.of(StatusIngresso.AGUARDANDO_PAGAMENTO, StatusIngresso.CANCELADO, StatusIngresso.FINALIZADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível finalizar ingresso aguardando pagamento, finalizado ou cancelado");

        }
        this.status = StatusIngresso.FINALIZADO;
    }

    public void confirmarPagamento() {
        List<StatusIngresso> listaStatusParaBloquearAlteracao = List.of(StatusIngresso.PAGAMENTO_CONFIRMADO, StatusIngresso.CANCELADO, StatusIngresso.FINALIZADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível confirmar pagamento do ingresso aguardando pagamento, finalizado ou cancelado");

        }
        this.status = StatusIngresso.PAGAMENTO_CONFIRMADO;
    }

    public StatusIngresso getStatus() {
        return status;
    }
}
