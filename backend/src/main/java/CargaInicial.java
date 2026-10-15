import domain.model.Cliente;
import domain.model.Endereco;
import domain.model.Evento;
import domain.model.Ingresso;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import domain.repository.ClienteRepository;
import domain.repository.EventoRepository;
import domain.repository.IngressoRepository;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@ApplicationScoped
public class CargaInicial {
    @Inject
    ClienteRepository clienteRepository;

    @Inject
    EventoRepository eventoRepository;

    @Inject
    IngressoRepository ingressoRepository;

    @Transactional
    void iniciar(@Observes StartupEvent event) {
        criarListaCliente();
        criarListaEvento();
        criarListaIngresso();
    }

    void criarListaCliente() {
        Cliente cliente1 = new Cliente(
                "José da Silva",
                new Email("jose@email.com"),
                new Telefone("44900001111"),
                new Cpf("99426954007"),
                new Endereco("87050000", "Avenida Brasil", "100", "Apartamento", "Centro", "Maringá", "PR")
        );

        Cliente cliente2 = new Cliente(
                "Maria Gonçalves",
                new Email("maria@email.com"),
                new Telefone("44900002222"),
                new Cpf("52998224725"),
                new Endereco("87013000", "Rua Santos Dumont", "250", "Casa Frente", "Zona 01", "Maringá", "PR")
        );

        Cliente cliente3 = new Cliente(
                "Pedro Costa Santos da Silva",
                new Email("pedro@email.com"),
                new Telefone("4411112222"),
                new Cpf("11144477735"),
                new Endereco("87020025", "Avenida Colombo", "1444", "Apartamento 302", "Zona 07", "Maringá", "PR")
        );

        Cliente cliente4 = new Cliente(
                "Ana Pereira Silva",
                new Email("ana@email.com"),
                new Telefone("4400004444"),
                new Cpf("12345678909"),
                new Endereco("87030120", "Rua Neo Alves Martins", "1500 A", "Casa", "Zona 01", "Maringá", "PR")
        );

        Cliente cliente5 = new Cliente(
                "Lucas de Castro",
                new Email("lucas@email.com"),
                new Telefone("4466665555"),
                new Cpf("98765432100"),
                new Endereco("87040000", "Avenida Mandacaru", "800", "Fundos", "Jardim Paris", "Maringá", "PR")
        );

        List<Cliente> listaClientes = List.of(
                cliente1,
                cliente2,
                cliente3,
                cliente4,
                cliente5
        );

        clienteRepository.persist(listaClientes);
    }

    void criarListaEvento() {
        Evento evento1 = new Evento(
                "Show Sertanejo",
                "Casa de Shows Central",
                LocalDateTime.now().plusDays(5).withHour(18).withMinute(45).withSecond(0),
                new Endereco("87050000", "Avenida Brasil", "915 A", "Frente", "Zona 07", "Maringá", "PR")
        );

        Evento evento2 = new Evento(
                "Show de Rock",
                "Casa do Rock",
                LocalDateTime.now().plusMonths(1).withHour(20).withMinute(0).withSecond(0),
                new Endereco("87050000", "Avenida Brasil", "1100", "Frente", "Zona 05", "Maringá", "PR")
        );

        Evento evento3 = new Evento(
                "Semana músical",
                "Parque Central",
                LocalDateTime.now().plusDays(15).withHour(23).withMinute(30).withSecond(0),
                new Endereco("87050000", "Avenida Brasil", "100 CA", "Esquina", "Zona 01", "Maringá", "PR")
        );

        Evento evento4 = new Evento(
                "Semana da Cultura",
                "Centro de Eventos",
                LocalDateTime.now().plusMonths(3).withHour(21).withMinute(30).withSecond(0),
                new Endereco("87050000", "Avenida Brasil", "8500 CA", "Frente", "Zona 01", "Maringá", "PR")
        );

        Evento evento5 = new Evento(
                "Roda Musical",
                "Praça Principal",
                LocalDateTime.now().minusMonths(1).withHour(19).withMinute(0).withSecond(0),
                new Endereco("87050000", "Avenida Brasil", "8500 CA", "Frente", "Zona 01", "Maringá", "PR")
        );


        List<Evento> listaEvento = List.of(
                evento1,
                evento2,
                evento3,
                evento4,
                evento5
        );

        eventoRepository.persist(listaEvento);
    }

    void criarListaIngresso() {
        Cliente cliente1 = clienteRepository.findById(1L);
        Cliente cliente2 = clienteRepository.findById(2L);
        Cliente cliente3 = clienteRepository.findById(3L);
        Cliente cliente4 = clienteRepository.findById(4L);
        Evento evento1 = eventoRepository.findById(1L);
        Evento evento2 = eventoRepository.findById(2L);
        Evento evento3 = eventoRepository.findById(3L);
        Evento evento4 = eventoRepository.findById(4L);
        Evento evento5 = eventoRepository.findById(5L);

        Ingresso ingresso1 = new Ingresso(cliente1, evento1);
        ingresso1.confirmarPagamento();

        Ingresso ingresso2 = new Ingresso(cliente2, evento1);
        Ingresso ingresso3 = new Ingresso(cliente3, evento2);

        Ingresso ingresso4 = new Ingresso(cliente4, evento3);
        ingresso4.cancelar();

        Ingresso ingresso5 = new Ingresso(cliente4, evento4);
        ingresso5.confirmarPagamento();

        Ingresso ingresso6 = new Ingresso(cliente1, evento5);
        ingresso6.confirmarPagamento();
        ingresso6.finalizar();

        List<Ingresso> listaIngresso = List.of(ingresso1, ingresso2, ingresso3, ingresso4, ingresso5, ingresso6);
        ingressoRepository.persist(listaIngresso);
    }

}
