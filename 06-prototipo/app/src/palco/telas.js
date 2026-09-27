// As 16 telas e o índice das 147 referências (02-telas/indice.json, lido de
// onde está). O painel em duas partes (decisão 25, G18, quadro 04).
import indice from '../../../../02-telas/indice.json'

// os nomes como o painel do quadro 04 escreve: a T08 é "Refazer leitura" (PALCO-V6);
// o título da tela, no app, continua "Refazer leitura da CAN"
export const NOMES = {
  T01: 'Login', T02: 'Selecionar contexto', T03: 'Sincronizar', T04: 'Menu', T05: 'Conectar módulo',
  T06: 'Selecionar ativo', T07: 'Dados da CAN', T08: 'Refazer leitura', T09: 'Configurar módulo',
  T10: 'Calibração', T11: 'Conferir configuração', T12: 'Últimas instalações', T13: 'Checklist',
  T14: 'Ciclo dinâmico', T15: 'Fila de saída', T16: 'Sessão',
}
export const CAMINHO = ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T09', 'T10', 'T14', 'T13', 'T16']
export const CONSULTAS = ['T15', 'T11', 'T12', 'T08']
export const REFERENCIAS = indice.itens
export const estadosDa = (tela) => REFERENCIAS.filter((r) => r.tela === tela && r.tipo === 'estado')
export const momentosDa = (tela) => REFERENCIAS.filter((r) => r.tela === tela && r.tipo === 'momento')
export const GRUPOS_T05 = [['achar', 'Achar'], ['conectar', 'Conectar'], ['conferir', 'Conferir']]
