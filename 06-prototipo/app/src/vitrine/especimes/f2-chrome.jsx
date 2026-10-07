// Folha 2 · o chrome, o rodapé, a folha e o diálogo — mais a linha de opção da
// folha 6, que a folha com opções usa. Os textos são os da folha, exatos. Toda
// moldura da folha 2 (e a da linha de opção) tem recheio 0: chrome.
import {
  BarraDoSistema, Faixa, TiraDeContexto, TopoDoMenu, Rodape, Veu, Folha, Dialogo, Frase, Destaque,
  LinhaDeOpcao, CartaoDeOpcoes, CartaoDaConta, PrazoDaConta, BotaoDaFolha,
} from '../../ds/chrome/index.js'

const faixaAberta = { serial: 'M2C-0417', placa: 'RKT-8H42' }
// o cartão com a largura da tela, 16 de cada lado: a moldura de recheio 0 tem a borda de 1
const naTela = { padding: '0 calc(var(--e-16) - var(--traco-borda))' }

const tira = <TiraDeContexto garagem="GARAGEM VÁRZEA" iniciais="RV" rotuloConta="Conta — Rafael Vieira" />

// as folhas 2 e 6 da entrega de 24/09: duas saídas (decisão 32) e o contato mascarado (decisão 31)
const opcoes = [
  <LinhaDeOpcao key="r" icone="reenviar" titulo="Conferir e reenviar" detalhe="(81) •••••-8675" />,
  <LinhaDeOpcao key="e" icone="email" titulo="Mandar para o e-mail" detalhe="r•••••@atlsul.com.br" />,
]

export const especimes = [
  // o topo
  // as quatro peças da barra (lei 22, o pacote 4): o desenho oficial do Android, fixo — só o fundo muda, o da tela.
  // A navegação por gestos a folha 2 não desenha: ela vive no pé do celular (App.jsx), e não tem espécime
  { id: 'f2-barra', folha: 2, chrome: true, rotulo: 'barra do sistema', legenda: 'desenho do Android · não é do app',
    render: () => <BarraDoSistema /> },
  { id: 'f2-barra-menu', folha: 2, chrome: true, rotulo: 'barra do sistema no menu', legenda: 'sobre o fundo da tira',
    render: () => <BarraDoSistema fundo="tira" /> },
  { id: 'f2-barra-sem-sessao', folha: 2, chrome: true, rotulo: 'barra do sistema sem sessão', legenda: 'a cor da página — ela sangra no que vem embaixo',
    render: () => <BarraDoSistema fundo="pagina" /> },
  { id: 'f2-faixa-aberta', folha: 2, chrome: true, rotulo: 'faixa · sessão aberta', legenda: 'LED lima, serial, placa e o ENCERRAR',
    render: () => <Faixa {...faixaAberta} acao="ENCERRAR" /> },
  { id: 'f2-faixa-sem-sessao', folha: 2, chrome: true, rotulo: 'faixa · sem sessão', legenda: 'LED apagado · só o fato',
    render: () => <Faixa estado="sem-sessao" fato="Sem sessão de configuração" /> },
  { id: 'f2-faixa-falha', folha: 2, chrome: true, rotulo: 'faixa · módulo com falha', legenda: 'o serial sai · LED vermelho',
    render: () => <Faixa estado="falha" lugar="menu" fato="Módulo com falha" acao="ENCERRAR" /> },
  // a folha desenha a sem ação sem a casca; a peça é uma só (G13), com a casca da T16 (DS-D5)
  { id: 'f2-faixa-sem-acao', folha: 2, chrome: true, rotulo: 'faixa · sem ação', legenda: 'na tela que ela abriu — o encerramento',
    render: () => <Faixa {...faixaAberta} /> },
  { id: 'f2-tira', folha: 2, chrome: true, rotulo: 'tira de contexto', legenda: 'só no menu · a unidade e a conta',
    render: () => tira },
  { id: 'f2-faixa-menu', folha: 2, chrome: true, rotulo: 'faixa no menu', legenda: '50 em vez de 52 · embaixo da tira',
    render: () => <Faixa {...faixaAberta} lugar="menu" acao="ENCERRAR" /> },
  { id: 'f2-topo-menu', folha: 2, chrome: true, rotulo: 'o topo do menu inteiro', legenda: 'tira e faixa juntas',
    render: () => <TopoDoMenu>{tira}<Faixa {...faixaAberta} lugar="menu" acao="ENCERRAR" /></TopoDoMenu> },

  // o rodapé
  { id: 'f2-rodape-duas', folha: 2, chrome: true, rotulo: 'duas ações', legenda: 'primário 56 · link com 48 de toque',
    render: () => <Rodape primario="Voltar ao menu" link="Ler de novo" /> },
  { id: 'f2-rodape-uma', folha: 2, chrome: true, rotulo: 'uma ação', legenda: 'quando só existe um caminho',
    render: () => <Rodape primario="Voltar ao menu" /> },
  { id: 'f2-rodape-correndo', folha: 2, chrome: true, rotulo: 'processo correndo', legenda: 'o primário diz o que acontece',
    render: () => <Rodape primario="Encerrando · não desconecte" primarioDesabilitado explicacao="A saída volta quando o autoteste terminar" /> },
  { id: 'f2-rodape-legenda', folha: 2, chrome: true, rotulo: 'com legenda', legenda: 'uma linha que explica a ação, a 12px do botão',
    render: () => <Rodape legenda="Escolha um módulo para continuar" primario="Conectar" primarioDesabilitado link="Procurar de novo" /> },

  // por cima da tela
  { id: 'f2-folha', folha: 2, chrome: true, rotulo: 'folha', legenda: 'sobe do rodapé · puxador · X',
    render: () => (
      <Veu de="folha">
        <Folha titulo="Conta" rotuloFechar="Fechar" minima>
          <CartaoDaConta iniciais="RV" nome="Rafael Vieira" detalhe="r.vieira · Viação Atlântico Sul" />
          <PrazoDaConta rotulo="ACESSO VENCE EM" restam={2} total={7} unidade="dias" resta="RESTAM 2 DE 7 DIAS" legenda="Sincronize para renovar o acesso." />
          <BotaoDaFolha>Sair da conta</BotaoDaFolha>
        </Folha>
      </Veu>
    ) },
  { id: 'f2-dialogo', folha: 2, chrome: true, rotulo: 'diálogo', legenda: 'só pra ação que encerra trabalho',
    render: () => (
      <Dialogo titulo="Sair da conta" primario="Encerrar a sessão e sair" saida="Cancelar" saidaDe44 margem={20}>
        <Frase><Destaque>3</Destaque> itens continuam na fila e sobem no próximo login.</Frase>
        <Frase>A sessão de configuração do <Destaque>M2C-0417</Destaque> é encerrada antes, sem homologar.</Frase>
      </Dialogo>
    ) },
  { id: 'f2-dialogo-sem-saida', folha: 2, chrome: true, rotulo: 'diálogo sem saída', legenda: 'quando o que aconteceu já está feito · uma ação só',
    render: () => (
      <Dialogo titulo="Senha alterada" primario="Entrar com a senha nova" margem={20}>
        <Frase>A senha nova já vale. Os outros aparelhos saíram da sua conta.</Frase>
      </Dialogo>
    ) },
  { id: 'f2-dialogo-ciencia', folha: 2, chrome: true, rotulo: 'diálogo com ciência', legenda: 'o técnico assina a decisão · o primário espera o check',
    render: () => (
      <Dialogo titulo="A Seção F não passou" primario="Finalizar instalação" saida="Cancelar" ciencia="Estou ciente · Rafael Vieira, 14:30" margem={20}>
        <Frase>A instalação fica registrada com ela falhando — e com o seu nome.</Frase>
      </Dialogo>
    ) },
  { id: 'f2-folha-opcoes', folha: 2, chrome: true, rotulo: 'folha com opções', legenda: 'cada saída numa linha, com o que ela faz',
    render: () => (
      <Folha titulo="Não recebi o código" rotuloFechar="Fechar">
        <CartaoDeOpcoes>{opcoes}</CartaoDeOpcoes>
      </Folha>
    ) },
  // a folha Outras ações (T11/03): com puxador e a mesma densidade da folha do código,
  // com o efeito inteiro. Fora da folha 2 (semBancada); a folha tem os 360 da tela — a
  // moldura de recheio 0 corta a borda de 1 de cada lado, e a conta é a da T11/03
  { id: 'f2-folha-outras-acoes', folha: 2, chrome: true, semBancada: true, rotulo: 'folha com opções · Outras ações',
    legenda: 'fora da folha · a folha Outras ações, com o efeito embaixo de cada ação (T11/03)',
    render: () => (
      <div style={{ margin: '0 calc(var(--traco-borda) * -1)' }}>
        <Folha titulo="Outras ações" rotuloFechar="Fechar">
          <CartaoDeOpcoes>
            <LinhaDeOpcao variante="efeito" icone="reenviar" titulo="Reenviar os 5 blocos" detalhe="Mantém a rede do módulo. Apaga só a configuração." />
            <LinhaDeOpcao variante="efeito" icone="diagnostico" titulo="Apenas registrar o diagnóstico" detalhe="nada vai pro módulo · só o diagnóstico sobe" />
          </CartaoDeOpcoes>
        </Folha>
      </div>
    ) },
  { id: 'f2-barra-veu', folha: 2, chrome: true, rotulo: 'barra do sistema sob o véu', legenda: 'escurece junto quando não há tira',
    render: () => <BarraDoSistema fundo="pagina" veu="folha" /> },

  // folha 6 · a linha de opção — a folha desenha o cartão duas vezes, um dentro do outro
  { id: 'f6-linha-opcao', folha: 6, chrome: true, rotulo: 'linha de opção', legenda: 'o ícone, o que faz, e pra onde',
    render: () => <CartaoDeOpcoes><CartaoDeOpcoes>{opcoes}</CartaoDeOpcoes></CartaoDeOpcoes> },
  // a última entrega · a folha Outras ações (T11/03, decisão 40): a linha de opção com o efeito embaixo. Fora
  // da folha 6 (semBancada), com os textos da T11/03; o cartão tem os 328 da tela (16 de cada lado da moldura)
  { id: 'f6-linha-opcao-efeito', folha: 6, chrome: true, semBancada: true, rotulo: 'linha de opção · com o efeito',
    legenda: 'fora da folha · o poço de 30, o que faz, o efeito embaixo e a seta (T11/03)',
    render: () => (
      <div style={naTela}>
        <CartaoDeOpcoes>
          <LinhaDeOpcao variante="efeito" icone="reenviar" titulo="Reenviar os 5 blocos" detalhe="Mantém a rede do módulo. Apaga só a configuração." />
          <LinhaDeOpcao variante="efeito" icone="diagnostico" titulo="Apenas registrar o diagnóstico" detalhe="nada vai pro módulo · só o diagnóstico sobe" />
        </CartaoDeOpcoes>
      </div>
    ) },
]
