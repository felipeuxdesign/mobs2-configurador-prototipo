// A linha de garagem (folha 4): na folha de trocar de garagem (T04) —
// o pacote de cada uma e quantos ativos ele traz. A atual leva o quadrado
// lima de 11 (Lei 1: escolhido); a vencida leva o traço e o que fazer.
//
// nome, pacote ('carregado há 4 dias'), aviso (só na vencida),
// rotuloContagem ('ATIVOS'), contagem (8),
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
  nome, pacote, aviso, rotuloContagem, contagem, estado = 'disponivel',
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
        {aviso && <span className="ds-garagem-aviso">{aviso}</span>}
      </span>
      <span className="ds-garagem-contagem">
        <span className="ds-garagem-rotulo">{rotuloContagem}</span>
        <span className="ds-garagem-numero">{contagem}</span>
      </span>
    </Tocavel>
  )
}
