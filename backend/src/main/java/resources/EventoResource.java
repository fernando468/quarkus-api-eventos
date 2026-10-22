package resources;

import jakarta.validation.Valid;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.request.EventoRequestDTO;
import resources.dto.response.EventoResponseDTO;
import resources.mapper.EventoMapper;
import service.EventoService;

import java.net.URI;
import java.util.List;

@Path("/eventos")
@RolesAllowed("user")
public class EventoResource {
    private final EventoService eventoService;

    public EventoResource(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @POST
    public RestResponse<EventoResponseDTO> criar(@Valid EventoRequestDTO eventoRequestDTO) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.criar(eventoRequestDTO));

        URI uri = URI.create("/eventos/" + eventoResponseDTO.id());

        return RestResponse
                .ResponseBuilder
                .create(RestResponse.Status.CREATED, eventoResponseDTO)
                .header("Location", uri)
                .build();
    }

    @PUT
    @Path("/{id}")
    public RestResponse<EventoResponseDTO> atualizar(@PathParam("id") Long id, @Valid EventoRequestDTO eventoRequestDTO) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.atualizar(id, eventoRequestDTO));
        return RestResponse.ok(eventoResponseDTO);
    }

    @GET
    @Path("/{id}")
    public RestResponse<EventoResponseDTO> obterPorId(@PathParam("id") Long id) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.obterPorId(id));
        return RestResponse.ok(eventoResponseDTO);
    }

    @GET
    public RestResponse<List<EventoResponseDTO>> listarTodos() {
        List<EventoResponseDTO> listaEventoResponseDTO = EventoMapper.toResponseDTOList(eventoService.listarTodos());
        return RestResponse.ok(listaEventoResponseDTO);
    }
}
