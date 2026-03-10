// Page Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
        }, 500);
    }, 1500);
});

// Background Particles
function createParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 20 + 10}s linear ${Math.random() * 10}s infinite`;
        container.appendChild(particle);
    }
}

// Sidebar Active Link & Smooth Scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Instant active state on click
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Sync active link with scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Chart.js Implementation
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Laravel', 'React/Next.js', 'PHP', 'JavaScript', 'Java', 'Vue.js', 'MySQL', 'Flutter'],
            datasets: [{
                label: 'Proficiency Level (%)',
                data: [90, 85, 92, 88, 75, 80, 85, 70],
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: '#6366f1',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(99, 102, 241, 0.8)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#1e293b', padding: 12, cornerRadius: 10, displayColors: false }
            }
        }
    });
}

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => { card.style.display = 'none'; }, 400);
            }
        });
    });
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const roles = ['Full Stack Developer', 'Informatics Student', 'Web Enthusiast', 'UI/UX Designer'];
let rIdx = 0, cIdx = 0, isDel = false;

function type() {
    const curr = roles[rIdx];
    typingText.textContent = isDel ? curr.substring(0, cIdx--) : curr.substring(0, cIdx++);
    let speed = isDel ? 50 : 100;
    if (!isDel && cIdx > curr.length) { isDel = true; speed = 2000; }
    else if (isDel && cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; speed = 500; }
    setTimeout(type, speed);
}

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active-reveal'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Modal
const modal = document.getElementById('project-modal');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('modal-title').textContent = card.dataset.title;
        document.getElementById('modal-desc').textContent = card.dataset.desc;
        document.getElementById('modal-tech-list').textContent = card.dataset.tech;
        document.getElementById('modal-img').src = card.dataset.img;
        modal.style.display = 'block';
    });
});
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Init
document.addEventListener('DOMContentLoaded', () => {
    type();
    createParticles();
    initSkillsChart();
});
