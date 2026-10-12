package resources.mapper;

import domain.model.valueobject.Telefone;

public class TelefoneMapper {
    public static Telefone toEmbeddable(String telefone) {
        return new Telefone(telefone);
    }
}
