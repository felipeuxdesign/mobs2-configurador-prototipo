// A faixa de sessão (folha 2) — uma peça só (G13): 52 (--faixa-sessao),
// flex-shrink 0 e borda de baixo --separador, igual em toda tela com sessão.
// O estado muda o conteúdo, nunca o desenho (Lei 3):
//   aberta     · LED lima, serial, placa e a ação (o ENCERRAR)
//   sem-sessao · LED apagado e só o fato, sem borda
//   falha      · o serial sai, LED e fato em vermelho, traço vermelho de 2 embaixo
// Sem `acao`, é a faixa sem ação (a do encerramento, T16): a mesma casca de
// 52, com a borda (DS-D5). No menu (lugar 'menu') ela tem 50 (--faixa-sessao-menu)
// e borda de cima --borda-rodape, embaixo da tira. 'sem ativo' na placa fica em
// --tinta-apagada (G13).
import { Led } from '../primitivos/Marcador.jsx'
import { Camadas } from './Camadas.jsx'
import './Faixa.css'

const LED = { aberta: 'viva', 'sem-sessao': 'sem-sessao', falha: 'falha' }

export function Faixa({ estado = 'aberta', lugar = 'tela', serial, placa, semAtivo = false, fato, acao, aoEncerrar, rotuloAcao, forcaToque = false }) {
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
        <button type="button" className={`ds-faixa-acao ds-com-camadas ${forcaToque ? 'ds-forca-toque' : ''}`} aria-label={rotuloAcao} onClick={aoEncerrar}>
          <Camadas>{acao}</Camadas>
        </button>
      )}
    </div>
  )
}
