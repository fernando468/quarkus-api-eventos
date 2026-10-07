package resources.mapper;

import jakarta.ws.rs.core.Response;
import resources.dto.response.ErroResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

public class ErroResponseMapper {
    public static ErroResponseDTO toResponseDTO(Response.Status status, String message, List<String> erros) {
        return new ErroResponseDTO(status.getStatusCode(), message, erros, LocalDateTime.now());
    }

    public static ErroResponseDTO toResponseDTO(Response.Status status, String message) {
        return new ErroResponseDTO(status.getStatusCode(), message, List.of(), LocalDateTime.now());
    }
}
