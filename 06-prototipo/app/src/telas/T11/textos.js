// T11 · os textos exatos (02-telas/T11-conferir-configuracao/textos.md). Onde o
// texto traz um dado — a contagem por extenso, a tradução do modelo, as regiões,
// o intervalo —, ele é montado do mock na hora e confere com o textos.md (G1, G8).
// O motivo escrito no caso indice-nao-classificado não é lido: a frase é a do
// textos.md, e a posição 7 é vocabulário que o técnico não lê (T11-V7, G9).
import { porExtenso } from '../../dados/formato.js'

export const T = {
  titulo: 'Conferir configuração',
  encerrar: 'ENCERRAR',
  // o veredito, com a contagem à direita
  naoBate: 'NÃO BATE COM O CADASTRO',
  confere: 'CONFERE COM O CADASTRO',
  deTotal: (total) => `de ${total}`,
  // o que o cadastro manda, bloco a bloco, no par que não tem caso: a frase é
  // daqui, o valor é do cadastro do par (a tradução do modelo, as regiões do
  // ativo, o preset de eventos); o leitor sem fio é o meio da sessão
  traducao: (nome) => `tradução ${nome}`,
  regioes: (n) => `${n} regiões`,
  leitorSemFio: 'leitor sem fio',
  intervalo: (seg) => `intervalo ${seg} s`,
  redeAtual: 'rede do módulo atual',
  // o 01: o conteúdo fora de todos os blocos
  naoReconhece: 'HÁ CONTEÚDO QUE O APP NÃO RECONHECE',
  foraDosBlocos: 'Fora de todos os blocos. Regravar limpa.',
  // a legenda embaixo da lista e o rodapé do que não bate
  legenda: (blocos) => `Regravar substitui os ${porExtenso(blocos)} na ordem da cadeia.`,
  regravar: (blocos) => `Regravar os ${porExtenso(blocos)} blocos`,
  soRegistrar: 'Só registrar o diagnóstico',
  // o 02: a versão lida e a saída
  versaoLida: 'VERSÃO LIDA NO MÓDULO',
  igualAoCadastro: 'igual à do cadastro, bloco a bloco',
  voltar: 'Voltar ao menu',
}
