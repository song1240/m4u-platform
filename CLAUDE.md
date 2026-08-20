# CLAUDE.md — M4U Platform 프로젝트 헌법

> Claude Code는 모든 세션 시작 시 이 파일과 `HANDOFF.md`를 먼저 읽는다.
> 이 파일의 정책은 코드보다 우선한다. 정책과 코드가 다르면 코드가 틀린 것이다.

## 1. 프로젝트 개요

M4U — "내 생활이 혜택이 되는 곳". 베트남 빈홈 그랜드 파크(Vinhomes Grand Park)에서
시작하는 생활권(Zone) 기반 로컬 생활 플랫폼.

- 소비자 루프: 생활(Living) → 습관(Habit) → 뷰티(Salon) → 이용/결제 → Verified Review → HRP → 재이용
- 공급자 루프: AI 대화 등록 → MY BUSINESS 운영 → 소비자 평가 → Consumer First 성장
- 역할: 소비자 / 파트너(로컬·SALON·MOBILITY·HOST) / 본사 Admin(별도 웹)

## 2. 코드 위치

| 경로 | 내용 |
|---|---|
| `src/master-ui/` | **공식 디자인 기준** — MASTER UI 5화면 + style.css (라우팅 기본 `/`) |
| `src/App.jsx` | v10 기능 프로토타입 (이전 디자인 — 기능 참조용, `/#legacy`) |
| `src/admin/Admin.jsx` | 본사 Admin Web (한국어 전용, 내부 직원용) |
| `src/tokens/design-tokens.js` | 디자인 토큰 (docs/DESIGN_SYSTEM.md와 동기 유지) |
| `docs/HARNESS/` | 모듈별 하네스 — 작업은 반드시 하네스 단위로 진행 |

실서비스 목표 스택: Expo React Native + Supabase + Drizzle + n8n.
**Supabase는 베트남 국내 클라우드에 자체 호스팅한다** (2026-08-20 대표 결정) — 개인정보 원본을
국내에 두기 위함이며, Supabase 호스팅에는 베트남 리전이 없다(전 리전 AWS 기반 · 최근접 싱가포르).
남은 쟁점은 `docs/LEGAL_REVIEW_REQUEST.md` Q2 참조.
현 저장소는 React(Vite) 프로토타입이며, RN 이관 전까지 제품 사양의 단일 기준(source of truth)이다.

## 3. 절대 규칙 (위반 금지)

1. **표기**: HRP의 정식 명칭은 **HARU REWARD POINT**. 단지명은 **빈홈 그랜드 파크 / Vinhomes Grand Park**.
2. **금지 표현**: "피부 진단" 등 의료성 표현 금지 → "피부 분석 / 뷰티 프로필". 사용자 노출 문구에 "코인/토큰" 금지(내부 문서의 Web3 전환 계획 서술은 예외).
3. **Consumer First Ranking**: 순위 계산에 광고비·플랫폼 납부액을 절대 반영하지 않는다.
4. **CP**: 양도·구매·수동 발행 불가. 검증 가능한 활동에만 규칙 기반 자동 적립.
5. **Host 보상**: 1단계 추천 보상만 허용(다단계 구조 금지). 귀속은 체크인~체크아웃, Host 본인 결제 제외. Host에게 투숙객 개별 결제 내역 비노출(집계만).
6. **이중언어**: 사용자 노출 문자열은 반드시 `L(lang, ko, vi)` 또는 데이터의 ko/vi 필드를 거친다. 하드코딩 한국어 커밋 금지 (`npm run verify`가 잡는다).
7. **디자인**: 모든 신규 화면은 `src/master-ui/`의 컴포넌트·CSS 클래스를 재사용한다. 독자 재디자인·신규 인라인 스타일·색상 하드코딩 금지 (docs/DESIGN_SYSTEM.md). v10의 인라인 스타일 복사 금지 — 기능만 가져온다.
8. 위 정책의 변경은 코드로 하지 않는다 — `docs/POLICY.md` 개정(대표 승인) 후에만 가능.

## 4. 루프 엔지니어링 (작업 방법론)

모든 작업은 다음 5단계 루프로 진행한다:

```
THINK  → 하네스의 목표·수용 기준을 읽고 접근 방식을 먼저 서술
PLAN   → 수정할 파일·순서·리스크를 나열 (3줄 이상이면 HANDOFF.md에 기록)
TEST   → 수용 기준을 검증 가능한 형태로 확인 (무엇이 통과 조건인가)
CODE   → 최소 단위로 구현 (한 커밋 = 한 하네스 항목)
VERIFY → `npm run verify` 실행 → 실패 시 수정 → 재실행
```

**중단 원칙**: 같은 에러가 2회 반복되면 즉시 중단하고, 원인 가설과 시도 내역을
`HANDOFF.md`의 `## BLOCKED` 섹션에 기록한 뒤 사람의 판단을 기다린다. 3회째 시도 금지.

## 5. 세션 절차

1. `CLAUDE.md`(본 파일) → `HANDOFF.md` 순서로 읽는다.
2. `HANDOFF.md`의 `NEXT`에 지정된 하네스(`docs/HARNESS/Hxx-*.md`)를 연다.
3. 루프 엔지니어링 5단계로 작업한다.
4. 완료 시: `npm run verify` 통과 확인 → `CR_LOG.md`에 변경 기록 추가 → `HANDOFF.md`의 상태·NEXT 갱신 → 커밋.
5. 커밋 메시지: `[Hxx] 요약 (한국어)` 형식. 예: `[H01] App.jsx를 data/i18n/components로 분리`

## 6. 하지 말 것

- 하네스 없는 대규모 리팩터링
- verify 실패 상태로 커밋
- 데모 수치(HRP·CP·보상률·수수료)를 임의로 "현실화" — 전부 자리표시자이며 단위 경제 검증 후 확정
- 새 외부 의존성 추가(react / react-dom / lucide-react / vite 외) — 필요 시 HANDOFF에 제안만
- `docs/POLICY.md` 미개정 상태에서 정책 관련 문구·로직 변경
