// O mostrador do sinal (folha 7, T08): uma peça, três estados.
//   apagado → tracejado, o traço no lugar do valor
//   relendo → acende quando o sinal responde
//   aceso   → a leitura inteira concluída
// O nome do sinal reserva duas linhas, pra grade não pular. A pele (fundo e
// borda) são duas camadas: a acesa entra por opacidade (150ms · T08).
import './Mostrador.css'

export function Mostrador({ estado = 'apagado', valor, nome }) {
  return (
    <div className={`ds-mostrador ds-mostrador-${estado}`}>
      <span className="ds-mostrador-valor">{valor}</span>
      <span className="ds-mostrador-nome">{nome}</span>
    </div>
  )
}
