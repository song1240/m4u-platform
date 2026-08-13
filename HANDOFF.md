# HANDOFF.md — 세션 인수인계

> 마지막 갱신: 2026-08-12 (저장소 초기 구성)

## 현재 상태

- `src/master-ui/` = **공식 디자인 기준** (MASTER UI 5화면: Home/Living/Habit/Salon/MY — Forest·Ivory·Champagne Gold, DM Serif). 라우팅 기본값.
- `src/App.jsx` = 프로토타입 v10 (약 2,880줄, 단일 파일, **이전 디자인 — 기능 참조용**, `/#legacy`). 기능 완결 상태:
  - 온보딩(언어 → 소개 → MY ZONE 선택) → 5탭(홈/Living/Habit/Salon/MY)
  - 지갑 서브 화면(HRP·CP·FIVE 공동구매·쿠폰·CP 가중 투표)
  - 파트너 모드(역할 선택 → AI 구조화 등록 → 심사 → MY BUSINESS: 카트/살롱/HOST)
  - 한/베 완전 이중언어 (`L(lang, ko, vi)` 헬퍼)
- `src/admin/Admin.jsx` = 본사 Admin Web (승인 큐·Zone·리뷰/랭킹·정산+Host 보상·HRP 발행·분쟁, OPS/SUPER 권한)
- `npm run verify` 동작 확인 완료 (빌드 + 미번역 + 금지어 스캔)

## NEXT (우선순위 순)

1. **H06** — v10 기능의 마스터 UI 이식 (`docs/HARNESS/H06-design-migration.md`) — H01(모듈 분리)을 흡수하며 진행. **⑦ MY+파트너 이식 시 CONTRIBUTOR CENTER(H07) 포함**
2. H02~H04 — 이식 완료 화면별 회귀 확인 (수용 기준 재사용)

## BLOCKED

(없음)

## 메모

- 모든 수치(HRP 적립량·CP·수수료 8%·Host 보상 2%·Contributor 기여 지표·90일 시효 등)는 데모 자리표시자. 단위 경제 검증 전 변경 금지.
- 이미지가 Unsplash 임시 소스 — 실서비스 전 매장별 실사 촬영 필요 (docs/DESIGN_SYSTEM.md 참고).
