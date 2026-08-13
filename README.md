# M4U Platform — 내 생활이 혜택이 되는 곳

베트남 **빈홈 그랜드 파크(Vinhomes Grand Park)** 에서 시작하는 생활권(Zone) 기반
로컬 생활 플랫폼의 프로토타입 저장소입니다.

> **M4U** — A zone-based local living platform starting from Vinhomes Grand Park, Vietnam.
> Consumers earn HRP (HARU REWARD POINT) from daily life; anyone can become a partner
> (local business / salon / mobility / **host**) through AI-powered registration.

## 구성

| 경로 | 설명 |
|---|---|
| `src/master-ui/` | **공식 디자인 기준** — MASTER UI 5화면 (기본 화면 `/`) |
| `src/App.jsx` | v10 기능 프로토타입 — 기능 참조용, `/#legacy` 로 접속 (이전 디자인) |
| `src/admin/Admin.jsx` | 본사 운영자 Admin Web — `/#admin` 으로 접속 |
| `src/tokens/design-tokens.js` | 디자인 토큰 (컬러·타이포·간격) |
| `docs/DESIGN_SYSTEM.md` | 디자인 시스템 문서 |
| `docs/POLICY.md` | 확정 제품 정책 (Consumer First Ranking, HRP/CP, Host 보상 원칙 등) |
| `docs/HARNESS/` | 모듈별 하네스 — **모든 개발 작업의 단위** |
| `CLAUDE.md` | Claude Code용 프로젝트 헌법 (작업 규칙·루프 엔지니어링) |
| `HANDOFF.md` | 세션 간 인수인계 (현재 상태 · 다음 태스크) |
| `CR_LOG.md` | 변경 기록 |

## 실행

### 로컬
```bash
npm install
npm run dev        # http://localhost:5173  (v10 참조: /#legacy · Admin: /#admin)
npm run verify     # 빌드 + 미번역 + 금지어 점검 — 커밋 전 필수
```

### Replit
1. Replit → **Create Repl → Import from GitHub** → 이 저장소 선택
2. Import 완료 후 **Run** — 자동으로 `npm run dev` 실행
3. 프리뷰 URL: 기본=마스터 UI · `#legacy`=v10 기능 프로토타입 · `#admin`=Admin Web

## 개발 규칙 (요약 — 상세는 CLAUDE.md)

1. 작업은 반드시 `docs/HARNESS/` 의 하네스 단위로 진행합니다. 하네스 없는 대규모 변경 금지.
2. **루프 엔지니어링**: THINK → PLAN → TEST → CODE → VERIFY. 같은 에러 2회 반복 시 중단하고 `HANDOFF.md`의 BLOCKED에 기록.
3. 사용자 노출 문자열은 전부 `L(lang, ko, vi)` 헬퍼를 거칩니다 (한/베 이중언어).
4. 커밋 전 `npm run verify` 통과 필수. 커밋 메시지는 `[Hxx] 요약` 형식.
5. `docs/POLICY.md` 의 정책(랭킹·HRP/CP·Host 원칙·표현 규칙)은 코드로 변경할 수 없습니다.

## Claude Code 연계

이 저장소는 [Claude Code](https://claude.com/claude-code)로 개발하도록 구성되어 있습니다.
저장소 루트에서 Claude Code를 실행하면 `CLAUDE.md`를 자동으로 읽습니다.

```bash
cd m4u-platform
claude
# 첫 지시 예: "HANDOFF.md를 읽고 NEXT 태스크(H01)를 루프 엔지니어링으로 진행해줘"
```

## 외부 개발자 안내

- 이 저장소는 **Private** 이며 초대된 Collaborator만 접근합니다.
- 모든 수치(포인트 적립량·수수료율·보상률)는 데모용 자리표시자입니다.
- 라이선스: 열람·협업 목적 한정 (LICENSE 참조).

## 실서비스 로드맵

현 저장소는 React(Vite) 프로토타입이며 제품 사양의 단일 기준입니다.
실서비스 스택: **Expo React Native + Supabase + Drizzle + n8n** (이관 시 본 저장소의 하네스·정책 문서를 그대로 사용).
