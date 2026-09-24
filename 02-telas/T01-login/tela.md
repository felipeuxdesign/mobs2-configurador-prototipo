# T01 · Login

Entrar no app com usuário e senha, e recuperar o acesso sem ligar pra ninguém.

| | |
|---|---|
| **Elemento-assinatura** | a marca Mobs2 presa a 207px do topo — o formulário cresce embaixo dela sem movê-la |
| **Chrome** | sem faixa · barra do sistema na cor da página |
| **Semente no protótipo** | nenhuma sessão · usuário r.vieira preenchido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 6 · 3 — ver `estados.md` |

## O que se toca

- `Entrar` → T02 se a senha tiver 8 caracteres ou mais; com menos, o erro de usuário ou senha
- `Esqueci a senha` → recuperar: escolher o canal
- canal escolhido → digitar o código (482913 no mock) → nova senha → senha alterada → login
- `Não recebi o código` → a folha com as três saídas
- o terceiro código errado mata o código e libera o reenvio na hora, sem esperar os 60 s (T01·4)
- o olho do campo de senha mostra e esconde
- `Lembrar meu usuário` marca e desmarca · desmarcado por padrão

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- duas ações
- folha
- diálogo sem saída
- folha com opções
- barra do sistema sob o véu
- os glifos de estado
- os poços
- falha
- segmentado
- a marca no login
- campo
- campo focado
- requisitos da senha
- código · seis células
- código errado
- link dentro do conteúdo
- botões só de ícone
- checkbox
- checkbox marcado
- linha de opção

Corrigida no C4 pelo medido (G10, T01-A10): saíram as 14 peças que nenhuma das dez desenha (diálogo, diálogo com ciência, as duas seções do checklist, linha do histórico, as três da garagem, as cinco da cadeia e do encerramento, e a lista com contagem). Entraram as que a tela usa e faltavam: as de toque da folha 1, a barra sem sessão, as duas ações, os glifos e os poços, a falha do 01, o segmentado, os botões só de ícone e o checkbox marcado. O primário desabilitado não está desenhado em nenhuma referência: aparece no toque, com o código incompleto, sem envio na hora ou com a senha nova fora dos requisitos. O que só a T01 desenha virou variante nomeada (G11): o rodapé do login, o segmentado com folga 8, o foco do código fora do próximo dígito e a linha de opção desabilitada. O cartão do canal, o do código, a linha do código conferido e o campo da senha nova não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T01/`.

## Histórias de usuário

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com 3 saídas: conferir e reenviar · trocar canal · acionar gestor
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
