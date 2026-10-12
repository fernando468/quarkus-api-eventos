package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.request.IngressoRequestDTO;
import resources.dto.response.IngressoResponseDTO;
import service.IngressoService;

import java.net.URI;

@Path("/ingressos")
public class IngressoResource {
    @Inject
    IngressoService ingressoService;

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


    @PUT()
    @Path("/cancelardj/{id}")
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
