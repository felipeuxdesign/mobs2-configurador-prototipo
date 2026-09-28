// Folha 5 · instrumentos, cadeia e processo. Texto exato da folha; a escala
// de cada leitura (min, max, faixa, riscos) é a da folha, e a barra se
// posiciona pela conta.
import {
  Leitura, LeituraPequena, GradeLeituras, LeituraTambor, Sinais, Declarado,
  Cadeia, Encerramento, Segmentado, Precondicao, Prazo, BarraDoChecklist,
} from '../../ds/instrumentos/index.js'

const bateria = { rotulo: 'TENSÃO DA BATERIA', unidade: 'V' }

const blocos = [
  { nome: 'Limpeza', valor: 'feita', descricao: 'apaga a configuração anterior' },
  { nome: 'Ativo', valor: 'A12', descricao: 'quem é o veículo e a tradução da CAN' },
  { nome: 'Cercas', valor: 'G07', descricao: 'as regiões geográficas' },
  { nome: 'Leitor', valor: 'L02', descricao: 'como o cartão do motorista é lido' },
  { nome: 'Eventos', valor: 'E05', descricao: 'o que o módulo reporta e quando' },
  { nome: 'Conexão', valor: 'C03', descricao: 'para onde ele manda' },
]
const naoAlcancado = (b) => ({ estado: 'traco', nome: b.nome, descricao: 'não foi alcançado' })

const PASSOS = ['Contadores e estado', 'Reinício do módulo', 'Releitura completa', 'Repouso do módulo', 'Canal de programação', 'Registro da sessão', 'Desconexão', 'Autoteste']
const espera = (nome) => ({ estado: 'espera', nome, situacao: '—' })
const pulado = (nome) => ({ estado: 'pulado', nome, situacao: 'pulado' })

export const especimes = [
  // leituras
  { id: 'f5-leitura-na-faixa', folha: 5, rotulo: 'leitura na faixa', legenda: 'número grande · faixa lima · marcador branco',
    render: () => (
      <Leitura {...bateria} valor="13,8"
        escala={{ min: 11, max: 16, valor: 13.8, faixa: { de: 12, ate: 15 }, divisoes: 10, fortes: [12, 13.5, 15] }}
        legendas={{ min: '11,0', faixa: '12,0 — 15,0', max: '16,0' }} />
    ) },
  { id: 'f5-fora-da-faixa', folha: 5, rotulo: 'fora da faixa', legenda: 'borda vermelha · a escala estica',
    render: () => (
      <Leitura {...bateria} valor="10,9" fora causa="1,1 V abaixo do mínimo · veículo ou cadastro"
        escala={{ min: 10, max: 16, valor: 10.9, faixa: { de: 12, ate: 15 }, divisoes: 6, fortes: [12, 15] }}
        legendas={{ min: '10,0', faixa: '12,0 — 15,0', max: '16,0' }} />
    ) },
  { id: 'f5-leitura-pequena', folha: 5, rotulo: 'leitura pequena', legenda: 'meia largura',
    render: () => (
      <GradeLeituras>
        <LeituraPequena rotulo="TEMPERATURA" valor="31" unidade="°C" legenda="−40 a 120"
          escala={{ min: -40, max: 150, valor: 31, faixa: { de: -40, ate: 120 }, divisoes: 4, fortes: [55] }} />
      </GradeLeituras>
    ) },
  { id: 'f5-leitura-com-minimo', folha: 5, rotulo: 'leitura com mínimo', legenda: 'a faixa aberta pra cima',
    render: () => (
      <GradeLeituras>
        <LeituraPequena rotulo="SATÉLITES" valor="9" legenda="mínimo 4"
          escala={{ min: 0, max: 12, valor: 9, faixa: { de: 4 }, divisoes: 4, fortes: [6] }} />
      </GradeLeituras>
    ) },
  { id: 'f5-tambor', folha: 5, rotulo: 'tambor', legenda: 'hodômetro é rolete',
    render: () => <LeituraTambor rotulo="HODÔMETRO" nota="SEM FAIXA" valor="184320" unidade="km" /> },
  { id: 'f5-sinais-liga-desliga', folha: 5, rotulo: 'sinais liga-desliga', legenda: 'o fato e o check, sem barra',
    render: () => (
      <GradeLeituras>
        <Sinais sinais={[{ rotulo: 'Ignição', valor: 'ligada', confere: true }, { rotulo: 'Posição', valor: 'fixa', confere: true }]} />
      </GradeLeituras>
    ) },
  { id: 'f5-instrumentos-apagados', folha: 5, rotulo: 'instrumentos apagados', legenda: 'o resumo do que só fecha andando',
    render: () => <Declarado aoPe rotulo="SEM ENERGIA · 5 SINAIS · FECHAM ANDANDO" texto="Alternador · Velocidade · Ré · Rotação · Consumo" /> },

  // processo
  { id: 'f5-cadeia-concluida', folha: 5, rotulo: 'cadeia concluída', legenda: 'trilho lima',
    render: () => <Cadeia elos={blocos.map((b) => ({ estado: 'ok', ...b }))} /> },
  { id: 'f5-cadeia-recusada', folha: 5, rotulo: 'cadeia recusada', legenda: 'o elo que falhou acende',
    render: () => (
      <Cadeia justa elos={[
        { estado: 'ok', ...blocos[0] },
        { estado: 'ok', ...blocos[1] },
        { estado: 'xis', nome: 'Cercas', valor: 'recusado', descricao: 'os pontos das áreas não voltaram' },
        ...blocos.slice(3).map(naoAlcancado),
      ]} />
    ) },
  { id: 'f5-segmentado', folha: 5, rotulo: 'segmentado', legenda: 'um segmento por passo',
    render: () => (
      <Segmentado rotulo="B · INSTALAÇÃO FÍSICA" contagem="1" total="de 5" legenda="Depois: Antena GPS posicionada e livre"
        segmentos={['atual', 'pendente', 'pendente', 'pendente', 'feito']} />
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
  { id: 'f5-pede-o-corte', folha: 5, rotulo: 'pede o corte', legenda: 'é com você · o único passo em que ele age',
    render: () => (
      <Encerramento justo passos={[
        { estado: 'ok', nome: PASSOS[0], situacao: 'gravados' },
        { estado: 'energia', nome: PASSOS[1], situacao: 'é com você', legenda: 'Desligue e ligue a alimentação do módulo. Ele volta sozinho em alguns segundos.' },
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
    render: () => <BarraDoChecklist feitos={19} total={31} /> },
]
