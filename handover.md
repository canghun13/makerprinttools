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
- 초기 개발: **Phase 7 — Comparison & Practical Content Cluster 완료 (2026-07-23)**
- 현재 공개 페이지 수: **57**
- 현재 계산기 수: **26**
- 가이드/레퍼런스 수: **24** (기존 Guide/Reference 12 + Comparison 6 + Practical 6, Guides/Reference hub 2개 별도)
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
- Phase 2: 공개 HTTPS 기준 homepage, Tools hub, cost/resin calculator, About 반응형·overflow 점검
- Phase 2: Filament Cost, Electricity Cost, 3D Print Selling Price Calculator 추가
- Phase 2: Tools hub, sitemap, llms.txt를 11개 계산기 기준으로 동기화
- Design QA: Homepage, Tools hub, 대표 계산기 5개를 공개 HTTPS 렌더링 기준으로 점검하고 시각·사용성만 보강
- Phase 3: 중복 없는 핵심 계산기 10개 추가 및 Tools hub, sitemap, llms.txt를 21개 계산기 기준으로 동기화
  - Filament Needed Calculator, Multi-color Purge Waste Estimator
  - Failed Print Cost Calculator, Batch Print Cost Calculator, Machine Depreciation Calculator, Profit Margin Calculator
  - Line Width Calculator, Wall Thickness Calculator
  - Resin Bottle Yield Calculator, Hollow Model Resin Savings Calculator
- Phase 4: 재료 레퍼런스 8개(PLA, PETG, ABS, ASA, TPU, Nylon, Polycarbonate, Standard vs Tough Resin), 실용 가이드 4개(Layer Height, Volumetric Flow, Wall Thickness, 3D Print Cost), Guides/Reference hub 2개 추가
- Phase 5: Print Time, Infill Material, Support Material, Scale-to-Fit Build Volume, Break-even Units Calculator 추가
- Phase 7: 계산기는 추가하지 않고 비교형 콘텐츠 6개와 문제해결형 콘텐츠 6개를 Guides 허브에 통합
  - Comparison: PLA vs PETG, PETG vs ABS, ABS vs ASA, FDM vs Resin, 0.4 mm vs 0.6 mm nozzle, fine vs standard layer height
  - Practical: warping, stringing, infill strategy, pre-print filament estimation, selling-price planning, support planning
- 공통 헤더: 모든 공개 페이지의 기본 메뉴를 Tools / Guides / About / Contact로 정규화. Guides 하위에서는 기존 Tools와 같은 active state를 적용.
- Guides hub: 전역 디자인 변경 없이 Setup & Tuning / Material & Process Comparisons / Troubleshooting & Cost의 세 작업 흐름으로 재구성. 각 흐름은 featured guide 2개와 compact links로 구분.

### 중요한 설계 결정

- GitHub Pages 호환을 위해 빌드 없는 정적 HTML/CSS/Vanilla JS 유지
- API/DB 및 빠르게 노후화되는 프린터/가격 데이터 미사용
- 통화 기호를 강제하지 않고 사용자가 동일 통화 단위로 가격을 입력하는 중립 설계
- 계산기별 검색 의도와 입력 구조가 겹치지 않도록 8개 대표 툴만 공개
- calculator 페이지는 `scripts/generate-calculator-pages.mjs`를 Source of Truth로 재생성 가능
- Phase 3은 기존 도구의 단순 역산·재료명 복제를 제외하고, 인벤토리 계획·다색 폐기물·실패/배치 비용·감가상각·실제 마진·벽/선폭·레진 수율/중공 절감처럼 입력 구조와 의사결정이 다른 도구만 추가
- Guide는 계산기와 역할을 분리해 선택 기준·트레이드오프·검증 방법을 설명하고, 재료별 고정 온도나 특정 브랜드 수치를 일반값으로 제시하지 않음

### QA 결과 (2026-07-23)

- 자동 QA PASS: 13 HTML / 13 canonical / 13 sitemap URL
- broken internal links, 중복 ID, H1 수, accidental noindex, GA 누락·중복, sitemap 불일치 없음
- `git diff --check` PASS
- `site.js` 실제 JavaScript 파싱 및 초기화 PASS
- 8개 계산기 기본값 실제 로직 PASS
- 잘못된 입력 7개 샘플(음수, 0 불가, 역전된 tare, 100% 이상 등) 모두 거부 PASS
- CSS 반응형 breakpoint: 800px / 520px, 고정 폭 대신 유동 grid와 `minmax(0, ...)`, 390px 전용 단일 열 적용
- 시각 QA 제한: Codex in-app Browser가 `data:` 및 localhost URL을 보안 정책으로 차단하여 1440/1280/1024/390px 실제 스크린샷 검사는 이번 세션에서 수행 불가. 배포 직후 공개 HTTPS URL에서 동일 폭 수동 확인 필요.

### Phase 2 QA 결과 (2026-07-23)

- 자동 QA PASS: 16 HTML / 16 canonical / 16 sitemap URL
- 11개 계산기 기본값 실제 공통 JS 실행 PASS
- 공개 HTTPS 점검 PASS: 1440px Cost, 1280px Resin, 1024px Tools, 390px Homepage 및 About에서 가로 overflow 없음
- 공개 Cost 페이지: GA ID 문자열 2개(loader/config), H1 1개, canonical, 기본 결과 `9.58` 확인
- malformed HTML, duplicate id, internal link, accidental noindex, sitemap mismatch 없음

### Design QA 결과 (2026-07-23)

- 공개 HTTPS 렌더링 점검: Homepage, Tools hub, 3D Print Cost, Filament Length ↔ Weight, Volumetric Flow, Resin Cost, Selling Price, Model Scale 화면을 1440 / 1280 / 1024 / 390px 조합으로 확인
- 모든 점검 화면에서 가로 overflow 없음. 390px에서 메뉴, Tools hub, 계산기 입력·결과가 단일 열로 전환되고, 대표 계산기 5개에서 입력·결과 영역 폭이 뷰포트 안에 유지됨
- 유지: paper/grid, workbench 번호 체계, 기존 typography 및 여백 구조는 MakerPrintTools 정체성이 충분해 전면 재설계하지 않음
- 보강: 입력 패널의 노란 작업 보드 표식, 결과 패널의 연녹색 판독 영역, 48px 입력·버튼 터치 높이, Tools hub 카테고리 색상 레일
- 기능, SEO, 계산 로직, 공개 페이지 수와 계산기 수는 변경하지 않음

### Phase 3 QA 결과 (2026-07-23)

- 자동 QA PASS: 26 HTML / 26 canonical / 26 sitemap URL
- broken internal links, duplicate ID, H1 수, accidental noindex, GA 누락·중복, sitemap 불일치 없음
- `site.js` 및 `generate-calculator-pages.mjs` 구문 검사 PASS, `git diff --check` PASS
- `scripts/calculator-qa.mjs` PASS: 신규 10개 계산기의 기본값 결과와 음수 오류 입력 거부를 모두 확인. NaN / Infinity 결과 없음
- 로컬 정적 서버는 준비했으나 Codex in-app Browser가 `127.0.0.1`을 보안 정책으로 차단하여 이번 세션의 배포 전 브라우저 렌더링/상호작용 시각 QA는 불가. push 후 공개 HTTPS에서 1440 / 1280 / 1024 / 390px 확인 필요
- 공개 HTTPS QA PASS: Homepage(1440), Tools hub(1280/390), 신규 Filament(1440), Cost(1280), Print Settings(1024), Resin(1024), Geometry(390), 신규 Batch(390)에서 가로 overflow 없음
- 공개 HTTPS 상호작용 PASS: Batch, Filament Needed, Multi-color Purge Waste, Failed Print Cost, Machine Depreciation, Profit Margin, Line Width, Hollow Resin Savings의 기본값 결과·음수 입력 오류 메시지·결과 초기화를 실제 브라우저에서 확인

### Phase 4 QA 결과 (2026-07-23)

- 자동 QA PASS: 40 HTML / 40 canonical / 40 sitemap URL
- `scripts/content-qa.mjs`로 Homepage에서 모든 공개 페이지가 내부 링크를 통해 도달 가능한지 확인
- 신규 Guide/Reference 페이지는 재료 선택, 습기/수축/뒤틀림, 설정·비용 의사결정과 관련 계산기 연결을 포함
- 공개 HTTPS 시각 QA PASS: Homepage(1440), Tools hub/Reference hub(1280), PLA(1440), Nylon/Volumetric Flow Guide(1024), Wall Thickness Guide/3D Print Cost Guide/기존 Filament·Batch 계산기(390)에서 가로 overflow 없음

### Phase 5 QA 결과 (2026-07-23)

- 자동 QA PASS: 45 HTML / 45 canonical / 45 sitemap URL, GA·robots·H1·링크·중복 ID·sitemap 불일치 없음
- Content QA PASS: 45개 공개 페이지가 Homepage에서 내부 링크로 도달 가능
- 신규 계산기 5개는 기존 21개와 중복되지 않는 시간·내부/서포트 재료 계획·빌드 볼륨 적합성·손익분기 의사결정을 담당
- 1차 완성 판정: **가능**. HIGH 위험: 없음. MEDIUM 위험: Search Console 연결·제출 상태, Contact 이메일 수신 설정. LOW 위험: 실제 사용자 데이터에 따른 다음 계산기/가이드 우선순위 조정.
- 지금 당장 추가 작업: **아니오**. 다음 추천 단계: Search Console 연결 확인과 실제 검색/사용자 피드백 기반 개선.

### Phase 6 콘텐츠 깊이 감사 (2026-07-23)

- 감사 대상: 45개 공개 페이지. 분류 결과: 충분 40개 / 보강 필요 5개 / 심각하게 얇음 0개.
- 보강 필요 5개는 Homepage, Tools hub, Guides hub, Reference hub, Contact처럼 탐색·안내 목적이 강한 페이지이며, 계산기나 장문 Guide처럼 분량을 늘릴 대상이 아님. 역할과 내부 링크는 충분히 명확해 이번 작업에서 인위적 확장하지 않음.
- 26개 계산기는 입력 설명, 공식/원리, 결과 해석, 사용 예시, 관련 도구 또는 Guide 링크를 보유. 12개 Guide/Reference는 계산기 실행 화면을 복제하지 않고 선택 기준·트레이드오프·주의사항을 분리함.
- 반복 문구는 공통 안전 고지와 계산기 공통 UI를 제외하면 과도하지 않음. title/H1/search intent 불일치, 중복 canonical, 고아 페이지, 심각한 thin-content 위험 없음.
- 실제 콘텐츠 보강: 0개. 판단 근거: 현재 구조에서 문장을 늘리면 템플릿 반복과 사용자 가치 저하 위험이 더 큼.
- AdSense 관점: 실용 도구·설명·내부 탐색 구조는 1차 수준에 도달. 남은 위험은 콘텐츠 길이가 아니라 Search Console 연결과 실제 유입 데이터 부재.

### Phase 7 QA 결과 (2026-07-23)

- 정적 QA PASS: 57 HTML / 57 canonical / 57 sitemap URL. 내부 링크, duplicate ID, H1, robots, GA, sitemap 일치 확인 완료.
- Content QA PASS: 57개 공개 페이지 모두 Homepage → Guides hub 등의 내부 링크로 도달 가능. orphan page 없음.
- 비교·실용 콘텐츠는 Material Reference의 재료 이해, Calculator의 수치 실행과 역할을 분리했다. 브랜드별 최신 사양·가격·제품 추천은 포함하지 않았다.
- 공개 HTTPS 반응형 QA PASS: Homepage(1440), Tools·Guides hub(1280), PLA vs PETG·Reduce Warping(1440), FDM vs Resin·Estimate Filament·PLA Reference(1024), Nozzle comparison·Price guide·Filament Needed·Batch Cost calculator(390)에서 H1 1개, canonical, GA loader와 가로 overflow 없음을 확인했다.
- 신규 콘텐츠 12개는 모두 Guides hub에서 연결되며, 기존 Material Reference·Calculator로 이어진다. 신규 콘텐츠끼리의 검색 의도 중복, orphan page, 기존 Reference의 단순 복제는 없음.

### 1차 콘텐츠 확장 최종 판정

- 최종 공개 페이지: **57**. Calculator: **26**. 기존 Guide/Reference: **12**. Phase 7 Comparison: **6**. Phase 7 Practical: **6**.
- 전체 thin-content 상태: 기존 Depth Audit 기준 심각하게 얇음 0개. 신규 페이지도 비교/문제 해결의 독립적인 선택·판단 흐름을 보유.
- 3D Printing 사이트 1차 완성 판정: **가능**. 지금 당장 추가 콘텐츠 작업: **아니오**.
- HIGH 위험: 없음. MEDIUM 위험: Search Console 연결·sitemap 제출 및 실제 색인/검색 의도 데이터 부재. LOW 위험: Contact 수신 설정, 실제 사용자의 질문을 반영한 후속 링크·문구 미세 조정.
- 운영 대기 전 외부 설정: Search Console에서 canonical domain과 sitemap 제출 상태를 확인하고, Contact 이메일 수신을 확인한다. GSC 데이터가 쌓이기 전에는 신규 페이지 대량 확장을 추천하지 않는다.

### Header navigation QA (2026-07-23)

- 57개 공개 페이지의 공통 헤더에 Tools / Guides / About / Contact 순서와 /guides/ 링크를 확인했다.
- 자동 QA PASS: 57 HTML / canonical / sitemap, 내부 링크·GA·H1·robots 영향 없음. Content QA로 홈페이지 기준 57개 페이지 도달성 유지.
- 공개 HTTPS QA PASS: Homepage(1440), Tools(1280), Guides hub(1024), 비교 페이지(390)에서 네 링크 순서·active state·가로 overflow를 확인했다. 390px에서는 Menu를 열어 Guides 링크가 표시되고 overflow 없이 동작함을 확인했다.

### Guides hub information-design QA (2026-07-23)

- 기존 title, canonical, GA, H1과 모든 Guide / Comparison / Practical 목적지 링크를 유지한 상태로 허브의 시각적 위계만 개선.
- 자동 QA PASS: 57 HTML / canonical / sitemap, 내부 링크·GA·H1·robots·homepage 도달성 유지.
- 공개 HTTPS QA PASS: Guides hub에서 1440 / 1280 / 1024px는 featured 2열·compact 3열, 390px는 한 열로 자연스럽게 전환. 16개 기존 Guide / Comparison / Practical 목적지 링크, header/footer, H1 유지 및 가로 overflow 없음.

### 알려진 문제

- Contact 이메일 `hello@makerprinttools.com`의 실제 수신 설정은 저장소 밖에서 확인 필요
- Search Console 연결 상태 미확인

### 보류된 아이디어

- Print Farm Break-even, Extrusion Multiplier, Tolerance / Clearance Helper 등 후속 후보

---

## 15. 다음 작업

**Post-launch 우선순위**

1. Search Console 연결 및 sitemap 제출 상태 확인(검증 파일/태그는 제공된 값만 사용)
2. 실제 GSC·사용자 피드백을 기준으로 CTR, 색인, 내부링크 개선 후보를 선정
3. 데이터가 충분히 쌓이기 전에는 신규 콘텐츠 대량 확장 대신 성과 관찰

### 최근 커밋

- `2650796` — Improve Guides hub information hierarchy
- `19cc053` — Add Guides to shared navigation
- `6223848` — Add comparison and practical content cluster
- `d471118` — Record content depth audit
- `3638cd1` — Update index.html (사용자 Contact 수정, 보존)
- 다음 커밋: Guides hub information-design QA 기록


## 2026-07-29
- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://kittylaunch.com, https://sellwithboost.com/에 등록 (내가 직접함)

## 2026-07-30
- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://twelve.tools/, https://findly.tools/에 등록 (내가 직접함)

## 2026-08-01 — Print Farm Production Planning

- 시작 commit: `07ee7bd`.
- 신규 클러스터: **Print Farm Production Planning**. 기존 Calculator의 비용·시간·감가상각·실패 입력을 farm-level capacity, queue, utilization, downtime, throughput, deadline 판단으로 연결한다.
- 신규 페이지 9개: `/tools/production/` 허브, Capacity / Required Printer Count / Queue Completion / Utilization / Downtime Impact / Batch Throughput 계산기 6개, `How to Schedule a Small 3D Print Farm` Guide, `Print Farm Capacity, Availability, Utilization and Throughput Reference`.
- 정확 중복: 없음. 대체 계산기 사용 없음.
- 공식 QA PASS: Capacity 448 / 403.2 / 322.56 printer-hours; Required Printers 180 required hours, 57.6 per printer, 4 printers; Queue 68.85 hours/day, 3.486 operating days (240 ÷ 68.85, 반올림); Utilization 720 gross hours, 66.667%; Downtime 6000 / 900 / 5100 hours, 180 cycles, 360 units; Throughput 57.6 effective hours/day, 7.2 cycles, 28.8 attempted, 27.36 good units/day.
- 입력 QA PASS: empty, zero, negative, NaN, Infinity, over-100% ratio, decimal values, large values, and zero-denominator cases clear the previous result and show an error.
- 기존 계산기 회귀 PASS: Print Cost, Filament, Print Settings, Geometry, Resin, Business/Pricing에서 기본값·입력 변경·오류 입력·reload reset·console error 없음 확인.
- 정적 QA PASS: 66 HTML / 66 canonical / 66 sitemap URL; broken link, orphan, duplicate ID, H1, robots, GA4, and sitemap checks pass. `production-planning.js` and all generator scripts parse cleanly.
- 통합: Homepage, Tools hub (Production Planning category), Guides hub, Reference hub, Batch Cost / Break-even / Depreciation / Print Time / Failed Print Cost related links, sitemap.xml, llms.txt 갱신.
- 사용자 관리 배지: Homepage footer 아래 KittyLaunch 및 디렉토리 배지·링크 마크업을 변경하지 않음.
- 브라우저 QA: in-app Browser는 local `127.0.0.1` 정적 서버를 security error page로 차단했다. 배포 후 public HTTPS에서 신규 9페이지 × 5 viewport 및 핵심 페이지를 재검사한다.
- 공개 페이지 수: **66**. 계산기 수: **32**. Guide/Reference/Comparison/Practical 콘텐츠: **26** (신규 Guide/Reference 포함, hubs 별도).
- 남은 위험: HIGH 없음. MEDIUM: Search Console 제출/색인과 Contact 수신 설정은 저장소 외 확인 필요. LOW: 실제 farm 운영 데이터로 availability, utilization, yield 가정을 재보정.

## 2026-08-01 Production planner validation deployment

- Blank productive-hours validation fix (`fb8eb0f`) deployed and publicly reverified: PASS. Final public pages: 66; calculators: 32; user-managed footer badges unchanged.

## 2026-08-01 Tools hub Workbench index deployment

- Implementation commit `a2f5941`: Tools hub Workbench index improvement deployed.
- Categories 01–06 and scroll/hash active state: PASS.
- Responsive layout: three columns at 800px and below; two columns at 520px and below.
- Public Tools QA at 1440 / 1280 / 1024 / 768 / 390: PASS; no horizontal overflow, header overlap, or console errors.
- Homepage, Guides hub, Reference hub, 3D Print Cost Calculator, and Printer Utilization Calculator representative regression checks: PASS.
- User-managed footer badges unchanged.


## 2026-08-06
- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://launchbuff.com/ https://boostdomainrating.com/ 에 등록 (내가 직접함)

## 2026-08-08 — 3D Printer Motion Mechanics deployment

- 시작 commit: `9ad2eb9`. 구현 commit: `93fb42f` (`Add 3D printer motion mechanics tools`). 마감 commit: 이 handover 기록 commit (`Record motion mechanics deployment QA`).
- 선정 클러스터: **3D Printer Motion Mechanics**. 기존 7개 Workbench 범주와 URL·title·H1·본문 검색 의도를 대조해 `steps/mm`, `lead screw`, `microstep`, `rotation_distance`, `timing belt`, `pulse rate` 중복이 없음을 확인했다.
- 후보 조사: UPS runtime은 배터리 모델·노화·방전곡선 의존성이 크고 일반 UPS 도구 경쟁이 강해 제외했다. Dry-box/desiccant는 누설·주변 습도·포화 상태로 정확한 건조 시간 계산이 어려워 제외했다. Enclosure ventilation은 안전 영향과 HVAC 변수 때문에 단순 도구화 위험이 높아 제외했다. Resin wash/vat 후보는 제품·재료별 편차가 크고 독립 도구 검색 의도가 약해 제외했다.
- 선택 근거: steps/mm 핵심 검색은 경쟁이 있지만 belt, lead screw, measured correction, open timing-belt sizing, pulse-rate/RPM 의도가 분산돼 있으며, 모두 사용자가 입력할 수 있는 기계값으로 결정론적 계산이 가능하다. 공식 근거는 Marlin M92/configuration, Klipper rotation_distance, Gates Timing Belt Theory, TI microstepping documentation을 사용했다.
- 신규 공개 페이지 8개: `/tools/motion/` hub, Belt Steps per mm, Lead Screw Steps per mm, Axis Steps Calibration, Timing Belt Length, Step Pulse Rate 계산기 5개, `/guides/3d-printer-motion-settings/`, `/reference/stepper-motion-reference/`.
- 공식: belt steps/mm = `(360 / angle) × microsteps × ratio / (pitch × teeth)`; lead-screw lead = `pitch × starts`; lead-screw steps/mm = `(360 / angle) × microsteps × ratio / lead`; corrected steps/mm = `current × commanded / measured`; corrected rotation distance = `current × measured / commanded`; open-belt length = `2C + π(D1 + D2)/2 + (D2 - D1)²/(4C)`; pulse rate = `steps/mm × speed`; RPM = `pulse rate × 60 / (full steps/rev × microsteps)`.
- 대표값 QA PASS: belt 80 steps/mm·rotation_distance 40 mm; lead screw 400 steps/mm·lead 8 mm; measured correction 80.402 steps/mm·39.8 mm rotation distance; timing belt 440 mm·220 teeth·200 mm adjusted center; pulse rate 16,000 steps/s·300 RPM·62.5 µs.
- 입력 QA PASS: 각 필드별 blank, invalid text, zero, negative, `NaN`, `Infinity`, 범위 초과, 큰 유한값. 오류 시 이전 결과와 detail을 지우며 `NaN`/`Infinity`를 출력하지 않는다. 입력 변경·Calculate·Reset wiring도 PASS.
- 정적 QA PASS: 74 HTML / 74 canonical / 74 sitemap URL, 홈페이지 내부 링크 도달성 74/74, broken local link·duplicate ID·H1·robots·GA4·내부 `.html` URL·sitemap 불일치 없음. OneDrive 비 ASCII 경로와 유효한 외부 Marlin `.html` URL을 오탐하는 기존 minified QA 대신 동일 검사를 경로 안전 runner로 재확인했다.
- 로컬 브라우저 QA PASS: 신규 8페이지 × 1440 / 1280 / 1024 / 768 / 390 = 40개 조합, representative existing pages 14개 조합, 신규 5개 계산기 상호작용, 기존 Print Cost / Model Scale / Printer Utilization 상호작용. 가로 overflow·control clipping·header/H1 overlap·console error 없음.
- 공개 배포 QA PASS: 신규 8 URL과 `site.css`, `site.js`, `motion-mechanics.js` 모두 HTTP 200. title/H1/canonical, sitemap 8 URL, 신규 40개 반응형 조합, 신규 계산기 5개 default/change/blank/reset, 기존 대표 페이지와 계산기 회귀, Tools `#motion` 직접 접근 및 07 active state 모두 PASS. Console error 0건.
- 최종 공개 페이지: **74**. 최종 계산기: **37**. Tools Workbench index는 **01–07**.
- 사용자 관리 영역: Homepage `index.html`은 변경하지 않았다. KittyLaunch, LaunchBuff, BoostDomainRating 및 기존 디렉토리 배지·링크가 공개 페이지에서 그대로 존재함을 확인했다.
- 위험: **HIGH 없음**. **MEDIUM**: Search Console 제출·색인 상태와 실제 기계에서의 travel/pulse-rate 검증은 저장소 밖 확인이 필요하다. **LOW**: open-belt 식은 표준 pitch-line 근사이며 실제 tension allowance·pulley geometry·구매 가능한 whole-tooth belt는 제작 전에 확인해야 한다.
- 지금 당장 추가 작업 필요 여부: **아니오**. 실제 검색·사용 데이터 또는 하드웨어 재현 문제가 생기기 전에는 이 클러스터 추가 확장을 권장하지 않는다.

## 2026-08-08 — Second search cluster research: NO-GO

- 시작 commit: `fcff5c5`. 이번 사이클 1차 신규 cluster는 이미 배포된 **3D Printer Motion Mechanics**이며, 두 번째 cluster 후보만 재조사했다.
- 최신 inventory: 공개 HTML **74**, calculator **37**, Workbench category 01–07. 기존 intent는 print cost/business, filament/material use, print settings, geometry/scaling, resin, print-farm production planning, motion mechanics 및 관련 Guide/Reference를 포함한다.
- 월간 검색량 숫자는 추정하지 않았다. 실제 SERP의 query 변형, calculator/tool 결과, 공식 기능, maker/forum 반복 질문을 근거로 Demand / Tool intent / Competition / Distinctness / Cluster depth / Calculation quality / Maintenance HARD GATE를 비교했다.

### 후보 판정

- **Bed mesh / first-layer measurement — REJECT.** Bed variance, mesh interpretation, screw turns, probe repeatability, Z-offset 질문은 반복된다. 그러나 Klipper가 bed leveling, bed mesh, probe calibration, screw adjustment와 mesh analysis를 공식 제공하고, OctoPrint Bed Visualizer·Meshvisualizer·전용 Bed Mesh Analyzer가 paste/visualization/statistics/screw correction을 이미 제공한다. Demand와 Tool intent는 통과하지만 Competition gap gate를 실패했다. 근거: https://www.klipper3d.org/Bed_Level.html, https://www.klipper3d.org/Bed_Mesh.html, https://plugins.octoprint.org/plugins/bedlevelvisualizer/, https://www.gamebob.dev/en/utilities/categories/3d-printing/bed-mesh-analyzer/
- **3D printed fit / clearance / fasteners — REJECT.** Press fit, sliding clearance, undersized holes, heat-set insert pilot holes의 반복 수요는 확인했다. 동시에 tolerance/fit/hole calculator가 다수 존재하며, 실제 보정은 printer, orientation, material, temperature, flow와 test coupon에 종속된다. 기존 Shrinkage Compensation/Geometry와도 일부 겹쳐 Competition, Distinctness, Calculation quality gates를 실패했다. 근거: https://grandpacad.com/en/tools/tolerance-fit-calculator, https://www.rmproductionsllc.com/tools/tolerance-calculator/, https://tools.creative3dp.com/tools/hole-tolerance-calculator/
- **Extrusion and filament-profile calibration — REJECT.** Flow ratio, pressure advance, retraction, E-steps 질문은 반복되지만 OrcaSlicer가 calibration workflow를 직접 제공하고 무료 calculators도 포화 상태다. 기존 Volumetric Flow, Line Width, Wall Thickness, Motion settings와 의미상 겹쳐 Competition과 Distinctness gates를 실패했다. 근거: https://github.com/SoftFever/OrcaSlicer/wiki/Calibration, https://printpal.io/tools/flow-rate-calculator, https://geoff.greer.fm/3d/estep/
- **Thermal / PSU / heater / wiring planning — REJECT.** PSU sizing, bed heat-up, current, fuse, wire gauge 질문은 반복되고 여러 도구로 나눌 수 있다. 그러나 enclosure loss, heater coupling, duty cycle, conductor insulation/bundling, connector rating, mains/DC protection을 단순 입력으로 안전하게 결정할 수 없고 동일 PSU/heated-bed calculators도 존재한다. Safety와 Calculation quality gate를 실패했다.
- **Filament dry-box environment — HOLD.** Storage humidity와 desiccant 질문은 강하지만 air-only dew-point/absolute-humidity 계산은 filament 내부 수분, box leakage, opening frequency, desiccant isotherm과 mass-transfer rate를 설명하지 못한다. Drying time을 정확한 결과처럼 제시할 수 없어 Calculation quality gate를 실패했다. Prusa도 dry box는 moist filament를 건조하지 않고 흡수를 늦추는 장치라고 구분한다. 근거: https://help.prusa3d.com/article/prusa-uss-drybox_1014382, https://help.prusa3d.com/article/first-setup-and-filament-loading-uss-drybox_1074142
- **Object photogrammetry / 3D scanning planning — HOLD.** GSD, field of view, turntable photo count 질문은 존재하지만 강한 공식 GSD/FOV tools가 있고 object capture의 overlap·photo count는 표면 texture, reflections, lens, focus와 software에 크게 좌우된다. 3D printing 핵심 intent와의 거리가 있고 자연스러운 독립 tools 4개를 확실히 구성하지 못해 Competition, Distinctness, Cluster depth gates를 통과하지 못했다. 근거: https://support.pix4d.com/hc/en-us/articles/202560249, https://www.photomodeler.com/pm-support/field-of-view-calculator/
- **3D printed gears / maker gearing — REJECT.** Spur dimensions, center distance, ratio, compound trains, rack travel은 결정론적으로 계산 가능하고 maker 질문도 반복된다. 그러나 전문 calculator hubs와 무료 STL/DXF gear generators가 이미 핵심 및 long-tail을 강하게 점유한다. Competition gap gate를 실패했다. 근거: https://evolventdesign.com/pages/calculators, https://geardxf.com/, https://meta-matic.com/en/calc/gear-center-distance/

### 종료 판정

- **SECOND CLUSTER: NO-GO — 이번 사이클 확장 종료.** 수요가 있는 후보는 있었지만 HARD GATE A–G를 모두 통과한 후보는 없었다. 특히 경쟁 빈틈, 기존 영역과의 비중복, 사용자가 제공할 수 있는 입력만으로의 결정론적 정확성 중 하나 이상이 각 후보에서 실패했다.
- 제품 파일, HTML/CSS/JS, sitemap, llms.txt, Tools index, Homepage 및 사용자 관리 footer/directory badge 영역은 변경하지 않았다. 공개 페이지 **74**, calculator **37**을 유지한다.
- 이번 판단은 영구 기각이 아니다. Search Console 또는 실제 사용자 문의에서 하나의 문제군에 반복 query가 쌓이고 현재 도구가 해결하지 못하는 명확한 gap이 확인될 때만 HOLD 후보를 재검토한다.
- 구현 commit: 없음. 최종 commit: 이 handover-only NO-GO 기록 commit (`Record second cluster no-go research`).

## 2026-08-10 — Highest-impact audit: Selling Price validation

- 시작 commit: `838cb837cdc8a1b6c681cca02b8262b9062892fd`. 시작 시 local `main`, `origin/main`, remote HEAD가 일치했고 working tree는 clean이었다.
- 최신 inventory 재계산: 공개 HTML **74**, calculator **37**, Workbench category **01–07**. Guides, Reference, Production Planning, Motion Mechanics, sitemap, robots, llms, canonical, metadata, GA4, 내부 링크, 공통 JS/CSS를 재감사했다. Repository에 GSC/GA4 export 또는 query/landing-page 데이터는 없었으며 Search Console 연결 상태도 확인되지 않았다.
- 주요 후보 판정:
  - **DO NOW — 3D Print Selling Price Calculator validation.** Production에서 fee 60% + margin 40%가 `∞`와 `NaN`, 합계 110%가 음수 가격을 출력했고 blank fee가 이전 성공 결과를 유지했다. 실제 사용자 계산 신뢰를 훼손하며 최소 수정으로 재현·검증 가능했다.
  - **HOLD — 기존 검색 노출 페이지 보강.** 실제 GSC/GA4 신호가 없어 rewrite 근거가 부족하다.
  - **HOLD — structured data 추가.** 현재 74페이지의 title/H1/canonical/indexability가 정상이고 calculator-specific rich-result 효과 근거가 약하다.
  - **REJECT — 신규 cluster.** 기존 페이지의 명확한 correctness 버그보다 기대효과가 낮고, 2026-08-08 second-cluster NO-GO를 뒤집을 새 증거가 없다.
- 선택 작업: Selling Price Calculator에서 네 필드의 blank를 거부하고, marketplace fee + target margin 합계가 100% 이상이면 계산을 중단해 이전 결과를 `—`로 지우도록 수정했다.
- 변경 파일: `assets/js/site.js`, `scripts/calculator-qa.mjs`, `scripts/qa.mjs`. Homepage와 사용자 관리 KittyLaunch / LaunchBuff / BoostDomainRating / 기타 directory badge 영역은 변경하지 않았다.
- QA infrastructure: 유효한 외부 Marlin `M092.html` URL을 malformed internal link로 오탐하던 `scripts/qa.mjs`를 내부 `.html` URL만 검사하도록 수정했다. 제품 링크를 테스트에 맞춰 변경하지 않았다.
- 정적 QA PASS: 74 HTML / 74 canonical / 74 sitemap URL, homepage 도달성 74/74, broken internal link·orphan·duplicate ID·H1·robots·GA4·sitemap mismatch 없음. 공통/Production/Motion JS syntax와 각 calculator QA PASS.
- Calculator QA PASS: default `22.22`, changed inputs `35.71`, zero rates `14`, negative·blank·combined 100%·100% 초과 거부, combined 99.99%와 큰 유한값은 finite 결과, reload reset `22.22`. 오류 시 이전 결과와 detail을 지우며 `NaN`/`Infinity`/`∞`를 출력하지 않는다.
- 로컬 브라우저 QA PASS: 변경 페이지 1440 / 1280 / 1024 / 768 / 390에서 horizontal overflow·form/result clipping·header/H1 overlap 없음, CSS 로드 및 console error 0건.
- Production baseline QA: Homepage, Tools, Guides, Reference, Printer Utilization, Belt Steps/mm에서 canonical·GA4·H1·overflow·기본 결과 정상. Selling Price의 결합 비율/blank 오류를 Production에서 재현한 뒤 수정했다.
- 구현 commit: `27bdb1298f8a82995643318a7e6fba3e5b82349e` (`Fix selling price validation boundaries`).
- 최종 공개 페이지: **74**. 최종 calculator: **37**. 신규 페이지/cluster 없음.
- 배포 상태: handover 기록 시점에는 push 및 변경 URL Production 재검증 전. 원격 반영 후 별도 closeout 기록을 추가한다.

## 2026-08-10 — Selling Price validation deployment closeout

- 구현 commit `27bdb1298f8a82995643318a7e6fba3e5b82349e`와 감사 기록 commit `dfda746db28e54d667c70587fa3d83f49252f215`를 `origin/main`에 push하고 local/remote HEAD 일치를 확인했다.
- 공개 `assets/js/site.js` HTTP 200 및 결합 비율/blank validation 코드 반영을 확인했다.
- Production Calculator QA PASS: default `22.22`; fee 60% + margin 40%와 blank fee는 결과 `—`, detail 초기화, 명확한 오류 메시지. `NaN`/`Infinity`/`∞`/음수 판매가격 없음.
- Production page QA PASS: title, H1 1개, canonical, GA4 loader/config, CSS, mobile menu, horizontal overflow, console error 0건. 1440 / 1280 / 1024 / 768 / 390에서 form/result clipping 없음; 390px 새 URL 진입에서 sticky header/H1 overlap 없음.
- 최종 공개 페이지 **74**, calculator **37**, 신규 페이지/cluster 없음. Homepage와 사용자 관리 directory badge 영역은 변경하지 않았다.
- 최종 commit: 이 Production closeout handover commit.

## 2026-08-13 — Calculator print-record audit and implementation

- Start commit: `ade2ceae2a9929d557e2deb68abf47cb4b6bacb6`. `main`, `origin/main`, and `refs/heads/main` matched before work; the working tree was clean and the fast-forward pull reported no remote changes.
- Print audit scope: **37 calculator pages**. Each uses the shared `site.js` Print control and the shared `site.css` print rules. The previous implementation printed native input controls, retained too much surrounding UI, and had only minimal layout/break handling. No calculator-specific print override was required.
- Common implementation: `site.js` now creates one screen-hidden calculation record inside each calculator result panel. It reads live input, select, checkbox, and radio values at initialization, reset, `beforeprint`, and Print-click time; the record includes the calculator title, optional lede, compact label/value input summary, existing result, and existing breakdown. The interactive screen form and JavaScript-off fallback remain intact.
- Print layout: A4 portrait `@page` rule; white background, dark text, no shadows, compact two-column input summary, and print-only hierarchy. Navigation, mobile controls, raw form controls, Calculate/Reset/Copy/Print buttons, header/footer, breadcrumbs, and secondary content are hidden only when the print record is ready. The result panel, input summary, rows, and result details use `break-inside` / `page-break-inside` avoidance so inputs and result remain together whenever their combined height fits.
- Static/automated print QA: `scripts/print-qa.mjs` checks all **37/37** calculator pages for the shared form/result/Print/runtime contract plus the common print CSS and JS contract. PASS. Browser structure QA on all **37/37** local calculator pages confirmed one ready print record, one summary row per printable input, a nonempty finite default result, Print control, and no horizontal overflow. PASS.
- Representative Chromium Print actions: 3D Print Cost, Selling Price, Model Scale, Resin Cost, Printer Utilization, Belt Steps/mm, and Filament Length ↔ Weight. The print action refreshed the live record; a changed 3D Print Cost filament value of `200` printed as `Filament used (g): 200` with recalculated result `11.49`. Select summaries retain selected visible unit/material text (for example `1.75 mm` and `PLA — 1.24`). No QA PDF artifact was added to the repository.
- Screen regression QA: Homepage, Tools hub, filament, cost, print-settings, resin, production, motion, and About at **1440 / 1280 / 1024 / 768 / 390 px** (45 checks). PASS: no horizontal overflow, brand overflow, header/H1 overlap, or calculator form/result collapse. A 390px visual check of the 3D Print Cost page passed.
- Full quality gate: `node --check assets/js/site.js`, `print-qa`, `calculator-qa`, `production-planning-qa`, `motion-mechanics-qa`, `qa`, and `content-qa` all PASS. Final static inventory remains **74 public HTML pages**, **74 canonical URLs**, **74 sitemap URLs**, and **37 calculators**. Internal links, orphan reachability, duplicate IDs, H1 count, robots, GA4 coverage/duplication, sitemap parity, calculator validation, and finite result checks PASS.
- User-managed homepage directory badge/link source, including KittyLaunch, LaunchBuff, BoostDomainRating, and existing badges, was not edited.
- Changed files: `assets/css/site.css`, `assets/js/site.js`, and `scripts/print-qa.mjs` only, plus this handover record. No API, database, screen-design rewrite, calculator logic rewrite, or user-managed badge change.
- Implementation commit: `b9cc9117b697ef80853bdb87f3c7b5f34cb67acc` (`Build shared calculator print records`).
- Final closeout commit: this handover update; verify local and remote `main` match after push.
- Current status: print records are complete for the existing 37-calculator surface. Next priority remains Search Console/sitemap indexing confirmation and user-feedback-driven improvements; do not expand the calculator cluster without evidence of a real gap.

## 2026-08-13 — Calculator print deployment verification

- GitHub Pages workflow `31678261012` (`pages build and deployment`) completed successfully for `62077c08c8dcf18300f961c30803d591257ab6fc`.
- Public production assets returned HTTP 200 and contain the deployed common implementation: `/assets/js/site.js` contains `function addPrintRecord(form)` and `/assets/css/site.css` contains the `print-record-ready` print rules. The deployed calculator HTML had `Last-Modified: Thu, 13 Aug 2026 07:34:14 GMT`.
- The in-app browser retained a previously cached production `site.js`, so its existing public tab continued to show the old page runtime after deploy. Local Chromium Print actions and all-calculator browser QA were completed against the exact committed static files; direct public asset verification confirms the new runtime and CSS are on production. No source, badge, calculator logic, or public-page inventory change was made after the implementation commit.

## 2026-08-13 — New workflow cluster research: NO-GO

- Start commit: `664bf50910561c34c23eca350c3a804e4f2cf3cf`. Local `main`, `origin/main`, and remote `refs/heads/main` matched after a clean fast-forward update. Current inventory remains **74 public HTML pages**, **37 calculators**, and Workbench categories **01–07**.
- Scope discipline: this search did not reopen bed mesh/first layer, fit/tolerance/clearance, fasteners, extrusion/flow/pressure advance/retraction, thermal/PSU/power, dry-box/desiccant, photogrammetry/3D scanning, printed gears, or any implemented Cost, Filament, Print Settings, Geometry, Resin, Production Planning, or Motion Mechanics variation. Search-volume numbers were not invented; decisions use observable queries, community questions, tool-shaped results, and actual competing products.
- **Printer maintenance operations — REJECT.** Demand and tool intent are real: users repeatedly ask for hour-based service schedules, logs, and reminders. It is a distinct workshop workflow, but the useful product is persistent and telemetry-driven rather than a set of four independent one-shot static tools. Printago, SimplyPrint, Extrudix, Gyroid, Spoolr, and 3D Print Log already track hours/jobs, recurring tasks, history, and reminders. Manufacturer-specific service intervals also weaken accuracy and raise ongoing data maintenance. Gates **A/B/D/I pass; C/E/F/G/H fail**. Evidence: https://docs.printago.io/docs/printing/maintenance-tracker, https://simplyprint.io/features/printer-maintenance, https://www.extrudix.com/, https://www.reddit.com/r/BambuLab/comments/14n0skp/hoursbased_maintenance_schedule/
- **Small-batch quality inspection and traceability — REJECT.** Industrial additive workflows clearly use first-article and dimensional reports, and FAI/Cp-Cpk/AQL/job-traveler tools can look like a four-tool cluster. However, free general-manufacturing tools already provide each high-value interaction, including FAI report generation, raw-data process capability, and standards-table sampling. The core dimensional/tolerance branch is also explicitly outside this cycle, while standards interpretation, sampling assumptions, and revision tracking create accuracy and maintenance burdens for a hobby/maker-focused static site. Gates **A/B/D/E/G pass; C/F/H/I fail**. Evidence: https://www.protolabs.com/inspection-reports/, https://www.rivcut.com/resources/fai-checklist-generator, https://spceasy.com/, https://tetrainspection.com/aql-calculator/
- **Post-processing and finishing planning — REJECT.** Sanding, filling, priming, painting, and cure-time questions recur and form a distinct post-print workflow. Tool intent is weaker than guide intent, an exact post-processing time calculator already exists, and a natural four-tool set collapses into user-estimated time/coverage/coat conversions. Shape, starting surface, technique, product coverage, ambient conditions, and desired finish dominate the result, so a deterministic static tool would overstate accuracy. Gates **A/D/G/I pass; B/C/E/F/H fail**. Evidence: https://3dprintcalcs.uk/cost-and-time/post-processing-time-calculator/, https://3dcentral.ca/art-3d-print-post-processing-sanding-painting-finishing/, https://www.reddit.com/r/3Dprinting/comments/u3d4ov/zero_experience_need_help_with_choosing_tools_and/
- **Packaging and shipping for printed products — REJECT.** Sellers do ask about box choice, quantity packing, dimensional weight, and packaging consumption, so demand, tool intent, distinctness, and nominal four-tool depth exist. The SERP is already crowded with polished free box finders, 3D packing, DIM-weight, and packaging-quantity tools serving the same seller job. Carrier divisors/rules change, damage protection is product-specific, exact multi-item packing is materially more complex than a simple calculator, and the workflow is generic e-commerce rather than a strong MakerPrintTools fit. Gates **A/B/D/E/G pass; C/F/H/I fail**. Evidence: https://packagingvista.com/box-size-calculator, https://packrift.com/pages/tools, https://whatboxsize.com/, https://boxvolume.com/en
- Broad-screened but not shortlisted: **printed-master mold/casting planning** has exact silicone-volume and STL-to-mold competitors (https://moldstudio3d.com/tools/silicone-mold-calculator/, https://splicestl.com/mold/) and its apparent tool depth is mostly repeated volume/mix-ratio arithmetic; **failed-print diagnostics** has strong demand but is crowded by deterministic and photo/AI tools (https://moosepunch.com/fixmyprint, https://www.dx3d.app/, https://printara3d.com/tools/) and would substantially reopen excluded first-layer/calibration/retraction topics.
- **NEW WORKFLOW CLUSTER: NO-GO — 강한 비중복 workflow 없음.** No candidate passed all HARD GATE A–I. The decision is based on concrete competition and implementation constraints, not lack of ideas. Revisit only when Search Console or repeated direct user requests identify one narrow workflow where existing free tools demonstrably fail and four independent, accurate, maintenance-light static tools can be defined.
- Product files, HTML/CSS/JS, sitemap, llms.txt, calculator logic, common Print runtime, and the user-managed homepage KittyLaunch/LaunchBuff/BoostDomainRating/other directory badge area were not changed. Public inventory remains **74 pages / 37 calculators**. This handover-only record is the sole repository change.

## 2026-08-20 — New workflow cluster research: NO-GO

- Start commit: `ce9ee3b2a7eb3d08a5a6d2da4caa85bd7a950440`. A clean working tree was fast-forwarded from `origin/main`; local `main`, `origin/main`, and remote `refs/heads/main` matched before research. Recounted inventory: **74 public HTML pages**, **37 calculators**, and Workbench categories **01–07**.
- Existing-workflow map: material/filament use; cost/pricing; slicer settings; scale/build geometry; resin use; print-farm capacity/queue/throughput; and printer motion mechanics. The excluded bed-mesh, fit/tolerance/fastener, extrusion calibration, thermal/power, dry-box, scanning, gear, maintenance, quality/traceability, finishing, packaging, mold/casting, and failed-print-diagnostic families were not reopened.

### New shortlist comparison

- **Local model-file preflight and repair — REJECT.** Demand and repeated tool intent are strong (`STL checker`, `manifold checker`, `STL repair`, `will this STL print`). A natural product would combine bounding-box/unit inspection, manifold/normal checks, wall/overhang checks, repair, and estimates; splitting those into four URLs would be artificial because they rely on one uploaded-model analysis report. Direct free, in-browser competitors already cover the full combined workflow: STLRepair reports mesh issue families and repair preview; 3Dash combines mesh health, walls, overhangs, orientation, repair, weight, cost, and time; iamRapid and 3DPrintMetric cover repair and preflight. This also reopens geometry/material/cost outputs that MakerPrintTools already provides as user-input tools. Gates **A/B/G/H/I pass; C/D/E/F fail**. Evidence: https://stlrepair.app/, https://3dash.in/tools/print-check, https://iamrapid.com/tools/repair-3d-file/, https://3dprintmetric.com/stl-checker/
- **Print orientation and support decision workflow — REJECT.** Community questions and search variations (`best STL orientation`, `support calculator`, `overhang analyzer`) confirm repeat demand. However, a credible recommendation must parse a model and score many orientations, then remains a slicer/process-dependent heuristic. iamRapid already does local STL overhang mapping, candidate orientation comparison, support-volume estimates, build height, and a recommended orientation; Print Doctor checks walls/overhangs against user printer limits; current slicers provide the final support/orientation validation. Independent URLs would collapse into one geometry engine, while part strength/surface-finish trade-offs cannot be safely reduced to a deterministic universal score. Gates **A/B/G/H/I pass; C/D/E/F fail**. Evidence: https://iamrapid.com/tools/support-estimator-overhang-analyzer/, https://3d-lithophane.com/print-doctor.php, https://www.reddit.com/r/3Dprinting/comments/1u9ct0f/whats_the_best_orientation_for_this_print/
- **Modular workshop-storage / Gridfinity planning — REJECT.** The drawer-layout workflow has very strong repeat use and clear queries (`Gridfinity layout planner`, `drawer organizer calculator`, `baseplate generator`); likely independent functions are layout, bin design, baseplate splitting, print list, and labels. The exact free workflow is already served by Gridfinity Layout Tool, GridfinityStudio, Binforge, MakerX, and several open-source planners, including layout, baseplate generation, bin design, printing estimates, exports, and local persistence. It also depends on a branded ecosystem and broader organizer CAD workflow rather than a distinct 3D-print decision gap. Gates **A/B/D/G/H pass; C/E/F/I fail**. Evidence: https://github.com/andymai/gridfinity-layout-tool, https://gridfinitystudio.com/, https://binforge.app/, https://makerxdesigns.com/utilities/gridfinity-planner.html
- **Multi-part print-project record / BOM workflow — REJECT.** A project-level part list, print checklist, and consolidated cost/time summary has recognizable demand (`3D printing project planner`, `print checklist`, `multi-part print cost`). The highest-value product is persistent: versioned parts, material inventory, settings history, task state, links, purchases, and repeat project templates. Tooolshed already provides maker project parts, cost, task, order, and template tracking; a dedicated 3D Printing Project Planner already aggregates multi-part weight, cost, time, and failure allowance. A static one-session output would overlap existing material/cost/production calculators and degrade into a generic form/checklist. Gates **A/D/G/H/I pass; B/C/E/F fail**. Evidence: https://tooolshed.com/, https://completecalculators.com/calculators/3d-printing/3d-printing-project-planner-calculator, https://www.etsy.com/listing/4416272218/3d-printing-project-planner-pdf-3-page

- **NEW WORKFLOW CLUSTER: NO-GO — 강한 신규 workflow 없음.** Every new family has observable demand, but none passes all HARD GATE A–I: either an exact complete free competitor already covers the workflow, a useful result requires one shared parser rather than four independent tools, or persistence/model-specific judgement is the real product. No candidate is strong enough to justify an eighth Workbench category.
- Product HTML/CSS/JS, calculators, sitemap, llms.txt, shared Print runtime, and the homepage/user-managed KittyLaunch, LaunchBuff, BoostDomainRating, and other directory badge area remain untouched. Public inventory remains **74 pages / 37 calculators**. This research record is the only intended change.

## 2026-08-20 — Line Width Calculator opportunity upgrade

- Start commit: `d5946c817f8708c67523eb4753abd5038f01ed17`. The clean repository was fast-forwarded to the remote source of truth; local `main`, `origin/main`, and remote `refs/heads/main` matched before implementation. Recounted inventory: **74 public HTML pages**, **37 calculators**, **74 canonical URLs**, **74 sitemap URLs**, and Workbench categories **01–07**.
- Search/traffic evidence: no GSC, GA4, Bing, CSV, spreadsheet, or other analytics export exists in the repository or current session, so no new metrics were invented. The decision used the latest supplied reference signal—Line Width about **99 impressions / average position 30.6**—only as a candidate selector, then required a reproducible Production and SERP gap before editing.
- Candidate comparison: **Line Width — DO NOW** because the live page calculated a number but linked to unrelated Cost and Model Scale pages instead of the immediate wall and flow decisions exposed by current search intent. **Required Printer Count — HOLD** because its small reference sample already lands on a complete page with formula, interpretation, worked example, limitations, and workflow links. **Printer Utilization — HOLD** because roughly eight reference impressions are too small and no page defect was found. **Timing Belt Length — HOLD** because it is a recent discovery-stage page with complete method and limitations. **Print Time Estimator — HOLD** because content is comparatively thin but no current page/query export establishes that it should outrank Line Width work.
- SERP/intent comparison: current results commonly connect line/extrusion width to nozzle ratio, wall/perimeter planning, and volumetric flow. MakerPrintTools already owns the matching Wall Thickness and Volumetric Flow tools and guides, but the Line Width result did not lead users into them. Evidence: https://covertitall.com/converters/extrusion-width-calculator.html, https://superglobalcalculator.com/calculators/3d-printing/line-width/, https://www.gamebob.dev/en/utilities/categories/3d-printing/wall-perimeter-optimizer/, https://help.prusa3d.com/article/creating-profiles-for-different-nozzles_127540
- Selected upgrade: preserve the URL, title, H1, meta description, canonical, formula, defaults, and calculation logic. Clarify that line width is also called extrusion width; explain feature-specific slicer widths; make the result actionable through Wall Thickness and Volumetric Flow next steps; add a worked example, assumptions, adaptive-width/gap-fill limitation, and five directly related Tool/Guide links. Remove the unrelated Cost and Model Scale result links.
- Tool UX: add one `line-width`-scoped Reset control through the existing shared runtime. It is created only when `data-calculator="line-width"` is present and no reset control exists; other calculators receive no new DOM or behavior. Reset restores 0.4 mm / 112% / 3 walls and recalculates `0.448 mm`. The common Print record continues to exclude reset controls from its input summary.
- Functional QA PASS: default `0.448 mm`; changed 0.4 mm / 125% / four walls = `0.5 mm` and `2 mm`; Reset restores defaults; blank, invalid text, zero, and 201% clear the previous result and show validation; no `NaN`, `Infinity`, or stale result.
- Browser QA PASS: changed page at **1440 / 1280 / 1024 / 768 / 390** with no horizontal overflow, clipped controls/links, header/H1 overlap at page top, hidden Print record leakage, asset error, or console error. Keyboard focus on Reset is visible; the Wall Thickness link navigates to the intended calculator. A stale localhost-origin CSS cache was isolated by testing the exact committed files on a fresh local origin rather than changing product code.
- Regression QA PASS: Homepage, Tools hub, Guides hub, Reference hub, Line Width, 3D Print Cost, Printer Utilization, and Belt Steps/mm at 1440 and 390. Canonical, H1, CSS, default calculator results, mobile layout, and console state remain normal. Automated `node --check`, static QA, content reachability, calculator QA, six Production Planning calculators, five Motion calculators, and **37/37** shared Print contracts PASS.
- Production QA PASS: GitHub Pages workflow `32368848481` completed successfully for implementation commit `4df0bde50fc9c8412b78c390b853960b90097dee`. Public HTML and `site.js` return HTTP 200 and contain the new guidance, workflow links, and scoped Reset runtime. Public default/change/Reset behavior, title, H1, canonical, CSS, 1440/390 overflow and overlap, and console error state PASS. Canonical and URL are unchanged.
- Changed product files: `tools/print-settings/line-width-calculator/index.html` and `assets/js/site.js`. Implementation commit: `4df0bde50fc9c8412b78c390b853960b90097dee` (`Improve line width result guidance`). Final public inventory remains **74 pages / 37 calculators**.
- Homepage source and the user-managed KittyLaunch, LaunchBuff, BoostDomainRating, Sell With Boost, Twelve Tools, Findly, and other directory badge/link area were not edited, moved, reordered, restyled, or refactored. Final commit: this handover closeout commit. Immediate next work: **observe** updated GSC query/page data before changing another existing page.
