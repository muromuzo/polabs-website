/* ═══════════════════════════════════════
   디자인 아르시에 Clone - Main Script
   ═══════════════════════════════════════ */

// ─── Page Load Sequence ───
(function() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 100);
    });
    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => document.body.classList.remove('loading'), 100);
    }
})();

// ─── Scroll Progress Bar ───
(function() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        bar.style.transform = 'scaleX(' + progress + ')';
    }, { passive: true });
})();

// ─── Hero Slider ───
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    speed: 1700,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    effect: 'slide',
    pagination: {
        el: '.hero-pagination',
        clickable: true,
    },
});

// ─── Review Slider ───
const reviewSlider = document.querySelector('.review-slider');
if (reviewSlider) {
    const reviewSwiper = new Swiper('.review-slider', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
        },
    });

    const prevBtn = document.querySelector('.review-prev-btn');
    const nextBtn = document.querySelector('.review-next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => reviewSwiper.slidePrev());
    if (nextBtn) nextBtn.addEventListener('click', () => reviewSwiper.slideNext());
}

// ─── Portfolio Slider (원본 gallery2 가로스크롤) ───
const portfolioSliderEl = document.querySelector('.portfolio-slider');
if (portfolioSliderEl) {
    new Swiper('.portfolio-slider', {
        loop: false,
        speed: 600,
        slidesPerView: 1.2,
        spaceBetween: 24,
        freeMode: true,
        grabCursor: true,
        breakpoints: {
            576: { slidesPerView: 2.2, spaceBetween: 30 },
            992: { slidesPerView: 3.5, spaceBetween: 36 },
            1400: { slidesPerView: 4.2, spaceBetween: 42 },
        },
    });
}

// ─── Custom Reveal System (replaces AOS) ───
(function() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.revealDelay;
                if (delay) {
                    el.style.transitionDelay = delay + 'ms';
                }
                el.classList.add('visible');
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in-up').forEach(el => {
        revealObserver.observe(el);
    });
})();

// ─── Counter Animation ───
(function() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const isDecimal = el.dataset.decimal === 'true';
                const target = isDecimal ? parseFloat(el.dataset.target) : parseInt(el.dataset.target);
                const duration = 2000;
                const start = performance.now();
                const animate = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const val = target * eased;
                    el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString();
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
})();

// ─── Header Scroll ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ─── Hero Slide Text Animation ───
heroSwiper.on('slideChangeTransitionStart', () => {
    document.querySelectorAll('.swiper-slide:not(.swiper-slide-active) .slide-anim').forEach(el => {
        el.style.transition = 'none';
        if (el.classList.contains('hero-subtitle')) {
            el.style.transform = 'translateX(-50px)';
        } else if (el.closest('.hero-title-line')) {
            el.style.transform = 'translateY(100%)';
        } else {
            el.style.transform = 'translateY(30px)';
        }
        el.style.opacity = '0';
    });
});
heroSwiper.on('slideChangeTransitionEnd', () => {
    document.querySelectorAll('.swiper-slide-active .slide-anim').forEach(el => {
        el.style.transition = '';
        el.style.transform = '';
        el.style.opacity = '';
    });
});

// ─── Mobile Menu Toggle ───
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerH = document.getElementById('header').offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ─── FAQ Accordion with Smooth Height ───
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            const a = i.querySelector('.faq-answer');
            if (a) {
                a.style.maxHeight = '0px';
                a.style.paddingTop = '0';
                a.style.paddingBottom = '0';
            }
        });

        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.paddingTop = '';
            answer.style.paddingBottom = '';
        }
    });
});

// ─── Contact Form Steps ───
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
        const nextStep = btn.dataset.next;
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${nextStep}"]`).classList.add('active');
    });
});

document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
        const prevStep = btn.dataset.prev;
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${prevStep}"]`).classList.add('active');
    });
});

// ─── Form Submit ───
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value;
        const phone = contactForm.querySelector('input[name="phone"]').value;
        const agree = contactForm.querySelector('input[name="agree"]').checked;

        if (!name) { alert('성함을 입력해주세요.'); return; }
        if (!phone) { alert('연락처를 입력해주세요.'); return; }
        if (!agree) { alert('개인정보 수집에 동의해주세요.'); return; }

        // Collect form data as JSON
        const serviceTypes = [];
        contactForm.querySelectorAll('input[name="serviceType"]:checked').forEach(cb => serviceTypes.push(cb.value));
        const payload = {
            serviceType: serviceTypes.join(', '),
            company: contactForm.querySelector('input[name="company"]').value,
            budget: contactForm.querySelector('input[name="budget"]').value,
            deadline: contactForm.querySelector('input[name="deadline"]').value,
            details: contactForm.querySelector('textarea[name="details"]')?.value || '',
            name: name,
            phone: phone,
            email: contactForm.querySelector('input[name="email"]').value
        };

        // Google Apps Script endpoint
        const GAS_URL = contactForm.dataset.gasUrl || contactForm.action;

        fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        }).then(res => {
            alert('상담 신청이 접수되었습니다. 영업일 24시간 내에 연락드리겠습니다.');
            contactForm.reset();
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelector('.form-step[data-step="1"]').classList.add('active');
        }).catch(() => {
            alert('네트워크 오류입니다. 카카오톡으로 문의해주세요.');
        });
    });
}

// ─── Matter.js Physics Animation (Differentiator) ───
(function() {
    const container = document.getElementById('physics-container');
    if (!container || typeof Matter === 'undefined') return;

    const Engine = Matter.Engine,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Body = Matter.Body,
          Events = Matter.Events;

    let engine, world;
    const tags = container.querySelectorAll('.physics-tag');
    const tagBodies = [];

    function initPhysics() {
        engine = Engine.create();
        world = engine.world;
        engine.world.gravity.y = 1;

        const cw = container.offsetWidth;
        const ch = container.offsetHeight;

        const ground = Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true });
        const leftWall = Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true });
        const rightWall = Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true });
        World.add(world, [ground, leftWall, rightWall]);

        tags.forEach((tag, i) => {
            const w = tag.offsetWidth || 100;
            const h = tag.offsetHeight || 40;
            const startX = 80 + Math.random() * (cw - 160);
            const body = Bodies.rectangle(startX, -50 - (i * 60), w, h, {
                restitution: 0.4,
                friction: 0.5,
                frictionAir: 0.02,
                angle: (Math.random() - 0.5) * 0.5
            });

            setTimeout(() => {
                tag.style.opacity = '1';
                World.add(world, body);
            }, i * 300);

            tagBodies.push({ dom: tag, body: body });
        });

        function update() {
            Engine.update(engine, 16.67);
            tagBodies.forEach(item => {
                if (!item.body) return;
                const x = item.body.position.x - item.dom.offsetWidth / 2;
                const y = item.body.position.y - item.dom.offsetHeight / 2;
                const angle = item.body.angle;
                item.dom.style.left = x + 'px';
                item.dom.style.top = y + 'px';
                item.dom.style.transform = 'rotate(' + angle + 'rad)';
            });
            requestAnimationFrame(update);
        }
        update();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initPhysics();
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(container);
})();

// ─── Mouse Follower Cursor (Desktop Only) ───
(function() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isVisible = false;

    const hoverTargets = 'a, button, .btn-estimate, .service-card-v2, .portfolio-item, .faq-question, .review-nav-btn, .kakao-float-btn, .kakao-consult-btn, input, textarea, select, label';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            isVisible = true;
            dot.classList.add('active');
            ring.classList.add('active');
        }
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.classList.remove('active');
        ring.classList.remove('active');
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.add('hover');
            ring.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        }
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;
        ringX += (mouseX - ringX) * 0.08;
        ringY += (mouseY - ringY) * 0.08;

        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
})();

// ─── (Portfolio clip-reveal removed - now using Swiper slider) ───

// ─── Process Step Auto-cycling ───
(function() {
    const container = document.querySelector('.process-steps-line');
    const steps = container ? container.querySelectorAll('.process-step') : [];
    if (!steps.length) return;

    let currentStep = 0;
    let cycleInterval = null;
    let isInView = false;

    // Add progress bar to each step
    steps.forEach(step => {
        const progress = document.createElement('div');
        progress.classList.add('step-progress');
        step.style.position = 'relative';
        step.appendChild(progress);
    });

    function activateStep(index) {
        steps.forEach(s => s.classList.remove('active'));
        steps[index].classList.add('active');
    }

    function startCycling() {
        if (cycleInterval) return;
        container.classList.add('cycling');
        activateStep(currentStep);
        cycleInterval = setInterval(() => {
            currentStep = (currentStep + 1) % steps.length;
            activateStep(currentStep);
        }, 2300);
    }

    function stopCycling() {
        if (cycleInterval) {
            clearInterval(cycleInterval);
            cycleInterval = null;
        }
    }

    container.addEventListener('mouseenter', stopCycling);
    container.addEventListener('mouseleave', () => {
        if (isInView) startCycling();
    });

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInView = true;
                startCycling();
            } else {
                isInView = false;
                stopCycling();
            }
        });
    }, { threshold: 0.3 });

    stepObserver.observe(container);
})();

// ─── Image Load Transitions ───
(function() {
    // Service card backgrounds (inline style)
    document.querySelectorAll('.service-card-bg').forEach(el => {
        const img = new Image();
        const bgUrl = el.style.backgroundImage.replace(/url\(["']?(.+?)["']?\)/, '$1');
        if (bgUrl) {
            img.onload = () => el.classList.add('img-loaded');
            img.src = bgUrl;
        } else {
            el.classList.add('img-loaded');
        }
    });

    // Regular images
    document.querySelectorAll('.portfolio-item img, .client-logo-item img').forEach(img => {
        if (img.complete) {
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('img-loaded'));
        }
    });
})();

// ─── Text Split Animation ───
(function() {
    const textAnimEls = document.querySelectorAll('.text-animate');
    if (!textAnimEls.length) return;

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target;
                const spans = parent.querySelectorAll('.text-animate');
                spans.forEach((span, i) => {
                    setTimeout(() => span.classList.add('visible'), i * 80);
                });
                textObserver.unobserve(parent);
            }
        });
    }, { threshold: 0.3 });

    // Observe the parent of text-animate elements
    const parents = new Set();
    textAnimEls.forEach(el => {
        const parent = el.parentElement;
        if (parent && !parents.has(parent)) {
            parents.add(parent);
            textObserver.observe(parent);
        }
    });
})();

// ─── Section Reveal (complement reveals) ───
(function() {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-trigger').forEach(el => {
        scrollObserver.observe(el);
    });
})();

// ─── Dynamic Keyword Rotation (Contact Intro) ───
(function() {
    const el = document.querySelector('.dynamic-highlight-text');
    if (!el) return;
    const words = ['개원', '개편', '마케팅', '매출', '성장', '병원'];
    let idx = 0;
    setInterval(() => {
        el.style.opacity = '0';
        setTimeout(() => {
            idx = (idx + 1) % words.length;
            el.textContent = words[idx];
            el.style.opacity = '1';
        }, 300);
    }, 2500);
})();

// ─── File Upload Display ───
(function() {
    const fileInput = document.querySelector('.form-file-input');
    const display = document.querySelector('.file-name-display');
    if (!fileInput || !display) return;
    fileInput.addEventListener('change', () => {
        display.textContent = fileInput.files[0] ? fileInput.files[0].name : '';
    });
})();

// ─── Parallax Scroll Depth ───
(function() {
    const parallaxSections = [
        { selector: '.hero', factor: 0.3 },
        { selector: '.revision-badge', factor: -0.15 },
    ];

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                parallaxSections.forEach(item => {
                    const el = document.querySelector(item.selector);
                    if (!el) return;
                    const rect = el.getBoundingClientRect();
                    if (rect.bottom > 0 && rect.top < window.innerHeight) {
                        const offset = scrollY * item.factor;
                        el.style.transform = 'translateY(' + offset + 'px)';
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// ─── Button Ripple Effect ───
(function() {
    const rippleTargets = 'a.btn-estimate, .review-more-btn, .btn-next, .btn-prev, .kakao-float-btn, .kakao-consult-btn';
    document.addEventListener('click', (e) => {
        const target = e.target.closest(rippleTargets);
        if (!target) return;

        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        target.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
})();

// ─── Enhanced Scroll Reveal with Stagger ───
(function() {
    // Stagger children in grid containers
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, i) => {
                    child.style.transitionDelay = (i * 120) + 'ms';
                    child.style.opacity = '1';
                    child.style.transform = 'none';
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.diff-cards-grid, .client-logo-grid, .services-grid-v2').forEach(grid => {
        // Set initial state for children
        Array.from(grid.children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        staggerObserver.observe(grid);
    });
})();

// ─── Section Counter Animation ───
(function() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section').forEach(sec => {
        counterObserver.observe(sec);
    });
})();
