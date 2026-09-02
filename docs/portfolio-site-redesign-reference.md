# Portfolio Site Redesign Reference

*Research compiled April 2026. Used as reference for redesign of zhach.me.*

---

## 1. Goals and Purpose: Site vs Paper Resume

A paper resume is a filtering document — it exists to pass ATS and give a recruiter enough to schedule a phone screen. It must fit one or two pages, so everything is compressed and context is stripped.

A portfolio site is a positioning document. It has unlimited space to:
- Show thinking process, not just outputs
- Demonstrate taste and craft through the medium itself
- Provide social proof (live demos, linked work, external recognition)
- Establish a narrative that a bulleted list cannot
- Self-select your audience — someone who reads the whole thing is already warm

The critical implication: **the site should not be a formatted version of your resume**. If it's just resume content in a web layout, it adds no value and may actually hurt (a bad design signals poor judgment). The site earns its existence by doing things paper cannot: real demos, case studies with context, links to live systems, and voice.

For a senior engineer specifically, the site also signals something a resume cannot — that you can scope, build, and ship a standalone product. The site is its own work sample.

---

## 2. What to Include and What to Omit

**Include:**
- Name, title/specialty, and location (city-level, not street)
- 2–3 sentence positioning statement (who you are, what you build, who you build it for)
- 3–5 work experience entries with quantified impact — numbers, scale, outcomes
- 3–6 projects with problem/solution/impact framing, links to live demos or repos
- Skills as a flat list, grouped by category — not bars or percentages
- GitHub link and LinkedIn link (minimal social, maximize signal)
- A direct way to contact you (email or contact form)
- Downloadable PDF resume linked prominently

**Omit or reconsider:**
- Phone number (high spam risk, no benefit at this stage of funnel)
- "Buy Me a Coffee" links (positions you as a hobbyist, not a senior engineer)
- Instagram, Mastodon, Bluesky — unless your professional work lives there
- "What I'm doing" / services cards (freelance template pattern; signals you copied a template)
- Progress bars or percentage ratings on skills (see Section 7)
- Testimonials with lorem ipsum placeholder text (worse than no testimonials)
- A generic Google Maps embed — it adds no information a location text field doesn't
- Coursework lists from a degree you completed 10+ years ago
- GPA (irrelevant at senior level)
- Ericsson internship from 2015–2017 at the same prominence as your YouTube/Google/Rokt work

---

## 3. Information Hierarchy: Above the Fold and Section Order

**Above the fold (visible without scrolling on desktop):**
1. Your name
2. Your title/specialty — one precise phrase, e.g. "Staff Software Engineer, AI/ML & Search"
3. A one-line value statement — what you do and the kind of impact you have
4. Primary CTA (one: "View Resume" or "Get in Touch")
5. Navigation or scroll affordance

Nothing else. Do not cram the sidebar + skills + "about me" paragraphs into the first viewport. The above-fold job is to answer: *Who is this, do I care, what should I do next?* in under 5 seconds.

**Section order for a senior engineer job-seeking context:**
1. Hero / intro (name, title, value statement, CTA)
2. About (2–3 short paragraphs: what you've built, your specialty, what you're looking for)
3. Experience (the most important content for hiring managers; should be 2nd click/scroll)
4. Projects / Portfolio (shows range, initiative, and ability to ship independently)
5. Skills (flat list, grouped — Python, Go, C++; PyTorch, TensorFlow; AWS, GCP; etc.)
6. Contact

Putting "About" before "Experience" is correct. Hiring managers want context before credentials. But the About section should be short — 2–3 paragraphs max, not 6 capability tiles.

---

## 4. Readability Best Practices

**Line length:** Target 60–75 characters per line for body text. The research-backed sweet spot is 66 characters. Lines that span full browser width (100ch+) cause reader eye-tracking errors and fatigue.

**Font size:** Minimum 16px for body text. 17–18px is more comfortable on high-DPI screens.

**Line height:** 1.5–1.65 for body text. Tighter (1.2–1.3) is acceptable for headings.

**Contrast:** WCAG AA minimum is 4.5:1 for body text. In practice, aim for 7:1 for a portfolio — dark text on light background or a carefully chosen dark theme. Dark themes with muted green/teal accent on near-black backgrounds (the Brittany Chiang pattern) work well when contrast is deliberate, not when text is #888 on #1a1a1a.

**Font pairing:** One typeface is almost always better than two. A clean variable sans-serif (Inter, DM Sans, Geist) handles all weight needs. Avoid Google Fonts defaults like Poppins at all costs — it's the most overused portfolio font and immediately reads as template.

**Whitespace:** The dominant signal of "senior vs. junior" in design is whitespace discipline. Junior portfolio pages are dense. Senior portfolio pages breathe. Generous padding between sections (80–120px), clear separation between content blocks, and restraint on decorative elements all read as confidence.

**Hierarchy:** Three heading levels are sufficient. H1 = name/page title. H2 = section headers. H3 = job titles or project names. Do not use all-caps for anything longer than a label.

---

## 5. Visual Design Principles That Signal Senior vs. Junior

**What reads as senior:**
- Minimal palette: 1 background, 1 text color, 1 accent. Not 6 icon illustrations and 4 card variants.
- The site itself demonstrates engineering skill through performance, responsiveness, and interaction quality — not through visual complexity.
- Consistent spacing system. If your section padding is 80px, it's always 80px.
- Restraint on animation. One subtle hover state or scroll-triggered fade is fine. Parallax, spinning icons, and typing animations read as junior showpiece demos.
- Custom domain (yourname.com or yourname.dev) — not a Netlify/GitHub Pages subdomain.
- Responsive and functional on mobile — especially header/nav.

**What reads as junior (template tells):**
- Sidebar layout with avatar + "Show Contacts" toggle button — this is a freelancer template pattern that is extremely widespread; every hiring manager has seen it hundreds of times.
- "What I'm doing" / capabilities grid with stock illustrations — the exact pattern on the current site.
- Progress bar skills section (see Section 7).
- Section headers with matching icon (the ion-icon pattern on the current site).
- Modal testimonials with placeholder data left in the codebase.
- Stock photo project thumbnails pulled from Freepik/Flaticon URLs.
- CDN-linked icon font from `cdnjs.cloudflare.com` for Font Awesome.

The bar is simple: the site should not look like it came from a Dribbble freebie download. If a hiring manager has seen the same layout on 15 other portfolios that week, you've failed at differentiation.

---

## 6. Call to Action

For a senior engineer seeking employment (not freelance clients), the primary CTA hierarchy should be:

1. **"View Resume"** (or "Download Resume" / "Open Resume PDF") — this is what recruiters actually want; make it the easiest possible action
2. **"Get in Touch" / email** — for hiring managers who want to reach out directly

Avoid:
- "Hire Me" — sounds desperate, especially at senior/staff level
- Generic "Contact" with no context
- Multiple competing CTAs in the hero ("Download Resume" AND "See My Work" AND "View Projects")

Place the primary CTA in the hero and repeat it once in the footer or contact section. The resume PDF should also be linked from the Resume/Experience section, because that's where hiring managers will look for it.

The email address should be visible text (scannable by eye), not hidden behind a form. Both a mailto link and a contact form is the right answer.

---

## 7. Common Mistakes and Anti-Patterns

**Progress bars for skills (80% AI/ML, 90% C++):**
This is the most universally mocked element in developer portfolios. The values are meaningless — 90% compared to whom? The concept of "% proficiency" at a language is not a thing engineers recognize. It signals that you copied a template. Remove them. Replace with a grouped flat list: Languages, Frameworks, Infrastructure, etc.

**Listing "Leadership" as a skill with a percentage:**
Leadership is not a technical skill and does not belong in the same list as programming languages. It belongs in your experience descriptions as demonstrated behavior.

**"What I'm doing" / services section:**
This is a freelancer pattern for someone selling web design or video production services. A senior engineer at a company does not need to advertise "Software Engineering" and "AI Engineering" as services. It reads as a template fill-in that wasn't removed.

**Too many social links:**
Instagram, Mastodon, Bluesky, and Buy Me a Coffee have no professional signal for a hiring context. Each one is a link that sends a recruiter off your page and into personal/hobbyist territory.

**Posting your phone number publicly:**
A public phone number on a personal site is spam magnet with no upside. Email suffices. Remove it.

**Stock illustrations as project thumbnails:**
Pulling a Freepik illustration URL as a project image says "I had no real screenshot." Take an actual screenshot of the running project, or design a simple custom thumbnail.

**Google Maps embed on a Contact page:**
Adds load time, third-party tracking, and zero information. Your location is already text on the page. Remove it.

**Leaving dead code in the source:**
The current site has commented-out lorem ipsum testimonials and dead `data-testimonials-item` modal code. Anyone who views source (which hiring engineers do) sees placeholder content.

**Resume section that duplicates the PDF:**
The Resume tab has every job, all dates, all skills. This is fine — but if it's identical to what's in the PDF, it's redundant. The site version should add things the PDF cannot: links, more descriptive narrative, or context.

---

## 8. Navigation Patterns

**Single-page vs. multi-page:**
For a portfolio with fewer than 5 content areas, single-page (or tab-within-single-page) is almost always correct. The current site's tab navigation that swaps article content within the same page is a valid pattern, but it breaks browser history and the back button — which is a subtle UX failure that engineers notice.

**Recommended for a senior engineer portfolio:**
Single scrolling page with sticky top navigation. Sections are anchored. Nav links smooth-scroll to section. This is the pattern that most well-regarded senior dev portfolios use (see: Brittany Chiang's v4, Lee Robinson's site, Josh Comeau's site). The URL updates on scroll via IntersectionObserver.

**Why not tabs:**
Tab navigation that hides/shows content via JavaScript means:
- No deep linking (you can't share a URL to the Projects section)
- No browser history for section navigation
- Not crawlable by search engines without additional work
- Resume/projects sections are invisible to anyone who doesn't click every tab

**Mobile nav:** Hamburger menu is acceptable for mobile if the icon is clear and the menu opens predictably. The current "Show Contacts" toggle in the sidebar is non-obvious.

---

## 9. What Recruiters and Hiring Managers Actually Look At

**Recruiters (first 10–30 seconds):**
- Name, title, location — does this person match what I'm looking for?
- Company names in experience — signals caliber
- Resume PDF link — they want to download it and put it in their ATS

**Hiring managers / tech leads (if they look at all):**
- GitHub link — they click this before they read your site
- Project descriptions — not for what the project does, but for how you describe your decisions
- Stack and system scale (did you operate at a scale that's relevant?)
- Whether the site itself has quality code (View Source is a real behavior)

**What a survey of 60+ hiring managers found (profy.dev):**
- For mid-to-senior engineers, a portfolio site matters significantly less than for junior engineers
- The primary value is differentiation — most candidates at senior level don't have one, so having one is an edge
- A bad portfolio site is actively harmful — it can eliminate a candidate who would have passed on resume alone
- Projects matter far more than the site's visual design
- Nobody reads "About Me" carefully; they skim for signals

---

## 10. Credibility Signals: Help vs. Hurt

**Help credibility:**
- Quantified impact in experience descriptions ("60% compute reduction, ~$1.8M savings") — the current site does this well
- Live demos that actually work
- GitHub repos with real commit history and readable READMEs
- Custom domain
- Fast load time (sub-2s) and no console errors
- Accessible markup (proper heading hierarchy, alt text, semantic HTML)
- The blog link (zhach.news) — writing shows thinking
- Staff/Senior title at recognizable companies (YouTube, Google, Rokt)

**Hurt credibility:**
- Broken links or 404 project demos (the current site links to Render free-tier apps which go to sleep — showing a loading spinner to a recruiter is a silent killer)
- Progress bars (see above — every experienced hiring manager knows this is a template artifact)
- Lorem ipsum in any visible or commented state
- "Highly accomplished" in a self-written bio — avoid self-laudatory adjectives; let the facts speak
- Freepik stock illustration URLs as project images
- Phone number on public internet
- "Buy Me a Coffee" link in the professional contacts section
- Internship from 10+ years ago given equal visual weight as Staff Engineer at Google

---

*Reference compiled from: recruiter surveys, DEV Community post-mortems on 40+ portfolio reviews, Baymard usability research, WCAG readability standards, and analysis of well-regarded senior engineer portfolios including Brittany Chiang (brittanychiang.com), design writing from Tobias van Schneider (vanschneider.com), and profy.dev's hiring manager survey.*

Sources:
- [Don't waste time on a (React) portfolio website — 60+ hiring managers survey](https://profy.dev/article/portfolio-websites-survey)
- [What I learned after reviewing over 40 developer portfolios](https://dev.to/kethmars/what-i-learned-after-reviewing-over-40-developer-portfolios-9-tips-for-a-better-portfolio-4me7)
- [Don't use progress bars in your CV](https://dev.to/iamzoka/don-t-use-progress-bars-in-your-cv-feb)
- [Do's and Don'ts of Creating Your Portfolio Website](https://dev.to/ioanat94/dos-and-donts-of-creating-your-portfolio-website-2h4p)
- [Senior portfolios vs. junior portfolios — Tobias van Schneider](https://vanschneider.com/blog/portfolio-tips/senior-portfolios-vs-junior-portfolios/)
- [Readability: The Optimal Line Length — Baymard Institute](https://baymard.com/blog/line-length-readability)
- [How Recruiters and Hiring Managers Actually Look at Your Portfolio](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)
- [What Recruiters Look for in Developer Portfolios — Pesto](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios)
- [Portfolio vs Resume: What to Know — Teal](https://www.tealhq.com/post/portfolio-vs-resume)
- [Exploration of Single-Page Websites — Smashing Magazine](https://www.smashingmagazine.com/2012/11/navigation-patterns-in-single-page-websites/)
- [Brittany Chiang — Portfolio (reference design)](https://brittanychiang.com/)
