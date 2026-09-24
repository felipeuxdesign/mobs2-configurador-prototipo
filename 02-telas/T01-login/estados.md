# T01 · estados e momentos

**Momento** é aonde se chega tocando, no fluxo. **Estado** depende do mundo — do módulo, do ônibus, da rede —, e no palco abre pela coluna: é o próprio app montado pelo caso do mock, parado e sem toque.

| Referência | Tipo | Como se chega · o que causa | Caso do mock |
|---|---|---|---|
| `00-tela` | tela | a entrada da tela | nenhuma sessão · usuário r.vieira preenchido |
| `01-estado-usuario-ou-senha-incorretos` | estado | Entrar com senha de menos de 8 caracteres · a senha é apagada e o cursor vai pra ela; o usuário fica | `credenciais` |
| `02-momento-recuperar-escolher-canal` | momento | `Esqueci a senha` | derivado do fluxo |
| `03-momento-recuperar-digitar-codigo` | momento | escolher o canal | `credenciais.recuperacao` |
| `04-momento-nao-recebi-o-codigo` | momento | `Não recebi o código` | derivado do fluxo |
| `05-momento-codigo-errado` | momento | digitar um código diferente de 482913 | `credenciais.recuperacao` |
| `06-estado-codigo-expirado` | estado | o código passa de 10 minutos | `recuperacao.limites.validadeMin` |
| `07-estado-tentativas-esgotadas` | estado | o terceiro código errado | `recuperacao.limites.tentativas` |
| `08-momento-recuperar-nova-senha` | momento | o código certo | derivado do fluxo |
| `09-momento-senha-alterada` | momento | a nova senha cumpre os seis requisitos | derivado do fluxo |
| `10-momento-senha-visivel` | momento | tocar no olho — a senha aparece por extenso e o olho vira o riscado | `credenciais.senha` |
| `11-momento-nao-recebi-reenvio-liberado` | momento | os 60 s do reenvio zeram | `recuperacao.limites.reenvioSeg` |
| `12-momento-codigo-reenviado` | momento | tocar em *Conferir e reenviar* | `recuperacao.limites` |
| `13-momento-codigo-no-e-mail` | momento | tocar em *Mandar para o e-mail* | `credenciais.contato` |

A regra de todo estado: **ele muda o conteúdo, nunca o desenho.** Os blocos ficam onde estão; muda o que eles dizem. A falha mora no elemento que falhou.
