// ============================================================
// 1. LOADING SCREEN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const percentDisplay = document.getElementById('loader-percent');
    const barFill = document.getElementById('loader-bar-fill');
    const statusText = document.getElementById('loader-status');

    const statusMessages = [
        'Loading modules...',
        'Connecting to kernel...',
        'Fetching user profile...',
        'Initializing environment...',
        'Almost ready...'
    ];

    let progress = 0;
    let msgIndex = 0;

    // Simulate loading with a more natural curve
    function simulateLoading() {
        // Progress increases more slowly at first, then accelerates
        const increment = Math.random() * 6 + 1;
        progress = Math.min(progress + increment, 100);
        
        percentDisplay.textContent = Math.floor(progress) + '%';
        barFill.style.width = progress + '%';

        // Update status message at certain milestones
        if (progress >= 20 && msgIndex === 0) {
            statusText.textContent = statusMessages[1];
            msgIndex = 1;
        } else if (progress >= 40 && msgIndex === 1) {
            statusText.textContent = statusMessages[2];
            msgIndex = 2;
        } else if (progress >= 65 && msgIndex === 2) {
            statusText.textContent = statusMessages[3];
            msgIndex = 3;
        } else if (progress >= 85 && msgIndex === 3) {
            statusText.textContent = statusMessages[4];
            msgIndex = 4;
        }

        if (progress < 100) {
            // Dynamic delay: slower at beginning, faster toward end
            const delay = progress < 30 ? 120 : progress < 60 ? 80 : 40;
            setTimeout(simulateLoading, delay);
        } else {
            // Complete
            statusText.textContent = 'Ready!';
            setTimeout(() => {
                loader.classList.add('hidden');
                // Initialize everything after loader disappears
                initializeApp();
            }, 400);
        }
    }

    // Start loading
    simulateLoading();

    // ============================================================
    // 2. INITIALIZE APPLICATION
    // ============================================================
    function initializeApp() {
        // Update footer year
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
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }

        // ===== CANVAS BACKGROUND: PARTICLE SYSTEM =====
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');

        let width, height, particles, mouse;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;

                if (mouse) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const angle = Math.atan2(dy, dx);
                        const force = (150 - dist) / 150 * 0.5;
                        this.x += Math.cos(angle) * force;
                        this.y += Math.sin(angle) * force;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.fill();
            }
        }

        const particleCount = Math.min(150, Math.floor((width * height) / 8000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        mouse = null;
        document.addEventListener('mousemove', (e) => {
            mouse = { x: e.clientX, y: e.clientY };
        });
        document.addEventListener('mouseleave', () => {
            mouse = null;
        });

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        // ===== STATUS BAR CLOCK =====
        function updateStatusBar() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            const timeEl = document.getElementById('status-time');
            const dateEl = document.getElementById('status-date');
            if (timeEl) timeEl.textContent = time;
            if (dateEl) dateEl.textContent = date;
        }
        updateStatusBar();
        setInterval(updateStatusBar, 1000);

        // ===== SCROLL-TRIGGERED ANIMATIONS =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, .project-card, .featured-project').forEach(el => {
            observer.observe(el);
        });

        // ===== SMOOTH SCROLLING =====
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

        // ===== TERMINAL OVERLAY =====
        const terminal = document.getElementById('terminal-overlay');
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');
        const terminalClose = document.getElementById('terminal-close');

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                terminal.classList.toggle('active');
                if (terminal.classList.contains('active')) {
                    setTimeout(() => terminalInput.focus(), 100);
                }
            }
            if (e.key === 'Escape' && terminal.classList.contains('active')) {
                terminal.classList.remove('active');
            }
        });

        if (terminalClose) {
            terminalClose.addEventListener('click', () => {
                terminal.classList.remove('active');
            });
        }

        const commands = {
            help: () => {
                return [
                    'Available commands:',
                    '  help     - Show this help message',
                    '  about    - Display information about me',
                    '  skills   - List my technical skills',
                    '  projects - Show my current projects',
                    '  contact  - Show contact information',
                    '  clear    - Clear the terminal',
                    '  whoami   - Display current user',
                    '  date     - Show current date and time',
                    '  echo     - Repeat what you type'
                ].join('\n');
            },
            about: () => {
                return 'Agene S. Okoh — AI Native | Full Stack Developer | Software Engineer\nBuilding digital solutions with Python, Go, and React.';
            },
            skills: () => {
                return 'Python • Go • JavaScript • React • CSS • Git • Docker • PostgreSQL';
            },
            projects: () => {
                return '🌱 Plant Assistant — AI-powered plant identification and care advice for farmers.';
            },
            contact: () => {
                return 'Email: agenesunday143@gmail.com\nGitHub: github.com/asobuilds\nX: x.com/Asobuilds';
            },
            whoami: () => {
                return 'agene@asobuilds.dev';
            },
            date: () => {
                return new Date().toString();
            },
            echo: (args) => {
                return args.join(' ') || '...';
            },
            clear: () => {
                terminalOutput.innerHTML = '';
                return null;
            }
        };

        if (terminalInput) {
            terminalInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const input = terminalInput.value.trim();
                    terminalInput.value = '';

                    const inputLine = document.createElement('div');
                    inputLine.className = 'terminal-line';
                    inputLine.innerHTML = `<span style="color:#22c55e;">$</span> ${input}`;
                    terminalOutput.appendChild(inputLine);

                    const parts = input.split(' ');
                    const cmd = parts[0].toLowerCase();
                    const args = parts.slice(1);

                    let output = '';
                    if (cmd === 'clear') {
                        commands.clear();
                    } else if (commands[cmd]) {
                        output = commands[cmd](args);
                    } else if (cmd) {
                        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
                    }

                    if (output !== null && output !== undefined) {
                        const outputLine = document.createElement('div');
                        outputLine.className = 'terminal-line';
                        outputLine.textContent = output;
                        terminalOutput.appendChild(outputLine);
                    }

                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            });
        }
    }
});