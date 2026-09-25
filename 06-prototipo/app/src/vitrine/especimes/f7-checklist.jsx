// Folha 7 · checklist, evidência e processo. Os textos são os da folha.
// Os três mostradores são uma peça com três estados; a foto, uma peça com
// dois. Os cartões de valor, com barra, de configuração e de foto são a
// família de cartão da seção aberta — que se compõe com eles.
// As peças de outra família entram compostas: a Lista e a cabeça da seção
// (linhas, folha 4) e o cartão de ferramenta com o contador (cartões, folha 4).
import {
  LinhaSecaoMapa, SecaoChecklist, CartaoValor, GradeCartoes, CartaoFoto, FotoProva,
  Mostrador, BlocoEvento, LinhaFila, LinhaRechecagem, Prova,
} from '../../ds/checklist/index.js'
import { Lista } from '../../ds/linhas/index.js'
import { CartaoFerramenta, GradeFerramentas } from '../../ds/cartoes/index.js'

// a moldura de meia largura da folha: as duas colunas do menu, com a folga de 12
const meia = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--e-12)' }

const identificacao = () => (
  <GradeCartoes colunas={2}>
    <CartaoValor nome="SERIAL DO MÓDULO" valor="M2C-0417" medida="traco" />
    <CartaoValor nome="FIRMWARE" valor="v4.2.1" medida="traco" />
    <CartaoValor nome="ATIVO VINCULADO" valor="RKT-8H42" medida="traco" />
    <CartaoValor nome="CHASSI" valor="confere" />
  </GradeCartoes>
)

export const especimes = [
  // ── o checklist
  { id: 'f7-linha-secao-mapa', folha: 7, rotulo: 'linha de seção do mapa', legenda: 'o veredito · a contagem · o chevron',
    render: () => <Lista><LinhaSecaoMapa estado="aprovada" titulo="A · Identificação" contagem="4 de 4" /></Lista> },
  { id: 'f7-cartoes-valor', folha: 7, rotulo: 'cartões de valor', legenda: 'o valor que veio de outra tela', render: identificacao },
  { id: 'f7-cartao-barra', folha: 7, rotulo: 'cartão com barra', legenda: 'o instrumento em meia largura',
    render: () => (
      <div style={meia}>
        <CartaoValor nome="ALIMENTAÇÃO" valor="13,8" unidade="V" medida={{ min: 10, max: 16, faixa: [12, 15], valor: 13.8 }} />
      </div>
    ) },
  { id: 'f7-cartao-configuracao', folha: 7, rotulo: 'cartão de configuração', legenda: 'Seção D · o valor que veio da cadeia',
    render: () => <div style={meia}><CartaoValor nome="LIMPEZA" valor="feita" /></div> },
  { id: 'f7-cartoes-foto', folha: 7, rotulo: 'cartões de foto', legenda: 'visor de 46 · o nome embaixo',
    render: () => (
      <GradeCartoes colunas={3}>
        <CartaoFoto nome="Módulo" />
        <CartaoFoto nome="Antena GPS" />
        <CartaoFoto nome="Chicote" />
        <CartaoFoto nome="Leitor" />
        <CartaoFoto nome="Painel" tirada />
      </GradeCartoes>
    ) },
  { id: 'f7-secao-aberta', folha: 7, rotulo: 'a seção aberta inteira', legenda: 'a cabeça e os cartões, como abrem no acordeão',
    render: () => <SecaoChecklist estado="aprovada" titulo="A · Identificação" contagem="4 de 4" aberta>{identificacao()}</SecaoChecklist> },

  // ── evidência
  // a entrega de 25/09 (decisão 33): a que se tira é o cartão tocável, com a câmera e a seta; a tirada, o registro no lugar
  { id: 'f7-foto-a-tirar', folha: 7, rotulo: 'foto · a tirar', legenda: 'tocável, com a câmera · a legenda diz pra que ela serve',
    render: () => <FotoProva titulo="Fotografar o painel" legenda="é a prova do número — vale no checklist" aoTocar={() => {}} /> },
  { id: 'f7-foto-tirada', folha: 7, rotulo: 'foto · tirada', legenda: 'vira o registro no lugar, e deixa de ser tocável · diz onde mais ela vale',
    render: () => <FotoProva tirada titulo="Painel fotografado às 14:31" legenda="vale também no checklist, na Seção B" /> },
  { id: 'f7-mostrador-apagado', folha: 7, rotulo: 'mostrador · apagado', legenda: 'tracejado · o traço no lugar do valor',
    render: () => <Mostrador estado="apagado" valor="—" nome="Ignição" /> },
  { id: 'f7-mostrador-relendo', folha: 7, rotulo: 'mostrador · relendo', legenda: 'acende quando o sinal responde',
    render: () => <Mostrador estado="relendo" valor="ligada" nome="Ignição" /> },
  { id: 'f7-mostrador-aceso', folha: 7, rotulo: 'mostrador · aceso', legenda: 'o nome com altura de duas linhas',
    render: () => <Mostrador estado="aceso" valor="ligada" nome="Ignição" /> },
  { id: 'f7-cartoes-esperam-ciclo', folha: 7, rotulo: 'cartões que esperam o ciclo', legenda: 'Seção E · o traço até o veículo andar',
    render: () => (
      <GradeCartoes colunas={2}>
        <CartaoValor aguarda nome="IGNIÇÃO LIGADA" valor="—" medida="traco" />
        <CartaoValor aguarda nome="MOVIMENTO" valor="—" medida="traco" />
        <CartaoValor aguarda nome="RÉ ACIONADA" valor="—" medida="traco" />
        <CartaoValor aguarda nome="PORTA ABERTA" valor="—" medida="traco" />
        <CartaoValor aguarda nome="IGNIÇÃO DESLIGADA" valor="—" medida="traco" />
      </GradeCartoes>
    ) },

  // ── processo e prova
  { id: 'f7-bloco-evento', folha: 7, rotulo: 'bloco do evento', legenda: 'o que foi disparado e recebido',
    render: () => (
      <BlocoEvento rotulo="EVENTO DE TESTE" linhas={[
        { texto: 'disparado pelo app', estado: 'feito', valor: '14:30' },
        { texto: 'recebido no servidor', estado: 'aguarda' },
        { texto: 'campos conferidos', estado: 'aguarda' },
      ]} />
    ) },
  { id: 'f7-linha-fila', folha: 7, rotulo: 'linha da fila', legenda: 'o que sobe e quando',
    render: () => <LinhaFila estado="ok" titulo="Evidências" legenda="RSW-9L02 · recebida" quando="ontem 10:05" /> },
  { id: 'f7-linha-rechecagem', folha: 7, rotulo: 'linha da re-checagem', legenda: 'a Seção F esperando o servidor',
    render: () => <LinhaRechecagem titulo="RVM-1E54" legenda="recebimento pendente" prazo="confere em 24 h" /> },
  // na T09 a prova é o último bloco antes do rodapé: a folga de 16 vem junto (folha 7)
  { id: 'f7-prova-cadeia', folha: 7, rotulo: 'prova da cadeia', legenda: 'a versão gravada e relida',
    render: () => <Prova tipo="cadeia" rotulo="GRAVADO E RELIDO" versao="A12.G07.L02.E05.C03" legenda="o módulo devolveu os seis blocos" style={{ marginBottom: 'var(--respiro)' }} /> },
  { id: 'f7-prova-sessao', folha: 7, rotulo: 'prova da sessão', legenda: 'o que sobreviveu ao reinício',
    render: () => <Prova tipo="sessao" rotulo="A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO" versao="A12.G07.L02.E05.C03" legenda="relido do módulo depois de desligar e ligar" /> },
  { id: 'f7-contador-menu', folha: 7, rotulo: 'contador no menu', legenda: 'itens na fila, no canto do cartão',
    render: () => <GradeFerramentas><CartaoFerramenta icone="fila" titulo="Fila de saída" contagem={2} /></GradeFerramentas> },
]
