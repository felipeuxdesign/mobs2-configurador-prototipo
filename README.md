# Mobs2 Configurador · Protótipo

Aplicativo mobile de instalação, configuração e homologação de módulos de telemetria embarcados, usado pelo técnico de campo. Este repositório reúne o design do produto, o design system e o protótipo navegável construído a partir deles.

> **Isto é um protótipo, não o produto.** O app daqui roda no navegador, com dados de exemplo e sem módulo, servidor ou Bluetooth de verdade. Ele serve de referência pra construir o produto: o comportamento, os textos e o desenho de cada tela.
>
> Propriedade da **MOBS2 COMERCIO E SERVICOS LTDA - EPP**. Conteúdo para consulta: usar, copiar ou distribuir depende de autorização por escrito. Veja [Propriedade e uso](#propriedade-e-uso).

<p align="center">
  <img src="05-recursos/readme/caminho-do-heroi.gif" alt="O caminho do técnico no protótipo: o login, a empresa e a unidade, o pacote do dia, o menu, a conexão com o módulo, o diagnóstico, o vínculo com o ônibus, o que vai ser gravado, a configuração gravada e relida, a CAN lida ao vivo e a sessão encerrada" width="330">
</p>

<p align="center"><b><a href="https://configurador-mobs2-prototipo.vercel.app">Abrir o protótipo →</a></b></p>

## O problema

O técnico de campo é terceirizado e não conhece a lógica de programação do módulo. Ele instala em pátio, obra e zona rural, muitas vezes sem rede, às vezes embaixo do ônibus. E o equipamento não avisa quando algo dá errado: **sucesso de comando não é sucesso de configuração** — um bloco pode ser aceito e não funcionar, e um erro de faixa apaga em silêncio, aparecendo dias depois. O checklist antigo era uma lista de 30 itens marcáveis à mão, com um "marcar todos" que permitia homologar sem verificar.

A resposta do produto: **o sistema decide e o técnico executa**, todo envio é confirmado por releitura do módulo, e **a evidência é gerada pelo app, não digitada pelo técnico**.

## O que o app faz

O app conduz a instalação em sequência e prova cada passo:

1. **Sincroniza** o pacote da unidade — os ônibus, as conexões, os modelos, os eventos e as cercas — pra trabalhar mesmo sem rede.
2. **Conecta** ao módulo sem fio, por Bluetooth — pareando na primeira vez e reconectando sozinho quando a conexão cai.
3. **Diagnostica** o módulo: serial, firmware, alimentação contra a faixa do modelo, a antena do GPS, entradas, modem, SIM e o número do chip, e as mensagens que o módulo ainda guarda. Serial fora do cadastro, modelo sem suporte ou firmware fora da lista travam a instalação ali.
4. **Vincula** o módulo ao ônibus, confirmado pela placa, frota, fabricante e modelo.
5. **Grava a configuração** em seis blocos, na ordem do script — Limpeza, Ativo, Cercas, Leitor, Eventos e Conexão —, cada um conferido no módulo, e confere que o módulo falou com o servidor. Na manutenção, reenvia um bloco por vez e nunca reenvia outro por conta própria: o app diz a consequência e pergunta por cada bloco que depende dele, um por vez.
6. **Calibra** só o que o veículo não entrega pela CAN: o ônibus não calibra nada, e o caminhão coletor calibra o hodômetro e a rotação, com a velocidade e o horímetro opcionais.
7. **Roda o ciclo de testes** com o ônibus parado: ignição ligada, rotação, cartão do motorista e ignição desligada, cada um só quando se aplica — a cada passo, o app diz o que o técnico tem que fazer, e o técnico confere o cartão lido com o número impresso.
8. **Fecha o checklist** dos itens que contam — 27 no ônibus do caminho principal, de um catálogo de 30; o autoteste roda ao encerrar e não conta, e o bloco deixado para depois numa manutenção trava o Finalizar. O app confere o que consegue sozinho, e o técnico fotografa o resto e testa o bip do leitor. Ao encerrar a sessão, o módulo reinicia sozinho, o autoteste confere sete assertivas, e só aí a instalação é homologada.

Antes de tudo, o login: o técnico recupera o acesso sem ligar pra ninguém, e o app nunca revela se uma conta existe — ele digita o telefone ou o e-mail, e a resposta é sempre a mesma.

As telas traduzem as ações em perguntas de negócio, e o app fala com o módulo. A APN é a exceção de dado técnico que o PM pediu para conferir.

## O protótipo

O protótipo roda no navegador e anda só por toque, do login ao encerramento. No computador, o celular aparece em tamanho real dentro de um palco:

- o quadrado no canto abre o painel com as 15 telas;
- a coluna **Estados desta tela** oferece os exemplos parados — erros, manutenção, calibração do caminhão e outras condições —, montados pelos dados de exemplo. O toque não avança esses quadros; **Voltar ao fluxo** devolve o percurso guardado. O painel abre o contexto normal de cada tela;
- cada tela, momento e estado tem um link próprio (`?tela=T07&estado=02-estado-serial-nao-cadastrado`).

No celular, o app ocupa a tela inteira.

As folhas escurecem todo o fundo do app, incluindo a faixa de sessão e o fundo da barra de status, mantendo os ícones do Android legíveis. Os diálogos do menu usam a mesma cobertura, sem mudar de posição. [Registro do ajuste](06-prototipo/para-o-arquiteto/gate-veu-integral.md).

## Os dois temas

O app nasce **escuro**, e o **claro** é escolha do técnico: no menu, toque nas iniciais (o *RV*, no canto de cima), e na folha da Conta ligue o **Modo claro**. O app inteiro troca as cores no lugar, com a folha ainda aberta. O aparelho lembra da escolha — no protótipo, no armazenamento do navegador —, e na próxima vez o app já abre claro, inclusive no login. Pra voltar ao escuro, desligue a mesma linha.

<p align="center">
  <img src="05-recursos/readme/modo-claro.gif" alt="O modo claro no protótipo: o login e o menu no escuro, a folha da Conta com o Modo claro ligando e o app trocando as cores no lugar, e a volta pelas telas principais no claro: conectar, o diagnóstico, o vínculo, a configuração gravada, a CAN ao vivo e a sessão encerrada" width="330">
</p>

O claro não tem telas próprias: ele é o escuro invertido, degrau por degrau, com os mesmos contrastes, e nasce dos mesmos tokens — só as cores mudam (`03-design-system/tokens.css`, bloco `[data-tema="claro"]`). No claro, o lima vira roxo no veredito, no escolhido e nos preenchimentos, o texto do botão principal fica branco, as barras do sistema escurecem e o véu continua preto a 32%. A paleta está na folha 10 do design system, e as regras nas leis R-16 a R-19.

## Como foi construído

Cada tela, momento e estado tem uma referência desenhada, em HTML e PNG — 201 ao todo. O protótipo foi construído contra elas e comparado pixel a pixel; toda diferença que sobrou tem um nome e um motivo registrados.

O comportamento vem da ficha de cada tela, os textos do `textos.md` dela e as medidas dos tokens. O repositório contém 48 roteiros de navegação e um gate que confere os dados de exemplo. O caminho principal usa o ônibus sem calibração; o roteiro historicamente chamado `heroi-sem-horimetro` verifica a entrada no ciclo pelo checklist.

A última rodada (o pacote 30, 12/10: o modo claro e as correções finas) rodou os 48 roteiros: 38 aprovados, entre eles o caminho principal (239 passos), a configuração (`mov-t09`, 240), o fluxo das cercas na manutenção (`reenvio`, 73) e o novo `claro` (424 passos): ele liga e desliga o Modo claro na folha da Conta, recarrega o app com o claro ligado e percorre as 201 referências no claro, conferindo as cores que o navegador calculou em cada elemento. Os 10 que param são roteiros antigos que ainda usam exemplos que agora abrem parados (T02, T10, T13/29), e param nos mesmos passos desde antes do pacote 29. [Gate da rodada](06-prototipo/para-o-arquiteto/gate-30.md).

O ajuste posterior do véu integral passou pelos roteiros de menu, folhas e conferência e pela comparação das 12 referências afetadas. O GIF do topo foi regravado no pacote 30 com o mesmo percurso — o caminho feliz —, pela altura de linha nova do texto de apoio, e o do modo claro foi gravado nele. [Validação do ajuste](06-prototipo/para-o-arquiteto/gate-veu-integral.md).

**As tecnologias:** o protótipo é um app web em **React 18** com **Vite**, em JavaScript, sem biblioteca de componentes de fora: as peças são as do design system, construídas no próprio projeto, com os valores dos tokens em CSS. Os ícones são do **Lucide**, e a fonte é a **Barlow**. A comparação com as referências roda no **Chrome** sem tela, com o **pixelmatch** medindo a diferença pixel a pixel. Ele é publicado na **Vercel**.

| telas | momentos | estados | referências | folhas do design system | temas | histórias de usuário | casos de dados | decisões registradas |
|---|---|---|---|---|---|---|---|---|
| 15 | 104 | 82 | 201 | 10 | 2 | 109 | 63 | 54 |

## O repositório

```
01-produto/          por que existe, pra quem, as regras de negócio, as histórias e os fluxos
02-telas/            uma pasta por tela: ficha, estados, animação, textos e as referências
03-design-system/    tokens (os dois temas), leis, movimento, componentes e as dez folhas
04-dados/            os dados de exemplo (o contrato de dados) e o gate que confere
05-recursos/         a marca, a fonte, os ícones e os desenhos do sistema
06-prototipo/        o protótipo navegável, o palco e as ferramentas de verificação
07-decisoes/         o porquê de cada escolha, com o que foi descartado
08-para-o-dev/       por onde começar a construir o produto
```

A ordem de leitura de cada perfil está no [`LEIA-PRIMEIRO.md`](LEIA-PRIMEIRO.md), e o histórico de mudanças no [`CHANGELOG.md`](CHANGELOG.md). Quem vai desenvolver o produto começa pelo [guia do dev](08-para-o-dev/README.md): o contrato de dados, as integrações com o módulo e o servidor, os testes e as decisões que ainda precisam de definição. O protótipo simula os equipamentos e serviços; transporte, autenticação, persistência sem rede e captura de evidências precisam ser implementados no produto.

## Rodar localmente

```bash
cd 06-prototipo/app
npm install
npm run dev
```

Abre em `http://localhost:5173`. Na mesma pasta, rode `npm run checar` para conferir o mock e as regras locais, e `npm run build` para gerar o build.

Para conferir a navegação atual, com o servidor aberto e um fotógrafo rodando (`npm run fotografo`), use:

```bash
node scripts/caminho.mjs heroi
node scripts/testar-consultas.mjs
```

Para a comparação visual, com os fotógrafos nas escalas 2 e 1 (`npm run fotografo` e `npm run fotografo:1`, um terminal por processo), `node scripts/tela.mjs todas` compara as 201 referências. `node scripts/caminho.mjs todos` executa os 45 roteiros; consulte as limitações dos roteiros históricos em [Testes para o dev](08-para-o-dev/testes-prontos.md) antes de usar o lote como aceite.

## Propriedade e uso

**Este repositório é propriedade da MOBS2 COMERCIO E SERVICOS LTDA - EPP**, CNPJ 10.938.384/0001-41. © 2026. Todos os direitos reservados.

**O que é da empresa:** tudo o que está aqui — o produto e as regras de negócio, o design das telas, o design system, os textos, as referências desenhadas, os dados de exemplo e o código do protótipo.

**O que é permitido:** abrir, ler e navegar pelo conteúdo e pelo protótipo publicado, para consulta.

**O que depende de autorização prévia e por escrito da empresa:**
- copiar ou reproduzir qualquer parte, no todo ou em parte;
- usar o conteúdo em outro produto, projeto ou trabalho;
- modificar, publicar, distribuir ou repassar a terceiros.

Estar visível não significa estar liberado para uso. Os termos completos estão no [`LICENSE`](LICENSE).

**O que é de terceiros** segue a licença de cada um, e não é da empresa:
- as fontes **Barlow** e o recorte da **Google Sans**, sob a SIL Open Font License 1.1, com o texto da licença em [`05-recursos/fontes/`](05-recursos/fontes/);
- os ícones do **Lucide**, sob a licença ISC;
- as barras do sistema, do kit do **Material 3**, do Google.

**Autoria:** design de produto e protótipo por [Luiz Felipe Silva Correia](https://www.linkedin.com/in/lfelipe-scorreia/), para a MOBS2.
