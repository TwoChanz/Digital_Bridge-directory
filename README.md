### 📁 `README.md`

```markdown
# 🏗️ Digital Blueprint – The Construction Tech Directory

**Digital Blueprint** is a curated directory of the best digital tools for the AEC (Architecture, Engineering, Construction) industry — from BIM software to drone mapping, AR/VR, and estimating platforms.

> Built with Next.js, Supabase, and TailwindCSS. Deployed on Vercel. Tracked with Plausible Analytics.

---

## 🚀 Features

- 🔍 Filterable tech directory with categories, tags, and toolcards
- 🧩 Supabase-powered backend (Postgres + Storage)
- 📊 Plausible event tracking (views, clicks, CTA)
- 🧠 Coming soon: AI-powered enrichment + affiliate automation
- 🌘 Full dark mode + responsive layout
- 📝 Community tool submission form

---

## 🛠️ Tech Stack

| Area        | Tool / Library                         |
|-------------|----------------------------------------|
| Frontend    | [Next.js](https://nextjs.org), [React](https://reactjs.org) |
| Styling     | [Tailwind CSS](https://tailwindcss.com), ShadCN UI |
| Backend     | [Supabase](https://supabase.com) (PostgreSQL, Storage) |
| Deployment  | [Vercel](https://vercel.com)           |
| Analytics   | [Plausible](https://plausible.io)      |
| Enhancements| MindPal (coming soon), Aider CLI (dev assistant) |

---

## 📂 File Structure

```
/
├── app/                   # Next.js routes (incl. blog, categories, submit)
├── components/            # UI + layout components
│   └── ui/                # Reusable primitives (button, card, etc.)
├── lib/                   # Supabase client, analytics, helpers
├── styles/                # Tailwind config, global.css
├── public/                # Fallback assets, logos, favicon
├── scripts/               # Enrichment + automation (coming soon)
├── .env.local             # Environment variables
├── README.md              # This file
└── ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/digital-blueprint.git
cd digital-blueprint
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Add your environment variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=constructiveblueprint.com
```

You can find these in your Supabase and Vercel dashboards.

### 4. Run locally
```bash
npm run dev
# then open http://localhost:3000
```

---

## 📊 Plausible Analytics Events

Tracked using [`lib/analytics.ts`](./lib/analytics.ts):

| Event Name           | Trigger                              |
|----------------------|---------------------------------------|
| `Tool Viewed`        | When a tool page loads                |
| `Submit Tool`        | Submit form successfully sent         |
| `Blog CTA Click`     | Button click to blog from homepage    |
| `Affiliate Click`    | Click on outbound affiliate links     |

---

## ✨ Roadmap

- [ ] 🔗 Affiliate Link Auto-Enrichment via MindPal
- [ ] 🧠 AI-Generated Tool Descriptions
- [ ] 📤 CSV/JSON Export of all Tools
- [ ] 📥 Newsletter Signup Integration
- [ ] 🌎 Add Internationalization (i18n)

---

## 🤖 Local AI Assistance with Aider (Optional)

If you want to use AI-powered CLI coding:
```bash
pip install aider-chat
aider app/page.tsx components/ToolCard.tsx
```

---

## 🙌 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change or add.

---

## 📝 License

MIT © 2025 Six1Five Studio  
```
