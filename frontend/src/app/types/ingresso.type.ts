import { ClienteResponse } from './cliente.type';
import { EnumResponse } from './enum.type';
import { EventoResponse } from './evento.type';

export type IngressoRequest = {
  clienteId: number;
  eventoId: number;
};

export type IngressoResponse = {
  id: number;
  status: EnumResponse;
  evento: EventoResponse;
  cliente: ClienteResponse;
};
