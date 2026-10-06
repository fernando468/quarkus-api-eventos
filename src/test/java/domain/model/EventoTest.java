package domain.model;

import domain.exception.ValidacaoException;
import org.junit.jupiter.api.Test;
import utils.EnderecoUtilsTest;

import java.time.LocalDateTime;
import java.time.Month;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EventoTest {
    @Test
    public void deveCriarEventoComSucesso() {
        Evento evento = new Evento(
            "Título",
            "Descrição",
            LocalDateTime.of(2026, Month.OCTOBER, 6, 12, 0),
            EnderecoUtilsTest.criarEnderecoValido()
        );

        assertEquals("Título", evento.getTitulo());
        assertEquals("Descrição", evento.getDescricao());
        assertEquals(LocalDateTime.of(2026, Month.OCTOBER, 6, 12, 0), evento.getData());

        assertEquals("12345000", evento.getEndereco().getCep());
        assertEquals("Rua Teste", evento.getEndereco().getLogradouro());
        assertEquals("123 A", evento.getEndereco().getNumero());
        assertEquals("Casa cinza", evento.getEndereco().getComplemento());
        assertEquals("Bairro Teste", evento.getEndereco().getBairro());
        assertEquals("Cidade Teste", evento.getEndereco().getCidade());
        assertEquals("PR", evento.getEndereco().getEstado());
    }

    @Test
    public void deveOcorrerErroQuandoTituloEventoNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Evento(
                null,
                "Descrição",
                LocalDateTime.of(2026, Month.OCTOBER, 6, 12, 0),
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("O título do evento é obrigatório", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoDescricaoEventoNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Evento(
                "Título",
                null,
                LocalDateTime.of(2026, Month.OCTOBER, 6, 12, 0),
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("A descrição do evento é obrigatória", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoDataEventoNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Evento(
                "Título",
                "Descrição",
                null,
                EnderecoUtilsTest.criarEnderecoValido()
            );
        });

        assertEquals("A data do evento é obrigatória", validacaoException.getMessage());
    }

    @Test
    public void deveOcorrerErroQuandoDataEnderecoNulo() {
        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Evento(
                "Título",
                "Descrição",
                LocalDateTime.of(2026, Month.OCTOBER, 6, 12, 0),
                null
            );
        });

        assertEquals("O endereço do evento é obrigatório", validacaoException.getMessage());
    }

}
