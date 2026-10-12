package domain.repository;

import domain.model.Cliente;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ClienteRepository implements PanacheRepositoryBase<Cliente, Long> {
    public Cliente findByCpf(String cpf) {
        return find("cpf.cpf", cpf).firstResult();
    }
}
