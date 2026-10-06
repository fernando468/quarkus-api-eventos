package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
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
    public Response criar(@Valid EventoRequestDTO eventoRequestDTO) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.criar(eventoRequestDTO));

        URI uri = URI.create("/eventos/" + eventoResponseDTO.id());

        return Response.created(uri).entity(eventoResponseDTO).build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, @Valid EventoRequestDTO eventoRequestDTO) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.atualizar(id, eventoRequestDTO));
        return Response.ok().entity(eventoResponseDTO).build();
    }

    @GET
    @Path("/{id}")
    public Response obterPorId(@PathParam("id") Long id) {
        EventoResponseDTO eventoResponseDTO = EventoMapper.toResponseDTO(eventoService.obterPorId(id));
        return Response.ok().entity(eventoResponseDTO).build();
    }

    @GET
    public Response listarTodos() {
        List<EventoResponseDTO> listaEventoResponseDTO = EventoMapper.toResponseDTOList(eventoService.listarTodos());
        return Response.ok().entity(listaEventoResponseDTO).build();
    }
}
