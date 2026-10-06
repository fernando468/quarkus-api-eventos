package service;

import domain.exception.EntidadeJaExisteException;
import domain.model.Cliente;
import domain.repository.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import resources.dto.request.ClienteRequestDTO;
import utils.ClienteUtilsTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTest {
    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;


    @Test
    public void deveCriarUsuarioComSucesso() {
        ClienteRequestDTO clienteRequestDTO = ClienteUtilsTest.criarClienteRequestDTO();
        when(clienteRepository.findByCpf(clienteRequestDTO.cpf())).thenReturn(null);

        Cliente clienteSalvo = clienteService.criar(clienteRequestDTO);

        assertNotNull(clienteSalvo);
        assertEquals("José da Silva", clienteSalvo.getNome());
        assertEquals("José da Silva", clienteSalvo.getNome());
        assertEquals("jose@email.com", clienteSalvo.getEmail());
        assertEquals("4412345678", clienteSalvo.getTelefone().getTelefone());
        assertEquals("12345678910", clienteSalvo.getCpf().getCpf());
        assertEquals("12345000", clienteSalvo.getEndereco().getCep());
        assertEquals("Rua Teste", clienteSalvo.getEndereco().getLogradouro());
        assertEquals("123 A", clienteSalvo.getEndereco().getNumero());
        assertEquals("Casa cinza", clienteSalvo.getEndereco().getComplemento());
        assertEquals("Bairro Teste", clienteSalvo.getEndereco().getBairro());
        assertEquals("Cidade Teste", clienteSalvo.getEndereco().getCidade());
        assertEquals("PR", clienteSalvo.getEndereco().getEstado());

        verify(clienteRepository, times(1)).findByCpf("12345678910");
        verify(clienteRepository, times(1)).persist(any(Cliente.class));
    }

    @Test
    public void deveOcorrerErroQuandoClienteJaExiste() {
        ClienteRequestDTO clienteRequestDTO = ClienteUtilsTest.criarClienteRequestDTO();
        when(clienteRepository.findByCpf(clienteRequestDTO.cpf())).thenReturn(ClienteUtilsTest.criarClienteToEntity());

        EntidadeJaExisteException entidadeJaExisteException = assertThrows(EntidadeJaExisteException.class, () -> {
            clienteService.criar(ClienteUtilsTest.criarClienteRequestDTO());
        });

        assertEquals("Cliente já existe com o CPF: 12345678910", entidadeJaExisteException.getMessage());

        verify(clienteRepository, times(1)).findByCpf("12345678910");
        verify(clienteRepository, times(0)).persist(any(Cliente.class));
        verify(clienteRepository, never()).persist(any(Cliente.class));
    }
}
