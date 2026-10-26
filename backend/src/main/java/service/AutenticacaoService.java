package service;

import domain.exception.UsuarioNaoAutorizadoException;
import domain.exception.EntidadeJaExisteException;
import domain.model.Admin;
import domain.model.Cliente;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import resources.dto.request.LoginRequestDTO;
import resources.dto.request.RegistroRequestDTO;
import resources.dto.response.ClienteResponseDTO;
import resources.dto.response.TokenResponseDTO;
import resources.mapper.ClienteMapper;
import resources.mapper.TokenMapper;

@ApplicationScoped
public class AutenticacaoService {
    private static final long TOKEN_DURATION_SECONDS = 900;

    private final ClienteService clienteService;
    private final AdminService adminService;

    public AutenticacaoService(ClienteService clienteService, AdminService adminService) {
        this.clienteService = clienteService;
        this.adminService = adminService;
    }

    @Transactional
    public ClienteResponseDTO registrar(RegistroRequestDTO request) {
        boolean contaJaExisteComoAdmin = adminService.findByEmail(request.email()) != null;
        boolean contaJaExisteComoCliente = clienteService.findByEmail(request.email()) != null;

        if (contaJaExisteComoAdmin || contaJaExisteComoCliente) {
            throw new EntidadeJaExisteException("Já existe uma conta com o email: " + request.email());
        }

        Cliente cliente = clienteService.criar(request);

        return ClienteMapper.toResponseDTO(cliente);
    }

    public TokenResponseDTO login(LoginRequestDTO request) {
        Admin admin = adminService.findByEmail(request.email());

        if (admin != null && BcryptUtil.matches(request.senha(), admin.getSenhaEncriptada())) {
            return criarToken(admin);
        }

        Cliente cliente = clienteService.findByEmail(request.email());

        if (cliente != null && BcryptUtil.matches(request.senha(), cliente.getSenhaEncriptada())) {
            return criarToken(cliente);
        }

        throw new UsuarioNaoAutorizadoException("Email ou senha inválidos");
    }

    private TokenResponseDTO criarToken(Cliente cliente) {
        var claims = Jwt.issuer("quarkus-api-eventos")
            .subject(cliente.getId().toString())
            .upn(cliente.getEmail().getEmail())
            .claim("clienteId", cliente.getId());

        claims.groups("CLIENTE");

        String token = claims.expiresIn(TOKEN_DURATION_SECONDS).sign();

        return TokenMapper.toResponse(token);
    }

    private TokenResponseDTO criarToken(Admin admin) {
        var claims = Jwt.issuer("quarkus-api-eventos")
            .subject(admin.getId().toString())
            .upn(admin.getEmail().getEmail())
            .claim("adminId", admin.getId())
            .groups("ADMIN");

        String token = claims.expiresIn(TOKEN_DURATION_SECONDS).sign();

        return TokenMapper.toResponse(token);
    }
}
