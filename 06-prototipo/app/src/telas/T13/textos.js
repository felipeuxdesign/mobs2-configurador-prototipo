// T13 · os textos da tela, exatamente como no 02-telas/T13-checklist/textos.md.
// Onde o texto traz um dado (a contagem, a hora, o nome, o número, a placa),
// a moldura é daqui e o dado vem do mock ou do estado único, na hora de
// montar. Os nomes das seções ('A · Identificação') saem de M.checklist.secoes;
// os dos itens, de M.checklist.itens (o rótulo); os títulos do nível do item,
// das perguntas; o rótulo de topo do nível do item, da seção (AC-11).
export const T = {
  encerrar: 'ENCERRAR',
  titulo: 'Checklist',
  de: (total) => `de ${total}`,
  secao: (id, nome) => `${id} · ${nome}`,
  // o nome da E nas referências do pacote 2 (T13/00 a 06, 11 a 14): Ciclo de testes. O
  // mock ainda diz Teste dinâmico (checklist.secoes, rótulo e título) — vale o texto da
  // referência, até o mock trocar (desvio nomeado, pro arquiteto)
  rotuloDaSecao: { E: 'Ciclo de testes' },

  // quem age, embaixo do nome da seção (a entrega do checklist, decisão 34)
  appConfere: 'o app confere sozinho',
  appConferiu: 'o app conferiu',
  // no singular, com 1 (a resposta do arquiteto de 26/09: *1 item*, *1 foto tirada*)
  voceFotografa: (n) => (n === 1 ? 'você fotografa 1 item' : `você fotografa ${n} itens`),
  fotosTiradas: (n) => (n === 1 ? '1 foto tirada' : `${n} fotos tiradas`),
  voceFazCiclo: 'você faz o ciclo parado',
  cicloPassou: 'o ciclo passou',
  lendoDoModulo: 'lendo do módulo',   // a Seção D enchendo (a rodada 1, T13/38)
  esperaServidor: 'espera o servidor · não bloqueia',
  servidorConfirmou: 'o servidor confirmou',

  // o fim (a rodada 1 do retorno do PM, T13/11 e 14): o checklist registrado, aguardando o
  // autoteste, e o próximo passo · a homologação é da T16
  registrado: 'Checklist registrado',
  aguardandoAutoteste: 'aguardando autoteste',
  proximoPasso: 'O próximo passo é encerrar a sessão. O autoteste roda durante o encerramento.',
  semLocalizacao: 'o relatório vai sem localização',

  // os valores dos itens que são palavra (textos.md)
  confere: 'confere',
  conforme: 'conforme',
  sinalBom: 'sinal bom',
  satelites: (n) => `${n} satélites`,
  // o pacote 12 · a entrada que não bate (T13/23, 24) e o modem sem sinal (T13/25, 26)
  entradas: { ignicao: 'ignição' },
  entradaLida: (entrada, valor) => `${entrada} ${valor}`,
  esperadoDaEntrada: (valor) => `esperado: ${valor}, com a chave virada`,
  semAlcance: 'o módulo não alcança a rede da operadora',
  // a rodada 1 do retorno do PM: o pacote de sincronização (A), a antena (C), a D lida, a F e o bip (E)
  dataDoPacote: (data, hora) => `${data.slice(8, 10)}/${data.slice(5, 7)} ${hora}`,
  antena: (estado) => `antena ${estado}`,
  antenaConectada: 'conectada',
  lendo: 'lendo',
  esperando: 'esperando',
  naoChegou: 'não chegou',
  testarBip: 'Testar bip',
  tocando: 'Tocando…',
  ouviuOBip: 'Você ouviu o bip?',
  ouviBotao: 'Ouvi',
  naoOuviBotao: 'Não ouvi',
  ouvi: 'ouvi',
  naoOuvi: 'não ouvi',
  naoConfere: 'não confere',   // o cartão que o técnico disse que não confere (T14/10)
  aFazer: 'a fazer',
  vazio: '—',
  // B: a foto por fazer (o Painel também, decisão 52) e a ressalva com a causa
  fotoATirar: 'foto a tirar',
  comRessalva: (causa) => `com ressalva · ${causa}`,
  // E: a ação da seção, a única
  fazerCiclo: 'Fazer o ciclo de testes',
  osPassos: (n) => `até ${n} passos, com o ônibus parado`,

  // o rodapé
  // o motivo do Finalizar desligado (a rodada 1): quantos obrigatórios faltam — no singular, *Falta 1
  // item obrigatório* (proposta do protótipo) —, a seção ainda lida, a seção com um item reprovado
  faltam: (n) => (n === 1 ? 'Falta 1 item obrigatório' : `Faltam ${n} itens obrigatórios`),
  secaoSendoLida: (id) => `A Seção ${id} ainda está sendo lida`,
  secaoComReprovado: (id) => `A Seção ${id} tem um item reprovado`,
  finalizar: 'Finalizar instalação',
  encerrarSessao: 'Encerrar sessão',
  voltarMenu: 'Voltar ao menu',
  voltarChecklist: 'Voltar ao checklist',

  // o nível do item
  depois: (pergunta) => `Depois: ${pergunta}`,
  // a caixa do não conforme, nas duas telas do item (decisão 39, T13/07, 08 e 15)
  naoConforme: 'Não está conforme',
  marqueEConte: 'marque e conte o que aconteceu',
  conteEmbaixo: 'conte embaixo o que aconteceu',
  oQueAconteceu: 'O QUE ACONTECEU',
  tirarFoto: 'Tirar foto',
  // o não conforme exige a foto do problema (decisão 39): o quadro, o registro e o botão que diz o que falta
  enquadreProblema: 'Enquadre o problema',
  fotografarProblema: 'Fotografar o problema',
  problemaFotografado: (hora) => `Problema fotografado às ${hora}`,
  vaiComARessalva: 'vai junto com a ressalva, pro gestor',
  // sem o texto, apagado: nenhuma referência o desenha, e o texto é o do tela.md e do logica.md (decisão 39)
  conteOQueAconteceu: 'Conte o que aconteceu',
  salvarComRessalva: 'Salvar com ressalva',
  // a câmera sem a permissão: nenhuma referência da T13 a desenha; o primário é
  // o da câmera da T10 (T10/11, textos.md), que vale igual pro checklist
  // (logica.md · O mundo real, e a regra 12 da lei de construir). A frase do
  // que falta não tem texto pro item do checklist: o visor fica só com a câmera
  // riscada (G25)
  abrirConfiguracoes: 'Abrir as configurações',

  // o item reprovado (09)
  lidoNoModulo: 'LIDO NO MÓDULO',
  faixa: (min, max) => `${min} — ${max}`,
  abaixo: (dif, unidade) => `${[dif, unidade].filter(Boolean).join(' ')} abaixo do mínimo`,
  ouMais: (min) => `${min} ou mais`,   // a faixa aberta pra cima, os satélites (T13/22)
  // o pacote 11: o que conferir, como a conexão que falha na T05/04 (sai o 'isto não se marca à mão')
  oQueConferir: 'O QUE CONFERIR',
  conferirAlimentacao: [
    { titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' },
    { titulo: '2 · Cabo de alimentação', texto: '— encaixe firme' },
    { titulo: '3 · Ponto de ligação', texto: '— direto na bateria, sem queda' },
  ],
  // as causas das outras três (o pacote 12, padrão até o PM decidir)
  conferirGps: [
    { titulo: '1 · Antena GPS', texto: '— conectada e firme' },
    { titulo: '2 · Cabo da antena', texto: '— sem dobra nem corte' },
    { titulo: '3 · Conector da antena', texto: '— encaixado e rosqueado' },
  ],
  conferirEntradas: [
    { titulo: '1 · Chave do ônibus', texto: '— virada na ignição' },
    { titulo: '2 · Fio da ignição', texto: '— no pino certo do chicote' },
    { titulo: '3 · Fusível da ignição', texto: '— inteiro' },
  ],
  conferirModem: [
    { titulo: '1 · Chip SIM', texto: '— encaixado e ativo' },
    { titulo: '2 · Antena do modem', texto: '— conectada' },
    { titulo: '3 · Cobertura', texto: '— teste num lugar aberto' },
  ],
  // o pacote 13 · o detalhe relê o módulo ali mesmo (29 a 33), no molde do Relendo… da T10
  relerModulo: 'Reler o módulo',
  relendoModulo: 'Relendo o módulo…',
  relido: (hora, veredito) => `relido às ${hora} · ${veredito}`,
  dentroDaFaixa: 'dentro da faixa',
  // o pacote 23 · o reler que não resolve (34 a 37): o que ainda falta, depois do relido às
  ainda: (falta) => `ainda ${falta}`,
  entradaAinda: (entrada, valor) => `${entrada} ainda ${valor}`,

  // o diálogo da Seção F (10)
  secaoFNaoPassou: 'A Seção F não passou',
  registradaFalhando: 'A instalação fica registrada com ela falhando — e com o seu nome.',
  ciente: (nome, hora) => `Estou ciente · ${nome}, ${hora}`,
  cancelar: 'Cancelar',
}
