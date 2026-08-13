# HANDOFF.md — 세션 인수인계

> 마지막 갱신: 2026-08-13 (H06-① 온보딩 3화면 이식)

## 현재 상태

- `src/master-ui/` = **공식 디자인 기준** (MASTER UI 5화면: Home/Living/Habit/Salon/MY — Forest·Ivory·Champagne Gold, DM Serif). 라우팅 기본값.
  - **온보딩 3화면 이식 완료 (H06-①)**: 언어 선택 → 소개 → MY ZONE 선택 → 5탭 진입.
    선택한 언어(`lang`)·생활권(`zoneIdx`)이 App 상태로 올라가 Home/Living의 Zone pill에 반영된다.
  - 모듈 구조로 분리 (H01 흡수): `i18n.js`(L·zoneName) / `data.js`(ZONES·LANGS) /
    `components.jsx`(Card·Btn·Head·Zone·Tile) / `screens/Onboarding.jsx` / `MasterUI.jsx`(5화면+라우팅)
  - 신규 CSS 패턴: 온보딩 다크 캔버스 — DESIGN_SYSTEM §4.1에 정의 후 style.css에 추가 (인라인 스타일 0건)
- `src/App.jsx` = 프로토타입 v10 (약 2,880줄, 단일 파일, **이전 디자인 — 기능 참조용**, `/#legacy`). 기능 완결 상태:
  - 온보딩(언어 → 소개 → MY ZONE 선택) → 5탭(홈/Living/Habit/Salon/MY)
  - 지갑 서브 화면(HRP·CP·FIVE 공동구매·쿠폰·CP 가중 투표)
  - 파트너 모드(역할 선택 → AI 구조화 등록 → 심사 → MY BUSINESS: 카트/살롱/HOST)
  - 한/베 완전 이중언어 (`L(lang, ko, vi)` 헬퍼)
- `src/admin/Admin.jsx` = 본사 Admin Web (승인 큐·Zone·리뷰/랭킹·정산+Host 보상·HRP 발행·분쟁, OPS/SUPER 권한)
- `npm run verify` PASS (I18N 경고 7건은 모두 레거시 `src/App.jsx` — 신규 master-ui 파일 0건)

## NEXT (우선순위 순)

1. **H06-②** — 홈 (마스터 Home에 v10 기능 연결: 카드→지갑/습관/살롱 이동, 실데이터 상태 + `L()` 적용)
   이후 ③Living → ④Habit → ⑤Salon → ⑥지갑 → ⑦MY+파트너(CONTRIBUTOR CENTER 포함) 순서 유지
2. 화면 이식이 끝날 때마다 `scripts/verify.mjs`의 I18N 예외에서 해당 파일 제거
   (현재 남은 예외: `src/master-ui/MasterUI.jsx` — 5개 마스터 화면이 아직 한국어 하드코딩)
3. H02~H04 — 이식 완료 화면별 회귀 확인 (수용 기준 재사용)

## BLOCKED

(없음)

## 메모

- 모든 수치(HRP 적립량·CP·수수료 8%·Host 보상 2%·Contributor 기여 지표·90일 시효 등)는 데모 자리표시자. 단위 경제 검증 전 변경 금지.
- 이미지가 Unsplash 임시 소스 — 실서비스 전 매장별 실사 촬영 필요 (docs/DESIGN_SYSTEM.md 참고).
- **verify의 한계**: 빌드 검증이 lucide-react를 external로 두기 때문에 존재하지 않는 아이콘명을 잡지 못한다
  (실제로 `House`가 lucide-react 0.383에 없어 마스터 UI가 Vite 빌드 실패 상태였고, 이번에 `Building2`로 수정).
  아이콘을 새로 쓸 때는 `npm run build`까지 함께 돌릴 것.
- 온보딩은 매 실행 시 처음부터 시작한다(v10과 동일, 세션 저장 없음). 로그인/약관 동의는 미구현 —
  소개 화면의 "시작하기 / 먼저 둘러보기"는 둘 다 MY ZONE 선택으로 이동한다(추후 인증 붙일 지점).
- `package-lock.json`은 이번 세션의 `npm install`로 생성됨 — 커밋 여부는 대표 판단 대기(현재 미추적).
