# Gate · documentação vigente e login depois da recuperação

## Censo medido

Em 08/10/2026: 15 telas, 97 momentos, 79 estados e 191 pares HTML/PNG pelo `02-telas/indice.json`; todos os arquivos existem. 109 histórias distintas em `01-produto/historias.md`, 295 tokens distintos no CSS, 106 linhas normativas de componentes, 62 chaves em `mocks.js.casos` e 45 arquivos de roteiros. Os espécimes da vitrine são contados separadamente das peças normativas.

## Achados e divergências

Os guias de entrada ainda traziam contagens de versões anteriores. A integração descrevia ré e porta, e a lógica misturava o ciclo de cinco/seis passos com os quatro atuais. O caminho do herói ainda era descrito com calibração obrigatória e homologação no checklist. As descrições antigas de GPS, alimentação e recuperação de senha precisam acompanhar as referências e o mock atuais. Há roteiros históricos cujas entradas sintéticas foram substituídas pelas consultas paradas; não foram todos executados no último aceite.

## Decisões autorizadas

1. Atualizar os guias vigentes, os READMEs e as descrições factuais comprovadas pelas fontes atuais. Fazer links locais apontarem para os arquivos reais.
2. Preservar o histórico dos gates, decisões e entregas; marcar como histórico o que deixou de orientar a versão atual. Não reescrever resultados antigos de testes.
3. Separar as decisões já respondidas das pendências reais. Não inventar integração ou transformar limitação do protótipo em regra de produto.
4. Atualizar o registro de mudanças e validar censo, links e coerência documental. Conservar mock, tokens, textos e referências HTML/PNG, desenho e GIF.
5. Pelo pedido adicional de 08/10, ao tocar em Entrar com a senha nova, devolver o login com `M.credenciais.senha` preenchida e escondida, mantendo o usuário. Alterar somente esse handler e os roteiros afetados; não guardar a senha nova nem mudar o login depois de sair da conta.

Autorização direta do usuário: “ok atualiza tudo oq for possível, e o readme também”. O pedido autoriza esta correção documental; não exige outro *vai*. A mudança de T01 foi autorizada em seguida: “nem precisa salvar já com a nova senha [...] entrar pra tela normal com a senha normal mesmo [...] só pra simular”. Foram abertas as referências T01/00 (login preenchido) e T01/09 (Senha alterada); não há mudança de geometria ou texto.

## O que ainda não faz sentido tratar como pronto

O protótipo não implementa serviços e equipamento reais. O envio do diagnóstico da T11 e a diferença de captura aberta/fechada da T14 ainda precisam de definição/implementação no produto; ambos devem ser descritos sem prometer comportamento que o código não executa. A suíte de 45 roteiros não pode ser declarada aprovada pela validação parcial da última rodada.

## Validação

- Censo confirmado: 15 telas, 97 momentos, 79 estados, 191 pares HTML/PNG existentes, 109 IDs de histórias preservados e iguais no domínio, 295 tokens, 62 casos e 45 roteiros. Vitrine medida em 114 espécimes; 106 peças normativas. Links locais dos documentos revisados conferidos, sem quebrados. A lógica antiga foi preservada integralmente em [histórico](../historico/logica-ate-consultas-paradas.md) e o guia vigente foi consolidado.
- `npm run checar` aprovado, incluindo as 213 conferências do mock e a higiene do código. Build aprovado; permanece o aviso anterior do bundle acima de 500 kB.
- `mov-t01` aprovado, **311 passos**: recuperação, retorno preenchido e entrada na T02, campos, diálogo, movimento e reduzir movimento. A primeira tentativa não iniciou porque o servidor local estava desligado; foi reiniciado antes da passagem aprovada, sem mudança no app por isso.
- Verificação em aba própria confirmou usuário mantido, senha igual ao mock, campo escondido, Entrar habilitado, URL sem momento e destino T02. Print inspecionado e resultado em [retorno-login](retorno-login/).
- T01/00 permanece em **0% contra o HTML** e 0,26% contra o PNG. Não há mudança de geometria, CSS, token ou referência normativa.
- `recuperar` aprovado, **223 passos**: telefone, e-mail, país, espera e teto de envio, código, nova senha, retorno preenchido e regras dos campos/erro/entrada.
- Nenhum mock, token, texto normativo, HTML/PNG de referência ou GIF foi alterado. O handler da T01 e os dois roteiros afetados são as únicas mudanças de código. Não foram executados os 45 roteiros nem comparadas as 191 referências neste ciclo.
