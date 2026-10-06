package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import resources.dto.request.IngressoRequestDTO;
import resources.dto.response.IngressoResponseDTO;
import resources.mapper.IngressoMapper;
import service.IngressoService;

import java.net.URI;

@Path("/ingressos")
public class IngressoResource {
    @Inject
    IngressoService ingressoService;

    @POST
    public Response criarIngresso(@Valid IngressoRequestDTO ingressoRequestDTO) {
        IngressoResponseDTO ingressoResponseDTO = IngressoMapper.toResponseDTO(ingressoService.criar(ingressoRequestDTO));

        URI uri = URI.create("/ingressos/" + ingressoResponseDTO.id());

        return Response.created(uri).build();
    }
}
