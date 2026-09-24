# T04 · Menu

O painel das ferramentas: o que está pronto pra usar, o que espera o quê.

| | |
|---|---|
| **Elemento-assinatura** | a grade de dez cartões em que cada ferramenta diz, no próprio cartão, o que falta pra ela funcionar |
| **Chrome** | tira de contexto (garagem) + faixa de sessão quando há sessão |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 4 — ver `estados.md` |

## O que se toca

- `Conectar módulo` → T05
- cada ferramenta liberada → a tela dela
- o nome da garagem na tira → folha Trocar de garagem
- as iniciais RV → folha Conta
- `Sair da conta` → diálogo, se houver sessão ou fila

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema no menu
- faixa · módulo com falha
- faixa · sem ação
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- diálogo sem saída
- diálogo com ciência
- disponível
- decide agora
- espera
- conectado
- com pendência
- espera a rede
- linha do histórico
- linha de garagem
- linha de garagem · a atual
- a lista de garagens
- a marca no login
- campo
- campo focado
- contador no menu

## Histórias de usuário

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo 10 ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
