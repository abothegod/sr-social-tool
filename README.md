# 🍄 Shroom Room — Content Studio
For test purposes and for education purpose only. 

AI-powered content generator for Instagram posts, blog articles, and email campaigns.

## Setup on Vercel

1. Push this repo to GitHub
2. Go to vercel.com → Import project → select this repo
3. In Vercel project settings → **Environment Variables**, add:
   - Key: `VITE_ANTHROPIC_KEY`
   - Value: your Anthropic API key (get it from console.anthropic.com)
4. Deploy!

## Local Development

```bash
npm install
```

Create a `.env.local` file:
```
VITE_ANTHROPIC_KEY=sk-ant-your-key-here
```

```bash
npm run dev
```

Open http://localhost:5173
