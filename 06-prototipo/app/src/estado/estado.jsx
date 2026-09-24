// O estado único do protótipo (06-prototipo/logica.md). Toda tela lê daqui.
// Nasce com a forma completa que as 16 telas pedem (gate C0, TX-13), pra
// nenhuma tela inventar campo depois. Os valores vêm do mock na hora de
// montar — nada é copiado pra dentro dos componentes.
import { createContext, useContext, useReducer } from 'react'
import { M } from '../dados/mock.js'
import { SEMENTES } from './sementes.js'

export function estadoVazio() {
  return {
    tecnico: { nome: M.tecnico.nome, usuario: M.credenciais.usuario },
    contexto: { uoId: null, pacote: null },           // pacote: { id, diasAtras, hora, versao }
    sessao: null,                                     // { moduloSerial, ativoId, saude, abertaAs, meio }
    etapas: {
      preChecagem: null, ativo: null, can: null, cadeia: null, conferencia: null,
      calibracao: null, ciclo: null, checklist: null, encerramento: null,
    },
    fila: [],                                         // os itens que a sessão cria, além de M.filaSaida
    situacao: { rede: M.situacao.rede, sessaoAcesso: M.situacao.sessaoAcesso },
    casosConsumidos: [],                              // cada caso vale uma vez por sessão (G21)
    tela: { id: 'T01', momento: null, estado: null, folha: null },
    antes: null,                                      // o instante de antes de abrir um estado (G19)
  }
}

// Pular direto pra uma tela (o painel, a URL) monta o estado mínimo dela (G21).
export function semeado(tela, extra = {}) {
  const base = estadoVazio(), s = SEMENTES[tela] ?? {}
  return {
    ...base,
    contexto: s.contexto ?? base.contexto,
    sessao: s.sessao ?? base.sessao,
    etapas: { ...base.etapas, ...s.etapas },
    tela: { ...base.tela, id: tela, momento: extra.momento ?? null, estado: extra.estado ?? null },
  }
}

function reduzir(estado, acao) {
  switch (acao.tipo) {
    case 'recomecar': return estadoVazio()
    case 'ir': return { ...estado, antes: null, tela: { id: acao.tela, momento: acao.momento ?? null, estado: acao.estado ?? null, folha: null } }
    case 'pular': return semeado(acao.tela)
    // abrir um estado guarda o instante; trocar de estado não troca o instante guardado
    case 'abrir-estado': return { ...estado, antes: estado.antes ?? { ...estado, antes: null }, tela: { ...estado.tela, estado: acao.estado, momento: null } }
    case 'voltar-ao-fluxo': return estado.antes ?? semeado(estado.tela.id)
    case 'mesclar': return { ...estado, ...acao.parcial }
    default: return estado
  }
}

const Contexto = createContext(null)

export function EstadoProvider({ children, inicial }) {
  const [estado, despachar] = useReducer(reduzir, inicial ?? estadoVazio())
  return <Contexto.Provider value={{ estado, despachar }}>{children}</Contexto.Provider>
}

export function useEstado() {
  const v = useContext(Contexto)
  if (!v) throw new Error('useEstado fora do EstadoProvider')
  return v
}
