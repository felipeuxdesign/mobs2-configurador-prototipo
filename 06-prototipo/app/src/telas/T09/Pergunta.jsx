// A pergunta pelos dependentes (o retorno do PM de 09/10 · T09/10, 14 e 15): depois que o bloco
// reenviado confere, o app pergunta por cada um que depende dele, um por vez, na ordem do script —
// numerado, com o motivo, o Reenviar e o Deixar para depois. O Reenviar de um só liga quando o de
// cima confere ou fica para depois (o *libera depois do leitor* diz por quê); ao ligar, ele acende
// no lugar, em 150. O deixado para depois fica marcado *falta reenviar*, no lugar dos botões.
// Nenhuma folha desenha esta peça: ela é da tela (como o BotaoDaLinha), montada com os tokens do
// cartão (o fundo, a borda, o raio) e das linhas de detalhe, e entra ao vivo esmaecendo em 150.
import { BotaoDaLinha } from '../comum/BotaoDaLinha.jsx'
import { T } from './textos.js'

// itens: [{ bloco, rotulo, motivo, decisao: null | 'depois', liberado }]
export function Pergunta({ itens, surge = false, aoReenviar, aoDeixar }) {
  return (
    <div className={`t09-pergunta ${surge ? 't09-pergunta-surge' : ''}`}>
      {itens.map((it, i) => (
        <div key={it.bloco} className="t09-pergunta-item">
          <span className="t09-pergunta-nome">{T.numerado(i + 1, it.rotulo)}</span>
          <span className="t09-pergunta-motivo">{it.motivo}</span>
          {it.decisao === 'depois'
            ? <span className="t09-pergunta-depois">{T.faltaReenviarValor}</span>
            : (
              <div className="t09-pergunta-acoes">
                {/* a chave muda quando liga: o botão aceso esmaece no lugar (150), sem animar a cor */}
                <span key={it.liberado ? 'aceso' : 'apagado'} className={it.liberado && it.acendeu ? 't09-pergunta-acende' : undefined}>
                  <BotaoDaLinha tam="pergunta" desabilitado={!it.liberado} aoTocar={() => aoReenviar(it.bloco)}>{T.reenviar[it.bloco]}</BotaoDaLinha>
                </span>
                <button type="button" className="t09-pergunta-deixar" onClick={() => aoDeixar(it.bloco)}
                  aria-label={`${T.deixarParaDepois}: ${it.rotulo}`}>{T.deixarParaDepois}</button>
              </div>
            )}
        </div>
      ))}
    </div>
  )
}
