// Folha 6 · a família entrada: o cabeçalho do conteúdo, a marca, digitar,
// escolher e as leituras em lista. Os textos são os da folha, exatos.
// O checkbox (primitivo) está em f6-checkbox.jsx; a linha de opção é do chrome.
// A lista em cartão é a da família linhas (folha 4): a mesma peça, uma vez só.
import { SoIcone } from '../../ds/index.js'
import { Lista } from '../../ds/linhas/Lista.jsx'
import {
  CabecalhoConteudo, Marca, Campo, Requisito, Codigo, LinkConteudo, Busca, Justificativa,
  LinhaModulo, LinhaOnibus, BlocoEscolhido, CartaoAcao, BotaoSecundario, TiraLeituras, LinhaContagem,
} from '../../ds/entrada/index.js'

// "botões só de ícone": os dois lado a lado, cada um com a margem que ele tem
// na tela dele (o X da folha sai 10 pra borda; o olho, 6 pro recheio do campo)
const fileira = { display: 'flex', gap: 'var(--e-20)', alignItems: 'center' }
const encostaX = { display: 'flex', marginRight: 'calc(-1 * var(--e-10))' }
const encostaOlho = { display: 'flex', marginRight: 'calc(-1 * var(--e-6))' }

export const especimes = [
  // o cabeçalho do conteúdo
  { id: 'f6-cabecalho-neutro', folha: 6, rotulo: 'com contador neutro', legenda: 'o contador conta o que passou',
    render: () => <CabecalhoConteudo titulo="Dados da CAN" contagem="7" unidade="de 12" /> },
  { id: 'f6-cabecalho-falha', folha: 6, rotulo: 'com contador de falha', legenda: 'quantos reprovaram, em vermelho',
    render: () => <CabecalhoConteudo titulo="Dados da CAN" contagem="1" unidade="reprovado" tom="falha" /> },

  // a marca
  { id: 'f6-marca', folha: 6, rotulo: 'a marca no login', legenda: 'o logo e CONFIGURADOR entre dois traços',
    render: () => <Marca nome="CONFIGURADOR" rotuloLogo="Mobs2" /> },

  // digitar
  { id: 'f6-campo', folha: 6, rotulo: 'campo', legenda: 'rótulo em cima · poço de 48',
    render: () => <Campo rotulo="USUÁRIO" valor="r.vieira" /> },
  { id: 'f6-campo-focado', folha: 6, rotulo: 'campo focado', legenda: 'rótulo e traço de baixo em lima',
    render: () => (
      <Campo rotulo="SENHA" valor="••••••••••••••" oculto focado
        acao={<SoIcone icone="olho" rotulo="Mostrar a senha" cor="marca-limite" />} />
    ) },
  { id: 'f6-senha-visivel', folha: 6, rotulo: 'senha visível', legenda: 'o olho riscado esconde de novo · o nome muda pra Ocultar a senha',
    render: () => (
      <Campo rotulo="SENHA" valor="Patio#Varzea26" focado
        acao={<SoIcone icone="olho-riscado" rotulo="Ocultar a senha" cor="marca-limite" />} />
    ) },
  { id: 'f6-requisitos', folha: 6, rotulo: 'requisitos da senha', legenda: 'cada regra vira check quando a senha cumpre',
    render: () => <Requisito texto="10 caracteres ou mais" cumprido /> },
  { id: 'f6-codigo', folha: 6, rotulo: 'código · seis células', legenda: 'uma célula por dígito',
    render: () => <Codigo digitos="482913" focado rotulo="Código" /> },
  { id: 'f6-codigo-errado', folha: 6, rotulo: 'código errado', legenda: 'as células ficam vermelhas',
    render: () => <Codigo digitos="482911" errado rotulo="Código" /> },
  { id: 'f6-link-conteudo', folha: 6, rotulo: 'link dentro do conteúdo', legenda: 'sublinhado · ação sobre o que está perto',
    render: () => <LinkConteudo>Não recebi o código</LinkConteudo> },
  { id: 'f6-busca', folha: 6, rotulo: 'campo de busca', legenda: 'lupa e dica · quando a lista é longa',
    render: () => <Busca dica="Buscar placa, frota ou módulo" /> },
  { id: 'f6-justificativa', folha: 6, rotulo: 'justificativa', legenda: 'o não conforme com o porquê',
    render: () => (
      <Justificativa opcao="Não conforme" marcado rotulo="JUSTIFICATIVA" focado
        valor="Suporte trincado; fixei com abraçadeira até a troca." />
    ) },
  { id: 'f6-so-icone', folha: 6, rotulo: 'botões só de ícone', legenda: 'fechar e mostrar a senha · com nome pro leitor de tela',
    render: () => (
      <div style={fileira}>
        <span style={encostaX}><SoIcone icone="fechar" rotulo="Fechar" /></span>
        <span style={encostaOlho}><SoIcone icone="olho" rotulo="Mostrar a senha" cor="marca-limite" /></span>
      </div>
    ) },

  // escolher
  { id: 'f6-linha-modulo', folha: 6, rotulo: 'linha de módulo', legenda: 'serial e variante · T05',
    render: () => <Lista><LinhaModulo serial="M2C-0362" variante="VL06 · CAN" /></Lista> },
  { id: 'f6-linha-onibus', folha: 6, rotulo: 'linha de ônibus', legenda: 'placa, modelo e frota · T06',
    render: () => <LinhaOnibus placa="RKT-8H42" modelo="Ônibus urbano OF-1621" rotuloFrota="FROTA" frota="1003" /> },
  { id: 'f6-escolhido', folha: 6, rotulo: 'bloco escolhido', legenda: 'traço lima embaixo = escolhido',
    render: () => <BlocoEscolhido rotulo="ESCOLHIDO" identidade="M2C-0417" detalhe="VL06 · CAN-BT · firmware 2.3.5" /> },
  { id: 'f6-escolhido-trava', folha: 6, rotulo: 'escolhido com trava', legenda: 'a falha mora no escolhido · T05',
    render: () => (
      <BlocoEscolhido falha rotulo="NÃO RESPONDEU" identidade="M2C-0301" detalhe="VL06 · FULL · firmware 2.3.5"
        passos={[
          { titulo: '1 · Cabo e conector', texto: '— encaixe firme' },
          { titulo: '2 · Alimentação', texto: '— energia chegando' },
          { titulo: '3 · Cadastro', texto: '— serial e modelo conferem' },
        ]} />
    ) },
  { id: 'f6-escolhido-trava-t06', folha: 6, rotulo: 'escolhido com trava · T06', legenda: 'a placa com o motivo embaixo',
    render: () => (
      <BlocoEscolhido falha rotulo="FORA DO PACOTE DESTA UO" identidade="ONK-8Q90" detalhe="frota 1048 · Caminhão coletor 17.230"
        motivo={['Pertence a Garagem Ibura.', 'Acione o cadastro no M2.']}
        style={{ marginBottom: 'var(--respiro)' }} />
    ) },
  { id: 'f6-cartao-acao', folha: 6, rotulo: 'cartão que pede ação', legenda: 'o erro que precisa dele',
    render: () => (
      <CartaoAcao rotulo="UM PRECISA DE VOCÊ" titulo="Evidências · KJC-7N23" descricao="instalação encerrada por outro usuário"
        acao="Ressincronizar e reenviar" />
    ) },
  { id: 'f6-secundario', folha: 6, rotulo: 'botão secundário', legenda: 'fundo --elevado · a ação da linha',
    render: () => <BotaoSecundario>Ressincronizar e reenviar</BotaoSecundario> },

  // leituras em lista
  { id: 'f6-tira-leituras', folha: 6, rotulo: 'tira de leituras', legenda: 'duas colunas · rótulo em cima',
    render: () => (
      <TiraLeituras itens={[
        { rotulo: 'Mensagens pendentes', valor: 'nenhuma' },
        { rotulo: 'Rede do módulo', valor: 'conectada' },
      ]} />
    ) },
  { id: 'f6-lista-contagem', folha: 6, rotulo: 'lista com contagem', legenda: 'o pacote baixando',
    render: () => (
      <Lista>
        <LinhaContagem nome="Ativos" contagem="6 de 10" estado="agora" />
        <LinhaContagem nome="Modelos de ativo" contagem="3 de 3" estado="ok" />
        <LinhaContagem nome="Cartões" contagem="—" estado="espera" divisoria={false} />
      </Lista>
    ) },
]
