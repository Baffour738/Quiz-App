# Quiz-App


Personal project by Baffour Addo (GitHub: [Baffour738](https://github.com/Baffour738)) — a simple, fast quiz application built with React 19, Vite 7, React Router, and Tailwind CSS, deployed on Vercel.

Live app: https://quiz-n1zwbbn36-akowuah-addo-baffours-projects.vercel.app

---

## Table of Contents

- **Overview**
- **Tech Stack**
- **Local Development**
- **Project Structure**
- **Available Scripts**
- **Production Build Preview**
- **Deployment to Vercel (Monorepo/Subfolder)**
- **Environment Variables**
- **Troubleshooting**
- **License**

---

## Overview

I built this as a focused capstone-style project to practice clean React architecture, routing, and fast builds with Vite. The goal was a lightweight, responsive quiz app that’s easy to run locally and trivial to deploy.

Repository: `Quiz-App` — https://github.com/Baffour738/Quiz-App

---

## Tech Stack

- **React 19** for UI.
- **Vite 7** for dev server and build.
- **React Router** for client-side routing.
- **Tailwind CSS 4** for styling.
- **Vercel** for hosting and CI/CD.

---

## Local Development

The actual app code lives in a subfolder: `alx-capstone-quiz-app/`.

1) Clone the repository

```bash
git clone https://github.com/Baffour738/Quiz-App.git
cd Quiz-App/alx-capstone-quiz-app
```

2) Install dependencies

```bash
npm install
```

3) Start the dev server

```bash
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

---

## Project Structure

```
Quiz-App/
├─ README.md                 # This file
└─ alx-capstone-quiz-app/    # Vite + React app (project root for builds)
   ├─ package.json
   ├─ vite.config.js
   ├─ index.html
   ├─ src/
   └─ ...
```

Note: Vercel needs the root directory set to `alx-capstone-quiz-app/` for builds.

---

## Available Scripts

Run these inside `alx-capstone-quiz-app/`:

- **npm run dev** — Start Vite dev server.
- **npm run build** — Production build (outputs to `dist/`).
- **npm run preview** — Preview the production build locally.
- **npm run lint** — Lint the project.

---

## Production Build Preview

To test a production build locally:

```bash
npm run build
npm run preview
```

This serves the `dist/` output with Vite’s preview server.

---

## Deployment to Vercel (Monorepo/Subfolder)

This repository uses a subfolder for the app. On Vercel, set the project’s Root Directory to `alx-capstone-quiz-app/` so that installs and builds run in the right place.

Steps I used:

- **Connect GitHub repo** `Baffour738/Quiz-App` in Vercel.
- In Project → Settings → General → **Root Directory**: set to `alx-capstone-quiz-app/`.
- Build Command: Vercel auto-detects Vite and runs `npm run build`.
- Output Directory: `dist` (default for Vite).
- Redeploy and verify the live URL.

Live deployment: https://quiz-n1zwbbn36-akowuah-addo-baffours-projects.vercel.app

Alternative: Vercel CLI from the `alx-capstone-quiz-app/` folder

```bash
npm i -g vercel
vercel
vercel --prod
```

---

## Environment Variables

This app does not require environment variables by default.

If you ever serve under a subpath, you can set Vite’s `base` in `vite.config.js`. For Vercel root deployments, leave `base` as default (`/`).

Example (only if you serve under a subpath):

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Quiz-App/', // example subpath, not needed for Vercel root
})
```

---

## Troubleshooting

- **vite: command not found on Vercel**
  - Make sure Vercel’s Root Directory is `alx-capstone-quiz-app/`.
  - The `vite` dependency lives in that folder’s `package.json`.

- **Assets 404 in production**
  - If deploying under a subpath, ensure `vite.config.js` has the correct `base` (e.g., `/Quiz-App/`). For Vercel root, keep default `/`.

- **Local dev works but deploy fails**
  - Run `npm run build` locally to reproduce build issues.
  - Check Node version on Vercel (defaults to Node 20). Keep dependencies up to date.

---

## License

MIT — feel free to fork and adapt. If you build something with it, I’d love to see it! Tag me: [@Baffour738](https://github.com/Baffour738).