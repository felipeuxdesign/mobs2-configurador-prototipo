// Os ritmos dos processos do protótipo — espelho da tabela de
// 03-design-system/movimento.md (linhas 30–39). Não são tokens: com
// reduzir movimento, o processo segue no mesmo ritmo (movimento.md:47).
// Processo sem ritmo declarado entra aqui só depois de declarado em
// movimento.md, no ciclo da tela (G4).
export const RITMOS = {
  diagnosticoLinhaMs: 600,   // diagnóstico · cada linha (T07, o pacote 1): as sete do módulo depois da conexão, e os sinais da CAN no Ler de novo
  cadeiaBlocoMs: 1000,       // cadeia · cada bloco, gravado e relido
  conferenciaLinhaMs: 400,   // conferência da T11 · cada linha
  encerramentoPassoMs: 600,  // encerramento · cada passo
  autotesteAssertivaMs: 400, // autoteste · cada assertiva
  cicloPassoMs: 3000,        // ciclo dinâmico · cada passo do veículo: o passo k acende a k × 3 s do disparo (+9, +12 e +15 s · T14·1)
  cicloPassosNaEntrada: 2,   // ciclo dinâmico · os passos que a semente já traz feitos antes do disparo (T14·1 · C10)
  filaDrenagemMs: 3000,      // ciclo dinâmico · a fila do módulo drena antes do disparo, 3 s no total (G4, T14-D11 · C10)
  prazoFator: 4,             // prazo do evento · 1 s real vale 4 s de prazo
  sincronizacaoTotalMs: 4000, // sincronização do pacote · 4 s no total
  cronometroCodigoMs: 1000,   // cronômetro do código (T01) · 1 s real vale 1 s de prazo e de reenvio (T01·1)
  semearGravandoMs: 1000,     // semear da calibração (T10) · Gravando no módulo… (T10 animacao.md, a entrega de 25/09)
  semearRelendoMs: 1000,      // semear da calibração (T10) · Relendo…, e aí o tambor rola e a tela vira o semeado ou o não confere
  bipMs: 1000,                // o Testar bip do checklist (T13/39, a rodada 1): o buzzer toca por cerca de 1 s (o pulso do PM, exemplo até a bancada)
  relerModuloMs: 1000,        // o detalhe do item reprovado (T13, o pacote 13) · Relendo o módulo…, o mesmo tempo do Relendo… da T10, e aí a tela fica positiva
  // busca da T05 · a busca de novo (o Procurar de novo, a otimização do design): o quadro da busca da
  // T05/00 fica na tela 1,2 s, e a lista volta. O número é do arquiteto (a última entrega, o
  // animacao.md da T05 e o movimento.md): 400 ms passaria sem o técnico ver que buscou
  buscaMs: 1200,
  // a CAN ao vivo da T07 (o pacote 9): uma leitura nova a cada 1 s, o número troca no lugar
  canAoVivoMs: 1000,
  // o Entrar do login · a espera da resposta do servidor (decisão do diretor, 27/09): no
  // protótipo, um tempo fixo, sem relógio. O primário diz Entrando…, desabilitado, como o
  // Gravando no módulo… da T10: abaixo de 1 s o texto só pisca; 1,2 s é o bastante pra
  // ver que o login não vai direto
  entrarEsperaMs: 1200,
}
