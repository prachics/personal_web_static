"use strict";

(() => {

const root = document.documentElement;
const header = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header border once the page has scrolled
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Theme: an explicit choice is saved; otherwise the system setting applies
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.dataset.theme || (systemDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme lasts for this page only */ }
  });
}

// Mobile navigation
function setNav(open) {
  mainNav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflow = open ? 'hidden' : '';
}
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => setNav(!mainNav.classList.contains('open')));
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mainNav.classList.contains('open')) setNav(false); });
}

// Highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
// Every section is observed, so scrolling back to one without a nav link clears the highlight.
const tracked = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window && tracked.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  tracked.forEach(s => navObserver.observe(s));
}

// Fade sections in as they enter the viewport
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

// Step through the IncidentIQ flow, holding longer at the approval gate
const flow = document.getElementById('iq-flow');
if (flow && !reduceMotion) {
  const steps = [...flow.querySelectorAll('.flow-step')];
  let i = 0;
  const tick = () => {
    steps.forEach((s, n) => s.classList.toggle('lit', n === i));
    const hold = steps[i].classList.contains('gate') ? 2200 : 900;
    i = (i + 1) % steps.length;
    setTimeout(tick, hold);
  };
  tick();
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
