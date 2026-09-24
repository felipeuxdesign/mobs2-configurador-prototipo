import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// A app lê o mock (04-dados), os tokens (03-design-system), a fonte e a marca
// (05-recursos) de fora da própria pasta — os arquivos continuam onde estão
// (publicar.md). O fs.allow libera a raiz do repositório para o servidor de dev.
const aqui = dirname(fileURLToPath(import.meta.url))
const raiz = resolve(aqui, '../..')

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, fs: { allow: [raiz] } },
  preview: { port: 4173, strictPort: true },
})
