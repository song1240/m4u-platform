/**
 * M4U MASTER UI — 공식 디자인 기준 (셸 + 앱 상태)
 * Forest #073B2B · Ivory #F7F3EA · Champagne Gold #C6A15B · DM Serif Display 헤드라인
 * 화면은 screens/ 아래로 분리한다. 컴포넌트·CSS 클래스는 components.jsx / style.css 재사용,
 * 독자적 재디자인 금지 (docs/DESIGN_SYSTEM.md).
 */
import React, { useState, useEffect } from "react";
import { Home as HomeIcon, Building2, Activity, Sparkles, User, Check } from "lucide-react";
import Onboarding, { LangScreen, ZoneScreen } from "./screens/Onboarding.jsx";
import Home from "./screens/Home.jsx";
import Living from "./screens/Living.jsx";
import Category from "./screens/Category.jsx";
import Venue from "./screens/Venue.jsx";
import Book from "./screens/Book.jsx";
import Habit from "./screens/Habit.jsx";
import Salon from "./screens/Salon.jsx";
import SkinProfile from "./screens/SkinProfile.jsx";
import Wallet from "./screens/Wallet.jsx";
import Vote from "./screens/Vote.jsx";
import PointLog from "./screens/PointLog.jsx";
import Bookings from "./screens/Bookings.jsx";
import Partner from "./screens/Partner.jsx";
import MyBusiness from "./screens/MyBusiness.jsx";
import Residence from "./screens/Residence.jsx";
import ReviewWrite from "./screens/ReviewWrite.jsx";
import Shop from "./screens/Shop.jsx";
import Product from "./screens/Product.jsx";
import Cart from "./screens/Cart.jsx";
import Stay from "./screens/Stay.jsx";
import StayBook from "./screens/StayBook.jsx";
import Concierge from "./screens/Concierge.jsx";
import My from "./screens/My.jsx";
import { L, pick, zoneName } from "./i18n.js";
import { ZONES, SELF_HABITS, FIVE_TIERS, FIVE_CP, COUPONS, PROPOSALS, PARTNER_CP, REVIEW_CP } from "./data.js";
import "./style.css";

const TABS = [
  { id: "home", icon: HomeIcon, ko: "홈", vi: "Trang chủ" },
  { id: "living", icon: Building2, ko: "Living", vi: "Living" },
  { id: "habit", icon: Activity, ko: "Habit", vi: "Habit" },
  { id: "salon", icon: Sparkles, ko: "Salon", vi: "Salon" },
  { id: "my", icon: User, ko: "MY", vi: "MY" },
];

/** 걷기 목표 · HRP 초기 잔액 — 데모 자리표시자 (기준 확정 전 임의 변경 금지 — CLAUDE.md §6) */
const STEP_GOAL = 6000;
const HRP_START = 125800;
/** 걷기(검증형) 달성 보상 — 검증형만 CP를 받는다 (POLICY §5) */
const WALK_HRP = 10;
const WALK_CP = 2;
/** 셀프 체크 일일 HRP 상한 (POLICY §5) — 합산이 이 값을 넘으면 추가 적립 없음 */
const SELF_DAILY_CAP = 15;
/** CP 초기 보유 — 데모 자리표시자 (POLICY §4: 구매·양도·수동 발행 불가) */
const CP_START = 128;
const WATER_GOAL = 8;
const STREAK = 7; // 데모: 연속 달성일

/* ── 온보딩 선택값 유지 (언어·생활권) — ?fresh=1 로 초기화하고 온보딩부터 다시 볼 수 있다 ── */
const STORE_KEY = "m4u.master.v1";
const readSaved = () => {
  try {
    if (new URLSearchParams(window.location.search).get("fresh") === "1") {
      window.localStorage.removeItem(STORE_KEY);
      return null;
    }
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || "null");
  } catch {
    return null; // 시크릿 모드 등 저장소 미사용 환경 — 온보딩부터 시작
  }
};
const writeSaved = (v) => {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(v));
  } catch {
    /* 저장 실패는 무시 — 이번 세션 동안만 유지된다 */
  }
};

export default function App() {
  const [saved] = useState(readSaved);
  const [stage, setStage] = useState(saved?.onboarded ? "app" : "lang"); // lang → intro → zone → app
  const [lang, setLang] = useState(saved?.lang || "ko");
  const [zoneIdx, setZoneIdx] = useState(saved?.zoneIdx ?? 0);
  const [overlay, setOverlay] = useState(null); // MY에서 여는 재설정 화면: "lang" | "zone"
  const [zoneDraft, setZoneDraft] = useState(saved?.zoneIdx ?? 0); // 재설정 중 임시 선택(뒤로가기 = 취소)
  const [tab, setTabState] = useState("home");
  const [sub, setSub] = useState(null); // 서브 화면: {name, ...params}
  const [subDepth, setSubDepth] = useState(0); // 쌓인 서브 화면 수 (탭 전환 시 한 번에 닫기 위함)
  const [steps] = useState(3200);
  const [points, setPoints] = useState(HRP_START); // 예약·습관 적립이 쌓이는 지갑 잔액
  const [likes, setLikes] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  // 습관 상태 — 걷기는 검증형, 나머지는 셀프 체크(해제 불가)
  const [stepsExtra, setStepsExtra] = useState(0);
  const [walkClaimed, setWalkClaimed] = useState(false);
  const [water, setWater] = useState(5);
  const [selfChecks, setSelfChecks] = useState({});
  const [selfEarned, setSelfEarned] = useState(0); // 오늘 셀프 체크로 적립한 HRP 합계
  // 지갑 — CP는 검증된 활동으로만 늘어난다 (POLICY §4)
  const [cp, setCp] = useState(CP_START);
  const [txs, setTxs] = useState([]);
  const [cpLog, setCpLog] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [coupons, setCoupons] = useState(COUPONS);
  const [myVotes, setMyVotes] = useState({});
  const [bookings, setBookings] = useState([]);
  // 파트너 모드 — 앱 분리 없이 같은 계정에서 전환한다 (POLICY §8)
  const [bizRole, setBizRole] = useState("local");
  const [partnerActive, setPartnerActive] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [reviews, setReviews] = useState([]); // 내가 쓴 Verified Review
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stays, setStays] = useState([]);
  const [ai, setAi] = useState(false); // AI 컨시어지 시트

  // 스크린리더·번역기가 올바른 언어로 읽도록 문서 언어를 동기화
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 온보딩을 마친 뒤에는 선택값을 저장해 새로고침해도 앱에서 시작한다
  useEffect(() => {
    if (stage === "app") writeSaved({ onboarded: true, lang, zoneIdx });
  }, [stage, lang, zoneIdx]);

  // 브라우저 뒤로가기 = 온보딩 이전 단계 / 재설정 화면 닫기
  useEffect(() => {
    window.history.replaceState({ m4u: { stage: saved?.onboarded ? "app" : "lang", overlay: null, sub: null, depth: 0 } }, "");
    const onPop = (e) => {
      const s = e.state?.m4u;
      if (!s) return;
      setStage(s.stage);
      setOverlay(s.overlay ?? null);
      setSub(s.sub ?? null);
      setSubDepth(s.depth ?? 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [saved]);

  const go = (nextStage, nextOverlay = null) => {
    window.history.pushState({ m4u: { stage: nextStage, overlay: nextOverlay, sub: null, depth: 0 } }, "");
    setStage(nextStage);
    setOverlay(nextOverlay);
    setSub(null);
    setSubDepth(0);
  };
  const closeOverlay = () => window.history.back(); // 뒤로가기와 같은 경로로 닫는다

  // 서브 화면(카테고리·매장·예약)은 히스토리에 쌓아 브라우저 뒤로가기로 닫힌다
  const goSub = (name, params = {}) => {
    const next = { name, ...params };
    const depth = subDepth + 1;
    window.history.pushState({ m4u: { stage: "app", overlay: null, sub: next, depth } }, "");
    setSub(next);
    setSubDepth(depth);
  };
  const closeSub = () => window.history.back();
  // 탭 전환은 열린 서브 화면을 닫는다 (v10 동작 유지)
  const setTab = (id) => {
    if (subDepth > 0) window.history.go(-subDepth); // 여러 단계 쌓여 있어도 앱 루트까지 한 번에
    setTabState(id);
  };
  const toast = (msg) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2200);
  };
  const toggleLike = (id) => setLikes((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // ── 습관 (POLICY §5) ──
  // 걷기 = 헬스 데이터 검증형 → HRP + CP, 상한 없음
  // 그 외 = 셀프 체크 → HRP만, 하루 1회·해제 불가, 합산 15 HRP 상한
  const totalSteps = steps + stepsExtra;
  const syncSteps = () => {
    const gained = 1200 + ((totalSteps % 7) + 1) * 120; // 데모: 동기화량 (난수 대신 결정적)
    const next = totalSteps + gained;
    setStepsExtra((x) => x + gained);
    if (next >= STEP_GOAL && !walkClaimed) {
      setWalkClaimed(true);
      addHrp(WALK_HRP, L(lang, "습관 · 걷기 목표 달성", "Thói quen · đạt mục tiêu đi bộ"));
      addCp(WALK_CP, L(lang, "걷기 목표 달성 (헬스 데이터 검증)", "Đạt mục tiêu đi bộ (xác minh dữ liệu)"));
      toast(L(lang, `걷기 목표 달성! +${WALK_HRP} HRP · +${WALK_CP} CP`, `Đạt mục tiêu đi bộ! +${WALK_HRP} HRP · +${WALK_CP} CP`));
    } else {
      toast(L(lang, `걸음 동기화 · +${gained}보`, `Đồng bộ · +${gained} bước`));
    }
  };
  /** 셀프 체크 적립 — 상한 초과분은 지급하지 않고 사유를 알린다 */
  const earnSelf = (hrp, labelKo, labelVi) => {
    const room = Math.max(0, SELF_DAILY_CAP - selfEarned);
    const pay = Math.min(hrp, room);
    if (pay > 0) {
      setSelfEarned((e) => e + pay);
      addHrp(pay, L(lang, `습관 · ${labelKo}`, `Thói quen · ${labelVi}`));
      toast(L(lang, `${labelKo} 완료! +${pay} HRP`, `Hoàn thành ${labelVi}! +${pay} HRP`));
    } else {
      toast(L(lang, `${labelKo} 완료 · 오늘 셀프 적립 상한(${SELF_DAILY_CAP} HRP) 도달`, `Hoàn thành ${labelVi} · đã đạt giới hạn ${SELF_DAILY_CAP} HRP hôm nay`));
    }
  };
  const toggleSelf = (id) => {
    const h = SELF_HABITS.find((x) => x.id === id);
    if (!h) return;
    if (id === "water") {
      if (water >= WATER_GOAL) return; // 완료 후 되돌릴 수 없다
      const next = water + 1;
      setWater(next);
      if (next === WATER_GOAL) earnSelf(h.hrp, h.name.ko, h.name.vi);
      return;
    }
    if (selfChecks[id]) return; // 하루 1회 · 해제 불가 (어뷰징 방지)
    setSelfChecks((c) => ({ ...c, [id]: true }));
    earnSelf(h.hrp, h.name.ko, h.name.vi);
  };
  const doneCount =
    (walkClaimed ? 1 : 0) + (water >= WATER_GOAL ? 1 : 0) + Object.values(selfChecks).filter(Boolean).length;
  const now = () => L(lang, "오늘", "Hôm nay");
  const addHrp = (amount, label) => {
    setPoints((p) => p + amount);
    setTxs((x) => [{ id: "t" + x.length + amount + label.length, label, amount, when: now() }, ...x]);
  };
  const addCp = (amount, label) => {
    setCp((p) => p + amount);
    setCpLog((x) => [{ id: "c" + x.length + amount + label.length, label, amount, when: now() }, ...x]);
  };
  const confirmBooking = (b) => {
    setBookings((x) => [{ id: "b" + x.length + b.point, ...b }, ...x]);
    // 적립은 검증 가능한 활동에만 (POLICY §3·§4)
    addHrp(b.point, L(lang, `예약 · ${b.name}`, `Đặt lịch · ${b.name}`));
    addCp(b.cp, L(lang, "예약 이행 (노쇼 없음)", "Hoàn thành đặt lịch (không hủy)"));
    toast(L(lang, `예약 완료 · +${b.point} HRP · +${b.cp} CP`, `Đặt lịch xong · +${b.point} HRP · +${b.cp} CP`));
  };
  // FIVE 참여 — 보상은 구매 건수 비례이며 인원 모집 비례가 아니다 (POLICY §6)
  const joinRoom = (room) => {
    const t = FIVE_TIERS[room.tier];
    setJoinedRooms((j) => [...j, room.id]);
    addHrp(t.hrp, L(lang, "FIVE 공동구매 참여", "Tham gia mua chung FIVE"));
    addCp(FIVE_CP, L(lang, "FIVE 공동구매 참여", "Tham gia mua chung FIVE"));
    toast(L(lang, `참여 완료 · +${t.hrp} HRP · +${FIVE_CP} CP`, `Tham gia xong · +${t.hrp} HRP · +${FIVE_CP} CP`));
  };
  // 승인 시뮬레이션 — 실서비스는 Admin 승인 후 MY BUSINESS가 생성된다 (POLICY §8)
  const approvePartner = (role) => {
    setBizRole(role);
    setPartnerActive(true);
    addCp(PARTNER_CP, L(lang, "파트너 등록 승인", "Đăng ký đối tác được duyệt"));
    toast(L(lang, `파트너 승인 · +${PARTNER_CP} CP · MY BUSINESS 생성`, `Duyệt đối tác · +${PARTNER_CP} CP · đã tạo MY BUSINESS`));
    goSub("biz");
  };
  // SHOP — 결제 금액에 비례해 HRP 적립 (POLICY §3)
  const addToCart = (p) => {
    setCart((c) => (c.some((x) => x.id === p.id) ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...p, qty: 1 }]));
    toast(L(lang, "장바구니에 담았어요", "Đã thêm vào giỏ hàng"));
  };
  const setQty = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const placeOrder = (items, total, point) => {
    setOrders((o) => [{ id: "o" + o.length, first: pick(items[0].name, lang), count: items.length, total, point, when: now() }, ...o]);
    setCart([]);
    addHrp(point, L(lang, "주문 적립", "Tích điểm đơn hàng"));
    toast(L(lang, `주문 완료 · +${point} HRP`, `Đặt hàng xong · +${point} HRP`));
    closeSub();
  };
  const buyNow = (p) => placeOrder([{ ...p, qty: 1 }], p.price, p.point);
  // STAY — 스테이 예약 완료 시 +5 CP (POLICY §4)
  const confirmStay = (st) => {
    setStays((x) => [{ id: "st" + x.length, ...st }, ...x]);
    addHrp(st.point, L(lang, `스테이 · ${st.name}`, `Lưu trú · ${st.name}`));
    addCp(st.cp, L(lang, "스테이 예약 완료", "Hoàn tất đặt lưu trú"));
    toast(L(lang, `예약 완료 · +${st.point} HRP · +${st.cp} CP`, `Đặt phòng xong · +${st.point} HRP · +${st.cp} CP`));
  };

  // Verified Review — 보상은 별점이 아니라 성실한 작성에 지급 (POLICY §2)
  const addReview = (r) => {
    setReviews((x) => [{ id: "rv" + x.length, when: now(), ...r }, ...x]);
    addCp(REVIEW_CP, L(lang, "Verified 리뷰 작성", "Viết đánh giá đã xác minh"));
    toast(L(lang, `리뷰 등록 완료 · +${REVIEW_CP} CP`, `Đã đăng đánh giá · +${REVIEW_CP} CP`));
    closeSub();
  };
  const useCoupon = (id) => {
    setCoupons((cs) => cs.map((c) => (c.id === id ? { ...c, used: true } : c)));
    toast(L(lang, "쿠폰 사용 처리 완료", "Đã sử dụng mã ưu đãi"));
  };
  // 투표는 CP 가중치로 집계되며 CP를 차감하지 않는다 (POLICY §4)
  const castVote = (id, side) => {
    setMyVotes((v) => (v[id] ? v : { ...v, [id]: side }));
    toast(L(lang, `${side === "yes" ? "찬성" : "반대"} ${cp} CP 투표 완료`, `Đã bỏ phiếu ${side === "yes" ? "đồng ý" : "không đồng ý"} với ${cp} CP`));
  };

  if (stage !== "app")
    return <Onboarding stage={stage} setStage={go} lang={lang} setLang={setLang} zoneIdx={zoneIdx} setZoneIdx={setZoneIdx} onDone={() => go("app")} />;

  if (overlay === "lang")
    return <LangScreen step={null} current={lang} onBack={closeOverlay} onPick={(id) => { setLang(id); closeOverlay(); }} />;
  if (overlay === "zone")
    return (
      <ZoneScreen
        step={null}
        reset
        lang={lang}
        zoneIdx={zoneDraft}
        setZoneIdx={setZoneDraft}
        onBack={closeOverlay}
        onDone={() => { setZoneIdx(zoneDraft); closeOverlay(); }}
      />
    );

  const zone = zoneName(ZONES[zoneIdx], lang);
  const openReset = (id) => {
    if (id === "zone") setZoneDraft(zoneIdx);
    go("app", id);
  };
  // 하단 고정 CTA가 있는 화면에서는 FAB를 숨긴다 — 주 CTA를 가리지 않기 위해 (DESIGN_SYSTEM §4.10)
  const CTA_SUBS = ["book", "review", "product", "cart", "staybook", "partner", "venue"];
  const showFab = !sub || !CTA_SUBS.includes(sub.name);
  const subScreens = {
    cat: <Category lang={lang} catId={sub?.catId} onBack={closeSub} goSub={goSub} toast={toast} />,
    venue: <Venue lang={lang} venueId={sub?.venueId} myReviews={reviews} onBack={closeSub} goSub={goSub} liked={likes.includes(sub?.venueId)} toggleLike={toggleLike} />,
    book: <Book lang={lang} venueId={sub?.venueId} serviceId={sub?.serviceId} onBack={closeSub} onDone={closeSub} confirmBooking={confirmBooking} />,
    skin: <SkinProfile lang={lang} onBack={closeSub} goSub={goSub} />,
    wallet: <Wallet lang={lang} points={points} cp={cp} joined={joinedRooms} joinRoom={joinRoom} coupons={coupons} useCoupon={useCoupon} openVotes={PROPOSALS.filter((p) => p.status === "open").length} onBack={closeSub} goSub={goSub} />,
    vote: <Vote lang={lang} cp={cp} myVotes={myVotes} castVote={castVote} onBack={closeSub} />,
    log: <PointLog lang={lang} kind={sub?.kind} points={points} cp={cp} txs={txs} cpLog={cpLog} onBack={closeSub} />,
    bookings: <Bookings lang={lang} bookings={bookings} reviews={reviews} onWrite={(id) => goSub("review", { bookingId: id })} onBack={closeSub} />,
    review: <ReviewWrite lang={lang} booking={bookings.find((b) => b.id === sub?.bookingId)} onBack={closeSub} onSubmit={addReview} />,
    shop: <Shop lang={lang} orders={orders} cartCount={cart.reduce((s, x) => s + x.qty, 0)} onBack={closeSub} goSub={goSub} />,
    product: <Product lang={lang} productId={sub?.productId} onBack={closeSub} addToCart={addToCart} buyNow={buyNow} />,
    cart: <Cart lang={lang} cart={cart} setQty={setQty} placeOrder={placeOrder} onBack={closeSub} />,
    stay: <Stay lang={lang} stays={stays} onBack={closeSub} goSub={goSub} />,
    staybook: <StayBook lang={lang} stayId={sub?.stayId} onBack={closeSub} onDone={closeSub} confirmStay={confirmStay} />,
    partner: <Partner lang={lang} onBack={closeSub} onApproved={approvePartner} />,
    biz: <MyBusiness lang={lang} role={bizRole} setRole={setBizRole} onBack={closeSub} toast={toast} />,
    residence: <Residence lang={lang} checkedIn={checkedIn} setCheckedIn={setCheckedIn} toast={toast} onBack={closeSub} />,
  };
  const screens = {
    home: <Home lang={lang} zone={zone} steps={totalSteps} goal={STEP_GOAL} points={points} go={setTab} goSub={goSub} onAi={() => setAi(true)} />,
    living: <Living lang={lang} zone={zone} go={setTab} goSub={goSub} />,
    habit: (
      <Habit
        lang={lang} steps={totalSteps} goal={STEP_GOAL} streak={STREAK}
        walkClaimed={walkClaimed} syncSteps={syncSteps}
        water={water} waterGoal={WATER_GOAL} selfChecks={selfChecks} toggleSelf={toggleSelf}
        selfEarned={selfEarned} selfCap={SELF_DAILY_CAP} doneCount={doneCount}
        onBookClass={(name) => toast(L(lang, `${name} 클래스 예약 완료 (데모)`, `Đã đặt lớp tại ${name} (demo)`))}
      />
    ),
    salon: <Salon lang={lang} goSub={goSub} />,
    my: (
      <My
        lang={lang} zone={zone} points={points} cp={cp} bookings={bookings} coupons={coupons}
        openVotes={PROPOSALS.filter((p) => p.status === "open").length} checkedIn={checkedIn}
        go={goSub} onMenu={openReset} onWallet={() => goSub("wallet")}
        partnerActive={partnerActive} onPartner={() => goSub(partnerActive ? "biz" : "partner")}
      />
    ),
  };
  // AI는 화면으로 데려다주기만 한다 — 확정은 사용자가 누른다 (§4.10)
  const aiGo = (act) => {
    setAi(false);
    if (act.tab) return setTab(act.tab);
    if (act.sub) return goSub(act.sub, act.params || {});
  };

  return (
    <div className="shell">
      <main>{sub ? subScreens[sub.name] : screens[tab]}</main>
      {toastMsg && <div className="toast"><Check size={15} /> {toastMsg}</div>}
      {showFab && !ai && (
        <button className="fab" onClick={() => setAi(true)} aria-label="AI">
          <Sparkles size={22} />
        </button>
      )}
      {ai && <Concierge lang={lang} onClose={() => setAi(false)} onGo={aiGo} />}
      <nav>
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            <t.icon size={20} />
            <span>{L(lang, t.ko, t.vi)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
