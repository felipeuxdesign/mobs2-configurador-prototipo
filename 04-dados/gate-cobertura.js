/* 04-dados/gate-cobertura.js — gate de cobertura da obra canônica.
 * Roda em TODO ciclo que tocar 04-dados/mocks.js.
 * Uso: node 04-dados/gate-cobertura.js  →  exit 0 aprovado / 1 reprovado.
 * Nota de leitura: nos comentários do mock, 'Lei N', 'D-NN' e 'Cn' são da
 * numeração do v1 (_fontes-v1), não de leis.md, 07-decisoes nem ciclos.md.
 * Recomputa TODAS as âncoras a partir do mock — nada conferido no olho. */
"use strict";
if (typeof window === "undefined") {
  global.window = {};
  require(require("path").join(__dirname, "mocks.js"));
}
var M = (typeof window !== "undefined" ? window : global.window).M2CF_MOCKS;
var falhas = 0;
function chk(nome, cond, det) {
  console.log((cond ? "OK     " : "FALHA  ") + nome + (det != null ? " — " + det : ""));
  if (!cond) falhas++;
}

/* ── Âncoras de cadastro ── */
chk("empresa/UC/UO = 1·2·3", !!M.empresa && M.ucs.length === 2 && M.uos.length === 3);
chk("ativos = 24", M.ativos.length === 24, M.ativos.length);
chk("módulos cadastrados = 20", M.modulos.length === 20, M.modulos.length);
var semModulo = M.ativos.filter(function (a) { return !a.moduloSerial; });
chk("ativos sem módulo = 4", semModulo.length === 4, semModulo.map(function (a) { return a.id; }).join(","));
chk("seriais fora do cadastro = 2", M.seriaisForaCadastro.length === 2, M.seriaisForaCadastro.join(","));
var semDriver = M.modelos.filter(function (m) { return m.driverV1 === false; });
chk("modelo sem driver v1 = 1 (VC07)", semDriver.length === 1 && semDriver[0].id === "vc07");
var vl06 = M.modelos.find(function (m) { return m.id === "vl06"; });
chk("VL06 nas 4 variantes + VL08", vl06 && vl06.variantes.length === 4 && !!M.modelos.find(function (m) { return m.id === "vl08"; }));
var vinculados = {};
M.ativos.forEach(function (a) { if (a.moduloSerial) vinculados[a.moduloSerial] = (vinculados[a.moduloSerial] || 0) + 1; });
chk("todo módulo vinculado a exatamente 1 ativo",
  Object.keys(vinculados).length === 20 && Object.keys(vinculados).every(function (s) { return vinculados[s] === 1 && M.modulos.some(function (m) { return m.serial === s; }); }));

/* ── Coleções do domínio (adição do diretor no gate) ── */
chk("modelosAtivo ≥ 3", M.modelosAtivo.length >= 3, M.modelosAtivo.length);
chk("1 modelo de ativo SEM mapa de contadores", M.modelosAtivo.filter(function (m) { return !m.mapaContadores.declarado; }).length === 1);
chk("todo ativo referencia modeloAtivoId válido", M.ativos.every(function (a) { return M.modelosAtivo.some(function (m) { return m.id === a.modeloAtivoId; }); }));
chk("presetsEvento com intervaloRastreamentoSeg", M.presetsEvento.length >= 1 && M.presetsEvento.every(function (p) { return p.intervaloRastreamentoSeg > 0; }),
  M.presetsEvento.map(function (p) { return p.id + "=" + p.intervaloRastreamentoSeg + "s"; }).join(" "));
chk("todo modeloAtivo referencia preset válido", M.modelosAtivo.every(function (m) { return M.presetsEvento.some(function (p) { return p.id === m.presetEventoId; }); }));
chk("identificadores: cartões + índices alocados", M.identificadores.cartoes.length >= 3 && M.identificadores.indicesAlocados.length >= 3);
/* saiu no retorno do PM (06/10): o app não compara o cartão com o cadastro, quem confere é o técnico (T14/08) */

/* ── Matriz de capacidades ── */
var fwForaMatriz = M.modulos.filter(function (mod) {
  var linha = M.matrizCapacidades.find(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; });
  return linha && linha.firmwares.indexOf(mod.firmware) < 0;
});
chk("1 firmware fora da matriz", fwForaMatriz.length === 1, fwForaMatriz.map(function (m) { return m.serial + "@" + m.firmware; }).join(","));

/* ── Instalações: 6 estados, somando 13 ── */
var porEstado = {};
M.instalacoes.forEach(function (i) { porEstado[i.estado] = (porEstado[i.estado] || 0) + 1; });
var ressalvadas = M.instalacoes.filter(function (i) { return i.ressalva; });
var puras = function (e) { return M.instalacoes.filter(function (i) { return i.estado === e && !i.ressalva; }).length; };
chk("instalações = 13", M.instalacoes.length === 13, M.instalacoes.length);
chk("aprovadas puras = 6", puras("aprovada") === 6, puras("aprovada"));
chk("aguardando validação puras = 2", puras("aguardando-validacao") === 2, puras("aguardando-validacao"));
chk("falha de recebimento reconhecida = 1", (porEstado["falha-recebimento-reconhecida"] || 0) === 1);
chk("aprovada após reprocessamento = 1", (porEstado["aprovada-reprocessamento"] || 0) === 1);
chk("reprovada = 1", (porEstado["reprovada"] || 0) === 1);
chk("ressalvadas = 2 (1 aprovada + 1 aguardando)", ressalvadas.length === 2 &&
  ressalvadas.some(function (i) { return i.estado === "aprovada"; }) &&
  ressalvadas.some(function (i) { return i.estado === "aguardando-validacao"; }),
  ressalvadas.map(function (i) { return i.id + ":" + i.estado; }).join(" · "));
var heroi = M.instalacoes.find(function (i) { return i.ativoId === "a-01"; });
var heroiAtivo = M.ativos.find(function (a) { return a.id === "a-01"; });
chk("herói RKT-8H42 · VL06 CAN-BT · M2C-0417 · aprovado, história completa · 27 itens, o autoteste em três contadores",
  heroiAtivo && heroiAtivo.placa === "RKT-8H42" && heroiAtivo.moduloSerial === "M2C-0417" &&
  heroi && heroi.estado === "aprovada" && heroi.etapas &&
  heroi.etapas.cadeia.length === 6 && heroi.etapas.autoteste.aprovadas === 5 && heroi.etapas.autoteste.naoSeAplicam === 1 && heroi.etapas.autoteste.pendentes === 1 && heroi.etapas.checklist.itens === 27 && heroi.etapas.checklist.concluidos === heroi.etapas.checklist.itens);
/* rodada 3 do retorno do PM (06/10): os 12 resumos de instalação com 28 itens e os três contadores do autoteste */
chk("rodada 3: os resumos das instalações com 27 itens (09/10) e o autoteste em três contadores", M.instalacoes.filter(function (i) { return i.resumo; }).every(function (i) {
  return i.resumo.checklist === "27/27" && /^\d+ aprovadas? · \d+ não se aplicam? · \d+ pendentes?$/.test(i.resumo.autoteste); }),
  M.instalacoes.filter(function (i) { return i.resumo; }).length + " resumos");

/* ── Gate de cobertura temporal ── */
var offsets = M.instalacoes.map(function (i) { return i.diasAtras; });
var distintos = offsets.filter(function (v, ix) { return offsets.indexOf(v) === ix; });
var span = Math.max.apply(null, offsets) - Math.min.apply(null, offsets) + 1;
chk("dias distintos com intervenção ≥ 12", distintos.length >= 12, distintos.length + " dias: " + distintos.sort(function (a, b) { return a - b; }).join(","));
chk("span ≥ 45 dias corridos", span >= 45, span + " (" + M.diasAntes(Math.max.apply(null, offsets)) + " → " + M.diasAntes(0) + ")");
chk("datas derivam do dia nominal (aritmética pura)", M.diasAntes(44) === "2026-01-27" && M.diasAntes(0) === "2026-03-12" && M.diasAntes(31) === "2026-02-09");

/* ── Pacote em três idades ── */
var idades = M.pacotes.map(function (p) { return p.diasAtras; }).sort(function (a, b) { return a - b; });
chk("pacotes em 3 idades = 1d · 4d · 8d", idades.join(",") === "1,4,8", idades.join(","));
chk("limiares no mock (aviso 3d · bloqueio 7d)", M.pacotes.every(function (p) { return p.limiares.avisoDias === 3 && p.limiares.bloqueioDias === 7; }));

/* ── Fila de saída ── */
var fEstado = {};
M.filaSaida.forEach(function (f) { fEstado[f.estado] = (fEstado[f.estado] || 0) + 1; });
var naFila = M.filaSaida.filter(function (f) { return f.estado === "na-fila"; });
var horasNaFila = naFila.map(function (f) { return f.criadoAs; });
chk("fila: na fila = 3, tempos parados distintos", fEstado["na-fila"] === 3 &&
  horasNaFila.filter(function (v, ix) { return horasNaFila.indexOf(v) === ix; }).length === 3, horasNaFila.join(" · "));
chk("fila: enviando = 1 com progresso", fEstado["enviando"] === 1 && M.filaSaida.some(function (f) { return f.estado === "enviando" && f.progresso > 0; }));
chk("fila: recebidas = 4 com horário", fEstado["recebida"] === 4 && M.filaSaida.filter(function (f) { return f.estado === "recebida"; }).every(function (f) { return !!f.confirmadoAs; }));
chk("fila: erro-rede = 1, reenvio automático", fEstado["erro-rede"] === 1 && M.filaSaida.some(function (f) { return f.estado === "erro-rede" && f.reenvio === "automático"; }));
chk("fila: erro-recusa = 1, reenvio manual com motivo", fEstado["erro-recusa"] === 1 && M.filaSaida.some(function (f) { return f.estado === "erro-recusa" && f.reenvio === "manual" && !!f.motivo; }));
chk("Seção F em re-checagem é seção separada, não item", !!M.secaoF && M.secaoF.emRecheck === true && !M.filaSaida.some(function (f) { return /se[cç][aã]o f/i.test(f.tipo); }));

/* ── Cadeia e arraste ── */
chk("ordem canônica dos 6 blocos", M.cadeia.ordem.join(">") === "limpeza>ativo>cercas>leitor>eventos>conexao", M.cadeia.ordem.join(" → "));
chk("tabela de arraste do contrato", JSON.stringify(M.cadeia.arraste) ===
  JSON.stringify({ ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }));

/* ── Cercas ── */
chk("cercas: o herói tem 2 áreas × 2 = 4 regiões", (function () { var rs = M.cercas.regioes.filter(function (r) { return r.ativoId === "a-01"; }); var as_ = rs.map(function (r) { return r.areaId; }).filter(function (a, i, l) { return l.indexOf(a) === i; }); return rs.length === 4 && as_.length === 2 && as_.every(function (a) { return rs.filter(function (r) { return r.areaId === a; }).length === 2; }); })());
chk("pool de índices esgotado nos DOIS limites", !!M.casos["pool-esgotado"] &&
  M.casos["pool-esgotado"].regioesUsadas === M.casos["pool-esgotado"].regioesMax &&
  M.casos["pool-esgotado"].posicoesUsadas === M.casos["pool-esgotado"].posicoesMax);

/* ── Casos obrigatórios ── */
var OBRIGATORIOS = ["serial-nao-cadastrado", "modelo-sem-driver", "firmware-fora-matriz",
  "conteudo-nao-cabe", "pool-esgotado", "ativo-fora-pacote",
  "conflito-pinos-sem-saida", "can-fora-esperado",
  "grandeza-indisponivel", "diff-divergente",
  "indice-nao-classificado", "autoteste-falhando", "sessao-interrompida",
  /* retorno do PM, 06/10 */ "sem-leitor", "servidor-ainda-nao",
  /* PM · rodadas 1 e 2 */ "modem-sem-sinal", "firmware-sem-rede-no-modulo", "modulo-em-outro-ativo",
  "modulo-ja-deste-ativo", "sem-conexao-no-menu"];
OBRIGATORIOS.forEach(function (k) { chk("caso: " + k, !!M.casos[k]); });
chk("diff divergente cobre os 4 blocos que se comparam (decisão 53)", M.casos["diff-divergente"] &&
  M.casos["diff-divergente"].divergencias.map(function (d) { return d.bloco; }).sort().join(",") === "cercas,conexao,eventos,leitor");
chk("casos apontam para ativos/módulos reais", OBRIGATORIOS.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; }) && k !== "serial-nao-cadastrado") return false;
  return true;
}));
  chk("09/10: a conferência segue a ordem do script, com cinco blocos", (function () { var c = M.casos["diff-divergente"]; var o = c.ordem.join(","); var d = c.divergencias.map(function (x) { return x.bloco; }); return o === "ativo,cercas,leitor,eventos,conexao" && c.ordem.length === 5 && d.join(",") === c.ordem.filter(function (b) { return d.indexOf(b) >= 0; }).join(","); })());
  chk("09/10: quem depende de quem, como o PM escreveu", M.dependentes && JSON.stringify(M.dependentes) === JSON.stringify({ ativo: ["eventos"], cercas: ["leitor", "eventos"], leitor: ["eventos"], eventos: [], conexao: [] }) && M.casos["falta-reenviar"] && M.casos["falta-reenviar"].faltaReenviar.join(",") === "leitor,eventos");
chk("09/10: o herói mostra 27 — a D sem as pendências, a B sem o Painel (o ônibus não calibra), e a E com o bip", M.calibracao.porModelo["ma-01"].calibraveis.length === 0 && M.checklist.itens.filter(function (x) { return x.condicao !== "reescritaId" && x.condicao !== "calibracao" && x.conta !== false; }).length === 27 && M.checklist.itens.some(function (x) { return x.id === "e-bip" && x.condicao === "buzzer"; }));
  chk("09/10: o Autoteste da D roda ao encerrar e não conta", M.checklist.itens.some(function (x) { return x.id === "d-autoteste" && x.conta === false && x.valor === "roda ao encerrar"; }));
chk("06/10: o autoteste do encerramento tem 7 assertivas, e o caso bloqueado falha nos contadores", M.autotesteEncerramento.length === 7 && M.autotesteEncerramento.some(function (x) { return x.id === M.casos["autoteste-falhando"].falhou; }) &&
  M.casos["autoteste-falhando"].aprovadas + M.casos["autoteste-falhando"].naoSeAplicam + M.casos["autoteste-falhando"].pendentes === 6);

/* ── C10 · T06 ── */
chk("C10: frota em todos os 24 ativos, únicas", M.ativos.every(function (a) { return /^\d{4}$/.test(a.frota); }) &&
  M.ativos.map(function (a) { return a.frota; }).filter(function (v, ix, arr) { return arr.indexOf(v) === ix; }).length === 24);
chk("C10: leitor + leituraCan nos 3 modelos", M.modelosAtivo.every(function (m) { return m.leitor && m.leitor.tipo && (m.leituraCan === "barramento" || m.leituraCan === "gateway"); }));
chk("06/10: o conflito de pinos é só o sem saída, achado sem fio, com o sensor de porta no fio", (function (c) { return !M.casos["conflito-pinos-resolvivel"] && c && c.meioAtual === "sem fio" && c.ocupadoPor === "sensor de porta" && c.consumidores.indexOf("cabo de programação") < 0; })(M.casos["conflito-pinos-sem-saida"]));

/* ── P·C1 · o que as telas leem e o gate ainda não conferia (gate C1) ── */
var cred = M.credenciais, rec = cred.recuperacao, lim = rec.limites;
chk("P·C1 credenciais: usuário do técnico e código de 6 dígitos", cred.usuario === "r.vieira" && !!M.tecnico.nome && /^\d{6}$/.test(rec.codigo));
chk("P·C1 credenciais: a senha nova cumpre as regras verificáveis", (function () {
  var s = rec.novaSenha; return s.length >= 10 && /[a-z]/.test(s) && /[A-Z]/.test(s) && /\d/.test(s) && /[^A-Za-z0-9]/.test(s) &&
    s.toLowerCase().indexOf(cred.usuario.split(".")[1]) < 0 && s !== cred.senha; })());
chk("P·C1 credenciais: limites 10 min · 3 tentativas · 60 s · 3 por hora", lim.validadeMin === 10 && lim.tentativas === 3 && lim.reenvioSeg === 60 && lim.tetoPorHora === 3,
  "resta " + (lim.tetoPorHora - rec.reenviosNaHora) + " envio nesta hora");
chk("P·C1 credenciais: reenvios da hora abaixo do teto", rec.reenviosNaHora < lim.tetoPorHora);
chk("P·C1 DDIs: o telefone tem os dígitos que a máscara do DDI pede", (function () {
  var d = M.ddis.find(function (x) { return x.codigo === cred.contato.telefone.ddi; });
  return !!d && (d.mascara.match(/#/g) || []).length === cred.contato.telefone.numero.length; })());
chk("rodada 3: seis países, cada um com a sigla e a máscara, e o Brasil como padrão", M.ddis.length === 6 &&
  M.ddis.every(function (d) { return /^[A-Z]{2}$/.test(d.sigla) && /#/.test(d.mascara); }) && rec.ddiPadrao === "+55" && M.ddis.some(function (d) { return d.codigo === rec.ddiPadrao; }));
chk("rodada 3: as três frases fixas da recuperação", rec.respostaEnvio === "Se houver conta com este dado, o código foi enviado." &&
  rec.mensagemCodigo === "Código inválido ou vencido" && rec.textoFixo === "O dado precisa ser o mesmo do cadastro.");
chk("rodada 3: o que vem digitado na primeira etapa — o telefone incompleto (faltam 2), o completo e o e-mail", (function () {
  var d = M.ddis.find(function (x) { return x.codigo === rec.ddiPadrao; }); var n = (d.mascara.match(/#/g) || []).length;
  return rec.digitado.telefone.length === n && rec.digitado.telefoneIncompleto.length === n - 2 && rec.digitado.telefone.indexOf(rec.digitado.telefoneIncompleto) === 0 && /@/.test(rec.digitado.email); })());
chk("P·C1 sessão de acesso: aberta dentro da validade, aviso antes do fim", (function () {
  var a = M.situacao.sessaoAcesso; return a.abertaDiasAtras < a.validadeDias && a.avisoNoDia <= a.validadeDias; })(),
  "restam " + (M.situacao.sessaoAcesso.validadeDias - M.situacao.sessaoAcesso.abertaDiasAtras) + " de " + M.situacao.sessaoAcesso.validadeDias + " dias");
chk("P·C1 calibração: o bruto do módulo dá o número da T10 (184.320 · 87.604 · 121.003)", (function () {
  var b = M.calibracao.bruto; return b["a-01"].hodometro / 1000 === 184320 && b["a-09"].hodometro / 1000 === 87604 && b["a-22"].hodometro / 1000 === 121003; })());
chk("P·C1 calibração: as diferenças da T10 derivam do mock (297.997 · 108 · 477)", (function () {
  var b = M.calibracao.bruto, p = M.calibracao.painel;
  return p["a-01"].hodometro - b["a-01"].hodometro / 1000 === 297997 && p["a-09"].hodometro - b["a-09"].hodometro / 1000 === 108 &&
    p["a-22"].hodometro - b["a-22"].hodometro / 1000 === 477; })());
chk("P·C1 calibração: calibráveis e indisponíveis não se cruzam, em todo modelo", Object.keys(M.calibracao.porModelo).every(function (k) {
  var m = M.calibracao.porModelo[k]; return (m.indisponiveis || []).every(function (i) { return m.calibraveis.indexOf(i.grandeza) < 0; }); }));
chk("P·C1 calibração: todo modelo de ativo tem regra de calibração", M.modelosAtivo.every(function (m) { return !!M.calibracao.porModelo[m.id]; }));
chk("P·C1 checklist: todo item aponta uma seção que existe", M.checklist.itens.every(function (i) { return M.checklist.secoes.some(function (s) { return s.id === i.secao; }); }));
chk("P·C1 ciclo: o evento chega e confere dentro do prazo (24 < 33 < 120 s)", (function () {
  var c = M.ciclo; return 0 < c.evento.recebidoAosSeg && c.evento.recebidoAosSeg < c.evento.conferidoAosSeg && c.evento.conferidoAosSeg < c.prazoEventoSeg; })());
chk("P·C1 ciclo: a fila do módulo tem mensagens e diagnóstico", M.ciclo.mensagensGuardadas.mensagens > 0 && M.ciclo.mensagensGuardadas.diagnostico > 0);
chk("P·C1 autoteste de encerramento: 7 assertivas, 1 condicional (retorno do PM, 06/10)", M.autotesteEncerramento.length === 7 &&
  M.autotesteEncerramento.filter(function (a) { return a.condicional; }).length === 1);
chk("P·C1 critérios: a regra cobre todo estado de instalação", M.instalacoes.every(function (i) { return !!M.criteriosRegra.porEstado[i.estado]; }));
chk("P·C1 pacotes: os limiares batem com as três idades (1d ok · 4d aviso · 8d bloqueio)", M.pacotes.every(function (p) {
  var l = p.limiares; return l && typeof l.avisoDias === "number" && typeof l.bloqueioDias === "number"; }) &&
  M.pacotes.map(function (p) { return p.diasAtras; }).join(",") === "1,4,8");
/* pacote 1 (02/10): saem o modulo-em-repouso e o can-estatico-dominio, que o pacote tira — 10 casos */
var SEM_GATE = ["conexao-falha", "link-perdido", "modulo-com-pendencias", "can-estatico-isolado", "can-estatico-ausente",
  "can-estatico-hodometro", "bloco-recusado", "queda-na-cadeia", "pronto-para-fechar", "evento-sem-resposta"];
chk("P·C1 os 10 casos sem conferência apontam ativo e módulo reais", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; })) return false;
  return true; }));
chk("P·C1 casos de módulo: o par ativo × módulo é o do cadastro", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c.ativoId || !c.moduloSerial) return true;
  var a = M.ativos.find(function (x) { return x.id === c.ativoId; }); return a.moduloSerial === c.moduloSerial; }));
chk("P·C1 sync-falha-rede aponta um pacote que existe", M.pacotes.some(function (p) { return p.id === M.casos["sync-falha-rede"].pacoteId; }));
/* pacote 2 (02/10): o CADEIA.versoes saiu — os 5 blocos são os que têm conteúdo (decisão 49), e a limpeza não tem */
chk("P·C1 a cadeia tem 6 passos e 5 blocos com conteúdo", M.cadeia.ordem.length === 6 && M.cadeia.ordem[0] === "limpeza" &&
  M.cadeia.ordem.slice(1).join(",") === Object.keys(M.cadeia.conteudo).join(","));

/* ── P·C4 · entrar: o login e a sincronização (gate C4) ── */
chk("P·C4 código errado: seis dígitos, diferente do código", /^\d{6}$/.test(rec.codigoErrado) && rec.codigoErrado !== rec.codigo);
chk("P·C4 entrar: a senha do mock passa do mínimo de 8", cred.minimoEntrar === 8 && cred.senha.length >= cred.minimoEntrar);
chk("P·C4 requisitos: seis, o mínimo 10, e a senha nova cumpre os verificáveis", (function () {
  var r = cred.requisitosSenha, s = rec.novaSenha; if (!r || r.length !== 6) return false;
  var min = r[0].minimo; return r[0].id === "tamanho" && min === 10 && s.length >= min && r[5].verificavelNoAparelho === false; })());
chk("P·C4 pacotes: a estimativa dá ~40 s com 25 itens por baixar em Várzea (6 de 31, 1,6 s por item · pacote 1)", (function () {
  var p = M.pacotes[0], c = p.contem, total = c.ativos + c.conexoes + c.modelosAtivo + c.eventos + c.cercas;
  return total === 31 && Math.round((total - 6) * p.segPorItem / 10) * 10 === 40; })());
chk("P·C4 pacotes: a versão deriva de uoId e data (pct-uo01-2026-03-11)", "pct-" + M.pacotes[0].uoId.replace("-", "") + "-" + M.pacotes[0].data === "pct-uo01-2026-03-11");

/* ── P·C4 · T02 · selecionar contexto: a linha de cada garagem lê o pacote dela ── */
chk("P·C4 · T02 cada UO tem um pacote só (a linha lê idade, hora e ativos dele)", M.uos.every(function (uo) {
  return M.pacotes.filter(function (p) { return p.uoId === uo.id; }).length === 1; }));
chk("P·C4 · T02 os ativos do pacote cruzam com o cadastro da UO (T02·5 · 10·8·6)", M.pacotes.every(function (p) {
  return p.contem.ativos === M.ativos.filter(function (a) { return a.uoId === p.uoId; }).length; }),
  M.pacotes.map(function (p) { return p.contem.ativos; }).join("·"));

/* ── P·C4 · T01 · login: a senha nova não tem sequência nem pedaço do usuário ── */
chk("P·C4 · T01 o trecho da regra 5 é 3, e a senha nova não tem sequência nem pedaço do usuário de 3", (function () {
  var r = cred.requisitosSenha.filter(function (x) { return x.id === "sem-usuario-nem-sequencia"; })[0], n = r && r.trecho;
  if (n !== 3) return false;
  var s = rec.novaSenha.toLowerCase(), u = cred.usuario.toLowerCase(), i, j;
  for (i = 0; i + n <= u.length; i++) if (s.indexOf(u.slice(i, i + n)) >= 0) return false;
  for (i = 0; i + n <= s.length; i++) {
    var d = s.charCodeAt(i + 1) - s.charCodeAt(i), seguido = Math.abs(d) <= 1;
    for (j = i + 1; seguido && j < i + n; j++) if (s.charCodeAt(j) - s.charCodeAt(j - 1) !== d) seguido = false;
    if (seguido) return false;
  }
  return true; })(), "trecho " + cred.requisitosSenha[4].trecho);

/* ── P·C5 · T04 · menu: os contadores e as folhas saem das regras da T04 (nenhum campo novo) ── */
(function () {
  var uoDe = function (id) { var a = M.ativos.filter(function (x) { return x.id === id; })[0]; return a && a.uoId; };
  var uo = M.contextoAtivo.uoId, fila = M.filaSaida;
  /* rodada 2: o recebido em conflito também chegou (o servidor aceita os dois registros e avisa o gestor) */
  var menu = fila.filter(function (f) { return f.estado !== "recebida" && f.estado !== "recebida-em-conflito" && uoDe(f.ativoId) === uo; });
  chk("P·C5 · T04 o contador do menu: o que não chegou, só da garagem ativa (T04·1 b · 2)", menu.length === 2,
    menu.map(function (f) { return f.id; }).join(","));
  var sair = fila.filter(function (f) { return f.estado === "na-fila"; });
  chk("P·C5 · T04 o diálogo de sair: o que está na fila, de todas as garagens (T04·1 b · 3)", sair.length === 3,
    sair.map(function (f) { return f.id; }).join(","));
  chk("P·C5 · T04 a folha da garagem no 08: uma evidência subindo", fila.filter(function (f) { return f.estado === "enviando"; }).length === 1);
  var manuais = M.checklist.secoes.filter(function (s) { return s.natureza === "manual" || s.natureza === "dinamico"; }).map(function (s) { return s.id; });
  var abertos = M.checklist.itens.filter(function (i) { return manuais.indexOf(i.secao) >= 0; });
  /* retorno do PM (06/10): a E com 5 — os 4 passos e o bip — dá 5 + 5 = 10, o que a T04/04 desenha */
  chk("P·C5 · T04 o contador do checklist: B + E, os que o técnico resolve (T04·2 b · 5 + 5 = 10)", manuais.join("") === "BE" && abertos.length === 10, abertos.length);
  var ac = M.situacao.sessaoAcesso;
  chk("P·C5 · T04 a folha da conta: restam 2 de 7 dias, já no aviso", ac.validadeDias - ac.abertaDiasAtras === 2 && ac.validadeDias === 7 && ac.abertaDiasAtras >= ac.avisoNoDia);
  chk("P·C5 · T04 a folha da garagem: só o Pátio Caruaru passa do limite (8 > 7)", M.pacotes.filter(function (p) { return p.diasAtras > p.limiares.bloqueioDias; }).map(function (p) { return p.uoId; }).join(",") === "uo-03");
})();

/* ── P·C4 · T03 · sincronizar: as regras que a tela lê do pacote (nenhum campo novo) ── */
(function () {
  var ORDEM = ["ativos", "conexoes", "modelosAtivo", "eventos", "cercas"]; /* pacote 1: Ativos → Conexões → Modelos → Eventos → Cercas, um item por tick (a 00 e a 01 desenham Ativos primeiro) */
  var total = function (p) { return ORDEM.reduce(function (s, k) { return s + p.contem[k]; }, 0); };
  var feito = function (p, n) { var r = {}; ORDEM.forEach(function (k) { r[k] = Math.min(n, p.contem[k]); n -= r[k]; }); return r; };
  var v = M.pacotes.filter(function (p) { return p.uoId === M.contextoAtivo.uoId; })[0];
  var q = feito(v, 6);
  chk("P·C4 · T03 o quadro da 00: 6 itens na ordem dão Ativos 6 de 10, e os outros quatro em 0 (6 de 31 · pacote 1)",
    total(v) === 31 && q.ativos === 6 && v.contem.ativos === 10 && q.conexoes + q.modelosAtivo + q.eventos + q.cercas === 0, JSON.stringify(q));
  var caso = M.casos["sync-falha-rede"], pc = M.pacotes.filter(function (p) { return p.id === caso.pacoteId; })[0];
  chk("P·C4 · T03 a falha de rede cai num item do pacote do caso (1 ≤ falhaNoTick ≤ total)", !!pc && caso.falhaNoTick >= 1 && caso.falhaNoTick <= total(pc),
    caso.falhaNoTick + " de " + (pc && total(pc)));
  var usados = function (p) { var s = {}; M.ativos.filter(function (a) { return a.uoId === p.uoId; }).forEach(function (a) {
    s[M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0].presetEventoId] = 1; }); return Object.keys(s).sort().join(","); };
  chk("P·C4 · T03 o pacote traz o catálogo de modelos da empresa e só os presets em uso (T03·8 a)", M.pacotes.every(function (p) {
    return p.contem.modelosAtivo === M.modelosAtivo.length && p.presetsEventoIds.slice().sort().join(",") === usados(p); }));
  var avisa = M.pacotes.filter(function (p) { return p.diasAtras >= p.limiares.avisoDias && p.diasAtras <= p.limiares.bloqueioDias; });
  chk("P·C4 · T03 só o pacote de Ibura avisa sem bloquear (3 ≤ 4 ≤ 7, T03·3) — a 03", avisa.length === 1 && avisa[0].id === "pac-uo-02",
    avisa.map(function (p) { return p.id; }).join(","));
  chk("P·C4 · T03 a régua da idade vai de 0 a bloqueioDias + 1 (T03·4) — o 8 da 03 e da 04", M.pacotes.every(function (p) {
    return p.limiares.bloqueioDias + 1 === 8; }));
})();

/* ── P·C8 · T07 · dados da CAN: a faixa esperada em número e o rótulo curto (AC-07) ── */
(function () {
  /* "2.500" → 2500 · "12,0" → 12 · "−40" (U+2212) → −40 */
  var num = function (s) { return Number(String(s).replace(/\./g, "").replace(",", ".").replace("−", "-")); };
  var doTexto = function (e) {
    var m = e && e.match(/^([−\d.,]+) a ([−\d.,]+) /); if (m) return { min: num(m[1]), max: num(m[2]) };
    var p = e && e.match(/^(\d+) ou mais$/); if (p) return { min: num(p[1]), max: null };
    return null;
  };
  var todos = [];
  M.modelosAtivo.forEach(function (m) { m.sinaisCan.forEach(function (s) { todos.push({ m: m.id, s: s }); }); });
  var errados = todos.filter(function (x) {
    var t = doTexto(x.s.esperado), f = x.s.faixa;
    return t ? !(f && f.min === t.min && f.max === t.max) : f !== undefined;
  });
  chk("P·C8 · T07 a faixa em número bate com o esperado de cada sinal (e só onde ele é intervalo ou piso)", errados.length === 0 && todos.some(function (x) { return x.s.faixa; }),
    errados.map(function (x) { return x.m + "/" + x.s.id; }).join(",") || undefined);
  var dentro = function (f, v) { return v >= f.min && (f.max === null || v <= f.max); };
  var lidoNum = function (l) { return num(String(l).split(" ")[0]); };
  var fora = todos.filter(function (x) { return x.s.fase === "estatico" && x.s.faixa && !dentro(x.s.faixa, lidoNum(x.s.lido)); });
  chk("P·C8 · T07 o lido nominal de todo estático com faixa fica dentro dela", fora.length === 0, fora.map(function (x) { return x.m + "/" + x.s.id; }).join(",") || undefined);
  /* pacote 1 (02/10): saem as cinco checagens da T07 antiga, os Dados da CAN — o caso isolado abaixo do mínimo,
     o '1,1 V abaixo', o ausente nos satélites, o resumo dos que fecham andando e o contador de 7 de 12 */
})();

/* ── P·C6 · T05 · conectar: os módulos por perto (AC-06), a pré-checagem do herói e a atualização (AC-19) ── */
(function () {
  var perto = M.situacao.porPerto;
  var heroi = M.ativos.filter(function (a) { return a.id === "a-01"; })[0];
  var modulo = function (s) { return M.modulos.filter(function (m) { return m.serial === s; })[0]; };
  var linha = function (mod) { return M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0]; };
  chk("P·C6 · T05 por perto: 5 módulos, seriais únicos, o herói primeiro e sem fio (T05/00 e 01: '5 encontrados', 'OUTROS QUATRO')",
    perto.length === 5 && perto[0].serial === heroi.moduloSerial && perto[0].meio === "sem-fio" &&
    perto.map(function (p) { return p.serial; }).filter(function (s, i, arr) { return arr.indexOf(s) === i; }).length === 5,
    perto.map(function (p) { return p.serial + ":" + p.meio; }).join(" · "));
  chk("P·C6 · T05 por perto: todo serial está no cadastro ou fora dele, e o meio é 'sem-fio' ou 'cabo'", perto.every(function (p) {
    return (!!modulo(p.serial) || M.seriaisForaCadastro.indexOf(p.serial) >= 0) && (p.meio === "sem-fio" || p.meio === "cabo"); }));
  chk("P·C6 · T05 por perto: variante sem sem fio na matriz ⇒ por cabo", perto.every(function (p) {
    var mod = modulo(p.serial); if (!mod) return true; var l = linha(mod); return !l || l.semFio || p.meio === "cabo"; }));
  /* rodada 2: o conflito-pinos-resolvivel saiu (sem cabo, trocar o meio nunca resolve) — a conferência do meio dele saiu junto */
  var mod = modulo(heroi.moduloSerial), l = linha(mod);
  var modelo = M.modelos.filter(function (m) { return m.id === mod.modeloId; })[0];
  var conteudo = M.modelosAtivo.filter(function (m) { return m.id === heroi.modeloAtivoId; })[0].conteudoRegistros;
  var regioes = M.cercas.regioes.filter(function (r) { return r.ativoId === heroi.id; }).length;
  chk("P·C6 · T05 a pré-checagem do herói aprova pelo cadastro (VL06 CAN-BT · 2.3.5 · 96 de 127 · 4 de 4 · a capacidade do PM, 06/10)",
    modelo.driverV1 && l.firmwares.indexOf(mod.firmware) >= 0 && l.can && conteudo <= l.capacidadeRegistros && regioes <= l.regioesMax &&
    [modelo.nome + " " + mod.variante, mod.firmware, conteudo + " de " + l.capacidadeRegistros, regioes + " de " + l.regioesMax].join(" · ") === "VL06 CAN-BT · 2.3.5 · 96 de 127 · 4 de 4");
  var at = M.casos["firmware-fora-matriz"].atualizacao;
  chk("P·C6 · T05 a atualização do firmware tem o quadro da 10 entre 0 e 100 (62%)", !!at && at.quadroPct > 0 && at.quadroPct < 100, at && at.quadroPct + "%");
})();

/* ── P·C9 · T10 · calibração: o hodômetro do a-22 (AC-08) e o que a tela deriva de calibracao ── */
(function () {
  var C = M.calibracao;
  var num = function (s) { return Number(String(s).split(" ")[0].replace(/\./g, "").replace(",", ".")); };
  var gr = function (id) { return C.grandezas.filter(function (g) { return g.id === id; })[0]; };
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var linha = function (a) {
    var mod = M.modulos.filter(function (m) { return m.serial === a.moduloSerial; })[0];
    return M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  };
  /* o hodômetro que a CAN lê: o do caso estático do ativo, se houver; senão, o nominal do modelo */
  var lidoCan = function (a) {
    var k = Object.keys(M.casos).filter(function (x) { return x.indexOf("can-estatico-") === 0 && M.casos[x].ativoId === a.id && M.casos[x].lidos && M.casos[x].lidos.hodometro; })[0];
    if (k) return M.casos[k].lidos.hodometro;
    return M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0].sinaisCan.filter(function (s) { return s.id === "hodometro"; })[0].lido;
  };
  var ids = Object.keys(C.bruto);
  var fora = ids.filter(function (id) { return num(lidoCan(ativo(id))) !== C.bruto[id].hodometro / gr("hodometro").fatorEnvio; });
  chk("P·C9 · T10 AC-08: o hodômetro da CAN é o bruto ÷ fator em todo ativo de calibracao.bruto (184.320 · 87.604 · 121.003)",
    fora.length === 0 && ids.length === 3, fora.map(function (id) { return id + ": " + lidoCan(ativo(id)) + " × " + C.bruto[id].hodometro / 1000; }).join(" · ") || undefined);
  var c22 = M.casos["can-estatico-hodometro-a22"], a22 = c22 && ativo(c22.ativoId);
  chk("P·C9 · T10 AC-08: o caso do a-22 aponta o ativo do cadastro, com módulo (RJP-1W48 · M2C-0480)", !!a22 && a22.placa === "RJP-1W48" && a22.moduloSerial === "M2C-0480");
  /* as grandezas de cada quadro: o cadastro do modelo, menos as de ajuste quando o módulo não lê pulsos */
  var doPar = function (id) {
    var a = ativo(id), pm = C.porModelo[a.modeloAtivoId], pulsos = linha(a).pulsos;
    var derrubadas = pm.calibraveis.filter(function (g) { return !pulsos && gr(g).natureza === "ajuste"; });
    return { calibraveis: pm.calibraveis.filter(function (g) { return derrubadas.indexOf(g) < 0; }), derrubadas: derrubadas };
  };
  var p01 = doPar("a-01"), p09 = doPar("a-09"), p22 = doPar("a-22");
  /* rodada 2: o ônibus não calibra nada (T10/11); o caminhão coletor calibra os quatro, dois opcionais; o a-22 sem pulsos fica com o hodômetro e o horímetro */
  chk("P·C9 · T10 os passos: o herói nenhum (nada a calibrar) · o a-09 4 (hodômetro, rotação, velocidade, horímetro) · o a-22 2 (hodômetro, horímetro)",
    p01.calibraveis.join(",") === "" && !!C.porModelo["ma-01"].nadaACalibrar && p09.calibraveis.join(",") === "hodometro,rotacao,velocidade,horimetro" && p22.calibraveis.join(",") === "hodometro,horimetro",
    [p01, p09, p22].map(function (p) { return p.calibraveis.join("+"); }).join(" · "));
  chk("P·C9 · T10 o rótulo da caixa (T10·5): só o módulo do a-22 derruba grandezas (rotação e velocidade, 'não lê pulsos')",
    p01.derrubadas.length === 0 && p09.derrubadas.length === 0 && p22.derrubadas.join(",") === "rotacao,velocidade" && C.motivoSemPulsos === "não lê pulsos");
  var t = C.tolerancia.hodometro, fator = gr("hodometro").fatorEnvio, relido = C.painel["a-01"].hodometro * fator + t.desvio;
  chk("P·C9 · T10 a releitura do hodômetro confere na tolerância (120 ≤ 100 + 40) e mostra o número do painel (482.317)",
    t.desvio <= t.granularidade + t.decorrido && Math.floor(relido / t.porUnidade) === C.painel["a-01"].hodometro && t.porUnidade === fator);
  chk("P·C9 · T10 'semeado há N dias' só com 1 ou mais (G22): o herói 0 (desta sessão), o a-09 27, o a-22 39",
    C.ultimas["a-01"].hodometro === 0 && C.ultimas["a-09"].hodometro === 27 && C.ultimas["a-22"].hodometro === 39);
  var h = gr("horimetro"), bh = C.bruto["a-01"].horimetro / h.fatorEnvio;
  chk("P·C9 · T10 o passo do horímetro do herói: 8.540 h no módulo, 9.640 no painel, diferença de 1.100",
    Number.isInteger(bh) && bh === 8540 && C.painel["a-01"].horimetro - bh === 1100, bh + " h");
  /* pacote 2 (02/10): sai a da foto do painel herdada da calibração (HU-T10-4) — a calibração não fotografa
     mais, e o Painel é foto a tirar na B (decisão 52; a 'r3:' do arquiteto confere) */
})();

/* ── P·C9 · T09 · configurar módulo: o que a cadeia lê de M.cadeia e dos dois casos (nenhum campo novo) ── */
(function () {
  var Cd = M.cadeia, ordem = Cd.ordem;
  /* pacote 2 (02/10): o CADEIA.versoes saiu — a mesma conta pelo CADEIA.conteudo, o que a T09 mostra em cada elo */
  var comConteudo = ordem.filter(function (b) { return !!Cd.conteudo[b]; });
  chk("P·C9 · T09 os 6 passos têm rótulo, e só a limpeza não tem conteúdo (5 blocos com conteúdo, as palavras da conferência)",
    ordem.every(function (b) { return !!Cd.rotulos[b]; }) && comConteudo.length === 5 && !Cd.conteudo.limpeza && ordem.indexOf("conexao") === ordem.length - 1,
    comConteudo.join(","));
  var rec = M.casos["bloco-recusado"], que = M.casos["queda-na-cadeia"];
  var iR = ordem.indexOf(rec.bloco), iQ = ordem.indexOf(que.noBloco);
  chk("P·C9 · T09 o 01: o bloco recusado é Cercas, o 3º, com dois relidos antes e três não alcançados depois",
    iR === 2 && Cd.rotulos[rec.bloco] === "Cercas" && ordem.length - iR - 1 === 3);
  chk("P·C9 · T09 o 02 e o 03: a queda é no Leitor, com três gravados (3 de 6) e a Conexão ainda por gravar",
    iQ === 3 && Cd.rotulos[que.noBloco] === "Leitor" && iQ < ordem.indexOf("conexao"));
  var placa = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0].placa; };
  chk("P·C9 · T09 a faixa dos estados: M2C-0301 · QJF-2C61 no 01, M2C-0312 · PCX-9A17 no 02 e no 03",
    rec.moduloSerial === "M2C-0301" && placa(rec.ativoId) === "QJF-2C61" && que.moduloSerial === "M2C-0312" && placa(que.ativoId) === "PCX-9A17");
})();

/* ── P·C7 · T05 · conectar: os estados (AC-18, AC-20) e os pares dos casos que a T05 lê (T05-A18) ── */
(function () {
  var par = function (c) { var a = M.ativos.filter(function (x) { return x.id === c.ativoId; })[0]; return !!a && a.moduloSerial === c.moduloSerial; };
  var bv = M.casos["busca-vazia"];
  chk("P·C7 · T05 a busca vazia tem a duração da tentativa, maior que 0 (T05/03: '8 s · primeira tentativa')",
    !!bv && bv.duracaoSeg > 0 && bv.tentativa === 1, bv && bv.duracaoSeg + " s · tentativa " + bv.tentativa);
  var ff = M.casos["firmware-fora-matriz"], fs = M.casos["firmware-fora-sem-rede"];
  chk("P·C7 · T05 o firmware fora sem rede é o mesmo par do firmware fora da matriz, com o modem sem rede (T05/09)",
    !!fs && fs.moduloSerial === ff.moduloSerial && fs.ativoId === ff.ativoId && par(fs) && !!fs.modem, fs && fs.moduloSerial + " × " + fs.ativoId + " · " + fs.modem);
  var mod = M.modulos.filter(function (m) { return m.serial === fs.moduloSerial; })[0];
  var lin = M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  chk("P·C7 · T05 o firmware do módulo do par está fora da matriz dele (2.4.1 fora de 2.2.0 e 2.3.5)", !!lin && lin.firmwares.indexOf(mod.firmware) < 0,
    mod.firmware + " × " + lin.firmwares.join(" e "));
  var DOS_PARES = ["conexao-falha", "link-perdido", "modulo-com-pendencias", "modelo-sem-driver", "conteudo-nao-cabe"]; /* pacote 1: saem o modulo-em-repouso e o canal-aberto */
  chk("P·C7 · T05 os casos da T05 apontam o par ativo × módulo do cadastro", DOS_PARES.every(function (k) { return par(M.casos[k]); }),
    DOS_PARES.filter(function (k) { return !par(M.casos[k]); }).join(",") || undefined);
  var pool = M.casos["pool-esgotado"], ativoPool = M.ativos.filter(function (a) { return a.id === pool.ativoId; })[0];
  chk("P·C7 · T05 o pool esgotado aponta um ativo com módulo cadastrado (a-05 × M2C-0348)", !!ativoPool && M.modulos.some(function (m) { return m.serial === ativoPool.moduloSerial; }),
    ativoPool && ativoPool.moduloSerial);
})();

/* ── P·C11 · T12 · últimas instalações: os grupos por idade (AC-16) e a garagem vazia (AC-21) ── */
(function () {
  var G = M.criteriosRegra.gruposIdade;
  chk("P·C11 · T12 o corte dos grupos por idade: hoje 0, ontem 1 e esteMesAte de 17 a 26 (AC-16, o número é do diretor)",
    !!G && G.hoje === 0 && G.ontem === 1 && G.esteMesAte >= 17 && G.esteMesAte < 27, G && "esteMesAte " + G.esteMesAte);
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var grupo = function (d) { return d <= G.hoje ? "HOJE" : d <= G.ontem ? "ONTEM" : d <= G.esteMesAte ? "ESTE MÊS" : "MAIS DE UM MÊS"; };
  var varzea = M.instalacoes.filter(function (i) { return ativo(i.ativoId).uoId === M.contextoAtivo.uoId; })
    .sort(function (a, b) { return a.diasAtras - b.diasAtras; });
  var desenho = varzea.map(function (i) { return grupo(i.diasAtras) + " " + ativo(i.ativoId).placa; }).join(" · ");
  chk("P·C11 · T12 a 00: as 5 de Várzea nos quatro grupos da referência (RKT-8H42 hoje · PCX-9A17 ontem · RVM-1E54 e QJF-2C61 este mês · KNB-5H39 mais de um mês)",
    desenho === "HOJE RKT-8H42 · ONTEM PCX-9A17 · ESTE MÊS RVM-1E54 · ESTE MÊS QJF-2C61 · MAIS DE UM MÊS KNB-5H39", desenho);
  var v = M.casos["instalacoes-vazia"];
  chk("P·C11 · T12 a 02 (AC-21): a consulta da garagem volta sem nenhum id, e sem sessão", !!v && Array.isArray(v.instalacaoIds) && v.instalacaoIds.length === 0 && v.sessao === null);
  var ids = M.instalacoes.map(function (i) { return i.id; }).join(",");
  chk("P·C11 · T12 as 13 instalações ficam intocadas (i-01 a i-13, na ordem; Várzea 5, Ibura 5, Caruaru 3)",
    ids === "i-01,i-02,i-03,i-04,i-05,i-06,i-07,i-08,i-09,i-10,i-11,i-12,i-13" && M.uos.map(function (u) {
      return M.instalacoes.filter(function (i) { return ativo(i.ativoId).uoId === u.id; }).length; }).join(" ") === "5 5 3");
  var sr = M.casos["instalacoes-sem-rede"];
  chk("P·C11 · T12 a 03: a consulta anterior é de hoje, a uma hora do dia antes das 14:30 (11:47)",
    sr.diasAtras === 0 && /^\d\d:\d\d$/.test(sr.consultadoAs) && sr.consultadoAs < M.HORA_NOMINAL, sr.consultadoAs);
  var h = M.instalacoes.filter(function (i) { return !!i.etapas; });
  chk("P·C11 · T12 o 01: só a i-01 tem as etapas do detalhe (T12·2: as outras abrem só com o que o resumo sustenta)",
    h.length === 1 && h[0].id === varzea[0].id && M.instalacoes.every(function (i) { return !!i.etapas || !!i.resumo; }), h.map(function (i) { return i.id; }).join(","));
})();

/* ── P·C11 · T15 · fila de saída: os rótulos curtos (AC-14), a janela da re-checagem (AC-15) e os três recortes (AC-22, G21) ── */
(function () {
  var F = M.filaSaida, T = M.tiposFila || [];
  var curto = function (tipo) { var t = T.filter(function (x) { return x.tipo === tipo; })[0]; return t && t.rotuloCurto; };
  var fontesFila = M.checklist.itens.filter(function (i) { return /^fila:/.test(i.fonte || ""); }).map(function (i) { return i.fonte.slice(5); });
  var semCurto = F.map(function (f) { return f.tipo; }).concat(fontesFila).filter(function (t) { return !curto(t); });
  chk("P·C11 · T15 todo tipo da fila e toda fonte 'fila:<tipo>' do checklist têm rótulo curto (AC-14)", T.length > 0 && !semCurto.length, semCurto.join(", ") || T.length + " tipos");
  /* pacote 2 (02/10): a foto de calibração deixa de existir como tipo (MUDANCAS §7) — as referências mostram Evidências e Checklist */
  chk("P·C11 · T15 os rótulos curtos que as referências mostram: Evidências e Checklist, e a foto de calibração não é mais tipo",
    curto("Evidências da instalação") === "Evidências" && curto("Checklist de homologação") === "Checklist" && !curto("Foto de calibração"),
    T.map(function (t) { return t.rotuloCurto; }).join(" · "));
  chk("P·C11 · T15 a re-checagem da Seção F tem janela em horas, maior que 0 (AC-15: 'confere em 24 h')",
    M.criteriosRegra.recheckHoras > 0, M.criteriosRegra.recheckHoras + " h");
  var item = function (id) { return F.filter(function (f) { return f.id === id; })[0]; };
  var uo = function (f) { return M.ativos.filter(function (a) { return a.id === f.ativoId; })[0].uoId; };
  var RECORTES = ["fila-sem-erro", "fila-dois-erros", "fila-vazia"];
  chk("P·C11 · T15 os três recortes existem e todo id deles está em filaSaida (AC-22)", RECORTES.every(function (k) {
    var c = M.casos[k]; return !!c && Array.isArray(c.itens) && c.itens.every(function (id) { return !!item(id); }); }));
  var se = M.casos["fila-sem-erro"].itens.map(item);
  /* rodada 2: o recebido em conflito (f-11) é da Várzea, e a 01 não o desenha — ele entra só na semente da 00 */
  var varzea = F.filter(function (f) { return uo(f) === "uo-01" && f.estado !== "recebida-em-conflito"; }).map(function (f) { return f.id; }).sort().join(",");
  chk("P·C11 · T15 o 01 (fila-sem-erro) é a fila inteira da Várzea: 5 itens, um enviando com progresso e tamanho, nenhum erro",
    se.map(function (f) { return f.id; }).sort().join(",") === varzea && se.length === 5 &&
    se.filter(function (f) { return f.estado === "enviando" && f.progresso > 0 && f.tamanhoMb > 0; }).length === 1 &&
    !se.some(function (f) { return /^erro/.test(f.estado); }), varzea);
  var de = M.casos["fila-dois-erros"].itens.map(item);
  chk("P·C11 · T15 o 02 (fila-dois-erros): 4 itens, uma recusa manual com motivo e um erro de rede automático com tentativas e a próxima",
    de.length === 4 && de.filter(function (f) { return f.estado === "erro-recusa" && f.reenvio === "manual" && !!f.motivo; }).length === 1 &&
    de.filter(function (f) { return f.estado === "erro-rede" && f.reenvio === "automático" && f.tentativas > 0 && /^\d\d:\d\d$/.test(f.proximaTentativaAs); }).length === 1);
  var va = M.casos["fila-vazia"];
  chk("P·C11 · T15 o 03 e o 04 (fila-vazia): nada no recorte, o último envio em HH:MM antes das 14:30, sem sessão",
    va.itens.length === 0 && /^\d\d:\d\d$/.test(va.ultimoEnvioAs) && va.ultimoEnvioAs < M.HORA_NOMINAL && va.sessao === null, va.ultimoEnvioAs);
  var ibura = F.filter(function (f) { return uo(f) === "uo-02"; }).map(function (f) { return f.id; }).sort().join(",");
  chk("P·C11 · T15 a semente da 00 (G21: a seleção f-10, f-02, f-08) é a fila inteira da Ibura, com uma recusa",
    ibura === "f-02,f-08,f-10" && item("f-10").estado === "erro-recusa", ibura);
  chk("P·C11 · T15 a fila fica intocada: 11 itens, f-01 a f-11, na ordem (a rodada 2 trouxe o f-11, o recebido em conflito)",
    F.length === 11 && F.every(function (f, i) { return f.id === "f-" + (i < 9 ? "0" : "") + (i + 1); }));
})();

/* ── P·C10 · T14 · o ciclo dinâmico: os campos do evento (AC-09), o passo de cada sinal (AC-10) e os três casos que a T14 lê ── */
(function () {
  var C = M.ciclo, ev = C.evento;
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  chk("P·C10 · T14 o 00 é o instante antes de o evento chegar: 120 − 24 = 96 s, o 1:36 (e 24 < 33 < 120)",
    C.prazoEventoSeg - ev.recebidoAosSeg === 96 && ev.recebidoAosSeg < ev.conferidoAosSeg && ev.conferidoAosSeg < C.prazoEventoSeg);
  chk("P·C10 · T14 o evento confere campos, e o '6 de 6' sai daqui (AC-09)", Number.isInteger(ev.campos) && ev.campos > 0, ev.campos + " campos");
  var ma01 = um(M.modelosAtivo, "ma-01");
  var passos = um(M.instalacoes, "i-01").etapas.cicloDinamico.passos;
  var sinais = Object.keys(C.passoDoSinal || {});
  /* pacote 2 (02/10): os passos são os seis do ciclo parado, e a velocidade só entra com tacógrafo digital (decisão 54) */
  chk("P·C10 · T14 o passo de cada sinal: as chaves são sinais dinâmicos do ma-01, e os valores, passos da i-01 (AC-10) — a velocidade só com tacógrafo digital",
    sinais.length > 0 && sinais.every(function (k) { var s = um(ma01.sinaisCan, k); return !!s && s.fase === "dinamico" && passos.indexOf(C.passoDoSinal[k]) >= 0 &&
      (k !== "velocidade" || ma01.tacografoDigital === true); }),
    sinais.map(function (k) { return k + " → " + C.passoDoSinal[k]; }).join(" · ") + " · passos: " + passos.join(", "));
  /* pacote 2 (02/10): a 03 é a rotação zerada do motor-desligado-no-ciclo, não mais a velocidade do can-fora-esperado */
  var md = M.casos["motor-desligado-no-ciclo"], amd = um(M.ativos, md.ativoId), smd = um(um(M.modelosAtivo, amd.modeloAtivoId).sinaisCan, md.passo);
  chk("P·C10 · T14 o 03: o caso motor-desligado-no-ciclo zera um sinal dinâmico do modelo do ativo, fora da faixa, e reprova o passo dele (rotação → Rotação, '0 rpm · ligue o motor')",
    !!smd && smd.fase === "dinamico" && !!smd.faixa && Number(md.lido.split(" ")[0]) < smd.faixa.min && passos.indexOf(C.passoDoSinal[md.passo]) >= 0,
    md.passo + " " + md.lido + " → " + C.passoDoSinal[md.passo]);
  /* retorno do PM (06/10): o 04 saiu — o técnico confere o cartão com o número impresso; a 12 é o ativo sem leitor */
  var ativo = function (i) { return um(M.ativos, i); };
  var sr = M.casos["evento-sem-resposta"], sl = M.casos["sem-leitor"];
  chk("P·C10 · T14 a faixa dos estados é o par do cadastro (a-04 × M2C-0335, a-02 × M2C-0301 · QJF-2C61), e o sem-leitor é o herói, cujo leitor o caso tira",
    !!ativo(sr.ativoId) && ativo(sr.ativoId).moduloSerial === sr.moduloSerial && sr.tentativa === 1 && amd.moduloSerial === "M2C-0301" && amd.placa === "QJF-2C61" &&
    sl.ativoId === "a-01" && sl.leitor === false && !!um(M.modelosAtivo, ativo(sl.ativoId).modeloAtivoId).leitor);
})();

/* ── P·C11 · T11 · conferir configuração: o par que confere (AC-17) e o que a tela lê dos dois casos ── */
(function () {
  var Cd = M.cadeia;
  var ativo = function (id) { return M.ativos.filter(function (a) { return a.id === id; })[0]; };
  var real = function (c) { var a = c && ativo(c.ativoId); return !!a && a.moduloSerial === c.moduloSerial && M.modulos.some(function (m) { return m.serial === c.moduloSerial; }); };
  var cc = M.casos["conferencia-confere"], dd = M.casos["diff-divergente"], ic = M.casos["indice-nao-classificado"];
  chk("P·C11 · T11 AC-17: o par que confere é real (a-01 × M2C-0417), sem valor declarado, e não é o par do diff-divergente",
    real(cc) && cc.ativoId === "a-01" && Object.keys(cc).join(",") === "ativoId,moduloSerial" && !(cc.ativoId === dd.ativoId && cc.moduloSerial === dd.moduloSerial));
  chk("P·C11 · T11 a 00 e a 01: o diff-divergente e o indice-nao-classificado são do mesmo par real (M2C-0438 · ONK-8Q90)",
    real(dd) && real(ic) && dd.ativoId === ic.ativoId && dd.moduloSerial === ic.moduloSerial && ativo(dd.ativoId).placa === "ONK-8Q90");
  /* pacote 2 (02/10): sem versão, a conferência compara conteúdo (decisão 53) — quatro linhas que se comparam e o
     Extended ID só leitura, fora da conta; o Corrigir vai no primeiro que diverge na ordem da cadeia */
  var cmp = dd.divergencias.map(function (d) { return d.bloco; });
  var primeiro = Cd.ordem.filter(function (b) { return cmp.indexOf(b) >= 0; })[0];
  /* o retorno do PM de 09/10: a conferência tem os cinco blocos do script — o Ativo confere (traduz a CAN do
     OF-1621) e os outros quatro divergem ('4 de 5'), na ordem do script; o cadastro é o conteúdo que a cadeia
     grava, e a Conexão diz as duas coisas (rede e servidor da Mobs2, leitura nossa do PM) */
  chk("P·C11 · T11 a 00 (09/10): cinco blocos na ordem do script, o Ativo confere e quatro divergem ('4 de 5'), o cadastro é o conteúdo que a cadeia grava, e o primeiro na ordem da cadeia é o das cercas",
    dd.ordem.length === 5 && cmp.length === 4 && dd.confere.length === 1 && dd.confere[0].bloco === "ativo" &&
    dd.divergencias.every(function (d) { var c = Cd.conteudo[d.bloco];
      return !!c && (d.noCadastro === c || d.noCadastro === Cd.rotulos[d.bloco].toLowerCase() + " " + c || (d.bloco === "conexao" && d.noCadastro === "rede e servidor da Mobs2")); }) &&
    !dd.extendedId && primeiro === "cercas",
    dd.divergencias.map(function (d) { return (d.rotulo || Cd.rotulos[d.bloco]) + " " + d.noCadastro; }).join(" · ") + " · corrige " + primeiro);
  var a = ativo(cc.ativoId), mdl = M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0];
  var pe = M.presetsEvento.filter(function (p) { return p.id === mdl.presetEventoId; })[0];
  var regioes = M.cercas.regioes.filter(function (r) { return r.ativoId === a.id; }).length;
  var perto = (M.situacao.porPerto || []).filter(function (p) { return p.serial === cc.moduloSerial; })[0];
  chk("P·C11 · T11 o 02 pelo cadastro do herói: '4 regiões', 'intervalo 30 s' e o leitor sem fio da sessão, como a referência",
    regioes === 4 && pe.intervaloRastreamentoSeg === 30 && !!perto && perto.meio === "sem-fio", regioes + " · " + pe.intervaloRastreamentoSeg + " s · " + (perto && perto.meio));
  /* pacote 2 (02/10): sai a do custo declarado do 02 (a tradução 'urbano v3' × 'frota v2') — o bloco do ativo
     saiu da conferência, e o diff-divergente não o traz mais (decisão 53) */
  var cr = M.casos["cercas-reenviadas"];
  chk("P·C11 · T11 a 05: o caso cercas-reenviadas é o par do herói, na manutenção, e os que ficam 'revisar em seguida' são o arraste do bloco reenviado (2: o leitor e os eventos)",
    real(cr) && cr.ativoId === "a-01" && cr.modo === "manutencao" && Cd.arraste[cr.reenviado].slice().sort().join(",") === "eventos,leitor",
    cr.reenviado + " → " + Cd.arraste[cr.reenviado].join(", "));
})();

/* ── P·C10 · T13 · checklist: os títulos, a dica e a justificativa (AC-11, AC-12), a leitura nominal (AC-13) e o que a tela deriva ── */
(function () {
  var CK = M.checklist;
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  var secao = function (id) { return um(CK.secoes, id); };
  var item = function (id) { return um(CK.itens, id); };
  chk("P·C10 · T13 o pacote 10: as 6 seções têm o nome curto, e é ele o rótulo de topo do nível do item ('B · MONTAGEM', 'C · HARDWARE')",
    CK.secoes.length === 6 && CK.secoes.every(function (s) { return !!s.rotulo && !("titulo" in s); }) &&
    ("B · " + secao("B").rotulo).toUpperCase() === "B · MONTAGEM" && ("C · " + secao("C").rotulo).toUpperCase() === "C · HARDWARE",
    CK.secoes.map(function (s) { return s.id + " " + s.rotulo; }).join(" · "));
  var B = CK.itens.filter(function (i) { return i.secao === "B"; });
  chk("P·C10 · T13 o pacote 10: o nível do item da T13/07 (título, 'Depois:' e a frase da câmera) e o da T13/09 (título, o rótulo) saem dos itens",
    item("b-modulo").pergunta === "Módulo fixado e posicionado" && B[B.indexOf(item("b-modulo")) + 1].pergunta === "Antena GPS posicionada e livre" &&
    item("b-modulo").enquadre === "Enquadre o módulo e o ponto de fixação" && !item("c-alimentacao").pergunta && item("c-alimentacao").rotulo === "Alimentação");
  chk("P·C10 · T13 o pacote 10: cada foto da Montagem tem a sua frase da câmera (o enquadre), e a dica antiga (instrucao) saiu",
    B.length === 5 && B.every(function (i) { return /^Enquadre /.test(i.enquadre || "") && !("instrucao" in i); }), B.map(function (i) { return i.id; }).join(","));
  chk("P·C10 · T13 AC-12: a justificativa de exemplo não é vazia, e não é a ressalva de outra instalação",
    typeof CK.exemploJustificativa === "string" && CK.exemploJustificativa.length > 0 &&
    M.instalacoes.every(function (i) { return !i.ressalva || i.ressalva.justificativa !== CK.exemploJustificativa; }));
  chk("P·C10 · T13 G8: o relatório leva um número inteiro de evidências (o '12' da T13/06 e da T13/11)", Number.isInteger(CK.evidencias) && CK.evidencias > 0, CK.evidencias);
  var L = M.leituraNominalModulo;
  chk("P·C10 · T13 AC-13: as entradas usadas cabem no total (4 de 4), e o modem lido fica dentro da faixa esperada (−71 em −100 a −60)",
    !!L && L.entradasUsadas <= L.entradasTotal && L.entradasTotal > 0 && L.modemDbm >= L.modemFaixa.min && L.modemDbm <= L.modemFaixa.max,
    L && (L.entradasUsadas + " de " + L.entradasTotal + " · " + L.modemDbm + " em " + L.modemFaixa.min + "…" + L.modemFaixa.max));
  // T13·5 (a): a escala do cartão com barra — bateria 10–16, satélites 0–12, modem −110 a −50 — dá as posições da T13/03
  var pos = function (x, a, b) { return Math.round(((x - a) / (b - a)) * 1000) / 10; };
  var sat = um(um(M.modelosAtivo, "ma-01").sinaisCan, "satelites");
  /* rodada 2: a tensão da bateria saiu da CAN no mock do PM — a alimentação é a do módulo, contra a faixa do
     modelo (a rodada 1, 9,0 a 32,0 V); a conferência dela é a do diagnóstico, logo abaixo */
  var alim = M.diagnostico.modulo.filter(function (l) { return l.id === "alimentacao"; })[0];
  chk("P·C10 · T13 T13·5: a alimentação do herói (24,3 V) fica dentro da faixa do modelo (9,0 a 32,0 V)",
    !!alim && alim.faixa === "9,0 a 32,0 V" && Number(alim.heroi.split(" ")[0].replace(",", ".")) >= 9 && Number(alim.heroi.split(" ")[0].replace(",", ".")) <= 32);
  chk("P·C10 · T13 T13·5: o modem em −110 a −50 dá a faixa de 16,7% a 83,3% e o marcador em 65% (T13/03); o GPS em 0–12 dá 75% (o 56,3% da referência é desvio)",
    pos(L.modemFaixa.min, -110, -50) === 16.7 && pos(L.modemFaixa.max, -110, -50) === 83.3 && pos(L.modemDbm, -110, -50) === 65 && pos(Number(sat.lido), 0, 12) === 75);
  var iso = M.casos["can-estatico-bateria"], lido = Number(iso.alimentacao.split(" ")[0].replace(",", "."));
  /* a rodada 1 do retorno do PM: a alimentação é a do fio do equipamento, contra a faixa do VL06 (9,0 a 32,0 V), na régua de 5 a 35 */
  var ft = um(M.modelos, M.modulos.filter(function (m) { return m.serial === iso.moduloSerial; })[0].modeloId).faixaTensao;
  chk("P·C10 · T13 o 09 e o 16, e a T07/12, pelo caso can-estatico-bateria: a alimentação do M2C-0301 abaixo da faixa do VL06, '0,6 V abaixo', o marcador a 11,3% de 5–35, e ela é o 1º item de C",
    um(M.ativos, iso.ativoId).moduloSerial === iso.moduloSerial && lido < ft[0] && (ft[0] - lido).toFixed(1) === "0.6" && pos(lido, 5, 35) === 11.3 &&
    CK.itens.filter(function (i) { return i.secao === "C"; })[0].id === "c-alimentacao", iso.ativoId + " · " + iso.moduloSerial + " · " + iso.alimentacao);
  var pf = M.casos["pronto-para-fechar"], a09 = um(M.ativos, pf.ativoId);
  chk("P·C10 · T13 o 10 pelo caso pronto-para-fechar (G21): o par é o do cadastro (KNB-5H39 × M2C-0371), e o servidor não respondeu",
    !!a09 && a09.moduloSerial === pf.moduloSerial && pf.recebimento === "sem resposta", a09 && a09.placa + " × " + pf.moduloSerial);
  // G22: a Seção F só conta o que é desta sessão (criadoAs ≥ a abertura, 14:30) — o que o herói subiu às 09:14 e 09:15 é de antes
  var desta = M.filaSaida.filter(function (f) { return f.ativoId === "a-01" && f.diasAtras === 0 && f.criadoAs >= M.HORA_NOMINAL; });
  chk("P·C10 · T13 G22: a fila do herói não tem nada desta sessão (f-05 e f-06 são de antes das 14:30), e a Seção F nasce esperando",
    desta.length === 0 && M.filaSaida.filter(function (f) { return f.ativoId === "a-01"; }).length === 2);
  chk("P·C10 · T13 AC-14: as fontes 'fila:<tipo>' da Seção F são tipos da fila", CK.itens.filter(function (i) { return /^fila:/.test(i.fonte || ""); }).every(function (i) {
    return (M.tiposFila || []).some(function (t) { return "fila:" + t.tipo === i.fonte; }); }));
  // a 00 pela semente (G21, G9): o herói depois da calibração, antes das fotos, do ciclo e da fila.
  // Cada seção recomputada do que a tela lê: A pelo cadastro do par, B pelo que herda, C pelas leituras, D pela cadeia e pelo painel, E e F vazias
  // pacote 2 (02/10): sai o chassi da A (o chassiPelaCan saiu), o Painel não herda mais (a B começa em 0 de 5),
  // a versão gravada sai da D e entra o Extended ID, lido do módulo pelos identificadores (decisões 52 a 54)
  var heroi = um(M.ativos, "a-01"), mod = M.modulos.filter(function (m) { return m.serial === heroi.moduloSerial; })[0], ma = um(M.modelosAtivo, heroi.modeloAtivoId);
  var linha = M.matrizCapacidades.filter(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; })[0];
  var da = function (s) { return CK.itens.filter(function (i) { return i.secao === s; }); };
  var partida = M.calibracao.porModelo[ma.id].calibraveis.filter(function (g) { return M.calibracao.painel[heroi.id][g] != null; });
  var conta = {
    A: linha.firmwares.indexOf(mod.firmware) >= 0 ? da("A").length : 0,
    B: da("B").filter(function (i) { return i.herda === "calibracao"; }).length * (partida.length ? 1 : 0),
    C: [(function (v) { return v >= 9 && v <= 32; })(Number(alim.heroi.split(" ")[0].replace(",", "."))), Number(sat.lido) >= sat.faixa.min, L.entradasUsadas <= L.entradasTotal,
      L.modemDbm >= L.modemFaixa.min && L.modemDbm <= L.modemFaixa.max].filter(Boolean).length,
    D: da("D").filter(function (i) {
      var f = String(i.fonte).split(":");
      if (f[0] === "bloco") return M.cadeia.ordem.indexOf(f[1]) >= 0;
      if (f[0] === "cal") return M.calibracao.painel[heroi.id][f[1]] != null && M.calibracao.porModelo[ma.id].calibraveis.indexOf(f[1]) >= 0;
      if (i.fonte === "identificadores") return M.identificadores.indicesAlocados.length > 0;
      return i.fonte === "servidor" && !!M.cadeia.leituraFinal.servidor;
    }).length,
    E: 0, F: desta.length
  };
  var feitos = Object.keys(conta).reduce(function (s, k) { return s + conta[k]; }, 0);
  /* a rodada 1 do retorno do PM: o herói mostra 29 — a A com 4, a D com 9 (sem as pendências), a E com 5 · a rodada 2:
     o ônibus não calibra, e o Painel sai da B — 28 —, e a semente traz feitos a A, a C e a D: 17 de 28, e Faltam 9
     itens obrigatórios (B 4 + E 5) */
  var doHeroi = CK.itens.filter(function (i) { return i.condicao !== "reescritaId" && i.condicao !== "calibracao"; });
  var n29 = function (sec) { return doHeroi.filter(function (i) { return i.secao === sec; }).length; };
  chk("P·C10 · T13 a 00: 17 de 28 pela semente (A 4 · C 4 · D 9) e 'Faltam 9 itens obrigatórios' (B 4 + E 5)",
    doHeroi.length === 28 && n29("A") + n29("C") + n29("D") === 17 && n29("B") + n29("E") === 9,
    ["A", "B", "C", "D", "E", "F"].map(function (k) { return k + " " + n29(k); }).join(" · "));
})();

/* ── P·C11 · T16 · sessão: o que o encerramento, o autoteste e os dois estados leem (nenhum campo novo, T16-A18) ── */
(function () {
  var um = function (lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; };
  var ativo = function (id) { return um(M.ativos, id); };
  var modelo = function (serial) { var m = M.modulos.filter(function (x) { return x.serial === serial; })[0]; return m && um(M.modelos, m.modeloId); };
  var E = M.autotesteEncerramento;
  /* a rodada 1 do retorno do PM: as sete, nesta ordem, com os valores fixos · o reset de leitura é a condicional, e o evento do cartão não bloqueia */
  chk("P·C11 · T16 as 7 assertivas na ordem da 02 e da 05, com os valores fixos (confere · fechado · restaurado · pendente)",
    E.map(function (a) { return a.rotulo; }).join(" · ") === "Configuração · Contadores · Reset de leitura · ID no cadastro · Canal de programação · Repouso do módulo · Evento do cartão" &&
    E.filter(function (a) { return a.valor; }).map(function (a) { return a.valor; }).join(" · ") === "confere · fechado · restaurado · pendente");
  chk("P·C11 · T16 só o evento do cartão não bloqueia, e só o reset de leitura é condicional",
    E.filter(function (a) { return a.bloqueia === false; }).map(function (a) { return a.id; }).join(",") === "cartao" &&
    E.filter(function (a) { return a.condicional; }).map(function (a) { return a.id; }).join(",") === "reset");
  var heroi = ativo("a-01");
  var varzeaCorte = M.ativos.filter(function (a) { return a.uoId === M.contextoAtivo.uoId && a.moduloSerial && modelo(a.moduloSerial).reinicioPorComando === false; });
  chk("P·C11 · T16 T16·1: o herói (VL06) reinicia por comando, e em Várzea só o KNB-5H39 × M2C-0371 (VL08) pede o corte — a 01",
    modelo(heroi.moduloSerial).reinicioPorComando === true && varzeaCorte.length === 1 && varzeaCorte[0].placa === "KNB-5H39" && varzeaCorte[0].moduloSerial === "M2C-0371",
    varzeaCorte.map(function (a) { return a.placa + " × " + a.moduloSerial; }).join(","));
  var painel = M.calibracao.painel[heroi.id];
  chk("P·C11 · T16 os contadores da 02 são os do painel do herói (482.317 km · 9.640 h), nas unidades da calibração",
    painel.hodometro === 482317 && painel.horimetro === 9640 && um(M.calibracao.grandezas, "hodometro").unidade === "km" && um(M.calibracao.grandezas, "horimetro").unidade === "h");
  chk("P·C11 · T16 'Identificadores 3 de 3': os índices alocados são os cartões do pacote",
    M.identificadores.indicesAlocados.length === 3 && M.identificadores.cartoes.length === 3);
  chk("P·C11 · T16 T16·2: o herói tem 4 regiões (a assertiva de cercas se aplica pelo dado; o texto vai ao diretor) e o a-14 da 05, nenhuma",
    M.cercas.regioes.filter(function (r) { return r.ativoId === heroi.id; }).length === 4 && M.cercas.regioes.filter(function (r) { return r.ativoId === "a-14"; }).length === 0);
  var af = M.casos["autoteste-falhando"], ne = af.noEncerramento;
  /* a rodada 1: três contadores, nunca '7 de 8' — com a falha, 4 aprovadas · 1 não se aplica · 1 pendente */
  chk("P·C11 · T16 a 05: a assertiva que falha no encerramento é uma das 7 e bloqueia, com o lido do caso ('Contadores · 0 km'), e sobram 4 aprovadas",
    !!um(E, ne.assertiva) && um(E, ne.assertiva).bloqueia !== false && ne.lido === "0 km" &&
    E.filter(function (a) { return a.id !== ne.assertiva && !a.condicional && a.bloqueia !== false; }).length === 4 && !!ativo(af.ativoId).moduloSerial,
    um(E, ne.assertiva) && um(E, ne.assertiva).rotulo + " · " + ne.lido);
  var si = M.casos["sessao-interrompida"], Cd = M.cadeia;
  chk("P·C11 · T16 a 06: o par é o do cadastro (QAH-1M67 × M2C-0411), de hoje, e o bloco depois dos 3 confirmados é o do ponto de retomada (Leitor, 'Bloco 4 de 6')",
    ativo(si.ativoId).moduloSerial === si.moduloSerial && ativo(si.ativoId).placa === "QAH-1M67" && si.diasAtras === 0 &&
    Cd.ordem[si.confirmados - 1] === si.ultimoConfirmado && si.pontoRetomada === "Bloco " + (si.confirmados + 1) + " de " + Cd.ordem.length + " — " + Cd.rotulos[Cd.ordem[si.confirmados]],
    si.pontoRetomada);
  /* pacote 1 (02/10): sai a da versão composta (A12.G07), que passava em falso — com o versaoGravada fora do mock e a
     conta da versão quebrando antes, comparava undefined com undefined. Entra o que a T16/06 diz que já foi gravado. */
  chk("P·C11 · T16 a 06: o que já foi gravado sai dos confirmados do caso — a limpeza, o ativo e as cercas, que a tela diz 'o ativo e as cercas'",
    si.confirmados === 3 && Cd.ordem.slice(0, si.confirmados).join(",") === "limpeza,ativo,cercas" && !("versaoGravada" in si), Cd.ordem.slice(0, si.confirmados).join(", "));
})();

/* ── design · a entrega de 24/09 da T02: a lista longa ── */
chk("design · T02 lista longa: 9 garagens em 3 regiões, mais que o limite sem busca, com a empresa do herói intacta", (function () {
  var c = M.casos["lista-longa-garagens"]; if (!c) return false;
  var ucs = c.ucs.map(function (u) { return u.id; });
  return c.uos.length === 9 && c.ucs.length === 3 && c.uos.length > c.limiteSemBusca &&
    c.uos.every(function (u) { return ucs.indexOf(u.ucId) >= 0; }) && M.uos.length === 3; })());
/* a entrega de 26/09 (otimizacao200000000): a fonte da idade, da hora e dos ativos de cada unidade do caso é o
   pacote dela — os três campos saíram das unidades. As duas checagens leem do pacote (protótipo, 26/09). */
function pacoteDoCaso(c, uoId) { return (c.pacotes || []).find(function (x) { return x.uoId === uoId; }) || M.pacotes.find(function (x) { return x.uoId === uoId; }); }
chk("design · T02 lista longa: toda unidade do caso tem um pacote (os seis do caso ou os três do herói), com os cinco grupos e sem cartões (pacote 1)", (function () {
  var c = M.casos["lista-longa-garagens"]; if (!c) return false;
  return c.uos.every(function (u) { var p = pacoteDoCaso(c, u.id); return p && p.contem.ativos > 0 && p.contem.modelosAtivo > 0 && p.contem.conexoes > 0 && p.contem.eventos > 0 && !("cartoes" in p.contem) &&
    !("pacoteIdadeDias" in u) && !("pacoteHora" in u) && !("ativos" in u); }); })());
chk("design · T02 lista longa: as garagens do herói aparecem com o mesmo pacote que o mundo dele", (function () {
  var c = M.casos["lista-longa-garagens"];
  return M.uos.every(function (u) { var l = c.uos.find(function (x) { return x.id === u.id; }); var p = M.pacotes.find(function (x) { return x.uoId === u.id; });
    return l && p && pacoteDoCaso(c, u.id) === p && !(c.pacotes || []).some(function (x) { return x.uoId === u.id; }); }); })());

/* ── design · a empresa vem sempre antes da unidade (T02/05 a 09, T04/07 e 14 · decisão 37, revista) ── */
var emps = M.empresas || [];
chk("design · T02 as empresas do herói: 3 empresas, cada uma com nome e contagem de unidades, sem id repetido",
  emps.length === 3 &&
  emps.every(function (e, ix) { return !!e.id && !!e.nome && e.unidades > 0 && emps.findIndex(function (x) { return x.id === e.id; }) === ix; }),
  emps.map(function (e) { return e.nome + " · " + e.unidades; }).join(" / "));
var empHeroi = emps.filter(function (e) { return e.id === M.empresa.id; });
chk("design · T02 as empresas do herói: a dele está entre elas, com o mesmo nome, e conta as unidades do mundo dele",
  empHeroi.length === 1 && empHeroi[0].nome === M.empresa.nome && empHeroi[0].unidades === M.uos.length,
  empHeroi.length ? empHeroi[0].nome + ": " + empHeroi[0].unidades + " em M.empresas, " + M.uos.length + " em M.uos" : "sem a empresa do herói");
var ue = M.casos["uma-empresa"] || null;
var ueEmpresas = ue && ue.empresas ? ue.empresas : [];
chk("design · T02 uma empresa só: o caso uma-empresa traz uma empresa, a do herói, com o mesmo nome e as unidades do mundo dele",
  ueEmpresas.length === 1 && ueEmpresas[0].id === M.empresa.id && ueEmpresas[0].nome === M.empresa.nome && ueEmpresas[0].unidades === M.uos.length,
  ueEmpresas.map(function (e) { return e.nome + " · " + e.unidades; }).join(" / "));
chk("design · T02 o caso varias-empresas saiu (as três empresas são do mundo do herói)", !M.casos["varias-empresas"]);

/* ── Higiene ── */
var fonte = null;
try { fonte = require("fs").readFileSync(require("path").join(__dirname, "mocks.js"), "utf8"); } catch (e) {}
if (fonte !== null) {
  /* comentário não conta — o header do mocks CITA as leis pelo nome */
  var semComentario = fonte.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  chk("zero Math.random / Date.now / new Date no mocks.js (fora de comentário)",
    semComentario.indexOf("Math.random") < 0 && semComentario.indexOf("Date.now") < 0 && semComentario.indexOf("new Date") < 0);
  chk("zero hex no mocks.js (fora de comentário)", !/#[0-9a-fA-F]{3,8}\b/.test(semComentario));
}

/* ── PM · rodadas 1 e 2 (decisões 44 a 47) ── */
chk("PM: fabricante e modelo nos 3 modelos de ativo", M.modelosAtivo.every(function (m) { return !!m.fabricante && !!m.modelo; }));
/* pacote 2 (02/10): o acréscimo nomeado do pacote 1 acabou (o chassiPelaCan saiu com a T13 nova) — volta a checagem do arquiteto */
chk("PM: nenhum modelo declara mais chassiPelaCan", M.modelosAtivo.every(function (m) { return !("chassiPelaCan" in m); }));
var todosPacotes = (function () { var out = []; (function anda(o) { if (!o || typeof o !== "object") return; if (o.contem && o.uoId) out.push(o); for (var k in o) anda(o[k]); })(M); return out; })();
chk("errata: nenhum pacote leva cartões — conferido em cada contem, não no texto", todosPacotes.length >= 3 && todosPacotes.every(function (p) { return !("cartoes" in p.contem); }));
chk("errata: conexões e eventos de cada pacote recomputados das coleções", todosPacotes.every(function (p) { return p.contem.conexoes === M.conexoes.length && p.contem.eventos === M.eventosEmbarcados.length; }));
chk("errata: as cercas de cada pacote são as regiões da unidade dele", todosPacotes.every(function (p) { return p.contem.cercas === M.cercas.regioes.filter(function (r) { var a = M.ativos.filter(function (x) { return x.id === r.ativoId; })[0]; return a && a.uoId === p.uoId; }).length; }));
chk("errata: a limpeza nunca apaga os identificadores", JSON.stringify(M).indexOf('"apaga":["cercas","identificadores"') < 0);
chk("errata: o M2C-0999 tem o que informa na busca, e continua fora do cadastro", !!M.naBuscaForaCadastro["M2C-0999"] && M.seriaisForaCadastro.indexOf("M2C-0999") >= 0 && !M.modulos.some(function (m) { return m.serial === "M2C-0999"; }));
chk("PM: o pacote sem cartões, 31 itens nos 5 grupos", M.pacotes.every(function (p) { return !("cartoes" in p.contem); }) &&
  (function (c) { return c.ativos + c.conexoes + c.modelosAtivo + c.eventos + c.cercas === 31; })(M.pacotes[0].contem));
chk("06/10: o diagnóstico tem 9 linhas — 8 que contam, com o número do chip, e as mensagens, que só informam — e as 3 travas existem como casos", M.diagnostico.modulo.length === 9 && M.diagnostico.modulo.filter(function (l) { return !l.soInforma; }).length === 8 &&
  ["serial-nao-cadastrado", "modelo-sem-driver", "firmware-fora-matriz"].every(function (k) { return !!M.casos[k]; }));
chk("PM: o modo sai do vínculo — a manutenção é um caso, a instalação é o padrão", M.casos["modulo-ja-deste-ativo"].modo === "manutencao");

/* ── PM · rodada 3 (decisões 52 a 54) ── */
chk("06/10: o checklist tem 30 itens no mock — a A com 4, a D com 10 (as pendências só com o ID reescrito), a E com 5 (o bip só com buzzer), a F com 2", (function (I) { var n = function (s) { return I.filter(function (x) { return x.secao === s; }).length; }; return I.length === 30 && n("A") === 4 && n("D") === 10 && n("E") === 5 && n("F") === 2; })(M.checklist.itens));
chk("06/10: o herói mostra 28 — a D sem as pendências, a B sem o Painel (o ônibus não calibra), e a E com o bip", M.calibracao.porModelo["ma-01"].calibraveis.length === 0 && M.checklist.itens.filter(function (x) { return x.condicao !== "reescritaId" && x.condicao !== "calibracao"; }).length === 28 && M.checklist.itens.some(function (x) { return x.id === "e-bip" && x.condicao === "buzzer"; }));
chk("r3: o Painel é foto a tirar, só quando houve calibração", M.checklist.itens.filter(function (x) { return x.id === "b-painel-legivel" && x.foto && x.condicao === "calibracao" && !x.herda; }).length === 1);
chk("r3: os critérios do servidor sem viagem", JSON.stringify(M.criteriosRegra).indexOf("viage") < 0);
chk("r3: o horímetro é opcional onde existe", M.modelosAtivo.every(function (m) { var c = M.calibracao.porModelo[m.id]; return !c || c.calibraveis.indexOf("horimetro") < 0 || (c.opcionais || []).indexOf("horimetro") >= 0; }));
chk("r3: os casos novos existem, e os que saíram saíram", !!M.casos["cercas-reenviadas"] && !!M.casos["motor-desligado-no-ciclo"] && !M.casos["versao-ilegivel"] && !M.casos["camera-sem-permissao"]);
chk("r3: a fila sem foto de calibração", JSON.stringify(M.filaSaida || []).indexOf("Foto de calibração") < 0);

chk("r3: o can-estatico-bateria monta a T13/09, e os acréscimos nomeados saíram", !!M.casos["can-estatico-bateria"] && M.modelosAtivo.every(function (m) { return !("chassiPelaCan" in m); }) && !M.cadeia.versoes);

/* ── o gate do pacote 2 (pacote 3) ── */
function regioesDo(id) { return M.cercas.regioes.filter(function (r) { return r.ativoId === id || (r.tambemAtivos || []).indexOf(id) >= 0; }).length; }
chk("p3: as regiões de cada ativo das telas — o herói e o PCX-9A17 com 4, o QAH-1M67 com 4, o OCT-2J85 sem nenhuma", regioesDo("a-01") === 4 && regioesDo("a-03") === 4 && regioesDo("a-13") === 4 && regioesDo("a-10") === 0);
chk("p3: o herói declara o Extended ID do módulo, só leitura", M.modulos.filter(function (m) { return m.serial === "M2C-0417" && m.extendedId && m.extendedId.cartoes === 3 && m.extendedId.ibuttons === 1; }).length === 1);
chk("p3: sem as sobras da calibração e da viagem", JSON.stringify(M).indexOf('"itemChecklist"') < 0 && JSON.stringify(M).indexOf('"viagens"') < 0 && !("foto" in heroi.etapas.calibracao));
chk("p3: a Seção E se chama Ciclo de testes", M.checklist.secoes.filter(function (x) { return x.id === "E" && x.rotulo === "Ciclo de testes"; }).length === 1);

/* ── o pacote 12 · os casos das pendências desenhadas (padrão até o PM decidir) ── */
(function () {
  var C = M.casos, heroiSerial = M.ativos.filter(function (a) { return a.id === "a-01"; })[0].moduloSerial;
  /* retorno do PM (06/10): o critério é a antena, e os satélites são informação */
  chk("p12: o gps-fraco é o módulo do herói, com a antena desconectada (T13/21, 22)",
    C["gps-fraco"].moduloSerial === heroiSerial && C["gps-fraco"].antena === "desconectada");
  chk("p12: a entrada-ignicao é o módulo do herói, e o lido difere do esperado (T13/23, 24)",
    C["entrada-ignicao"].moduloSerial === heroiSerial && C["entrada-ignicao"].entradas.ignicao !== C["entrada-ignicao"].entradas.esperado);
  chk("p12: o evento-nao-chega-de-novo é o par do evento-sem-resposta, com as duas tentativas estourando (T14/09)",
    C["evento-nao-chega-de-novo"].ativoId === C["evento-sem-resposta"].ativoId && C["evento-nao-chega-de-novo"].moduloSerial === C["evento-sem-resposta"].moduloSerial && C["evento-nao-chega-de-novo"].tentativasQueEstouram === 2);
  /* retorno do PM (06/10): a correção do identificador saiu, com o caso */
  chk("p12: a fila-parada passa dos 30 min das pendências, e tem envios esperando (T04/16)",
    parseInt(C["fila-parada"].fila.paradaHa, 10) > 30 && C["fila-parada"].fila.esperando > 0);
})();

/* ── os pacotes 13 e 23 · o que cada caso da Seção C devolve a cada Reler o módulo: a 1ª ainda reprova, a 2ª passa ── */
(function () {
  var C = M.casos, num = function (t) { return Number(String(t).split(" ")[0].replace(",", ".")); };
  /* retorno do PM (06/10): a alimentação é a do fio do equipamento, contra a faixa do modelo do módulo (VL06: 9,0 a 32,0 V) */
  var mod = M.modulos.filter(function (m) { return m.serial === C["can-estatico-bateria"].moduloSerial; })[0];
  var ft = M.modelos.filter(function (m) { return m.id === mod.modeloId; })[0].faixaTensao, bat = { min: ft[0], max: ft[1] };
  var naRede = M.diagnostico.modulo.filter(function (l) { return l.id === "modem"; })[0].heroi;
  var passa = {
    "can-estatico-bateria": function (r) { return num(r.alimentacao) >= bat.min && num(r.alimentacao) <= bat.max; },
    "gps-fraco": function (r) { return r.antena === "conectada"; },
    "entrada-ignicao": function (r) { return r.entradas.ignicao === r.entradas.esperado; },
    "modem-sem-sinal": function (r) { return r.modem === naRede; }
  };
  chk("p23: os quatro casos (a alimentação contra a faixa do VL06, o GPS pela antena) da C têm duas releituras, a 1ª ainda reprova e a 2ª passa (T13/34 a 37, 30 a 33)",
    Object.keys(passa).every(function (k) { var l = C[k].releituras; return l && l.length === 2 && !passa[k](l[0]) && passa[k](l[1]); }));
})();

console.log(falhas ? "\nGATE REPROVADO — " + falhas + " falha(s)" : "\nGATE APROVADO — todas as âncoras recomputadas conferem");
if (typeof process !== "undefined") process.exitCode = falhas ? 1 : 0;
