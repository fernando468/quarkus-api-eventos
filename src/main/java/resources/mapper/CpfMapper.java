package resources.mapper;

import domain.model.valueobject.Cpf;

public class CpfMapper {
    public static Cpf toEmbeddable(String cpf) {
        return new Cpf(cpf);
    }
}
