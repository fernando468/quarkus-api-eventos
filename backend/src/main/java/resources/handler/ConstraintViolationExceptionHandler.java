package resources.handler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import resources.dto.response.ErroResponseDTO;
import resources.mapper.ErroResponseMapper;

import java.util.List;
import java.util.stream.Collectors;

@Provider
public class ConstraintViolationExceptionHandler
    implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException exception) {
        List<String> erros = exception
            .getConstraintViolations()
            .stream()
            .map(this::toValidationError)
            .toList();

        ErroResponseDTO erroResponseDTO = ErroResponseMapper.toResponseDTO(Response.Status.BAD_REQUEST, "Campos inválidos", erros);

        return Response.status(Response.Status.BAD_REQUEST)
            .entity(erroResponseDTO)
            .build();
    }

    private String toValidationError(ConstraintViolation<?> violation) {

        return violation.getPropertyPath() + ": " + violation.getMessage();
    }
}
