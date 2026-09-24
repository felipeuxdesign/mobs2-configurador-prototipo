// O estado único do protótipo (06-prototipo/logica.md). Toda tela lê daqui.
// Nasce com a forma completa que as 16 telas pedem (gate C0, TX-13), pra
// nenhuma tela inventar campo depois. Os valores vêm do mock na hora de
// montar — nada é copiado pra dentro dos componentes.
import { createContext, useContext, useReducer } from 'react'
import { M } from '../dados/mock.js'

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
  }
}

function reduzir(estado, acao) {
  switch (acao.tipo) {
    case 'recomecar': return estadoVazio()
    case 'ir': return { ...estado, tela: { id: acao.tela, momento: acao.momento ?? null, estado: acao.estado ?? null, folha: null } }
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
