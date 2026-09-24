// O encerramento (folha 5 · a cadeia do encerramento, oito passos): os
// passos que fecham a sessão, ligados pelo trilho, no poço de 32. Cada passo:
// o nome e, à direita, a situação (gravados, voltou, relendo, —, pulado).
// A legenda só aparece no passo que corre (quem passa `legenda` é a tela).
// Estados de passo: ok · agora (o que corre) · energia (é com você: o único
// passo em que o técnico age) · espera · pulado (sem homologar: o traço) ·
// xis (a assertiva que falhou).
// `justo`: a tela abre espaço pro corte ou pro sem homologar — o passo baixa
// de --encerramento-passo pra --encerramento-passo-justo.
import { Trilho } from './Trilho.jsx'
import './Encerramento.css'

// C11 · T16/06 (G11): +estado 'pausa' — a cadeia da sessão interrompida, no
// desenho do encerramento: o bloco em que ela parou leva a pausa no poço, o
// nome e o 'parou aqui' em --tinta, como o que corre, e o trilho de baixo fica
// na divisória (o que vem depois não passou).
const TOM = { ok: 'feito', agora: 'corre', energia: 'corre', xis: 'falha', pausa: 'corre' }

export function Encerramento({ passos, justo = false }) {
  return (
    <div className={`ds-encerramento ${justo ? 'ds-encerramento-justo' : ''}`}>
      {passos.map((p, i) => {
        const ultimo = i === passos.length - 1
        return (
          <div key={p.nome} className={`ds-encerramento-passo ds-encerramento-${TOM[p.estado] ?? 'resto'} ${ultimo ? 'ds-encerramento-ultimo' : ''}`}>
            <Trilho estado={p.estado} poco={32} ultimo={ultimo} nomeGlifo={p.nomeGlifo} />
            <div className="ds-encerramento-texto">
              <span className="ds-encerramento-coluna">
                <span className="ds-encerramento-nome">{p.nome}</span>
                {p.legenda != null && <span className="ds-encerramento-legenda">{p.legenda}</span>}
              </span>
              <span className="ds-encerramento-situacao">{p.situacao}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
