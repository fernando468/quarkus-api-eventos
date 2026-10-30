package service;

import domain.exception.UsuarioNaoAutorizadoException;
import domain.model.Admin;
import domain.model.Cliente;
import domain.model.Endereco;
import domain.model.valueobject.Cpf;
import domain.model.valueobject.Email;
import domain.model.valueobject.Telefone;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import resources.dto.request.LoginRequestDTO;
import resources.dto.response.TokenResponseDTO;
import utils.ClienteUtilsTest;
import utils.EnderecoUtilsTest;
import utils.ReflectionUtilsTest;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AutenticacaoServiceTest {
    @Mock
    ClienteService clienteService;

    @Mock
    AdminService adminService;

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
    void deveRealizarLoginAdminSemCriarTokenDeCliente() {
        Admin admin = new Admin("Admin", new Email("admin@admin.com"), "12345678");
        ReflectionUtilsTest.setFieldSuperClass(1L, admin, "id");
        when(adminService.findByEmail("admin@admin.com")).thenReturn(admin);

        TokenResponseDTO tokenResponseDTO = autenticacaoService.login(
            new LoginRequestDTO("admin@admin.com", "12345678")
        );
        String payload = new String(
            Base64.getUrlDecoder().decode(tokenResponseDTO.accessToken().split("\\.")[1]),
            StandardCharsets.UTF_8
        );

        assertTrue(payload.contains("\"adminId\":1"));
        assertTrue(payload.contains("\"groups\":[\"ADMIN\"]"));
        assertFalse(payload.contains("\"clienteId\""));
        verify(clienteService, never()).findByEmail("admin@admin.com");
    }

    @Test
    void deveManterClienteComEmailDeAdminComoCliente() {
        Cliente cliente = new Cliente(
            "Cliente",
            new Email("cliente@admin.com"),
            new Telefone("4412345678"),
            new Cpf("12345678910"),
            EnderecoUtilsTest.criarEnderecoValido(),
            "12345678"
        );
        ReflectionUtilsTest.setFieldSuperClass(2L, cliente, "id");
        when(clienteService.findByEmail("cliente@admin.com")).thenReturn(cliente);

        TokenResponseDTO tokenResponseDTO = autenticacaoService.login(
            new LoginRequestDTO("cliente@admin.com", "12345678")
        );
        String payload = new String(
            Base64.getUrlDecoder().decode(tokenResponseDTO.accessToken().split("\\.")[1]),
            StandardCharsets.UTF_8
        );

        assertTrue(payload.contains("\"clienteId\":2"));
        assertTrue(payload.contains("\"groups\":[\"CLIENTE\"]"));
        assertFalse(payload.contains("\"adminId\""));
    }

    @Test
    void deveRetornarQuandoClienteNaoEncontrado() {
        when(clienteService.findByEmail("invalido@email.com")).thenReturn(null);

        UsuarioNaoAutorizadoException usuarioNaoAutorizadoException = assertThrows(UsuarioNaoAutorizadoException.class,
            () -> autenticacaoService.login(new LoginRequestDTO("invalido@email.com", "senha-incorreta"))
        );

        assertEquals("Email ou senha inválidos", usuarioNaoAutorizadoException.getMessage());
        verify(adminService).findByEmail("invalido@email.com");
        verify(clienteService).findByEmail("invalido@email.com");
    }

}
