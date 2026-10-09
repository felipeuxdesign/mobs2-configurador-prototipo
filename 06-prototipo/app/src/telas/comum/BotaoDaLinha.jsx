// O botão de dentro da linha (a rodada 1 do retorno do PM): a resposta do técnico
// que mora na própria linha do passo ou do item, fora do rodapé — o Confere com o
// cartão e o Não confere da T14/08, o Ouvi e o Não ouvi da T13/40, e o Testar bip
// da T13/05. Nenhuma folha desenha esta peça: ela é das telas (como o instrumento
// do item, T13/pecas.jsx), montada com os tokens do botão secundário — o fundo em
// --divisoria e a borda em --borda-poco, como as referências — e vai ao
// arquiteto pra entrar na folha 6. Sem roxo e sem lima (não é o primário); no
// toque afunda, como o secundário.
// · `tam`: 'resposta' (40 de alto, os dois lado a lado, cada um com a metade) e
//   'teste' (30 de alto, o Testar bip, do tamanho do texto, à direita do título).
//   'pergunta' (36 de alto, o Reenviar de cada dependente na manutenção da T09, 10/14/15).
// · `letra`: a das referências — 13 no cartão da T14, 14 no bip da T13.
import './BotaoDaLinha.css'

export function BotaoDaLinha({ children, aoTocar, rotulo, desabilitado = false, tam = 'resposta', letra = 'corpo' }) {
  return (
    <button type="button" className={`t-botao-linha t-botao-linha-${tam} t-botao-linha-letra-${letra}`}
      disabled={desabilitado} aria-label={rotulo} onClick={desabilitado ? undefined : aoTocar}>
      {children}
    </button>
  )
}

// os dois, lado a lado, a 8 um do outro (T14/08, T13/40)
export function RespostasDaLinha({ children, className = '' }) {
  return <div className={`t-respostas-linha ${className}`}>{children}</div>
}
