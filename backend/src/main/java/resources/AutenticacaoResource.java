package resources;

import jakarta.validation.Valid;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.POST;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.request.LoginRequestDTO;
import resources.dto.request.RegistroRequestDTO;
import resources.dto.response.ClienteResponseDTO;
import resources.dto.response.TokenResponseDTO;
import service.AutenticacaoService;

@Path("/autenticacao")
public class AutenticacaoResource {
    private final AutenticacaoService autenticacaoService;

    public AutenticacaoResource(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @POST
    @Path("/registrar")
    public RestResponse<ClienteResponseDTO> registrar(@Valid RegistroRequestDTO request) {
        return RestResponse.status(RestResponse.Status.CREATED, autenticacaoService.registrar(request));
    }

    @POST
    @Path("/login")
    public RestResponse<TokenResponseDTO> login(@Valid LoginRequestDTO request) {
        return RestResponse.ok(autenticacaoService.login(request));
    }
}
