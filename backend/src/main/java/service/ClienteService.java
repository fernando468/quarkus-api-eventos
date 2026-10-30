package service;

import domain.exception.EntidadeJaExisteException;
import domain.exception.EntidadeNaoEncontradaException;
import domain.model.Cliente;
import domain.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import resources.dto.request.RegistroRequestDTO;
import resources.mapper.ClienteMapper;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Cliente criar(RegistroRequestDTO registroRequestDTO) {
        Cliente clienteExiste = clienteRepository.findByCpf(registroRequestDTO.cpf());

        if (clienteExiste != null) {
            throw new EntidadeJaExisteException("Cliente já existe com o CPF: " + registroRequestDTO.cpf());
        }

        if (clienteRepository.findByEmail(registroRequestDTO.email()) != null) {
            throw new EntidadeJaExisteException("Cliente já existe com o email: " + registroRequestDTO.email());
        }

        Cliente cliente = ClienteMapper.toEntity(registroRequestDTO);

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

    public Cliente findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
}
