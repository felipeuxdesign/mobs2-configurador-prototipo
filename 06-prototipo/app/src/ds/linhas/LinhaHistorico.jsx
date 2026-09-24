// A linha do histórico (folha 4): uma instalação — a placa, o módulo e a hora,
// o veredito à direita. Tocar abre o detalhe (T12).
//
// placa, detalhe ('M2C-0417 · 11:47'), veredito ('aprovada'),
// estado: o glifo do Glifo no poço de 32 ('ok', 'xis', 'relogio'…)
// rotulo: o nome pro leitor de tela (o texto visível, se faltar) · divisoria
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaHistorico.css'

export function LinhaHistorico({ placa, detalhe, veredito, estado = 'ok', nomeGlifo, aoTocar, rotulo, divisoria = true, className = '' }) {
  return (
    <Tocavel className={`ds-historico ${divisoria ? '' : 'ds-historico-sem-divisoria'} ${className}`} rotulo={rotulo} aoTocar={aoTocar}>
      <Poco tam={32}><Glifo estado={estado} poco={32} nome={nomeGlifo} /></Poco>
      <span className="ds-historico-corpo">
        <span className="ds-historico-placa">{placa}</span>
        <span className="ds-historico-detalhe">{detalhe}</span>
      </span>
      <span className="ds-historico-veredito">{veredito}</span>
    </Tocavel>
  )
}
