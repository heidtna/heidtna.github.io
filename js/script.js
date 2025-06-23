// Smooth scrolling for navigation links
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle (basic functionality)
const mobileMenu = document.querySelector('.mobile-menu');
const mobileDropdown = document.querySelector('.mobile-nav-dropdown');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileDropdown.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-dropdown a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileDropdown.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileDropdown.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileDropdown.classList.remove('active');
    }
});

// Add some interactive hover effects
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic typing effect for hero tagline
const tagline = document.querySelector('.hero .tagline');
const phrases = [
    'Automation Engineer | Test Specialist | Problem Solver',
    'Passionate Learner | Creative Thinker | Team Player',
    'Breaking New Features The Smart Way Since 2021'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeWriter() {
    const current = phrases[currentPhrase];
    
    if (isDeleting) {
        tagline.textContent = current.substring(0, currentChar - 1);
        currentChar--;
        
        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        tagline.textContent = current.substring(0, currentChar + 1);
        currentChar++;
        
        if (currentChar === current.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Start typing effect after page loads
setTimeout(typeWriter, 2000);