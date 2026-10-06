package service;

import domain.model.Cliente;
import domain.model.Evento;
import domain.model.Ingresso;
import domain.repository.IngressoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import resources.dto.request.IngressoRequestDTO;
import resources.mapper.IngressoMapper;

@ApplicationScoped
public class IngressoService {
    @Inject
    IngressoRepository ingressoRepository;

    @Inject
    ClienteService clienteService;

    @Inject
    EventoService eventoService;

    @Transactional
    public Ingresso criar(IngressoRequestDTO ingressoRequestDTO) {
        Cliente cliente = clienteService.obterPorId(ingressoRequestDTO.clienteId());
        Evento evento = eventoService.obterPorId(ingressoRequestDTO.eventoId());

        Ingresso ingresso = IngressoMapper.toEntity(cliente, evento);

        ingressoRepository.persist(ingresso);

        return ingresso;
    }
}
