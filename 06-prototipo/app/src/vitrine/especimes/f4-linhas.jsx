// Folha 4 · a linha de checagem e a família da linha de lista — e as duas
// linhas que moram em outras folhas: a linha tocável (folha 1) e a escolha
// numa lista (folha 3). Os textos e as legendas são os da folha.
import { Lista, LinhaChecagem, LinhaHistorico, LinhaFilaEsperando, LinhaGaragem, LinhaEscolha, LinhaTocavel } from '../../ds/linhas/index.js'
import { secaoALeitura, secaoBFechada } from './f7-checklist.jsx'

const pilha = { display: 'flex', flexDirection: 'column', gap: 'var(--e-10)' }

export const especimes = [
  // ── a linha de checagem · cinco estados ──
  { id: 'f4-aprovada', folha: 4, rotulo: 'aprovada', legenda: 'check lima · valor em --tinta-secundaria',
    render: () => <Lista><LinhaChecagem estado="aprovada" titulo="Serial no cadastro" valor="VL06 FULL" /></Lista> },
  { id: 'f4-reprovada', folha: 4, rotulo: 'reprovada, com causa', legenda: 'X, título e valor em vermelho · a causa embaixo',
    render: () => <Lista><LinhaChecagem estado="reprovada" titulo="Firmware" causa="homologadas 2.2.0 e 2.3.5" valor="2.4.1" /></Lista> },
  { id: 'f4-nao-se-aplica', folha: 4, rotulo: 'não se aplica', legenda: 'traço · depende de outra que reprovou',
    render: () => <Lista><LinhaChecagem estado="nao-se-aplica" titulo="Espaço no módulo" valor="não avaliada" /></Lista> },
  { id: 'f4-parou-aqui', folha: 4, rotulo: 'parou aqui', legenda: 'o processo caiu nesta',
    render: () => <Lista><LinhaChecagem estado="parou" titulo="Modem, SIM e sinal" valor="sem resposta" /></Lista> },
  { id: 'f4-ainda-nao', folha: 4, rotulo: 'ainda não', legenda: 'círculo apagado · valor em traço',
    render: () => <Lista><LinhaChecagem estado="ainda-nao" titulo="Espaço no módulo" valor="—" /></Lista> },

  // ── a família da linha de lista · uma peça, seis contextos ──
  { id: 'f4-pre-checagem', folha: 4, rotulo: 'pré-checagem', legenda: 'compacta · 38',
    render: () => <Lista><LinhaChecagem titulo="Serial no cadastro" valor="VL06 FULL" /></Lista> },
  { id: 'f4-pre-checagem-sessao', folha: 4, rotulo: 'pré-checagem com sessão', legenda: 'a mesma 38 — a exceção acabou',
    render: () => <Lista><LinhaChecagem titulo="Serial no cadastro" valor="VL06 CAN-BT" /></Lista> },
  { id: 'f4-passo-ciclo', folha: 4, rotulo: 'passo do ciclo', legenda: 'compacta · 38',
    render: () => <Lista><LinhaChecagem variante="passo" titulo="Ignição ligada" /></Lista> },
  { id: 'f4-assertiva', folha: 4, rotulo: 'assertiva da sessão', legenda: 'dupla · 50',
    render: () => <Lista><LinhaChecagem variante="dupla" titulo="Configuração" valor="confere" /></Lista> },
  { id: 'f4-conferencia', folha: 4, rotulo: 'linha de conferência', legenda: 'dupla · 50',
    render: () => <Lista><LinhaChecagem variante="conferencia" titulo="Ativo" valor="tradução frota v2" /></Lista> },
  // a entrega do checklist (decisão 34): a folha 4 desenha as duas com a seção nova, a mesma peça da folha 7
  { id: 'f4-secao-aberta', folha: 4, rotulo: 'seção aberta do checklist', legenda: 'o cartão cresce no lugar · a seta vira pra cima', render: secaoALeitura },
  { id: 'f4-secao-recolhida', folha: 4, rotulo: 'seção recolhida', legenda: 'um cartão por seção · quem age, a contagem e a seta', render: secaoBFechada },
  { id: 'f4-passos-prazo', folha: 4, rotulo: 'passos com o prazo estourado', legenda: 'a lista inteira da T14',
    render: () => (
      <Lista recheio="passos">
        <LinhaChecagem variante="passo" titulo="Ignição ligada" />
        <LinhaChecagem variante="passo" titulo="Movimento detectado" />
        <LinhaChecagem variante="passo" titulo="Ré acionada" />
        <LinhaChecagem variante="passo" titulo="Porta aberta" />
        <LinhaChecagem variante="passo" titulo="Ignição desligada" divisoria={false} folgaFim />
      </Lista>
    ) },

  // ── vazio, comparação e histórico ──
  // as três de unidade (a lei 18, decisão 37): a folha 4 ainda rotula 'linha de garagem', e o `rotulo`
  // segue o dela, pra bancada achar a moldura; a vitrine mostra o `nome` que o componentes.md dá hoje
  { id: 'f4-historico', folha: 4, rotulo: 'linha do histórico', legenda: 'placa, módulo e hora · o veredito à direita',
    render: () => <Lista><LinhaHistorico placa="RKT-8H42" detalhe="M2C-0417 · 11:47" veredito="aprovada" divisoria={false} /></Lista> },
  { id: 'f4-fila-esperando', folha: 4, rotulo: 'linha da fila · esperando', legenda: 'o que ainda não subiu',
    render: () => <LinhaFilaEsperando titulo="Calibração" detalhe="RSW-9L02 · na fila" quando="há 18 min" /> },
  { id: 'f4-garagem', folha: 4, rotulo: 'linha de garagem', nome: 'linha de unidade', legenda: 'na folha · o pacote e a contagem',
    render: () => <LinhaGaragem nome="Garagem Ibura" pacote="carregado há 4 dias" rotuloContagem="ATIVOS" contagem={8} /> },
  { id: 'f4-garagem-atual', folha: 4, rotulo: 'linha de garagem · a atual', nome: 'linha de unidade · a atual', legenda: 'o marcador lima de 11px',
    render: () => <LinhaGaragem estado="atual" nome="Garagem Várzea" pacote="carregado ontem, 07:10" rotuloContagem="ATIVOS" contagem={10} /> },
  { id: 'f4-lista-garagens', folha: 4, rotulo: 'a lista de garagens', nome: 'a lista de unidades', legenda: 'na folha, com as três',
    render: () => (
      <Lista>
        <LinhaGaragem estado="atual" nome="Garagem Várzea" pacote="carregado ontem, 07:10" rotuloContagem="ATIVOS" contagem={10} />
        <LinhaGaragem nome="Garagem Ibura" pacote="carregado há 4 dias" rotuloContagem="ATIVOS" contagem={8} />
        <LinhaGaragem estado="vencida" nome="Pátio Caruaru" pacote="pacote vencido há 8 dias" rotuloContagem="ATIVOS" contagem={6} divisoria={false} />
      </Lista>
    ) },

  // ── folha 1 · a linha tocável ──
  { id: 'f1-linha-tocavel', folha: 1, rotulo: 'linha tocável · normal e pressionada', legenda: 'o fundo sobe pra --elevado no toque',
    render: () => (
      <div style={pilha}>
        <LinhaTocavel titulo="Garagem Ibura" valor="10 ativos" />
        <LinhaTocavel titulo="Garagem Ibura" valor="10 ativos" forcaToque />
      </div>
    ) },

  // ── folha 3 · a escolha numa lista ──
  { id: 'f3-escolha-lista', folha: 3, rotulo: 'escolha numa lista', legenda: 'o quadrado lima cheio é o escolhido',
    render: () => <Lista><LinhaEscolha estado="escolhida" nome="Garagem Várzea" detalhe="pacote de ontem, 07:10" valor="10 ativos" /></Lista> },
]
