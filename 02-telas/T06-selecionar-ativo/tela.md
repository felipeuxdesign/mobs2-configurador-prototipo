# T06 · Selecionar ativo

Escolher o ônibus que está na frente do técnico e provar que é ele.

| | |
|---|---|
| **Elemento-assinatura** | o par chassi lido × chassi do cadastro — dois números que batem, ou não |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 · dez ônibus no pacote |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 5 — ver `estados.md` |

## O que se toca

- tocar num ônibus → confirmar o veículo
- `Usar este ativo` → T07
- `Escolher outro` → a lista
- a busca filtra por placa, frota ou módulo
- sem chassi na CAN: marcar a confirmação libera o `Usar este ativo`
- chassi divergente: `Solicitar correção de cadastro`

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- com legenda
- nota com rótulo
- o par comparado
- linha do histórico
- a lista de garagens
- cadeia concluída
- cadeia recusada
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- a marca no login
- campo
- campo focado
- checkbox
- campo de busca
- linha de opção
- linha de ônibus
- escolhido com trava · T06
- cartão que pede ação
- lista com contagem

## Histórias de usuário

- **HU-T06-1** — Busco por placa, frota ou identificador; vejo modelo do ativo e módulo esperado
- **HU-T06-2** — Quando o ativo trafega chassi pela CAN, o app lê e compara — divergência bloqueia
- **HU-T06-3** — Sem chassi na CAN, o vínculo é confirmação explícita minha, registrada na evidência
- **HU-T06-4** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-5** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece reconectar sem fio no lugar
- **HU-T06-6** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-7** — Cada linha do arnês é nomeada por cor e função

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
