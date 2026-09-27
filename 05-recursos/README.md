# Os recursos

| O quê | Onde | Como usar |
|---|---|---|
| **a marca** | `marca/logo-mobs2.svg` | o arquivo do login · importe como arquivo do projeto, nunca por endereço de fora · o lima dela é o `--lima`, `#AAEF00` · se chegar outra versão do arquivo, confira a cor antes de trocar |
| **a fonte** | Barlow 400, 500, 600, 700 · `fontes/` | as referências já usam estes arquivos · no protótipo, os mesmos arquivos, lidos daqui e empacotados no build · nunca pelo Google |
| **a fonte da barra de status** | Google Sans 500, recortada só com os números e os dois-pontos · `fontes/GoogleSans-hora.woff` (3,7 KB), com a licença `fontes/OFL-GoogleSans.txt` ao lado | só na hora da barra, que é do sistema (decisão 43, lei 22) · as referências a levam embutida; o protótipo lê este arquivo e o empacota no build · nunca da internet |
| **o GIF do README** | `readme/caminho-do-heroi.gif` | o começo do caminho do herói, do login à cadeia gravada, gravado do protótipo rodando: `GRAVA=prints/tmp/gravacao GRAVA_JANELA=1280x900 node scripts/caminho.mjs readme` e `python3 scripts/gif.py prints/tmp/gravacao ../../05-recursos/readme/caminho-do-heroi.gif --vel 1.4 --desde 1.6`, da pasta `06-prototipo/app` · grave de novo quando o caminho mudar |
| **os ícones** | Lucide | `lucide-react`, com o traço dos tokens · nunca desenhados à mão |

Os números sempre em `font-variant-numeric: tabular-nums`.
