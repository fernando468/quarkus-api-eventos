package resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;
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
    public RestResponse<ClienteResponseDTO> criar(@Valid ClienteRequestDTO clienteRequestDTO) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.criar(clienteRequestDTO));

        URI uri = URI.create("/clientes/" + clienteResponseDTO.id());

        return RestResponse
                .ResponseBuilder
                .create(RestResponse.Status.CREATED, clienteResponseDTO)
                .header("Location", uri)
                .build();
    }

    @PUT
    @Path("/{id}")
    public RestResponse<ClienteResponseDTO> atualizar(@PathParam("id") Long id, @Valid ClienteRequestDTO clienteRequestDTO) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.atualizar(id, clienteRequestDTO));
        return RestResponse.ok(clienteResponseDTO);
    }

    @GET
    @Path("/{id}")
    public RestResponse<ClienteResponseDTO> obterPorId(@PathParam("id") Long id) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.obterPorId(id));
        return RestResponse.ok(clienteResponseDTO);
    }

    @GET
    public RestResponse<List<ClienteResponseDTO>> listarTodos() {
        List<ClienteResponseDTO> listaClienteResponseDTO = ClienteMapper.toResponseDTOList(clienteService.listarTodos());
        return RestResponse.ok(listaClienteResponseDTO);
    }
}
