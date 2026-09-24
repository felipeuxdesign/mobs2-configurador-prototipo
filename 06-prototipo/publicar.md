# Publicar

## O caminho

1. **Validar local:** `npm run dev` — é onde se valida cada ciclo
2. **Validar a versão de produção, ainda local:** `npm run build` e `npm run preview`. É essa que vai pro ar, e às vezes o que funciona no modo de desenvolvimento quebra no build
3. **Subir pra Vercel:** o repositório conectado à Vercel. **Cada ciclo ganha um link de prévia próprio**, sem mexer no link oficial; o link oficial só muda quando o ciclo é aprovado

## Tudo viaja dentro do build

Na Vercel não tem servidor nem pasta do lado. Então:

- a fonte de `05-recursos/fontes/`, empacotada no build · os ícones com `lucide-react` · a logo como arquivo do projeto
- o mock importado no build · **nenhuma chamada pra fora**
- nenhuma imagem de tela — o celular sempre roda código

## O link tem que funcionar pra quem recebe

- abre no computador e no celular — no celular, o modo janela estreita
- os endereços diretos, como `?tela=T07&estado=01-estado-fora-da-faixa`, abrem certo
- a etiqueta com a data e o ciclo aparece no canto do palco

## Na Vercel

O repositório é a pasta inteira — os documentos andam junto com o código. O projeto da Vercel constrói **só a `app/`**:

| Configuração | Valor |
|---|---|
| Root Directory | `06-prototipo/app` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Include files outside the Root Directory in the Build Step | **ligado** |

O último item é obrigatório: o protótipo lê o mock de `04-dados/` e a marca de `05-recursos/`, fora da `app/`. Com ele desligado, o build não acha o mock e quebra. **Os arquivos continuam onde estão** — nunca copie o mock pra dentro da `app/`, senão passam a existir dois e um deles mente.

## A configuração

O app é uma página só: os lugares moram na URL, então a Vercel serve o `index.html` pra tudo. Um `vercel.json` com a regra de reescrever qualquer caminho pro `index.html` garante isso.
