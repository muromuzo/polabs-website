# jinsul.kr 원본 사이트 분석

## 개요
- **URL**: http://jinsul.kr/
- **사이트 유형**: 병의원 개원 컨설팅 전문 기업 홈페이지
- **구조**: 원페이지 (Single Page) - 풀스크린 섹션 기반
- **CMS**: 그누보드5 기반 커스텀 템플릿

---

## HTML 구조

### 전체 레이아웃
```
<body>
  ├── <canvas id="trail">          // 마우스 트레일 효과
  ├── <div class="fix">            // 우측 하단 고정 CTA (카카오, 전화)
  ├── <div class="head">           // 좌측 고정 사이드바
  │   ├── .head_btn_box            // 햄버거 메뉴 + 로고 + 텍스트
  │   └── .all_menu_wrap           // 풀스크린 네비게이션 (Swiper 2장)
  ├── <div class="visual">         // 히어로 섹션 (배경 이미지 + 타이틀)
  └── <div class="sec_wrap">       // 메인 콘텐츠 래퍼
      ├── .scroll_bar / .scroll_fill  // 스크롤 진행 바
      ├── .noise                      // 노이즈 오버레이
      ├── <section id="section1">     // Ch1: 압도적 실적
      ├── <section id="section2">     // Ch2: 5000개 입지 임장
      ├── <section id="section3">     // Ch3: 700개소 분석
      ├── <section id="section4">     // Ch4: 시스템 디테일
      ├── <section id="section5">     // Ch5: 월매출 4억
      ├── <section id="section6">     // Ch6: 랜드마크 병원
      └── <div class="footer">        // 상담폼 + 회사정보
```

### 주요 HTML 패턴

#### 1. Chapter 타이틀 (글자별 애니메이션)
```html
<h6 class="serif c1 chapter chapter1">
    <span class="serif">C</span>
    <span class="serif">h</span>
    <span class="serif">a</span>
    <span class="serif">p</span>
    <span class="serif">t</span>
    <span class="serif">e</span>
    <span class="serif">r</span>
    <b class="serif">1</b>
</h6>
```

#### 2. 히어로 텍스트 (라인별 애니메이션)
```html
<h1 class="txt1">
    <div><span class="line"><b>진설,</b></span></div>
    <div><span class="line"><strong>독보적 디테일</strong>로 완성하는</span></div>
    <div><span class="line">컨설팅의 <strong>새로운 기준</strong></span></div>
</h1>
```

#### 3. Swiper 슬라이더 (자동재생 무한루프)
```html
<div class="swiper sec1_slide">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="..."></div>
        <!-- 반복 -->
    </div>
</div>
```

#### 4. 커스텀 셀렉트 (상담폼)
```html
<div class="consult_select">
    <b>진료과 선택 <img src="down-arrow.svg"></b>
    <input type="hidden" name="department">
    <ul>
        <li data-value="정형외과">정형외과</li>
        <!-- 반복 -->
    </ul>
</div>
```

#### 5. 이미지 스택 카드 (Section 4)
```html
<div class="image-stack">
    <img src="sec4_img1.jpg">
    <img src="sec4_img2.jpg">
    <img src="sec4_img3.jpg">
    <img src="sec4_img4.jpg">
</div>
```

---

## CSS 특징

### 컬러 팔레트
| 용도 | 컬러코드 | 설명 |
|------|----------|------|
| 주강조색 | `#ffc400`, `#ffde00`, `#fed200` | 노란/골드 계열 |
| 텍스트 강조 | `#fed40d` | 노란 서브텍스트 |
| 다크 배경 1 | `#000` | 기본 다크 |
| 다크 배경 2 | `#222` | 그레이 다크 |
| 다크 배경 3 | `#391109` | 와인/다크레드 |
| 다크 배경 4 | `#5f0000` | 딥 레드 |
| 다크 배경 5 | `#230f0f` | 브라운 다크 |
| 텍스트 | `#fff` | 화이트 |

### 폰트
- **Pretendard Variable** - 본문 (sans-serif)
- **Noto Serif KR** - 장식/Chapter 제목 (serif)
- **Adobe Typekit** (`bsb7yvr`) - 추가 폰트

### 핵심 CSS 기법

#### 1. 고정 사이드바
```css
.head {
    position: fixed;
    top: 0; left: 0;
    z-index: 9999;
    height: 100vh;
}
.head_btn_box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    height: 100%;
    padding: 50px 0;
    border-right: 1px solid rgba(255,255,255,0.5);
}
```

#### 2. 노이즈 오버레이
```css
.noise {
    position: fixed;
    inset: 0;
    z-index: 1001;
    background-image: url('noise.gif');
    pointer-events: none;
    opacity: 0.05;
}
```

#### 3. 히어로 텍스트 노란 하이라이트
```css
.visual h1 strong {
    background: linear-gradient(to right, #000 50%, #fff 50%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.line.active strong::after {
    content: "";
    position: absolute;
    height: 80%;
    background: #ffde00;
    width: 100%;
    z-index: -1;
}
```

#### 4. 배경색 전환 (섹션별)
```css
.sec_wrap { background: #000; transition: background-color 0.8s ease; }
.bg-section2 { background: #391109; }
.bg-section3 { background: #222; }
.bg-section4 { background: #000; }
.bg-section5 { background: #000; }
```

#### 5. 스크롤 진행 바
```css
.scroll_bar {
    position: absolute;
    top: 0;
    right: calc(50% - 750px);
    width: 1px;
    height: 100%;
    background: rgba(255,255,255,0.05);
}
.scroll_fill {
    width: 100%;
    height: 0;
    background: #fed200;
    transition: height 0.5s linear;
}
```

#### 6. GSAP 커튼 효과 (Section 3)
```css
.left_cover, .right_cover {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background: #391109;
    z-index: 2;
}
.left_cover { left: 0; transform-origin: left; }
.right_cover { right: 0; transform-origin: right; }
```

#### 7. 세로 마퀴 (Section 5)
```css
.marquee-content {
    display: flex;
    flex-direction: column;
    gap: 50px 0;
    animation: scroll-up linear infinite;
}
@keyframes scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(var(--scroll-distance)); }
}
```

#### 8. 세로 텍스트 (사이드바)
```css
.head_txt {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    writing-mode: sideways-rl;
}
```

---

## JavaScript 특징

### 라이브러리
| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| jQuery | 1.8.3 | DOM 조작, 이벤트 |
| Swiper | 11 | 이미지 슬라이더 |
| AOS | 2.3.1 | 스크롤 기반 등장 애니메이션 |
| GSAP | 3.11.5 | 고급 스크롤 애니메이션 |
| ScrollTrigger | 3.11.5 | 스크롤 트리거 |
| ScrollToPlugin | 3.12.1 | 스무스 스크롤 |

### 핵심 JS 로직

#### 1. 마우스 트레일 (Canvas)
- lerp(선형보간)으로 스무스한 추적
- trail 배열에 좌표 저장, alpha/width 점진 감소
- requestAnimationFrame 루프

#### 2. 배경색 전환 (IntersectionObserver)
```javascript
const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sectionIds.forEach(id => body.classList.remove(`bg-${id}`));
            body.classList.add(`bg-${entry.target.id}`);
        }
    });
}, { threshold: 0.4 });
```

#### 3. Chapter 글자 애니메이션 (IntersectionObserver)
- 섹션 진입 시 `.animate` 클래스 추가
- CSS로 개별 글자 `translateY(100%) → 0` + 딜레이

#### 4. GSAP ScrollTrigger
- Section 3: 좌/우 커버 `scaleX: 0` (커튼 열림)
- Section 6: 원형 이미지 `scale: 10` (확대 효과)

#### 5. 이미지 스택 순환 (Section 4)
```javascript
setInterval(() => {
    const first = imgs.shift();
    imgs.push(first);
    stack.appendChild(first);
    updateStack();
}, 3000);
```

#### 6. Swiper 설정 (공통 패턴)
```javascript
new Swiper(".sec1_slide", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 5000,
    autoplay: { delay: 0 },
    breakpoints: { 799: { slidesPerView: 2.5, spaceBetween: 50 } }
});
```

#### 7. 카운트업 애니메이션
- jQuery `.animate()` 기반
- 스크롤 위치 기반 트리거
- PHP 서버에서 누적 수치 fetch

#### 8. 커스텀 셀렉트 (GSAP)
- `gsap.fromTo()` 드롭다운 열림/닫힘
- `back.out(1.7)` / `back.in(1.3)` 이징

---

## 이미지 리소스 목록

### 공통
- `logo1.svg` - 로고
- `favicon.ico` - 파비콘
- `og.jpg` - OG 이미지
- `visual.jpg` - 히어로 배경
- `kakao.svg` - 카카오 아이콘
- `call.svg` - 전화 아이콘
- `arrow.png` - 화살표
- `down-arrow.svg` - 드롭다운 화살표
- `lk_logo.svg` - 법무법인 로고

### Section 1 (7장)
sec1_img1.jpg ~ sec1_img7.jpg

### Section 2 (6장)
sec2_img1.jpg ~ sec2_img6.jpg

### Section 3 (6장)
sec3_img1.jpg ~ sec3_img6.jpg

### Section 4 (4장)
sec4_img1.jpg ~ sec4_img4.jpg

### Section 5 (5장)
sec5_img1.jpg ~ sec5_img5.jpg

### Section 6 (6장 + circle)
sec6_img1.jpg ~ sec6_img6.jpg + sec6_circle.png

---

## 반응형 브레이크포인트
- **Desktop**: 1500px 기준 (max-width: 1500px 컨테이너)
- **Tablet/Mobile**: `max-width: 799px`
- `.mb_block` 클래스로 모바일 전용 줄바꿈
