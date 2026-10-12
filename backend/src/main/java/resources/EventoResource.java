package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.request.EventoRequestDTO;
import resources.dto.response.EventoResponseDTO;
import resources.mapper.EventoMapper;
import service.EventoService;

import java.net.URI;
import java.util.List;

@Path("/eventos")
public class EventoResource {
    @Inject
    EventoService eventoService;

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
