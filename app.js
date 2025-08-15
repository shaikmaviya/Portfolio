// 3D Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.currentSection = 'hero';
        this.isLoading = true;
        this.projectIndex = 0;
        this.projects = [];
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupHeroAnimations();
        this.setupAboutSection();
        this.setupProjectsSection();
        this.setupSkillsSection();
        this.setupExperienceSection();
        this.setupContactSection();
        this.setupScrollAnimations();
        this.setupMouseInteractions();
    }

    // Loading Screen
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.progress-bar');
        const particlesContainer = document.getElementById('loading-particles');

        // Create loading particles
        this.createLoadingParticles(particlesContainer);

        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    this.isLoading = false;
                    this.startHeroAnimations();
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 100);
    }

    createLoadingParticles(container) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(particle);
        }
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
                this.updateActiveNavLink(link);
            });
        });

        // Scroll-based navigation updates
        window.addEventListener('scroll', () => {
            this.updateNavigationOnScroll();
        });
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            this.currentSection = sectionId;
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateNavigationOnScroll() {
        const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const navLink = document.querySelector(`[data-section="${sectionId}"]`);
                    if (navLink && !navLink.classList.contains('active')) {
                        this.updateActiveNavLink(navLink);
                        this.currentSection = sectionId;
                    }
                    break;
                }
            }
        }
    }

    // Hero Section Animations
    setupHeroAnimations() {
        this.setupCodeRain();
        this.setupHeroParticles();
        this.setupTypewriterEffect();
        this.animateNameChars();
    }

    startHeroAnimations() {
        // Start animations after loading
        this.startCodeRain();
        this.startHeroParticles();
        this.startTypewriter();
    }

    setupCodeRain() {
        this.codeRainContainer = document.getElementById('code-rain');
        this.codeChars = ['0', '1', 'def', 'class', 'import', 'for', 'if', 'else', 'try', 'except', '()', '{}', '[]'];
    }

    startCodeRain() {
        setInterval(() => {
            if (this.currentSection === 'hero') {
                this.createCodeChar();
            }
        }, 100);
    }

    createCodeChar() {
        const char = document.createElement('div');
        char.className = 'code-char';
        char.textContent = this.codeChars[Math.floor(Math.random() * this.codeChars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 8 + 5) + 's';
        char.style.opacity = Math.random() * 0.7 + 0.3;
        
        this.codeRainContainer.appendChild(char);
        
        // Remove after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 10000);
    }

    setupHeroParticles() {
        this.heroParticlesContainer = document.getElementById('hero-particles');
    }

    startHeroParticles() {
        setInterval(() => {
            if (this.currentSection === 'hero') {
                this.createHeroParticle();
            }
        }, 200);
    }

    createHeroParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        this.heroParticlesContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    setupTypewriterEffect() {
        this.typewriterElement = document.getElementById('typewriter');
        this.typewriterTexts = [
            'Crafting intelligent solutions with Python',
            'Building scalable web applications',
            'Implementing machine learning algorithms',
            'Creating data-driven insights'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }

    startTypewriter() {
        this.typewriterInterval = setInterval(() => {
            this.updateTypewriter();
        }, 100);
    }

    updateTypewriter() {
        const currentText = this.typewriterTexts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                }, 2000);
            }
        } else {
            this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
            }
        }
    }

    animateNameChars() {
        const nameChars = document.querySelectorAll('.name-char');
        nameChars.forEach((char, index) => {
            char.style.setProperty('--i', index);
        });
    }

    // About Section
    setupAboutSection() {
        const cards = document.querySelectorAll('.card-3d[data-tilt]');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
            
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                this.handleCardTilt(card, e);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardTilt(card);
            });
        });
    }

    handleCardTilt(card, e) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    resetCardTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    // Projects Section
    setupProjectsSection() {
        this.projects = document.querySelectorAll('.project-card');
        this.setupProjectFilters();
        this.setupProjectCarousel();
        this.animateProjectScenes();
    }

    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveFilter(btn);
            });
        });
    }

    filterProjects(filter) {
        this.projects.forEach(project => {
            const category = project.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                project.style.display = 'block';
                project.style.animation = 'none';
                project.offsetHeight; // Trigger reflow
                project.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                project.style.display = 'none';
            }
        });
    }

    updateActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    setupProjectCarousel() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.navigateCarousel(-1));
            nextBtn.addEventListener('click', () => this.navigateCarousel(1));
        }
    }

    navigateCarousel(direction) {
        const visibleProjects = Array.from(this.projects).filter(p => p.style.display !== 'none');
        
        if (visibleProjects.length === 0) return;
        
        this.projectIndex = (this.projectIndex + direction + visibleProjects.length) % visibleProjects.length;
        
        visibleProjects.forEach((project, index) => {
            project.style.transform = `translateX(${(index - this.projectIndex) * 100}%)`;
        });
    }

    animateProjectScenes() {
        // Animate neural network nodes
        this.animateNeuralNodes();
        
        // Start other project scene animations
        setInterval(() => {
            this.animateProjectElements();
        }, 100);
    }

    animateNeuralNodes() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        neuralNodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.5}s`;
        });
    }

    animateProjectElements() {
        // Add dynamic animations to project 3D scenes
        const cubes = document.querySelectorAll('.server-cube');
        const cylinders = document.querySelectorAll('.database-cylinder');
        
        cubes.forEach(cube => {
            if (this.isElementInViewport(cube)) {
                cube.style.animation = 'cubeRotate 4s linear infinite';
            }
        });
        
        cylinders.forEach(cylinder => {
            if (this.isElementInViewport(cylinder)) {
                cylinder.style.animation = 'cylinderPulse 3s ease-in-out infinite';
            }
        });
    }

    // Skills Section
    setupSkillsSection() {
        this.setupSkillOrbs();
        this.setupSkillTree();
    }

    setupSkillOrbs() {
        const skillOrbs = document.querySelectorAll('.skill-orb');
        
        skillOrbs.forEach((orb, index) => {
            orb.addEventListener('mouseenter', () => {
                this.highlightSkillOrb(orb);
            });
            
            orb.addEventListener('mouseleave', () => {
                this.resetSkillOrb(orb);
            });
            
            // Staggered animation
            orb.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Trigger skill level animations on scroll
        this.animateSkillLevels();
    }

    highlightSkillOrb(orb) {
        const orbInner = orb.querySelector('.orb-inner');
        orbInner.style.transform = 'scale(1.2)';
        orbInner.style.boxShadow = '0 20px 40px rgba(var(--color-teal-300-rgb), 0.6)';
    }

    resetSkillOrb(orb) {
        const orbInner = orb.querySelector('.orb-inner');
        orbInner.style.transform = 'scale(1)';
        orbInner.style.boxShadow = '0 10px 20px rgba(var(--color-teal-300-rgb), 0.2)';
    }

    animateSkillLevels() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target;
                    skillLevel.style.animation = 'skillProgress 2s ease-out forwards';
                }
            });
        });
        
        skillLevels.forEach(level => observer.observe(level));
    }

    setupSkillTree() {
        const branchNodes = document.querySelectorAll('.branch-node .node-content');
        
        branchNodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'scale(1.1)';
                node.style.boxShadow = '0 5px 15px rgba(var(--color-teal-300-rgb), 0.3)';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = 'scale(1)';
                node.style.boxShadow = 'none';
            });
        });
    }

    // Experience Section
    setupExperienceSection() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
                }
            });
        });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // Contact Section
    setupContactSection() {
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.querySelector('.contact-submit');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(submitBtn);
            });
        }
        
        // Animate contact items on scroll
        this.animateContactItems();
    }

    handleFormSubmission(btn) {
        const originalText = btn.querySelector('.btn-text').textContent;
        const btnText = btn.querySelector('.btn-text');
        const particles = btn.querySelector('.btn-particles');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btn.disabled = true;
        
        // Create particle effect
        this.createButtonParticles(particles);
        
        // Simulate form submission
        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            btn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                btnText.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 2000);
        }, 2000);
    }

    createButtonParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--color-teal-300)';
            particle.style.borderRadius = '50%';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).addEventListener('finish', () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            
            container.appendChild(particle);
        }
    }

    animateContactItems() {
        const contactItems = document.querySelectorAll('.contact-item, .social-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        });
        
        contactItems.forEach(item => observer.observe(item));
    }

    // Scroll Animations
    setupScrollAnimations() {
        // Parallax effects
        window.addEventListener('scroll', () => {
            this.handleParallaxEffects();
            this.updateScrollProgress();
        });
        
        // Intersection Observer for fade-in animations
        this.setupIntersectionObserver();
    }

    handleParallaxEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero section parallax
        const heroShapes = document.querySelectorAll('.hero-shapes .shape-cube, .hero-shapes .shape-sphere, .hero-shapes .shape-pyramid');
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    }

    updateScrollProgress() {
        const scrollProgress = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // You could add a scroll progress indicator here
        // For now, just update any scroll-dependent animations
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.section-title, .project-card, .timeline-item');
        animateElements.forEach(el => observer.observe(el));
    }

    // Mouse Interactions
    setupMouseInteractions() {
        // 3D shape interactions
        this.setupHeroShapeInteractions();
        
        // Cursor effects
        this.setupCursorEffects();
    }

    setupHeroShapeInteractions() {
        const heroShapes = document.querySelectorAll('.hero-shapes > div');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    setupCursorEffects() {
        // Add custom cursor effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card-3d, .skill-orb, .project-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'pointer';
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.style.cursor = 'default';
            });
        });
    }

    // Utility Functions
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add CSS animations dynamically
    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translate3d(0, 40px, 0);
                }
                to {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translate3d(-40px, 0, 0);
                }
                to {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.addDynamicStyles();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate positions and dimensions if needed
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}