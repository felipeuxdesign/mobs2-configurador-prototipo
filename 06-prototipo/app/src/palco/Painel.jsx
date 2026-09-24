// O painel (palco.md, decisão 25): em duas partes — o caminho, na ordem do
// fluxo, e as consultas —, e no pé o Recomeçar do login, sem confirmação.
// Desliza da esquerda por cima de tudo; fecha no X, tocando fora ou com Esc.
// No modo estreito ele leva o Voltar ao fluxo, no topo, e a etiqueta, no pé (G19).
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Undo2 } from 'lucide-react'
import { NOMES, CAMINHO, CONSULTAS } from './telas.js'
import { VERSAO } from './versao.js'

function Linha({ id, aberta, aoIr }) {
  return (
    <button type="button" className={`painel-linha ${aberta ? 'painel-linha-aberta' : ''}`} aria-current={aberta ? 'page' : undefined} onClick={() => aoIr(id)}>
      <span className="painel-codigo">{id}</span><span className="painel-nome">{NOMES[id]}</span>
    </button>
  )
}

export function Painel({ aberto, tela, aoIr, aoFechar, aoRecomecar, estreito, numEstado, aoVoltar }) {
  useEffect(() => {
    if (!aberto) return
    const esc = (e) => { if (e.key === 'Escape') aoFechar() }
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc)
  }, [aberto, aoFechar])
  return (
    <>
      <div className={`painel-fora ${aberto ? 'painel-fora-aberto' : ''}`} onClick={aoFechar} aria-hidden="true" />
      <nav className={`painel ${aberto ? 'painel-aberto' : ''}`} aria-label="Telas do protótipo" aria-hidden={!aberto} inert={aberto ? undefined : ''}>
        <div className="painel-cabeca">
          <span className="painel-titulo"><span className="palco-rotulo">PROTÓTIPO</span><span className="painel-telas">Telas</span></span>
          <button type="button" className="painel-x" aria-label="Fechar" onClick={aoFechar}><X aria-hidden="true" className="palco-icone-16" /></button>
        </div>
        {estreito && numEstado && (
          <button type="button" className="coluna-voltar painel-voltar" onClick={aoVoltar}><Undo2 aria-hidden="true" className="palco-icone-14" />Voltar ao fluxo</button>
        )}
        <div className="painel-lista">
          <div className="painel-parte">O CAMINHO</div>
          {CAMINHO.map((id) => <Linha key={id} id={id} aberta={id === tela} aoIr={aoIr} />)}
          <div className="painel-parte">AS CONSULTAS</div>
          {CONSULTAS.map((id) => <Linha key={id} id={id} aberta={id === tela} aoIr={aoIr} />)}
        </div>
        <button type="button" className="painel-recomecar" onClick={aoRecomecar}>Recomeçar do login</button>
        {estreito && <span className="painel-etiqueta">{VERSAO.ciclo} · {VERSAO.data}</span>}
      </nav>
    </>
  )
}
