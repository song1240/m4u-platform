# H01 — App.jsx 모듈 분리

## 목표
단일 파일(약 2,880줄) `src/App.jsx`를 유지보수 가능한 구조로 분리한다.
**기능·화면·문구는 1도 바뀌지 않아야 한다** (순수 리팩터링).

## 목표 구조
```
src/
├── App.jsx                 # 라우팅·전역 상태만 (300줄 이하 목표)
├── lib/i18n.js             # L 헬퍼, T 탭 라벨, fmtDate, vnd
├── data/                   # VENUES, STAYS, PRODUCTS, FIVE, coupons, proposals, CP_RULES, ZONES
├── components/common/      # TabHead, SubHead, Modal, Row2, Countdown, BottomNav, 공용 카드
├── screens/onboarding/     # LangSelect, Onboarding, ZoneSelectScreen
├── screens/home/           # HomeTab, HomeHeader, HabitWidget
├── screens/living/         # LivingTab, CategoryScreen, VenueScreen, BookScreen, Stay*
├── screens/habit/          # HabitTab
├── screens/salon/          # SalonTab, SkinProfileScreen
├── screens/wallet/         # WalletTab, VoteScreen, PointLog, CpLog
├── screens/my/             # MyTab, ResidenceScreen
├── screens/partner/        # PartnerScreen, MyBusinessScreen
├── ai/AISheet.jsx
└── styles/S.js             # 스타일 객체 (추후 tokens와 통합)
```

## 절차 (루프 엔지니어링)
1. THINK/PLAN: 의존 관계(shared props·S 스타일·데이터) 파악 후 분리 순서 서술
2. 한 번에 한 폴더씩 이동 — 이동할 때마다 `npm run verify`
3. 순환 의존 발생 시 lib/로 내려서 해소
4. 마지막에 App.jsx가 300줄 이하인지 확인

## 수용 기준
- [ ] 위 구조로 분리 완료, App.jsx ≤ 300줄
- [ ] 앱 동작 동일: 온보딩→ZONE→5탭 전 화면, 언어 전환, 지갑, 파트너 3역할 전부 클릭 확인
- [ ] import 순환 없음, verify PASS
- [ ] 데이터 파일에는 ko/vi 필드 구조 유지 (문자열 병합 금지)
