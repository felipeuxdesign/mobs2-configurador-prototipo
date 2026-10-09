// O retorno do PM de 09/10 · o arrastado nunca é reenviado sozinho: o fluxo das cercas inteiro, vivo.
// Nenhuma entrada viva do palco leva à manutenção (os exemplos dela são consultas paradas desde 07/10),
// então o roteiro semeia o que a T06 gravaria num vínculo de manutenção (etapas.ativo.modo) e segue só
// com toques: a folha de confirmação, o envio, a pergunta pelos dependentes, o Deixar para depois, o
// Finalizar travado no checklist, e o reenvio do que ficou, até o Finalizar voltar.
const FOLHA_SOBE = [{ prop: 'transform', ms: 200, em: 'ds-folha' }]
const FOLHA_DESCE = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const SURGE = [{ prop: 'opacity', ms: 150, em: 't09-pergunta-surge' }]
const ACENDE = [{ prop: 'opacity', ms: 150, em: 't09-pergunta-acende' }]
// o vínculo de manutenção que a T06 grava, num módulo já configurado — a cadeia gravada (estado/estado.jsx: o despachar do provedor, achado pela árvore do React)
const MANUTENCAO = `
  const el = document.querySelector('.t04'); const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$'))
  let f = el[k]; while (f && !(f.memoizedProps?.value?.despachar && f.memoizedProps.value.estado)) f = f.return
  const { estado, despachar } = f.memoizedProps.value; const e = estado.etapas
  despachar({ tipo: 'mesclar', parcial: { etapas: { ...e, ativo: { ...(e.ativo ?? {}), modo: 'manutencao' }, cadeia: { confirmados: 6 } } } })
  despachar({ tipo: 'ir', tela: 'T09' })
  return true`

export default [
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { executa: MANUTENCAO },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  { ve: 'Reenvie um bloco por vez. A limpeza apaga só o que você escolher.' },
  // ── a folha de confirmação (13): a consequência, antes de enviar · o Cancelar só fecha ──
  { toca: 'Reenviar as cercas', anima: FOLHA_SOBE },
  { chega: 'T09', momento: '13-momento-manutencao-folha-de-confirmacao' },
  { ve: 'Reenviar as cercas apaga os cartões gravados no módulo.' },
  { ve: 'Os cartões voltam pela plataforma web.' },
  { naoToca: 'ENCERRAR' },
  { dorme: 300 },
  { toca: 'Cancelar', anima: FOLHA_DESCE },
  { naoVe: 'Reenviar as cercas apaga os cartões gravados no módulo.' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  // ── o envio (09): só as cercas, e quem precisa ser reenviado depois ──
  { toca: 'Reenviar as cercas', anima: FOLHA_SOBE },
  { dorme: 300 },
  { toca: 'Reenviar as cercas' },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { ve: 'Reenviando só as cercas.' },
  { ve: 'Leitor e Eventos precisam ser reenviados depois. Você confirma em seguida.' },
  { naoVe: 'ficam como estão' },
  // ── conferiu (10): o check, e a pergunta pelos dependentes surge embaixo, um por vez ──
  { chega: 'T09', momento: '10-momento-manutencao-concluida', ms: 8000 },
  { ve: 'Cercas conferem. Dois blocos dependem delas.' },
  { anima: SURGE },
  { ve: '1 · Leitor' },
  { ve: 'usa os cartões que as cercas apagaram' },
  { ve: 'usam as cercas e o leitor · libera depois do leitor' },
  { desligado: 'Reenviar os eventos' },
  // ── Deixar para depois: o leitor fica falta reenviar, e o Reenviar dos eventos acende no lugar ──
  { toca: 'Deixar para depois: Leitor', anima: ACENDE },
  { ve: 'falta reenviar' },
  { naoVe: 'libera depois do leitor' },
  { toca: 'Deixar para depois: Eventos' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },                                   // o aviso do acesso vencendo, na primeira chegada ao menu
  // ── o checklist: a Seção D com o revisar em seguida, e o Finalizar travado com a causa ──
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { ve: 'Falta reenviar o leitor e os eventos.', ms: 8000 },
  { desligado: 'Finalizar instalação' },
  { toca: 'D · Configuração' },
  { ve: 'revisar em seguida' },
  { ve: 'roda ao encerrar' },
  // ── o Reenviar do leitor, pela Seção D: a lista com o que falta (16) e a folha do leitor (18) ──
  { toca: 'Reenviar: Leitor' },
  { chega: 'T09', momento: '08-momento-manutencao-escolher-o-bloco' },
  { ve: 'Falta reenviar o leitor e os eventos.' },
  { toca: 'Reenviar o leitor', anima: FOLHA_SOBE },
  { chega: 'T09', momento: '18-momento-manutencao-folha-do-leitor' },
  { ve: 'Reenviar o leitor pede reenviar os eventos depois.' },
  { dorme: 300 },
  { toca: 'Reenviar o leitor' },
  { chega: 'T09', momento: '15-momento-manutencao-o-leitor-pergunta-pelos-eventos', ms: 8000 },
  { ve: 'Leitor confere. Um bloco depende dele.' },
  { ve: 'usam o leitor' },
  // a pergunta é a confirmação: os eventos vão direto, sem folha
  { toca: 'Reenviar os eventos' },
  { chega: 'T09', momento: '09-momento-manutencao-reenviando' },
  { ve: 'Reenviando só os eventos.' },
  { ve: 'Eventos conferem.', ms: 8000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // ── nada falta: o Finalizar volta a ser decidido pelo resto do checklist ──
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { naoVe: 'Falta reenviar', ms: 8000 },
  { toca: 'D · Configuração' },
  { naoVe: 'revisar em seguida' },
]
