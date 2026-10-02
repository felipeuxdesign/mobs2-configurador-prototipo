// Folha 4 · os cartões de ferramenta do menu, o aviso nos quatro usos, o
// vazio declarado, as notas e o par comparado. Texto exato da folha.
import { CartaoFerramenta, GradeFerramentas, Aviso, Vazio, Nota, ParComparado, DadosDoModelo } from '../../ds/cartoes/index.js'

export const especimes = [
  // cartões de ferramenta · o menu
  { id: 'f4-cartao-disponivel', folha: 4, rotulo: 'disponível', legenda: 'ícone em poço · nome embaixo',
    render: () => <GradeFerramentas><CartaoFerramenta icone="can" titulo="Dados da CAN" /></GradeFerramentas> },
  { id: 'f4-cartao-decide-agora', folha: 4, rotulo: 'decide agora', legenda: 'borda lima · o próximo passo',
    render: () => <CartaoFerramenta largo estado="decide" icone="conectar" poco={34} titulo="CONECTAR MÓDULO" valor="toque para procurar" /> },
  { id: 'f4-cartao-espera', folha: 4, rotulo: 'espera', legenda: 'tracejado · a causa no lugar da ação',
    render: () => <GradeFerramentas><CartaoFerramenta estado="espera" titulo="Dados da CAN" causa="espera módulo e ativo" /></GradeFerramentas> },
  { id: 'f4-cartao-conectado', folha: 4, rotulo: 'conectado', legenda: 'o cartão largo com o serial',
    render: () => <CartaoFerramenta largo icone="conectar" titulo="CONECTAR MÓDULO" valor="M2C-0417" /> },
  { id: 'f4-cartao-com-pendencia', folha: 4, rotulo: 'com pendência', legenda: 'o contador no canto, igual ao da fila',
    render: () => <GradeFerramentas><CartaoFerramenta icone="checklist" titulo="Finalizar com checklist" contagem={10} /></GradeFerramentas> },
  { id: 'f4-cartao-espera-a-rede', folha: 4, rotulo: 'espera a rede', legenda: 'sem conexão · fundo apagado, borda sólida, traço no poço',
    render: () => <GradeFerramentas><CartaoFerramenta estado="sem-rede" titulo="Últimas instalações" causa="sem conexão" /></GradeFerramentas> },

  // o aviso · um formato, quatro usos
  { id: 'f4-aviso-falha', folha: 4, rotulo: 'falha', legenda: 'traço vermelho embaixo',
    render: () => <Aviso glifo="sem-sinal" poco={24} titulo="SEM RESPOSTA DO MÓDULO" frase="Reconecte para seguir da sexta." /> },
  { id: 'f4-aviso', folha: 4, rotulo: 'aviso', legenda: 'o mesmo desenho, cinza, sem traço',
    render: () => <Aviso tom="neutro" glifo="sem-sinal-neutro" titulo="SEM CONEXÃO" frase="Esta é a consulta das 11:47." /> },
  { id: 'f4-aviso-processo-parado', folha: 4, rotulo: 'processo parado', legenda: 'o veredito de uma cadeia ou de um download',
    render: () => <Aviso glifo="xis" titulo="A CADEIA PAROU" frase="Cercas foi recusado. Os três seguintes nem começaram." /> },
  { id: 'f4-aviso-com-contagem', folha: 4, rotulo: 'com contagem', legenda: 'quantos não bateram, à direita',
    render: () => <Aviso glifo="xis" titulo="NÃO BATE COM O CADASTRO" numero={5} unidade="de 5" /> },

  // vazio, comparação
  { id: 'f4-vazio-declarado', folha: 4, rotulo: 'vazio declarado', legenda: 'tracejado · título e uma frase · sem ícone',
    render: () => <Vazio titulo="Nada esperando envio" frase="O último item subiu às 14:02." /> },
  { id: 'f4-nota-tracejada', folha: 4, rotulo: 'nota tracejada', legenda: 'o que falta explicar, sem ser aviso',
    render: () => <Nota antesDoRodape titulo="NENHUM OUTRO POR PERTO" frase="Se não for este, aproxime o aparelho do módulo e procure de novo." /> },
  { id: 'f4-nota-com-rotulo', folha: 4, rotulo: 'nota com rótulo', legenda: 'o fato declarado, com o nome dele em cima',
    render: () => <Nota tom="fato" titulo="SEM CHASSI NA CAN" frase="Este modelo não manda o chassi. O vínculo fica pela sua confirmação, e ela entra na evidência." /> },
  { id: 'f4-par-comparado', folha: 4, rotulo: 'o par comparado', legenda: 'lido × cadastro',
    render: () => (
      <ParComparado
        lido={{ titulo: 'CHASSI LIDO DO VEÍCULO', valor: '9BM384067GB120471' }}
        cadastro={{ titulo: 'NO CADASTRO', valor: '9BM384067GB120417' }}
        explicacao="Os dois últimos dígitos estão trocados de lugar — erro de digitação no cadastro."
      />
    ) },
  // os dados do modelo (o pacote 1 · decisão 46): o bloco de baixo do vínculo, como a T06/01
  { id: 'f4-dados-do-modelo', folha: 4, rotulo: 'os dados do modelo', legenda: 'rótulo em cima, valor grande · no vínculo',
    render: () => (
      <DadosDoModelo antesDoRodape frase="O M2C-0417 fica neste ativo, na Viação Atlântico Sul."
        dados={[{ rotulo: 'FABRICANTE', valor: 'Mercedes-Benz' }, { rotulo: 'MODELO', valor: 'OF-1621 · ônibus urbano' }]} />
    ) },
]
