/* ============================================
   CULTIVaiTE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========== NAVIGATION ==========
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll-based nav style
    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Check on load

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

    const updateActiveNav = () => {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinkEls.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ========== PARTICLES ==========
    const createParticles = () => {
        const container = document.getElementById('particles');
        if (!container || prefersReducedMotion) return;

        const count = 18;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${2 + Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }

        // Animate particles with GSAP
        const particles = container.querySelectorAll('.particle');
        particles.forEach((p, i) => {
            const duration = 4 + Math.random() * 6;
            const delay = Math.random() * 4;

            gsap.to(p, {
                y: -80 - Math.random() * 120,
                x: (Math.random() - 0.5) * 60,
                opacity: 0.5 + Math.random() * 0.3,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Initial fade in
            gsap.to(p, {
                opacity: 0.3 + Math.random() * 0.4,
                duration: 2,
                delay: delay,
            });
        });
    };

    createParticles();

    // ========== GSAP ANIMATIONS ==========
    if (typeof gsap === 'undefined' || prefersReducedMotion) {
        // Fallback: show everything immediately
        document.querySelectorAll('.hero__title, .hero__subtitle, .hero__ctas, .hero__scroll-indicator').forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ---------- Hero Parallax ----------
    gsap.to('.hero__content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        y: 100,
        opacity: 0.3,
        ease: 'none',
    });

    gsap.to('.hero__gradient', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
        scale: 1.1,
        ease: 'none',
    });

    // ---------- Hero Entrance Timeline ----------
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
        .to('.hero__title', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
        })
        .from('.hero__title', {
            y: 40,
            duration: 1,
        }, '<')
        .to('.hero__subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.5')
        .from('.hero__subtitle', {
            y: 30,
            duration: 0.8,
        }, '<')
        .to('.hero__ctas', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.4')
        .from('.hero__ctas', {
            y: 20,
            duration: 0.8,
        }, '<')
        .to('.hero__scroll-indicator', {
            opacity: 0.6,
            duration: 1,
        }, '-=0.3');

    // ---------- Problem Cards ----------
    gsap.from('.card--problem', {
        scrollTrigger: {
            trigger: '.problem__grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
    });

    // ---------- Solution Section ----------
    gsap.from('.solution__text', {
        scrollTrigger: {
            trigger: '.solution__layout',
            start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
    });

    // SVG Checkmark Draw
    gsap.utils.toArray('.check-path').forEach((path, i) => {
        gsap.to(path, {
            scrollTrigger: {
                trigger: path.closest('.solution__check-item'),
                start: 'top 85%',
            },
            strokeDashoffset: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.inOut',
        });
    });

    // Solution floating cards
    gsap.from('.solution__floating-card', {
        scrollTrigger: {
            trigger: '.solution__visual',
            start: 'top 80%',
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
    });

    // ---------- How It Works Steps ----------
    gsap.from('.step', {
        scrollTrigger: {
            trigger: '.steps',
            start: 'top 75%',
        },
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
    });

    // Steps line fill
    gsap.to('#stepsLineFill', {
        scrollTrigger: {
            trigger: '.steps',
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 1,
        },
        height: '100%',
        ease: 'none',
    });

    // ---------- Counter Animation ----------
    const counters = document.querySelectorAll('.counter__number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);

        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
        });
    });

    // ---------- Results Quote ----------
    gsap.from('.results__quote', {
        scrollTrigger: {
            trigger: '.results__quote',
            start: 'top 85%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
    });

    // ---------- Who We Serve Cards ----------
    gsap.from('.card--serve', {
        scrollTrigger: {
            trigger: '.serve__grid',
            start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
    });

    // ---------- Team Cards ----------
    gsap.from('.card--team', {
        scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
    });

    // ---------- Pricing Cards ----------
    gsap.from('.card--pricing', {
        scrollTrigger: {
            trigger: '.pricing__grid',
            start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
    });

    // ---------- CTA Section ----------
    gsap.from('.cta__content', {
        scrollTrigger: {
            trigger: '.cta',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
    });

    // ---------- Section Headers ----------
    gsap.utils.toArray('.section__header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
        });
    });

    // ========== FORM HANDLING ==========
    const form = document.getElementById('ctaForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.cta__submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    form.innerHTML = '<p class="form-success">You\'re on the list! We\'ll be in touch soon.</p>';
                } else {
                    submitBtn.textContent = 'Try Again';
                    submitBtn.disabled = false;
                }
            } catch {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
