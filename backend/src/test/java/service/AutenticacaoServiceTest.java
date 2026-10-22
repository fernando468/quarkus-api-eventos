package service;

import domain.exception.UsuarioNaoAutorizadoException;
import domain.exception.ValidacaoException;
import domain.repository.ClienteRepository;
import jakarta.ws.rs.NotAuthorizedException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import resources.dto.request.LoginRequestDTO;
import resources.dto.response.TokenResponseDTO;
import utils.ClienteUtilsTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AutenticacaoServiceTest {
    @Mock
    ClienteService clienteService;

    @InjectMocks
    AutenticacaoService autenticacaoService;

    @Test
    void deveRealizarLoginQuandoClienteExiste() {
        when(clienteService.findByEmail("jose@email.com")).thenReturn(ClienteUtilsTest.criarClienteToEntity());

        TokenResponseDTO tokenResponseDTO = autenticacaoService.login(new LoginRequestDTO("jose@email.com", "12345678"));


        assertNotNull(tokenResponseDTO.accessToken());
        assertEquals("Bearer", tokenResponseDTO.tokenType());
    }

    @Test
    void deveRetornarQuandoClienteNaoEncontrado() {
        when(clienteService.findByEmail("invalido@email.com")).thenReturn(null);

        UsuarioNaoAutorizadoException usuarioNaoAutorizadoException = assertThrows(UsuarioNaoAutorizadoException.class,
            () -> autenticacaoService.login(new LoginRequestDTO("invalido@email.com", "senha-incorreta"))
        );

        assertEquals("Email ou senha inválidos", usuarioNaoAutorizadoException.getMessage());
        verify(clienteService).findByEmail("invalido@email.com");
    }

}
