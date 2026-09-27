// As sementes (logica.md, G21): pular direto pra uma tela pelo painel monta o
// estado mínimo que ela precisa. Só ids e valores lidos de M — nada digitado.
// Onde a semente escrita contradiz a 00 da referência, vale a referência (G21).
import { M } from '../dados/mock.js'

const HEROI = { moduloSerial: 'M2C-0417', ativoId: 'a-01' }
const pacote = (id) => { const p = M.pacotes.find((x) => x.id === id); return { id: p.id, diasAtras: p.diasAtras, hora: p.hora } }
const sessao = (ativoId = HEROI.ativoId, moduloSerial = HEROI.moduloSerial) => ({ moduloSerial, ativoId, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: 'sem-fio' })
const varzea = { uoId: 'uo-01', pacote: pacote('pac-uo-01') }
// a T02 pelo endereço, ou pelo pulo do palco, é a tela, a 00: as unidades de quem tem uma
// empresa só, a do caso uma-empresa, já confirmada — o nome dela em cima, sem o Trocar de
// empresa (a otimização 400, estados.md da T02). O herói, com as três empresas dele, chega
// ao 05 pelo Entrar da T01 (src/telas/T02/empresas.js)
const umaEmpresa = { caso: 'uma-empresa', atual: M.casos['uma-empresa'].empresas[0].id }

export const SEMENTES = {
  T01: {},
  T02: { contexto: { uoId: null, pacote: null, empresas: umaEmpresa } },
  T03: { contexto: { uoId: 'uo-01', pacote: null } },
  T04: { contexto: varzea, sessao: sessao() },
  T05: { contexto: varzea },
  T06: { contexto: varzea, sessao: sessao(null) },
  T07: { contexto: varzea, sessao: sessao() },
  T08: { contexto: varzea, sessao: sessao(), etapas: { can: { lida: true } } },
  T09: { contexto: varzea, sessao: sessao() },
  T10: { contexto: varzea, sessao: sessao() },
  T11: { contexto: { uoId: 'uo-02', pacote: pacote('pac-uo-02') }, sessao: sessao('a-16', 'M2C-0438') },
  T12: { contexto: varzea, sessao: sessao() },
  T13: { contexto: varzea, sessao: sessao() },
  T14: { contexto: varzea, sessao: sessao() },
  T15: { contexto: varzea, sessao: sessao() },
  T16: { contexto: varzea, sessao: sessao(), etapas: { checklist: { homologada: true } } },
}
