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
var idv = M.casos["identificador-divergente"] || null;
/* caso pode viver como exemplos dentro de um caso único */
var divTipos = [];
Object.keys(M.casos).forEach(function (k) {
  var c = M.casos[k];
  if (c && c.tipoDivergencia) divTipos.push(c.tipoDivergencia);
  if (c && c.exemplos) c.exemplos.forEach(function (e) { divTipos.push(e.tipo); });
});
chk("divergência de identificador: zeros à esquerda E prefixo",
  divTipos.indexOf("zeros à esquerda") >= 0 && divTipos.indexOf("prefixo") >= 0, divTipos.join(" · "));

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
chk("herói RKT-8H42 · VL06 CAN-BT · M2C-0417 · aprovado, história completa",
  heroiAtivo && heroiAtivo.placa === "RKT-8H42" && heroiAtivo.moduloSerial === "M2C-0417" &&
  heroi && heroi.estado === "aprovada" && heroi.etapas &&
  heroi.etapas.cadeia.length === 6 && heroi.etapas.autoteste.passaram === 8 &&
  heroi.etapas.checklist.concluidos === heroi.etapas.checklist.itens && heroi.etapas.calibracao.foto === true);

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
chk("cercas: 2 áreas × 2 = 4 regiões", M.cercas.areas.length === 2 && M.cercas.regioes.length === 4);
chk("pool de índices esgotado nos DOIS limites", !!M.casos["pool-esgotado"] &&
  M.casos["pool-esgotado"].regioesUsadas === M.casos["pool-esgotado"].regioesMax &&
  M.casos["pool-esgotado"].posicoesUsadas === M.casos["pool-esgotado"].posicoesMax);

/* ── Casos obrigatórios ── */
var OBRIGATORIOS = ["serial-nao-cadastrado", "modelo-sem-driver", "firmware-fora-matriz",
  "conteudo-nao-cabe", "pool-esgotado", "ativo-fora-pacote", "divergencia-chassi",
  "conflito-pinos-resolvivel", "conflito-pinos-sem-saida", "can-fora-esperado",
  "sinal-aguardando-ciclo", "grandeza-indisponivel", "diff-divergente",
  "indice-nao-classificado", "autoteste-falhando", "sessao-interrompida",
  "canal-aberto", "identificador-divergente"];
OBRIGATORIOS.forEach(function (k) { chk("caso: " + k, !!M.casos[k]); });
chk("diff divergente cobre os 5 blocos", M.casos["diff-divergente"] &&
  M.casos["diff-divergente"].divergencias.map(function (d) { return d.bloco; }).sort().join(",") === "ativo,cercas,conexao,eventos,leitor");
chk("casos apontam para ativos/módulos reais", OBRIGATORIOS.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; }) && k !== "serial-nao-cadastrado") return false;
  return true;
}));
chk("autoteste: 8 assertivas nomeadas", M.autotesteAssertivas.length === 8 &&
  M.autotesteAssertivas.indexOf(M.casos["autoteste-falhando"].assertiva) >= 0);

/* ── C10 · T06 ── */
chk("C10: frota em todos os 24 ativos, únicas", M.ativos.every(function (a) { return /^\d{4}$/.test(a.frota); }) &&
  M.ativos.map(function (a) { return a.frota; }).filter(function (v, ix, arr) { return arr.indexOf(v) === ix; }).length === 24);
chk("C10: chassiPelaCan declarado nos 3 modelos, 1 sim", M.modelosAtivo.every(function (m) { return typeof m.chassiPelaCan === "boolean"; }) &&
  M.modelosAtivo.filter(function (m) { return m.chassiPelaCan; }).length === 1);
chk("C10: leitor + leituraCan nos 3 modelos", M.modelosAtivo.every(function (m) { return m.leitor && m.leitor.tipo && (m.leituraCan === "barramento" || m.leituraCan === "gateway"); }));
chk("C10: casos de pinos com consumidores e meioAtual; ocupadoPor intacto", ["conflito-pinos-resolvivel", "conflito-pinos-sem-saida"].every(function (k) {
  var c = M.casos[k]; return c && c.consumidores && c.consumidores.length >= 2 && c.meioAtual === "cabo" && c.ocupadoPor === "sensor de porta"; }));
chk("C10: resolvível fala sem fio, sem saída não", (function () {
  function semFio(k) { var c = M.casos[k]; var mod = M.modulos.find(function (x) { return x.serial === c.moduloSerial; });
    var l = M.matrizCapacidades.find(function (r) { return r.modeloId === mod.modeloId && r.variante === mod.variante; }); return !!(l && l.semFio); }
  return semFio("conflito-pinos-resolvivel") === true && semFio("conflito-pinos-sem-saida") === false; })());
chk("C10: divergência de chassi por dígitos transpostos, mesmo comprimento", (function () {
  var c = M.casos["divergencia-chassi"]; var a = M.ativos.find(function (x) { return x.id === c.ativoId; });
  return a.chassi === c.chassiCadastro && c.chassiLido.length === c.chassiCadastro.length && c.chassiLido !== c.chassiCadastro &&
    c.chassiLido.split("").sort().join("") === c.chassiCadastro.split("").sort().join(""); })());

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
chk("P·C1 DDIs: três países, máscaras de comprimentos distintos", M.ddis.length === 3 &&
  M.ddis.map(function (d) { return (d.mascara.match(/#/g) || []).length; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length === 3);
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
  var m = M.calibracao.porModelo[k]; return m.indisponiveis.every(function (i) { return m.calibraveis.indexOf(i.grandeza) < 0; }); }));
chk("P·C1 calibração: todo modelo de ativo tem regra de calibração", M.modelosAtivo.every(function (m) { return !!M.calibracao.porModelo[m.id]; }));
chk("P·C1 checklist: 31 itens = 4 + 5 + 4 + 10 + 5 + 3", M.checklist.itens.length === 31 &&
  JSON.stringify(M.checklist.secoes.map(function (s) { return M.checklist.itens.filter(function (i) { return i.secao === s.id; }).length; })) === "[4,5,4,10,5,3]");
chk("P·C1 checklist: todo item aponta uma seção que existe", M.checklist.itens.every(function (i) { return M.checklist.secoes.some(function (s) { return s.id === i.secao; }); }));
chk("P·C1 ciclo: o evento chega e confere dentro do prazo (24 < 33 < 120 s)", (function () {
  var c = M.ciclo; return 0 < c.evento.recebidoAosSeg && c.evento.recebidoAosSeg < c.evento.conferidoAosSeg && c.evento.conferidoAosSeg < c.prazoEventoSeg; })());
chk("P·C1 ciclo: a fila do módulo tem mensagens e diagnóstico", M.ciclo.mensagensGuardadas.mensagens > 0 && M.ciclo.mensagensGuardadas.diagnostico > 0);
chk("P·C1 autoteste de encerramento: 8 assertivas, 1 condicional", M.autotesteEncerramento.length === 8 &&
  M.autotesteEncerramento.filter(function (a) { return a.condicional; }).length === 1);
chk("P·C1 critérios: a regra cobre todo estado de instalação", M.instalacoes.every(function (i) { return !!M.criteriosRegra.porEstado[i.estado]; }));
chk("P·C1 pacotes: os limiares batem com as três idades (1d ok · 4d aviso · 8d bloqueio)", M.pacotes.every(function (p) {
  var l = p.limiares; return l && typeof l.avisoDias === "number" && typeof l.bloqueioDias === "number"; }) &&
  M.pacotes.map(function (p) { return p.diasAtras; }).join(",") === "1,4,8");
var SEM_GATE = ["conexao-falha", "link-perdido", "modulo-em-repouso", "modulo-com-pendencias", "can-estatico-isolado", "can-estatico-ausente",
  "can-estatico-dominio", "can-estatico-hodometro", "bloco-recusado", "queda-na-cadeia", "pronto-para-fechar", "evento-sem-resposta"];
chk("P·C1 os 12 casos sem conferência apontam ativo e módulo reais", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c) return false;
  if (c.ativoId && !M.ativos.some(function (a) { return a.id === c.ativoId; })) return false;
  if (c.moduloSerial && !M.modulos.some(function (m) { return m.serial === c.moduloSerial; })) return false;
  return true; }));
chk("P·C1 casos de módulo: o par ativo × módulo é o do cadastro", SEM_GATE.every(function (k) {
  var c = M.casos[k]; if (!c.ativoId || !c.moduloSerial) return true;
  var a = M.ativos.find(function (x) { return x.id === c.ativoId; }); return a.moduloSerial === c.moduloSerial; }));
chk("P·C1 sync-falha-rede aponta um pacote que existe", M.pacotes.some(function (p) { return p.id === M.casos["sync-falha-rede"].pacoteId; }));
chk("P·C1 a cadeia tem 6 passos e 5 blocos versionados", M.cadeia.ordem.length === 6 && M.cadeia.ordem[0] === "limpeza");

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

console.log(falhas ? "\nGATE REPROVADO — " + falhas + " falha(s)" : "\nGATE APROVADO — todas as âncoras recomputadas conferem");
if (typeof process !== "undefined") process.exitCode = falhas ? 1 : 0;
