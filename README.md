<div align="center">

<img src="docs/banner.svg" alt="Calculator — a minimal four-function calculator built with React" width="100%">

<br>

[![Live demo](https://img.shields.io/badge/%E2%96%B6_live_demo-calculator--tpainn.vercel.app-a78bfa?style=for-the-badge&labelColor=0d0a18)](https://calculator-tpainn.vercel.app)

![React](https://img.shields.io/badge/React-0d0a18?style=flat-square&logo=react&logoColor=a78bfa)
![Vite](https://img.shields.io/badge/Vite-0d0a18?style=flat-square&logo=vite&logoColor=f472b6)

</div>

<br>

![Calculator screenshot](docs/screenshot.png)

A calculator that does exactly four things and does them cleanly. Built to learn React state and component composition: no UI kit, no state library, no backend.

## Features

- Four operations (`+ − × ÷`), decimals (up to 3 places), sign toggle `±`
- **AC / C** clear everything or just the current entry
- Guards against bad input: 8-digit cap, one decimal point, a clear `ERR` state (for example divide by zero) that only `AC` can leave
- **Keyboard input.** Type digits and operators (`/` and `*` map to `÷` and `×`), `Backspace` to delete
- Small component tree (`src/Components`: `Display`, `ButtonPad`, `Button`) with the calculator logic in one place
- Deploys as a static Vite build

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Stack

React · Vite · plain CSS · deployed on Vercel

<div align="center"><sub>Built by <a href="https://github.com/TPAINN">Apostolos Peiniris</a></sub></div>