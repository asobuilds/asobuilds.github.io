// ===== AUTO-UPDATE FOOTER YEAR =====
document.addEventListener('DOMContentLoaded', function () {
    const year = new Date().getFullYear();
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `<p>&copy; ${year} Agene S. Okoh. Built with ❤️</p>`;
    }

    // ===== TYPING EFFECT =====
    const phrases = [
        'AI Native | Full Stack Developer | Software Engineer',
        'Building digital solutions with AI',
        'Python • Go • React',
        'Turning ideas into impact'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let delay = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 500;
            }
            
            setTimeout(typeEffect, delay);
        }
        
        typeEffect();
    }

    // ===== DARK MODE TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// ===== SMOOTH SCROLLING (Fallback for older browsers) =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});