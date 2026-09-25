// O item da seção aberta do checklist (folha 7, a entrega do checklist ·
// decisão 34). Tem seta, toca; sem seta, é leitura (Lei 16). Quatro tipos,
// e a ação da seção, que é o de tocar com o ícone do que ela abre:
//   leitura  · 44, o glifo no poço de 30, o nome em --tinta-forte e o valor à
//              direita — o que o app conferiu, sem seta, não toca (A, C, D, os
//              passos da E, a F). `apagado`: o valor que ainda não veio, em
//              --tinta-apagada ('a fazer', 'espera o envio')
//   tocar    · 50, o ícone no poço de 32 (a câmera, o ciclo), o nome e a
//              legenda empilhados, e a seta: o cartão inteiro é o toque
//   feito    · 50, o check no poço de 32, o nome e de onde veio; sem seta
//   ressalva · o feito que passou com a ressalva, e diz ela embaixo
// O poço na linha (leis de medida): 44 leva 30, 50 leva 32; o glifo e o ícone
// de 16 nos dois (o glifo do poço de 26, como a folha desenha).
// estado (leitura, feito): o glifo pelo dado — ok · pendente (o círculo em
//   --tinta-secundaria) · aguarda (o relógio em --marca-limite) · reprovado ·
//   nsa (o traço, não se aplica)
// icone (tocar): o nome do Icone; sem ele, o glifo do `estado` no poço.
// divisoria: o traço de baixo — quem monta a seção decide (a última não tem).
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './ItemDoChecklist.css'

const GLIFO = { ok: 'ok', pendente: 'espera', aguarda: 'relogio', reprovado: 'xis', nsa: 'traco' }

function GlifoDoItem({ estado, nomeGlifo }) {
  return <Glifo estado={GLIFO[estado] ?? 'ok'} poco={26} nome={nomeGlifo} className={`ds-item-ck-glifo ds-item-ck-glifo-${estado}`} />
}

export function ItemDoChecklist({ tipo = 'leitura', estado = 'ok', icone, nome, valor, legenda, apagado = false, divisoria = true, aoTocar, rotulo, nomeGlifo }) {
  const classes = `ds-item-ck ds-item-ck-${tipo === 'leitura' ? 'leitura' : 'dupla'} ${divisoria ? '' : 'ds-item-ck-sem-divisoria'}`
  if (tipo === 'leitura') {
    return (
      <div className={classes}>
        <Poco tam={30}><GlifoDoItem estado={estado} nomeGlifo={nomeGlifo} /></Poco>
        <span className="ds-item-ck-nome">{nome}</span>
        {valor != null && <span className={`ds-item-ck-valor ${apagado ? 'ds-item-ck-valor-apagado' : ''}`}>{valor}</span>}
      </div>
    )
  }
  const miolo = (
    <>
      <Poco tam={32}>{icone ? <Icone nome={icone} tam={16} cor="secundaria" /> : <GlifoDoItem estado={estado} nomeGlifo={nomeGlifo} />}</Poco>
      <span className="ds-item-ck-texto">
        <span className="ds-item-ck-titulo">{nome}</span>
        {legenda && <span className="ds-item-ck-legenda">{legenda}</span>}
      </span>
    </>
  )
  if (tipo === 'tocar') {
    return (
      <Tocavel className={`${classes} ds-item-ck-tocar`} rotulo={rotulo ?? [nome, legenda].filter(Boolean).join(', ')} aoTocar={aoTocar}>
        {miolo}
        <Icone nome="avancar" tam={16} cor="secundaria" />
      </Tocavel>
    )
  }
  // feito e ressalva: o mesmo desenho, sem seta e sem toque
  return <div className={classes}>{miolo}</div>
}
