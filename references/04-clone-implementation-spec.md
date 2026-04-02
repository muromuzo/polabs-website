# 클론 구현 명세서

## 프로젝트 개요
- **원본**: http://jinsul.kr/
- **목적**: 병의원 개원 컨설팅 원페이지 홈페이지 클론
- **배포**: Vercel (vercel.json 설정 포함)
- **구조**: 정적 HTML/CSS/JS (서버 불필요)

---

## 파일 구조

```
polabs-website/
├── index.html              # 메인 HTML (단일 파일)
├── css/
│   └── style.css           # 전체 스타일시트
├── js/
│   └── script.js           # 메인 인터랙션/애니메이션
├── images/
│   ├── visual.jpg          # 히어로 배경
│   ├── logo.svg            # 로고 (SVG)
│   ├── favicon.ico         # 파비콘
│   ├── og.jpg              # OG 이미지
│   ├── kakao.svg           # 카카오 아이콘
│   ├── call.svg            # 전화 아이콘
│   ├── arrow.png           # 화살표
│   ├── down-arrow.svg      # 드롭다운 화살표
│   ├── lk_logo.svg         # 제휴 법무법인 로고
│   ├── sec1/               # 섹션1 이미지 (7장)
│   ├── sec2/               # 섹션2 이미지 (6장)
│   ├── sec3/               # 섹션3 이미지 (6장)
│   ├── sec4/               # 섹션4 이미지 (4장)
│   ├── sec5/               # 섹션5 이미지 (5장)
│   └── sec6/               # 섹션6 이미지 (6장 + circle)
├── references/             # 레퍼런스 분석 문서
├── robots.txt
├── sitemap.xml
├── vercel.json
└── og-image.png
```

---

## 외부 CDN 의존성

### CSS
```html
<!-- Pretendard Variable -->
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css" />

<!-- Noto Serif KR -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap" rel="stylesheet">

<!-- Adobe Typekit -->
<link rel="stylesheet" href="https://use.typekit.net/bsb7yvr.css">

<!-- Swiper 11 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<!-- AOS -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
```

### JavaScript
```html
<!-- jQuery (경량화 고려 - 3.x 권장) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Swiper 11 -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- AOS -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
```

---

## 섹션별 구현 상세

### 1. 마우스 트레일 (Canvas)
- `<canvas id="trail">` 풀스크린 고정
- lerp 기반 스무스 추적
- trail 배열: 최대 60개, alpha/width 감소
- requestAnimationFrame 루프

### 2. 고정 사이드바 (Head)
- `position: fixed; left: 0; height: 100vh`
- 100px 너비, 세로 flex 정렬
- 햄버거 메뉴: 3개 span, wave 애니메이션
- 로고: `transform: rotate(90deg)`
- 하단 텍스트: `writing-mode: sideways-rl`
- 스크롤 200px+ 시 배경 #000 전환

### 3. 풀스크린 네비게이션
- Swiper 기반 2장 슬라이드
- Slide 1: 메뉴 목록 (노란 배경 #ffc400)
  - 메뉴 항목: 60px 볼드, 라인별 등장 애니메이션
  - 호버 시 가로선 + 흰색 전환
- Slide 2: About 소개 (흰 배경)
  - 타이틀 + 설명 + 법무법인 제휴 + Contact
- Close 버튼: SVG 원형 + X 애니메이션
- Prev 버튼: SVG 원형 + 화살표

### 4. 히어로 (Visual)
- 풀스크린 100vh, 배경 이미지 `opacity: 0.5`
- 이미지: `transform: scale(1.5)` → `scale(1)` 줌아웃
- 초기 로딩: #000 커버 → 위로 슬라이드
- 텍스트: 라인별 `translateY(100%) → 0` 애니메이션
- `<strong>` 태그: 노란 하이라이트 배경 (`#ffde00`)
- 노란 배경은 `::after` pseudo-element로 width 0→100%

### 5. Section 1 - 압도적 실적
- Chapter 글자 애니메이션 (floatUp)
- 제목/부제/본문 텍스트
- Swiper: `slidesPerView: 2.5`, 자동재생 무한루프, `speed: 5000`

### 6. Section 2 - 개원입지 임장
- `text-align: center`
- 배경색 전환: `#391109` (와인색)
- Swiper: `slidesPerView: 3`

### 7. Section 3 - 독보적 전문성
- GSAP 커튼 효과: left_cover, right_cover → `scaleX: 0`
- `tit_flex`: Chapter + main_tit 가로 배치
- 배경: `#222`
- Swiper: 3열

### 8. Section 4 - 시스템 디테일
- 2컬럼: 텍스트(60%) + 이미지 스택(40%)
- image-stack: 500x600, absolute 포지셔닝
- 3초마다 자동 순환 (shift → push → appendChild)
- rotate/translateY 트랜지션

### 9. Section 5 - 성과 (월매출 4억)
- 배경: `#5f0000` (딥 레드)
- 2컬럼: 텍스트(40%) + 세로 마퀴(50%)
- 마퀴: `flex-direction: column`, CSS keyframe `scroll-up`
- JS: 원본 복제 → 총 높이 계산 → `--scroll-distance` CSS 변수

### 10. Section 6 - 랜드마크 병원
- 배경: `#230f0f`
- GSAP: circle img `scale: 10` (스크롤 스크럽)
- 6개 이미지: absolute 포지셔닝, IntersectionObserver 진입 시 fadeIn
- 딜레이: 0s, 0.2s, 0.4s, 0.6s, 0.8s, 1.0s

### 11. Footer - 상담 신청
- 배경: `#230f0f` 연속
- 상단: 제목 + 카카오 CTA + 응답시간/누적문의 카운터
- 상담 폼:
  - 이름 (text input)
  - 연락처 (tel input, 자동 하이픈)
  - 관계 (커스텀 select: 본인/가족/직원/기타)
  - 진료과 (커스텀 select)
  - 개원예정지 (커스텀 select)
  - 일정 (커스텀 select)
  - 개인정보 동의 (체크박스 + 팝업)
  - 제출 버튼
- 하단: 회사 정보 + 이용약관/개인정보처리방침 링크

### 12. 고정 CTA 버튼
- 우측 하단 `position: fixed`
- 카카오: 노란 그라디언트 (`#ffb000 → #ffde00`)
- 전화: 빨간 그라디언트 (`#e93e3e → #ad1515`)

### 13. 노이즈 오버레이
- `position: fixed; inset: 0`
- GIF 배경 이미지 (노이즈 텍스처)
- `opacity: 0.05`, `pointer-events: none`

### 14. 스크롤 진행 바
- 우측 세로 라인 (1px)
- 배경: `rgba(255,255,255,0.05)`
- 채움: `#fed200`
- JS: `scrollPercent` 계산 → `.scroll_fill` height 업데이트

---

## 팝업/모달

### 개인정보 수집 동의
- `.agree_pop` - 개인정보처리방침 내용
- fadeIn/fadeOut 토글

### 이용약관 / 개인정보처리방침
- `.pop.pop1` - 이용약관 전문
- `.pop.pop2` - 개인정보처리방침 전문
- `.pop_bg` - 반투명 배경
- `.pop_close` - 닫기 버튼 (SVG X 아이콘)

---

## 이미지 처리 전략

### 옵션 A: 원본 이미지 다운로드
- curl로 jinsul.kr에서 직접 다운로드
- 장점: 완벽한 1:1 클론
- 단점: 저작권 이슈

### 옵션 B: Placeholder 이미지
- Unsplash/Pexels에서 유사 이미지
- 장점: 저작권 자유
- 단점: 분위기 차이

### 옵션 C: 하이브리드
- 구조적 요소(로고, 아이콘)는 커스텀 제작
- 사진은 무료 스톡 또는 AI 생성
- **권장**: 개발 단계에서는 placeholder → 운영 시 실제 이미지 교체

---

## 성능 최적화 체크리스트
- [ ] 이미지: WebP 포맷 + srcset
- [ ] 이미지: lazy loading (`loading="lazy"`)
- [ ] CSS: 크리티컬 CSS 인라인
- [ ] JS: defer/async 로딩
- [ ] 폰트: `font-display: swap`
- [ ] GSAP: 필요한 플러그인만 로드
- [ ] 모바일: 불필요한 애니메이션 비활성화
