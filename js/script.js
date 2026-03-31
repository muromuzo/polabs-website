/* ═══════════════════════════════════════
   진설 Clone - Main Script
   ═══════════════════════════════════════ */

// ─── Mouse Trail Canvas ───
(function() {
    const canvas = document.getElementById('trail');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: 0, y: 0 };
    let lastPos = { x: 0, y: 0 };
    let smoothPos = { x: 0, y: 0 };
    let trails = [];

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function lerp(a, b, n) { return (1 - n) * a + n * b; }

    function draw() {
        smoothPos.x = lerp(smoothPos.x, mouse.x, 0.15);
        smoothPos.y = lerp(smoothPos.y, mouse.y, 0.15);

        const dx = smoothPos.x - lastPos.x;
        const dy = smoothPos.y - lastPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            trails.push({
                x1: lastPos.x, y1: lastPos.y,
                x2: smoothPos.x, y2: smoothPos.y,
                alpha: 1,
                width: Math.min(15, 5 + dist * 0.3),
            });
            lastPos.x = smoothPos.x;
            lastPos.y = smoothPos.y;
        }

        if (trails.length > 60) trails.shift();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < trails.length; i++) {
            const t = trails[i];
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${t.alpha})`;
            ctx.lineWidth = t.width;
            ctx.lineCap = 'round';
            ctx.moveTo(t.x1, t.y1);
            ctx.lineTo(t.x2, t.y2);
            ctx.stroke();
            t.alpha *= 0.90;
            t.width *= 0.92;
        }
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();


// ─── Nav SVG Icons ───
const navCloseSVG = `<svg viewBox="0 0 420 420" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
<circle cx="210" cy="210" r="180" stroke="black" stroke-width="12" fill="none" stroke-dasharray="1130" stroke-dashoffset="1130"><animate attributeName="stroke-dashoffset" from="1130" to="0" dur="0.6s" fill="freeze"/></circle>
<line x1="140" y1="140" x2="280" y2="280" stroke="black" stroke-width="12" stroke-linecap="butt" stroke-dasharray="198" stroke-dashoffset="198"><animate attributeName="stroke-dashoffset" from="198" to="0" dur="0.3s" begin="0.6s" fill="freeze"/></line>
<line x1="280" y1="140" x2="140" y2="280" stroke="black" stroke-width="12" stroke-linecap="butt" stroke-dasharray="198" stroke-dashoffset="198"><animate attributeName="stroke-dashoffset" from="198" to="0" dur="0.3s" begin="0.9s" fill="freeze"/></line>
</svg>`;

const navPrevSVG = `<svg viewBox="0 0 420 420" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="reveal"><rect x="0" y="0" width="0" height="420"><animate attributeName="width" from="0" to="420" dur="1s" fill="freeze"/></rect></clipPath></defs>
<circle cx="210" cy="210" r="180" stroke="black" stroke-width="12" fill="none" stroke-dasharray="1130" stroke-dashoffset="1130"><animate attributeName="stroke-dashoffset" from="1130" to="0" dur="0.6s" fill="freeze"/></circle>
<g clip-path="url(#reveal)"><path d="M295.5 204 L295.5 216 L138.1 216 L138.1 204 Z" fill="black"/><path d="M130.5 210 L176.5 164 L185 172.5 L139 218.5 Z" fill="black"/><path d="M130.5 210 L176.5 256 L185 247.5 L139 201.5 Z" fill="black"/></g>
</svg>`;


// ─── Nav Swiper ───
function toggleIcons(index) {
    const navClose = document.querySelector('.nav_close');
    const navPrev = document.querySelector('.nav_prev');
    if (index === 0) {
        navClose.style.display = 'block';
        navPrev.style.display = 'none';
        navClose.innerHTML = navCloseSVG;
    } else {
        navClose.style.display = 'none';
        navPrev.style.display = 'block';
        navPrev.innerHTML = navPrevSVG;
    }
}

const navSwiper = new Swiper(".nav_slide", {
    navigation: { nextEl: ".nav-button-next", prevEl: ".nav-button-prev" },
    on: {
        init: function() { toggleIcons(this.activeIndex); },
        slideChange: function() { toggleIcons(this.activeIndex); }
    }
});


// ─── Content Swipers ───
new Swiper(".sec1_slide", {
    loop: true, slidesPerView: 2, spaceBetween: 30, speed: 5000,
    autoplay: { delay: 0 },
    breakpoints: { 799: { slidesPerView: 2.5, spaceBetween: 50 } }
});

new Swiper(".sec2_slide", {
    loop: true, slidesPerView: 2, spaceBetween: 30, speed: 5000,
    autoplay: { delay: 0 },
    breakpoints: { 799: { slidesPerView: 3, spaceBetween: 40 } }
});

new Swiper(".sec3_slide", {
    loop: true, slidesPerView: 2, spaceBetween: 30, speed: 5000,
    autoplay: { delay: 0 },
    breakpoints: { 799: { slidesPerView: 3, spaceBetween: 40 } }
});


// ─── AOS Init ───
AOS.init({ once: true, duration: 1000 });


// ─── Scroll Progress Bar ───
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (scrollPercent < 5) scrollPercent = 0;
    document.querySelector('.scroll_fill').style.height = scrollPercent + '%';
});


// ─── Header Scroll Background ───
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('.head_btn_box').addClass('scroll');
    } else {
        $('.head_btn_box').removeClass('scroll');
    }
});


// ─── Menu Button Toggle ───
$('.head .btn').on('click', function() {
    $(this).toggleClass('active');
});

$('#menuBtn').on('click', function() {
    $(this).toggleClass('animate');
});


// ─── Hero Text Line Animation ───
window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.line');
    lines.forEach((line, idx) => {
        setTimeout(() => {
            line.classList.add('active');
        }, 1000 + idx * 300);
    });
});


// ─── Fullscreen Menu Open/Close ───
$('.head .btn').click(function() {
    $('.all_menu_wrap').toggleClass('all_menu_wrap_open');
    $('.head_btn_box').toggleClass('back_change');
    const isOpen = $('.all_menu_wrap').hasClass('all_menu_wrap_open');
    if (isOpen) {
        $('.nav_close').html(navCloseSVG).fadeIn();
    } else {
        $('.nav_close').fadeOut();
    }
});

$('.nav_close').click(function() {
    $('.all_menu_wrap').removeClass('all_menu_wrap_open');
    $('.head_btn_box').removeClass('back_change');
    $('.head .btn').removeClass('active').addClass('animate');
    $(this).fadeOut();
});

$('.all_menu ul li a').click(function() {
    $('.all_menu_wrap').removeClass('all_menu_wrap_open');
    $('.head_btn_box').removeClass('back_change');
    $('.head .btn').removeClass('active').addClass('animate');
});

$('.all_menu ul li a').on('click', function() {
    $('.all_menu ul li a').removeClass('active');
    $(this).addClass('active');
});


// ─── Mobile Anchor Scroll ───
$(document).ready(function() {
    $('a[href="#section2"], a[href="#section4"]').on('click', function(e) {
        if (window.innerWidth <= 799) {
            e.preventDefault();
            const targetId = $(this).attr('href');
            const offsetTop = $(targetId).offset().top - 80;
            $('html, body').animate({ scrollTop: offsetTop }, 400);
        }
    });
});


// ─── Section Background Color Transition ───
const secWrap = document.querySelector('.sec_wrap');
const sections = document.querySelectorAll('[id^="section"]');
const sectionIds = Array.from(sections).map(sec => sec.id);

const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sectionIds.forEach(id => secWrap.classList.remove(`bg-${id}`));
            secWrap.classList.add(`bg-${entry.target.id}`);
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => bgObserver.observe(section));


// ─── Chapter Text Animation ───
const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const chapter = entry.target.querySelector('.chapter');
        if (!chapter) return;
        if (entry.isIntersecting) {
            chapter.classList.add('animate');
        } else {
            chapter.classList.remove('animate');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('[id^="section"]').forEach(section => {
    chapterObserver.observe(section);
});


// ─── GSAP: Section 3 Curtain Effect ───
gsap.to(".left_cover", {
    scaleX: 0,
    scrollTrigger: { trigger: "#section3", start: "top 80%", end: "top 20%", scrub: 3 }
});

gsap.to(".right_cover", {
    scaleX: 0,
    scrollTrigger: { trigger: "#section3", start: "top 80%", end: "top 20%", scrub: 3 }
});


// ─── Section 4: Image Stack ───
(function() {
    const stack = document.querySelector(".image-stack");
    if (!stack) return;
    let imgs = Array.from(stack.querySelectorAll("img"));

    function updateStack() {
        imgs.forEach((img, i) => {
            const depth = imgs.length - i;
            img.style.zIndex = depth;
            img.style.opacity = i === 0 ? 1 : 0.4;
            img.style.transform = `rotate(${(i - 1) * 3}deg) translateY(${(i - 1) * 5}px)`;
        });
    }

    updateStack();

    setInterval(() => {
        const first = imgs.shift();
        imgs.push(first);
        stack.appendChild(first);
        updateStack();
    }, 3000);
})();


// ─── Section 5: Vertical Marquee ───
window.addEventListener('load', () => {
    const content = document.getElementById('marquee-content');
    if (!content) return;
    const original = [...content.children];
    const clones = original.map(node => node.cloneNode(true));
    clones.forEach(clone => content.appendChild(clone));

    let totalHeight = 0;
    original.forEach(el => { totalHeight += el.offsetHeight; });

    content.style.setProperty('--scroll-distance', `-${totalHeight}px`);
    content.style.animationDuration = '15s';
});


// ─── Section 6: GSAP Scale + Fade ───
const isMobile = window.innerWidth <= 799;
const sectionHeight = isMobile ? 650 : window.innerHeight;
const pinDuration = sectionHeight * 0.8;

ScrollTrigger.create({
    trigger: "#section6",
    start: "top top",
    end: `+=${pinDuration}`,
    scrub: 3
});

gsap.to(".circle img", {
    scale: 10,
    ease: "none",
    scrollTrigger: {
        trigger: "#section6",
        start: "top bottom",
        end: "bottom top+=50",
        scrub: 3
    }
});

const sec6Observer = new IntersectionObserver(
    ([entry]) => {
        const target = document.querySelector(".sec6_img");
        if (!target) return;
        if (entry.isIntersecting) {
            target.classList.add("active");
        } else {
            target.classList.remove("active");
        }
    },
    { threshold: 0.3 }
);

const sec6El = document.querySelector("#section6");
if (sec6El) sec6Observer.observe(sec6El);


// ─── Phone Auto Hyphen ───
function autoHyphen(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    input.value = value;
}

document.getElementById('phone')?.addEventListener('keydown', function(e) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (!((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key))) {
        e.preventDefault();
    }
});


// ─── Custom Select Dropdowns ───
document.querySelectorAll('.consult_select').forEach(select => {
    const current = select.querySelector('b');
    const options = select.querySelector('ul');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    current.addEventListener('click', function(e) {
        e.stopPropagation();

        document.querySelectorAll('.consult_select ul').forEach(el => {
            if (el !== options && el.style.display === 'block') {
                gsap.to(el, {
                    y: -30, opacity: 0, duration: 0.3, ease: "back.in(1.3)",
                    onComplete: () => { el.style.display = 'none'; }
                });
                const otherSelect = el.closest('.consult_select');
                if (otherSelect) otherSelect.dataset.isOpen = 'false';
            }
        });

        const isOpen = select.dataset.isOpen === 'true';

        if (isOpen) {
            gsap.to(options, {
                y: -30, opacity: 0, duration: 0.3, ease: "back.in(1.3)",
                onComplete: () => { options.style.display = 'none'; }
            });
            select.dataset.isOpen = 'false';
        } else {
            options.style.display = 'block';
            gsap.fromTo(options,
                { y: -30, opacity: 0, transformOrigin: "top center" },
                { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
            select.dataset.isOpen = 'true';
        }
    });

    select.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.getAttribute('data-value');
            current.innerHTML = value + '<img src="images/down-arrow.svg" alt="">';
            hiddenInput.value = value;
            gsap.to(options, {
                y: -30, opacity: 0, duration: 0.3, ease: "back.in(1.3)",
                onComplete: () => { options.style.display = 'none'; }
            });
            select.dataset.isOpen = 'false';
        });
    });

    document.addEventListener('click', function(e) {
        if (!select.contains(e.target) && options.style.display === 'block') {
            gsap.to(options, {
                y: -30, opacity: 0, duration: 0.3, ease: "back.in(1.3)",
                onComplete: () => { options.style.display = 'none'; }
            });
            select.dataset.isOpen = 'false';
        }
    });

    select.dataset.isOpen = 'false';
});


// ─── Form Submit ───
document.getElementById('submitConsult')?.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (!name) { alert('성함을 입력해주세요.'); return; }

    const phone = document.getElementById('phone').value;
    if (!phone) { alert('연락처를 입력해주세요.'); return; }
    if (phone.length < 10 || phone.length > 13) { alert('올바른 연락처를 입력해주세요.'); return; }

    const formData = new FormData(document.getElementById('consultForm'));

    const inquiryType = formData.get('inquiryType');
    if (!inquiryType) { alert('문의 유형을 선택해주세요.'); return; }

    const agreeCheckbox = document.querySelector('.agree input[name="agree"]');
    if (!agreeCheckbox || !agreeCheckbox.checked) {
        alert('개인정보 수집에 동의해주세요.');
        return;
    }

    alert('무료 상담 신청이 완료되었습니다. 영업일 기준 24시간 내 연락드리겠습니다.');
});


// ─── Agree Popup ───
$('.agree .agree_toggle').click(function() {
    $('.agree_pop').fadeIn();
});

$('.agree_close').click(function() {
    $('.agree_pop').fadeOut();
});


// ─── Terms Popups ───
$('.pop').hide();
$('.pop_bg').hide();

$('.use a').click(function(e) {
    e.preventDefault();
    var useIndex = $(this).index();
    $('.pop').eq(useIndex).show();
    $('.pop_bg').show();
    $('body').addClass('hidden');
});

$('.pop_close').click(function() {
    $('.pop').hide();
    $('.pop_bg').hide();
    $('body').removeClass('hidden');
});


// ─── Count Animation ───
let countStarted = false;

function animateCount(selector, target, duration) {
    duration = duration || 1500;
    const $el = $(selector);
    $({ val: 0 }).animate({ val: target }, {
        duration: duration,
        step: function(now) { $el.text(Math.floor(now)); },
        complete: function() { $el.text(target); }
    });
}

$(window).on('scroll', function() {
    const ftContact = $('.ft_contact');
    if (!ftContact.length) return;
    const triggerTop = ftContact.offset().top - window.innerHeight + 100;
    const scrollTop = $(window).scrollTop();
    if (!countStarted && scrollTop > triggerTop) {
        countStarted = true;
        animateCount('.count2', 200);
    }
});
