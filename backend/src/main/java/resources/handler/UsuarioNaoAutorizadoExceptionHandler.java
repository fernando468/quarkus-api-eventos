package resources.handler;

import domain.exception.UsuarioNaoAutorizadoException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import resources.dto.response.ErroResponseDTO;
import resources.mapper.ErroResponseMapper;

@Provider
public class UsuarioNaoAutorizadoExceptionHandler implements ExceptionMapper<UsuarioNaoAutorizadoException> {
    @Override
    public Response toResponse(UsuarioNaoAutorizadoException exception) {
        ErroResponseDTO erroResponseDTO = ErroResponseMapper.toResponseDTO(
            Response.Status.UNAUTHORIZED,
            "Email ou senha inválidos"
        );

        return Response.status(Response.Status.UNAUTHORIZED)
            .type(MediaType.APPLICATION_JSON)
            .entity(erroResponseDTO)
            .build();
    }
}
