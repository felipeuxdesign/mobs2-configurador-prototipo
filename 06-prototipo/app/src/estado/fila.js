// A fila de saída que o app mostra, num lugar só: a do mock (M.filaSaida)
// mais o que a sessão criou (estado único, `fila`), com os itens que o
// técnico devolveu à fila no `Ressincronizar e reenviar` da T15 (estado
// único, `reenviados`). Quem lê a fila — a T15 e o menu — lê daqui, pra o
// item reenviado contar igual nas duas (T15 · a entrega do design de 25/09).
// Nada é criado: o item muda de estado, e o mock fica intocado (G25).
import { M } from '../dados/mock.js'

// os estados de erro que o Ressincronizar devolve à fila (T15/00 e 02)
export const ERROS_DA_FILA = ['erro-recusa', 'erro-rede']

// o item como o app o vê agora: reenviado, o erro volta pra fila, 'na-fila'
export const comoEsta = (f, reenviados = []) =>
  (ERROS_DA_FILA.includes(f.estado) && reenviados.includes(f.id) ? { ...f, estado: 'na-fila' } : f)

// a fila inteira: a do mock mais a da sessão, cada item como está
// o pacote 12 · o pedido de correção de cadastro sobe pela fila, como as evidências
// (T15/05, padrão até o PM decidir): o item que o Solicitar correção da T14 cria
export const TIPO_CORRECAO = 'Correção de cadastro'
export const itemDeCorrecao = (ativoId, as) => ({
  id: `correcao-${ativoId}`, tipo: TIPO_CORRECAO, ativoId, diasAtras: 0, data: M.diasAntes(0), criadoAs: as, estado: 'na-fila',
})

export const filaDoMundo = (unico) => [...M.filaSaida, ...(unico.fila ?? [])].map((f) => comoEsta(f, unico.reenviados))
