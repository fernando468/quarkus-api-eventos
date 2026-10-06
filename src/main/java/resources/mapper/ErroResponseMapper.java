package resources.mapper;

import jakarta.ws.rs.core.Response;
import resources.dto.response.ErrorResponseDTO;

import java.time.LocalDateTime;

public class ErroResponseMapper {
    public static ErrorResponseDTO toResponseDTO(Response.Status status, String message) {
        return new ErrorResponseDTO(status.getStatusCode(), message, LocalDateTime.now());
    }
}
