// A busca da T05, lida do mock na hora de montar (G7). Nenhum número mora
// aqui: os módulos por perto, o meio, o modelo, a variante e o firmware saem
// de M. A T05 só conecta (decisão 44): o que o módulo é e como ele está, o
// diagnóstico mostra logo depois (T07).
import { M } from '../../dados/mock.js'

// ── a busca (AC-06) ──
// os módulos por perto, na ordem da referência, o herói primeiro (gate P·C6)
export const porPerto = () => M.situacao.porPerto
export const HEROI = M.situacao.porPerto[0].serial
// o 02 · só um por perto: a busca em que só o herói responde (o primeiro da lista)
export const soOHeroi = () => M.situacao.porPerto.slice(0, 1)
export const meioDe = (serial) => M.situacao.porPerto.find((p) => p.serial === serial)?.meio ?? null

export const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial) ?? null
export const cadastrado = (serial) => moduloDe(serial) != null
// o que o módulo informa na busca: o do cadastro, ou — fora do cadastro — o que ele
// mesmo diz (a errata do pacote 1, M.naBuscaForaCadastro: o M2C-0999 aparece na lista
// da T05/01 como os outros, e a trava do serial é no diagnóstico, T07/02)
// — e, na lista de escolha (T05/01), todo módulo por perto se escolhe e conecta
const informado = (serial) => moduloDe(serial) ?? M.naBuscaForaCadastro[serial]
const modeloDe = (mod) => M.modelos.find((m) => m.id === mod.modeloId)

// 'VL06 · CAN-BT': o modelo e a variante, na linha da busca
export const varianteNaLista = (serial) => { const m = informado(serial); return `${modeloDe(m).nome} · ${m.variante}` }
// o pacote 7: o firmware saiu das linhas da T05 — é do diagnóstico (T07)

// a sessão que nasce na conexão (logica.md · O estado único; o padrão aprovado no gate do
// pacote 1): o módulo, sem ativo ainda, aberta na hora nominal, com o meio em que a busca o
// achou. A faixa ainda não desce: desce na T07, quando as sete linhas passam sem trava
export const sessaoNova = (serial) => ({ moduloSerial: serial, ativoId: null, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: meioDe(serial) })

// ── C7 · os estados da busca ──
export const CASO_BUSCA_VAZIA = 'busca-vazia'
export const CASO_CONEXAO = 'conexao-falha'
// Os casos que a conexão lê: só a falha ao conectar (04), que acontece uma vez por
// sessão (G21, casosConsumidos). O que é fato do cadastro — o serial, o driver, a
// matriz — trava no diagnóstico (T07), toda vez que o módulo conecta
const CASOS_T05 = [CASO_CONEXAO]
const UMA_VEZ = new Set([CASO_CONEXAO])
const serialDoCaso = (id) => M.casos[id].moduloSerial ?? null
// os casos da T05 que valem agora pra um módulo, na sessão do estado único
export const casosDoModulo = (serial, consumidos = []) =>
  CASOS_T05.filter((k) => serialDoCaso(k) === serial && !(UMA_VEZ.has(k) && consumidos.includes(k)))

// 03 · a busca vazia: quanto durou (AC-18) e qual tentativa
export const buscaVazia = () => M.casos[CASO_BUSCA_VAZIA]
// 04 · a conexão que falha: o módulo do caso no lugar do escolhido (o do herói), os outros quatro por perto
export const serialDaFalha = () => M.casos[CASO_CONEXAO].moduloSerial
export const pertoComFalha = () => M.situacao.porPerto.map((p, i) => (i === 0 ? { serial: serialDaFalha() } : p))
