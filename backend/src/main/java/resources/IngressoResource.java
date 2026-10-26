package resources;

import jakarta.inject.Inject;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.request.IngressoRequestDTO;
import resources.dto.response.IngressoResponseDTO;
import service.IngressoService;

import java.net.URI;
import java.util.List;

@Path("/ingressos")
@RolesAllowed({ "CLIENTE", "ADMIN" })
public class IngressoResource {
    private final IngressoService ingressoService;

    public IngressoResource(IngressoService ingressoService) {
        this.ingressoService = ingressoService;
    }

    @POST
    public RestResponse<IngressoResponseDTO> criarIngresso(@Valid IngressoRequestDTO ingressoRequestDTO) {
        IngressoResponseDTO ingressoResponseDTO = ingressoService.criar(ingressoRequestDTO);

        URI uri = URI.create("/ingressos/" + ingressoResponseDTO.id());

        return RestResponse
                .ResponseBuilder
                .create(RestResponse.Status.CREATED, ingressoResponseDTO)
                .header("Location", uri)
                .build();
    }

    @GET
    @Path("/{id}")
    public RestResponse<IngressoResponseDTO> obterPorId(@PathParam("id") Long id) {
        IngressoResponseDTO ingressoResponseDTO = ingressoService.obterPorId(id);

        return RestResponse.ok(ingressoResponseDTO);
    }

    @GET
    public RestResponse<List<IngressoResponseDTO>> listarTodos() {
        List<IngressoResponseDTO> listaIngressoResponse = ingressoService.listarTodos();

        return RestResponse.ok(listaIngressoResponse);
    }


    @PUT()
    @Path("/cancelar/{id}")
    public RestResponse<IngressoResponseDTO> cancelar(@PathParam("id") Long id) {
        IngressoResponseDTO ingressoResponseDTO = ingressoService.cancelar(id);

        return RestResponse.ok(ingressoResponseDTO);
    }

    @PUT()
    @Path("/finalizar/{id}")
    public RestResponse<IngressoResponseDTO> finalizar(@PathParam("id") Long id) {
        IngressoResponseDTO ingressoResponseDTO = ingressoService.finalizar(id);

        return RestResponse.ok(ingressoResponseDTO);
    }

    @PUT()
    @Path("/confirmar-pagamento/{id}")
    public RestResponse<IngressoResponseDTO> confirmarPagamento(@PathParam("id") Long id) {
        IngressoResponseDTO ingressoResponseDTO = ingressoService.confirmarPagamento(id);

        return RestResponse.ok(ingressoResponseDTO);
    }
}
