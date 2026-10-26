package domain.repository;

import domain.model.Admin;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AdminRepository implements PanacheRepositoryBase<Admin, Long> {
    public Admin findByEmail(String email) {
        return find("email.email", email).firstResult();
    }
}
