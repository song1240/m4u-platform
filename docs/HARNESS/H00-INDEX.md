# 하네스 인덱스

> 모든 개발 작업은 하네스 단위로 진행한다. 각 하네스 = 목표 + 수용 기준(체크박스) + Verify 방법.
> 작업 순서는 HANDOFF.md의 NEXT를 따른다.

| ID | 파일 | 범위 | 상태 |
|---|---|---|---|
| H06 | H06-design-migration.md | v10 기능의 마스터 UI 이식 (**최우선** — H01 흡수) | TODO |
| H01 | H01-app-split.md | App.jsx 모듈 분리 | H06에 흡수 (별도 진행 불필요) |
| H02 | H02-consumer-core.md | 소비자 코어 (온보딩·홈·Living·Habit·Salon) | 프로토타입 완료 → 분리 후 회귀 확인 |
| H03 | H03-wallet-governance.md | 지갑 (HRP·CP·FIVE·쿠폰·투표) | 프로토타입 완료 → 분리 후 회귀 확인 |
| H04 | H04-partner-host.md | 파트너 모드 (등록·MY BUSINESS·HOST) | 프로토타입 완료 → 분리 후 회귀 확인 |
| H05 | H05-admin.md | Admin Web | 프로토타입 완료 |
| H07 | H07-contributor.md | Contributor Center (기여자 네트워크) | 프로토타입 완료 → 이식(H06) 시 포함 |

공통 수용 기준 (모든 하네스에 적용):
- [ ] `npm run verify` PASS
- [ ] 한국어·베트남어 양쪽에서 해당 화면 전체 확인 (바텀탭만 바뀌는 부분 번역 금지)
- [ ] docs/POLICY.md 위반 없음 (특히 표기·금지 표현·랭킹·CP·Host 3원칙)
- [ ] CR_LOG.md 기록 + HANDOFF.md 갱신
