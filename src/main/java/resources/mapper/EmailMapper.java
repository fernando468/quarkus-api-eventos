package resources.mapper;

import domain.model.valueobject.Email;

public class EmailMapper {
    public static Email toEmbeddable(String email) {
        return new Email(email);
    }
}
