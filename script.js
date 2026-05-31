// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const hamIcon = hamburger.querySelector('.hamburger-icon');
const crossIcon = hamburger.querySelector('.cross-icon');

hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamIcon.style.display = isOpen ? 'none' : 'block';
    crossIcon.style.display = isOpen ? 'block' : 'none';
});

document.querySelectorAll('.links').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        hamIcon.style.display = 'block';
        crossIcon.style.display = 'none';
    });
});

// ===== TYPING ANIMATION =====
const phrases = [
    'multi-agent AI systems',
    'NL2SQL pipelines',
    'GenAI analytics platforms',
    'RAG & hybrid-search apps',
    'enterprise LLM workflows',
    'Databricks Genie spaces',
];

const typedEl = document.getElementById('typed');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let delay = 90;

function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        delay = 45;
    } else {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        delay = 90;
    }

    if (!deleting && charIdx === current.length) {
        deleting = true;
        delay = 2000;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 500;
    }

    setTimeout(type, delay);
}

type();

// ===== SCROLL FADE-IN =====
const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.links');

const scrollSpy = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => scrollSpy.observe(s));

// ===== ANALYTICS EVENT TRACKING =====
function trackEvent(eventName, label) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, { event_label: label });
    }
}

document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
        const event = el.getAttribute('data-track');
        const labelMap = {
            resume_download: 'Resume Downloaded',
            click_linkedin:  'LinkedIn Clicked',
            click_github:    'GitHub Clicked',
            click_leetcode:  'LeetCode Clicked',
            click_email:     'Email Clicked',
        };
        trackEvent(event, labelMap[event] || event);
    });
});

// ===== CONTACT FORM (basic feedback) =====
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent!';
        btn.style.background = '#00a884';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
}
