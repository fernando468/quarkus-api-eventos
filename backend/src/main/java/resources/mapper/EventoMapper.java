package resources.mapper;


import domain.model.Evento;
import resources.dto.request.EventoRequestDTO;
import resources.dto.response.EventoResponseDTO;

import java.util.List;

public class EventoMapper {
    public static Evento toEntity(EventoRequestDTO eventoRequestDTO) {
        return new Evento(
            eventoRequestDTO.titulo(),
            eventoRequestDTO.descricao(),
            eventoRequestDTO.data(),
            EnderecoMapper.toEntity(eventoRequestDTO.endereco())
        );
    }

    public static Evento toUpdateEntity(EventoRequestDTO eventoRequestDTO, Evento evento) {
        evento.atualizar(
            eventoRequestDTO.titulo(),
            eventoRequestDTO.descricao(),
            eventoRequestDTO.data(),
            EnderecoMapper.toUpdateEntity(eventoRequestDTO.endereco(), evento.getEndereco())
        );

        return evento;
    }

    public static EventoResponseDTO toResponseDTO(Evento evento) {
        return new EventoResponseDTO(
            evento.getId(),
            evento.getTitulo(),
            evento.getDescricao(),
            evento.getData(),
            EnderecoMapper.toResponseDTO(evento.getEndereco())
        );
    }

    public static List<EventoResponseDTO> toResponseDTOList(List<Evento> listaEventos) {
        return listaEventos.stream()
                .map(EventoMapper::toResponseDTO)
                .toList();
    }
}
