package resources.mapper;

import domain.shared.IEnum;
import resources.dto.response.EnumResponseDTO;

public class EnumMapper {
    public static EnumResponseDTO toResponse(IEnum enumerated) {
        return new EnumResponseDTO(enumerated.getEnum().name(), enumerated.getDescricao());
    }
}
