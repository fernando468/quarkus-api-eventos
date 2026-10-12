package service;

import domain.exception.EntidadeJaExisteException;
import domain.exception.EntidadeNaoEncontradaException;
import domain.model.Cliente;
import domain.repository.ClienteRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import resources.dto.request.ClienteRequestDTO;
import resources.mapper.ClienteMapper;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class ClienteService {
    @Inject
    ClienteRepository clienteRepository;

    @Transactional
    public Cliente criar(ClienteRequestDTO clienteRequestDTO) {
        Cliente clienteExiste = clienteRepository.findByCpf(clienteRequestDTO.cpf());

        if (clienteExiste != null) {
            throw new EntidadeJaExisteException("Cliente já existe com o CPF: " + clienteRequestDTO.cpf());
        }

        Cliente cliente = ClienteMapper.toEntity(clienteRequestDTO);

        clienteRepository.persist(cliente);

        return cliente;
    }

    public Cliente obterPorId(Long id) {
        Cliente cliente = clienteRepository.findById(id);

        if (cliente == null) {
            throw new EntidadeNaoEncontradaException("Cliente não encontrado id: " + id);
        }

        return cliente;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.listAll();
    }

    @Transactional
    public Cliente atualizar(Long id, ClienteRequestDTO clienteRequestDTO) {
        Cliente clienteExistente = obterPorId(id);
        Cliente cliente = ClienteMapper.toUpdateEntity(clienteRequestDTO, clienteExistente);

        clienteRepository.persist(cliente);

        return cliente;
    }
}
