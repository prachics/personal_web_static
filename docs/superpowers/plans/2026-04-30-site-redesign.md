# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign zhach.me from a generic portfolio template into a distinctive, professional, modern site that reflects a Staff ML Engineer's seniority and technical depth.

**Architecture:** Complete CSS overhaul replacing Poppins with Syne + Outfit + JetBrains Mono, new color system (deep navy-black + cyan accent), structural HTML improvements for readability. No build-system changes — still plain HTML/CSS/JS bundled by `bundle.py`.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, grid, animations), vanilla JS. Google Fonts (Syne, Outfit, JetBrains Mono). Font Awesome (already loaded). ion-icons (already loaded).

**Aesthetic Direction: "Signal & Precision"**
- Background: `#08080E` (near-black, slight blue undertone — not flat black)
- Surface cards: `#0F0F1A`
- Accent cyan: `#06B6D4` — data-viz, technical, distinctive (NOT purple)
- Accent amber: `#F59E0B` — timeline dots, warm highlights
- Text primary: `#F1F5F9`, secondary: `#94A3B8`
- Display font: **Syne 700/800** — geometric, confident, unforgettable
- Body font: **Outfit 300/400** — clean, modern, very readable
- Mono font: **JetBrains Mono** — stats, dates, numbers

**What changes and why:**
- Poppins → Syne/Outfit/JetBrains Mono: Poppins is the most overused portfolio font
- Bottom navbar → top navbar on desktop: bottom nav is a mobile pattern, looks amateur on desktop
- Skill progress bars → categorized tag clouds: bars with fake percentages are meaningless
- Flaticon PNG service icons → CSS-drawn or Unicode icons: PNG icons look cheap and need attribution
- About section gets an "Impact Stats" row: 4 big numbers from the resume (2%, 38%, 60%, 120%)
- Service cards get glassmorphism refinement
- Timeline gets glowing dot treatment
- Subtle animated dot-grid background on body
- Staggered page-load animation

---

## Chunk 1: Foundation — Fonts, Colors, Reset

### Task 1: Replace font imports and update CSS custom properties

**Files:**
- Modify: `src/index.html:17-19` (font link tags)
- Modify: `src/css/styles.css:1-101` (`:root` variables block)

- [ ] **Step 1: Update Google Fonts import in `src/index.html`**

Replace the existing Poppins font link (lines 17-19) with:
```html
    <!--- google font link-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Replace the entire `:root` block in `src/css/styles.css` (lines 18-101)**

```css
:root {

    /* --- Colors --- */

    /* backgrounds */
    --bg-body:        #08080E;
    --bg-surface:     #0F0F1A;
    --bg-surface-2:   #161626;
    --bg-elevated:    #1C1C30;

    /* accent */
    --accent-cyan:    #06B6D4;
    --accent-cyan-dim: rgba(6, 182, 212, 0.15);
    --accent-amber:   #F59E0B;
    --accent-amber-dim: rgba(245, 158, 11, 0.15);

    /* text */
    --text-primary:   #F1F5F9;
    --text-secondary: #94A3B8;
    --text-muted:     #475569;
    --text-accent:    #06B6D4;

    /* borders */
    --border-subtle:  rgba(255, 255, 255, 0.06);
    --border-medium:  rgba(255, 255, 255, 0.12);

    /* legacy aliases (keeps old HTML classes working) */
    --jet:                    var(--bg-elevated);
    --onyx:                   var(--bg-surface-2);
    --eerie-black-1:          var(--bg-surface);
    --eerie-black-2:          var(--bg-surface);
    --smoky-black:            var(--bg-body);
    --white-1:                var(--text-primary);
    --white-2:                var(--text-primary);
    --orange-yellow-crayola:  var(--accent-amber);
    --vegas-gold:             var(--accent-amber);
    --light-gray:             var(--text-secondary);
    --light-gray-30:          rgba(148, 163, 184, 0.3);
    --light-gray-70:          rgba(148, 163, 184, 0.7);
    --bittersweet-shimmer:    hsl(0, 43%, 51%);

    /* legacy gradients */
    --bg-gradient-onyx:       linear-gradient(to bottom right, var(--bg-elevated) 3%, var(--bg-surface-2) 97%);
    --bg-gradient-jet:        linear-gradient(to bottom right, rgba(28,28,48,0.251) 0%, rgba(28,28,48,0) 100%), var(--bg-surface);
    --bg-gradient-yellow-1:   linear-gradient(to bottom right, var(--accent-amber) 0%, rgba(245,158,11,0) 50%);
    --bg-gradient-yellow-2:   linear-gradient(135deg, rgba(245,158,11,0.251) 0%, rgba(245,158,11,0) 59.86%), var(--bg-surface);
    --border-gradient-onyx:   linear-gradient(to bottom right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
    --text-gradient-yellow:   linear-gradient(to right, var(--accent-amber), #FB923C);

    /* shadows */
    --shadow-1: -4px 8px 24px rgba(0,0,0,0.4);
    --shadow-2: 0 16px 30px rgba(0,0,0,0.4);
    --shadow-3: 0 16px 40px rgba(0,0,0,0.4);
    --shadow-4: 0 25px 50px rgba(0,0,0,0.3);
    --shadow-5: 0 24px 80px rgba(0,0,0,0.5);
    --glow-cyan: 0 0 20px rgba(6,182,212,0.25);
    --glow-amber: 0 0 20px rgba(245,158,11,0.25);

    /* --- Typography --- */

    --ff-display: 'Syne', sans-serif;
    --ff-body:    'Outfit', sans-serif;
    --ff-mono:    'JetBrains Mono', monospace;
    --ff-poppins: var(--ff-body); /* legacy alias */

    /* font sizes */
    --fs-1: 26px;
    --fs-2: 19px;
    --fs-3: 17px;
    --fs-4: 16px;
    --fs-5: 15px;
    --fs-6: 14px;
    --fs-7: 13px;
    --fs-8: 11px;

    /* font weights */
    --fw-300: 300;
    --fw-400: 400;
    --fw-500: 500;
    --fw-600: 600;

    /* --- Transitions --- */
    --transition-1: 0.25s ease;
    --transition-2: 0.5s ease-in-out;
}
```

- [ ] **Step 3: Update the `html` font-family rule in the Reset section (~line 162)**

Change:
```css
html {
    font-family: var(--ff-poppins);
}
```
To:
```css
html {
    font-family: var(--ff-body);
}
```

- [ ] **Step 4: Update heading elements to use display font**

Find the `.h2, .h3, .h4, .h5` block (~line 242) and add font-family:
```css
.h2,
.h3,
.h4,
.h5 {
    color: var(--text-primary);
    font-family: var(--ff-display);
    text-transform: capitalize;
}
```

- [ ] **Step 5: Update `.name` in sidebar to use display font**

In the `.info-content .name` rule, add `font-family: var(--ff-display);`

- [ ] **Step 6: Verify fonts load**

Open `src/index.html` in a browser (via `python3 -m http.server 8080 --directory src/`) and confirm Syne renders for headings, Outfit for body text.

- [ ] **Step 7: Commit**
```bash
git add src/index.html src/css/styles.css
git commit -m "feat(design): replace Poppins with Syne/Outfit/JetBrains Mono, overhaul color system"
```

---

## Chunk 2: Body background + animated dot grid

### Task 2: Animated dot-grid background on body

**Files:**
- Modify: `src/css/styles.css` — body rule
- Modify: `src/index.html` — add `<div class="bg-grid">` inside `<body>` before `<main>`

The dot grid is pure CSS — a radial-gradient repeated pattern on a pseudo-element. No JS needed.

- [ ] **Step 1: Add `.bg-grid` div to `src/index.html` immediately after `<body>`**

```html
<body>
    <div class="bg-grid" aria-hidden="true"></div>
    <!--- #MAIN-->
```

- [ ] **Step 2: Update the `body` rule and add `.bg-grid` styles in `src/css/styles.css`**

Replace the existing `body { background: var(--smoky-black); }` with:
```css
body {
    background: var(--bg-body);
    position: relative;
}

.bg-grid {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image:
        radial-gradient(circle, rgba(6,182,212,0.07) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    animation: grid-drift 20s linear infinite;
}

@keyframes grid-drift {
    0%   { background-position: 0 0; }
    100% { background-position: 32px 32px; }
}

main {
    position: relative;
    z-index: 1;
}
```

Note: The existing `main { margin: 15px 12px ... }` rule stays — just add `position: relative; z-index: 1;` to it.

- [ ] **Step 3: Verify in browser — subtle cyan dot grid should gently drift on the dark background**

- [ ] **Step 4: Commit**
```bash
git add src/index.html src/css/styles.css
git commit -m "feat(design): add animated dot-grid background"
```

---

## Chunk 3: Navbar — move to top on desktop, improve styling

### Task 3: Desktop top navbar with improved active states

**Files:**
- Modify: `src/css/styles.css` — `.navbar` and related rules (~line 501-537)

Currently: fixed to bottom on all screens, font size 11px, padding heavy.
Goal: bottom on mobile (keep existing UX), top inside `.main-content` on desktop (≥580px).

- [ ] **Step 1: Replace the `.navbar` block in styles.css**

Find the `#NAVBAR` section (~line 498) and replace through `.navbar-link.active`:

```css
/*-----------------------------------*\
  #NAVBAR
\*-----------------------------------*/

.navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(15, 15, 26, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-subtle);
    border-radius: 0;
    box-shadow: var(--shadow-2);
    z-index: 5;
}

.navbar-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
}

.navbar-link {
    color: var(--text-secondary);
    font-family: var(--ff-display);
    font-size: var(--fs-8);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 20px 10px;
    transition: color var(--transition-1);
    position: relative;
}

.navbar-link::after {
    content: '';
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 16px;
    height: 2px;
    background: var(--accent-cyan);
    border-radius: 2px;
    transition: transform var(--transition-1);
}

.navbar-link:hover,
.navbar-link:focus {
    color: var(--text-primary);
}

.navbar-link:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.navbar-link.active {
    color: var(--accent-cyan);
}

.navbar-link.active::after {
    transform: translateX(-50%) scaleX(1);
}
```

- [ ] **Step 2: Add desktop override at the end of the file (or in the `@media (min-width: 580px)` block)**

In the responsive section for ≥580px, add:
```css
/* Desktop: navbar at top of main content */
.navbar {
    position: sticky;
    top: 0;
    bottom: auto;
    left: auto;
    width: auto;
    border-top: none;
    border-bottom: 1px solid var(--border-subtle);
    border-radius: 14px;
    margin-bottom: 20px;
}

.navbar-link {
    font-size: var(--fs-7);
    padding: 14px 16px;
}

.navbar-link::after {
    bottom: 6px;
}
```

- [ ] **Step 3: Verify navbar sticks to top on desktop and stays at bottom on mobile**

- [ ] **Step 4: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(design): navbar moves to top on desktop, add underline active indicator"
```

---

## Chunk 4: Sidebar redesign

### Task 4: Sidebar — glassmorphism refinement + better profile display

**Files:**
- Modify: `src/css/styles.css` — `.sidebar` and related rules (~line 340-495)

- [ ] **Step 1: Update `.sidebar` base styles**

Replace the `.sidebar` rule:
```css
.sidebar {
    margin-bottom: 15px;
    max-height: 112px;
    overflow: hidden;
    transition: var(--transition-2);
    background: rgba(15, 15, 26, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 20px;
    box-shadow: var(--shadow-1);
}
```

- [ ] **Step 2: Update `.avatar-box` for a glowing border on the profile image**

```css
.avatar-box {
    background: var(--bg-gradient-onyx);
    border-radius: 20px;
    position: relative;
}

.avatar-box::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: linear-gradient(135deg, var(--accent-cyan), transparent 60%);
    z-index: -1;
    opacity: 0.6;
}
```

- [ ] **Step 3: Update `.info-content .name` to use display font at larger size**

```css
.info-content .name {
    color: var(--text-primary);
    font-family: var(--ff-display);
    font-size: var(--fs-2);
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
}
```

- [ ] **Step 4: Update `.info-content .title` pill style**

```css
.info-content .title {
    color: var(--accent-cyan);
    background: var(--accent-cyan-dim);
    font-family: var(--ff-mono);
    font-size: var(--fs-8);
    font-weight: 500;
    width: max-content;
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid rgba(6,182,212,0.2);
    letter-spacing: 0.02em;
}
```

- [ ] **Step 5: Verify profile card looks clean — cyan glow ring around avatar, mono font on title pill**

- [ ] **Step 6: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(design): sidebar glassmorphism, cyan glow avatar ring, mono title pill"
```

---

## Chunk 5: About page — bio + impact stats + service cards

### Task 5: Impact stats row

The resume has standout numbers worth displaying prominently. Add a stats row between the bio text and the "What I'm doing" service cards.

**Files:**
- Modify: `src/index.html` — add stats section after `.about-text` (~line 206)
- Modify: `src/css/styles.css` — add `.impact-stats` styles

- [ ] **Step 1: Update the bio text in `src/index.html` to reflect current role (Staff SWE at Rokt)**

Replace the `<section class="about-text">` content (lines 185-206):
```html
                <section class="about-text">
                    <p>
                        Staff Software Engineer with 13+ years of experience
                        building ML systems at scale. Currently leading
                        Audience &amp; Bidding ML at Rokt. Formerly Senior SWE
                        on YouTube Search at Google, where I shipped ranking,
                        news, and infrastructure systems used by hundreds of
                        millions of people.
                    </p>
                    <p>
                        Specialties: search &amp; recommendation systems,
                        large-scale ML pipelines, technical leadership, and
                        responsible AI. I build things that work at the
                        intersection of data, models, and product impact.
                    </p>
                </section>
```

- [ ] **Step 2: Add impact stats section immediately after `</section>` for `.about-text`**

```html
                <section class="impact-stats">
                    <div class="stat-item">
                        <span class="stat-number">120%</span>
                        <span class="stat-label">Revenue uplift from generated audiences</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">75%</span>
                        <span class="stat-label">ML pipeline cost reduction at Rokt</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">38%</span>
                        <span class="stat-label">News CTR increase on YouTube Search</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">60%</span>
                        <span class="stat-label">Compute reduction saving $1.8M/yr</span>
                    </div>
                </section>
```

- [ ] **Step 3: Add `.impact-stats` CSS**

Add after the `.about-text` styles block:
```css
.impact-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 35px;
}

.stat-item {
    background: var(--bg-surface-2);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 16px;
    transition: border-color var(--transition-1), box-shadow var(--transition-1);
}

.stat-item:hover {
    border-color: rgba(6,182,212,0.3);
    box-shadow: var(--glow-cyan);
}

.stat-number {
    display: block;
    font-family: var(--ff-display);
    font-size: 28px;
    font-weight: 800;
    color: var(--accent-cyan);
    line-height: 1;
    margin-bottom: 6px;
}

.stat-label {
    display: block;
    font-size: var(--fs-8);
    color: var(--text-secondary);
    line-height: 1.4;
}
```

- [ ] **Step 4: Verify 4 stats render in 2×2 grid, numbers are large cyan, hover glows**

- [ ] **Step 5: Commit**
```bash
git add src/index.html src/css/styles.css
git commit -m "feat(about): add impact stats row with 4 key metrics from resume"
```

### Task 6: Service cards — remove Flaticon PNGs, use inline SVG icons

The 6 service items currently use `<img>` tags pointing to Flaticon PNGs which require attribution and look low-quality. Replace with inline SVG icons embedded directly in the HTML.

**Files:**
- Modify: `src/index.html` — replace `<div class="service-icon-box"><img ...></div>` in all 6 service items
- Modify: `src/css/styles.css` — update `.service-icon-box` and `.service-item` styles

- [ ] **Step 1: Replace service icon boxes in `src/index.html`**

For each of the 6 service items, replace `<div class="service-icon-box"><img src="..." /></div>` and remove the `<a class="icon-attr">` attribution link. Use these inline SVG replacements:

**Software Engineering** (replace programming.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </div>
```

**AI Engineering** (replace ai.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.3-6.7-2.1 2.1M8.4 15.6l-2.1 2.1M5.3 5.3l2.1 2.1M15.6 15.6l2.1 2.1"/></svg>
                            </div>
```

**Software Architecture** (replace cloud.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
                            </div>
```

**Search & Recommendation** (replace search.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            </div>
```

**Computational Journalism** (replace report.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
```

**Data Processing** (replace data-collection.png):
```html
                            <div class="service-icon-box">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
                            </div>
```

Also remove ALL `<a href="..." class="icon-attr">...</a>` attribution links from service items.

- [ ] **Step 2: Update `.service-icon-box` CSS to style the SVG icons**

```css
.service-icon-box {
    width: 54px;
    height: 54px;
    background: var(--accent-cyan-dim);
    border: 1px solid rgba(6,182,212,0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: var(--accent-cyan);
    transition: background var(--transition-1), box-shadow var(--transition-1);
}

.service-item:hover .service-icon-box {
    background: rgba(6,182,212,0.22);
    box-shadow: var(--glow-cyan);
}
```

- [ ] **Step 3: Update `.service-item` layout from centered to left-aligned, side-by-side icon+content on desktop**

```css
.service-item {
    position: relative;
    background: var(--bg-surface-2);
    border: 1px solid var(--border-subtle);
    padding: 24px;
    border-radius: 14px;
    box-shadow: var(--shadow-2);
    z-index: 1;
    transition: border-color var(--transition-1), transform var(--transition-1);
    display: flex;
    flex-direction: column;
}

.service-item:hover {
    border-color: rgba(6,182,212,0.25);
    transform: translateY(-2px);
}

.service-item::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: transparent;
    border-radius: inherit;
    z-index: -1;
}

.service-content-box {
    text-align: left;
}

.service-item-title {
    margin-bottom: 8px;
    font-size: var(--fs-5);
}

.service-item-text {
    color: var(--text-secondary);
    font-size: var(--fs-7);
    font-weight: var(--fw-300);
    line-height: 1.7;
}
```

- [ ] **Step 4: Verify 6 service cards show SVG icons in cyan, no Flaticon images, no attribution links**

- [ ] **Step 5: Commit**
```bash
git add src/index.html src/css/styles.css
git commit -m "feat(about): replace Flaticon PNG icons with inline SVG, remove attributions"
```

---

## Chunk 6: Resume page — timeline + skills overhaul

### Task 7: Timeline visual refinement

**Files:**
- Modify: `src/css/styles.css` — `.timeline-*` rules (~line 848-923)

- [ ] **Step 1: Update timeline CSS for stronger visual hierarchy**

Replace the `#RESUME` section styles (from `.timeline` through `.timeline-text`):

```css
/*-----------------------------------*\
  #RESUME
\*-----------------------------------*/

.article-title {
    margin-bottom: 30px;
}

.timeline {
    margin-bottom: 35px;
}

.timeline .title-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-subtle);
}

.timeline-list {
    font-size: var(--fs-6);
    margin-left: 24px;
}

.timeline-item {
    position: relative;
    padding-left: 28px;
}

.timeline-item:not(:last-child) {
    margin-bottom: 32px;
    padding-bottom: 32px;
}

.timeline-item:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 8px;
    left: -1px;
    width: 1px;
    height: calc(100%);
    background: linear-gradient(to bottom, var(--accent-amber), transparent);
}

.timeline-item::after {
    content: "";
    position: absolute;
    top: 6px;
    left: -5px;
    height: 10px;
    width: 10px;
    background: var(--accent-amber);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--bg-surface), 0 0 0 5px rgba(245,158,11,0.3), var(--glow-amber);
}

.timeline-item-title {
    font-family: var(--ff-display);
    font-size: var(--fs-5);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 4px;
    color: var(--text-primary);
}

.timeline-list span {
    font-family: var(--ff-mono);
    font-size: var(--fs-8);
    color: var(--accent-cyan);
    font-weight: 400;
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 10px;
}

.timeline-text {
    color: var(--text-secondary);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.75;
}
```

- [ ] **Step 2: Verify timeline shows amber glowing dots, cyan mono dates, display font for job titles**

- [ ] **Step 3: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(resume): amber timeline dots with glow, mono dates, display font titles"
```

### Task 8: Replace skill progress bars with categorized tag clouds

Progress bars with fake percentages (90% AI/ML? what does that mean?) are a cliché. Replace with the actual skill categories from the resume PDF.

**Files:**
- Modify: `src/index.html` — replace the `<section class="skill">` block (~lines 663-787)
- Modify: `src/css/styles.css` — replace `.skill*` styles with `.skill-tags*`

- [ ] **Step 1: Replace the `<section class="skill">` block in `src/index.html`**

Replace everything from `<section class="skill">` to its closing `</section>` with:

```html
                <section class="skill">
                    <h3 class="h3 skills-title">Skills</h3>
                    <div class="skill-tags-grid">
                        <div class="skill-category">
                            <h4 class="skill-cat-title">Machine Learning &amp; AI</h4>
                            <div class="skill-tags">
                                <span class="skill-tag accent">TensorFlow</span>
                                <span class="skill-tag accent">PyTorch</span>
                                <span class="skill-tag">Deep Learning</span>
                                <span class="skill-tag">NLP</span>
                                <span class="skill-tag">Transformers</span>
                                <span class="skill-tag">Reinforcement Learning</span>
                                <span class="skill-tag">Ranking Systems</span>
                                <span class="skill-tag">Embeddings</span>
                                <span class="skill-tag">Graph Mining</span>
                                <span class="skill-tag">Semi-Supervised Learning</span>
                                <span class="skill-tag accent">AI Coding Assistants</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4 class="skill-cat-title">Data &amp; Infrastructure</h4>
                            <div class="skill-tags">
                                <span class="skill-tag accent">Spark</span>
                                <span class="skill-tag">Kafka</span>
                                <span class="skill-tag">Hadoop</span>
                                <span class="skill-tag">MapReduce</span>
                                <span class="skill-tag">SQL</span>
                                <span class="skill-tag">PostgreSQL</span>
                                <span class="skill-tag">Cassandra</span>
                                <span class="skill-tag">MongoDB</span>
                                <span class="skill-tag">HBase</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4 class="skill-cat-title">Platform &amp; Tooling</h4>
                            <div class="skill-tags">
                                <span class="skill-tag accent">Docker</span>
                                <span class="skill-tag accent">Kubeflow</span>
                                <span class="skill-tag">Buildkite</span>
                                <span class="skill-tag">CI/CD</span>
                                <span class="skill-tag">Linux</span>
                                <span class="skill-tag">Git</span>
                                <span class="skill-tag">C++</span>
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Java</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4 class="skill-cat-title">Leadership</h4>
                            <div class="skill-tags">
                                <span class="skill-tag accent">Technical Mentorship</span>
                                <span class="skill-tag">Team Leadership</span>
                                <span class="skill-tag">TDD</span>
                                <span class="skill-tag">Code Health</span>
                                <span class="skill-tag">System Design</span>
                                <span class="skill-tag">Cross-functional</span>
                            </div>
                        </div>
                    </div>
                </section>
```

- [ ] **Step 2: Replace `.skill*` CSS in styles.css with tag cloud styles**

Find the `skills` comment section (~line 930) and replace all `.skill*` rules:

```css
/**
 * skills
 */

.skills-title {
    margin-bottom: 24px;
}

.skill-tags-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

.skill-category {
    background: var(--bg-surface-2);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    padding: 16px 20px;
}

.skill-cat-title {
    font-family: var(--ff-display);
    font-size: var(--fs-7);
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    font-family: var(--ff-mono);
    font-size: 11px;
    font-weight: 400;
    color: var(--text-secondary);
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
    padding: 3px 8px;
    transition: color var(--transition-1), border-color var(--transition-1);
}

.skill-tag:hover {
    color: var(--text-primary);
    border-color: var(--border-medium);
}

.skill-tag.accent {
    color: var(--accent-cyan);
    border-color: rgba(6,182,212,0.3);
    background: var(--accent-cyan-dim);
}
```

- [ ] **Step 3: Verify 4 skill categories render as tag clouds, accent tags glow cyan, no progress bars**

- [ ] **Step 4: Commit**
```bash
git add src/index.html src/css/styles.css
git commit -m "feat(resume): replace skill progress bars with categorized tag clouds"
```

---

## Chunk 7: Portfolio cards + Contact polish

### Task 9: Portfolio cards — hover overlay refinement

**Files:**
- Modify: `src/css/styles.css` — `.project-*` rules (~line 975-end of portfolio section)

- [ ] **Step 1: Read the current portfolio CSS styles**

Run: `grep -n "project\|portfolio\|filter" src/css/styles.css | head -40`

- [ ] **Step 2: Update project card CSS**

Find `.project-list` and related rules and replace with:
```css
.project-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 16px;
}

.project-item {
    display: none;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    transition: border-color var(--transition-1), transform var(--transition-1), box-shadow var(--transition-1);
}

.project-item.active {
    display: block;
    animation: fade 0.4s ease backwards;
}

.project-item:hover {
    border-color: rgba(6,182,212,0.3);
    transform: translateY(-3px);
    box-shadow: var(--glow-cyan);
}

.project-item a {
    display: block;
}

.project-img {
    position: relative;
    overflow: hidden;
    background: var(--bg-surface-2);
    aspect-ratio: 4/3;
}

.project-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-2);
}

.project-item:hover .project-img img {
    transform: scale(1.05);
}

.project-item-icon-box {
    position: absolute;
    inset: 0;
    background: rgba(6,182,212,0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: var(--accent-cyan);
    opacity: 0;
    transition: opacity var(--transition-1);
    backdrop-filter: blur(2px);
}

.project-item:hover .project-item-icon-box {
    opacity: 1;
}

.project-title {
    font-family: var(--ff-display);
    font-size: var(--fs-6);
    font-weight: 700;
    color: var(--text-primary);
    padding: 12px 14px 4px;
}

.project-category {
    font-family: var(--ff-mono);
    font-size: var(--fs-8);
    color: var(--accent-cyan);
    padding: 0 14px 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
```

- [ ] **Step 3: Update filter button styles**

```css
.filter-list {
    display: none;
}

.filter-select-box {
    position: relative;
    margin-bottom: 25px;
}

/* Desktop: show filter buttons, hide select */
@media (min-width: 580px) {
    .filter-list {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }

    .filter-item button {
        font-family: var(--ff-mono);
        font-size: var(--fs-8);
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--text-secondary);
        background: var(--bg-surface-2);
        border: 1px solid var(--border-subtle);
        border-radius: 6px;
        padding: 6px 14px;
        transition: all var(--transition-1);
        cursor: pointer;
    }

    .filter-item button:hover,
    .filter-item button.active {
        color: var(--accent-cyan);
        border-color: rgba(6,182,212,0.4);
        background: var(--accent-cyan-dim);
    }

    .filter-select-box {
        display: none;
    }
}
```

- [ ] **Step 4: Verify portfolio cards have image zoom on hover, cyan overlay icon, category in mono font**

- [ ] **Step 5: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(portfolio): refined card hover effects, image zoom, mono category labels"
```

### Task 10: Contact page polish

**Files:**
- Modify: `src/css/styles.css` — contact/form rules
- Modify: `src/index.html` — map section (optional: remove map, add location note instead)

- [ ] **Step 1: Read current contact styles**

Run: `grep -n "contact\|mapbox\|form" src/css/styles.css | head -40`

- [ ] **Step 2: Update form input styles**

Find `.form-input` and related rules and update:
```css
.form-input {
    color: var(--text-primary);
    font-size: var(--fs-6);
    font-weight: var(--fw-400);
    padding: 13px 20px;
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    outline: none;
    background: var(--bg-surface-2);
    transition: border-color var(--transition-1), box-shadow var(--transition-1);
    margin-bottom: 14px;
}

.form-input:focus {
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 3px rgba(6,182,212,0.15);
}

textarea.form-input {
    min-height: 120px;
    resize: vertical;
}

.form-btn {
    position: relative;
    width: 100%;
    background: var(--accent-cyan);
    color: var(--bg-body);
    font-family: var(--ff-display);
    font-size: var(--fs-6);
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 13px 20px;
    border-radius: 10px;
    transition: background var(--transition-1), transform var(--transition-1), box-shadow var(--transition-1);
    cursor: pointer;
    border: none;
}

.form-btn:hover {
    background: #22D3EE;
    transform: translateY(-1px);
    box-shadow: var(--glow-cyan);
}

.form-btn:active {
    transform: translateY(0);
}
```

- [ ] **Step 3: Verify contact form has clean dark inputs with cyan focus rings and cyan submit button**

- [ ] **Step 4: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(contact): cyan focus rings, solid cyan submit button"
```

---

## Chunk 8: Animation polish + JS enhancements

### Task 11: Page load stagger animation

**Files:**
- Modify: `src/css/styles.css` — add stagger animation classes
- Modify: `src/js/scripts.js` — add intersection observer for stats + stagger trigger

- [ ] **Step 1: Add stagger animation CSS**

Add at the end of `src/css/styles.css`:
```css
/*-----------------------------------*\
  #ANIMATIONS
\*-----------------------------------*/

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.sidebar {
    animation: slide-up 0.5s ease 0.1s backwards;
}

article.active {
    animation: fade 0.4s ease backwards, slide-up 0.4s ease backwards;
}

.stat-item {
    animation: slide-up 0.5s ease backwards;
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }

.service-item {
    animation: slide-up 0.5s ease backwards;
}

.service-item:nth-child(1) { animation-delay: 0.15s; }
.service-item:nth-child(2) { animation-delay: 0.25s; }
.service-item:nth-child(3) { animation-delay: 0.35s; }
.service-item:nth-child(4) { animation-delay: 0.45s; }
.service-item:nth-child(5) { animation-delay: 0.55s; }
.service-item:nth-child(6) { animation-delay: 0.65s; }
```

- [ ] **Step 2: Add `prefers-reduced-motion` override at end of animations block**

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .bg-grid {
        animation: none;
    }
}
```

- [ ] **Step 3: Verify page loads with staggered fade-up on sidebar and stat items. Verify reduced-motion disables animations.**

- [ ] **Step 4: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(animation): staggered slide-up on load, reduced-motion support"
```

---

## Chunk 9: Responsive — desktop layout improvements

### Task 12: Desktop layout — sidebar + content side-by-side

The existing CSS already has responsive breakpoints. This task ensures all new styles work at the right breakpoints.

**Files:**
- Modify: `src/css/styles.css` — check and update `@media (min-width: 580px)`, `@media (min-width: 768px)`, `@media (min-width: 1250px)` blocks

- [ ] **Step 1: Read the current responsive blocks**

Run: `grep -n "@media" src/css/styles.css`

- [ ] **Step 2: In the `@media (min-width: 580px)` block, add stats grid update**

```css
.impact-stats {
    grid-template-columns: repeat(4, 1fr);
}

.stat-number {
    font-size: 32px;
}
```

- [ ] **Step 3: In the `@media (min-width: 768px)` block, add skill tags grid update**

```css
.skill-tags-grid {
    grid-template-columns: repeat(2, 1fr);
}

.service-list {
    grid-template-columns: repeat(2, 1fr);
}
```

- [ ] **Step 4: In the `@media (min-width: 1250px)` block, ensure sidebar is full-height persistent panel**

Check if `.sidebar` max-height is overridden on desktop — it should be unset so all contact info shows without the toggle button.

- [ ] **Step 5: Test at 375px (mobile), 768px (tablet), 1280px (desktop) in browser dev tools**

- [ ] **Step 6: Commit**
```bash
git add src/css/styles.css
git commit -m "feat(responsive): 4-col stats on desktop, 2-col skills grid, 2-col service cards"
```

---

## Final Verification

- [ ] Open `http://localhost:8080` in browser via `python3 -m http.server 8080 --directory src/`
- [ ] About tab: bio readable, 4 stats row visible, 6 service cards with SVG icons
- [ ] Resume tab: amber timeline dots, cyan dates, tag cloud skills
- [ ] Portfolio tab: 2×2 grid, hover zoom + cyan overlay
- [ ] Contact tab: dark inputs, cyan focus ring, cyan submit button
- [ ] All tabs: Syne font for headings, Outfit for body, JetBrains Mono for dates/tags
- [ ] Dot grid background visible but subtle
- [ ] Mobile (375px): bottom navbar, single column layout, no regressions
- [ ] Desktop (1280px): top sticky navbar, sidebar + content side by side
- [ ] `prefers-reduced-motion`: animations disabled
