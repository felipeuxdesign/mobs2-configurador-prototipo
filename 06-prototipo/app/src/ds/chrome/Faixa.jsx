// A faixa de sessão (folha 2) — uma peça só (G13): 52 (--faixa-sessao),
// flex-shrink 0 e borda de baixo --separador, igual em toda tela com sessão.
// O estado muda o conteúdo, nunca o desenho (Lei 3):
//   aberta     · LED lima, serial, placa e a ação (o ENCERRAR)
//   sem-sessao · LED apagado e só o fato, sem borda
//   falha      · o serial sai, LED e fato em vermelho, traço vermelho de 2 embaixo
// Sem `acao`, é a faixa sem ação (a do encerramento, T16): a mesma casca de
// 52, com a borda (DS-D5). No menu (lugar 'menu') ela tem os mesmos 52, com a
// linha de baixo e a borda de cima --borda-rodape, embaixo da tira; em falha, a
// linha vermelha de 2 nos mesmos 52 (a entrega do checklist: a faixa é uma peça
// só; saiu o traço sobreposto do C5). Sem sessão, no menu, fica a do T04/01, 50
// com a borda de cima e a linha embaixo. 'sem ativo' na placa fica em
// --tinta-apagada (G13). O ENCERRAR tem o desenho de 44 (decisão 38): no
// menu, a 8 da conta; o toque de 48 cresce só pra baixo, dentro da faixa, e na
// faixa do menu em falha ele desce 1, pro mesmo lugar da sem falha (T04/03).
import { Led } from '../primitivos/Marcador.jsx'
import { Camadas } from './Camadas.jsx'
import './Faixa.css'

const LED = { aberta: 'viva', 'sem-sessao': 'sem-sessao', falha: 'falha' }

// `acaoDesabilitada` (G11, a lei 17, *desabilitado é tinta apagada*, diretor 25/09): nos processos, o ENCERRAR
// faz o mesmo que o voltar do Android; onde o voltar não faz nada (a pré-checagem correndo, a atualização do
// firmware, a releitura da CAN, o semear, a recuperação da T09), ele fica desabilitado de verdade e em
// --tinta-apagada, sem o pressionado; o motivo já está escrito na tela
export function Faixa({ estado = 'aberta', lugar = 'tela', serial, placa, semAtivo = false, fato, acao, aoEncerrar, rotuloAcao, forcaToque = false, acaoDesabilitada = false }) {
  return (
    <div className={`ds-faixa ds-faixa-${estado} ${lugar === 'menu' ? 'ds-faixa-menu' : ''}`}>
      <div className="ds-faixa-id">
        <Led estado={LED[estado]} />
        {estado === 'aberta' ? (
          <>
            <span className="ds-faixa-serial">{serial}</span>
            <span className="ds-faixa-divisor" aria-hidden="true" />
            <span className={`ds-faixa-placa ${semAtivo ? 'ds-faixa-sem-ativo' : ''}`}>{placa}</span>
          </>
        ) : (
          <span className="ds-faixa-fato">{fato}</span>
        )}
      </div>
      {acao && (
        <button type="button" className={`ds-faixa-acao ds-com-camadas ${forcaToque ? 'ds-forca-toque' : ''} ${acaoDesabilitada ? 'ds-faixa-acao-desabilitada' : ''}`}
          aria-label={rotuloAcao} onClick={acaoDesabilitada ? undefined : aoEncerrar} disabled={acaoDesabilitada || undefined}>
          <Camadas>{acao}</Camadas>
        </button>
      )}
    </div>
  )
}
