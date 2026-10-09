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
const COM_ARTIGO = { ativo: 'o ativo', cercas: 'as cercas', leitor: 'o leitor', eventos: 'os eventos', conexao: 'a conexão' }

export const T = {
  titulo: 'Conferir configuração',
  encerrar: 'ENCERRAR',
  // o veredito, com a contagem à direita
  naoBate: 'NÃO BATE COM O CADASTRO',
  confere: 'CONFERE COM O CADASTRO',
  // a 04 (o pacote 5): a conferência correndo — o veredito neutro e a linha da vez
  conferindo: 'CONFERINDO',
  conferindoLinha: 'conferindo',
  vazio: '—',
  deTotal: (total) => `de ${total}`,
  // o 01: quantos conteúdos o app não reconhece, a mais que os blocos
  aMais: 'a mais',
  // o 05: quantas ficam pra revisar, no cabeçalho cinza, e a linha de cada uma
  revisarCabecalho: 'REVISAR EM SEGUIDA',
  revisarEmSeguida: 'revisar em seguida',
  // o porquê de cada uma vem do mock (M.motivosDependente, o retorno do PM de 09/10), e o
  // revisar em seguida tem o Reenviar na linha
  reenviarLinha: 'Reenviar',
  // o Ativo (o retorno do PM de 09/10): o que o módulo traduz da CAN, com o modelo do ativo
  traduzACan: (modelo) => `traduz a CAN do ${modelo}`,
  // a Conexão que confere: o nome do cadastro, nunca o endereço
  redeDaMobs2: 'a rede da Mobs2',
  // o par do bloco que não bate (T11/00): o valor é do caso
  noModulo: (valor) => `no módulo · ${valor}`,
  noCadastro: (valor) => `no cadastro · ${valor}`,
  // o que o cadastro manda, bloco a bloco, no par que não tem caso: a frase é
  // daqui, o valor é do cadastro do par; o leitor sem fio é o meio da sessão
  regioes: (n) => `${n} regiões`,
  leitorSemFio: 'leitor sem fio',
  intervalo: (seg) => `intervalo ${seg} s`,
  // o 01: o conteúdo fora de todos os blocos, e a legenda do reenviar
  naoReconhece: 'HÁ CONTEÚDO QUE O APP NÃO RECONHECE',
  foraDosBlocos: () => 'Fora de todos os blocos.',   // a rodada 2: saiu o *Reenviar os 5 blocos limpa*
  preservaConexao: 'Mantém a rede do módulo. Apaga só a configuração.',
  // a rodada 2 do retorno do PM: a ação de cada bloco mora na linha dele, e não mais no rodapé
  corrigirEsteBloco: 'Corrigir este bloco',
  enviarAgora: 'Enviar agora',
  // a 04: as ações desde o conferindo, desligadas
  acoesLiberam: 'As ações liberam quando a leitura terminar.',
  // o rodapé (decisão 53): um bloco por vez, o primeiro na ordem da cadeia
  corrigir: (bloco) => `Corrigir ${COM_ARTIGO[bloco]}`,
  revisar: (bloco) => `Revisar ${COM_ARTIGO[bloco]}`,
  outrasAcoes: 'Outras ações',
  // as outras duas, cada uma com o efeito embaixo (a folha T11/03); no 01, o
  // Reenviar é o principal, e o Apenas registrar, o link
  // o retorno do PM de 09/10: *Reenviar tudo, menos a conexão* no lugar de *Reenviar os 5 blocos*
  reenviar: () => 'Reenviar tudo, menos a conexão',
  efeitoReenviar: 'Mantém a rede do módulo. Apaga só a configuração.',
  registrar: 'Apenas registrar o diagnóstico',
  efeitoRegistrar: 'nada vai pro módulo · só o diagnóstico sobe',
  // o xis da folha, pro leitor de tela (o aria-label da T11/03)
  fechar: 'Fechar',
  voltar: 'Voltar ao menu',
}
