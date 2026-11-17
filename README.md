# Vijith V S — Interactive 3D Portfolio & Creative Engineering Studio

A high-performance personal portfolio web application built with **Next.js (Static Export `output: 'export'`)**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, and **Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)**, styled in an editorial masculine watercolor-and-ink studio theme.

Deployed directly to GitHub Pages at **[https://vijithvenganoor.github.io/](https://vijithvenganoor.github.io/)**.

---

## 🎨 Visual Direction & Palette
- **Canvas Background**: Warm Alabaster & Studio Parchment (`#FAF7F2`)
- **Atmospheric Vignette & Accents**: Soft Sage Olive (`#DCE3D8`), Warm Sand (`#E8DFD1`), and Slate Teal (`#2C3E4C`)
- **Typography & CTAs**: Deep Espresso Charcoal (`#18181B`), Muted Slate (`#52525B`), Terracotta Amber (`#C85A32`), and Forest Sage (`#3A5A40`)
- **Editorial Typography**: *Instrument Serif* / *Playfair Display* paired with *Inter* and *JetBrains Mono*

---

## 🌟 Architecture & Features

### 1. Dual-Mode 3-in-1 Interactive Hero
- **2.5D Depth Rig Mode**: Interactive character rig responding to mouse coordinates with real-time parallax tilt, warm sunlight halo, and 5 discrete watercolor keyframes:
  - `state-working`: Coding focused behind the laptop
  - `state-left`: Inquisitive glance towards architecture logs (`0–33%` X)
  - `state-right`: Telemetry inspection towards Cloudflare Workers (`67–100%` X)
  - `state-greeting`: Warm wave hello with over-ear headphones (`33–67%` X)
  - `state-pointing`: Highlighting the *"EXPLORE PORTFOLIO"* action pill
- **90-Frame Scrubbed Sequence Mode**: Full 90-frame linear interpolation (`lerp`) scrubber (`public/frames/frame_001.webp` ... `frame_090.webp`) without jitter or layout shifts.
- **3D Dust Particles Layer**: React Three Fiber canvas with floating golden motes and sage particles, mobile DPR scaling (`dpr={[1, 1.5]}`), and WebGL context-loss fallbacks.

### 2. Enterprise WealthTech & Architecture Profile
- **Current Role**: Senior Software Engineer at **RedBlack Software** (formerly Intelliflo), Infopark Cyber Tower 2, Kochi, Kerala.
  - Core Focus: Enterprise automated portfolio rebalancing, tax-aware trade execution engines, and high-frequency order batching.
- **Technical Arsenal**:
  - **Backend & Enterprise**: C#, .NET Core, Web APIs, ASP.NET MVC, ADO.NET, SQL Server, PostgreSQL, Swiss Ephemeris Math Engine.
  - **Frontend & Mobile**: Next.js, React, React Native (Expo), TypeScript, Kotlin Native Android Services (`SYSTEM_ALERT_WINDOW`), Three.js / WebGL, Unity.
  - **Cloud, Edge & AI**: Cloudflare Workers, Cloudflare Pages, Supabase, Self-hosted n8n workflows, Local LLMs (Ollama), WhatsApp Business Cloud API.

### 3. Built & Shipped Indie Products
- **ByteBuddy (ScreenTimePet)**: Android AI digital wellbeing companion with a floating Milo puppy, Kotlin WindowManager foreground service, and usage telemetry.
- **SwingHarvest**: Automated capital gains and tax-loss harvesting SaaS for Indian retail equity traders on Zerodha / Upstox.
- **Moment & Milestone Studio**: Custom vector star-chart and street map print-on-demand studio with astronomical date calculations.
- **AI Astrology & Swiss Ephemeris Engine**: Mobile app pairing .NET precision ephemeris math with conversational AI memory pipelines.
- **Tom's Adventure World**: Published 2D platformer game on Google Play Store.
- **Azhimala Guide (`azhimalaguide.com`)**: Regional coastal travel and tourism destination portal.
- **Open Source Dev Tools**: `queryhelper` (ADO.NET C# query optimizer), `PDFChart`, and SQL date utilities.

### 4. "Life in Watercolor" Story Gallery
Interactive horizontal story carousel displaying high-resolution, watermark-free watercolor illustrations highlighting rituals, music, and Kerala landscapes:
- System Architecture & Wireframing (Ernakulam studio)
- Equity Research & Swing Trading (Balcony desk)
- Cloud-Native Community (Infopark & Technopark corridors)
- Coastal Kochi & Marine Drive (Water Metro & tender coconuts)
- Cultural Festivals & Heritage (Kanakakkunnu Palace)
- Acoustic Sessions & Malayalam Songwriting (Balcony ukulele)
- The Pour-Over Ritual (Morning coffee brewing)
- Desk Ergonomics & Calibration (Forearm gyro strengthener)
- Highway Miles & Machine Care (2023 Kia Sonet iMT & 2022 Honda Hornet 2.0 along NH 66)

### 5. Interactive Terminal & Collaboration Footer
- Interactive collaboration message card with quick-copy email and dispatch terminal.
- One-click *"Back to Top ↑"* smooth scroll.

---

## 🛠️ Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Process watercolor assets and generate 90-frame sequence (sharp)
npm run prepare-images

# 3. Start local development server
npm run dev

# 4. Build static export for GitHub Pages (generates ./out)
npm run build
```

---

## 🚀 Deployment to GitHub Pages

The repository is configured for automatic static export via GitHub Actions (`.github/workflows/deploy.yml`):
1. Push commits to `main`:
   ```bash
   git add .
   git commit -m "Deploy 3D interactive watercolor portfolio"
   git push origin main
   ```
2. In GitHub repository settings:
   - Navigate to **Settings → Pages**.
   - Under **Build and deployment → Source**, choose **GitHub Actions**.
   - The workflow will build the Next.js static export and deploy it directly to `https://vijithvenganoor.github.io/`.
