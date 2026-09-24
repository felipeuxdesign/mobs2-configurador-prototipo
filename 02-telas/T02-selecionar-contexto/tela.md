# T02 · Selecionar contexto

Dizer em que garagem o técnico está hoje — o pacote de dados que o app vai usar.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima e o pacote de cada garagem dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | Viação Atlântico Sul · três garagens · Várzea com pacote de ontem |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 1 · 1 — ver `estados.md` |

## O que se toca

- tocar numa garagem → ela fica escolhida
- `Sincronizar Garagem X` → T03
- com a lista longa, o campo de busca filtra por nome ou cidade

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- uma ação
- escolha numa lista
- os glifos de estado
- os poços
- os marcadores
- campo de busca

Corrigida no C4 pelo medido (G10, T02-A3): saíram as 6 peças que nenhuma das três desenha (linha do histórico, a lista de garagens, segmentado, a marca no login, campo e campo focado) e entraram as que a tela usa e faltavam: o primário nos três estados, a linha tocável, os glifos, os poços e os marcadores. A lista das garagens daqui é a escolha numa lista, não a lista de garagens da folha (T02-A4). O que só a T02 desenha virou variante nomeada (G11): a linha de escolha escolhível, em que a garagem vencida também se escolhe, e a busca com a dica em texto.

## Histórias de usuário

- **HU-T02-1** — Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa
- **HU-T02-2** — Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
