# T07 · Diagnóstico do módulo

Ver o que o módulo informa e o que a CAN do modelo lê — logo depois da conexão, e de novo depois da configuração.

| | |
|---|---|
| **Elemento-assinatura** | as linhas do módulo e da CAN, cada uma com o seu estado no poço: o que trava em vermelho, o que só informa em cinza |
| **Chrome** | faixa de sessão · nas travas, o módulo em cima do título, sem faixa — a sessão não nasce |
| **Semente no protótipo** | sessão M2C-0417, sem ativo · o módulo do herói, com os sete itens certos |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 7 — ver `estados.md` |

## O que se toca

- `Gravar a conexão` (firmware não homologado, módulo sem rede) → grava só a conexão, isolada, e o firmware atualiza por ela
- `Procurar outro módulo` → T05/01, a lista sem nada escolhido
- logo depois de conectar: as sete linhas do módulo, e a CAN aguardando a configuração do ativo
- `Selecionar ativo` → T06, o vínculo
- **só três coisas travam**: serial não cadastrado, modelo sem suporte e firmware não homologado — sinal, GPS e alimentação só informam, e o checklist registra
- no firmware não homologado: `Atualizar firmware` · com o módulo sem rede, `Gravar a conexão` primeiro
- depois da configuração, o módulo vira uma linha — *Conferido na conexão* — e a tela fica pra CAN do modelo
- a lista da CAN vem do modelo do ativo: rotação, velocidade, hodômetro e horímetro, quando o modelo tem, e os sinais que ele traz a mais
- `Ler de novo` → relendo → a CAN lida de novo · no lugar da antiga Refazer leitura
- se o link cair no meio da leitura → T05, conexão falhou

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- barra do sistema sem sessão
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- com legenda
- aprovada
- reprovada, com causa
- só informa
- ainda não
- diagnóstico
- diagnóstico com sessão
- nota com rótulo
- linha do histórico
- a lista de garagens
- com contador
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem

## Histórias de usuário

- **HU-T07-1** — Logo depois de conectar, vejo o módulo: serial, firmware, alimentação, GPS, entradas, modem e SIM
- **HU-T07-2** — Serial fora do cadastro, modelo sem suporte e firmware não homologado travam — cada um com a sua mensagem
- **HU-T07-3** — Firmware não homologado oferece atualizar quando o módulo tem rede; sem rede, o app grava só a conexão, e então atualiza
- **HU-T07-4** — O resto só informa, com o ícone de informação: eu sigo, e o checklist registra
- **HU-T07-5** — A CAN aparece depois que o bloco do ativo é gravado, com a lista do modelo; sinal sem leitura ou fora do esperado aparece na própria linha
- **HU-T07-6** — Ler de novo relê a CAN inteira

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
