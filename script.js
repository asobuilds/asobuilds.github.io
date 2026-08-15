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
                delay = 2000; // Pause at end of phrase
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
});

// ===== SMOOTH SCROLLING (Fallback) =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});