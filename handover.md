# MakerPrintTools Handover

## 1. 프로젝트 개요

- 프로젝트명: MakerPrintTools
- 도메인: https://makerprinttools.com
- 목적: 글로벌 개인 사용자, 메이커, 3D 프린팅 취미 사용자, 소규모 판매자/프린트팜을 위한 3D Printing Tools & Maker Workbench
- 핵심 방향: 단순 정보 블로그가 아니라 실제 숫자를 입력하고 결과를 얻는 계산기/도구 중심 사이트
- 언어: 영어
- 타겟: 글로벌
- 기술 스택: Static HTML + CSS + Vanilla JavaScript
- 호스팅: GitHub Pages
- DNS/CDN: Cloudflare
- DB/API: 원칙적으로 사용하지 않음
- 이미지 정책: 불필요한 스톡 이미지 사용 금지. 계산기/정보 전달은 CSS, 아이콘, 간단한 도식 위주
- 운영 목표: 최소 유지보수, 장기 검색 유입, AdSense 중심 수익화 + 향후 제휴 가능성 확보

---

## 2. 확정 인프라

### Domain
- makerprinttools.com
- HTTPS 정상 작동 확인 완료

### Google Analytics 4
Measurement ID:

`G-T6DZFFQJP3`

모든 색인 가능 공개 페이지의 `<head>`에 아래 코드를 정확히 삽입한다.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-T6DZFFQJP3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T6DZFFQJP3');
</script>
```

중복 삽입 금지.

### Search Console
- 연결 여부는 초기 개발 완료 후 확인
- 검증용 파일 또는 메타태그가 제공되기 전까지 임의 생성 금지

---

## 3. 작업 연속성 규칙 — 매우 중요

이 프로젝트는 회사/집 등 여러 PC에서 이어서 작업해야 한다.

GitHub 저장소를 유일한 Source of Truth로 사용한다.

모든 작업 시작 시:

1. 현재 Git 상태 확인
2. 원격 최신 상태 pull
3. `handover.md` 전체 확인
4. 현재 단계 / 마지막 완료 작업 / 다음 우선순위 확인
5. 기존 작업을 임의로 되돌리거나 재작성하지 말 것

모든 작업 종료 시:

1. 자동 QA 실행
2. 브라우저 렌더링 샘플 확인
3. 변경사항 정리
4. `handover.md` 갱신
5. commit
6. push

새 PC나 새 Codex 세션에서도 `git pull` + `handover.md`만으로 즉시 이어갈 수 있어야 한다.

`handover.md`에는 항상 아래를 최신 상태로 유지한다.

- 현재 개발 단계
- 완료된 작업
- 다음 작업 우선순위
- 공개 페이지 수
- 계산기 수
- 가이드/레퍼런스 수
- 알려진 문제
- 보류된 아이디어
- QA 결과
- 최근 커밋
- 중요한 설계 결정
- 절대 변경 금지 규칙

---

## 4. 사이트 포지셔닝

단순한 "3D Printing Calculator" 사이트로 만들지 않는다.

포지션:

**3D Printing Tools & Maker Workbench**

핵심 사용자:

- FDM 3D printer 사용자
- Resin/SLA/MSLA 사용자
- 취미 메이커
- 프린트팜 운영자
- Etsy 등 소규모 3D 프린트 판매자
- 프로토타이핑 사용자
- 초보자부터 중급 사용자

주요 가치:

- 재료량 계산
- 비용 계산
- 출력 설정 계산
- 모델 크기/스케일 계산
- 레진 계산
- 판매/프린트팜 수익 계산
- 실용 reference와 guide

---

## 5. 경쟁 전략

메인 키워드 몇 개만 정면승부하지 않는다.

초기 SEO 구조:

- 대형 핵심 키워드: 장기 허브 역할
- 중간 경쟁 툴: 카테고리별 전문 페이지
- 롱테일 계산기: 초기 유입 핵심

중복/얇은 페이지 양산 금지.

예:
- `3D Printing Cost Calculator` 하나를 복제해 PLA/PETG/ABS별 얇은 페이지를 만드는 방식 금지
- 검색 의도, 입력값, 계산 로직, 결과 해석이 실제로 다를 때만 독립 페이지 생성

---

## 6. 초기 정보 구조

권장 기본 구조:

```text
/
├─ index.html
├─ tools/
│  ├─ index.html
│  ├─ filament/
│  ├─ cost/
│  ├─ print-settings/
│  ├─ resin/
│  ├─ geometry/
│  └─ business/
├─ guides/
├─ reference/
├─ about/
├─ contact/
├─ privacy/
├─ assets/
│  ├─ css/
│  ├─ js/
│  └─ icons/
├─ partials/
│  ├─ header.html
│  └─ footer.html
├─ robots.txt
├─ sitemap.xml
├─ llms.txt
├─ CNAME
└─ handover.md
```

실제 기존 저장소 구조가 있다면 먼저 분석하고 충돌 없이 조정한다.

---

## 7. 초기 핵심 툴 후보

### Filament
- Filament Length to Weight Calculator
- Filament Weight to Length Calculator
- Filament Spool Remaining Estimator
- Filament Cost Calculator
- Filament Needed Calculator
- Material Density Reference
- Multi-color / Purge Waste Estimator

### Print Cost
- 3D Print Cost Calculator
- Electricity Cost Calculator
- Machine Depreciation Calculator
- Failed Print Cost Calculator
- Batch Print Cost Calculator
- Selling Price Calculator
- Profit Margin Calculator
- Print Farm Break-even Calculator

### Print Settings
- Layer Count Calculator
- Layer Height Calculator
- Volumetric Flow Calculator
- Flow Rate Calculator
- Line Width Calculator
- Wall Thickness Calculator
- Nozzle / Layer Ratio Helper
- Extrusion Multiplier Helper

### Resin
- Resin Volume Calculator
- Resin Cost Calculator
- Resin Bottle Yield Calculator
- Hollow Model Resin Savings Calculator
- Resin Print Cost Calculator

### Geometry
- 3D Model Scale Calculator
- Percentage Resize Calculator
- Volume Scaling Calculator
- Weight After Scaling Calculator
- Shrinkage Compensation Calculator
- Tolerance / Clearance Helper

초기에는 전부 만들지 않는다.
1차는 사이트 기반 + 대표 핵심 툴 5~8개만 완성한다.

---

## 8. 디자인 원칙

기존 프로젝트의 디자인을 복사하지 않는다.

MakerPrintTools만의 독립적인 시각 체계를 만든다.

목표 인상:

- maker/workbench
- technical but friendly
- 개인 사용자도 부담 없이 사용 가능
- 전문적이지만 공학 사이트처럼 딱딱하지 않음

필수:

- 명확한 typography hierarchy
- 충분한 spacing
- 모바일 우선
- 계산기 입력/결과 영역이 한눈에 구분
- 버튼과 인터랙션 상태 명확
- 카드 남발 금지
- 과도한 둥근 모서리/템플릿형 SaaS 디자인 금지
- 첫 화면에서 사이트가 무엇을 하는지 즉시 이해되어야 함
- 헤더 로고/브랜드 영역이 반응형에서 깨지지 않도록 보호
- 1440 / 1280 / 1024 / 390px 주요 폭 확인

---

## 9. 공통 SEO 요구사항

모든 색인 가능 페이지:

- 고유 `<title>`
- 고유 meta description
- canonical
- robots meta
- viewport
- Open Graph 기본 메타
- 의미 있는 H1 1개
- 구조화된 heading hierarchy
- 내부 링크
- breadcrumb 필요 시 사용
- 날짜/업데이트 정보는 실제 관리 가능한 방식으로만 표시
- thin content 금지

필수 파일:

- robots.txt
- sitemap.xml
- llms.txt

사이트맵에는 색인 가능 canonical URL만 포함한다.

---

## 10. 계산기 품질 원칙

계산기는 단순 숫자 출력으로 끝내지 않는다.

가능하면:

- 입력값 설명
- 단위 선택
- 실시간 validation
- 결과 요약
- 계산 과정 또는 공식 설명
- 결과 해석
- 사용 예시
- 관련 툴 링크
- copy / print 기능이 유용한 경우 제공

잘못된 입력:
- 음수
- 0 불가 항목
- 비현실적 범위
- NaN / Infinity
처리 필수.

Metric / Imperial 단위는 해당 계산기에 필요할 경우 지원.

통화는 특정 국가에 고정하지 않고 사용자 입력 또는 일반 통화 기호 중립 설계 우선.

---

## 11. 초기 개발 1차 범위

1차 목표:

1. 저장소 현황 분석
2. 폴더 구조 정리
3. `handover.md` 저장
4. 공통 header/footer
5. 공통 CSS/JS
6. GA4 `G-T6DZFFQJP3` 삽입
7. favicon/기본 브랜드 요소
8. 홈페이지 완성
9. Tools 허브 완성
10. About
11. Privacy
12. Contact
13. 대표 핵심 계산기 5~8개
14. robots.txt
15. sitemap.xml
16. llms.txt
17. 기본 SEO/canonical
18. 모바일 반응형
19. 자동 QA
20. commit/push

대표 핵심 계산기 추천:

- 3D Print Cost Calculator
- Filament Length ↔ Weight Calculator
- Filament Spool Remaining Calculator
- Layer Count Calculator
- Volumetric Flow Calculator
- Model Scale Calculator
- Shrinkage Compensation Calculator
- Resin Cost Calculator

실제 구현 전 경쟁/검색 의도와 계산 로직을 검토하여 최대 8개로 조정 가능.

---

## 12. Mandatory Quality Gate Before Commit / Push

매 작업 완료 전 반드시 검사한다.

### 자동 검사
- broken internal links
- malformed HTML
- duplicate id
- JS syntax/runtime errors
- missing canonical
- sitemap/internal link mismatch
- accidental noindex
- GA 코드 중복 또는 누락
- calculator 기본 동작
- 모바일 overflow
- 화면에 `.html">`, 잘못된 href, 템플릿 문자열 등 깨진 마크업 노출 여부

### 시각 샘플
최소:

- Homepage
- Tools hub
- Filament 대표 계산기
- Cost 대표 계산기
- Print Settings 대표 계산기
- Resin 또는 Geometry 대표 계산기
- About/Privacy 중 1개

폭:
- 1440px
- 1280px
- 1024px
- 390px

계산기 샘플은 입력 구조가 서로 다른 페이지를 최소 5개 테스트한다.

---

## 13. 절대 금지

- 기존 HVAC / Plastics / Reliability 사이트 디자인 복사
- 의미 없는 대량 페이지 생성
- 실제 근거 없는 재료/프린터 데이터 생성
- 실시간 가격/제품 스펙을 하드코딩하여 유지보수 부담 생성
- API/DB 의존 구조 임의 도입
- GA 코드 임의 변경
- 도메인 변경
- handover 갱신 없이 commit/push
- QA 없이 commit/push
- 작업 시작 시 원격 최신 상태 확인 없이 대규모 수정
- 사용자가 직접 수정한 코드를 임의로 되돌리기

---

## 14. 현재 상태

- 도메인 구매: 완료
- GitHub Pages: 설정 완료
- Cloudflare DNS: 설정 완료
- HTTPS: 정상
- GA4: 발급 완료 (`G-T6DZFFQJP3`)
- 초기 개발: **Phase 1 — Foundation & First Tools 구현 완료 (2026-07-23)**
- 현재 공개 페이지 수: **13**
- 현재 계산기 수: **8**
- 가이드/레퍼런스 수: **0** (각 계산기 페이지에 공식·해석·예시 포함)
- Search Console: 추후 연결 확인 필요

### 완료된 작업

- 독립적인 MakerPrintTools maker/workbench 디자인 시스템 및 반응형 공통 CSS
- 공통 브랜드 헤더, 모바일 메뉴, footer, SVG favicon
- 홈페이지, Tools 허브, About, Privacy, Contact
- 실제 계산 로직과 입력 검증을 갖춘 계산기 8개
  - 3D Print Cost Calculator
  - Filament Length ↔ Weight Calculator
  - Filament Spool Remaining Calculator
  - Layer Count Calculator
  - Volumetric Flow Calculator
  - Model Scale Calculator
  - Shrinkage Compensation Calculator
  - Resin Cost Calculator
- 모든 13개 공개 페이지에 고유 title, description, canonical, robots, OG, H1 적용
- 모든 13개 공개 페이지에 GA4 `G-T6DZFFQJP3` 1회 구성(측정 ID 문자열 2회: loader/config)
- `robots.txt`, 13 URL `sitemap.xml`, `llms.txt`
- 계산기 정적 페이지 생성 스크립트 및 자동 QA 스크립트

### 중요한 설계 결정

- GitHub Pages 호환을 위해 빌드 없는 정적 HTML/CSS/Vanilla JS 유지
- API/DB 및 빠르게 노후화되는 프린터/가격 데이터 미사용
- 통화 기호를 강제하지 않고 사용자가 동일 통화 단위로 가격을 입력하는 중립 설계
- 계산기별 검색 의도와 입력 구조가 겹치지 않도록 8개 대표 툴만 공개
- calculator 페이지는 `scripts/generate-calculator-pages.mjs`를 Source of Truth로 재생성 가능

### QA 결과 (2026-07-23)

- 자동 QA PASS: 13 HTML / 13 canonical / 13 sitemap URL
- broken internal links, 중복 ID, H1 수, accidental noindex, GA 누락·중복, sitemap 불일치 없음
- `git diff --check` PASS
- `site.js` 실제 JavaScript 파싱 및 초기화 PASS
- 8개 계산기 기본값 실제 로직 PASS
- 잘못된 입력 7개 샘플(음수, 0 불가, 역전된 tare, 100% 이상 등) 모두 거부 PASS
- CSS 반응형 breakpoint: 800px / 520px, 고정 폭 대신 유동 grid와 `minmax(0, ...)`, 390px 전용 단일 열 적용
- 시각 QA 제한: Codex in-app Browser가 `data:` 및 localhost URL을 보안 정책으로 차단하여 1440/1280/1024/390px 실제 스크린샷 검사는 이번 세션에서 수행 불가. 배포 직후 공개 HTTPS URL에서 동일 폭 수동 확인 필요.

### 알려진 문제

- 공개 배포 후 실제 브라우저 1440 / 1280 / 1024 / 390px 시각 샘플 확인 필요
- Contact 이메일 `hello@makerprinttools.com`의 실제 수신 설정은 저장소 밖에서 확인 필요
- Search Console 연결 상태 미확인

### 보류된 아이디어

- Material Density Reference 및 첫 guide/reference 콘텐츠
- 실패 비용, 판매 가격, tolerance/clearance 등 Phase 2 계산기 후보

---

## 15. 다음 작업

**Phase 2 우선순위**

1. GitHub Pages 배포 직후 공개 HTTPS에서 1440 / 1280 / 1024 / 390px 시각 QA 및 5개 이상 계산기 상호작용 재검증
2. Search Console 연결 및 sitemap 제출 상태 확인(검증 파일/태그는 제공된 값만 사용)
3. 실제 검색 의도 조사 후 Material Density Reference 또는 고품질 guide 1~2개 작성
4. 사용자 피드백 기반으로 다음 계산기 우선순위 결정

### 최근 커밋

- 작업 시작 기준: `6fd4ce3` — Add files via upload
- Phase 1 구현 커밋: `24556cd` — Build MakerPrintTools foundation and first calculators
- 최신 handover 갱신: 이 문서 갱신 커밋
