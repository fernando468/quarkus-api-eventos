package resources.dto.response;

public record TokenResponseDTO(
    String accessToken,
    String tokenType,
    long expiresIn) {
}
