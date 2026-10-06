package resources.mapper;

import domain.model.Cliente;
import domain.model.Evento;
import domain.model.Ingresso;
import resources.dto.response.IngressoResponseDTO;

import java.util.List;

public class IngressoMapper {
    public static Ingresso toEntity(Cliente cliente, Evento evento) {
        return new Ingresso(cliente, evento);
    }

    public static IngressoResponseDTO toResponseDTO(Ingresso ingresso) {
        return new IngressoResponseDTO(
            ingresso.getId(),
            EventoMapper.toResponseDTO(ingresso.getEvento()),
            ClienteMapper.toResponseDTO(ingresso.getCliente())
        );
    }

    public static List<IngressoResponseDTO> toResponseDTOList(List<Ingresso> listaIngressos) {
        return listaIngressos.stream()
                .map(IngressoMapper::toResponseDTO)
                .toList();
    }
}
