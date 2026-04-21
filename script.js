/* =============================================
   BARSHAN PORTFOLIO — Script
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // NAVIGATION
    // =============================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.dataset.section === id) item.classList.add('active');
                });
            }
        });
    }

    window.addEventListener('scroll', updateNav);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const el = document.querySelector(a.getAttribute('href'));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =============================================
    // COUNTER ANIMATION
    // =============================================
    const counters = document.querySelectorAll('.metric-val');
    let counted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 1800;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const metricsEl = document.querySelector('.hero-metrics');
    if (metricsEl) counterObserver.observe(metricsEl);

    // =============================================
    // SCROLL REVEAL
    // =============================================
    const revealTargets = document.querySelectorAll(
        '.bento-card, .project-showcase, .contact-block, .social-pill, .cv-download-btn'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));

    // Stagger bento cards
    const bentoCards = document.querySelectorAll('.bento-card');
    const bentoObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        visible.forEach((entry, i) => {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            bentoObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    bentoCards.forEach(card => bentoObserver.observe(card));

    // Stagger project cards
    const projectCards = document.querySelectorAll('.project-showcase');
    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    projectCards.forEach(card => projectObserver.observe(card));

    // =============================================
    // PROJECT CARD MOUSE GLOW
    // =============================================
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mx', x + 'px');
            card.style.setProperty('--my', y + 'px');
        });
    });

    // =============================================
    // PAGE LOAD
    // =============================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
