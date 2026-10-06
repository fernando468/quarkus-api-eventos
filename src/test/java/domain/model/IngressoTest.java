package domain.model;

import domain.exception.ValidacaoException;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class IngressoTest {

    @Test
    public void deveCriarIngressoComSucesso() throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Field fieldCliente = Cliente.class.getDeclaredField("id");
        fieldCliente.setAccessible(true);
        fieldCliente.set(cliente, 1L);

        Evento evento = new Evento();
        Field fieldEvento = Evento.class.getDeclaredField("id");
        fieldEvento.setAccessible(true);
        fieldEvento.set(evento, 1L);

        Ingresso ingresso = new Ingresso(cliente, evento);

        assertEquals(1L, ingresso.getCliente().getId());
        assertEquals(1L, ingresso.getEvento().getId());
    }

    @Test
    public void deveOcorrerErroQuandoClienteNulo() {
        Evento evento = new Evento();

        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
           new Ingresso(null, evento);
        });

        assertEquals("O Cliente é obrigatório", validacaoException.getMessage());
    }


    @Test
    public void deveOcorrerErroQuandoEventoNulo() {
        Cliente cliente = new Cliente();

        ValidacaoException validacaoException = assertThrows(ValidacaoException.class, () -> {
            new Ingresso(cliente, null);
        });

        assertEquals("O Evento é obrigatório", validacaoException.getMessage());
    }

}
