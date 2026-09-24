// O mostrador do sinal (folha 7, T08): uma peça, três estados.
//   apagado → tracejado, o traço no lugar do valor
//   relendo → acende quando o sinal responde
//   aceso   → a leitura inteira concluída
// O nome do sinal reserva duas linhas, pra grade não pular. A pele (fundo e
// borda) são duas camadas: a acesa entra por opacidade (150ms · T08).
// `unidade` (C8 · T08, G11): a unidade junto do valor (km, V, km/h, °C, rpm,
// %, L/h), menor e apagada, com o espaço dentro dela, como as referências
// 01 e 02 da T08 desenham. Sem ela, nada muda.
import './Mostrador.css'

export function Mostrador({ estado = 'apagado', valor, unidade, nome }) {
  return (
    <div className={`ds-mostrador ds-mostrador-${estado}`}>
      <span className="ds-mostrador-valor">{valor}{unidade != null && <span className="ds-mostrador-unidade">{` ${unidade}`}</span>}</span>
      <span className="ds-mostrador-nome">{nome}</span>
    </div>
  )
}
