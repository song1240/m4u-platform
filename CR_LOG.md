# CR_LOG.md — 변경 기록

형식: `날짜 | 하네스 | 변경 요약 | verify`

| 날짜 | 하네스 | 변경 요약 | verify |
|---|---|---|---|
| 2026-08-12 | INIT | 저장소 초기 구성 — v10 앱 + Admin Web + 하네스/정책/디자인 시스템 문서 + verify 스크립트 | PASS |
| 2026-08-12 | INIT-2 | 마스터 UI 통합 — src/master-ui(공식 디자인 기준) 추가, 라우팅 개편(/ 마스터 · #legacy v10 · #admin), 디자인 토큰·DESIGN_SYSTEM.md 개정, H06 이식 하네스 추가 | PASS |
| 2026-08-12 | H07 | Contributor Center 추가 — MY BUSINESS 공통 섹션(Score·퍼널·QR 타입·AI Insight·원칙 문구), Admin 정산 ①Transaction/②Ecosystem 분리, POLICY §10 신설 | PASS |
| 2026-08-13 | H06-① | 온보딩 3화면 이식(언어 → 소개 → MY ZONE) — 다크 캔버스 패턴 신설(DESIGN_SYSTEM §4.1 + style.css), 모듈 분리(i18n/data/components/screens, H01 흡수), 선택한 언어·생활권을 5탭에 연결, verify i18n 예외 축소(master-ui → MasterUI.jsx만) | PASS |
| 2026-08-13 | FIX | lucide-react 0.383에 없는 `House` 아이콘 → `Building2` (마스터 UI가 Vite 빌드 실패 상태였음), `button{font-family:inherit}` 추가(버튼이 Inter 미적용이던 문제) | PASS |
| 2026-08-13 | UX점검 | 실행 기반 전 화면 점검 — 5탭 65개 중 40개 무반응·베트남어 미적용 등 P0/P1/P2 12건 기록, 3커밋 계획 승인 | PASS |
| 2026-08-13 | H06 | 5화면 모듈 분리(screens/) + 전면 이중언어 — vi 선택 시 한글 0자, html lang 동기화, verify i18n 예외 완전 제거 | PASS |
| 2026-08-13 | H06-② | 홈 기능 이식 — 타일·카드 실제 탭 이동 연결(무반응 8→1), Card onClick(button.card) 패턴 추가 | PASS |
| 2026-08-13 | UX | 온보딩 완결 — MY에서 언어·MY ZONE 재설정, localStorage 복원, 뒤로가기 연동, CTA 44px·dvh·데스크톱 스크롤 제거 | PASS |
| 2026-08-13 | UI | 홈 리디자인 — 프로덕션 홈 패턴(§4.2): 앱바+실사 8곳+밀도 리듬, 한글 세리프 폴백(Noto Serif KR), 6관점 멀티에이전트 비평 반영. 이동 흐름·타 화면 무변경 | PASS |
| 2026-08-13 | H06-③ | Living 이식 — 6카테고리·Consumer First 랭킹·매장 상세(3탭)·예약 플로우(칩→시트→완료 적립). §4.3 패턴 신설, 서브화면 라우팅·토스트·HRP 적립 배선. 부스트 위치를 POLICY §1대로 2번째로 교정 | PASS |
| 2026-08-13 | H06-④ | Habit 이식 — 5습관 실동작(걷기 검증형 +HRP/+CP, 셀프 4종), 주간 리포트, 주변 명상 장소 3곳 예약 연결. §4.4 패턴 신설. **셀프 일일 상한 15 HRP를 코드로 강제**(v10은 문구만·실제 20 지급) | PASS |
| 2026-08-13 | H06-⑤ | Salon 이식 — 4서비스 퀵 예약, 뷰티 프로필 3문항 설문(응답별 결과 분기)·추천, Verified Review 목록. §4.5 패턴 신설. 의료 고지 상시 노출, verify 금지어 스캔이 주석의 금지 표현까지 차단 | PASS |
| 2026-08-13 | H06-⑥ | 지갑 이식 — HRP/CP 분리 자산 카드·적립 내역(HRP/CP 탭)·CP 적립 규칙, FIVE 3방(정책 수치 그대로)·쿠폰함·CP 가중 투표. §4.6 패턴 신설. verify에 코인/토큰 금지 규칙 추가(Admin 예외). 서브 2단 이상에서 탭 전환이 한 단계만 닫히던 버그 수정 | PASS |
| 2026-08-13 | H06-⑦ | MY + 파트너 모드 이식 — MY 재작성(예약 내역·쿠폰·투표 연결), 파트너 등록 4단계(역할→AI 구조화→필수확인 3종→제출→승인 +50CP), MY BUSINESS 역할별 + CONTRIBUTOR CENTER(H07). Host 집계만 노출·1단계 한정, 랭킹 방화벽 문구 상시 노출. AI 운영시간 파싱 오전/오후 보정 | PASS |
| 2026-08-13 | H06 | **H06 전 항목 완료** — 수용 기준 6개 전부 충족, README에 v10 deprecated 표기 | PASS |
| 2026-08-13 | H02~H04 | 회귀 확인(17기준) 후 미충족 5건 수정 — 홈 HRP 배지·혜택 카드→지갑 진입(H03), 온체인 이관 전제 문구 복원(H03), 카운트다운 실동작 컴포넌트(FIVE·투표), HOST Recommended Stay 뱃지(H04) | PASS |
| 2026-08-13 | H04 | 잔여 미충족 완료 — MY BUSINESS 카트 운영(ONLINE 토글·호출 수락 시 매출/건수 실반영·AI Manager 가격 변경/운영 중단), 레지던스 화면(QR 체크인·컨시어지 4종·ROOM Guest QR 연결). AI 칩을 데이터로 분리해 i18n 경고 0 유지 | PASS |

