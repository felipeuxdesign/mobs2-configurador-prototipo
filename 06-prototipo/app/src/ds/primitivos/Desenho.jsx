// O desenho de um ícone (o pacote 37 · a lei 14): o SVG exato do jogo de ícones, lido de
// 03-design-system/icones na hora de montar, nada copiado. O ícone é este desenho, nunca o
// parecido de uma biblioteca — o lucide-react saiu do app.
// · a cor vem do token, por currentColor, na peça que usa (o Icone, o Glifo)
// · o traço e o tamanho vêm da peça, pela classe (lei 14: 2,2 nos glifos de estado, 1,8 nas
//   ferramentas e nas folhas), como a referência de cada lugar
// · o vão de um risco (o olho riscado, o Bluetooth desligado) é pintado na cor do fundo onde o
//   ícone mora: o poço, por padrão; o campo, que é rebaixado, diz o dele (--fundo-do-icone)
// · o ponto do sem-rede tem, em toda referência, a cor do traço (o vermelho da T03/01, o cinza
//   das outras): o arquivo do jogo grava o cinza, e aqui ele segue a cor do ícone
const ARQUIVOS = import.meta.glob('../../../../../03-design-system/icones/*.svg', { query: '?raw', import: 'default', eager: true })

function ler(svg) {
  const caixa = /viewBox="([^"]+)"/.exec(svg)[1]
  const miolo = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/var\(--poco, #[0-9A-Fa-f]{6}\)/g, 'var(--fundo-do-icone, var(--poco))')
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
  return { caixa, miolo }
}

export const DESENHOS = Object.fromEntries(Object.entries(ARQUIVOS).map(([caminho, svg]) => [caminho.split('/').pop().replace(/\.svg$/, ''), ler(svg)]))

// As três setas das linhas não estão no jogo de 41 (o desvio nomeado do pacote 37, pro arquiteto pôr no
// jogo): o desenho é o das referências, na caixa de 20 delas — › (126 vezes, as linhas que abrem),
// ˄ (18, a seção aberta) e ˅ (17, a garagem da tira do menu). A seção da T13 gira a › pra cima (a
// animação da seta, T13): girada -90° no centro, ela é exatamente a ˄ das referências.
export const SETAS = {
  'seta-avancar': { caixa: '0 0 20 20', miolo: '<path d="M7.5 5l5 5-5 5"></path>' },
  'seta-recolher': { caixa: '0 0 20 20', miolo: '<path d="M5 12.5l5-5 5 5"></path>' },
  'seta-abrir': { caixa: '0 0 20 20', miolo: '<path d="M5 7.5l5 5 5-5"></path>' },
}

// Os desenhos que nenhuma das 201 telas usa, e por isso não estão no jogo (o desvio nomeado do pacote 37,
// pro arquiteto pôr no jogo): o desenho é o das folhas do design system, que são referência —
// · energia (é com você, o passo que pede o corte · folhas 3 e 5) e lua (em repouso · folha 3)
// · o e-mail da linha de opção (as folhas 2 e 6)
// · a câmera do visor sem a permissão (a T13 sem a câmera): nenhuma referência a desenha; é a câmera
//   do visor (foto) com o risco do jogo, o mesmo vão e o mesmo traço do olho riscado (lei 21)
const RISCO = '<line x1="3.5" y1="3.5" x2="20.5" y2="20.5" stroke="var(--fundo-do-icone, var(--poco))" stroke-width="4.6"></line><line x1="3.5" y1="3.5" x2="20.5" y2="20.5"></line>'
export const DAS_FOLHAS = {
  energia: { caixa: '0 0 24 24', miolo: '<path d="M12 3v8"></path><path d="M6.3 6.8a8 8 0 1011.4 0"></path>' },
  lua: { caixa: '0 0 24 24', miolo: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"></path>' },
  email: { caixa: '0 0 24 24', miolo: '<rect x="3" y="5" width="18" height="14" rx="1"></rect><path d="M3 7l9 6 9-6"></path>' },
}
DAS_FOLHAS['foto-riscada'] = { caixa: '0 0 24 24', miolo: (DESENHOS.foto?.miolo ?? '') + RISCO }

export function Desenho({ nome }) {
  const d = DESENHOS[nome] ?? SETAS[nome] ?? DAS_FOLHAS[nome]
  if (!d) throw new Error(`o ícone ${nome} não está no jogo (03-design-system/icones)`)
  return <svg className="ds-desenho" viewBox={d.caixa} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d.miolo }} />
}
