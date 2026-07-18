// ============================================================
// ANIMATIONS.JS — الرسوم المتحركة (العدادات، التمرير، الجسيمات)
// ============================================================

export function initAnimations() {
    // ============================================================
    // 1. عدادات الأرقام (Stats Counter)
    // ============================================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isFloat = target % 1 !== 0;
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;
                    el.textContent = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = isFloat ? target.toFixed(1) : Math.round(target).toLocaleString();
                    }
                }
                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        }
    }, { threshold: 0.3 });

    counters.forEach(el => counterObserver.observe(el));

    // ============================================================
    // 2. ظهور العناصر عند التمرير (Scroll Animations)
    // ============================================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach(el => scrollObserver.observe(el));

    // ============================================================
    // 3. جسيمات الخلفية (Hero Particles)
    // ============================================================
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        const particles = [];
        const count = 80;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            w = canvas.width = rect.width || window.innerWidth;
            h = canvas.height = rect.height || window.innerHeight;
        }

        function createParticles() {
            particles.length = 0;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 2 + 0.5,
                    a: Math.random() * 0.5 + 0.1,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
            }

            // خطوط الربط
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const alpha = 1 - dist / 120;
                        ctx.strokeStyle = `rgba(240,179,0,${alpha * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // النقاط
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240,179,0,${p.a})`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        resize();
        createParticles();
        draw();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    }

    // ============================================================
    // 4. تشغيل العرض الترويجي (Trailer)
    // ============================================================
    const trailerWrapper = document.getElementById('trailerWrapper');
    if (trailerWrapper) {
        function playTrailer() {
            alert('🎬 سيتم تشغيل العرض الترويجي هنا. (تكامل فيديو قادم)');
        }
        trailerWrapper.addEventListener('click', playTrailer);
        trailerWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playTrailer();
            }
        });
    }

    // ============================================================
    // 5. الأسئلة الشائعة (FAQ Accordion)
    // ============================================================
    const faqItems = document.querySelectorAll('[data-faq]');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // فتح أول عنصر افتراضياً إذا لم يكن أي عنصر مفتوحاً
    if (!document.querySelector('[data-faq].open')) {
        const first = faqItems[0];
        if (first) first.classList.add('open');
    }

    console.log('🎬 Animations module initialized.');
}
