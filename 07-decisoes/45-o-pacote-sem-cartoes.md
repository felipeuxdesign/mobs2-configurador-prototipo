# 45 · O pacote sincronizado não leva os cartões

> **Atualizada na errata do pacote 1:** a limpeza nunca apaga os identificadores — a v1 não grava cartões, então eles nunca voltariam · o autoteste confere o *Extended ID · preservado* · o pacote é contado das coleções: as conexões, os eventos embarcados e as regiões de cada unidade.

**O contexto.** O PM definiu o que a sincronização baixa: ativos, conexões, modelos, eventos e cercas. Os cartões e iButtons não entram — a v1 não grava cartões no módulo, só lê os que já estão lá.

**A decisão.** O pacote tem cinco grupos, 31 itens no herói: 10 ativos, 2 conexões, 3 modelos, 12 eventos e 4 cercas. O cadastro de identificadores continua no mock — é de onde vêm o Extended ID da conferência e o cartão do ciclo —, mas não viaja no pacote.

**O que foi descartado.** Um sexto grupo de cartões vazio, que diria que eles existem sem servir pra nada no campo · baixar os cartões pra consulta, que pesaria o pacote sem uma tela que use.

**A consequência.** A T03 lista cinco grupos · o `contem` dos três pacotes troca os cartões por conexões, eventos e cercas · o gate confere que nenhum pacote leva cartões, e que os cinco grupos somam 31.
