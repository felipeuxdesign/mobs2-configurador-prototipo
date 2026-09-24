# T04 · Menu

O painel das ferramentas: o que está pronto pra usar, o que espera o quê.

| | |
|---|---|
| **Elemento-assinatura** | a grade de dez cartões em que cada ferramenta diz, no próprio cartão, o que falta pra ela funcionar |
| **Chrome** | tira de contexto (garagem) + faixa de sessão · sem sessão, a faixa diz só o fato (01) |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 7 · 4 — ver `estados.md` |

## O que se toca

- `Conectar módulo` → T05
- `Ativo selecionado` → T06, com o módulo conectado e o ônibus ainda não escolhido
- cada ferramenta liberada → a tela dela
- `ENCERRAR` → a sessão abortada, na T16 (`logica.md` · ENCERRAR)
- o nome da garagem na tira → folha Trocar de garagem
- outra garagem na folha → com a sessão aberta, o diálogo de trocar (T04·4); sem ela, a sincronização da garagem escolhida. O Pátio Caruaru, com o pacote vencido, não se toca (T04·6)
- as iniciais RV → folha Conta
- `Sair da conta` → diálogo, se houver sessão ou fila; sem as duas, direto pro login, e o diálogo mostra só a frase que vale (T04·5)
- o `Cancelar` dos dois diálogos volta à folha de onde ele nasceu (T04·8)
- `Encerrar a sessão e sair` → login, com a fila preservada · `Encerrar a sessão e trocar` → a sincronização da garagem nova. Os dois passam pelo encerramento sem homologar da T16 quando ele existir (C11); até lá, seguem direto (G23)
- com a folha ou o diálogo aberto, o menu não se toca — nem o que fica atrás do véu, nem a tira, que fica acesa em cima dele. Nas folhas do módulo e do ativo, o véu começa embaixo da faixa, e a faixa também fica acesa, sem se tocar
- a folha fecha pelo X, tocando no véu, fora dela, e pelo voltar do sistema (no computador, o Esc); o diálogo, pelo `Cancelar` e pelo voltar, que faz o mesmo que ele (`logica.md` · O voltar do Android)
- com a sessão aberta, o cartão do módulo → folha Módulo conectado (10) · o do ativo → folha Ativo da sessão (11) · os dois ficam travados (HU-T16-2): a folha diz isso e oferece `Encerrar a sessão`, que leva ao mesmo destino do `ENCERRAR` da faixa. Com o módulo sem ativo (02), o cartão do módulo já abre a folha dele. Substitui a T04·7 do C0, em que os dois cartões não se tocavam
- cartão de ferramenta em espera é desabilitado de verdade: o toque não faz nada, o motivo já está escrito nele, e pro leitor de tela ele é desabilitado (`logica.md` · Os cartões em espera)

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
- folha com opções
- seção aberta do checklist
- seção recolhida
- disponível
- decide agora
- espera
- conectado
- com pendência
- espera a rede
- nota com rótulo
- linha do histórico
- linha de garagem
- linha de garagem · a atual
- a lista de garagens
- cadeia concluída
- cadeia recusada
- linha da fila
- linha da re-checagem
- contador no menu

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema no menu
- faixa · sem sessão
- faixa · módulo com falha
- tira de contexto
- faixa no menu
- o topo do menu inteiro
- folha
- diálogo
- os glifos de estado
- os ícones de ferramenta
- os poços
- os marcadores
- disponível
- decide agora
- conectado
- com pendência
- espera
- espera a rede
- aviso
- nota com rótulo
- linha de garagem
- linha de garagem · a atual
- a lista de garagens
- botões só de ícone
- contador no menu

Corrigida no C5 pelas referências (G1, G10, T04-A8): saíram as sete peças que nenhuma das dez desenha (faixa · sem ação, diálogo sem saída, diálogo com ciência, linha do histórico, a marca no login, campo e campo focado) e entraram a faixa · sem sessão do 01 e o aviso do 08. O que só a T04 desenha virou variante nomeada da peça (G11): o cartão largo em espera e o 'decide agora' com poço 30 (CartaoFerramenta), o aviso sem poço (Aviso), a folha com folga 12 e subtítulo (Folha), a linha de garagem que espera o envio (LinhaGaragem) e o traço da falha por cima da faixa do menu (Faixa). O cartão da conta, o prazo do acesso e o Sair da conta são as peças da folha 2 que moram dentro da folha. No acerto do design system pelo medido (G10), entraram as peças de toque da folha 1 (o primário e o link dos diálogos, e a linha tocável), os átomos da folha 3 (glifos, ícones de ferramenta, poços e marcadores) e o X das folhas; e entraram como variante também a grade com 10 entre os cartões e o cartão travado com a sessão aberta. Com as folhas do módulo e do ativo (10, 11), o cartão travado saiu, do DS e da linha do conectado no `componentes.md`: com a sessão aberta, o cartão largo é o de sempre e abre a folha. As folhas usam a folha com o X, a nota com rótulo (TRAVADO NA SESSÃO) e o botão da folha, embaixo da tira e da faixa do menu; o cartão do que a sessão prendeu (o ícone de ferramenta num poço de 44, a identidade e o detalhe) só elas desenham, e é peça da tela (`pecas.jsx`), montada com os poços e os ícones da folha 3. O véu ganhou o toque fora da folha, declarado como variante da folha (G11). No acerto pelo medido depois das duas folhas (G10), a T04 entrou na coluna da nota com rótulo, e saíram da lista as quatro que a junção da atualização tinha trazido de volta e que nenhuma das doze desenha nem o código usa: diálogo sem saída, diálogo com ciência, folha com opções e linha do histórico.

## Histórias de usuário

- **HU-T04-1** — Vejo o semáforo do módulo no topo e a faixa de sessão acima dele
- **HU-T04-2** — Vejo 10 ferramentas; as que dependem de módulo ou ativo ficam desabilitadas com o motivo
- **HU-T04-3** — A fila mostra o contador de pendentes no próprio cartão, sem abrir
- **HU-T04-4** — Checklist pendente aparece como aviso persistente
- **HU-T04-5** — Não existe console de log. Cada ferramenta reporta estado em linguagem de campo

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
