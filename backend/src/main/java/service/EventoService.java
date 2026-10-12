package service;

import domain.exception.EntidadeNaoEncontradaException;
import domain.model.Evento;
import domain.repository.EventoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import resources.dto.request.EventoRequestDTO;
import resources.mapper.EventoMapper;

import java.util.List;

@ApplicationScoped
public class EventoService {
    @Inject
    EventoRepository eventoRepository;

    @Transactional
    public Evento criar(EventoRequestDTO clienteRequestDTO) {
        Evento cliente = EventoMapper.toEntity(clienteRequestDTO);

        eventoRepository.persist(cliente);

        return cliente;
    }

    public Evento obterPorId(Long id) {
        Evento cliente = eventoRepository.findById(id);

        if (cliente == null) {
            throw new EntidadeNaoEncontradaException("Evento não encontrado id: " + id);
        }

        return cliente;
    }

    public List<Evento> listarTodos() {
        return eventoRepository.listAll();
    }

    @Transactional
    public Evento atualizar(Long id, EventoRequestDTO clienteRequestDTO) {
        Evento clienteExistente = obterPorId(id);
        Evento cliente = EventoMapper.toUpdateEntity(clienteRequestDTO, clienteExistente);

        eventoRepository.persist(cliente);

        return cliente;
    }
}
