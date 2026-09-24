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

/* ── P·C4 · entrar: o login e a sincronização (gate C4) ── */
chk("P·C4 código errado: seis dígitos, diferente do código", /^\d{6}$/.test(rec.codigoErrado) && rec.codigoErrado !== rec.codigo);
chk("P·C4 entrar: a senha do mock passa do mínimo de 8", cred.minimoEntrar === 8 && cred.senha.length >= cred.minimoEntrar);
chk("P·C4 requisitos: seis, o mínimo 10, e a senha nova cumpre os verificáveis", (function () {
  var r = cred.requisitosSenha, s = rec.novaSenha; if (!r || r.length !== 6) return false;
  var min = r[0].minimo; return r[0].id === "tamanho" && min === 10 && s.length >= min && r[5].verificavelNoAparelho === false; })());
chk("P·C4 pacotes: a estimativa dá ~40 s com 7 itens por baixar em Várzea", (function () {
  var p = M.pacotes[0], c = p.contem, total = c.ativos + c.modelosAtivo + c.cartoes;
  return total === 16 && Math.round((total - 9) * p.segPorItem / 10) * 10 === 40; })());
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
  var menu = fila.filter(function (f) { return f.estado !== "recebida" && uoDe(f.ativoId) === uo; });
  chk("P·C5 · T04 o contador do menu: o que não chegou, só da garagem ativa (T04·1 b · 2)", menu.length === 2,
    menu.map(function (f) { return f.id; }).join(","));
  var sair = fila.filter(function (f) { return f.estado === "na-fila"; });
  chk("P·C5 · T04 o diálogo de sair: o que está na fila, de todas as garagens (T04·1 b · 3)", sair.length === 3,
    sair.map(function (f) { return f.id; }).join(","));
  chk("P·C5 · T04 a folha da garagem no 08: uma evidência subindo", fila.filter(function (f) { return f.estado === "enviando"; }).length === 1);
  var manuais = M.checklist.secoes.filter(function (s) { return s.natureza === "manual" || s.natureza === "dinamico"; }).map(function (s) { return s.id; });
  var abertos = M.checklist.itens.filter(function (i) { return manuais.indexOf(i.secao) >= 0; });
  chk("P·C5 · T04 o contador do checklist: B + E, os que o técnico resolve (T04·2 b · 10)", manuais.join("") === "BE" && abertos.length === 10, abertos.length);
  var ac = M.situacao.sessaoAcesso;
  chk("P·C5 · T04 a folha da conta: restam 2 de 7 dias, já no aviso", ac.validadeDias - ac.abertaDiasAtras === 2 && ac.validadeDias === 7 && ac.abertaDiasAtras >= ac.avisoNoDia);
  chk("P·C5 · T04 a folha da garagem: só o Pátio Caruaru passa do limite (8 > 7)", M.pacotes.filter(function (p) { return p.diasAtras > p.limiares.bloqueioDias; }).map(function (p) { return p.uoId; }).join(",") === "uo-03");
})();

/* ── P·C4 · T03 · sincronizar: as regras que a tela lê do pacote (nenhum campo novo) ── */
(function () {
  var ORDEM = ["modelosAtivo", "ativos", "cartoes"]; /* T03·1: Modelos → Ativos → Cartões, um item por tick */
  var total = function (p) { return ORDEM.reduce(function (s, k) { return s + p.contem[k]; }, 0); };
  var feito = function (p, n) { var r = {}; ORDEM.forEach(function (k) { r[k] = Math.min(n, p.contem[k]); n -= r[k]; }); return r; };
  var v = M.pacotes.filter(function (p) { return p.uoId === M.contextoAtivo.uoId; })[0], q = feito(v, 9);
  chk("P·C4 · T03 o quadro da 00: 9 itens na ordem dão Modelos 3 de 3, Ativos 6 de 10, Cartões 0 (T03·1)",
    total(v) === 16 && q.modelosAtivo === 3 && q.ativos === 6 && v.contem.ativos === 10 && q.cartoes === 0, JSON.stringify(q));
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
  var sinal = function (ativoId, id) {
    var a = M.ativos.filter(function (x) { return x.id === ativoId; })[0];
    return M.modelosAtivo.filter(function (m) { return m.id === a.modeloAtivoId; })[0].sinaisCan.filter(function (s) { return s.id === id; })[0];
  };
  var iso = M.casos["can-estatico-isolado"], bat = sinal(iso.ativoId, "bateria"), lido = lidoNum(iso.lidos.bateria);
  chk("P·C8 · T07 o caso isolado cai fora da faixa, abaixo do mínimo (10,9 < 12,0)", !dentro(bat.faixa, lido) && lido < bat.faixa.min, lido + " em " + bat.faixa.min + "–" + bat.faixa.max);
  chk("P·C8 · T07 o '1,1 V abaixo do mínimo' é min − lido", (bat.faixa.min - lido).toFixed(1).replace(".", ",") === "1,1");
  var aus = M.casos["can-estatico-ausente"];
  chk("P·C8 · T07 o caso ausente não tem leitura num sinal com faixa (satélites)", aus.lidos.satelites === null && !!sinal(aus.ativoId, "satelites").faixa);
  var ma01 = M.modelosAtivo.filter(function (m) { return m.id === "ma-01"; })[0].sinaisCan;
  var din = ma01.filter(function (s) { return s.fase === "dinamico"; });
  chk("P·C8 · T07 o resumo dos que fecham andando, com o rótulo curto: 5 sinais, 'Alternador · Velocidade · Ré · Rotação · Consumo'",
    din.length === 5 && din.map(function (s) { return s.rotuloCurto || s.rotulo; }).join(" · ") === "Alternador · Velocidade · Ré · Rotação · Consumo",
    din.map(function (s) { return s.rotuloCurto || s.rotulo; }).join(" · "));
  chk("P·C8 · T07 o contador da 00: 7 estáticos de 12 sinais no ma-01", ma01.length === 12 && ma01.filter(function (s) { return s.fase === "estatico"; }).length === 7);
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
  var cp = M.casos["conflito-pinos-resolvivel"], doCaso = perto.filter(function (p) { return p.serial === cp.moduloSerial; })[0];
  chk("P·C6 · T05 por perto: o meio do M2C-0335 é o meioAtual do conflito-pinos-resolvivel", !!doCaso && doCaso.meio === cp.meioAtual, doCaso && doCaso.meio);
  var mod = modulo(heroi.moduloSerial), l = linha(mod);
  var modelo = M.modelos.filter(function (m) { return m.id === mod.modeloId; })[0];
  var conteudo = M.modelosAtivo.filter(function (m) { return m.id === heroi.modeloAtivoId; })[0].conteudoRegistros;
  var regioes = M.cercas.regioes.filter(function (r) { return r.ativoId === heroi.id; }).length;
  chk("P·C6 · T05 a pré-checagem do herói aprova pelo cadastro (T05/05: VL06 CAN-BT · 2.3.5 · 128 de 192 · 4 de 4)",
    modelo.driverV1 && l.firmwares.indexOf(mod.firmware) >= 0 && l.can && conteudo <= l.capacidadeRegistros && regioes <= l.regioesMax &&
    [modelo.nome + " " + mod.variante, mod.firmware, conteudo + " de " + l.capacidadeRegistros, regioes + " de " + l.regioesMax].join(" · ") === "VL06 CAN-BT · 2.3.5 · 128 de 192 · 4 de 4");
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
  chk("P·C9 · T10 os passos: o herói 2 (hodômetro, horímetro) · o a-09 3 (rotação, velocidade, hodômetro) · o a-22 1 (só o hodômetro)",
    p01.calibraveis.join(",") === "hodometro,horimetro" && p09.calibraveis.join(",") === "rotacao,velocidade,hodometro" && p22.calibraveis.join(",") === "hodometro",
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
  var item = M.checklist.itens.filter(function (i) { return i.id === C.itemChecklist.id; })[0];
  chk("P·C9 · T10 a foto do painel vale no item da Seção B (HU-T10-4): o item existe, é da B e herda da calibração",
    !!item && item.secao === C.itemChecklist.secao && C.itemChecklist.secao === "B" && item.herda === "calibracao" && item.foto === true);
})();

/* ── P·C9 · T09 · configurar módulo: o que a cadeia lê de M.cadeia e dos dois casos (nenhum campo novo) ── */
(function () {
  var Cd = M.cadeia, ordem = Cd.ordem;
  var versionados = ordem.filter(function (b) { return !!Cd.versoes[b]; });
  chk("P·C9 · T09 os 6 passos têm rótulo, e só a limpeza não tem versão (5 blocos versionados)",
    ordem.every(function (b) { return !!Cd.rotulos[b]; }) && versionados.length === 5 && !Cd.versoes.limpeza && ordem.indexOf("conexao") === ordem.length - 1,
    versionados.join(","));
  chk("P·C9 · T09 a prova da 04: as versões na ordem canônica dão A12.G07.L02.E05.C03, dos seis blocos",
    versionados.map(function (b) { return Cd.versoes[b]; }).join(".") === "A12.G07.L02.E05.C03" && ordem.length === 6);
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
  var DOS_PARES = ["conexao-falha", "link-perdido", "modulo-em-repouso", "modulo-com-pendencias", "canal-aberto", "modelo-sem-driver", "conteudo-nao-cabe"];
  chk("P·C7 · T05 os casos da T05 apontam o par ativo × módulo do cadastro", DOS_PARES.every(function (k) { return par(M.casos[k]); }),
    DOS_PARES.filter(function (k) { return !par(M.casos[k]); }).join(",") || undefined);
  chk("P·C7 · T05 o link cai e o módulo dorme dentro das onze checagens (6 e 9)", ["link-perdido", "modulo-em-repouso"].every(function (k) {
    var n = M.casos[k].naChecagem; return n >= 1 && n <= 11; }), M.casos["link-perdido"].naChecagem + " · " + M.casos["modulo-em-repouso"].naChecagem);
  var pool = M.casos["pool-esgotado"], ativoPool = M.ativos.filter(function (a) { return a.id === pool.ativoId; })[0];
  chk("P·C7 · T05 o pool esgotado aponta um ativo com módulo cadastrado (a-05 × M2C-0348)", !!ativoPool && M.modulos.some(function (m) { return m.serial === ativoPool.moduloSerial; }),
    ativoPool && ativoPool.moduloSerial);
})();

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
