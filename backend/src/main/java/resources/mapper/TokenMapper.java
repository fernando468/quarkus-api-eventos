package resources.mapper;

import resources.dto.response.TokenResponseDTO;

public class TokenMapper {
    public static TokenResponseDTO toResponse(String token, long tokenDurationSeconds) {
        return new TokenResponseDTO(token, "Bearer", tokenDurationSeconds);
    }
}
