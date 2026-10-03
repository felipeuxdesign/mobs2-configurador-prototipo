# Quem usa

## O técnico de campo

**Terceirizado, sem conhecimento de protocolo.** Trabalha embaixo de um ônibus, no pátio, muitas vezes sem rede. Uma mão no módulo, outra no celular — às vezes de luva, às vezes no sol. Instala de 1 a 4 vezes por mês, então **nunca tem prática**: cada instalação é quase a primeira.

O que isso decide no desenho:

- **menos decisão ganha de mais informação**, sempre
- cada tela responde **uma pergunta de negócio** — *é este o ônibus?*, *o evento chegou?* —, nunca uma de protocolo
- alvo de toque de 48px, 56 no primário; o rodapé com as ações onde o polegar alcança
- o app diz o que falhou **e o que fazer**, na mesma linha, sem mandar ligar pra ninguém
- estado raro é sempre estado desconhecido: a tela explica o que se perdeu e o que continua valendo

## Quem mais olha

- **o gestor**, que recebe a instalação homologada e quer saber que ela funciona
- **o PM**, dono das regras de negócio — as pendências com ele estão em `08-para-o-dev/o-que-o-produto-ainda-decide.md`
- **quem aprova o produto**, que vê o protótipo no palco e precisa ver a evidência nascendo
