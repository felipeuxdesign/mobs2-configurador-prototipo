/* 04-dados/mocks.js — C2 · a OBRA CANÔNICA. Toda tela deriva daqui (Lei 8/17).
 * C4: +credenciais e +ddis (T01) — dois campos raiz, âncoras intactas.
 * C4.1: +credenciais.contato e +recuperacao.novaSenha (D-21: todo campo nasce
 *   preenchido com dado do mock — telefone/e-mail/senha literais no JSX violariam a Lei 8).
 * C8: +5 casos ADITIVOS de T05 (gatilhos de simulação e leituras) — recorte
 *   canônico intocado; ver o bloco no fim dos CASOS.
 * C10: +frota (24 ativos), +chassiPelaCan/leitor/leituraCan (3 modelos de
 *   ativo), +meioAtual/consumidores nos dois casos de pinos. Tudo aditivo:
 *   âncoras intactas, ocupadoPor intacto.
 * C16: +autotesteEncerramento (as 8 assertivas de T16 — as de bancada, em
 *   autotesteAssertivas, ficam INTACTAS), +tecnico, +situacao.sessaoAcesso,
 *   +modelos[].reinicioPorComando, +3 campos em sessao-interrompida e
 *   +noEncerramento em autoteste-falhando. Tudo ADITIVO: as âncoras que o
 *   gate recomputa não se movem.
 * C22: +criteriosRegra (a REGRA dos três critérios de T12 — não campo por
 *   instalação: o que o `resumo` já diz não se reescreve) e
 *   +casos["instalacoes-sem-rede"] (o carimbo da consulta anterior,
 *   declarado). Tudo ADITIVO: âncoras intactas, instalações intactas.
 * PM · rodada 3 (decisões 52 a 54): a calibração sem foto, com o horímetro opcional · a conferência sem
 *   versão, com a APN, o Extended ID só leitura e o revisar em seguida (cercas-reenviadas) · o ciclo de
 *   testes parado, em 6 passos, com a velocidade só com tacógrafo digital (motor-desligado-no-ciclo) · o
 *   servidor sem a viagem · o checklist sem o chassi, com o Painel como foto a tirar · a fila sem a foto
 *   de calibração. SAEM: versao-ilegivel, camera-sem-permissao, a viagem do CICLO e dos critérios.
 * PM · rodadas 1 e 2 (decisões 44 a 47): +diagnostico (o que a T07 mostra e de onde vem),
 *   +fabricante/modelo nos 3 modelos de ativo, o pacote SEM cartões (conexões, eventos e cercas
 *   no lugar), +5 casos (modem-sem-sinal, firmware-sem-rede-no-modulo, modulo-em-outro-ativo,
 *   modulo-ja-deste-ativo, sem-conexao-no-menu). SAEM: o chassiPelaCan, a divergencia-chassi e
 *   os dois estados da pré-checagem (canal-aberto, modulo-em-repouso). O chassi continua no
 *   cadastro dos ativos, mas nenhuma tela o mostra (decisão 46).
 *
 * Dia nominal FIXO: 2026-03-12 (quinta), 14:30. Toda data deriva por offset
 * via aritmética de calendário PURA — zero objeto Date, zero Date.now,
 * zero Math.random. 2026 NÃO é bissexto (fev = 28).
 *
 * Âncoras (a auditoria recomputa — 04-dados/gate-cobertura.js):
 *   24 ativos · 20 módulos · 4 ativos sem módulo · 2 seriais fora do
 *   cadastro · 1 modelo sem driver (VC07) · 13 instalações
 *   (6 aprovadas · 2 aguardando · 1 falha reconhecida · 1 reprocessada ·
 *    1 reprovada · +2 ressalvadas) · cobertura 45 dias corridos,
 *   13 dias distintos com intervenção · pacotes em 3 idades (1d·4d·8d) ·
 *   fila com 5 estados.
 */
(function () {
  /* Calendário puro a partir do dia nominal. */
  var DIAS_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function diasAntes(n) {
    var y = 2026, m = 3, d = 12 - n;
    while (d < 1) { m -= 1; if (m < 1) { m = 12; y -= 1; } d += DIAS_MES[m - 1]; }
    return y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
  }
  function comData(lista) {
    return lista.map(function (x) { x.data = diasAntes(x.diasAtras); return x; });
  }

  /* ── Modelos de ATIVO — a linha do veículo. O sistema decide por aqui
     (princípio 2): tradução CAN, mapa de contadores, método de calibração
     de velocidade e preset de evento vêm do cadastro, nunca do técnico.
     ma-03 SEM mapa de contadores declarado → T08 indisponível com motivo.
     C8.12: +conteudoRegistros — o TAMANHO do pacote que este modelo pede ao
     módulo (eventos, cercas, tradução). É propriedade do MODELO DE ATIVO, não
     do módulo nem do ativo: mesma linha de veículo, mesmo conteúdo. Fecha o
     #8 de T05 como COMPARAÇÃO (conteúdo × capacidadeRegistros da matriz) em
     vez do verbo "cabe", e faz o caso conteudo-nao-cabe deixar de ser número
     solto: ma-01 pede 128 e a variante ECO guarda 96 — a aritmética é a
     regra, o caso só nomeia onde ela aparece.
     C10 (T06): +chassiPelaCan — o MODELO decide se o vínculo é lido e
     comparado (sim) ou confirmado pelo técnico (não); ma-01 sim, os outros
     não (D5: em Várzea o caminho CAN cobre 9 de 10, o humano é a exceção —
     a-09). +leitor (bloco Leitor: tipo do identificador e se o buzzer está
     no fio) e +leituraCan (bloco Ativo: "barramento" físico ou "gateway"
     indutivo) — duas das TRÊS fontes da matriz de ocupação de pinos; a
     terceira é sessao.meio (D-39). ma-03 lê a CAN por gateway: máquina não
     expõe barramento — é isso que faz o gateway ser consumidor real.
     ⚠ Consequência declarada: TODO ma-01 em ECO não cabe — a-10/M2C-0394 (o
     caso) e a-20/M2C-0472, em Caruaru. Não é gatilho novo escondido: é a
     mesma conta, e o ECO ser pequeno para ônibus urbano é o motivo de o caso
     existir.
     ⚠ C23 (sweep) · SAÍRAM daqui três campos sem leitor, confirmados por grep
     no app, nas 21 cascas e no gate: `grandezasCalibraveis` e
     `grandezasIndisponiveis` (contradiziam `calibracao.porModelo`, que é a
     fonte viva — ver o comentário de CALIBRACAO) e `categoria` ("ônibus" ·
     "caminhão" · "máquina": o `nome` já diz, e o produto não agrupa nem
     filtra por ela em lugar nenhum).
     `metodoVelocidade` FICA DECLARADO, sem leitor de tela: é o fato de
     cadastro que ORIGINA `calibracao.porModelo` (gps → velocidade "não
     precisa"; pulso → velocidade calibrável). Consumidor: o cadastro/backend
     que emite o pacote — nunca a tela, que lê a forma já derivada. */
  var MODELOS_ATIVO = [
    { id: "ma-01", nome: "Ônibus urbano OF-1621",
      tacografoDigital: false, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Mercedes-Benz", modelo: "OF-1621",
      traducaoCan: "urbano v3",
      mapaContadores: { declarado: true, versao: "v2" },
      conteudoRegistros: 128,
      metodoVelocidade: "gps",
      presetEventoId: "pe-urbano",
      leitor: { tipo: "cartao-serial", buzzerNoFio: false },
      leituraCan: "barramento" },
    { id: "ma-02", nome: "Caminhão coletor 17.230",
      tacografoDigital: true, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Volkswagen", modelo: "17.230",
      traducaoCan: "frota v2",
      mapaContadores: { declarado: true, versao: "v1" },
      conteudoRegistros: 84,
      metodoVelocidade: "pulso",
      presetEventoId: "pe-rodoviario",
      leitor: { tipo: "chave-de-contato", buzzerNoFio: false },
      leituraCan: "barramento" },
    { id: "ma-03", nome: "Retroescavadeira 580N",
      tacografoDigital: false, /* a velocidade só entra no ciclo com tacógrafo digital (decisão 54) */
      fabricante: "Case", modelo: "580N",
      traducaoCan: "máquina v1",
      mapaContadores: { declarado: false,
        /* C16 · "Reset de leitura" virou "Refazer leitura da CAN" (R3: reset
           é jargão, e o nome antigo não dizia o que reseta). */
        motivo: "Mapa de contadores não declarado no cadastro deste modelo — acione o gestor." },
      conteudoRegistros: 112,
      metodoVelocidade: "gps",
      presetEventoId: "pe-maquina",
      leitor: { tipo: "sem-fio", buzzerNoFio: false },
      leituraCan: "gateway" }
  ];

  /* Presets de evento (vêm no pacote): a janela de posicionamento de T12 é
     DERIVADA — 3 × intervalo + 2 min — nunca número cravado em tela. */
  /* ⚠ C23 (sweep) · `modoFila` e `indiceTeste` FICAM DECLARADOS, sem leitor
     de tela e por decisão. A spec de T14 diz que o bloco Eventos declara o
     modo de fila e que o evento de teste tem ÍNDICE PRÓPRIO RESERVADO — e o
     que essa reserva garante é que a PLATAFORMA não entregue o evento de
     teste ao cliente: fora de relatório, BI, ranking e notificação.
     Consumidor: a plataforma, nunca o app. Sem eles o produto declararia
     uma garantia que não modela. */
  var PRESETS_EVENTO = [
    { id: "pe-urbano",     nome: "Urbano",     intervaloRastreamentoSeg: 30,  modoFila: "tempo real", indiceTeste: 90 },
    { id: "pe-rodoviario", nome: "Rodoviário", intervaloRastreamentoSeg: 60,  modoFila: "tempo real", indiceTeste: 91 },
    { id: "pe-maquina",    nome: "Máquina",    intervaloRastreamentoSeg: 120, modoFila: "lote",       indiceTeste: 92 }
  ];

  /* ── Modelos de MÓDULO ── VC07 é o modelo SEM driver na v1.
     C16 · +reinicioPorComando — o passo 2 do encerramento (HU-T16-3)
     reinicia "por comando quando o driver suportar; senão, o app pede um
     corte de alimentação, UMA vez". É capacidade do DRIVER, e o driver mora
     aqui (driverV1 já é isto) — não na matriz, que é modelo × variante ×
     firmware. VL08 não aceita: o passo 2 pede o corte em M2C-0371 (a-09,
     Várzea, um toque na lista de T05) e em M2C-0438. VC07 nunca abre sessão
     (trava em T05, sem driver), então o valor dele não tem consumidor. */
  var MODELOS_MODULO = [
    { id: "vl06", nome: "VL06", variantes: ["FULL", "ECO", "CAN-BT", "CAN"], driverV1: true,  reinicioPorComando: true },
    { id: "vl08", nome: "VL08", variantes: ["STD"], driverV1: true,  reinicioPorComando: false },
    { id: "vc07", nome: "VC07", variantes: ["STD"], driverV1: false, reinicioPorComando: false }
  ];

  /* Matriz de capacidades: modelo × variante × firmware. O módulo M2C-0451
     roda 2.4.1, que NÃO está aqui → caminho de atualização (T05).
     VC07 não tem linha: sem driver, o bloqueio acontece antes da matriz. */
  var MATRIZ_CAPACIDADES = [
    { modeloId: "vl06", variante: "FULL",   firmwares: ["2.2.0", "2.3.5"], can: true,  semFio: true,  pulsos: true,  regioesMax: 4, posicoesPorRegiao: 2, capacidadeRegistros: 192 },
    { modeloId: "vl06", variante: "ECO",    firmwares: ["2.2.0"],          can: false, semFio: false, pulsos: true,  regioesMax: 2, posicoesPorRegiao: 2, capacidadeRegistros: 96 },
    { modeloId: "vl06", variante: "CAN-BT", firmwares: ["2.3.5"],          can: true,  semFio: true,  pulsos: false, regioesMax: 4, posicoesPorRegiao: 2, capacidadeRegistros: 192 },
    { modeloId: "vl06", variante: "CAN",    firmwares: ["2.3.5"],          can: true,  semFio: false, pulsos: false, regioesMax: 4, posicoesPorRegiao: 2, capacidadeRegistros: 192 },
    { modeloId: "vl08", variante: "STD",    firmwares: ["3.0.2", "3.1.0"], can: true,  semFio: true,  pulsos: true,  regioesMax: 6, posicoesPorRegiao: 3, capacidadeRegistros: 384 }
  ];

  /* ── 20 módulos cadastrados (o vínculo módulo↔ativo vive no ativo). ── */
  var MODULOS = [
    { serial: "M2C-0301", modeloId: "vl06", variante: "FULL",   firmware: "2.3.5" },
    { serial: "M2C-0312", modeloId: "vl06", variante: "CAN-BT", firmware: "2.3.5" },
    { serial: "M2C-0335", modeloId: "vl06", variante: "CAN-BT", firmware: "2.3.5" },
    { serial: "M2C-0348", modeloId: "vl06", variante: "FULL",   firmware: "2.3.5" },
    { serial: "M2C-0362", modeloId: "vl06", variante: "CAN",    firmware: "2.3.5" },
    { serial: "M2C-0371", modeloId: "vl08", variante: "STD",    firmware: "3.0.2" },
    { serial: "M2C-0389", modeloId: "vl06", variante: "CAN",    firmware: "2.3.5" },
    { serial: "M2C-0394", modeloId: "vl06", variante: "ECO",    firmware: "2.2.0" },
    { serial: "M2C-0402", modeloId: "vl06", variante: "FULL",   firmware: "2.3.5" },
    { serial: "M2C-0411", modeloId: "vl06", variante: "CAN-BT", firmware: "2.3.5" },
    { serial: "M2C-0417", modeloId: "vl06", variante: "CAN-BT", firmware: "2.3.5", extendedId: { cartoes: 3, ibuttons: 1 } }, /* herói · o Extended ID é só leitura: o que já está no módulo */
    { serial: "M2C-0423", modeloId: "vl06", variante: "FULL",   firmware: "2.2.0" },
    { serial: "M2C-0438", modeloId: "vl08", variante: "STD",    firmware: "3.1.0" },
    { serial: "M2C-0445", modeloId: "vl06", variante: "CAN",    firmware: "2.3.5" },
    { serial: "M2C-0451", modeloId: "vl06", variante: "FULL",   firmware: "2.4.1" }, /* fora da matriz */
    { serial: "M2C-0466", modeloId: "vl06", variante: "FULL",   firmware: "2.3.5" },
    { serial: "M2C-0472", modeloId: "vl06", variante: "ECO",    firmware: "2.2.0" },
    { serial: "M2C-0480", modeloId: "vl06", variante: "CAN",    firmware: "2.3.5" },
    { serial: "M2C-0489", modeloId: "vl06", variante: "FULL",   firmware: "2.3.5" },
    { serial: "M2C-0497", modeloId: "vc07", variante: "STD",    firmware: "1.1.0" }  /* sem driver */
  ];

  /* ── 24 ativos — 4 SEM módulo (a-07, a-08, a-15, a-23): exercitam a trava
     do princípio 5 (sem cadastro prévio, o app trava).
     C10 (D4): +frota — o número curto pintado no veículo, o que o técnico
     digita na busca de T06 junto com a placa. IDENTIFICADOR = chassi (a
     spec: "identificador do chassi pela CAN"), campo pesquisável porque a
     HU pede e porque colar funciona — não nasce campo novo. ── */
  var ATIVOS = [
    /* uo-01 · Garagem Várzea (10) */
    { id: "a-01", placa: "RKT-8H42", frota: "1003", modeloAtivoId: "ma-01", chassi: "9BM384067GB120401", uoId: "uo-01", moduloSerial: "M2C-0417" }, /* HERÓI · o moduloSerial do cadastro é o módulo PREVISTO pro ativo; o modo (instalação × manutenção) vem do caso modulo-ja-deste-ativo, nunca do cadastro (decisão 46) */
    { id: "a-02", placa: "QJF-2C61", frota: "1006", modeloAtivoId: "ma-01", chassi: "9BM384067GB120402", uoId: "uo-01", moduloSerial: "M2C-0301" },
    { id: "a-03", placa: "PCX-9A17", frota: "1009", modeloAtivoId: "ma-01", chassi: "9BM384067GB120403", uoId: "uo-01", moduloSerial: "M2C-0312" },
    { id: "a-04", placa: "KHT-4B08", frota: "1012", modeloAtivoId: "ma-01", chassi: "9BM384067GB120404", uoId: "uo-01", moduloSerial: "M2C-0335" },
    { id: "a-05", placa: "OYS-7D93", frota: "1015", modeloAtivoId: "ma-01", chassi: "9BM384067GB120405", uoId: "uo-01", moduloSerial: "M2C-0348" },
    { id: "a-06", placa: "RVM-1E54", frota: "1018", modeloAtivoId: "ma-01", chassi: "9BM384067GB120406", uoId: "uo-01", moduloSerial: "M2C-0362" },
    { id: "a-07", placa: "PDZ-3F26", frota: "1021", modeloAtivoId: "ma-01", chassi: "9BM384067GB120407", uoId: "uo-01", moduloSerial: null },
    { id: "a-08", placa: "QRA-8G70", frota: "1024", modeloAtivoId: "ma-01", chassi: "9BM384067GB120408", uoId: "uo-01", moduloSerial: null },
    { id: "a-09", placa: "KNB-5H39", frota: "1027", modeloAtivoId: "ma-02", chassi: "9BW958017HT450409", uoId: "uo-01", moduloSerial: "M2C-0371" },
    { id: "a-10", placa: "OCT-2J85", frota: "1030", modeloAtivoId: "ma-01", chassi: "9BM384067GB120410", uoId: "uo-01", moduloSerial: "M2C-0394" },
    /* uo-02 · Garagem Ibura (8) */
    { id: "a-11", placa: "PGE-6K41", frota: "1033", modeloAtivoId: "ma-01", chassi: "9BM384067GB120411", uoId: "uo-02", moduloSerial: "M2C-0389" },
    { id: "a-12", placa: "RSW-9L02", frota: "1036", modeloAtivoId: "ma-01", chassi: "9BM384067GB120412", uoId: "uo-02", moduloSerial: "M2C-0402" },
    { id: "a-13", placa: "QAH-1M67", frota: "1039", modeloAtivoId: "ma-01", chassi: "9BM384067GB120413", uoId: "uo-02", moduloSerial: "M2C-0411" },
    { id: "a-14", placa: "KJC-7N23", frota: "1042", modeloAtivoId: "ma-01", chassi: "9BM384067GB120414", uoId: "uo-02", moduloSerial: "M2C-0423" },
    { id: "a-15", placa: "PBV-4P58", frota: "1045", modeloAtivoId: "ma-01", chassi: "9BM384067GB120415", uoId: "uo-02", moduloSerial: null },
    { id: "a-16", placa: "ONK-8Q90", frota: "1048", modeloAtivoId: "ma-02", chassi: "9BW958017HT450416", uoId: "uo-02", moduloSerial: "M2C-0438" },
    { id: "a-17", placa: "RDF-3R14", frota: "1051", modeloAtivoId: "ma-01", chassi: "9BM384067GB120417", uoId: "uo-02", moduloSerial: "M2C-0445" },
    { id: "a-18", placa: "QTM-5S79", frota: "1054", modeloAtivoId: "ma-01", chassi: "9BM384067GB120418", uoId: "uo-02", moduloSerial: "M2C-0451" },
    /* uo-03 · Pátio Caruaru (6) */
    { id: "a-19", placa: "KWX-2T36", frota: "1057", modeloAtivoId: "ma-02", chassi: "9BW958017HT450419", uoId: "uo-03", moduloSerial: "M2C-0466" },
    { id: "a-20", placa: "PEY-9U62", frota: "1060", modeloAtivoId: "ma-01", chassi: "9BM384067GB120420", uoId: "uo-03", moduloSerial: "M2C-0472" },
    { id: "a-21", placa: "OHL-6V07", frota: "1063", modeloAtivoId: "ma-03", chassi: "9CS580N26KR330421", uoId: "uo-03", moduloSerial: "M2C-0497" },
    { id: "a-22", placa: "RJP-1W48", frota: "1066", modeloAtivoId: "ma-02", chassi: "9BW958017HT450422", uoId: "uo-03", moduloSerial: "M2C-0480" },
    { id: "a-23", placa: "QSN-7X95", frota: "1069", modeloAtivoId: "ma-03", chassi: "9CS580N26KR330423", uoId: "uo-03", moduloSerial: null },
    { id: "a-24", placa: "KUD-4Y21", frota: "1072", modeloAtivoId: "ma-02", chassi: "9BW958017HT450424", uoId: "uo-03", moduloSerial: "M2C-0489" }
  ];

  /* ── Cadeia dos 6 blocos — ordem CANÔNICA, invariante (lei do produto).
     Arraste do reenvio cirúrgico (T11): o conjunto arrastado vai SEMPRE na
     ordem canônica, nunca na ordem em que as divergências apareceram. */
  var CADEIA = {
    ordem: ["limpeza", "ativo", "cercas", "leitor", "eventos", "conexao"],
    rotulos: { limpeza: "Limpeza", ativo: "Ativo", cercas: "Cercas", leitor: "Leitor", eventos: "Eventos", conexao: "Conexão" },
    arraste: { ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }
  };

  /* Cercas: 2 áreas × 2 cercas = 4 regiões (herói). O pool esgotado vive
     no caso "pool-esgotado" (a-05): regiões E posições no limite.
     ⚠ C23 (sweep) · `areas` TEM LEITOR e não é tela: é o gate
     (gate-cobertura.js, "cercas: 2 áreas × 2 = 4 regiões"). `areaId` fica
     declarado por consequência — é o elo que faz o × 2 dessa assertiva ser
     verdade; sem ele as duas áreas ficariam contadas e vazias. As telas leem
     só a CONTAGEM de regiões por ativo (T05, T13, T16).
     ⚠ Sinalizado, não decidido: `regioes[].nome` também não tem leitor, e não
     estava na lista de candidatos do C23. Fica intocado. */
  /* errata do pacote 1 · as coleções que o pacote conta (decisão 45): as conexões da empresa e os
     eventos embarcados do preset. O gate recomputa o contem de cada pacote a partir delas. */
  var CONEXOES = [
    { id: "cx-01", nome: "Servidor principal", apn: "m2m.mobs2.br" },
    { id: "cx-02", nome: "Servidor de contingência", apn: "m2m.mobs2.br" }
  ];
  var EVENTOS_EMBARCADOS = ["Ignição ligada", "Ignição desligada", "Excesso de velocidade", "Freada brusca", "Aceleração brusca", "Curva brusca",
    "Porta aberta em movimento", "Ré acionada", "Botão de pânico", "Bateria baixa", "Entrada em cerca", "Saída de cerca"];
  /* As regiões são do ativo (ativoId). O tambemAtivos é a mesma cerca usada por outro ônibus da
     mesma garagem: o PCX-9A17 (a-03, a queda da T09/02 e 03) usa as do herói. O pacote conta
     REGIÕES, não ônibus — a uo-01 continua com 4, e o herói com os 31 itens (gate da errata).
     As regiões de um ativo: as do ativoId dele mais as em que ele está no tambemAtivos. */
  var CERCAS = {
    areas: [
      { id: "ar-01", nome: "Garagem Várzea" },
      { id: "ar-02", nome: "Terminal Joana Bezerra" },
      { id: "ar-03", nome: "Garagem Ibura" },
      { id: "ar-04", nome: "Terminal do Barro" }
    ],
    regioes: [
      { id: "rg-01", areaId: "ar-01", nome: "Pátio interno",       ativoId: "a-01", tambemAtivos: ["a-03"] },
      { id: "rg-02", areaId: "ar-01", nome: "Portão de saída",     ativoId: "a-01", tambemAtivos: ["a-03"] },
      { id: "rg-03", areaId: "ar-02", nome: "Plataforma norte",    ativoId: "a-01", tambemAtivos: ["a-03"] },
      { id: "rg-04", areaId: "ar-02", nome: "Bolsão de recolhida", ativoId: "a-01", tambemAtivos: ["a-03"] },
      /* a garagem da uo-02 · o QAH-1M67 (a-13) é o ônibus da sessão interrompida (T16/06) */
      { id: "rg-05", areaId: "ar-03", nome: "Pátio da Ibura",        ativoId: "a-13" },
      { id: "rg-06", areaId: "ar-03", nome: "Portão da Ibura",       ativoId: "a-13" },
      { id: "rg-07", areaId: "ar-04", nome: "Plataforma do Barro",   ativoId: "a-13" },
      { id: "rg-08", areaId: "ar-04", nome: "Recolhida do Barro",    ativoId: "a-13" }
    ]
  };

  /* Identificadores: cartões com a string ESPERADA + mapa de índices.
     A divergência por zeros à esquerda / prefixo é o caso mais
     representativo do produto (falhava no último item do ciclo, sem
     diagnóstico) — vive em casos["identificador-divergente"]. */
  var IDENTIFICADORES = {
    cartoes: [
      { id: "id-01", rotulo: "Cartão do motorista 041", codigoEsperado: "0009412857" },
      { id: "id-02", rotulo: "Cartão do motorista 112", codigoEsperado: "0007733904" },
      { id: "id-03", rotulo: "Cartão reserva da UO",    codigoEsperado: "PE-0033120" }
    ],
    indicesAlocados: [
      { indice: 1, cartaoId: "id-01" },
      { indice: 2, cartaoId: "id-02" },
      { indice: 3, cartaoId: "id-03" }
    ]
  };

  /* ═══ C16 · AS 8 ASSERTIVAS DO ENCERRAMENTO (T16) — outra lista, outro
     autoteste. As de baixo (AUTOTESTE_ASSERTIVAS) são as de bancada que
     T12/T13 contam ("Ignição liga", "Leitor de cartão responde"); estas são
     o que UM REINÍCIO E UMA RELEITURA provam — a resposta ao incidente que
     originou o produto. Cada uma é `Checagem` no uso pleno, COM O VALOR
     LIDO: nunca um "OK" agregado (HU-T16-4).
     `fonte` é chave de CÓDIGO (a tela deriva o valor do mock, Lei 17), nunca
     texto de tela. `valor` fixo só onde o fato é o próprio estado do módulo.
     ⚠ #4 é CONDICIONAL (R2): só existe quando a leitura da CAN foi refeita
     na sessão. Não aplicável aparece como `não se aplica` COM MOTIVO — nunca
     verde por omissão, que seria o autoteste mentindo sobre o que provou.
     ⚠ #8 NÃO BLOQUEIA (R1): depende de servidor, não do módulo na frente do
     técnico — sai da conta de bloqueio. É o que o C21 (T13, Seção D) consome.
     ⚠ #5 é a única que a spec não nomeia — desvio sinalizado no gate: a
     releitura prova os pontos de cerca separadamente dos identificadores
     porque a memória é compartilhada entre os dois (razão da ordem canônica
     Cercas ANTES de Leitor). */
  /* ⚠ RÓTULOS MEDIDOS (craft §1/§2): o orçamento do rótulo é 180 (360 − 32
     de padding − 20 do ícone − 8 − 108 da coluna do valor − 12 do gap), e
     "Configuração dos blocos", "Contadores sobreviveram" e "Identificadores
     íntegros" mediam ~190 e QUEBRAVAM em duas linhas no print. Viraram
     substantivos: o eyebrow AUTOTESTE nomeia a coluna uma vez, e
     "sobreviveram"/"íntegros" era a afirmação que TODAS as oito fazem —
     repetir em cada linha é ruído, não dado (o encurtamento que o diretor
     autorizou para os contadores, aplicado às três). Maior rótulo agora:
     "Canal de programação", 172 em 180. */
  var AUTOTESTE_ENCERRAMENTO = [
    { id: "configuracao",    rotulo: "Configuração", fonte: "versao" },
    { id: "contadores",      rotulo: "Contadores", fonte: "contador" },
    { id: "identificadores", rotulo: "Identificadores", fonte: "identificadores" },
    { id: "faixa",           rotulo: "Faixa de contadores", fonte: "faixa", condicional: true,
      motivo: "a leitura da CAN não foi refeita" },
    { id: "cercas",          rotulo: "Pontos de cerca", fonte: "cercas",
      motivoSemCercas: "nenhuma cerca neste ativo" },
    { id: "canal",           rotulo: "Canal de programação", fonte: "canal", valor: "fechado" },
    { id: "repouso",         rotulo: "Repouso do módulo", fonte: "repouso", valor: "restaurado" },
    { id: "plataforma",      rotulo: "ID na plataforma", fonte: "plataforma", valor: "na fila",
      nota: "confirma quando a evidência subir", bloqueia: false }
  ];

  /* Autoteste — as 8 assertivas canônicas (T13/T12). */
  var AUTOTESTE_ASSERTIVAS = [
    "Posição GPS válida",
    "Ignição liga",
    "Ignição desliga",
    "Comunicação com o servidor",
    "Leitura do hodômetro",
    "Leitura do horímetro",
    "Leitor de cartão responde",
    "Memória de eventos grava"
  ];

  /* ── 13 instalações · 13 dias distintos · span 0–44 = 45 corridos.
     6 aprovadas puras · 2 aguardando puras · 1 falha reconhecida ·
     1 reprocessada · 1 reprovada · +2 ressalvadas (1 aprovada, 1 aguardando). */
  var INSTALACOES = comData([
    { id: "i-01", ativoId: "a-01", moduloSerial: "M2C-0417", diasAtras: 0,  hora: "11:47",
      estado: "aprovada", recebimento: { posicionamento: { estado: "conforme", posicoes: 3, emSeg: 72 }, eventos: { estado: "conforme", recebidoAosSeg: 24 } }, ressalva: null,
      etapas: { /* história completa do herói */
        /* ⚠ C23 (sweep) · `preChecagem` FICA DECLARADO, sem leitor. Mesma
           natureza de `blocos 6/6`, `checklist 10/10` e `autoteste 8/8`, que
           T12 declara sem leitor desde o C22: são ETAPAS, e etapa é o
           relatório. Consumidor: a tela web do gestor.
           protótipo C11 (T12) · a referência vence (G1, T12-A7): o detalhe
           da T12/01 lê as etapas da i-01 (as sete linhas, com o readBack da
           cadeia), e o `resumo` das outras dá as quatro linhas que ele
           sustenta (T12·2). Nada aqui muda. */
        preChecagem: { checagens: 12, passaram: 12 },
        cadeia: [
          { bloco: "limpeza", hora: "10:02", readBack: "confirmado" },
          { bloco: "ativo",   hora: "10:06", readBack: "confirmado" },
          { bloco: "cercas",  hora: "10:11", readBack: "confirmado" },
          { bloco: "leitor",  hora: "10:15", readBack: "confirmado" },
          { bloco: "eventos", hora: "10:21", readBack: "confirmado" },
          { bloco: "conexao", hora: "10:26", readBack: "confirmado" }
        ],
        calibracao: { semeadas: ["hodometro", "horimetro"], puladas: [], valorPainel: "482.317 km" },
        cicloDinamico: { completo: true, passos: ["Ignição ligada", "Rotação", "Ré acionada", "Porta aberta", "Cartão do motorista", "Ignição desligada"], confirmados: 6 },
        checklist: { itens: 31, concluidos: 31 },
        autoteste: { assertivas: 8, passaram: 8 },
        recebimento: { confirmado: true, hora: "11:47" }
      } },
    { id: "i-02", ativoId: "a-03", moduloSerial: "M2C-0312", diasAtras: 1,  hora: "16:05",
      estado: "aguardando-validacao", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-03", ativoId: "a-12", moduloSerial: "M2C-0402", diasAtras: 2,  hora: "10:22",
      estado: "aguardando-validacao",
      ressalva: { item: "Fixação da antena", justificativa: "Suporte original quebrado — fixada com abraçadeira reforçada" },
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-04", ativoId: "a-19", moduloSerial: "M2C-0466", diasAtras: 4,  hora: "09:40",
      estado: "aprovada",
      ressalva: { item: "Foto do painel", justificativa: "Vidro do painel trincado — foto lateral autorizada pelo gestor" },
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-05", ativoId: "a-14", moduloSerial: "M2C-0423", diasAtras: 6,  hora: "15:12",
      estado: "reprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "7/8", assertivaFalhou: "Ignição desliga", recebimento: "confirmado" } },
    { id: "i-06", ativoId: "a-06", moduloSerial: "M2C-0362", diasAtras: 9,  hora: "13:58",
      estado: "falha-recebimento-reconhecida", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "não confirmado — falha reconhecida pelo técnico" } },
    { id: "i-07", ativoId: "a-16", moduloSerial: "M2C-0438", diasAtras: 13, hora: "08:31",
      estado: "aprovada-reprocessamento", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado após reprocessamento" } },
    { id: "i-08", ativoId: "a-02", moduloSerial: "M2C-0301", diasAtras: 17, hora: "14:03",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-09", ativoId: "a-20", moduloSerial: "M2C-0472", diasAtras: 22, hora: "10:47",
      estado: "aguardando-validacao", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-10", ativoId: "a-09", moduloSerial: "M2C-0371", diasAtras: 27, hora: "16:55",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-11", ativoId: "a-13", moduloSerial: "M2C-0411", diasAtras: 33, hora: "09:18",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-12", ativoId: "a-22", moduloSerial: "M2C-0480", diasAtras: 39, hora: "11:36",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } },
    { id: "i-13", ativoId: "a-17", moduloSerial: "M2C-0445", diasAtras: 44, hora: "15:29",
      estado: "aprovada", ressalva: null,
      resumo: { blocos: "6/6", checklist: "31/31", autoteste: "8/8", recebimento: "confirmado" } }
  ]);

  /* ── C22 · T12 · A REGRA dos três critérios — não é campo por instalação.
     O que o `resumo` já diz não se reescreve (o veredito sai de
     `recebimento`, a razão da reprovada sai de `assertivaFalhou`); o que ele
     não tem são os três critérios, e eles DERIVAM do estado:
       aprovada / reprocessada / aguardando → os três chegaram; o que falta
         em aguardando é o gestor, não o dado.
       reprovada → `Ignição desliga` não passou: sem desligar a ignição o
         evento sai do parâmetro. (A viagem saiu dos critérios: o ciclo é parado — decisão 54.)
       falha reconhecida → nada chegou ao servidor, coerente com a secaoF.
     ⚠ UMA exceção declarada (aprovada no gate): i-09, posicionamento
     `atrasado` — posição que chegou tarde é exatamente o que um gestor não
     aprova sozinho, e sem ela a palavra seria vocabulário nunca visto.
     Os três números da janela (3 × intervalo + 2 min) e o teto de espera
     moram AQUI para não virarem literal de tela (Lei 8).
     protótipo C11 (T12) · nenhuma das quatro referências da T12 mostra os três
     critérios, a janela ou o teto (HU-T12-1 a 4 sem referência, G25, T12-A7):
     no protótipo eles ficam sem leitor, e a T12 lê daqui só os `gruposIdade`
     (AC-16, no fim do arquivo). Nada aqui muda. */
  var CRITERIOS_REGRA = {
    fatorJanela: 3,
    folgaJanelaSeg: 120,
    tetoEsperaMin: 10,
    porEstado: {
      "aprovada":                      { posicionamento: "conforme", eventos: "conforme" },
      "aprovada-reprocessamento":      { posicionamento: "conforme", eventos: "conforme" },
      "aguardando-validacao":          { posicionamento: "conforme", eventos: "conforme" },
      "reprovada":                     { posicionamento: "conforme", eventos: "fora do parâmetro" },
      "falha-recebimento-reconhecida": { posicionamento: "ausente",  eventos: "ausente" }
    },
    excecoes: { "i-09": { posicionamento: "atrasado" } }
  };

  /* ── Diagnóstico do módulo (T07 · decisão 44) — o que a tela mostra e de onde vem.
     Substitui a pré-checagem da conexão e os Dados da CAN. TRÊS linhas travam
     (serial, modelo, firmware); as outras só informam — o checklist registra.
     A CAN só aparece com o ATIVO: antes do bloco do ativo gravado, ela espera. */
  var DIAGNOSTICO = {
    modulo: [
      { id: "serial",      rotulo: "Serial no cadastro", heroi: "VL06 CAN-BT",        trava: "serial-nao-cadastrado", travaModelo: "modelo-sem-driver" },
      { id: "firmware",    rotulo: "Firmware",           heroi: "2.3.5",              trava: "firmware-fora-matriz" },
      { id: "alimentacao", rotulo: "Alimentação",        heroi: "13,8 V" },
      { id: "gps",         rotulo: "GPS",                heroi: "fixo · 9 satélites" },
      { id: "entradas",    rotulo: "Entradas digitais",  heroi: "ignição ligada" },
      { id: "modem",       rotulo: "Modem",              heroi: "na rede",            informa: "modem-sem-sinal" },
      { id: "sim",         rotulo: "SIM",                heroi: "ativo" }
    ],
    canAguarda: "A CAN aparece depois que o bloco do ativo for gravado.",
    can: { modeloAtivoId: "ma-01", sinais: [
      { id: "rotacao", rotulo: "Rotação", lido: "980 rpm", leituras: ["980 rpm", "992 rpm", "975 rpm", "988 rpm"] }, { id: "velocidade", rotulo: "Velocidade", lido: "0 km/h" },
      { id: "hodometro", rotulo: "Hodômetro", lido: "184.320 km" }, { id: "temperatura", rotulo: "Temperatura", lido: "31 °C", esperado: "−40 a 120", leituras: ["31 °C", "31 °C", "32 °C", "31 °C"] },
      { id: "combustivel", rotulo: "Combustível", lido: "62%" }, { id: "consumo", rotulo: "Consumo", lido: "1,8 L/h", leituras: ["1,8 L/h", "1,9 L/h", "1,8 L/h", "1,7 L/h"] },
      { id: "alternador", rotulo: "Alternador", lido: "14,1 V", leituras: ["14,1 V", "14,0 V", "14,2 V", "14,1 V"] }, { id: "re", rotulo: "Ré", lido: "desligada" } ] }
  };

  /* ── Pacote de sincronização — um por UO, em TRÊS idades (T03).
     Idade → estado deriva NA TELA a partir dos limiares daqui. */
  /* protótipo C4 (AC-05) · segPorItem: a estimativa do servidor por item,
     de onde sai o "faltam ~40 s" da T03 (pacote 1: 25 itens por baixar × 1,6 s
     = 40, arredonda pra dezena; o arquiteto, 02/10). A versão do pacote deriva
     de uoId e data (T03·2), sem campo. */
  var PACOTES = comData([
    { id: "pac-uo-01", uoId: "uo-01", diasAtras: 1, hora: "07:10", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario"],
      contem: { ativos: 10, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 4 } },
    { id: "pac-uo-02", uoId: "uo-02", diasAtras: 4, hora: "06:55", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario"],
      contem: { ativos: 8, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 4 } },
    { id: "pac-uo-03", uoId: "uo-03", diasAtras: 8, hora: "07:30", segPorItem: 1.6,
      limiares: { avisoDias: 3, bloqueioDias: 7 },
      presetsEventoIds: ["pe-urbano", "pe-rodoviario", "pe-maquina"],
      contem: { ativos: 6, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } }
  ]);

  /* ── Fila de saída (T15) — tempo parado deriva de criadoAs vs 14:30.
     Erro de rede reenvia SOZINHO; recusa do servidor exige ação do
     técnico, NUNCA silenciosa. Seção F em re-checagem é seção separada. */
  var FILA_SAIDA = comData([
    { id: "f-01", tipo: "Evidências da instalação",  ativoId: "a-03", diasAtras: 0, criadoAs: "14:28", estado: "na-fila" },
    { id: "f-02", tipo: "Checklist de homologação",  ativoId: "a-12", diasAtras: 0, criadoAs: "14:12", estado: "na-fila" },
    { id: "f-03", tipo: "Checklist de homologação",  ativoId: "a-20", diasAtras: 0, criadoAs: "11:30", estado: "na-fila" },
    /* C19 · +tamanhoMb — SÓ no corrente, um campo com UM leitor: é a escala
       do progresso (`62% · 8,4 MB`) e o que explica por que uma evidência
       demora e a outra não. Nos outros nove seria número sem decisão. */
    { id: "f-04", tipo: "Evidências da instalação",  ativoId: "a-09", diasAtras: 0, criadoAs: "14:29", estado: "enviando", progresso: 62, tamanhoMb: 8.4 },
    { id: "f-05", tipo: "Evidências da instalação",  ativoId: "a-01", diasAtras: 0, criadoAs: "09:02", estado: "recebida", confirmadoAs: "09:14" },
    { id: "f-06", tipo: "Checklist de homologação",  ativoId: "a-01", diasAtras: 0, criadoAs: "09:03", estado: "recebida", confirmadoAs: "09:15" },
    { id: "f-07", tipo: "Checklist de homologação",  ativoId: "a-03", diasAtras: 1, criadoAs: "16:20", estado: "recebida", confirmadoAs: "16:40" },
    { id: "f-08", tipo: "Evidências da instalação",  ativoId: "a-12", diasAtras: 2, criadoAs: "09:48", estado: "recebida", confirmadoAs: "10:05" },
    { id: "f-09", tipo: "Evidências da instalação",  ativoId: "a-19", diasAtras: 0, criadoAs: "13:40", estado: "erro-rede",
      reenvio: "automático", tentativas: 3, proximaTentativaAs: "14:32" },
    /* C19 · motivo ENCURTADO, medido: a frase do servidor dá 585,7 na faixa
       de 296 do Checagem (três linhas), e `O servidor recusou o pacote` é o
       que a coluna da direita já diz em `recusado`. Original do servidor,
       para procedência: "O servidor recusou o pacote: esta instalação consta
       encerrada por outro usuário." */
    { id: "f-10", tipo: "Evidências da instalação",  ativoId: "a-14", diasAtras: 0, criadoAs: "12:05", estado: "erro-recusa",
      reenvio: "manual", motivo: "instalação encerrada por outro usuário" }
  ]);
  var SECAO_F = { emRecheck: true, ativoId: "a-06", instalacaoId: "i-06",
    motivo: "Confirmação de recebimento pendente desde a falha reconhecida" };

  /* ── Casos — cada estado de bloqueio/tela aponta para dado CONCRETO da
     obra. Nenhum é opcional: tela sem o seu caso morre sem dado. ── */
  var CASOS = {
    /* T12 · o que o servidor recebeu da PCX-9A17 (HU-T12-4): o pacote não
       declara o modo de fila do módulo, e o critério de eventos fica
       indisponível, com o motivo. O status geral espera. */
    "criterio-indisponivel": { tela: "T12", ativoId: "a-03", recebimento: {
      posicionamento: { estado: "conforme", posicoes: 3, emSeg: 72 },
      eventos: { estado: "indisponivel", motivo: "o pacote não declara a fila" } } },
    /* T12 · a falha de rede vira pendência (HU-T12-6): o servidor não
       respondeu, e o app confere de novo por 24 h — não reprova. */
    "criterio-pendente": { tela: "T12", ativoId: "a-03", recebimento: {
      posicionamento: { estado: "pendente", motivo: "sem resposta", confereDeNovoPorHoras: 24 },
      eventos: { estado: "conforme", recebidoAosSeg: 52 } } },
    /* T11 · a versão do módulo não se lê (HU-T11-1): ausente, truncada ou em
       formato desconhecido. O diff roda por conteúdo, bloco a bloco, e acha
       2 divergências. Corrigir as Cercas arrasta o Leitor e os Eventos. */
    /* T01 · os 3 envios da hora acabaram (HU-T01-7): o primeiro foi às
       14:12, e o reenvio libera às 15:12. O código enviado segue valendo. */
    "teto-de-envios": { tela: "T01", enviosNaHora: 3, primeiroEnvioAs: "14:12", liberaAs: "15:12" },
    /* T01 · outro usuário entra no aparelho (HU-T01-4): a sessão do anterior
       é encerrada, e a fila dele continua subindo. */
    "outro-usuario": { tela: "T01", usuario: "m.souza", nome: "Marcos Souza",
      anterior: { usuario: "r.vieira", itensNaFila: 3 } },
    /* T15 · a fila vazia: o último item subiu às 14:02. */
    "fila-vazia": { tela: "T15", ultimoEnvioAs: "14:02" },
    /* T02 · o técnico com uma empresa só (HU-T02-1). A empresa vem sempre
       antes da unidade: com uma só, a lista aparece com ela já marcada e o
       Ver as unidades aceso — o técnico só confirma. Nas unidades, o nome
       dela fica em cima, e não há Trocar de empresa. */
    "uma-empresa": { tela: "T02", empresas: [
      { id: "emp-01", nome: "Viação Atlântico Sul", unidades: 3 } ] },
    /* T01 · o login de quem abre o app. O herói entra com os dois campos
       preenchidos, pra o palco andar num toque. Os dois casos abaixo são o
       que o técnico vê de verdade: nada lembrado, ou só o usuário lembrado
       (HU-T01-3 · a senha nunca fica guardada). */
    "primeiro-acesso": { tela: "T01", usuarioLembrado: null },
    "usuario-lembrado": { tela: "T01", usuarioLembrado: "r.vieira" },
    /* T13 · a localização negada (HU-T13-7). Nada trava: o checklist
       homologa igual, e o relatório vai sem a geolocalização — o veredito
       diz "o relatório vai sem localização". */
    "localizacao-negada": { tela: "T13", permissao: "localizacao", resposta: "negada" },
    /* O mundo real · quatro estados que não dependem do módulo nem do
       ativo, e sim do celular. Nenhum trava o que já foi feito.
       - bluetooth-desligado: a T05 não busca · "Ligar o Bluetooth" pede ao
         Android, e a busca começa sozinha quando ele liga
       - bluetooth-sem-permissao: "Permitir" pede de novo · se o técnico
         marcou "não perguntar de novo", o botão vira "Abrir as configurações"
       - camera-sem-permissao: a câmera do app não abre · "Abrir as
         configurações" · vale pra câmera da T10 e do checklist
       - sem-conexao-no-login: o login precisa de rede · os campos ficam
         preenchidos, porque a senha não estava errada */
    "bluetooth-desligado": { tela: "T05", bluetooth: "desligado" },
    "bluetooth-sem-permissao": { tela: "T05", permissao: "bluetooth", resposta: "negada" },
    "sem-conexao-no-login": { tela: "T01", rede: false },
    /* T10 · a releitura que não confere (HU-T10-5). O técnico semeou
       482.317 km, e o módulo releu 482.316,5 km: 500 m a menos. A tolerância
       do hodômetro é calibracao.tolerancia.hodometro.desvio = 120 m — então
       não confere, e a tela pede "Semear de novo". A foto continua valendo:
       ela prova o painel, não o módulo. relidoBruto em metros, como bruto. */
    "releitura-nao-confere": { ativoId: "a-01", grandeza: "hodometro", relidoBruto: 482316500 },
    /* T02 · a lista longa. A empresa do herói tem 3 unidades (o gate trava
       isso), e a busca só aparece com MAIS DE 6 — então a lista longa vive
       num caso: a mesma empresa, num mundo com 9 unidades em 3 regiões.
       O texto da linha deriva do dado: idade 0 → "pacote de hoje", 1 →
       "pacote de ontem", n → "pacote de n dias"; acima do limite de 7,
       só a causa: "pacote vencido há n dias". */
    "lista-longa-garagens": { limiteSemBusca: 6,
      /* as garagens a mais do caso têm pacote, pra o Sincronizar funcionar em todas */
      pacotes: [
        { id: "pac-uo-11", uoId: "uo-11", diasAtras: 1, hora: "06:40", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 14, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } },
        { id: "pac-uo-12", uoId: "uo-12", diasAtras: 0, hora: "06:15", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 12, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } },
        { id: "pac-uo-13", uoId: "uo-13", diasAtras: 1, hora: "07:30", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 9, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } },
        { id: "pac-uo-14", uoId: "uo-14", diasAtras: 2, hora: "07:05", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 7, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } },
        { id: "pac-uo-15", uoId: "uo-15", diasAtras: 1, hora: "06:50", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 5, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } },
        { id: "pac-uo-16", uoId: "uo-16", diasAtras: 1, hora: "07:20", limiares: { avisoDias: 3, bloqueioDias: 7 }, contem: { ativos: 4, conexoes: 2, modelosAtivo: 3, eventos: 12, cercas: 0 } } ],
      ucs: [ { id: "uc-01", nome: "RMR – Recife" }, { id: "uc-03", nome: "Zona da Mata – Vitória" }, { id: "uc-02", nome: "Agreste – Caruaru" } ],
      uos: [
        { id: "uo-01", ucId: "uc-01", nome: "Garagem Várzea",     cidade: "Recife" },
        { id: "uo-02", ucId: "uc-01", nome: "Garagem Ibura",      cidade: "Recife" },
        { id: "uo-11", ucId: "uc-01", nome: "Garagem Boa Viagem", cidade: "Recife" },
        { id: "uo-12", ucId: "uc-01", nome: "Garagem Olinda",     cidade: "Olinda" },
        { id: "uo-13", ucId: "uc-01", nome: "Garagem Camaragibe", cidade: "Camaragibe" },
        { id: "uo-14", ucId: "uc-03", nome: "Garagem Vitória",    cidade: "Vitória de Santo Antão" },
        { id: "uo-15", ucId: "uc-03", nome: "Garagem Carpina",    cidade: "Carpina" },
        { id: "uo-03", ucId: "uc-02", nome: "Pátio Caruaru",      cidade: "Caruaru" },
        { id: "uo-16", ucId: "uc-02", nome: "Garagem Gravatá",    cidade: "Gravatá" } ] },
    "serial-nao-cadastrado": { serial: "M2C-0999" },
    /* C22 · T12 — a CONSULTA ANTERIOR, declarada: `consultado hoje às 11:47`
       é valor da obra, não derivado de i-01. O offline se alcança por AÇÃO
       (o primeiro `Atualizar` não acha rede), nunca ligado por padrão
       (D-61), e offline neste produto é condição de trabalho, não erro.
       protótipo C11 (T12) · nenhuma referência da T12 tem o `Atualizar`
       (T12-A13): no protótipo a T12/03 abre pela coluna do palco, com a lista
       da garagem e esta hora no aviso. Nada aqui muda. */
    "instalacoes-sem-rede": { consultadoAs: "11:47", diasAtras: 0 },
    "modelo-sem-driver": { moduloSerial: "M2C-0497", ativoId: "a-21",
      motivo: "O app ainda não configura o VC07 STD." },
    /* ⚠ C23 (sweep) · `firmwareLido` SAIU: duplicava
       modulos["M2C-0451"].firmware ("2.4.1"), que é o que T05 lê de verdade
       (`d.mod.firmware`). Duas fontes para o mesmo fato é uma que pode
       divergir. `firmwareDisponivel` FICA — tem leitor em T05. */
    "firmware-fora-matriz": { moduloSerial: "M2C-0451", ativoId: "a-18",
      firmwareDisponivel: "2.3.5" },
    "conteudo-nao-cabe": { ativoId: "a-10", moduloSerial: "M2C-0394",
      conteudoRegistros: 128, capacidadeRegistros: 96 },
    "pool-esgotado": { ativoId: "a-05",
      regioesUsadas: 4, regioesMax: 4, posicoesUsadas: 8, posicoesMax: 8,
      regiaoSolicitada: "Terminal Cosme e Damião" },
    "ativo-fora-pacote": { ativoId: "a-24", pacoteId: "pac-uo-01",
      motivo: "Pertence a Garagem Ibura." },
    /* C10 (D8) · ocupadoPor "sensor de porta" é ENTRADA DIGITAL (checagem #5
       de T05); consumidores é o PAR SERIAL (entrada do leitor + saída de
       transmissão) da matriz de T06. Linhas físicas diferentes, dois
       assuntos — não fundir. meioAtual (D-39): o meio é como o módulo foi
       ENCONTRADO, fato da sessão, não capacidade da variante. */
    "conflito-pinos-resolvivel": { ativoId: "a-04", moduloSerial: "M2C-0335",
      recurso: "leitor", fio: "fio branco", ocupadoPor: "sensor de porta",
      saida: "oferecer leitor sem fio",
      meioAtual: "cabo",
      consumidores: ["leitor serial", "cabo de programação"] },
    "conflito-pinos-sem-saida": { ativoId: "a-11", moduloSerial: "M2C-0389",
      recurso: "leitor", fio: "fio branco", ocupadoPor: "sensor de porta",
      saida: "escalonar ao gestor — este módulo não tem opção sem fio",
      meioAtual: "cabo",
      consumidores: ["leitor serial", "cabo de programação"] },
    "can-fora-esperado": { ativoId: "a-02", sinal: "velocidade",
      lido: "0 km/h", esperado: "maior que zero com o motor ligado" },
    "grandeza-indisponivel": { modeloAtivoId: "ma-02", grandeza: "horímetro",
      motivo: "A leitura desta linha não fornece horímetro. Use o valor do painel na próxima revisão." },
    /* protótipo C11 (T11) · o que a T11 lê destes dois casos (G9, T11-V1,
       T11-V7). Do diff-divergente: o par, o bloco e o noCadastro; o noModulo
       FICA DECLARADO, sem leitor — as referências mostram só o que o cadastro
       manda (HU-T11-2 parcial). Do indice-nao-classificado: só a existência e
       o par; posicao e motivo FICAM DECLARADOS, sem leitor — a frase da nota
       é a do textos.md, e a posição na memória é vocabulário que o técnico
       não lê. O noCadastro de Leitor e de Eventos não bate com o cadastro do
       ma-02 (chave-de-contato; pe-rodoviario, 60 s · T11-A3): no par dele, a
       tela mostra o que o caso declara. */
    "diff-divergente": { ativoId: "a-16", moduloSerial: "M2C-0438",
      divergencias: [
        { bloco: "cercas",  noModulo: "3 regiões",         noCadastro: "4 regiões" },
        { bloco: "conexao", rotulo: "APN", noModulo: "m2m.antiga.br", noCadastro: "m2m.mobs2.br" },
        { bloco: "eventos", noModulo: "intervalo 60 s",    noCadastro: "intervalo 30 s" },
        { bloco: "leitor",  noModulo: "leitor no fio branco", noCadastro: "leitor sem fio" }
      ],
      /* o Extended ID não diverge: é só leitura (decisão 45) — a conferência mostra o que está no módulo */
      extendedId: { cartoes: 3, ibuttons: 1, somenteLeitura: true } },
    "indice-nao-classificado": { ativoId: "a-16", moduloSerial: "M2C-0438",
      posicao: 7, motivo: "Conteúdo gravado que o app não reconhece — não pertence a nenhum bloco." },
    /* protótipo C11 (T11) · AC-17 — o par que CONFERE (T11/02, T11·1 a): a
       T11 aberta pelo menu com a sessão do herói não acha divergência e vai
       pro "tudo confere". Caso ADITIVO e SEM VALOR DECLARADO: o que o cadastro
       manda sai do cadastro do próprio par (a tradução do modelo, as regiões
       do ativo, o meio da sessão, o preset de eventos), e a divergência só
       existe no par do diff-divergente. É o par que o endereço do 02 monta
       (G20), e ele desfaz o "diff-divergente, invertido" do índice (T11-N3):
       o 02 tem a faixa do herói E o cadastro do herói. Custo declarado (G9):
       a tradução do ma-01 é "urbano v3", e a referência 02 diz "frota v2",
       que é a do ma-02 (T11-A1) — o mock ganha no valor. O Leitor sai do
       meio da sessão (situacao.porPerto, D-39: "sem-fio" é o leitor sem fio,
       como na T06·4), e não do leitor.tipo do modelo ("cartao-serial" no
       ma-01), que fica sem leitor na T11: só "leitor sem fio" tem texto. */
    "conferencia-confere": { ativoId: "a-01", moduloSerial: "M2C-0417" },
    /* C16 · +noEncerramento, ADITIVO: a assertiva de BANCADA que falha aqui
       ("Ignição desliga") é da lista de T12/T13 e fica intacta — no
       encerramento o que um reinício reprova de verdade é o CONTADOR, que
       volta zerado. Mesmo ativo, mesma consequência: bloqueia a homologação,
       não o encerramento (HU-T16-5). */
    "autoteste-falhando": { instalacaoId: "i-05", ativoId: "a-14",
      assertiva: "Ignição desliga", passaram: 7, total: 8,
      efeito: "bloqueia a homologação, não o encerramento",
      noEncerramento: { assertiva: "contadores", lido: "0 km",
        causa: "o módulo voltou com a leitura zerada" } },
    "identificador-divergente": {
      /* o caso mais representativo do produto: falhava no último item do
         ciclo, sem diagnóstico — o app mostra lido × esperado em formato
         de negócio (HU-T14-5) */
      exemplos: [
        { cartaoId: "id-01", esperado: "0009412857", lido: "9412857", tipo: "zeros à esquerda" },
        { cartaoId: "id-03", esperado: "PE-0033120", lido: "0033120", tipo: "prefixo" }
      ] },
    /* C16 (HU-T16-6) · +o último bloco confirmado POR READ-BACK — é o que a retomada mostra e o que faz o TEMPO
       DECORRIDO existir de verdade (13:05 → 14:30 = 1h25; o zero estrutural
       do C12.6 morre aqui). 3 confirmados = limpeza · ativo · cercas, e o
       ponto de retomada é o bloco 4 (Leitor) — coerente com pontoRetomada. O que já foi gravado deriva de ultimoConfirmado e da ordem da cadeia (decisão 49). */
    "sessao-interrompida": { ativoId: "a-13", moduloSerial: "M2C-0411",
      diasAtras: 0, iniciadaAs: "13:05", pontoRetomada: "Bloco 4 de 6 — Leitor",
      confirmados: 3, ultimoConfirmado: "cercas" },
  };
  CASOS["sessao-interrompida"].data = diasAntes(0);
  /* protótipo C6 (T05) · AC-19 — a atualização do firmware (T05/10): o
     quadro que a referência desenha, 62% gravados ("atualizando · 62%").
     Campo ADITIVO no caso: o par módulo × ativo e o firmwareDisponivel
     ficam intocados. O ritmo da atualização não é dado de negócio e não
     está declarado em movimento.md (G4): até lá, o quadro fica parado. */
  CASOS["firmware-fora-matriz"].atualizacao = { quadroPct: 62 };
  /* C6 · caso ADITIVO (recorte canônico acima intocado — sha256 conferido
     antes e depois). Pacote velho + rede ruim é o caso de campo: a primeira
     sincronização do pacote BLOQUEADO (pac-uo-03, 8 dias) falha no tick
     declarado; Reconectar retoma do mesmo `baixados` e completa. Constante
     declarada, não moeda (E8): nada depende de quantas vezes a tela montou. */
  CASOS["sync-falha-rede"] = { pacoteId: "pac-uo-03", falhaNoTick: 4,
    motivo: "O que já baixou fica guardado." };
  /* C8 · T05 — casos ADITIVOS (gate C8, decisão 1). Mesma forma do
     sync-falha-rede: constante DECLARADA, não moeda (E8) — sem gatilho no
     mock, quatro HUs de T05 seriam ramo cego (lição do C7.18).
       busca-vazia: a 1ª busca após chegar não encontra nada — o módulo leva
         segundos para acordar depois de alimentado. É o vazio mais importante
         do produto e precisa ser alcançável por navegação (HU-T05-1).
       conexao-falha: a 1ª tentativa neste módulo não responde. A causa vive
         no backend (senha divergente devolve recusa ou silêncio); em tela é UM
         estado com três coisas a checar (HU-T05-4). Tentar novamente conecta.
       link-perdido · modulo-em-repouso: gatilhos da HU-T05-9 — escopo do C9;
         SEM CONSUMIDOR até lá, declarados agora porque dado é aditivo.
       modulo-com-pendencias: o módulo do canal aberto (M2C-0362) guardou
         mensagens enquanto o canal ficou em programação — leitura que
         INFORMA, não trava (HU-T05-7). A rede do módulo NÃO entra aqui:
         "não conectada" seria a trava do #6, não uma leitura — um fato, um
         portador. */
  CASOS["busca-vazia"] = { tentativa: 1,
    motivo: "Aproxime o aparelho do módulo e confira se ele está alimentado." };
  CASOS["conexao-falha"] = { moduloSerial: "M2C-0301", ativoId: "a-02", tentativa: 1 };
  CASOS["link-perdido"] = { moduloSerial: "M2C-0312", ativoId: "a-03", naChecagem: 6 };
  CASOS["modulo-com-pendencias"] = { moduloSerial: "M2C-0362", ativoId: "a-06", mensagens: 12, diagnostico: 3 };
  /* protótipo C7 (T05) · AC-18 — quanto a busca vazia durou (T05/03: "A
     busca durou 8 s · primeira tentativa"). Campo ADITIVO no caso: a
     tentativa e o motivo ficam intocados. É o tempo que a busca esperou
     resposta, fato desta tentativa — não é ritmo de animação. */
  CASOS["busca-vazia"].duracaoSeg = 8;
  /* protótipo C7 (T05) · AC-20 — o firmware fora da matriz com o módulo SEM
     REDE (T05/09): o único estado da T05 que nada no mock produzia. Caso
     ADITIVO, o MESMO par do firmware-fora-matriz (M2C-0451 × a-18), que fica
     intocado: aqui mora só o que muda, o modem do módulo sem rede. Sem rede,
     o firmware não baixa pelo módulo: a saída é gravar a conexão antes
     (HU-T05-5). A tira "Rede do módulo · conectada" da mesma referência é
     outro fato (a rede que o módulo tem cadastrada) — sinalizado, T05-N1. */
  CASOS["firmware-fora-sem-rede"] = { moduloSerial: "M2C-0451", ativoId: "a-18", modem: "sem rede" };

  /* C11 · T07 — SINAIS DA CAN por modelo de ativo (bloco Ativo). ADITIVO: os
     três modelos ganham `sinaisCan`; nada acima muda. Cada sinal declara a
     FASE (estático = chave ligada, motor desligado · dinâmico = motor ligado /
     em movimento) e a FAIXA ESPERADA — sem faixa (esperado: null) é checagem de
     PRESENÇA (C11.6): prova que a CAN informa; o valor é assunto de T10. Os domínios vêm DAQUI, não de
     constante: domínio sem sinal no modelo não aparece em tela — ma-02 não
     lê GPS pela CAN, ma-03 (máquina, gateway) não tem Velocidade nem
     Combustível. `lido` é a leitura NOMINAL do sinal estático com o módulo
     são; os casos abaixo sobrescrevem por ativo.
     ⚠ casos["can-fora-esperado"] (velocidade 0 km/h) é sinal DINÂMICO: não
     pode reprovar em T07 — fica intacto, reservado ao ciclo dinâmico (T14). */
  /* C11.9 · o DOMÍNIO é a categoria, o SINAL é a grandeza: "Velocidade →
     Velocidade" e "Motor/Rotação → Rotação" repetiam (craft §2). Movimento e
     Motor seguem o padrão que Combustível → Consumo já tinha. ⚠ A spec
     nomeia "Velocidade" e "Motor/Rotação" — desvio de COPY sinalizado; o
     agrupamento é o mesmo.
     A exceção é o nível do tanque, que se chama Combustível: nenhuma tela
     mostra o nome do domínio (T07, T08), e "Nível" sozinho não dizia do quê.
     O id continua "nivel". */
  var DOMINIOS_CAN = ["Geral", "Sistema elétrico", "Movimento", "GPS", "Motor", "Combustível"];
  var SINAIS_CAN = {
    "ma-01": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "hodometro",   dominio: "Geral",            rotulo: "Hodômetro",            fase: "estatico", esperado: null,                lido: "184.320 km" },
      { id: "bateria",     dominio: "Sistema elétrico", rotulo: "Tensão da bateria",    fase: "estatico", esperado: "12,0 a 15,0 V",     lido: "13,8 V" },
      { id: "alternador",  dominio: "Sistema elétrico", rotulo: "Tensão do alternador", fase: "dinamico", esperado: "13,5 a 14,8 V" },
      { id: "velocidade",  dominio: "Movimento",        rotulo: "Velocidade",           fase: "dinamico", esperado: "acima de 0 km/h" },
      { id: "re",          dominio: "Movimento",        rotulo: "Ré",                   fase: "dinamico", esperado: "acende ao engatar" },
      { id: "satelites",   dominio: "GPS",              rotulo: "Satélites",            fase: "estatico", esperado: "4 ou mais",         lido: "9" },
      { id: "posicao",     dominio: "GPS",              rotulo: "Posição",              fase: "estatico", esperado: "fixa",              lido: "fixa" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "600 a 2.500 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "31 °C" },
      { id: "nivel",       dominio: "Combustível",      rotulo: "Combustível",          fase: "estatico", esperado: null,                lido: "62 %" },
      { id: "consumo",     dominio: "Combustível",      rotulo: "Consumo",              fase: "dinamico", esperado: "acima de 0 L/h" }
    ],
    "ma-02": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "hodometro",   dominio: "Geral",            rotulo: "Hodômetro",            fase: "estatico", esperado: null,                lido: "96.410 km" },
      { id: "bateria",     dominio: "Sistema elétrico", rotulo: "Tensão da bateria",    fase: "estatico", esperado: "24,0 a 29,0 V",     lido: "27,1 V" },
      { id: "velocidade",  dominio: "Movimento",        rotulo: "Velocidade",           fase: "dinamico", esperado: "acima de 0 km/h" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "600 a 2.200 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "29 °C" },
      { id: "oleo",        dominio: "Motor",            rotulo: "Temperatura do óleo",  fase: "estatico", esperado: "−40 a 150 °C",      lido: "27 °C" },
      { id: "nivel",       dominio: "Combustível",      rotulo: "Combustível",          fase: "estatico", esperado: null,                lido: "48 %" }
    ],
    "ma-03": [
      { id: "ignicao",     dominio: "Geral",            rotulo: "Ignição",              fase: "estatico", esperado: "ligada",            lido: "ligada" },
      { id: "horimetro",   dominio: "Geral",            rotulo: "Horímetro",            fase: "estatico", esperado: null,                lido: "4.812 h" },
      { id: "bateria",     dominio: "Sistema elétrico", rotulo: "Tensão da bateria",    fase: "estatico", esperado: "12,0 a 15,0 V",     lido: "12,9 V" },
      { id: "satelites",   dominio: "GPS",              rotulo: "Satélites",            fase: "estatico", esperado: "4 ou mais",         lido: "7" },
      { id: "rotacao",     dominio: "Motor",            rotulo: "Rotação",              fase: "dinamico", esperado: "800 a 2.200 rpm" },
      { id: "temperatura", dominio: "Motor",            rotulo: "Temperatura",          fase: "estatico", esperado: "−40 a 120 °C",      lido: "34 °C" }
    ]
  };
  MODELOS_ATIVO.forEach(function (m) { m.sinaisCan = SINAIS_CAN[m.id] || []; });
  /* protótipo C8 (T07) · AC-07 — a FAIXA ESPERADA em número e o RÓTULO CURTO.
     ADITIVO: o `esperado` (o texto do cadastro) fica intacto. O sinal cuja
     faixa é intervalo ("12,0 a 15,0 V") ou piso ("4 ou mais") ganha
     `faixa: { min, max }` com os mesmos números, na unidade do `lido`
     (max null = aberta pra cima). Ficam sem faixa em número: o esperado null
     (presença, C11.6), o texto ("ligada", "fixa", "acende ao engatar") e o
     "acima de 0 …" (dinâmico e estrito — é do ciclo dinâmico, T14). A T07
     desenha daqui a escala e o "1,1 V abaixo do mínimo" (= min − lido)
     (T07·2 a, G8). `rotuloCurto`: o nome do sinal no resumo dos que fecham
     andando (T07 · 'Alternador'); sem ele, vale o `rotulo`. O gate confere
     no bloco P·C8 · T07. */
  var FAIXA_CAN = {
    "ma-01": { bateria: [12, 15], alternador: [13.5, 14.8], satelites: [4, null], rotacao: [600, 2500], temperatura: [-40, 120] },
    "ma-02": { bateria: [24, 29], rotacao: [600, 2200], temperatura: [-40, 120], oleo: [-40, 150] },
    "ma-03": { bateria: [12, 15], satelites: [4, null], rotacao: [800, 2200], temperatura: [-40, 120] }
  };
  var ROTULO_CURTO_CAN = { "ma-01": { alternador: "Alternador" } };
  MODELOS_ATIVO.forEach(function (m) {
    var f = FAIXA_CAN[m.id] || {}, c = ROTULO_CURTO_CAN[m.id] || {};
    m.sinaisCan.forEach(function (s) {
      if (f[s.id]) s.faixa = { min: f[s.id][0], max: f[s.id][1] };
      if (c[s.id]) s.rotuloCurto = c[s.id];
    });
  });
  /* Casos ADITIVOS da fase ESTÁTICA — sobrescrevem o `lido` por ativo. A
     causa provável segue a NATUREZA da falha (C11.8):
     isolado   · a-02 · bateria 10,9 V, leitura PRESENTE → VEÍCULO ou CADASTRO
     ausente   · a-03 · satélites sem leitura, 1 no domínio → LIGAÇÃO
     dominio   · a-16 · Motor inteiro sem leitura → BARRAMENTO ou MODELO
   ⚠ C17.3 · o domínio SAIU DE a-09: era o mesmo ativo que fecha a instalação
     em T13, e a demo mostrava o checklist aprovando com um buraco na CAN — o
     incidente que originou o produto dentro da tela que existe para impedi-lo.
     O destino NÃO É a-08: a-08 é ma-01, e o Motor de ma-01 tem UM estático
     (Temperatura; Rotação é dinâmica e não conta) → semLeit === 1 → "ligação",
     que é o can-estatico-ausente de novo. O caso só existe porque o Motor de
     ma-02 tem DOIS estáticos (Temperatura + óleo) → "barramento ou modelo".
     a-16 é ma-02, tem M2C-0438, e nenhum caso que trave T06/T07 — os dois que
     ele carrega (diff-divergente, indice-nao-classificado) são de T11, e
     nenhum declara lidos ou semLeituraDominio. Custo declarado: a-16 é Ibura,
     então o domínio pede troca de UO em T02 — Várzea tem exatamente UM ma-02,
     que é a-09, e era por isso que os dois casos moravam juntos. É a troca
     mais barata que existe: mesma UC (RMR – Recife), pacote no prazo.
     ⚠ Descartados: a-08 (ma-01, vira "ligação" — ver acima); a-19, a-22 e
     a-24 são todos de CARUARU, cujo pacote tem 8 dias e está BLOQUEADO — a UO
     nem abre em T02 sem passar por T03; e a-24 é ainda o ativo-fora-pacote e
     a-22 carrega mock de calibração, a mesma armadilha do a-09. */
  CASOS["can-estatico-isolado"] = { ativoId: "a-01", sinal: "temperatura", lido: "215 °C", esperado: "−40 a 120" }; /* T07/09 */
  CASOS["can-estatico-ausente"] = { ativoId: "a-01", sinal: "rotacao", lido: null, motivo: "ligação" }; /* T07/08 */
  /* PM · rodadas 1 e 2 — os casos novos */
  CASOS["modem-sem-sinal"] = { moduloSerial: "M2C-0417", modem: "sem sinal" }; /* T07/07 · só informa: o checklist registra */
  CASOS["firmware-sem-rede-no-modulo"] = { base: "firmware-fora-matriz", modemSemRede: true }; /* T07/05 · trava, e não dá pra atualizar */
  CASOS["modulo-em-outro-ativo"] = { moduloSerial: "M2C-0417", vinculadoAoAtivoId: "a-18", registraDesvinculo: true }; /* T06/10 */
  CASOS["modulo-ja-deste-ativo"] = { moduloSerial: "M2C-0417", ativoId: "a-01", modo: "manutencao" }; /* T06/11 · T09/08-09 · o vínculo decide o modo */
  CASOS["sem-conexao-no-menu"] = { tela: "T04", rede: false };
  /* PM · rodada 3 — os casos novos */
  CASOS["cercas-reenviadas"] = { ativoId: "a-01", moduloSerial: "M2C-0417", modo: "manutencao", reenviado: "cercas" }; /* T11/05 · os dependentes vêm do arraste: o leitor e os eventos */
  CASOS["can-estatico-bateria"] = { ativoId: "a-02", moduloSerial: "M2C-0301", alimentacao: "10,9 V", lidos: { hodometro: "201.115 km" } }; /* T13/09 · o item da bateria reprovado — o nome é do executor (gate da errata) */
  CASOS["motor-desligado-no-ciclo"] = { ativoId: "a-02", passo: "rotacao", lido: "0 rpm" }; /* T14/03 · o motor tem que estar ligado */ /* T04/15 · só o Últimas instalações depende da rede */
  /* ⚠ NÃO é falha — é COERÊNCIA, e por isso ficou em a-09 quando o domínio
     saiu: o hodômetro que T07 lê é o mesmo que T10 calibra (bruto 87.604.000 m
     contra 87.712 no painel). Sem ele, T07 cairia no nominal de ma-02 (96.410)
     e contradiria a calibração no ativo do herói. */
  CASOS["can-estatico-hodometro"] = { ativoId: "a-09", lidos: { hodometro: "87.604 km" } };

  /* C14 · T09 — a CADEIA, tudo ADITIVO (ordem e arraste intactos, gate confere).
     escopos · o bloco 1 declara o que apaga e o que preserva (HU-T09-3); o
       escopo é DERIVADO na tela: módulo cadastrado neste mesmo ativo →
       configuracao, senão → total. Contagens vêm de CERCAS/IDENTIFICADORES.
     conteudo · o módulo NÃO guarda versão (decisão 49): a cadeia declara o conteúdo de cada bloco,
     o mesmo que a conferência mostra, e o read-back confere esse conteúdo.
     leituraFinal · os dois parâmetros críticos que não derivam de outra
       coleção (os outros três: traducaoCan do modelo, preset de eventos,
       pontos de cerca do ativo). Vocabulário de campo: rede do módulo,
       e a APN — a APN aparece porque o PM pediu pra conferir (decisão 51); o endereço do servidor
       e o IP/DNS, nunca.
     Casos: bloco-recusado reusa o par de conexao-falha + can-estatico-isolado
       (a-02/M2C-0301: bateria em 10,9 V, módulo que já falhou em responder —
       recusa Cercas UMA vez; pool-esgotado/a-05 não serve: trava em T05 e
       nunca abre sessão); queda-na-cadeia reusa o par de link-perdido (link
       ruim é história desse módulo).
     protótipo C9 (T09) · o `motivo` de bloco-recusado fica sem leitor: a
       causa na tela é o texto aprovado da T09/01, "os pontos das áreas não
       voltaram" (G9, T09-A5). E o a-02 não tem região de cerca em
       CERCAS.regioes (T09-A15): a recusa de Cercas cai num ônibus sem cercas
       — pendência do PM, sem mudar o dado. */
  CADEIA.escopos = {
    total:        { apaga: ["cercas", "configuracao-anterior"], mantem: ["identificadores", "leituras", "firmware"] }, /* a v1 não grava cartões: a limpeza nunca apaga os identificadores (errata do pacote 1) */
    configuracao: { apaga: ["configuracao-anterior"], mantem: ["cercas", "identificadores", "leituras", "firmware"] }
  };
  /* O módulo NÃO guarda versão (o PM, decisão 49): a cadeia declara o CONTEÚDO de cada bloco,
     com as mesmas palavras da conferência (T11) — é o que a T09 mostra em cada elo. */
  CADEIA.conteudo = { ativo: "OF-1621", cercas: "4 regiões", leitor: "sem fio", eventos: "intervalo 30 s", conexao: "m2m.mobs2.br" };
  CADEIA.leituraFinal = { redeDoModulo: "Mobs2 dados", servidor: "principal" };
  CASOS["bloco-recusado"] = { ativoId: "a-02", moduloSerial: "M2C-0301", bloco: "cercas",
    motivo: "O módulo não confirmou os pontos das áreas." };
  CASOS["queda-na-cadeia"] = { ativoId: "a-03", moduloSerial: "M2C-0312", noBloco: "leitor" };

  /* C15 · T10 — CALIBRAÇÃO, tudo ADITIVO (âncoras do gate intactas: nada
     acima muda). Quatro grandezas, DUAS NATUREZAS — e é isso que muda a tela.
     `natureza` é chave de CÓDIGO, nunca texto de tela:
       ajuste  · o técnico confirma a condição que lê no painel e o módulo
                 calcula sozinho (rotação, velocidade). O número calculado
                 nunca aparece (princípio 1).
       partida · o módulo recebe o valor INICIAL lido no painel (hodômetro,
                 horímetro). Ele digita km e horas; `fatorEnvio` converte para
                 a unidade do módulo e a conversão não aparece em lugar nenhum.
     ROTAÇÃO é a grandeza; rpm é a unidade — só aparece junto de número.

     porModelo é CADASTRO (princípio 2), não derivação de sinaisCan: o sinal
     existir na tradução não quer dizer que o veículo o entrega confiável. A
     tradução urbano v3 (ma-01) entrega rotação boa — por isso lá ela "já vem
     da CAN"; a frota v2 (ma-02) não, e lá a rotação se calibra. Grandeza que o
     modelo NÃO TEM não entra em lista nenhuma (ma-03 não tem hodômetro):
     indisponível é o que existe e não se calibra.
     Motivos CURTOS de propósito — moram na coluna de 124 do Checagem.
     ⚠ C23 (sweep) · ESTA É A FONTE ÚNICA, e agora a ÚNICA. Os campos
     `grandezasCalibraveis` e `grandezasIndisponiveis` do C2 SAÍRAM dos três
     modelos: contradiziam esta declaração (ma-01 listava velocidade como
     calibrável com método "gps", e aqui ela é "não precisa") e nenhuma tela
     os lia — grep confirmado no app, nas 21 cascas e no gate. A forma longa
     do motivo de ma-02/horímetro morava lá "intacta para T08", e T08 nunca
     chegou a lê-la: a forma curta daqui é a que existe. */
  var CALIBRACAO = {
    grandezas: [
      { id: "rotacao",    rotulo: "Rotação",    natureza: "ajuste",  unidade: "rpm",  icone: "activity" },
      { id: "velocidade", rotulo: "Velocidade", natureza: "ajuste",  unidade: "km/h", icone: "gauge" },
      { id: "hodometro",  rotulo: "Hodômetro",  natureza: "partida", unidade: "km",   icone: "map",
        rotuloCampo: "Quilômetros no painel", fatorEnvio: 1000 },
      { id: "horimetro",  rotulo: "Horímetro",  natureza: "partida", unidade: "h",    icone: "clock",
        rotuloCampo: "Horas no painel",       fatorEnvio: 3600 }
    ],
    porModelo: {
      "ma-01": { calibraveis: ["hodometro", "horimetro"], opcionais: ["horimetro"],
        indisponiveis: [{ grandeza: "rotacao", motivo: "já vem da CAN" },
                        { grandeza: "velocidade", motivo: "não precisa" }] },
      "ma-02": { calibraveis: ["rotacao", "velocidade", "hodometro"],
        indisponiveis: [{ grandeza: "horimetro", motivo: "sem horímetro" }] },
      "ma-03": { calibraveis: ["horimetro"], opcionais: ["horimetro"],
        indisponiveis: [{ grandeza: "rotacao", motivo: "já vem da CAN" }] }
    },
    /* o MÓDULO derruba o que o cadastro dá: variante sem leitura de pulsos não
       mede rotação nem velocidade. Deriva de matrizCapacidades.pulsos — não é
       lista nova. Alcançável em a-22 (M2C-0480, VL06 CAN). */
    motivoSemPulsos: "não lê pulsos",
    /* a condição que o cadastro manda o técnico reproduzir no painel */
    alvos: { rotacao: { valor: 1200 }, velocidade: { valor: 60 } },
    /* HU-T10-5 · a tolerância do read-back, SEMPRE na unidade do REPORTE
       (minutos para horímetro, metros para hodômetro): granularidade do módulo
       + o que o veículo andou entre semear e reler. `porUnidade` converte a
       unidade de tela na de reporte; `desvio` é o que o módulo devolve acima do
       semeado — a ficção que torna a tolerância visível em vez de decorativa.
       Horímetro fecha NO LIMITE (3 = 1 + 2): é o caso que prova que comparação
       estrita reprovaria toda calibração.
       ⚠ C23 (sweep) · `reporte` FICA DECLARADO, sem leitor de tela: é a
       unidade em que `granularidade`, `decorrido` e `desvio` estão escritos,
       e esses três têm leitor. Sem ele os números ficam mudos — `1 · 2 · 3`
       do horímetro são minutos, não horas. Consumidor: o módulo, que reporta
       nessa unidade; a tela converte por `porUnidade` e mostra em
       `grandeza.unidade`. */
    tolerancia: {
      rotacao:    { granularidade: 10,  decorrido: 0,  reporte: "rpm",     porUnidade: 1,    desvio: 4 },
      velocidade: { granularidade: 1,   decorrido: 0,  reporte: "km/h",    porUnidade: 1,    desvio: 1 },
      hodometro:  { granularidade: 100, decorrido: 40, reporte: "metros",  porUnidade: 1000, desvio: 120 },
      horimetro:  { granularidade: 1,   decorrido: 2,  reporte: "minutos", porUnidade: 60,   desvio: 3 }
    },
    /* o que está escrito no painel do veículo hoje (D-21: campo nasce
       preenchido com dado do mock). a-01 bate com a calibração de i-01
       (482.317 km); a-09 vai à frente do que a CAN reporta (87.604) — é
       exatamente a diferença que a calibração corrige. */
    painel: {
      "a-01": { hodometro: 482317, horimetro: 9640 },
      "a-09": { hodometro: 87712 },
      "a-22": { hodometro: 121480 }
    },
    /* leitura BRUTA do contador do módulo, na unidade de ENVIO (metros,
       segundos). HU-T10-7: recalibrar recomputa valorPainel×fator − bruto,
       nunca ajuste anterior + delta. NUNCA renderizado. */
    bruto: {
      "a-01": { hodometro: 184320000, horimetro: 30744000 },
      "a-09": { hodometro: 87604000 },
      "a-22": { hodometro: 121003000 }
    },
    /* última calibração conhecida, em dias atrás (0 = hoje; ausente = nunca) */
    ultimas: {
      "a-01": { hodometro: 0 },
      "a-09": { velocidade: 12, hodometro: 27 },
      "a-22": { hodometro: 39 }
    }
  };

  /* C17 · T13 — O CHECKLIST DE HOMOLOGAÇÃO, tudo ADITIVO (âncoras do gate
     intactas). O que entra aqui é a LISTA e a NATUREZA dos 31 itens — e nada
     além: nenhum valor lido é declarado, porque todos já existem na obra
     (cadeia, cercas, identificadores, presets, calibração, fila). Item que
     precisasse de número novo seria item inventado.

     `natureza` é chave de CÓDIGO: automatico | manual | dinamico | servidor.
     `fonte` é o que a tela deriva; `origem` é A TELA QUE LÊ O FATO — não a
     que fala dele (é o que transforma o checklist de relatório em ferramenta,
     HU-T13-2). Por isso a tensão de bateria devolve a T07, que é quem a lê na
     CAN, e as entradas digitais devolvem a T06, que é onde a matriz do arnês
     se resolve.
     protótipo C10 (T13·2 a): na tela, a bateria reprovada leva à T08, pelo
     texto aprovado 'Refazer a leitura da CAN' (T13/09); a T08 relê e devolve
     à T07 (HU-T08-3). `origem: "can"` continua dizendo quem lê o fato.

     ⚠ `foto` é do ITEM, não da seção: os cinco de B pedem foto, dois por
     CONDIÇÃO (`condicao`). Condição ausente = NÃO SE APLICA, fato declarado,
     nunca pendência. E `natureza: "manual"` com `foto: false` é a regra do
     `marcar todos` — hoje SEM NENHUM DONO, e por isso o controle não existe
     em tela (um controle para zero itens é a armadilha do Campo.aviso).

     ⚠ RÓTULOS MEDIDOS dentro da linha (craft §1), nunca por multiplicação:
     o item manual tem 152 de faixa (maior: `Leitor posicionado`, 139,4) e o
     automático tem 176 (maior: `Movimento detectado`, 164,7). Os nomes das
     seções pagam a conta do fato à direita — ver o comentário da cabeça em
     chrome.css. */
  var PASSOS_CICLO = INSTALACOES.filter(function (i) { return i.id === "i-01"; })[0]
    .etapas.cicloDinamico.passos;
  var CHECKLIST = {
    secoes: [
      { id: "A", rotulo: "Identificação",  natureza: "automatico", bloqueia: true },
      { id: "B", rotulo: "Montagem",       natureza: "manual",     bloqueia: true },
      { id: "C", rotulo: "Hardware",       natureza: "automatico", bloqueia: true },
      { id: "D", rotulo: "Configuração",   natureza: "automatico", bloqueia: true },
      { id: "E", rotulo: "Ciclo de testes", natureza: "dinamico",   bloqueia: true },
      /* ⚠ A ÚNICA que não bloqueia (HU-T13-6): depende do servidor, não do
         módulo na frente do técnico. Segurá-lo no pátio por isso seria
         prendê-lo por algo que ele não resolve — e é por isso que finalizar
         com ela falhando exige CIÊNCIA, com nome e hora. */
      { id: "F", rotulo: "Servidor",       natureza: "servidor",   bloqueia: false }
    ],
    itens: [
      { id: "a-serial",    secao: "A", rotulo: "Serial do módulo",  fonte: "serial",   origem: "conectar" },
      { id: "a-firmware",  secao: "A", rotulo: "Firmware",          fonte: "firmware", origem: "conectar" },
      { id: "a-ativo",     secao: "A", rotulo: "Ativo vinculado",   fonte: "ativo",    origem: "ativo" },

      /* ⚠ O RÓTULO É O OBJETO; O VERBO É A RESPOSTA. `fixado`, `posicionado`,
         `protegido` e `livre` diziam a MESMA asserção cinco vezes — "está
         montado certo" —, que é exatamente o que o valor à direita responde
         (conforme · ressalvado · pendente). Informação que se repete em cinco
         de cinco linhas não é dado, é ruído (craft §2), e era ela que fazia
         três dos cinco quebrarem em duas linhas dentro do contêiner.
         `pergunta` guarda a frase inteira e é o TÍTULO DO NÍVEL 2: a lista
         varre em substantivos, e quem abre o item lê o que exatamente tem de
         conferir. Nada se perde. */
      { id: "b-modulo",         secao: "B", rotulo: "Módulo",     pergunta: "Módulo fixado e posicionado", enquadre: "Enquadre o módulo e o ponto de fixação",    foto: true },
      { id: "b-antena",         secao: "B", rotulo: "Antena GPS", pergunta: "Antena GPS posicionada e livre", enquadre: "Enquadre a antena e o espaço livre acima dela", foto: true },
      { id: "b-chicote",        secao: "B", rotulo: "Chicote",    pergunta: "Chicote e emendas protegidos", enquadre: "Enquadre o chicote e as emendas",   foto: true },
      { id: "b-leitor",         secao: "B", rotulo: "Leitor",     pergunta: "Leitor posicionado", enquadre: "Enquadre o leitor e onde ele está preso", foto: true, condicao: "leitor" },
      /* A foto do painel é tirada AQUI (decisão 52): a calibração não fotografa mais. O item só existe
         quando houve calibração na sessão — e aí é obrigatório, como as outras fotos da B. */
      { id: "b-painel-legivel", secao: "B", rotulo: "Painel",
        pergunta: "Painel com hodômetro e horímetro legíveis", enquadre: "Enquadre o painel, com os números legíveis",
        foto: true, condicao: "calibracao" },

      { id: "c-alimentacao", secao: "C", rotulo: "Alimentação",       fonte: "alimentacao", origem: "can" },
      { id: "c-gps",         secao: "C", rotulo: "GPS e antena",      fonte: "gps",         origem: "conectar" },
      { id: "c-entradas",    secao: "C", rotulo: "Entradas digitais", fonte: "entradas",    origem: "ativo" },
      { id: "c-modem",       secao: "C", rotulo: "Modem e sinal",     fonte: "modem",       origem: "conectar" },

      { id: "d-limpeza",   secao: "D", rotulo: "Limpeza",              fonte: "bloco:limpeza", origem: "configurar" },
      { id: "d-ativo",     secao: "D", rotulo: "Tradução da CAN",      fonte: "bloco:ativo",   origem: "configurar" },
      { id: "d-cercas",    secao: "D", rotulo: "Cercas",               fonte: "bloco:cercas",  origem: "configurar" },
      { id: "d-extended",  secao: "D", rotulo: "Extended ID",          fonte: "identificadores", origem: "conectar" }, /* só leitura: a v1 não grava cartões */
      { id: "d-eventos",   secao: "D", rotulo: "Eventos",              fonte: "bloco:eventos", origem: "configurar" },
      { id: "d-conexao",   secao: "D", rotulo: "APN",                  fonte: "bloco:conexao", origem: "configurar" },
      { id: "d-servidor",  secao: "D", rotulo: "Endereço",             fonte: "servidor",      origem: "configurar" },
      { id: "d-leitor",    secao: "D", rotulo: "Leitor",               fonte: "bloco:leitor",  origem: "configurar" }, /* o módulo não guarda versão (decisão 49) */
      { id: "d-hodometro", secao: "D", rotulo: "Hodômetro",            fonte: "cal:hodometro", origem: "calibracao" },
      { id: "d-horimetro", secao: "D", rotulo: "Horímetro",            fonte: "cal:horimetro", origem: "calibracao" },

      { id: "f-evidencias", secao: "F", rotulo: "Evidências",      fonte: "fila:Evidências da instalação", origem: "fila" },
      { id: "f-checklist",  secao: "F", rotulo: "Checklist",       fonte: "fila:Checklist de homologação", origem: "fila" },
      { id: "f-plataforma", secao: "F", rotulo: "ID na plataforma", fonte: "plataforma",                   origem: "fila" }
    ]
  };
  /* Os cinco de E são os passos CANÔNICOS do ciclo dinâmico — referência ao
     que i-01 já declara, nunca cópia (duas listas divergem no primeiro
     ajuste). Eles não se respondem aqui: T13 exibe e devolve a T14.
     ⚠ UM ÚNICO ENCURTAMENTO, medido: `Movimento detectado` pede 164,7 e a
     faixa do rótulo dentro do contêiner é 144. O passo canônico segue
     inteiro em `pergunta`; só a coluna encurta. */
  var E_ENCURTA = {}; /* o "Movimento detectado" saiu (ciclo parado); "Cartão do motorista" cabe inteiro na coluna */
  PASSOS_CICLO.forEach(function (p, i) {
    CHECKLIST.itens.splice(CHECKLIST.itens.filter(function (x) { return x.secao < "E"; }).length + i, 0,
      { id: "e-" + (i + 1), secao: "E", rotulo: E_ENCURTA[p] || p, pergunta: p, fonte: "ciclo", origem: "ciclo" });
  });
  /* C17 · caso ADITIVO — O ATIVO QUE CHEGA PRONTO PARA FECHAR. Sem ele, com
     T14 em placeholder, `Finalizar`, a ciência da Seção F e o estado
     finalizado seriam INALCANÇÁVEIS: a tela onde a instalação fecha
     entregaria sem ninguém poder ver ela fechar. Mesma regra do teto de
     reenvios do C4 (nasce em 2) — estado que só se alcança esperando não é
     revisável.
     DOIS FATOS NO MESMO ATIVO, e têm de ser o mesmo: E completa para o botão
     acender, e o servidor sem responder para o diálogo existir.
     ⚠ É a-09, e a escolha foi MEDIDA na navegação, não no papel: a-06 (o ativo
     da secaoF) NÃO É SELECIONÁVEL — M2C-0362 só aparece por CABO e o arnês
     dele dá conflito sem saída em T06, que é onde o fluxo morre. a-09 tem
     M2C-0371 sem fio na lista de T05 em Várzea, arnês livre, e de quebra é
     ma-02: o horímetro dele NÃO SE APLICA, e a Seção D fecha com 9 aprovados
     e 1 declarado — o estado que prova que `não se aplica` não bloqueia.
     protótipo C8 (T06·2 a): no protótipo o a-06 é escolhível na T06 — nenhum
     caso trava ele lá, e o M2C-0362 não dá conflito com ele. A escolha do a-09
     continua valendo pelos outros motivos acima (sem fio na lista, ma-02).
     A secaoF e a i-06 ficam INTACTAS: elas contam a história do a-06 para
     T12 e T15, e nada aqui as move. O herói fica com o outro caminho: Seção E
     aguardando e `Finalizar` bloqueado com motivo.
     ⚠ C17.3 · SAÍRAM `cicloConcluidoAs` e `motivo` — dado sem leitor é
     armadilha (lição do C16.12 com pais/codigo/total). O `motivo` era pior
     que órfão: guardava `o recebimento não foi confirmado`, a frase que o
     C17.2 aposentou em favor de `o servidor não confirmou` — o mock
     contradizia a tela. A causa vive em ChecklistScreen:249, e a hora do
     fechamento não tem onde ser dita sem abrir 2ª linha na Seção E (craft).
     ⚠ `moduloSerial` TAMBÉM não tem leitor — sinalizado, não removido: é a
     convenção dos outros CASOS (sessao-interrompida, canal-aberto,
     diff-divergente) e o par ativo↔módulo é o que o caso documenta. */
  CASOS["pronto-para-fechar"] = { ativoId: "a-09", moduloSerial: "M2C-0371",
    recebimento: "sem resposta" };

  /* ═══ C20 · T14 — O CICLO DINÂMICO. Tudo ADITIVO (âncoras do gate
     intactas: nada acima muda).
     `prazoEventoSeg` e os dois degraus do evento são fato de NEGÓCIO e
     moram aqui; a CADÊNCIA de simulação (quantos ms vale um segundo de
     prazo) é constante declarada na tela, como TICK_MS em T03/T05 — nada
     no mock depende de quanto tempo a revisão leva.
     `mensagensGuardadas` é o tráfego que TODO módulo acumulou enquanto o
     canal esteve em programação: a drenagem é universal, não privilégio de
     um caso. `modulo-com-pendencias` (12 + 3) continua intacto e SOBREPÕE
     quando o serial da sessão é o dele — consumir só o caso deixaria a
     drenagem inalcançável, porque a-06 não é selecionável (ver o comentário
     de `pronto-para-fechar`). */
  var CICLO = {
    prazoEventoSeg: 120,
    evento: { recebidoAosSeg: 24, conferidoAosSeg: 33 },
    mensagensGuardadas: { mensagens: 6, diagnostico: 2 }
    /* sem viagem: o ciclo de testes é feito com o ônibus parado (decisão 54) — o hodômetro final é o inicial */
  };

  /* A leitura dos sinais de fase DINÂMICA — os que só existem com o veículo
     andando, e que por isso nasceram sem `lido` no C11.
     ⚠ Campo NOVO em vez de preencher `lido`: `lido` está documentado como a
     leitura do sinal ESTÁTICO, e T07 deriva a fase estática dele — preencher
     `lido` no dinâmico mudaria T07, que está fora deste cycle. Um campo, um
     consumidor (T14). O caso `can-fora-esperado` (a-02, velocidade 0 km/h)
     sobrepõe estes valores: é ele que finalmente ganha consumidor, reservado
     ao ciclo dinâmico desde o C11. */
  var LIDO_DINAMICO = {
    "ma-01": { alternador: "14,1 V", re: "acendeu", rotacao: "980 rpm", consumo: "1,8 L/h" }, /* parado, em marcha lenta (decisão 54) */
    "ma-02": { velocidade: "0 km/h", rotacao: "780 rpm" }, /* a velocidade só com tacógrafo digital — o ma-02 tem */
    "ma-03": { rotacao: "1.050 rpm" }
  };
  MODELOS_ATIVO.forEach(function (m) {
    var mapa = LIDO_DINAMICO[m.id] || {};
    (m.sinaisCan || []).forEach(function (s) {
      if (s.fase === "dinamico" && mapa[s.id]) s.lidoDinamico = mapa[s.id];
    });
  });

  /* O MODO DE EXTRAÇÃO do identificador — como o leitor daquele ativo extrai
     o código do cartão. É característica de CADASTRO (princípio 2) e NASCE
     CONFORME nos três modelos: `numero-impresso` = o número impresso no
     cartão, inteiro, com zeros e prefixo. Governa a comparação de T14 e
     ⚠ NUNCA APARECE EM TELA — nomeá-lo seria protocolo (princípio 1).
     ⚠ A divergência NÃO mora aqui: pendurada no modelo, ela cairia nos
     dezessete ma-01, o herói entre eles, e o fluxo feliz nunca fecharia. É
     exceção, e exceção neste projeto mora em CASO. */
  MODELOS_ATIVO.forEach(function (m) { if (m.leitor) m.leitor.modoExtracao = "numero-impresso"; });

  /* O caso mais representativo do produto ganha ATIVO e CARTÃO (aditivo: os
     `exemplos` do C2 ficam intactos e é deles que sai o `lido`).
     ⚠ a-03 foi escolhido na NAVEGAÇÃO, não no papel: é ma-01 (o único com
     cartão), NÃO é o herói, e é Várzea — sem troca de UO. Custo declarado:
     M2C-0312 perde o link na checagem 6 de T05 (reconecta com um toque) e
     cai uma vez no bloco Leitor de T09 (retoma com um toque); nenhum dos
     dois trava o ciclo. Descartados: a-01 (herói), a-02 (já carrega a
     velocidade fora do esperado), a-04 (fica com o evento sem resposta —
     duas falhas na mesma tela não se leem), a-05/a-10 (travam em T05),
     a-06 (não selecionável), a-07/a-08 (sem módulo), a-09 (ma-02, e é o
     ativo que fecha a instalação). */
  CASOS["identificador-divergente"].ativoId = "a-03";
  CASOS["identificador-divergente"].cartaoId = "id-01"; CASOS["identificador-divergente"].correcaoSolicitada = "14:30"; /* T13/27, T13/28 e T15/05 · o pedido feito na T14/06 */

  /* O evento de teste que não volta no prazo. Mesma forma do `conexao-falha`
     (constante DECLARADA, não moeda): a 1ª tentativa estoura, a 2ª confirma
     — e é essa a razão de campo do `Disparar novamente`, o técnico ainda no
     veículo resolvendo na hora em vez de descobrir no relatório dias depois.
     ⚠ a-04 e não a-02: a velocidade fora do esperado já é de a-02, e prazo
     estourado + sinal reprovado na mesma tela não se leem limpos. a-04 é
     ma-01, Várzea, e o conflito de pinos dele é o RESOLVÍVEL — T06 oferece o
     leitor sem fio e o fluxo segue. */
  CASOS["evento-sem-resposta"] = { ativoId: "a-04", moduloSerial: "M2C-0335", tentativa: 1 };
  /* pacote 12 · os casos das telas que eram pendência · padrão até o PM decidir */
  CASOS["gps-fraco"] = { moduloSerial: "M2C-0417", gps: "4 satélites", gpsMinimo: 6 }; /* T13/21 e 22 · o mínimo de satélites é padrão até o PM decidir */
  CASOS["entrada-ignicao"] = { moduloSerial: "M2C-0417", entradas: { ignicao: "desligada", esperado: "ligada" } }; /* T13/23 e 24 */
  CASOS["evento-nao-chega-de-novo"] = Object.assign({}, CASOS["evento-sem-resposta"], { tentativasQueEstouram: 2 }); /* T14/09 · ao contrário do "evento-sem-resposta", aqui a 2ª tentativa TAMBÉM estoura, e aparece o confira a conexão do módulo */
  CASOS["fila-parada"] = { fila: { paradaHa: "32 min", esperando: 2 } }; /* T04/16 · o aviso depois de 30 min parada */

  /* protótipo C9 (T10) · AC-08 — o hodômetro estático do a-22, o mesmo que a
     T10 calibra no módulo sem pulsos (T10/04): bruto 121.003.000 m ÷ fatorEnvio
     1000 = 121.003 km, contra 121.480 no painel. Sem ele, a T07 e a T08 leriam
     o nominal do ma-02 (96.410) e contradiriam a calibração do mesmo módulo.
     NÃO é falha — é coerência, como o can-estatico-hodometro do a-09. Entra no
     fim, pra não mudar a ordem de nenhuma chave de antes. */
  CASOS["can-estatico-hodometro-a22"] = { ativoId: "a-22", lidos: { hodometro: "121.003 km" } };

  /* protótipo C10 (T14) · AC-09 — quantos campos o servidor confere no evento
     de teste: o "6 de 6" da T14/05 (T14-A2) sai daqui. É fato do evento, como
     os dois degraus (recebido e conferido). Campo ADITIVO: nada de antes muda. */
  CICLO.evento.campos = 6;
  /* protótipo C10 (T14) · AC-10 — o passo do ciclo que cada sinal DINÂMICO
     prova. É por ele que o caso can-fora-esperado (velocidade 0 km/h) reprova
     o passo "Movimento detectado" (T14/03, T14-A8). As chaves são ids de sinal
     dinâmico do ma-01; os valores, passos canônicos da i-01 (PASSOS_CICLO).
     A frase da causa ("devia passar de zero") é texto, do textos.md (G9). */
  /* pacote 2 (decisão 54): o ciclo é parado — a rotação pede o motor ligado (T14/03), e a velocidade só entra com
     tacógrafo digital (o passo dela não vem daqui). Era { velocidade: "Movimento detectado", re: … }, que o merge deixou. */
  CICLO.passoDoSinal = { rotacao: "Rotação", re: "Ré acionada" };

  /* protótipo C11 (T12) · AC-16 — os grupos por idade da lista das últimas
     instalações (T12·1 a, T12-A4): HOJE, ONTEM, ESTE MÊS e MAIS DE UM MÊS saem
     de diasAtras por um corte NOMEADO, e não pelo calendário — com o
     calendário, a QJF-2C61 (17 dias, 23/02) cairia em fevereiro e sairia de
     ESTE MÊS, e a referência deixaria de valer. Até `hoje` dias é HOJE, até
     `ontem` é ONTEM, até `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS. O
     corte que reproduz a referência fica entre 17 e 26; 17 é o menor, e o
     número é do DIRETOR. É REGRA, como os critérios, e não campo por
     instalação: as 13 instalações ficam intocadas. */
  CRITERIOS_REGRA.gruposIdade = { hoje: 0, ontem: 1, esteMesAte: 17 };
  /* protótipo C11 (T12) · AC-21 — a garagem sem nenhuma instalação (T12/02):
     o único estado da T12 que nada no mock produzia (T12-A3: Várzea tem 5,
     Ibura 5, Caruaru 3). Caso ADITIVO: é a CONSULTA da garagem que volta
     vazia — `instalacaoIds` é o recorte que o servidor devolve, sem nenhum
     id —, e as 13 instalações ficam intocadas. Sem sessão aberta
     (`sessao: null`), como a referência desenha: a garagem vazia é a de quem
     trocou de contexto, e trocar de garagem encerra a sessão (T04/09, T12-N2). */
  CASOS["instalacoes-vazia"] = { instalacaoIds: [], sessao: null };

  /* protótipo C11 (T15) · AC-14 — o rótulo curto de cada tipo da fila de
     saída (T15-V4, T15-D10): a linha da fila e o cartão do topo dizem
     `Evidências`, `Calibração` e `Checklist`. O tipo longo continua sendo o
     do servidor, e é ele que as fontes `fila:<tipo>` da seção F do checklist
     citam. `Registro da sessão` (T16/04) e `Diagnóstico` (T11) entram com o
     rótulo igual ao tipo: nenhuma referência os encurta. Lista FECHADA: todo
     filaSaida.tipo está aqui (o gate confere). Chave de topo nova, no fim
     do objeto, pra não mudar a ordem de nenhuma de antes. */
  var TIPOS_FILA = [
    { tipo: "Evidências da instalação", rotuloCurto: "Evidências" },
    { tipo: "Checklist de homologação", rotuloCurto: "Checklist" },
    { tipo: "Registro da sessão",       rotuloCurto: "Registro da sessão" },
    { tipo: "Diagnóstico",              rotuloCurto: "Diagnóstico" }
  ];
  /* protótipo C11 (T15) · AC-15 — a janela da re-checagem da Seção F, em
     horas (dominio.md:177-180, HU-T12-6): o app confere o recebimento por
     24 h antes de a instalação virar reprovada. É REGRA de estado, como os
     critérios, e não campo da secaoF (G8). ⚠ A secaoF aponta a i-06, há 9
     dias em re-checagem — mais que a janela: a contradição vai ao PM
     (T15-A5), e a T15/04 mostra a janela ('confere em 24 h'), como a
     referência desenha. */
  CRITERIOS_REGRA.recheckHoras = 24;
  /* protótipo C11 (T15) · AC-22 e G21 — os três estados da fila de saída que
     nada no mock produzia (T15-A1, A3, A4, A6). Cada caso é o RECORTE que a
     tela mostra, por id de filaSaida; a fila fica intocada.
       fila-sem-erro (T15/01): a fila inteira da Várzea, a garagem do herói —
         o envio corrente (f-04), um na fila (f-01) e três recebidas, nenhum
         erro. É o recorte que dá o '5 nesta garagem' da referência.
       fila-dois-erros (T15/02): a recusa do servidor (f-10) e o erro de rede
         (f-09), mais o que anda sozinho (f-02, f-08). O '4' é o recorte, e
         ele cruza garagens (T15-A3, com o diretor).
       fila-vazia (T15/03 e 04): nada esperando envio, sem sessão aberta (a
         referência desenha 'Sem sessão de configuração', T15-V1), e o
         horário do último envio, que nenhum item do mock tem: o último
         confirmadoAs é 09:15 (T15-A4). */
  CASOS["fila-sem-erro"] = { itens: ["f-04", "f-01", "f-05", "f-06", "f-07"] };
  CASOS["fila-dois-erros"] = { itens: ["f-10", "f-09", "f-02", "f-08"] };
  /* o caso fila-vazia agora é do design (a entrega de 26/09, ultimoEnvioAs); o protótipo só acrescenta a fila vazia e a sessão */
  Object.assign(CASOS["fila-vazia"], { itens: [], sessao: null });

  /* protótipo C10 (T13) · AC-11 saiu com o pacote 10: o nível do item diz o
     nome curto da seção em toda tela ('B · MONTAGEM', 'C · HARDWARE'; a
     tabela dos nomes curtos com os dos requisitos está na ficha da T13), a
     frase da câmera de cada foto é o `enquadre` do item, e o título do item
     reprovado (T13/09) é o `rotulo` do c-alimentacao, 'Alimentação'. */
  /* protótipo C10 (T13) · AC-12 — a justificativa de exemplo do não conforme
     (T13/08): o campo nasce preenchido com dado do mock (D-21), e o técnico
     escreve por cima. */
  CHECKLIST.exemploJustificativa = "Suporte trincado; fixei com abraçadeira até a troca.";
  /* protótipo C10 (T13) · G8 (T13-A5) — quantas evidências o relatório da
     instalação leva: o '12 subiram' da Seção F (T13/06) e o '12 evidências'
     do homologado (T13/11). É fato do relatório que o Finalizar gera
     (HU-T13-7), e não conta de outra coleção. */
  CHECKLIST.evidencias = 12;
  /* protótipo C10 (T13) · AC-13 — a leitura nominal do módulo que a Seção C
     mostra e que nenhuma coleção tem: as entradas digitais (4 de 4, T13/03) e
     o sinal do modem (−71 dBm), com a faixa esperada do sinal (−100 a −60, a
     que a T13/03 desenha em lima). Vale pra todo módulo que conecta são: é o
     nominal, como o `lido` dos sinais da CAN. Chave de topo nova, no fim do
     objeto, pra não mudar a ordem de nenhuma de antes. ⚠ 'dBm' é unidade de
     rádio na tela de quem lê negócio (T13-N5): o texto aprovado fica, e a
     palavra vai ao diretor junto da lacuna R3. */
  var LEITURA_NOMINAL_MODULO = { entradasUsadas: 4, entradasTotal: 4, modemDbm: -71, modemFaixa: { min: -100, max: -60 } };

  window.M2CF_MOCKS = {
    DIA_NOMINAL: "2026-03-12",
    HORA_NOMINAL: "14:30",
    diasAntes: diasAntes,

    empresa: { id: "emp-01", nome: "Viação Atlântico Sul" },
    /* as empresas que o técnico atende — a empresa vem sempre antes da
       unidade (decisão 37). O herói é terceirizado: três empresas, e só
       a dele tem o mundo do protótipo. */
    empresas: [
      { id: "emp-01", nome: "Viação Atlântico Sul", unidades: 3 },
      { id: "emp-02", nome: "Transportes Capibaribe", unidades: 4 },
      { id: "emp-03", nome: "Expresso Caruaruense", unidades: 2 }
    ],
    ucs: [
      { id: "uc-01", nome: "RMR – Recife" },
      { id: "uc-02", nome: "Agreste – Caruaru" }
    ],
    uos: [
      { id: "uo-01", ucId: "uc-01", nome: "Garagem Várzea" },
      { id: "uo-02", ucId: "uc-01", nome: "Garagem Ibura" },
      { id: "uo-03", ucId: "uc-02", nome: "Pátio Caruaru" }
    ],
    contextoAtivo: { empresaId: "emp-01", ucId: "uc-01", uoId: "uo-01" },

    /* ── C3 · situacao — o AGORA do aparelho. UM campo raiz (gate C3), dois
       fatos que nenhum cadastro carrega:
         rede: "conectada" | "sem-conexao" — estado do APARELHO (nunca a
           "rede do módulo"/APN). Gating de "Últimas instalações"; vive no
           mock porque navigator.onLine quebraria o determinismo (Lei 17).
           Começa CONECTADA (correção 1 do gate): T03 acabou de sincronizar
           (pacote de 1 dia) — offline é condição de TRABALHO, não estado
           de abertura. O caso offline vive em estados/offline e nos casos.
         sessaoConfiguracao: null | { moduloSerial, ativoId: null|id,
           saude: "ok"|"falha", abertaAs: "HH:MM" } — a sessão de
           configuração corrente. Derivam daqui: semáforo do módulo (T04),
           faixa de sessão (chrome), gating módulo/ativo. Conexão é fato da
           SESSÃO, não do cadastro — por isso NÃO existe estadoConexao nos
           20 módulos. C8 (D4): null NO BOOT — é o AGORA do mock: às 14:29 a
           evidência de a-09 está subindo (f-04), a sessão acabou de fechar.
           T05 abre a próxima como ESTADO DO APP (Prototype.jsx, padrão do
           contexto no C6), com seed daqui; abertaAs = HORA_NOMINAL. */
    /* C16 (HU-T01-11) · +sessaoAcesso — a sessão de ACESSO, que não é a de
       configuração: 7 dias, não expira por inatividade, só por Sair ou pelo
       prazo, com AVISO no 5º dia. Nasce no 5º: o aviso está ligado hoje e
       imprime sem truque. O aviso é informação, não bloqueio. */
    situacao: { rede: "conectada", sessaoConfiguracao: null,
      sessaoAcesso: { abertaDiasAtras: 5, validadeDias: 7, avisoNoDia: 5 },
      /* protótipo C6 (T05) · AC-06 — os módulos POR PERTO: o que a busca da
         T05 acha, na ordem da referência (T05/00 e 01: "5 encontrados",
         "OUTROS QUATRO POR PERTO"). É o AGORA do aparelho, como a rede: por
         isso mora em situacao, e não no cadastro. `meio` é como o módulo foi
         encontrado — o fato da sessão que a matriz de pinos da T06 lê em
         sessao.meio (D-39): o herói sem fio primeiro; os três seguintes por
         cabo (CAN e ECO não têm sem fio na matriz; o M2C-0335 é o do
         conflito-pinos-resolvivel, meioAtual "cabo"); o M2C-0999, fora do
         cadastro, por cabo — sem sessão possível, o meio dele não tem leitor.
         O "5" e o "QUATRO" saem do tamanho desta lista; nada de contagem
         digitada na tela. */
      porPerto: [
        { serial: "M2C-0417", meio: "sem-fio" },
        { serial: "M2C-0362", meio: "cabo" },
        { serial: "M2C-0394", meio: "cabo" },
        { serial: "M2C-0335", meio: "cabo" },
        { serial: "M2C-0999", meio: "cabo" }
      ] },

    /* C16 · o TÉCNICO (decisão 3 do estudo do C12, aprovada pelo diretor):
       dado de cadastro, coerente com credenciais.usuario "r.vieira". Aparece
       na folha (junto do tema e do Sair) e na tela de saída. */
    tecnico: { nome: "Rafael Vieira" },

    /* ── C4 · credenciais — a PORTA (T01). Escopo fechado no gate: só o
       necessário para exercitar acerto e erro.
         usuario/senha: a ÚNICA combinação válida; qualquer outra cai na
           MESMA mensagem (HU-T01-1: não distingue usuário de senha —
           mensagem distinta revelaria quais usuários existem).
         recuperacao.codigo: o código que o "servidor" envia; o comprimento
           em tela deriva de codigo.length.
         limites: os quatro limites da HU-T01-7 — a tela conta a partir
           daqui com estado de componente (zero Date.now).
         reenviosNaHora: nasce em 2 (correção 3 do gate) — o teto de 3 fica
           alcançável em UM toque na revisão; estado que só se alcança após
           três minutos reais não é revisável.
       Requisito 6 da senha (≠ 3 últimas) NÃO tem dado aqui: não é
       verificável no aparelho — a tela mostra pendente e resolve no envio.
       Sessão de ACESSO (7 dias, aviso no 5º, troca de usuário) não vive
       aqui: HU-T01-2/4/11 movidas para o C16. */
    credenciais: {
      usuario: "r.vieira",
      senha: "Patio#Varzea26",
      /* C4.1 (D-21) · o destino da recuperação e a senha nova nascem
         PREENCHIDOS na tela — dado é dado, vive aqui, não no JSX (Lei 8).
         contato: e-mail e telefone cadastrados do usuário; o DDI aponta
         para a entrada de ddis (mascarados em tela: r•••••@… · •••••-8675).
         novaSenha: atende os 6 requisitos (≥10, caixa mista, número,
         especial, sem sequência nem o usuário) e difere da senha atual. */
      contato: { email: "r.vieira@atlsul.com.br", telefone: { ddi: "+55", numero: "81987158675" } },
      recuperacao: {
        codigo: "482913",
        novaSenha: "Garagem!Ibura27",
        limites: { validadeMin: 10, tentativas: 3, reenvioSeg: 60, tetoPorHora: 3 },
        reenviosNaHora: 2,
        /* protótipo C4 (AC-01) · o código que a T01/05 e a T01/07 mostram
           digitado: seis dígitos, diferente do código. */
        codigoErrado: "482911"
      },
      /* protótipo C4 (DADOS-A11, G1) · o protótipo segue o tela.md da T01:
         qualquer senha com 8 caracteres ou mais entra; com menos, a mesma
         mensagem de usuário ou senha incorretos. O par acima é o que vem
         preenchido. */
      minimoEntrar: 8,
      /* protótipo C4 (AC-03) · os seis requisitos da senha nova, na ordem da
         T01/08. O texto de cada um mora no textos.md; aqui, só a regra. O
         sexto não se verifica no aparelho e confere ao salvar. */
      requisitosSenha: [
        { id: "tamanho", minimo: 10 },
        { id: "caixas" },
        { id: "numero" },
        { id: "simbolo" },
        /* protótipo C4 (T01) · o trecho: três caracteres seguidos contam como
           sequência (abc, 321, aaa) e como pedaço do usuário (vie). */
        { id: "sem-usuario-nem-sequencia", trecho: 3 },
        { id: "diferente-das-ultimas", ultimas: 3, verificavelNoAparelho: false }
      ]
    },

    /* ── C4 · DDIs — a máscara de telefone DERIVA do DDI (HU-T01-6), nunca
       é fixa. Três países com máscaras E comprimentos distintos, para a
       troca de DDI ter efeito visível (reaplica e avisa); a quantidade de
       dígitos deriva da contagem de # na máscara. */
    ddis: [
      { codigo: "+55",  pais: "Brasil",    mascara: "(##) #####-####" },
      { codigo: "+595", pais: "Paraguai",  mascara: "### ### ###" },
      { codigo: "+54",  pais: "Argentina", mascara: "## ####-####" }
    ],

    modelosAtivo: MODELOS_ATIVO,
    presetsEvento: PRESETS_EVENTO,
    modelos: MODELOS_MODULO,
    matrizCapacidades: MATRIZ_CAPACIDADES,
    modulos: MODULOS,
    seriaisForaCadastro: ["M2C-0999", "M2C-1042"],
    /* errata do pacote 1 · o que um módulo fora do cadastro informa na busca: a T05 lista ele como os
       outros, tocável; a trava do serial é no diagnóstico (T07/02), como o PM pediu. */
    naBuscaForaCadastro: { "M2C-0999": { modeloId: "vl06", variante: "CAN-BT", firmware: "2.3.5" } },
    ativos: ATIVOS,
    cadeia: CADEIA,
    calibracao: CALIBRACAO,
    checklist: CHECKLIST,
    cercas: CERCAS,
    identificadores: IDENTIFICADORES,
    autotesteAssertivas: AUTOTESTE_ASSERTIVAS,
    autotesteEncerramento: AUTOTESTE_ENCERRAMENTO,
    instalacoes: INSTALACOES,
    criteriosRegra: CRITERIOS_REGRA,
    pacotes: PACOTES,
    conexoes: CONEXOES,
    eventosEmbarcados: EVENTOS_EMBARCADOS,
    diagnostico: DIAGNOSTICO,
    filaSaida: FILA_SAIDA,
    secaoF: SECAO_F,
    ciclo: CICLO,
    casos: CASOS,
    dominiosCan: DOMINIOS_CAN,
    /* protótipo C11 (T15) · AC-14 */
    tiposFila: TIPOS_FILA,
    /* protótipo C10 (T13) · AC-13 */
    leituraNominalModulo: LEITURA_NOMINAL_MODULO
  };
})();
