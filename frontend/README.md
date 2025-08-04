# Frontend Next.js + Tailwind - Lord of Mysteries SaaS

## Instalação
```
cd frontend
npm install
```

## Execução
```
npm run dev
```

## Estrutura
- `src/pages/` — Páginas do site
- `src/components/` — Componentes reutilizáveis
- `src/services/` — Consumo da API FastAPI
- `src/styles/` — Configuração Tailwind

## Consumo da API
- Exemplo de chamada:
```ts
// src/services/api.ts
export async function getContent() {
  const res = await fetch('http://localhost:8000/api/content');
  return res.json();
}
```

## Responsividade
- Utiliza Tailwind para adaptar a qualquer tela (desktop, tablet, mobile)

## Integração
- O frontend consome os dados do backend Python (textos, imagens, links)
- Interface moderna, rápida e escalável
