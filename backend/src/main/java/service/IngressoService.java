package service;

import domain.exception.EntidadeJaExisteException;
import domain.model.Cliente;
import domain.model.Evento;
import domain.model.Ingresso;
import domain.repository.IngressoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.NonNull;
import resources.dto.request.IngressoRequestDTO;
import resources.dto.response.IngressoResponseDTO;
import resources.mapper.IngressoMapper;

import java.util.List;

@ApplicationScoped
public class IngressoService {
    private final IngressoRepository ingressoRepository;

    private final ClienteService clienteService;
    private final EventoService eventoService;

    public IngressoService(IngressoRepository ingressoRepository,
                           ClienteService clienteService,
                           EventoService eventoService) {
        this.ingressoRepository = ingressoRepository;
        this.clienteService = clienteService;
        this.eventoService = eventoService;
    }

    @Transactional
    public IngressoResponseDTO criar(IngressoRequestDTO ingressoRequestDTO) {
        Cliente cliente = clienteService.obterPorId(ingressoRequestDTO.clienteId());
        Evento evento = eventoService.obterPorId(ingressoRequestDTO.eventoId());

        Ingresso ingresso = IngressoMapper.toEntity(cliente, evento);

        ingressoRepository.persist(ingresso);

        return IngressoMapper.toResponseDTO(ingresso);
    }

    @Transactional
    public IngressoResponseDTO cancelar(Long id) {
        Ingresso ingresso = findById(id);
        ingresso.cancelar();

        ingressoRepository.persist(ingresso);

        return IngressoMapper.toResponseDTO(ingresso);
    }

    @Transactional
    public IngressoResponseDTO finalizar(Long id) {
        Ingresso ingresso = findById(id);
        ingresso.finalizar();

        ingressoRepository.persist(ingresso);

        return IngressoMapper.toResponseDTO(ingresso);
    }

    @Transactional
    public IngressoResponseDTO confirmarPagamento(Long id) {
        Ingresso ingresso = findById(id);
        ingresso.confirmarPagamento();

        ingressoRepository.persist(ingresso);

        return IngressoMapper.toResponseDTO(ingresso);
    }

    private Ingresso findById(Long id) {
        Ingresso ingresso = ingressoRepository.findById(id);

        if (ingresso == null) {
            throw new EntidadeJaExisteException("Ingresso não encontrado com o id: " + id);
        }

        return ingresso;
    }

    public IngressoResponseDTO obterPorId(Long id) {
        Ingresso ingresso = findById(id);
        return IngressoMapper.toResponseDTO(ingresso);
    }

    public List<IngressoResponseDTO> listarTodos() {
        List<Ingresso> listaIngresso = ingressoRepository.listAll();
        return IngressoMapper.toResponseDTOList(listaIngresso);
    }
}
