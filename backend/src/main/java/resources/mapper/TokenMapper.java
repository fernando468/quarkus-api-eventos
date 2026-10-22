package resources.mapper;

import resources.dto.response.TokenResponseDTO;

public class TokenMapper {
    public static TokenResponseDTO toResponse(String token) {
        return new TokenResponseDTO(token, "Bearer", 900);
    }
}
