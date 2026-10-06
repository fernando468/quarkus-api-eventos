package domain.repository;

import domain.model.Ingresso;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IngressoRepository implements PanacheRepositoryBase<Ingresso, Long> {
}
