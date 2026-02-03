// ========================================
// TYPING ANIMATION
// ========================================
const typedTextElement = document.getElementById('typed-text');
const phrases = [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Flutter Developer',
    'ML Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when page loads (only if typed element exists)
window.addEventListener('load', () => {
    if (typedTextElement) setTimeout(typeEffect, 1000);
});

// ======================
// THEME TOGGLE
// ======================
const themeToggle = document.getElementById('theme-toggle');
const themeIconSpan = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
const themeLabelSpan = themeToggle ? themeToggle.querySelector('.theme-label') : null;
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIconSpan) themeIconSpan.textContent = theme === 'light' ? '☀️' : '🌙';
    if (themeLabelSpan) themeLabelSpan.textContent = theme === 'light' ? 'Light' : 'Dark';
    if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
}

// Initialize theme from localStorage or system
const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem('theme', next);
        // small visual press
        themeToggle.animate([{ transform: 'scale(0.98)' }, { transform: 'scale(1)' }], { duration: 160 });
    });
}

// ======================
// PROJECT FILTERS
// ======================
const filterButtons = document.querySelectorAll('.project-filters .filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
            } else {
                const tags = (card.getAttribute('data-tags') || '').split(',').map(t => t.trim());
                card.style.display = tags.includes(filter) ? '' : 'none';
            }
        });
    });
});

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a nav link (safe remove)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL WITH OFFSET
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// PARTICLE ANIMATION IN HERO
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        // use CSS variable for primary tint when available
        const alpha = Math.random() * 0.6 + 0.08;
        // star-like palette (white, warm, cool) for night-sky particles
        const starColors = ['255,255,255','255,244,200','200,220,255'];
        const chosen = starColors[Math.floor(Math.random() * starColors.length)];
        particle.style.background = `rgba(${chosen}, ${alpha})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle float animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
        }
    }
`;
document.head.appendChild(style);

// Create particles on page load
window.addEventListener('load', createParticles);

// ========================================
// SCROLL ANIMATIONS FOR SECTIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const observeElements = document.querySelectorAll('.skill-category, .project-card, .achievement-card, .about-content, .contact-content');
observeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// FORM HANDLING
// ========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name') ? document.getElementById('name').value : '',
            email: document.getElementById('email') ? document.getElementById('email').value : '',
            message: document.getElementById('message') ? document.getElementById('message').value : ''
        };
        
        // Here you would typically send the data to a backend
        // For now, we'll just show a success message
        
        // Show success animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        } else {
            // still reset form if no button element found
            contactForm.reset();
        }
        
        console.log('Form submitted:', formData);
    });
}

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ADD GLOW EFFECT TO CARDS ON MOUSE MOVE
// ========================================
const cards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add the glow effect CSS
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .project-card::before,
    .skill-category::before,
    .achievement-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .project-card:hover::before,
    .skill-category:hover::before,
    .achievement-card:hover::before {
        opacity: 1;
    }
    
    .project-card,
    .skill-category,
    .achievement-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(glowStyle);

// ==========================
// HERO SPOTLIGHT (mouse-follow)
// ==========================
(() => {
    const hero = document.querySelector('.hero');
    const spotlight = document.querySelector('.hero-spotlight');
    if (!hero || !spotlight) return;

    let raf = null;
    const state = { xPerc: 50, yPerc: 50, visible: false };

    function updateSpotlight() {
        spotlight.style.setProperty('--mx', state.xPerc + '%');
        spotlight.style.setProperty('--my', state.yPerc + '%');
        spotlight.classList.toggle('active', state.visible);
        raf = null;
    }

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        state.xPerc = Math.round((x / rect.width) * 100);
        state.yPerc = Math.round((y / rect.height) * 100);
        state.visible = true;
        if (!raf) raf = requestAnimationFrame(updateSpotlight);
    });

    hero.addEventListener('mouseleave', () => {
        state.visible = false;
        if (!raf) raf = requestAnimationFrame(updateSpotlight);
    });

    // Add subtle parallax transform to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        let parraf = null;
        const pstate = { x: 50, y: 50 };
        function updateParallax() {
            const tx = (pstate.x - 50) * -0.6; // px
            const ty = (pstate.y - 50) * -0.45; // px
            heroContent.style.transform = `translate(${tx}px, ${ty}px) scale(1.01)`;
            parraf = null;
        }

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            pstate.x = Math.round((x / rect.width) * 100);
            pstate.y = Math.round((y / rect.height) * 100);
            if (!parraf) parraf = requestAnimationFrame(updateParallax);
        });

        hero.addEventListener('mouseleave', () => {
            // reset
            heroContent.style.transform = '';
        });
    }

    // Scroll parallax for hero particles (adds depth)
    const particlesEl = document.getElementById('particles');
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const diff = scroll - lastScroll;
        lastScroll = scroll;
        if (particlesEl) particlesEl.style.transform = `translateY(${scroll * 0.15}px)`;
    }, { passive: true });

    // Slight initial reveal when user first moves (for discoverability)
    hero.addEventListener('touchstart', () => {
        // disable on touch devices (CSS hides it), but ensure no JS errors
        state.visible = false;
    });
})();

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stats section and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statElements = entry.target.querySelectorAll('.stat h4');
            statElements.forEach((el) => {
                const text = el.textContent;
                const number = parseFloat(text);
                if (!isNaN(number)) {
                    el.textContent = '0';
                    animateCounter(el, number);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ========================================
let cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ========================================
// PREVENT SCROLL RESTORATION
// ========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ========================================
// STARFIELD CANVAS (night-sky background)
// Creates a performant canvas of twinkling stars behind the hero.
// ========================================
(function initStarfield() {
    // run on load so CSS is applied
    function setup() {
        // do not run if container already exists
        if (document.getElementById('starfield')) return;

        const container = document.createElement('div');
        container.id = 'starfield';
        document.body.appendChild(container);

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const colors = ['255,255,255','255,244,200','200,220,255'];
        let stars = [];
        let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
        let rafId = null;
        let lastTime = 0;

        function createStars() {
            stars = [];
            // density based on full page, capped
            const pageArea = Math.max(500000, window.innerWidth * document.documentElement.scrollHeight);
            const count = Math.min(1500, Math.floor(pageArea / 12000));
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 1.8 + (Math.random() < 0.06 ? 1.2 : 0),
                    baseAlpha: Math.random() * 0.9 + 0.1,
                    phase: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.003 + 0.001,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    driftX: (Math.random() - 0.5) * 0.2,
                    driftY: (Math.random() - 0.5) * 0.15,
                    vx: (Math.random() - 0.5) * 0.08,
                    vy: (Math.random() - 0.5) * 0.05
                });
            }
        }

        function resize() {
            w = window.innerWidth;
            h = document.documentElement.scrollHeight;
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createStars();
        }

        function render(t) {
            const now = t || performance.now();
            const dt = now - lastTime;
            lastTime = now;

            ctx.clearRect(0, 0, w, h);
            // subtle gradient overlay to keep depth
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(0,0,8,0.25)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.phase += s.speed * dt;
                // Add drifting motion to stars
                s.x += s.vx * 0.016;
                s.y += s.vy * 0.016;
                // Wrap around edges
                if (s.x < 0) s.x = w;
                if (s.x > w) s.x = 0;
                if (s.y < 0) s.y = h;
                if (s.y > h) s.y = 0;
                
                const tw = 0.5 + 0.5 * Math.sin(s.phase);
                const alpha = Math.min(1, s.baseAlpha * (0.6 + 0.8 * tw));
                ctx.beginPath();
                ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            rafId = requestAnimationFrame(render);
        }

        function start() {
            if (!rafId) {
                lastTime = performance.now();
                rafId = requestAnimationFrame(render);
            }
        }

        function stop() {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        // Initialize with sizing
        resize();
        start();

        // Resize observer for responsive canvas
        let resizeTimeout = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 120);
        });

        // Pause when page hidden to save battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop(); else start();
        });

        // If canvas not supported (very old browsers), add CSS fallback
        if (!ctx) {
            const fallback = document.createElement('div');
            fallback.className = 'css-stars';
            container.appendChild(fallback);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(setup, 50);
    } else {
        window.addEventListener('load', setup);
    }

})();


// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ========================================
// PRELOADER (OPTIONAL)
// ========================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});

// ========================================
// CONSOLE MESSAGE
// ========================================
// console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
// console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #cbd5e1;');
// console.log('%c📧 tanu25shree11@gmail.com', 'font-size: 14px; color: #14b8a6;')