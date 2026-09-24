// As peças da calibração (folha 8, T10) — a história da tela: o que o
// módulo conta, a distância até o painel e o número que vai.
import { Glifo } from '../index.js'
import { Tambor } from './Tambor.jsx'
import '../cartoes/caixas.css'   // a caixa de poço é a do aviso e do par comparado (revisão do C2)
import './Calibracao.css'

// O valor em poço: o que o módulo conta. O número é o tambor de texto (G29):
// ao semear, ele rola do número do módulo até o do painel (na troca de
// `valor`, ou com `de` + `valor`). `tom`: 'apagado' antes de semear (tudo em
// --tinta-apagada), 'ativo' depois (T10/01).
export function ValorEmPoco({ rotulo, valor, de, unidade, tom = 'apagado' }) {
  return (
    <div className={`ds-valor-poco ds-caixa-poco ds-valor-poco-${tom}`}>
      <span className="ds-valor-poco-rotulo">{rotulo}</span>
      <span className="ds-valor-poco-numero">
        <Tambor valor={valor} de={de} />{unidade != null && <span className="ds-valor-poco-unidade">{unidade}</span>}
      </span>
    </div>
  )
}

// A régua da diferença: a distância entre os dois, entre dois traços. Depois
// da releitura, vira o "confere", com o check lima solto (Lei 4 · exceção).
export function ReguaDiferenca({ children, confere = false, nomeGlifo }) {
  return (
    <div className="ds-regua">
      <span className="ds-regua-traco" />
      {confere
        ? <span className="ds-regua-texto ds-regua-confere"><Glifo estado="ok" poco={24} nome={nomeGlifo} />{children}</span>
        : <span className="ds-regua-texto">{children}</span>}
      <span className="ds-regua-traco" />
    </div>
  )
}

// O valor alvo: o número do painel, o que vai pro módulo. O poço com o traço
// lima embaixo, o rótulo da prova em lima (Lei 1), o número de 48 e a frase.
// `cumprido` (C9 · T10/01, G11): depois de semear e reler, o alvo já foi — o
// traço lima sai (fica a borda do poço) e o rótulo apaga.
export function ValorAlvo({ rotulo, valor, unidade, legenda, cumprido = false }) {
  return (
    <div className={`ds-valor-alvo ds-caixa-poco ${cumprido ? 'ds-valor-alvo-cumprido' : ''}`}>
      <span className="ds-valor-alvo-rotulo">{rotulo}</span>
      <span className="ds-valor-alvo-numero">
        {valor}{unidade != null && <span className="ds-valor-alvo-unidade">{unidade}</span>}
      </span>
      {legenda != null && <span className="ds-valor-alvo-legenda">{legenda}</span>}
    </div>
  )
}
