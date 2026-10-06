package domain.repository;

import domain.model.Evento;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EventoRepository implements PanacheRepositoryBase<Evento, Long> {
}
