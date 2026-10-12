package domain.model;

import domain.exception.ValidacaoException;
import domain.model.valueobject.StatusEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import utils.ReflectionUtilsTest;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class IngressoTest {

    @Test
    public void deveCriarIngressoComSucesso() throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        ReflectionUtilsTest.setField(1L, cliente, "id");

        Evento evento = new Evento();
        ReflectionUtilsTest.setField(1L, evento, "id");

        Ingresso ingresso = new Ingresso(cliente, evento);

        assertEquals(1L, ingresso.getCliente().getId());
        assertEquals(1L, ingresso.getEvento().getId());
        assertEquals(StatusEnum.AGUARDANDO_PAGAMENTO, ingresso.getStatus());
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

    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "AGUARDANDO_PAGAMENTO" })
    public void deveConfirmarPagamentoIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");

        ingresso.confirmarPagamento();

        assertEquals(StatusEnum.PAGAMENTO_CONFIRMADO, ingresso.getStatus());
    }

    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "PAGAMENTO_CONFIRMADO" })
    public void deveFinalizarIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");

        ingresso.finalizar();

        assertEquals(StatusEnum.FINALIZADO, ingresso.getStatus());
    }

    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "AGUARDANDO_PAGAMENTO", "PAGAMENTO_CONFIRMADO" })
    public void deveCancelarIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");

        ingresso.cancelar();

        assertEquals(StatusEnum.CANCELADO, ingresso.getStatus());
    }


    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "FINALIZADO", "CANCELADO" })
    public void deveOcorrerErroAoCancelarIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");


        ValidacaoException validationException = assertThrows(ValidacaoException.class, ingresso::cancelar);

        assertEquals("Não é possível cancelar ingresso finalizado ou cancelado", validationException.getMessage());
    }

    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "AGUARDANDO_PAGAMENTO", "CANCELADO", "FINALIZADO" })
    public void deveOcorrerErroAoFinalizarIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");


        ValidacaoException validationException = assertThrows(ValidacaoException.class, ingresso::finalizar);

        assertEquals("Não é possível finalizar ingresso aguardando pagamento, finalizado ou cancelado", validationException.getMessage());
    }

    @ParameterizedTest
    @EnumSource(value = StatusEnum.class, names = { "PAGAMENTO_CONFIRMADO", "CANCELADO", "FINALIZADO" })
    public void deveOcorrerErroAoConfirmarPagamentoIngresso(StatusEnum status) throws NoSuchFieldException, IllegalAccessException {
        Cliente cliente = new Cliente();
        Evento evento = new Evento();

        Ingresso ingresso = new Ingresso(cliente, evento);

        ReflectionUtilsTest.setField(status, ingresso, "status");


        ValidacaoException validationException = assertThrows(ValidacaoException.class, ingresso::confirmarPagamento);

        assertEquals("Não é possível confirmar pagamento do ingresso aguardando pagamento, finalizado ou cancelado", validationException.getMessage());
    }

}
