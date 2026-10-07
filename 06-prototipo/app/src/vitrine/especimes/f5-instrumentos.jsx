// Folha 5 · cadeia e processo. Texto exato da folha. O pacote 1 tirou da folha
// as leituras da CAN (a leitura, a pequena, o tambor, os sinais e os instrumentos
// apagados: a T07 antiga) e pôs a cadeia antes de gravar. O módulo não guarda
// versão (decisão 49): o valor de cada elo é o conteúdo do bloco, do
// CADEIA.conteudo do mock, montado como a T09 monta (elosDo), nunca digitado.
import { Cadeia, Encerramento, Segmentado, Precondicao, Prazo, BarraDoChecklist } from '../../ds/instrumentos/index.js'
import { M } from '../../dados/mock.js'
import { elosDo, TOTAL } from '../../telas/T09/cadeia.js'

const conteudo = M.cadeia.conteudo
// o herói recusado nas Cercas: a Limpeza e o Ativo relidos, os três seguintes não alcançados
const CERCAS = M.cadeia.ordem.indexOf('cercas')

const PASSOS = ['Contadores e estado', 'Reinício do módulo', 'Releitura completa', 'Repouso do módulo', 'Canal de programação', 'Registro da sessão', 'Desconexão', 'Autoteste']
const espera = (nome) => ({ estado: 'espera', nome, situacao: '—' })
const pulado = (nome) => ({ estado: 'pulado', nome, situacao: 'pulado' })

export const especimes = [
  // processo
  { id: 'f5-cadeia-concluida', folha: 5, rotulo: 'cadeia concluída', legenda: 'trilho lima',
    render: () => <Cadeia elos={elosDo({ confirmados: TOTAL, fase: 'concluida' }, conteudo)} /> },
  { id: 'f5-cadeia-recusada', folha: 5, rotulo: 'cadeia recusada', legenda: 'o elo que falhou acende',
    render: () => <Cadeia justa elos={elosDo({ confirmados: CERCAS, fase: 'recusado', parou: 'recusa' }, conteudo)} /> },
  // a peça nova do pacote 1 (decisão 47): o que vai ser gravado, antes do toque — a T09/05
  { id: 'f5-cadeia-antes', folha: 5, rotulo: 'cadeia antes de gravar', legenda: 'o relógio em cada elo · a limpeza diz o que apaga e o que preserva',
    render: () => <Cadeia justa elos={elosDo({ confirmados: 0, fase: 'antes' }, conteudo)} /> },
  { id: 'f5-segmentado', folha: 5, rotulo: 'segmentado', legenda: 'um segmento por passo',
    render: () => (
      <Segmentado rotulo="B · MONTAGEM" contagem="1" total="de 5" legenda="Depois: Antena GPS posicionada e livre"
        segmentos={['atual', 'pendente', 'pendente', 'pendente', 'pendente']} /> // o pacote 3: o Painel pendente, como a T13
    ) },
  { id: 'f5-precondicao-pinos', folha: 5, rotulo: 'a pré-condição dos pinos', legenda: 'a primeira linha da configuração, embaixo do título',
    render: () => <Precondicao>ocupação de pinos confere</Precondicao> },

  // a cadeia do encerramento · oito passos
  { id: 'f5-encerrando', folha: 5, rotulo: 'encerrando', legenda: 'a legenda só no passo que corre',
    render: () => (
      <Encerramento passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'gravados' },
        { estado: 'ok', nome: PASSOS[1], situacao: 'voltou' },
        { estado: 'agora', nome: PASSOS[2], situacao: 'relendo', legenda: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.' },
        ...PASSOS.slice(3).map(espera),
      ]} />
    ) },
  // a rodada 1 do retorno do PM: o reinício é automático — o pede o corte saiu da folha
  { id: 'f5-reiniciando', folha: 5, rotulo: 'reiniciando', legenda: 'o reinício é automático · o técnico não faz nada, e a conexão que cai diz reconectando',
    render: () => (
      <Encerramento justo passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'confere' },
        { estado: 'agora', nome: PASSOS[1], situacao: 'reiniciando', legenda: 'O módulo reinicia sozinho. Leva alguns segundos.' },
        ...PASSOS.slice(2).map(espera),
      ]} />
    ) },
  { id: 'f5-sem-homologar', folha: 5, rotulo: 'sem homologar', legenda: 'só os quatro que deixam o módulo seguro · os pulados com traço',
    render: () => (
      <Encerramento justo passos={[
        ...PASSOS.slice(0, 3).map(pulado),
        { estado: 'ok', nome: PASSOS[3], situacao: 'restaurado' },
        { estado: 'agora', nome: PASSOS[4], situacao: 'fechando', legenda: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.' },
        espera(PASSOS[5]), espera(PASSOS[6]),
        pulado(PASSOS[7]),
      ]} />
    ) },

  // tempo e a barra do checklist
  { id: 'f5-cronometro', folha: 5, rotulo: 'cronômetro', legenda: 'o prazo drena',
    render: () => <Prazo rotulo="PRAZO DO EVENTO" nota="FILA DRENADA" tempo="1:36" restante={96} limite={120} legendas={{ inicio: '0:00', fim: 'limite 2:00' }} /> },
  { id: 'f5-prazo-cheio', folha: 5, rotulo: 'prazo cheio', legenda: 'antes do disparo · a fila drenando',
    render: () => (
      <Prazo rotulo="PRAZO DO EVENTO" nota="FILA DRENANDO" tempo="2:00" restante={120} limite={120} legendas={{ inicio: '0:00', fim: 'limite 2:00' }}
        detalhe="6 mensagens e 2 de diagnóstico saindo do módulo" />
    ) },
  // a entrega do checklist (decisão 34): a barra fina no lugar do placar, que repetia o número do título
  { id: 'f5-barra-checklist', folha: 5, rotulo: 'a barra do checklist', legenda: 'o que já passou, em lima · o número fica no título',
    render: () => <BarraDoChecklist feitos={17} total={31} /> }, // o pacote 3: o número do título da T13, 17 de 31
]
