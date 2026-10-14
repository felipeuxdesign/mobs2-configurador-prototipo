// Folha 10 · o modo claro (o pacote 30, 12/10): o interruptor nos dois estados — desligado no escuro,
// ligado no claro —, como a folha desenha, e as peças de todo dia no claro, nascidas dos tokens (R-17):
// o primário com o texto branco, o confere em roxo, o avatar da conta. O claro de cada espécime é o
// mesmo data-tema="claro" da raiz do app, aqui numa caixa só (Claro). A folha 10 desenha a moldura
// sólida da folha 9, que a régua dos espécimes (scripts/especime.mjs) não lê: ficam fora da bancada
// (semBancada), conferidos pela T04/05 e pela volta do roteiro `claro` pelas telas.
import { useState } from 'react'
import { Interruptor, Primario, Glifo, Poco, Avatar, CartaoDaConta, BotaoSecundario } from '../../ds/index.js'

const nada = () => {}
function Claro({ children }) {
  return <div data-tema="claro" className="vitrine-claro">{children}</div>
}
function InterruptorVivo({ inicial }) {
  const [ligado, setLigado] = useState(inicial)
  return <Interruptor rotulo="Modo claro" ligado={ligado} aoTrocar={setLigado} />
}

export const especimes = [
  { id: 'f10-interruptor-desligado', folha: 10, semBancada: true, rotulo: 'o interruptor · desligado, no escuro',
    legenda: 'trilho de 52 × 32 · o contorno de 2 e a bolinha de 16 a 8 da borda, em --marca-limite, sobre o --poco · toque: liga',
    render: () => <InterruptorVivo inicial={false} /> },
  { id: 'f10-interruptor-ligado', folha: 10, semBancada: true, rotulo: 'o interruptor · ligado, no claro',
    legenda: 'o trilho --roxo cheio e a bolinha de 24 em --texto-primario, a 4 da borda · apertando, a bolinha cresce pra 28',
    render: () => <Claro><InterruptorVivo inicial /></Claro> },
  { id: 'f10-primario-claro', folha: 10, semBancada: true, rotulo: 'o primário · no claro',
    legenda: 'o mesmo roxo, com o texto em --texto-primario: branco no claro, lima no escuro',
    render: () => <Claro><Primario aoTocar={nada}>Configurar módulo</Primario></Claro> },
  { id: 'f10-confere-claro', folha: 10, semBancada: true, rotulo: 'o confere · no claro',
    legenda: 'o --lima do claro é um roxo: o veredito, o escolhido e os preenchimentos',
    render: () => <Claro><Poco tam={30}><Glifo estado="ok" poco={30} /></Poco></Claro> },
  { id: 'f10-conta-claro', folha: 10, semBancada: true, rotulo: 'o avatar da conta · no claro',
    legenda: 'o cartão redondo: fundo --fundo-cartao e contorno --borda, branco com contorno lilás no claro',
    render: () => <Claro><CartaoDaConta iniciais="RV" nome="Rafael Vieira" detalhe="r.vieira · Viação Atlântico Sul" /></Claro> },
  // o pacote 34: o secundário, um degrau fora do cartão, e o poço mais fundo
  { id: 'f10-secundario-claro', folha: 10, semBancada: true, rotulo: 'o botão secundário · no claro',
    legenda: 'o fill --fundo-botao, um degrau fora do cartão branco, e a borda --borda-botao · desligado, sem o fill',
    render: () => <Claro><div className="vitrine-coluna"><BotaoSecundario>Ressincronizar e reenviar</BotaoSecundario><BotaoSecundario desabilitado>Ressincronizar e reenviar</BotaoSecundario></div></Claro> },
  { id: 'f10-poco-claro', folha: 10, semBancada: true, rotulo: 'o poço · no claro',
    legenda: 'o --poco mais fundo, a sombra de cima (--poco-fundo) mais escura e a luz de baixo (--borda-poco) em branco: afundado no cartão',
    render: () => <Claro><Poco tam={30}><Glifo estado="traco" poco={30} /></Poco></Claro> },
]
