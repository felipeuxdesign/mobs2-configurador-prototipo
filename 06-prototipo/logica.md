# A lógica do protótipo navegável

Guia da versão de **08/10/2026**, conferido contra o código, o mock e as fichas das telas. Comportamento, textos e desenho continuam nas fontes normativas de [02-telas](../02-telas/README.md) e [03-design-system](../03-design-system/README.md). O [histórico até as consultas paradas](historico/logica-ate-consultas-paradas.md) preserva as anotações anteriores, incluindo regras já substituídas.

Censo: **15 telas, 97 momentos, 79 estados e 191 pares HTML/PNG**. O produto tem 109 histórias, 295 tokens distintos, 106 peças normativas e 62 casos do mock. A vitrine tem 114 espécimes comparáveis; existem 45 roteiros, com a cobertura atual descrita em [testes-prontos.md](../08-para-o-dev/testes-prontos.md).

## O estado único

[estado.jsx](app/src/estado/estado.jsx) mantém em memória o contexto compartilhado:

| Campo | O que guarda |
|---|---|
| `tecnico` | nome e usuário de quem entrou |
| `contexto` | unidade, pacote e mundo das empresas |
| `sessao` | módulo, ativo, saúde, hora de abertura e meio |
| `etapas` | diagnóstico (`preChecagem`), vínculo (`ativo`), CAN, cadeia, conferência, calibração, ciclo, checklist e encerramento |
| `fila`, `reenviados` | registros criados e IDs devolvidos à fila pelo reenvio |
| `situacao` | rede, acesso, usuário lembrado, entrada anterior e aviso de outra sessão |
| `casosConsumidos`, `avisoDoAcessoVisto` | condições simuladas já consumidas e ciência do aviso |
| `tela`, `antes`, `geracao` | quadro aberto, fluxo guardado pela consulta e geração dos pulos do palco |

A sessão nasce quando o módulo conecta, na T05. A faixa aparece na T07 depois das **oito verificações** do módulo sem trava; mensagens pendentes são uma nona linha que só informa. A sessão termina no encerramento. Nomes legados como `preChecagem` e `checklist.homologada` não alteram a regra atual: este último significa checklist registrado, e a homologação é da T16.

Não existe armazenamento durável: recarregar fora do modo de fotografia reabre o login. O palco guarda o estado global para voltar das consultas; escolhas locais não gravadas pela tela podem se perder quando ela remonta. O produto precisa implementar persistência e retomada reais.

## O começo

A T01/00 abre com usuário e senha do mock preenchidos. `Entrar` exige os dois campos; com internet, espera 1,2 s e entra com senha de oito caracteres ou mais. Com menos, mostra o erro e apaga a senha. Sem rede, mostra o aviso e conserva os campos. O tempo de demonstração não define o limite do servidor real.

`Lembrar meu usuário` guarda somente o identificador. Ao sair da conta, o login abre com o usuário lembrado e senha vazia (16), ou com os dois campos vazios (15). O xis esquece o identificador; outra conta após uma entrada anterior mostra o aviso sobre a T02. O protótipo conhece os nomes r.vieira e m.souza; outros identificadores usam o nome do herói.

Na recuperação, o técnico digita telefone ou e-mail; nenhum contato do cadastro aparece, nem mascarado. O envio responde sempre com a mesma frase, confere o código `482913` e leva à nova senha. O teto é três envios por hora; o código já enviado continua valendo. Depois de salvar e tocar em **Entrar com a senha nova**, o login volta com a **senha de exemplo de `M.credenciais.senha` preenchida e escondida**, por pedido do diretor em 08/10, para seguir a simulação. A senha digitada na recuperação não é salva nem vira credencial. Isso é só conveniência do protótipo; não muda o login depois de sair da conta.

As regras e os exemplos estão na [T01](../02-telas/T01-login/tela.md) e em [regras.js](app/src/telas/T01/regras.js).

## O caminho do herói

```text
Login → empresa → unidade Várzea → sincronizar → menu
→ conectar M2C-0417 → diagnóstico do módulo → selecionar RKT-8H42
→ conferir vínculo → preparar envio → gravar e reler a cadeia → menu
→ diagnóstico com CAN lida → menu → Nada a calibrar neste ativo
→ ciclo de testes → checklist → registrar checklist
→ encerrar → reinício e autoteste → homologação na T16 → menu sem sessão
```

O ônibus não calibra. Seu ciclo tem quatro passos, com cartão conferido pelo técnico. O checklist tem **28 itens aplicáveis**, de um catálogo de 30; o bip é testado ali. `Finalizar` registra o checklist, aguardando autoteste; o encerramento pode homologar somente depois da prova da T16.

[heroi.mjs](app/scripts/caminhos/heroi.mjs) aprovou **239 passos** na rodada de consultas paradas. [heroi-sem-horimetro.mjs](app/scripts/caminhos/heroi-sem-horimetro.mjs) conserva o nome histórico, mas hoje entra no ciclo pela Seção E depois de voltar da calibração ao menu. A lista de verificações aprovadas e as limitações dos roteiros antigos estão em [testes-prontos.md](../08-para-o-dev/testes-prontos.md).

## As sementes

O painel monta o contexto mínimo para navegar. [sementes.js](app/src/estado/sementes.js) preserva os exemplos das referências; `semeado` escolhe a entrada normal quando o acesso é de fluxo.

| Tela | Entrada normal do painel |
|---|---|
| T01 | login preenchido, sem sessão |
| T02 | três empresas do técnico; primeiro escolhe a empresa |
| T03 | unidade Várzea escolhida, pacote por sincronizar |
| T04 | sessão M2C-0417 + RKT-8H42 e contexto Várzea |
| T05 | busca dos módulos; sem sessão conectada |
| T06 | módulo M2C-0417, ainda sem ativo |
| T07 | módulo M2C-0417, diagnóstico do módulo; CAN espera o ativo |
| T09 | par M2C-0417 + RKT-8H42; preparação da cadeia |
| T10 | mesmo ônibus; nada a calibrar |
| T11 | mesmo par que confere; leitura chega a Tudo confere |
| T12 | contexto e sessão do herói; histórico do mock |
| T13 | checklist do herói, com resultados de exemplo das etapas anteriores |
| T14 | ciclo do herói; fila drenando antes do disparo |
| T15 | recorte de quatro itens mais os criados nesta navegação |
| T16 | checklist registrado; encerramento e autoteste |

Essas sementes não acrescentam uma regra ao produto. O usuário real chega com os resultados que as integrações produziram.

## As consultas paradas · sem percursos especiais no palco

**Estados desta tela** inclui condições do mundo e exemplos especiais, todos parados. O painel abre o caminho normal; a coluna permite inspecionar:

- T02/00–01: uma empresa.
- T09/08–10: manutenção, escolhendo, reenviando e concluída.
- T10/00, 01, 05–09: os sete quadros de calibração do caminhão.
- T11/00 e 03: Não bate com o cadastro e sua folha.
- T13/29: relendo depois de uma falha.

As famílias T07/06 e T13/30–37 também ficam paradas pela coluna. A classificação normativa não muda: um momento oferecido para consulta continua momento no índice, sem inflar os 79 estados.

A primeira consulta guarda o fluxo inteiro; trocar entre consultas conserva esse retorno. Toque, Esc e tempo não alteram o quadro. **Voltar ao fluxo** restaura o estado guardado; se não existe fluxo anterior, monta a entrada normal da tela. Links antigos dos 15 exemplos marcados como `consulta` abrem parados fora do print. Momentos normais continuam navegáveis; detalhes de família acessados por endereços antigos sem `consulta` conservam as limitações registradas no [palco](palco.md).

Fontes: [telas.js](app/src/palco/telas.js), [estado.jsx](app/src/estado/estado.jsx) e [gate de consultas paradas](para-o-arquiteto/gate-consultas-paradas.md).

## As portas naturais

Nas listas, tocar só marca; confirmar executa. Conectar ao M2C-0999 leva ao diagnóstico travado por serial não cadastrado. Outros exemplos do mock que coincidem com o par do herói ficam disponíveis pela coluna, para não disparar uma condição especial no percurso normal. Casos de falha consumíveis valem uma vez por sessão; fatos de cadastro continuam valendo em cada leitura.

## ENCERRAR

[useEncerrar](app/src/estado/encerrar.jsx) é a ação compartilhada. Antes do checklist registrado, abre **Encerrar antes de terminar?**; confirmar faz os quatro passos da saída sem homologação. Depois do registro, segue para o encerramento completo da T16. Sair da conta ou trocar a unidade conserva o destino após a saída; a fila pertence ao aparelho.

Durante processos que bloqueiam voltar, ENCERRAR também fica indisponível. Na cadeia, antes da Conexão confirmada, a recuperação da T09 preserva os blocos relidos. A sessão interrompida da T16 retoma a cadeia no bloco que parou; descartar remove a sessão sem criar um registro de descarte. A política real desse registro ainda está aberta.

## Os contadores do menu (T04·1, T04·2)

O próximo passo vem da sessão e das etapas. Depois de aberto, o contador do checklist no menu conta os itens manuais e dinâmicos pendentes de B e E; não soma todos os automáticos de A a E. A fila do menu conta os envios pendentes da unidade ativa sobre `filaDoMundo`; a T15 conta todos os itens do recorte exibido, inclusive recebidos. Nenhuma dessas contagens é fixa para qualquer ativo. O aviso de acesso aparece uma vez até o Entendi; não altera o contexto ou a sessão.

## A fila de saída (T15)

A fila é do aparelho. A T15 normal mostra o recorte `f-10`, `f-02`, `f-08`, `f-11`, mais os registros criados na navegação. Recebido em conflito é recebido pelo servidor, com o gestor avisado; não pede reenvio. Ressincronizar e reenviar devolve os erros à fila em memória, sem simular um envio real em segundo plano. As referências de recortes e rechecagem são consultas.

## A escolha do ativo (T06·1 a T06·5)

A seleção confere contexto, vínculo e suporte antes de usar o ativo. O conflito de pinos é erro do projeto de instalação: configurar é sempre sem fio, e nenhuma tela oferece cabo ou uma saída por outro meio. Os dados e critérios de cada trava estão na [T06](../02-telas/T06-selecionar-ativo/tela.md).

## O diagnóstico do módulo

A T07 lê nove linhas do módulo a 600 ms por linha; oito contam. Alimentação é a tensão do fio contra a faixa do módulo. GPS é aprovado pela antena, com satélites informativos. As travas de serial, modelo e firmware vêm do cadastro e matriz. Sem rede no módulo, o diagnóstico pode gravar a conexão isoladamente antes de atualizar o firmware.

## A releitura da CAN (o Ler de novo da T07)

A CAN depende do ativo e do bloco Ativo já conferido. No herói, são seis linhas, cinco contadas: alternador só informa. Sinais novos chegam determinísticos a cada leitura e trocam o número no lugar, sem animação. Reler conserva o contexto e registra os resultados em `etapas.can`; não inventa um sinal que o modelo não possui.

## A cadeia (T09·1)

Limpeza e cinco blocos são enviados e relidos em ordem: Ativo, Cercas, Leitor, Eventos e Conexão. A capacidade usa contadores e pontos de cerca; regiões organizam as cercas. Limpeza preserva os identificadores. O pacote não leva cartões, e o módulo não guarda versão do pacote. As falhas e a retomada são descritas na [T09](../02-telas/T09-configurar-modulo/tela.md).

## A conferência (T11·1, T11·2)

Compara quatro blocos: Cercas, Rede do módulo, Eventos e Leitor. A leitura usa 400 ms por linha; a contagem acompanha, e o veredito espera a última. O caminho normal do herói confere. O par divergente é exemplo parado da coluna, sem levar o palco a uma cadeia especial.

No produto, **Corrigir este bloco** permite escolher qualquer linha divergente e reenviar um bloco; dependentes ficam para revisar. **Reenviar os 5 blocos** limpa o avanço anterior antes da preparação da cadeia. **Apenas registrar o diagnóstico** salva `etapas.conferencia` e volta ao menu. Embora `tiposFila` já declare Diagnóstico, essa ação não cria item nem envia no protótipo; o upload real está pendente.

## O ciclo de testes (T14·1 a T14·4)

São até quatro passos aplicáveis: ignição ligada, rotação, cartão e ignição desligada. Sem leitor, três. Ré e porta saíram; velocidade foi retirada na revisão final do PM. O bip pertence à T13.

A fila drena em 3 s; depois o técnico dispara o evento. O prazo é 2:00, com 1 s real valendo 4 s do prazo. O evento de exemplo chega aos 24 s e confere seis campos aos 33 s. As leituras seguem [ciclo.js](app/src/telas/T14/ciclo.js); o cartão exige resposta manual contra o número impresso, sem comparar cadastro. Não confere vira não conforme, com justificativa na T13.

Antes de concluir, Encerrar o ciclo e Ir para o checklist levam à T13 com resultados preservados. Gravam `fechado: true` e `false`, respectivamente; **esse campo não é lido na retomada atual**, que preserva os mesmos passos. Concluído, Ir para o checklist é o primário e Voltar ao menu a saída secundária. Concluir o ciclo não finaliza a instalação.

## O checklist (T13·1 a T13·6)

O catálogo tem **30 itens** (A=4, B=5, C=4, D=10, E=5, F=2). O herói tem **28 aplicáveis**: Painel exige calibração, e Pendências registradas exige ID reescrito. Leitor, rotação e bip também respeitam suas condições. A semente tem 17 resolvidos e nove obrigatórios por fazer; F não bloqueia.

A, C e D conferem resultados automaticamente; B fotografa ou registra ressalva com justificativa **e foto do problema**. E combina os passos da T14 com o bip respondido aqui. Cartão ou bip não conforme precisa de justificativa e pode ficar resolvido com ressalva. F confere Posição e Evento de teste a partir do recebimento e conferência do evento, sem os antigos pedidos de correção.

No item manual da T13, sem permissão para uma foto ainda não tirada, o primário é `Abrir as configurações`; ao voltar, a permissão é conferida de novo. Com `Não está conforme` marcado e a câmera permitida, `Fotografar o problema` continua disponível até a foto existir, com ou sem justificativa. Depois da foto, sem justificativa, `Conte o que aconteceu` fica apagado e desabilitado; com os dois, o primário é `Salvar com ressalva`. Desmarcado, volta ao `Tirar foto` quando a câmera está permitida. A ordem entre escrever e fotografar é livre.

O automático reprovado abre seu detalhe e **Reler o módulo**: a primeira leitura do caso pode continuar reprovando, e a segunda passar. Alimentação vai de 8,4 para 8,8 e depois 24,3 V; GPS conserva a antena desconectada e depois a conecta. Nada volta sozinho para outra tela. Os resultados atualizam C.

Finalizar exige A a E resolvidas. Se F falhou, pede ciência; aguardando, registra direto. O registro gera relatório e evidências na fila em memória, com a hora fixa, e mostra **Checklist registrado · aguardando autoteste**. A propriedade legada `homologada` sinaliza esse registro; a T16 ainda precisa comprovar a homologação. Câmera e foto do Painel são desta tela, não da T10.

## O encerramento e o autoteste (T16)

O encerramento reinicia o módulo automaticamente, reconecta se necessário e lê **sete assertivas**, uma a cada 400 ms. A contagem separa aprovadas, não se aplicam e pendentes. Sem falha, homologa; com falha, bloqueia e informa a causa. O evento do cartão pode continuar pendente por até 24 h sem impedir a homologação. A faixa sai ao fechar a sessão. A saída antecipada conclui sem homologar.

## O voltar do Android

No computador, Esc simula voltar. A camada aberta tem prioridade: folha ou diálogo fecha quando oferece essa saída. Sem camada, segue a saída desenhada da tela. Onde só há ação de processo, como a releitura, não inventa navegação. Nas consultas paradas, não faz nada. Login, menu e busca sem saída ficam onde estão; T02 respeita o passo empresa/unidade.

## A folha que fecha (lei 20)

X, véu, voltar e arraste fecham a folha. O arraste começa depois de 8px e fecha ao soltar além de 56px, pelos tokens; antes disso, volta. Arrastar uma linha não executa sua ação. A folha Outras ações da T11 usa o espaçamento aprovado da folha Não recebi o código: [gate da padronização](para-o-arquiteto/gate-padronizacao-folha-t11.md).

Desde a revisão autorizada em **08/10/2026**, toda folha escurece o fundo inteiro do app: conteúdo, tira de contexto, faixa de sessão e fundo da barra de status. O SVG oficial da hora e dos ícones continua legível; as posições, medidas, ações e consultas paradas permanecem as mesmas. Na T04, os diálogos `06`, `09`, `12`, `13` e `16` compartilham a cobertura, e a troca entre folha e diálogo preserva o véu sem clarear o topo. Os diálogos da T02, da T13 e o ENCERRAR sobre outras telas não mudam neste ciclo. [Gate do véu integral](para-o-arquiteto/gate-veu-integral.md).

## O teclado (regra 10)

A tela mantém campo e ação acima do teclado, adaptando o miolo que rola e o rodapé. O campo do painel abre teclado numérico. A medida do teclado vem da janela/viewport, sem um segundo desenho da tela. Regras e limitações são documentadas em [teclado.js](app/src/estado/teclado.js).

## O retrato (regra 11)

O app fica em retrato, inclusive na janela deitada. O palco adapta a moldura; o app não gira. As barras do sistema desenhadas são cenário do protótipo. O produto usa as do aparelho.

## Nenhum botão aceso que não faz nada (regra 12)

Ações indisponíveis ficam desabilitadas de verdade e em tinta apagada. Permissão que o sistema não deixa solicitar de novo oferece `Abrir as configurações`. O protótipo simula as permissões e fotos; o produto precisa ligar essas ações ao Android e à câmera real.

## A URL

`tela`, `momento` e `estado` identificam o quadro; o modo de fotografia congela processos. A coluna oferece consultas com o dado da referência, independentemente da sessão guardada. A lista normativa completa está em [indice.json](../02-telas/indice.json); os motivos e acessos de cada quadro, no `estados.md` da tela. Não copie tabelas históricas para gerar rotas atuais.

## O que é provisório

Tempos fixos, permissões, rádio, servidor, fotos e envio são simulações. Valores de bancada ainda pendentes e perguntas reais estão em [o que o produto ainda decide](../08-para-o-dev/o-que-o-produto-ainda-decide.md). Os adaptadores necessários estão em [integrações](../08-para-o-dev/integracoes.md). O histórico explica como a versão chegou aqui; não substitui as regras vigentes.
