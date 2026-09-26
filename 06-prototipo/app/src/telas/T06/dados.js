// T06 · o que a tela lê do mock, na hora de montar. Nada aqui é digitado: os
// ônibus, os modelos, os chassis, as garagens e os casos vêm de M, e as frases
// com dado se montam com o texto do textos.md em volta do valor.
import { M } from '../../dados/mock.js'
import { chaveDeBusca } from '../../dados/formato.js'
import { pacoteDaGaragem } from '../../dados/garagens.js'

// os quadros da T06, pelo nome dos arquivos das referências
export const REF = {
  confirmar: '01-momento-confirmar-o-veiculo',
  divergente: '02-estado-chassi-divergente',
  semChassi: '03-estado-sem-chassi-na-can',
  fora: '04-estado-fora-do-pacote',
  resolvivel: '05-estado-conflito-de-pinos-resolvivel',
  semSaida: '06-estado-conflito-de-pinos-sem-saida',
  corrigida: '07-momento-correcao-solicitada',
  semResultado: '08-momento-busca-sem-resultado', // a busca que não acha nenhum ônibus do pacote (a entrega de 25/09)
  esconde: '09-momento-busca-esconde-a-escolha',  // a busca que acha outros ônibus e esconde o marcado (a otimização do design)
}

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
export const modeloDe = (ativo) => M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId)
export const uoDe = (id) => M.uos.find((u) => u.id === id)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)
const pacoteDe = (id) => M.pacotes.find((p) => p.id === id)

// o pacote da garagem do contexto: os ativos da UO, na ordem do mock (T06-A1, G9: são 10)
export const doPacote = (uoId) => M.ativos.filter((a) => a.uoId === uoId)

// o contador 'no pacote': o que o pacote da garagem diz que trouxe — também o
// pacote que o caso lista-longa-garagens declara pra garagem que só ele tem
// (src/dados/garagens.js, a otimização do design): sincronizada a Olinda, 12
export function contagemDoPacote(contexto, uoId) {
  const p = (contexto.pacote && pacoteDe(contexto.pacote.id)) ?? pacoteDaGaragem(uoId)
  return p?.contem.ativos
}

// o ônibus que o momento 01 mostra quando se abre pela URL: o do módulo da
// sessão, se ele está no pacote (o herói: M2C-0417 → RKT-8H42); senão, o primeiro
export function ativoDoModulo(uoId, sessao) {
  const lista = doPacote(uoId)
  return (lista.find((a) => a.moduloSerial === sessao.moduloSerial) ?? lista[0])?.id ?? null
}

// ── a busca (T06·5 a): placa, frota, módulo esperado e chassi, sem caixa, sem
// acento e sem o hífen da placa. Placa de outro pacote abre o fora do pacote.
const limpa = (s) => chaveDeBusca(s ?? '').replace(/[^a-z0-9]/g, '')
export function filtrar(lista, texto) {
  const q = limpa(texto)
  if (!q) return lista
  return lista.filter((a) => [a.placa, a.frota, a.moduloSerial, a.chassi].some((v) => v && limpa(v).includes(q)))
}
export function placaDeOutroPacote(texto, uoId) {
  const q = limpa(texto)
  return q ? M.ativos.find((a) => a.uoId !== uoId && limpa(a.placa) === q) ?? null : null
}

// ── as checagens, na ordem T06·3: pacote → pinos → chassi ──

// os dois casos de pinos do mock. O conflito vale quando o par da faixa e o
// meio da sessão são os do caso (G28: quem decide é o par módulo × ativo)
const CASOS_PINOS = ['conflito-pinos-resolvivel', 'conflito-pinos-sem-saida']
function conflitoDe(ativoId, sessao) {
  for (const k of CASOS_PINOS) {
    const c = M.casos[k]
    if (c && c.ativoId === ativoId && c.moduloSerial === sessao.moduloSerial && c.meioAtual === sessao.meio) return c
  }
  return null
}
// a saída sem fio existe quando a variante do módulo tem sem fio na matriz
function moduloTemSemFio(serial) {
  const m = moduloDe(serial)
  return Boolean(m && M.matrizCapacidades.find((c) => c.modeloId === m.modeloId && c.variante === m.variante)?.semFio)
}

// o chassi lido: o do caso de divergência, se o ônibus é o dele; senão, o
// próprio cadastro (T06·2 a — não há leitura diferente no mock)
function chassisDe(ativo) {
  const c = M.casos['divergencia-chassi']
  return c && c.ativoId === ativo.id ? { lido: c.chassiLido, cadastro: c.chassiCadastro } : { lido: ativo.chassi, cadastro: ativo.chassi }
}

// a frase da 02 só vale quando o resto bate e os dois últimos estão trocados
export function ultimosTrocados(a, b) {
  const n = a.length
  return n === b.length && n >= 2 && a !== b && a.slice(0, n - 2) === b.slice(0, n - 2) && a[n - 2] === b[n - 1] && a[n - 1] === b[n - 2]
}

const PASSOS = ['pacote', 'pinos', 'chassi']

// O que a confirmação mostra pro ônibus. `desde`: num estado da coluna, o caso
// diz qual checagem falha, e as de antes passam no mundo dele.
export function avaliar(ativo, { uoId, sessao }, desde = 'pacote') {
  const i = PASSOS.indexOf(desde)
  if (i <= 0 && ativo.uoId !== uoId) return { passo: 'fora', garagem: uoDe(ativo.uoId).nome }
  if (i <= 1) {
    const caso = conflitoDe(ativo.id, sessao)
    if (caso) return { passo: moduloTemSemFio(sessao.moduloSerial) ? 'resolvivel' : 'sem-saida', caso }
  }
  if (!modeloDe(ativo).chassiPelaCan) return { passo: 'sem-chassi' }
  const { lido, cadastro } = chassisDe(ativo)
  return { passo: lido === cadastro ? 'confere' : 'diverge', lido, cadastro }
}

// ── o mundo de cada estado da coluna (receitas.js): o ônibus, a checagem que
// falha e a sessão do caso. Quando o caso traz o módulo, a faixa é a dele
// (T06-A10); quando não traz, fica a da semente.
export function mundoDoEstado(est, base) {
  const pinos = (k) => {
    const c = M.casos[k]
    return { ativoId: c.ativoId, desde: 'pinos', uoId: base.uoId, sessao: { ...base.sessao, moduloSerial: c.moduloSerial, meio: c.meioAtual } }
  }
  switch (est) {
    // o 07 é um momento, mas o mundo dele é o do caso do 02 (indice.json: divergencia-chassi):
    // aberto pela URL, ou chegando pelo toque num 02 aberto pela coluna, o ônibus e a checagem são os do caso
    case REF.divergente:
    case REF.corrigida:
      return { ativoId: M.casos['divergencia-chassi'].ativoId, desde: 'chassi', uoId: base.uoId, sessao: base.sessao }
    case REF.semChassi:
      // o modelo que não manda o chassi (ma-02): o primeiro ônibus dele no pacote
      return { ativoId: doPacote(base.uoId).find((a) => !modeloDe(a).chassiPelaCan)?.id, desde: 'pacote', uoId: base.uoId, sessao: base.sessao }
    case REF.fora: {
      const c = M.casos['ativo-fora-pacote']
      return { ativoId: c.ativoId, desde: 'pacote', uoId: pacoteDe(c.pacoteId).uoId, sessao: base.sessao }
    }
    case REF.resolvivel: return pinos('conflito-pinos-resolvivel')
    case REF.semSaida: return pinos('conflito-pinos-sem-saida')
    default: return null
  }
}
