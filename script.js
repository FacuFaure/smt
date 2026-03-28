'use strict';

// ── ACORDEONES ──
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const isOpen = header.classList.contains('open');
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('open');
            h.nextElementSibling.style.display = 'none';
        });
        if (!isOpen) {
            header.classList.add('open');
            header.nextElementSibling.style.display = 'block';
        }
    });
});

// ── FADE-IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── FORMULARIO DE DENUNCIA ──
const form = document.getElementById('denuncia-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = form.querySelector('#nombre')?.value.trim();
        const modelo = form.querySelector('#modelo')?.value.trim();
        const tipo = form.querySelector('#tipo-maltrato')?.value;
        const gravedad = form.querySelector('#gravedad')?.value;

        if (!nombre || !modelo || !tipo || !gravedad) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const expNum = 'SMT/2025/DEN-' + String(Math.floor(Math.random() * 90000) + 10000);
        const confirmEl = document.getElementById('confirmacion');
        if (confirmEl) {
            document.getElementById('exp-numero').textContent = expNum;
            form.style.display = 'none';
            confirmEl.style.display = 'block';
            confirmEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ── CONTADOR ANIMADO ──
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString('es-ES');
        if (current >= target) clearInterval(timer);
    }, 16);
}

const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
