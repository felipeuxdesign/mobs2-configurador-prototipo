// O aviso (folha 4, Lei 7 e R-08): um formato só — poço, rótulo, uma frase —
// em quatro usos: falha, aviso, processo parado e com contagem. A falha acende
// o traço vermelho embaixo e o rótulo em vermelho (Lei 2); o aviso neutro é o
// mesmo desenho, cinza, sem traço. Com contagem, o número vai à direita, com a
// unidade junto (Lei 10). O glifo é o de estado da folha 3, pelo nome.
// `semPoco`: a exceção da Lei 7 — o aviso da folha de trocar de unidade
// (T04/08) é só o rótulo e a frase, com 12 em volta e a frase a 1,4 (G11).
import { Poco, Glifo } from '../index.js'
import './caixas.css'
import './Aviso.css'

// `mudo` (C4 · T03, G15; padrão desde o fechamento do C4): o glifo do aviso fica mudo pro leitor — o rótulo e a
// frase já dizem o que houve. Desligado, nada muda.
// `tom` 'veredito' (C11 · T11/02, G11): o com contagem quando tudo confere — o
// rótulo de topo em lima, sem poço, 12 · 14 em volta e o traço lima embaixo
// (Lei 1: é veredito). A contagem à direita é a mesma.
// `bloqueio` (C11 · T16/05, G11 e G12 · a exceção da Lei 7): o que ficou
// bloqueado, sem poço — o rótulo de topo, 14 em volta, 6 entre o rótulo e a
// frase, e a frase de duas orações em --tinta-secundaria (A HOMOLOGAÇÃO FICA
// BLOQUEADA). Com o tom 'falha', o traço vermelho embaixo é o de sempre.
// `traco` (o mundo real · T01/14, G11): o aviso neutro com o traço embaixo, em
// cinza — o que falta é do mundo, não um erro do técnico (SEM CONEXÃO, no
// login). O desenho é o do aviso; só o traço de baixo acende, na cor do rótulo.
// Com contagem (a entrega do checklist · a folha 4 e a T11/00 e 01): o poço de
// 32, com o glifo de 16 (o tamanho do glifo do poço de 26) — o aviso tem o poço
// dele, e a lei do poço na linha não vale pra ele.
const CONTAGEM = { poco: 32, glifo: 26 }
export function Aviso({ tom = 'falha', glifo = 'xis', poco = 26, nomeGlifo, titulo, frase, numero, unidade, semPoco = false, bloqueio = false, traco = false, mudo = true }) {
  const falha = tom === 'falha'
  const veredito = tom === 'veredito'
  const contagem = numero != null
  const tamPoco = contagem ? CONTAGEM.poco : poco
  const tamGlifo = contagem ? CONTAGEM.glifo : poco
  return (
    <div className={`ds-aviso ds-caixa-poco ${falha ? 'ds-caixa-falha ds-aviso-falha' : ''} ${semPoco ? 'ds-aviso-sem-poco' : ''} ${veredito ? 'ds-aviso-veredito' : ''} ${bloqueio ? 'ds-aviso-bloqueio' : ''} ${traco && !falha ? 'ds-aviso-traco' : ''}`}>
      {!semPoco && !veredito && !bloqueio && <Poco tam={tamPoco} aria-hidden={mudo ? 'true' : undefined}><Glifo estado={glifo} poco={tamGlifo} nome={nomeGlifo} /></Poco>}
      <span className="ds-aviso-texto">
        <span className="ds-aviso-titulo">{titulo}</span>
        {frase != null && <span className="ds-aviso-frase">{frase}</span>}
      </span>
      {numero != null && (
        <span className="ds-aviso-numero">{numero} {unidade != null && <span className="ds-aviso-unidade">{unidade}</span>}</span>
      )}
    </div>
  )
}
