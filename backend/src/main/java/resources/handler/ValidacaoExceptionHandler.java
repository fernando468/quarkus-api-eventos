package resources.handler;

import domain.exception.ValidacaoException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import resources.dto.response.ErroResponseDTO;
import resources.mapper.ErroResponseMapper;

@Provider
public class ValidacaoExceptionHandler implements ExceptionMapper<ValidacaoException> {
    private final Logger LOGGER = LoggerFactory.getLogger(ValidacaoExceptionHandler.class.getName());

    @Override
    public Response toResponse(ValidacaoException exception) {
        String message = exception.getMessage() != null ? exception.getMessage() : "Erro interno do servidor";
        Response.Status status = Response.Status.BAD_REQUEST;
        ErroResponseDTO erroResponseDTO = ErroResponseMapper.toResponseDTO(
            status,
            message
        );

        LOGGER.error("Exception: ", exception);

        return Response.status(status)
                .type(MediaType.APPLICATION_JSON)
                .entity(erroResponseDTO)
                .build();
    }

}
