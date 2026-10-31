package resources;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.RestResponse;
import resources.dto.response.ClienteResponseDTO;
import resources.mapper.ClienteMapper;
import service.ClienteService;

import java.util.List;

@Path("/clientes")
public class ClienteResource {
    private final ClienteService clienteService;

    public ClienteResource(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({ "ADMIN" })
    public RestResponse<ClienteResponseDTO> obterPorId(@PathParam("id") Long id) {
        ClienteResponseDTO clienteResponseDTO = ClienteMapper.toResponseDTO(clienteService.obterPorId(id));
        return RestResponse.ok(clienteResponseDTO);
    }

    @GET
    @RolesAllowed({ "ADMIN" })
    public RestResponse<List<ClienteResponseDTO>> listarTodos() {
        List<ClienteResponseDTO> listaClienteResponseDTO = ClienteMapper.toResponseDTOList(clienteService.listarTodos());
        return RestResponse.ok(listaClienteResponseDTO);
    }

    @GET
    @Path("/autenticado")
    @RolesAllowed({ "CLIENTE" })
    public RestResponse<List<ClienteResponseDTO>> listarClienteAutenticado() {
        List<ClienteResponseDTO> listaClienteResponseDTO = ClienteMapper.toResponseDTOList(clienteService.listarClienteAutenticado());
        return RestResponse.ok(listaClienteResponseDTO);
    }
}
