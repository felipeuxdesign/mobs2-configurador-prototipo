// T06 · o que a tela lê do mock, na hora de montar. Nada aqui é digitado: os
// ônibus, os modelos, as garagens, a empresa e os casos vêm de M, e as frases
// com dado se montam com o texto do textos.md em volta do valor.
import { M } from '../../dados/mock.js'
import { chaveDeBusca } from '../../dados/formato.js'
import { pacoteDaGaragem } from '../../dados/garagens.js'

// os quadros da T06, pelo nome dos arquivos das referências. O nome do 01 fica
// 'confirmar-o-veiculo': o título passou a *Confirmar o vínculo* (decisão 46), e
// o endereço ?momento= é o do arquivo e do indice.json, que não mudaram
export const REF = {
  confirmar: '01-momento-confirmar-o-veiculo',
  fora: '04-estado-fora-do-pacote',
  resolvivel: '05-estado-conflito-de-pinos-resolvivel',
  semSaida: '06-estado-conflito-de-pinos-sem-saida',
  semResultado: '08-momento-busca-sem-resultado', // a busca que não acha nenhum ônibus do pacote (a entrega de 25/09)
  esconde: '09-momento-busca-esconde-a-escolha',  // a busca que acha outros ônibus e esconde o marcado (a otimização do design)
  outroAtivo: '10-estado-modulo-em-outro-ativo',  // o módulo já está vinculado a outro ativo (o pacote 1)
  jaDeste: '11-estado-modulo-ja-deste-ativo',     // o módulo já é deste ativo: é manutenção (o pacote 1)
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
// sessão, se ele está no pacote (o herói: M2C-0417 → RKT-8H42 — o módulo
// PREVISTO no cadastro, decisão 46); senão, o primeiro
export function ativoDoModulo(uoId, sessao) {
  const lista = doPacote(uoId)
  return (lista.find((a) => a.moduloSerial === sessao.moduloSerial) ?? lista[0])?.id ?? null
}

// ── a busca (T06·5 a): placa, frota, módulo esperado e chassi, sem caixa, sem
// acento e sem o hífen da placa. Placa de outro pacote abre o fora do pacote.
// A busca não se refaz no pacote 1: o chassi segue no cadastro e acha, e
// nenhuma tela o mostra (decisão 46 · a nota no protótipo da tela.md)
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

// ── os dados do modelo (o bloco de baixo do vínculo, decisão 46): o fabricante e
// o modelo, do cadastro do modelo do ativo. O MODELO das referências é o código
// e o tipo — *OF-1621 · ônibus urbano* —, e o mock não tem um campo do tipo: ele
// sai do nome do modelo sem o código, com a primeira letra minúscula, como as
// três referências escrevem (Ônibus urbano OF-1621 → ônibus urbano; Caminhão
// coletor 17.230 → caminhão coletor; Retroescavadeira 580N → retroescavadeira).
// Nenhuma palavra se inventa: o desvio fica nomeado na tela.md, pro arquiteto
export function dadosDoModelo(ativo) {
  const m = modeloDe(ativo)
  const nome = m.nome.endsWith(m.modelo) ? m.nome.slice(0, -m.modelo.length).trim() : m.nome
  const tipo = nome.charAt(0).toLowerCase() + nome.slice(1)
  return { fabricante: m.fabricante, modelo: `${m.modelo} · ${tipo}` }
}

// ── as checagens, na ordem: pacote → pinos → vínculo (T06·3, com o vínculo no
// lugar do chassi, decisão 46) ──

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

const PASSOS = ['pacote', 'pinos', 'vinculo']

// O que a confirmação mostra pro ônibus. `desde`: num estado da coluna, o caso
// diz qual checagem falha, e as de antes passam no mundo dele. `vinculo`: o caso
// do vínculo do mundo do estado (10, 11). No fluxo, o vínculo é sempre novo — a
// instalação nova, o padrão (D1): os dois casos do vínculo caem no par do herói,
// e só abrem pela coluna, nunca pelo serial (logica.md · As portas naturais)
//   · 'novo'        — o módulo fica neste ativo (01)
//   · 'outro-ativo' — o módulo está em outro ativo: a tela avisa (10)
//   · 'ja-deste'    — o módulo já é deste ativo: é manutenção (11)
export function avaliar(ativo, { uoId, sessao }, desde = 'pacote', vinculo = null) {
  const i = PASSOS.indexOf(desde)
  if (i <= 0 && ativo.uoId !== uoId) return { passo: 'fora', garagem: uoDe(ativo.uoId).nome }
  if (i <= 1) {
    const caso = conflitoDe(ativo.id, sessao)
    if (caso) return { passo: moduloTemSemFio(sessao.moduloSerial) ? 'resolvivel' : 'sem-saida', caso }
  }
  if (vinculo?.vinculadoAoAtivoId) return { passo: 'outro-ativo', caso: vinculo, onde: ativoDe(vinculo.vinculadoAoAtivoId) }
  if (vinculo?.modo === 'manutencao') return { passo: 'ja-deste', caso: vinculo }
  return { passo: 'novo' }
}

// ── o mundo de cada estado da coluna (receitas.js): o ônibus, a checagem que
// falha e a sessão do caso. Quando o caso traz o módulo, a faixa é a dele
// (T06-A10); quando não traz, fica a da semente.
export function mundoDoEstado(est, base) {
  const pinos = (k) => {
    const c = M.casos[k]
    return { ativoId: c.ativoId, desde: 'pinos', uoId: base.uoId, sessao: { ...base.sessao, moduloSerial: c.moduloSerial, meio: c.meioAtual } }
  }
  // os dois do vínculo: o módulo é o do caso, o M2C-0417 da faixa, e o ônibus é o
  // dele — no 11, o ativo do caso; no 10, que não traz ativo (o caso só diz onde o
  // módulo está, o a-18), o ônibus do módulo no pacote, o RKT-8H42, como as duas
  // referências desenham (o mesmo do 01 aberto pela URL)
  const vinculo = (k) => {
    const c = M.casos[k]
    const sessao = { ...base.sessao, moduloSerial: c.moduloSerial }
    return { ativoId: c.ativoId ?? ativoDoModulo(base.uoId, sessao), desde: 'vinculo', vinculo: c, uoId: base.uoId, sessao }
  }
  switch (est) {
    case REF.fora: {
      const c = M.casos['ativo-fora-pacote']
      return { ativoId: c.ativoId, desde: 'pacote', uoId: pacoteDe(c.pacoteId).uoId, sessao: base.sessao }
    }
    case REF.resolvivel: return pinos('conflito-pinos-resolvivel')
    case REF.semSaida: return pinos('conflito-pinos-sem-saida')
    case REF.outroAtivo: return vinculo('modulo-em-outro-ativo')
    case REF.jaDeste: return vinculo('modulo-ja-deste-ativo')
    default: return null
  }
}
