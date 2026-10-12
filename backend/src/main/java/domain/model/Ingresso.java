package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.StatusEnum;
import jakarta.persistence.*;

import java.util.List;

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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    protected Ingresso() {
    }

    public Ingresso(Cliente cliente, Evento evento) {
        setCliente(cliente);
        setEvento(evento);
        this.status = StatusEnum.AGUARDANDO_PAGAMENTO;
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
        List<StatusEnum> listaStatusParaBloquearAlteracao = List.of(StatusEnum.FINALIZADO, StatusEnum.CANCELADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível cancelar ingresso finalizado ou cancelado");
        }
        this.status = StatusEnum.CANCELADO;
    }

    public void finalizar() {
        List<StatusEnum> listaStatusParaBloquearAlteracao = List.of(StatusEnum.AGUARDANDO_PAGAMENTO, StatusEnum.CANCELADO, StatusEnum.FINALIZADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível finalizar ingresso aguardando pagamento, finalizado ou cancelado");

        }
        this.status = StatusEnum.FINALIZADO;
    }

    public void confirmarPagamento() {
        List<StatusEnum> listaStatusParaBloquearAlteracao = List.of(StatusEnum.PAGAMENTO_CONFIRMADO, StatusEnum.CANCELADO, StatusEnum.FINALIZADO);
        if (listaStatusParaBloquearAlteracao.contains(this.status)) {
            throw new ValidacaoException("Não é possível confirmar pagamento do ingresso aguardando pagamento, finalizado ou cancelado");

        }
        this.status = StatusEnum.PAGAMENTO_CONFIRMADO;
    }

    public StatusEnum getStatus() {
        return status;
    }
}
