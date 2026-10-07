package resources.handler;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import resources.dto.response.ErroResponseDTO;
import resources.mapper.ErroResponseMapper;

@Provider
public class ExceptionHandler implements ExceptionMapper<Exception> {
    private final Logger LOGGER = LoggerFactory.getLogger(ExceptionHandler.class.getName());

    @Override
    public Response toResponse(Exception exception) {
        Response.Status status = Response.Status.INTERNAL_SERVER_ERROR;
        ErroResponseDTO erroResponseDTO = ErroResponseMapper.toResponseDTO(
            status,
            "Erro interno do servidor"
        );

        LOGGER.error("Exception: ", exception);

        return Response.status(status)
                .type(MediaType.APPLICATION_JSON)
                .entity(erroResponseDTO)
                .build();
    }

}
