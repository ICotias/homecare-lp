# HomeCare — Landing Page (estudo de caso)

Site estático (HTML + CSS + JS, sem build) apresentando o app HomeCare.
Todas as mídias são locais em `media/` (imagens `.webp` e vídeos `.mp4`).

## Rodar localmente
Basta abrir `index.html` no navegador. Ou servir:

```bash
npx serve .
```

## Deploy no Vercel

### Opção A — Dashboard (recomendada, sem CLI)
1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project → Import** o repositório.
3. Framework preset: **Other**. Build command: *(vazio)*. Output directory: `.`
4. **Deploy**. Pronto — Vercel serve o `index.html` na raiz.

### Opção B — CLI
```bash
npm i -g vercel
vercel        # preview
vercel --prod # produção
```

## Estrutura
```
index.html        # página única
vercel.json       # cache de mídia + cleanUrls
media/img/*.webp  # screenshots otimizados
media/video/*.mp4 # demos (com poster .webp)
```
