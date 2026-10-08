# Gate · consultas paradas e entrada normal do palco

## Censo e achados

15 telas, 191 HTMLs e 191 PNGs, 97 momentos, 79 estados, 295 tokens distintos, 62 casos e 114 espécimes. A auditoria das 15 sementes encontrou três entradas do painel que divergem do caminho normal: T02 (uma empresa), T10 (caminhão que calibra) e T11 (par divergente). As outras sementes não criam outro percurso. Os estados existentes e suas famílias já abrem inertes.

A manutenção T09/08–10 só se alcança a partir de cenários especiais. O quadro T13/29, relendo após uma falha, também não tinha opção própria. T07/06 (firmware) e os resultados das releituras T13/30–37 já estão na coluna e parados.

Referências abertas neste ciclo: T02/00 e 01; T09/08, 09 e 10; T10/00, 01 e 05–09; T11/00. T11/03 já foi medida e aprovada no ciclo anterior; T13/29 também foi aberta antes da implementação. Nenhuma medida ou desenho do app muda.

## Decisões autorizadas

1. O painel e o endereço simples das telas abrem a entrada normal: T02 no mundo das três empresas do técnico, T10 no ônibus sem calibração, T11 no par que confere. As sementes das referências continuam disponíveis para fotografar e montar consultas; não são reescritas globalmente.
2. Acrescentar 15 referências existentes em **Estados desta tela**, sempre paradas: T02/00–01 (uma empresa); T09/08–10 (manutenção); T10/00, 01, 05–09 (calibração do caminhão); T11/00 e 03 (divergência e sua folha); T13/29 (relendo após falha). Consultas avulsas ficam abaixo dos estados atuais; detalhes da família continuam recuados. Os tipos normativos e as contagens permanecem iguais.
3. Consultas não gravam, não avançam com o tempo e não respondem ao toque ou ao voltar do sistema. Trocar entre elas preserva o instante guardado; **Voltar ao fluxo** devolve o percurso anterior. O conteúdo vem do caso ou da semente da referência, independentemente da sessão guardada.
4. Links antigos de momentos especiais reabrem como consultas paradas fora do modo de fotografia. Momentos normais, folhas e decisões reais do produto continuam no percurso: recuperação de senha, seleção, gravação, ciclo, checklist e encerramento. Não criar um caminho alternativo de demonstração nem alterar o mock para torná-lo acessível.
5. Documentar, verificar, committar e dar push. O GIF do caminho normal só precisa mudar se a validação encontrar alteração nesse caminho.

Autorização direta: “pode deixar tudo parado e preservar o fluxo normal, sem fluxo alternativo”; ampliada por “a gente mata todos os alternativos e deixa como telas paradas” e “colocar essas telas como estados desta tela”. A orientação substitui os exemplos navegáveis do palco; não exige outro pedido de autorização.

## Divergências e limites

Os exemplos de uma empresa, do caminhão e da conferência divergente eram escolhas documentadas de sementes. Este ciclo substitui o acesso navegável a esses exemplos por decisão do usuário. Referências, dados e regras de produto permanecem; a classificação no índice não vira estado só porque a coluna oferece a consulta. Históricos de pacotes e gates não são reescritos.

O palco guarda estado global, mas alguns quadros possuem escolhas locais anteriores à consulta. Verificar a restauração e registrar limitações observadas, sem prometer preservar dados que o app não guarda.

## Validação

- `testar-consultas`: 15 quadros pela coluna/URL, mesmos conteúdos nos links antigos, nenhuma mudança após toque/Esc/2,2s; cinco retornos conservam o estado global; três entradas normais pelo painel. A consulta divergente continua em 4 de 4 depois da cadeia normal concluída e devolve os seis blocos anteriores. Nomes e opções cabem na coluna; cinco prints em `consultas-paradas/`.
- Caminho do herói aprovado, 239 passos. A primeira passagem em paralelo com outras verificações falhou apenas na janela de tempo da conferência do servidor; a passagem isolada foi aprovada, sem mudança no produto ou no limite do teste.
- `conferencia` atualizado para os acessos atuais e aprovado, 100 passos: os quatro modos de fechar a folha normal, registrar, reenviar inclusive após a cadeia concluída e consultas bloqueadas. As demonstrações navegáveis do exemplo divergente saíram do roteiro; as regras do produto continuam implementadas.
- `familias` aprovado, 28 passos; detector visual sem achados. `checar` aprovado (213 conferências do mock e verificações locais), build aprovado, com o aviso anterior do tamanho do bundle.
- As 15 referências não pioraram contra a base; comparações em `consultas-paradas/comparacoes.json`. `mov-t11` aprovado, 132 passos; `mov-t10` aprovado, 78 passos. Nenhum HTML, PNG normativo, token, caso ou GIF mudou neste ciclo. A suíte completa de referências e roteiros não foi executada. Os demais roteiros com entradas sintéticas antigas (como `empresa`, `voltar`, `teclado` e `reler`) não são o aceite deste ciclo; seus trechos de exemplos navegáveis precisam ser migrados antes de reutilizar essas verificações. O comportamento novo é coberto pelo `testar-consultas`.
- As limitações anteriores de escolhas locais não gravadas no estado global continuam documentadas no palco: este ciclo não introduz uma promessa de persistência adicional.
