package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import resources.dto.request.ClienteRequestDTO;
import resources.dto.response.ClienteResponseDTO;
import resources.mapper.ClienteMapper;
import service.ClienteService;

import java.net.URI;
import java.util.List;

@Path("/clientes")
public class ClienteResource {
    @Inject
    ClienteService clienteService;

    @POST
    public Response criar(@Valid ClienteRequestDTO clienteRequestDTO) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.criar(clienteRequestDTO));

        URI uri = URI.create("/clientes/" + clienteResponseDTO.id());

        return Response.created(uri).entity(clienteResponseDTO).build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, @Valid ClienteRequestDTO clienteRequestDTO) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.atualizar(id, clienteRequestDTO));
        return Response.ok().entity(clienteResponseDTO).build();
    }

    @GET
    @Path("/{id}")
    public Response obterPorId(@PathParam("id") Long id) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.obterPorId(id));
        return Response.ok().entity(clienteResponseDTO).build();
    }

    @GET
    public Response listarTodos() {
        List<ClienteResponseDTO> listaClienteResponseDTO = ClienteMapper.toResponseDTOList(clienteService.listarTodos());
        return Response.ok().entity(listaClienteResponseDTO).build();
    }
}
