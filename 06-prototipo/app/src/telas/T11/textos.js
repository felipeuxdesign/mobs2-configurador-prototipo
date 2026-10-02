// T11 · os textos exatos (02-telas/T11-conferir-configuracao/textos.md). Onde o
// texto traz um dado — a contagem das linhas, das divergências e das que ficam
// pra revisar, as regiões, o intervalo, os cartões do Extended ID, o bloco que o
// rodapé reenvia —, ele é montado do mock na hora e confere com o textos.md (G1, G8).
// O motivo escrito no caso indice-nao-classificado não é lido: a frase é a do
// textos.md, e a posição 7 é vocabulário que o técnico não lê (T11-V7, G9).
// O pacote 2 (decisão 53): as cinco linhas, o Extended ID só leitura, o Corrigir
// de um bloco só e o revisar em seguida. Saíram a versão ilegível, o arraste na
// legenda, a versão lida no módulo e o Corrigir as N divergências.

// o bloco com o artigo, como o rodapé escreve: 'Corrigir as cercas', 'Revisar o
// leitor' (T11/00, 05). Os outros dois seguem a mesma gramática — nenhuma
// referência os desenha (D2: depois do leitor, a conferência pede os eventos)
const COM_ARTIGO = { cercas: 'as cercas', leitor: 'o leitor', eventos: 'os eventos', conexao: 'a APN' }
// '3 cartões', '1 iButton': o número e o nome, no plural quando passa de um
const conta = (n, um, varios) => `${n} ${n === 1 ? um : varios}`
const partesDoExtendedId = (cartoes, ibuttons) => [
  cartoes > 0 ? conta(cartoes, 'cartão', 'cartões') : null,
  ibuttons > 0 ? conta(ibuttons, 'iButton', 'iButtons') : null,
].filter(Boolean)

export const T = {
  titulo: 'Conferir configuração',
  encerrar: 'ENCERRAR',
  // o veredito, com a contagem à direita
  naoBate: 'NÃO BATE COM O CADASTRO',
  confere: 'CONFERE COM O CADASTRO',
  deTotal: (total) => `de ${total}`,
  // o 01: quantos conteúdos o app não reconhece, a mais que os blocos
  aMais: 'a mais',
  // o 05: quantas ficam pra revisar, no cabeçalho cinza, e a linha de cada uma
  revisarCabecalho: 'REVISAR EM SEGUIDA',
  revisarEmSeguida: 'revisar em seguida',
  // o porquê de cada uma, pelo bloco que a marcou: só os do arraste das cercas
  // têm texto (T11/05); o que não tem fica sem a segunda linha (G25)
  porque: {
    'eventos:cercas': 'dependem das cercas, que acabaram de mudar',
    'leitor:cercas': 'usa os índices das cercas, que acabaram de mudar',
  },
  // o par do bloco que não bate (T11/00): o valor é do caso
  noModulo: (valor) => `no módulo · ${valor}`,
  noCadastro: (valor) => `no cadastro · ${valor}`,
  // o que o cadastro manda, bloco a bloco, no par que não tem caso: a frase é
  // daqui, o valor é do cadastro do par; o leitor sem fio é o meio da sessão
  regioes: (n) => `${n} regiões`,
  leitorSemFio: 'leitor sem fio',
  intervalo: (seg) => `intervalo ${seg} s`,
  // o Extended ID, só leitura (decisão 45 e 53): o que está no módulo. Com par na
  // tela (T11/00), a frase inteira e o só leitura embaixo; nas outras, o valor
  // curto à direita. Sem cartão nenhum (D5), só informa: nenhum cartão no módulo
  extendedId: 'Extended ID',
  extendedIdNoModulo: (cartoes, ibuttons) => {
    const p = partesDoExtendedId(cartoes, ibuttons)
    return p.length ? `${p.join(' e ')} no módulo` : 'nenhum cartão no módulo'
  },
  extendedIdValor: (cartoes, ibuttons) => {
    const p = partesDoExtendedId(cartoes, ibuttons)
    return p.length ? p.join(' · ') : 'nenhum cartão'
  },
  soLeitura: 'só leitura · o app não grava cartões',
  // o 01: o conteúdo fora de todos os blocos, e a legenda do reenviar
  naoReconhece: 'HÁ CONTEÚDO QUE O APP NÃO RECONHECE',
  foraDosBlocos: (blocos) => `Fora de todos os blocos. Reenviar os ${blocos} blocos limpa.`,
  preservaConexao: 'Reenviar preserva a conexão do módulo.',
  // o rodapé (decisão 53): um bloco por vez, o primeiro na ordem da cadeia
  corrigir: (bloco) => `Corrigir ${COM_ARTIGO[bloco]}`,
  revisar: (bloco) => `Revisar ${COM_ARTIGO[bloco]}`,
  outrasAcoes: 'Outras ações',
  // as outras duas, cada uma com o efeito embaixo (a folha T11/03); no 01, o
  // Reenviar é o principal, e o Apenas registrar, o link
  reenviar: (blocos) => `Reenviar os ${blocos} blocos`,
  efeitoReenviar: 'a cadeia inteira, preservando a conexão',
  registrar: 'Apenas registrar o diagnóstico',
  efeitoRegistrar: 'nada é gravado · só o diagnóstico sobe',
  // o xis da folha, pro leitor de tela (o aria-label da T11/03)
  fechar: 'Fechar',
  voltar: 'Voltar ao menu',
}
