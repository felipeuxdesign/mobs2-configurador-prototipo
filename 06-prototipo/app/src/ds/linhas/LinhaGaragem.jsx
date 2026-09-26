// A linha de unidade (folha 4, que ainda a rotula 'linha de garagem'; o nome
// interno fica, decisão 37): na folha de trocar de unidade (T04) —
// o pacote de cada uma e quantos ativos ele traz. A atual leva o quadrado
// lima de 11 (Lei 1: escolhido); a vencida leva o traço e diz só a causa, no
// lugar do pacote ('pacote vencido há 8 dias', a folha 4 da entrega do
// checklist: saiu o que fazer embaixo, o `aviso`).
//
// nome, pacote ('carregado há 4 dias'), rotuloContagem ('ATIVOS'), contagem (8),
// estado: 'disponivel' · 'atual' · 'vencida' (não se escolhe) ·
//   'espera' (não se escolhe agora: o traço, o nome apagado e, no lugar do
//   pacote, o que ela espera; a contagem fica como está · T04/08, G11)
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar), divisoria
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Quadrado } from '../primitivos/Marcador.jsx'
import './LinhaGaragem.css'

export function LinhaGaragem({
  nome, pacote, rotuloContagem, contagem, estado = 'disponivel',
  aoTocar, rotulo, nomeGlifo, divisoria = true, className = '',
}) {
  const travada = estado === 'vencida' || estado === 'espera'
  return (
    <Tocavel
      className={`ds-garagem ds-garagem-${estado} ${divisoria ? '' : 'ds-garagem-sem-divisoria'} ${className}`}
      role="radio" aria-checked={estado === 'atual'}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={travada}
    >
      <Poco tam={30}>{travada ? <Glifo estado="traco" nome={nomeGlifo} /> : <Quadrado escolhido={estado === 'atual'} />}</Poco>
      <span className="ds-garagem-corpo">
        <span className="ds-garagem-nome">{nome}</span>
        <span className="ds-garagem-pacote">{pacote}</span>
      </span>
      <span className="ds-garagem-contagem">
        <span className="ds-garagem-rotulo">{rotuloContagem}</span>
        <span className="ds-garagem-numero">{contagem}</span>
      </span>
    </Tocavel>
  )
}
