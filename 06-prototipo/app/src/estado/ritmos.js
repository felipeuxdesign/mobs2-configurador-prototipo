// Os ritmos dos processos do protótipo — espelho da tabela de
// 03-design-system/movimento.md (linhas 30–39). Não são tokens: com
// reduzir movimento, o processo segue no mesmo ritmo (movimento.md:47).
// Processo sem ritmo declarado entra aqui só depois de declarado em
// movimento.md, no ciclo da tela (G4).
export const RITMOS = {
  preChecagemLinhaMs: 600,   // pré-checagem · cada linha
  cadeiaBlocoMs: 1000,       // cadeia · cada bloco, gravado e relido
  conferenciaLinhaMs: 400,   // conferência da T11 · cada linha
  encerramentoPassoMs: 600,  // encerramento · cada passo
  autotesteAssertivaMs: 400, // autoteste · cada assertiva
  cicloPassoMs: 3000,        // ciclo dinâmico · cada passo do veículo
  prazoFator: 4,             // prazo do evento · 1 s real vale 4 s de prazo
  sincronizacaoTotalMs: 4000 // sincronização do pacote · 4 s no total
}
