"use strict";

(() => {

const root = document.documentElement;
const topbar = document.getElementById('site-header');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const onHome = !!document.getElementById('impact');
const home = onHome ? '' : './index.html';
const EMAIL = 'prachi.saibewar.cs@gmail.com';

// Deep links (index.html#contact) land instantly and again once web fonts have settled the layout;
// smooth scrolling is switched on only after that, for in-page clicks.
function settleHash() {
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) target.scrollIntoView();
}
window.addEventListener('load', () => {
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => {
    settleHash();
    if (!reduceMotion) requestAnimationFrame(() => root.classList.add('smooth'));
  });
});

// Short confirmations ("Copied") in one shared live region
let toastEl = null;
let toastTimer = 0;
function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

// Top bar border once the page has scrolled
if (topbar) {
  const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Theme: an explicit choice is saved; otherwise the system setting applies
function toggleTheme() {
  const current = root.dataset.theme === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => { m.content = next === 'dark' ? '#0a0c12' : '#f7f7f5'; });
  try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme lasts for this page only */ }
}
document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', toggleTheme));

// Copy the email address; falls back to a hidden textarea when the async clipboard is missing or refused
function copyFallback() {
  const ta = document.createElement('textarea');
  ta.value = EMAIL; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  ta.remove();
  return ok;
}
function copyEmail(statusEl) {
  const report = ok => {
    const msg = ok ? 'Copied ' + EMAIL : 'Copy failed. The address is ' + EMAIL;
    if (statusEl) {
      statusEl.textContent = ok ? 'Copied' : "Couldn't copy";
      setTimeout(() => { statusEl.textContent = ''; }, 2000);
    } else {
      toast(msg);
    }
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(EMAIL).then(() => report(true), () => report(copyFallback()));
  } else {
    report(copyFallback());
  }
}
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => copyEmail(btn.parentElement.querySelector('.copied')));
});

// Jump menu: ⌘K / Ctrl+K anywhere, the "Jump to" button, and the menu button on small screens
const dialog = document.getElementById('cmdk');
if (dialog && typeof dialog.showModal === 'function') {
  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-expanded', 'true');
  input.setAttribute('aria-controls', 'cmdk-list');
  input.setAttribute('aria-autocomplete', 'list');
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Sections and links');
  const items = [
    { group: 'Sections', label: 'Impact', hint: '01', href: home + '#impact' },
    { group: 'Sections', label: 'Projects', hint: '02', href: home + '#work' },
    { group: 'Sections', label: 'Experience', hint: '03', href: home + '#experience' },
    { group: 'Sections', label: 'Open source & writing', hint: '04', href: home + '#open-source' },
    { group: 'Sections', label: 'Skills', hint: '05', href: home + '#skills' },
    { group: 'Sections', label: 'Education', hint: '06', href: home + '#education' },
    { group: 'Sections', label: 'Contact', hint: '07', href: home + '#contact' },
    { group: 'Links', label: 'IncidentIQ case study', hint: 'page', href: './incidentiq.html' },
    { group: 'Links', label: 'Résumé (PDF)', hint: '↗', href: './Prachi-Saibewar-Resume.pdf', external: true },
    { group: 'Links', label: 'GitHub', hint: '↗', href: 'https://github.com/prachics', external: true },
    { group: 'Links', label: 'LinkedIn', hint: '↗', href: 'https://www.linkedin.com/in/prachi-saibewar/', external: true },
    { group: 'Actions', label: 'Copy email address', hint: 'copy', run: () => copyEmail(null) },
    { group: 'Actions', label: 'Email Prachi', hint: 'mail', href: 'mailto:' + EMAIL },
    { group: 'Actions', label: 'Switch light / dark theme', hint: 'theme', run: toggleTheme },
  ];
  let opener = null;
  let visible = [];
  let sel = 0;

  function render() {
    const q = input.value.trim().toLowerCase();
    visible = items.filter(it => !q || it.label.toLowerCase().includes(q) || it.group.toLowerCase().includes(q));
    list.textContent = '';
    let lastGroup = '';
    visible.forEach((it, n) => {
      if (it.group !== lastGroup) {
        const g = document.createElement('li');
        g.className = 'cmdk-group'; g.textContent = it.group; g.setAttribute('role', 'presentation');
        list.appendChild(g);
        lastGroup = it.group;
      }
      const li = document.createElement('li');
      li.setAttribute('role', 'presentation');
      const el = document.createElement(it.href ? 'a' : 'button');
      el.className = 'cmdk-item';
      el.id = 'cmdk-opt-' + n;
      el.setAttribute('role', 'option');
      if (it.href) {
        el.href = it.href;
        if (it.external) { el.target = '_blank'; el.rel = 'noopener'; }
      } else {
        el.type = 'button';
      }
      const a = document.createElement('span'); a.textContent = it.label;
      const b = document.createElement('span'); b.textContent = it.hint; b.setAttribute('aria-hidden', 'true');
      el.append(a, b);
      el.addEventListener('click', () => choose(it));
      el.addEventListener('mousemove', () => select(n, false));
      li.appendChild(el);
      list.appendChild(li);
    });
    if (!visible.length) {
      const li = document.createElement('li');
      li.className = 'cmdk-empty'; li.textContent = 'No matches'; li.setAttribute('role', 'presentation');
      list.appendChild(li);
    }
    select(0, false);
  }

  function select(n, scroll) {
    sel = n;
    const all = list.querySelectorAll('.cmdk-item');
    all.forEach((el, i) => {
      el.classList.toggle('sel', i === n);
      el.setAttribute('aria-selected', String(i === n));
    });
    const cur = all[n];
    if (cur) input.setAttribute('aria-activedescendant', cur.id); else input.removeAttribute('aria-activedescendant');
    if (!cur || !scroll) return;
    // When focus is in the list (touch screens), focus follows the highlight so Enter opens it.
    if (list.contains(document.activeElement)) cur.focus({ preventScroll: true });
    cur.scrollIntoView({ block: 'nearest' });
  }

  // Links navigate by themselves; the menu just closes. Actions run here.
  function choose(it) {
    close();
    if (it.run) it.run();
  }

  function open(from) {
    opener = from || document.activeElement;
    input.value = '';
    render();
    dialog.showModal();
    // On touch screens, don't pop the keyboard over the list.
    if (window.matchMedia('(hover: hover)').matches) input.focus();
    else list.querySelector('.cmdk-item')?.focus({ preventScroll: true });
  }
  function close() {
    if (dialog.open) dialog.close();
  }
  dialog.addEventListener('close', () => { if (opener && opener.focus) opener.focus({ preventScroll: true }); });
  dialog.addEventListener('click', e => { if (e.target === dialog) close(); });

  input.addEventListener('input', render);
  dialog.addEventListener('keydown', e => {
    const count = visible.length;
    if (e.key === 'ArrowDown' && count) { e.preventDefault(); select((sel + 1) % count, true); }
    else if (e.key === 'ArrowUp' && count) { e.preventDefault(); select((sel - 1 + count) % count, true); }
    else if (e.key === 'Enter' && document.activeElement === input && count) {
      e.preventDefault();
      list.querySelectorAll('.cmdk-item')[sel].click();
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dialog.open) close(); else open();
    }
  });
  document.querySelectorAll('[data-cmdk-open], .nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => open(btn));
  });

  // Show Ctrl rather than ⌘ outside Apple platforms
  if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    document.querySelectorAll('.kbd-btn kbd').forEach(k => { k.textContent = 'Ctrl K'; });
  }
}

// Highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
// Every section is observed, so scrolling back to one without a nav link clears the highlight.
const tracked = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window && tracked.length && navLinks.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  tracked.forEach(s => navObserver.observe(s));
}

// Fade blocks in as they enter the viewport; the impact bars animate on the same signal
const reveals = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// Step through the IncidentIQ run, holding longer at the approval gate
const flow = document.getElementById('iq-flow');
if (flow && !reduceMotion) {
  const steps = [...flow.querySelectorAll('.step')];
  let i = 0;
  const tick = () => {
    steps.forEach((s, n) => s.classList.toggle('lit', n === i));
    const hold = steps[i].classList.contains('step--gate') ? 2400 : 850;
    i = (i + 1) % steps.length;
    setTimeout(tick, hold);
  };
  tick();
}

// Hero trace: replay the run every few seconds while it is on screen
const trace = document.getElementById('trace');
if (trace && !reduceMotion) {
  let timer = 0;
  const run = () => {
    trace.classList.remove('play');
    void trace.offsetWidth; // restart the CSS animations
    trace.classList.add('play');
  };
  const io = new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) { run(); timer = setInterval(run, 7500); }
  });
  io.observe(trace);
}

// Local time in Orlando
const clock = document.getElementById('local-time');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  const update = () => { clock.textContent = fmt.format(new Date()); };
  update();
  setInterval(update, 30000);
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
})();
