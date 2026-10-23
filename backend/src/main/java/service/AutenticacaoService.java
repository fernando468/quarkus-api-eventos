package service;

import domain.exception.UsuarioNaoAutorizadoException;
import domain.model.Cliente;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import resources.dto.request.LoginRequestDTO;
import resources.dto.request.RegistroRequestDTO;
import resources.dto.response.ClienteResponseDTO;
import resources.dto.response.TokenResponseDTO;
import resources.mapper.ClienteMapper;
import resources.mapper.TokenMapper;

import java.util.Set;

@ApplicationScoped
public class AutenticacaoService {
    private static final long TOKEN_DURATION_SECONDS = 900;

    private final ClienteService clienteService;

    public AutenticacaoService(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Transactional
    public ClienteResponseDTO registrar(RegistroRequestDTO request) {
        Cliente cliente = clienteService.criar(request);

        return ClienteMapper.toResponseDTO(cliente);
    }

    public TokenResponseDTO login(LoginRequestDTO request) {
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

        if (cliente.getEmail().getEmail().contains("@admin.com")) {
            claims.groups(Set.of("CLIENTE", "ADMIN"));
        } else {
            claims.groups("CLIENTE");
        }

        String token = claims.expiresIn(TOKEN_DURATION_SECONDS).sign();

        return TokenMapper.toResponse(token);
    }
}
