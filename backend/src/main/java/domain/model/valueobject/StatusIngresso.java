package domain.model.valueobject;

import domain.shared.IEnum;

public enum StatusIngresso implements IEnum {
    AGUARDANDO_PAGAMENTO("Aguardando Pagamento"),
    CANCELADO("Cancelado"),
    PAGAMENTO_CONFIRMADO("Pagamento Confirmado"),
    FINALIZADO("Finalizado");

    private final String descricao;

    StatusIngresso(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public Enum<?> getEnum() {
        return this;
    }

    @Override
    public String getDescricao() {
        return descricao;
    }
}
