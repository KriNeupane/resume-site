// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

function updateNavbarForTheme() {
    const navbar = document.querySelector('.navbar');
    const isDark = body.getAttribute('data-theme') === 'dark';
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        if (isDark) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.15)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.12)';
        }
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
            navbar.style.boxShadow = '0 1px 20px rgba(255, 255, 255, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.12)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'bi bi-moon-fill';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'bi bi-sun-fill';
        localStorage.setItem('theme', 'dark');
    }

    // Update navbar immediately after theme change
    setTimeout(updateNavbarForTheme, 50);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'bi bi-sun-fill';
}

// Update navbar on page load
setTimeout(updateNavbarForTheme, 100);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in-up, .timeline-item, .certificate-card').forEach(el => {
    observer.observe(el);
});

// Parallax Forests Effect
const layers = document.querySelectorAll('.parallax .layer');

function parallax() {
    const y = window.scrollY;
    // Only run if we are near the top to save performance
    if (y > window.innerHeight) return;

    for (let i = 0; i < layers.length; i++) {
        // Determine speed: closer layers (higher index) move faster or differently
        // Original snippet: layers[layers.length-i].style.transform = ...
        // Let's adjust for our layer order (1 is back, 6 is front)
        // We want back layers to move slower, front layers faster.
        // i=0 is layer 1 (back), i=5 is layer 6 (front)

        const speed = (i + 1) * 0.15;
        layers[i].style.transform = `translateY(${y * speed}px)`;
    }
}

window.addEventListener('scroll', parallax, { passive: true });

// 3D Tilt Effect for Greeting
const hero = document.getElementById('hero');
const greeting = document.getElementById('heroGreeting');

if (hero && greeting) {
    greeting.style.transition = 'transform 0.1s ease-out';
    greeting.style.display = 'inline-block';

    hero.addEventListener('mousemove', (e) => {
        const rect = greeting.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Sensitivity factor - increased for better effect since text is larger
        const factor = 0.2;

        greeting.style.transform = `perspective(1000px) rotateX(${-y * factor}deg) rotateY(${x * factor}deg) scale(1.05)`;
    });

    hero.addEventListener('mouseleave', () => {
        greeting.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        greeting.style.transition = 'transform 0.5s ease-out';
    });
}

// Navbar background on scroll
window.addEventListener('scroll', updateNavbarForTheme);
