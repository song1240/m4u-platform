import React, { useMemo, useState } from "react";
import {
  LayoutDashboard, Store, MapPin, Star, CreditCard, Coins, Flag, Lock,
  Check, X, ShieldCheck, BadgeCheck, Search, Bell, ChevronRight, Users,
  TrendingUp, AlertTriangle, FileText, Building2, Rocket, Power, Vote, Package, Timer,
} from "lucide-react";

/*
  M4U ADMIN WEB — 본사 운영자 전용 (내부 직원용 · 한국어)
  ─────────────────────────────────────────────
  · 소비자/파트너는 M4U 앱 하나를 사용, 본사 운영은 이 별도 웹에서 수행
  · 권한 2등급: 운영자(OPS) / 최고 관리자(SUPER)
    - 정산·수수료, HRP/CP 발행은 SUPER 전용
  · 앱과 이어지는 데모 포인트: 파트너 승인 큐에서 승인하면
    앱 쪽 MY BUSINESS 생성 + 50CP 지급이 트리거되는 흐름
*/

const C = {
  green: "#073E2B", green2: "#0E5A3E", cream: "#F5F1E8", ivory: "#FFFDF8",
  gold: "#C6A15B", line: "#E7DFD0", text: "#1B2E26", muted: "#8A8578",
  red: "#B4552F", blue: "#3E5E8A", dark: "#0B2A1F",
};

const vnd = (n) => n.toLocaleString("ko-KR") + " VND";

/* ─────────── 데이터 (데모) ─────────── */

const KPI = [
  { label: "전체 사용자", value: "12,480", delta: "+340 이번 주", icon: <Users size={17} /> },
  { label: "활성 파트너", value: "86", delta: "+5 이번 주", icon: <Store size={17} /> },
  { label: "오늘 거래액", value: "48.2M VND", delta: "+12% vs 어제", icon: <TrendingUp size={17} /> },
  { label: "HRP 유통량", value: "1.84M", delta: "이번 달 발행 12.5만", icon: <Coins size={17} /> },
  { label: "평균 리뷰", value: "4.82", delta: "Verified 8,940건", icon: <Star size={17} /> },
];

const WEEK_GMV = [
  ["월", 31], ["화", 36], ["수", 33], ["목", 41], ["금", 47], ["토", 52], ["일", 48],
];

const RECENT = [
  { t: "10:42", text: "파트너 승인 요청 · GRAND PARK CART (Mobility)" },
  { t: "10:18", text: "Verified Review 이상 플래그 2건 발생 · 반꾸온 하노이" },
  { t: "09:55", text: "커뮤니티 투표 가결 · E-카트 운행시간 연장 (23시→24시)" },
  { t: "09:30", text: "정산 지급 완료 · M4U Salon & Spa · 8,120,000 VND" },
  { t: "09:05", text: "Host 보상 집계 완료 · Ocean Residence · 856,000 VND (지급 대기)" },
  { t: "08:40", text: "Contributor 기여 집계 · HanCook 신규 유입 126명 · Score 872 (Gold)" },
  { t: "08:12", text: "신규 가입 214명 · 빈홈 그랜드 파크" },
];

const initialQueue = [
  {
    id: "q1", name: "GRAND PARK CART", type: "Mobility · Electric Cart", zone: "빈홈 그랜드 파크",
    owner: "레반T (거주민 · 소비자 계정 전환)", submitted: "오늘 10:42",
    ai: { 업종: "Mobility", 서비스: "Electric Cart (6인승)", 가격: "20,000 VND / 회", 운영: "08:00 – 22:00", 예약: "가능 · 즉시호출 가능", 소개: "AI 자동작성 (한/베 자동생성)" },
    note: "소비자 계정에서 '내 사업 시작하기'로 등록 — AI 구조화 초안 기반",
  },
  {
    id: "q2", name: "분짜 & 스프링롤", type: "맛집 · 베트남 가정식", zone: "빈홈 그랜드 파크",
    owner: "응우옌TH", submitted: "어제 16:20",
    ai: { 업종: "맛집", 서비스: "분짜 · 스프링롤 · 배달", 가격: "메뉴판 기준", 운영: "10:00 – 21:00", 예약: "테이블 예약 + 픽업", 소개: "AI 자동작성" },
    note: "위생 서류 재업로드 완료 · 재심사",
  },
  {
    id: "q3", name: "네일 아틀리에 미아", type: "살롱·뷰티 · 네일", zone: "타오디엔",
    owner: "김O아", submitted: "8/10 14:05",
    ai: { 업종: "살롱·뷰티", 서비스: "젤 네일 · 케어", 가격: "시술별 정찰제", 운영: "11:00 – 20:00", 예약: "시간제 예약", 소개: "AI 자동작성" },
    note: "-",
  },
];

const ZONES_DATA = [
  { name: "빈홈 그랜드 파크", users: 8420, partners: 52, gmv: "31.5M VND/일", boost: 3, status: "정상 운영" },
  { name: "타오디엔", users: 2840, partners: 22, gmv: "11.2M VND/일", boost: 1, status: "정상 운영" },
  { name: "푸미흥", users: 1220, partners: 12, gmv: "5.5M VND/일", boost: 2, status: "확장 준비" },
];

const initialFlags = [
  { id: "f1", venue: "반꾸온 하노이", review: "\"최고예요\" 외 4건", reason: "동일 기기에서 다수 계정 작성 패턴", level: "높음", status: "대기" },
  { id: "f2", venue: "그린마켓", review: "별점 1점 1건", reason: "예약·결제 이력 없는 계정의 작성 시도 (Verified 조건 미충족 → 자동 차단됨)", level: "낮음", status: "대기" },
  { id: "f3", venue: "카페 아치", review: "별점 5점 2건", reason: "단시간 연속 작성 · IP 중복", level: "중간", status: "대기" },
];

const RANK_WEIGHTS = [
  ["별점 (Verified)", 35], ["재이용률", 20], ["예약 이행률", 15], ["취소율 (감점)", -10], ["응답 속도", 10], ["소비자 Reward 환원", 10],
];

const initialSettle = [
  { id: "s1", name: "M4U Salon & Spa", gmv: 101500000, fee: 8, status: "지급 완료", date: "8/10" },
  { id: "s2", name: "빈홈 그릴 하우스", gmv: 84200000, fee: 8, status: "지급 대기", date: "-" },
  { id: "s3", name: "그린마켓", gmv: 46800000, fee: 5, status: "지급 대기", date: "-" },
  { id: "s4", name: "카페 아치", gmv: 22400000, fee: 8, status: "지급 완료", date: "8/10" },
];

const HRP_STATS = [
  ["총 발행량 (누적)", "1,840,000 HRP"],
  ["이번 달 발행", "125,000 HRP"],
  ["이번 달 소각/사용", "98,400 HRP"],
  ["습관 보상 지출 (월)", "31,200 HRP"],
  ["CP 발행 (양도불가·월)", "8,450 CP"],
];

const initialDisputes = [
  { id: "d1", from: "회원 #8842", target: "빈홈 그릴 하우스", type: "노쇼 보증금 분쟁", desc: "예약 취소했는데 보증금이 차감되었다는 신고", status: "처리 중" },
  { id: "d2", from: "회원 #2210", target: "E-카트 (GRAND PARK CART)", type: "요금 이의", desc: "호출 요금이 표시 금액과 다르게 청구됨", status: "대기" },
  { id: "d3", from: "파트너 · 네일 아틀리에 미아", target: "회원 #5518", type: "악성 리뷰 신고", desc: "서비스 이용 없이 반복 항의성 문의", status: "대기" },
];

/* ─────────── M4U FIVE 개설 검수 (POLICY §6.1~6.4) ─────────── */

/**
 * 방 구조와 모집 시간은 M4U가 정한 tier를 따른다 (§6.4).
 * 할인율 40/45/50%는 **현재 파일럿 운영 기준값**이며, 상품별 단위경제 검증과
 * 대표 승인에 따라 조정할 수 있다. 여기서는 기준 미달을 경고로만 표시한다.
 */
const FIVE_TIER = {
  5: { dc: 40, hrp: 20, hours: 72 },
  10: { dc: 45, hrp: 40, hours: 96 },
  15: { dc: 50, hrp: 60, hours: 120 },
};

/** 브랜드·파트너가 제출한 FIVE 개설 신청 — 승인 전에는 앱에 노출되지 않는다 (§6.1) */
const initialFiveQueue = [
  {
    id: "fq1", brand: "하나 코스메틱", owner: "브랜드", product: "어성초 수딩 스킨케어 세트",
    tier: 10, origin: 820000, price: 451000, stock: 40, fund: "브랜드", submitted: "2시간 전",
    note: "본사 직영 물류 · 단지 내 배송 가능",
  },
  {
    id: "fq2", brand: "빈홈 그릴 하우스", owner: "파트너", product: "숯불 세트 식사권 2인",
    tier: 5, origin: 600000, price: 420000, stock: 12, fund: "파트너", submitted: "어제",
    note: "매장 수령 전용 · 유효기간 60일",
  },
  {
    id: "fq3", brand: "티트리 랩", owner: "브랜드", product: "그린 티트리 세럼 더블 세트",
    tier: 15, origin: 900000, price: 450000, stock: 8, fund: "브랜드", submitted: "3일 전",
    note: "재고 소진 임박 — 추가 입고 미정",
  },
];

/** 검수 항목 (§6.1 "Admin이 상품·가격·재고를 사전 검수한다") */
const FIVE_CHECKS = [
  { id: "real", label: "상품 실재 · 표기 일치", desc: "실물 사진 · 구성 · 용량이 신청 내용과 같은가" },
  { id: "price", label: "원가 · 판매가 근거", desc: "정가가 부풀려지지 않았는가 (허위 할인율 방지)" },
  { id: "stock", label: "재고 확보", desc: "최대 모집 인원 이상 확보되어 있는가" },
  { id: "fund", label: "보상 재원 부담 주체 명시", desc: "§6.2 — 정산에 분리 기록된다" },
  { id: "recruit", label: "인원 모집 비례 보상 없음", desc: "§6.2 절대 규칙 — 모집 숫자에 따른 금전·HRP 지급 구조가 없는가" },
];

/* ─────────── APP ─────────── */

const NAV = [
  { key: "dash", label: "대시보드", icon: <LayoutDashboard size={16} /> },
  { key: "approve", label: "파트너 승인", icon: <Store size={16} />, badge: true },
  { key: "five", label: "FIVE 개설 검수", icon: <Package size={16} />, badge: true },
  { key: "zones", label: "Zone 관리", icon: <MapPin size={16} /> },
  { key: "review", label: "리뷰 · 랭킹 정책", icon: <Star size={16} /> },
  { key: "dispute", label: "신고 · 분쟁", icon: <Flag size={16} /> },
  { key: "settle", label: "정산 · 수수료", icon: <CreditCard size={16} />, superOnly: true },
  { key: "hrp", label: "HRP · CP 발행", icon: <Coins size={16} />, superOnly: true },
];

function App() {
  const [view, setView] = useState("dash");
  const [role, setRole] = useState("ops"); // ops(운영자) | super(최고 관리자)
  const [toast, setToast] = useState(null);

  const [queue, setQueue] = useState(initialQueue);
  const [approved, setApproved] = useState([]);
  const [flags, setFlags] = useState(initialFlags);
  const [settle, setSettle] = useState(initialSettle);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [fiveQueue, setFiveQueue] = useState(initialFiveQueue);
  const [fiveOpen, setFiveOpen] = useState([]); // 승인되어 앱에 열린 방

  const showToast = (x) => { setToast(x); setTimeout(() => setToast(null), 2400); };
  const isSuper = role === "super";
  const locked = (k) => NAV.find((n) => n.key === k)?.superOnly && !isSuper;

  const approve = (item) => {
    setQueue((q) => q.filter((x) => x.id !== item.id));
    setApproved((a) => [{ ...item, at: "방금" }, ...a]);
    showToast(`승인 완료 · ${item.name} — 앱에 MY BUSINESS 생성 · +50CP 지급`);
  };
  const reject = (item, reason) => {
    setQueue((q) => q.filter((x) => x.id !== item.id));
    showToast(`반려 처리 · ${item.name} — 사유가 파트너에게 통보됩니다`);
  };

  /** FIVE 개설 승인 — 이 시점부터 앱에 방이 열린다. 개설 주체는 앱에 항상 표시된다 (§6.1) */
  const approveFive = (item) => {
    setFiveQueue((q) => q.filter((x) => x.id !== item.id));
    setFiveOpen((a) => [{ ...item, at: "방금" }, ...a]);
    showToast(`개설 승인 · ${item.product} — 앱에 방 오픈 · 재원 부담 ${item.fund} (정산 분리 기록)`);
  };
  const rejectFive = (item) => {
    setFiveQueue((q) => q.filter((x) => x.id !== item.id));
    showToast(`개설 반려 · ${item.product} — 사유가 신청 주체에 통보됩니다`);
  };

  const body = useMemo(() => {
    if (locked(view)) return <LockedView role={role} />;
    if (view === "dash") return <Dashboard queueCount={queue.length} flagCount={flags.filter((f) => f.status === "대기").length} goApprove={() => setView("approve")} />;
    if (view === "approve") return <ApproveView queue={queue} approved={approved} onApprove={approve} onReject={reject} />;
    if (view === "five") return <FiveView queue={fiveQueue} opened={fiveOpen} onApprove={approveFive} onReject={rejectFive} />;
    if (view === "zones") return <ZonesView />;
    if (view === "review") return <ReviewView flags={flags} setFlags={setFlags} showToast={showToast} />;
    if (view === "settle") return <SettleView settle={settle} setSettle={setSettle} showToast={showToast} />;
    if (view === "hrp") return <HrpView showToast={showToast} />;
    if (view === "dispute") return <DisputeView disputes={disputes} setDisputes={setDisputes} showToast={showToast} />;
  }, [view, role, queue, approved, flags, settle, disputes, fiveQueue, fiveOpen]);

  return (
    <div style={A.page}>
      {/* 사이드바 */}
      <aside style={A.sidebar}>
        <div style={A.brandBox}>
          <div style={A.brand}>M4U</div>
          <div style={A.brandSub}>ADMIN</div>
        </div>
        <div style={{ padding: "0 14px 10px", fontSize: 10, color: "rgba(255,255,255,.45)", letterSpacing: 0.5 }}>
          본사 운영자 전용 · 내부 시스템
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {NAV.map((n) => {
            const active = view === n.key;
            const isLocked = n.superOnly && !isSuper;
            return (
              <button key={n.key} style={{ ...A.navBtn, background: active ? "rgba(198,161,91,.16)" : "transparent", color: active ? C.gold : "rgba(255,255,255,.78)" }} onClick={() => setView(n.key)}>
                {n.icon}
                <span style={{ flex: 1, textAlign: "left" }}>{n.label}</span>
                {n.badge && queue.length > 0 && <span style={A.navBadge}>{queue.length}</span>}
                {isLocked && <Lock size={12} color="rgba(255,255,255,.4)" />}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", padding: 14, fontSize: 10, color: "rgba(255,255,255,.35)", lineHeight: 1.6 }}>
          소비자·파트너는 M4U 앱 하나를 사용합니다.<br />본사 운영 기능만 이 Admin Web에서 수행됩니다.
        </div>
      </aside>

      {/* 본문 */}
      <main style={A.main}>
        <header style={A.topbar}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
            <Search size={15} color={C.muted} />
            <input placeholder="파트너, 회원, 주문, 리뷰 검색…" style={A.searchInput} />
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={A.roleBox}>
              <ShieldCheck size={14} color={isSuper ? C.gold : C.green2} />
              <select value={role} onChange={(e) => setRole(e.target.value)} style={A.roleSelect}>
                <option value="ops">운영자 (OPS)</option>
                <option value="super">최고 관리자 (SUPER)</option>
              </select>
            </div>
            <Bell size={17} color={C.text} />
            <div style={A.userChip}>관</div>
          </div>
        </header>
        <div style={A.content}>{body}</div>
      </main>

      {toast && <div style={A.toast}><Check size={14} /> {toast}</div>}
    </div>
  );
}

/* ─────────── 잠금 화면 ─────────── */

function LockedView({ role }) {
  return (
    <div style={{ ...A.card, maxWidth: 520, margin: "60px auto", textAlign: "center", padding: 40 }}>
      <Lock size={30} color={C.gold} />
      <div style={{ fontSize: 17, fontWeight: 800, marginTop: 14 }}>최고 관리자 전용 메뉴</div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 8, lineHeight: 1.7 }}>
        정산·수수료 및 HRP/CP 발행은 자금과 직결되는 기능으로,<br />
        SUPER 권한에서만 접근할 수 있습니다.<br />
        현재 권한: <b>운영자 (OPS)</b> — 우측 상단에서 권한을 전환해 데모를 확인하세요.
      </div>
    </div>
  );
}

/* ─────────── 대시보드 ─────────── */

function Dashboard({ queueCount, flagCount, goApprove }) {
  const max = Math.max(...WEEK_GMV.map(([, v]) => v));
  return (
    <>
      <PageTitle title="대시보드" desc="빈홈 그랜드 파크 외 2개 Zone · 실시간 현황" />
      <div style={A.kpiRow}>
        {KPI.map((k) => (
          <div key={k.label} style={A.kpiCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: C.muted }}>
              <span style={{ fontSize: 11.5, fontWeight: 700 }}>{k.label}</span>{k.icon}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>{k.value}</div>
            <div style={{ fontSize: 10.5, color: C.green2, fontWeight: 700, marginTop: 4 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginTop: 14 }}>
        <div style={A.card}>
          <b style={{ fontSize: 14 }}>주간 거래액 (GMV, 백만 VND)</b>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 150, marginTop: 16 }}>
            {WEEK_GMV.map(([d, v]) => (
              <div key={d} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: 120, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${(v / max) * 100}%`, borderRadius: 8, background: d === "일" ? C.gold : C.green2, opacity: d === "일" ? 1 : 0.85 }} />
                </div>
                <div style={{ fontSize: 10.5, color: C.muted, marginTop: 6 }}>{d}</div>
                <div style={{ fontSize: 10.5, fontWeight: 800 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...A.card, cursor: "pointer", border: `1.5px solid ${C.gold}` }} onClick={goApprove}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b style={{ fontSize: 14 }}>파트너 승인 대기</b>
                <div style={{ color: C.muted, fontSize: 11.5, marginTop: 3 }}>서류 3종 확인 후 승인/반려</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.gold }}>{queueCount}건</div>
            </div>
          </div>
          <div style={A.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b style={{ fontSize: 14 }}>리뷰 이상 플래그</b>
                <div style={{ color: C.muted, fontSize: 11.5, marginTop: 3 }}>Verified Review 자동 탐지</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.red }}>{flagCount}건</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...A.card, marginTop: 14 }}>
        <b style={{ fontSize: 14 }}>최근 활동</b>
        {RECENT.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < RECENT.length - 1 ? `1px solid ${C.line}` : "none", fontSize: 12.5 }}>
            <span style={{ color: C.muted, fontVariantNumeric: "tabular-nums", minWidth: 44 }}>{r.t}</span>
            <span>{r.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────── 파트너 승인 ─────────── */

const CHECK_LIST = [
  { id: "biz", label: "사업자 등록 확인", desc: "사업자등록증 또는 개인사업 신고 서류" },
  { id: "loc", label: "위치 확인", desc: "실제 영업 위치 · 지도 검증" },
  { id: "doc", label: "업종별 필수 서류", desc: "위생 · 자격 · 인허가 (해당 업종)" },
];

/**
 * FIVE 개설 검수 (POLICY §6.1~6.4)
 *
 * §6.1 은 개설 주체를 M4U 본사 + 승인된 브랜드·파트너로 넓히면서
 * **Admin의 상품·가격·재고 사전 검수**를 조건으로 달았다. 이 화면이 그 조건이다.
 * 승인 전에는 앱 어디에도 노출되지 않는다.
 */
function FiveView({ queue, opened, onApprove, onReject }) {
  const [sel, setSel] = useState(queue[0]?.id ?? null);
  const [checks, setChecks] = useState({});
  const item = queue.find((q) => q.id === sel) ?? queue[0];
  const ck = checks[item?.id] || {};
  const allOk = item && FIVE_CHECKS.every((c) => ck[c.id]);
  const setCk = (cid) => setChecks((p) => ({ ...p, [item.id]: { ...(p[item.id] || {}), [cid]: !(p[item.id]?.[cid]) } }));

  const t = item ? FIVE_TIER[item.tier] : null;
  const dc = item ? Math.round((1 - item.price / item.origin) * 100) : 0;
  const dcOk = t && dc >= t.dc;
  const stockOk = item && item.stock >= item.tier;

  return (
    <>
      <PageTitle
        title="M4U FIVE 개설 검수"
        desc="브랜드·파트너가 신청한 공동구매 방 — 상품·가격·재고를 검수한 뒤에만 앱에 열립니다 (POLICY §6.1)"
      />
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.muted }}>대기 {queue.length}건</div>
          {queue.map((q) => (
            <div
              key={q.id}
              style={{ ...A.card, cursor: "pointer", padding: 12, border: item?.id === q.id ? `1.5px solid ${C.green}` : `1px solid ${C.line}` }}
              onClick={() => setSel(q.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b style={{ fontSize: 13 }}>{q.product}</b>
                <ChevronRight size={14} color={C.muted} />
              </div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{q.owner} · {q.brand} · {q.tier}인 방</div>
              <div style={{ color: C.muted, fontSize: 10.5, marginTop: 2 }}>제출 {q.submitted}</div>
            </div>
          ))}
          {queue.length === 0 && (
            <div style={{ ...A.card, color: C.muted, fontSize: 12.5, textAlign: "center" }}>대기 중인 신청이 없습니다.</div>
          )}

          {opened.length > 0 && (
            <>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, marginTop: 10 }}>최근 개설</div>
              {opened.map((a) => (
                <div key={a.id} style={{ ...A.card, padding: 12, background: "rgba(14,90,62,.05)" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <BadgeCheck size={13} color={C.green2} /><b style={{ fontSize: 12.5 }}>{a.product}</b>
                  </div>
                  <div style={{ color: C.muted, fontSize: 10.5, marginTop: 2 }}>
                    {a.brand} · {a.at} · 앱에 방 오픈 · 재원 {a.fund} 부담
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {item ? (
          <div style={A.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <b style={{ fontSize: 17 }}>{item.product}</b>
                  <span style={A.badge}><Package size={10} /> {item.owner} 개설</span>
                </div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{item.brand} · {item.note}</div>
              </div>
              <span style={{ fontSize: 11, color: C.muted }}>제출 {item.submitted}</span>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, margin: "18px 0 8px" }}>tier 기준 (M4U가 정한다 · §6.4)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                ["방 인원", `${item.tier}명`],
                ["기준 할인율", `${t.dc}%`],
                ["참여 보상", `${t.hrp} HRP`],
                ["모집 시간", `${t.hours}시간`],
              ].map(([k, v]) => (
                <div key={k} style={{ background: C.cream, borderRadius: 10, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{k}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, margin: "18px 0 8px" }}>신청 내용 (브랜드가 제시 · Admin이 검수)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                ["정가", vnd(item.origin)],
                ["공동구매가", vnd(item.price)],
                ["실제 할인율", `${dc}%`, dcOk],
                ["재고", `${item.stock}개`, stockOk],
              ].map(([k, v, ok]) => (
                <div
                  key={k}
                  style={{
                    background: ok === false ? "rgba(180,85,47,.08)" : C.cream,
                    border: ok === false ? `1px solid ${C.red}` : "1px solid transparent",
                    borderRadius: 10, padding: "9px 12px",
                  }}
                >
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{k}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2, color: ok === false ? C.red : C.text }}>{v}</div>
                </div>
              ))}
            </div>

            {(!dcOk || !stockOk) && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 10, background: "rgba(180,85,47,.07)", borderRadius: 11, padding: "11px 13px" }}>
                <AlertTriangle size={15} color={C.red} style={{ flex: "none", marginTop: 1 }} />
                <div style={{ fontSize: 11.5, lineHeight: 1.6 }}>
                  {!dcOk && <div>· 실제 할인율 {dc}%가 {item.tier}인 방 기준 {t.dc}%에 미달합니다. 40/45/50%는 <b>파일럿 운영 기준값</b>이며 조정하려면 단위경제 검증과 대표 승인이 필요합니다 (§6.4).</div>}
                  {!stockOk && <div>· 재고 {item.stock}개가 최대 모집 인원 {item.tier}명보다 적습니다. 미달 시 자동 취소·전액 환불 원칙(§6)과 별개로, 성사 후 배송 불가가 발생합니다.</div>}
                </div>
              </div>
            )}

            <div style={{ fontSize: 12.5, fontWeight: 800, margin: "18px 0 8px" }}>필수 확인 {FIVE_CHECKS.length}종</div>
            {FIVE_CHECKS.map((c) => (
              <div key={c.id} style={A.checkRow} onClick={() => setCk(c.id)}>
                <div style={{ ...A.checkBox, background: ck[c.id] ? C.green : "transparent", borderColor: ck[c.id] ? C.green : C.line }}>
                  {ck[c.id] && <Check size={12} color="white" />}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{c.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 14, background: "rgba(14,90,62,.05)", borderRadius: 11, padding: "11px 13px" }}>
              <ShieldCheck size={15} color={C.green2} style={{ flex: "none", marginTop: 1 }} />
              <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
                보상은 <b>실제 구매·실제 거래</b> 기준으로만 산정합니다. 사람을 모집한 숫자에 따라 금전·HRP를 지급하는
                구조는 만들지 않으며, 추천 보상은 1단계로 한정합니다 (§6.2). 재원 부담 주체(<b>{item.fund}</b>)는 정산에 분리 기록됩니다.
                FIVE 개설·판매량은 <b>사업자 Consumer First Ranking에 반영되지 않습니다</b> (§6.3).
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button
                style={{ ...A.btn, opacity: allOk ? 1 : 0.45, cursor: allOk ? "pointer" : "not-allowed" }}
                disabled={!allOk}
                onClick={() => onApprove(item)}
              >
                <BadgeCheck size={15} /> {allOk ? "개설 승인 · 앱에 방 오픈" : `필수 확인 ${FIVE_CHECKS.filter((c) => ck[c.id]).length}/${FIVE_CHECKS.length}`}
              </button>
              <button style={{ ...A.btnSm, borderColor: C.red, color: C.red }} onClick={() => onReject(item)}>
                <X size={14} /> 반려
              </button>
            </div>
          </div>
        ) : (
          <div style={{ ...A.card, color: C.muted, fontSize: 13, textAlign: "center", padding: 40 }}>
            검수할 신청이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

function ApproveView({ queue, approved, onApprove, onReject }) {
  const [sel, setSel] = useState(queue[0]?.id ?? null);
  const [checks, setChecks] = useState({});
  const item = queue.find((q) => q.id === sel) ?? queue[0];
  const ck = checks[item?.id] || {};
  const allOk = item && CHECK_LIST.every((c) => ck[c.id]);
  const setCk = (cid) => setChecks((p) => ({ ...p, [item.id]: { ...(p[item.id] || {}), [cid]: !(p[item.id]?.[cid]) } }));

  return (
    <>
      <PageTitle title="파트너 승인" desc="앱의 '내 사업 시작하기' 제출 건 — 승인 시 앱에 MY BUSINESS가 생성되고 +50CP가 지급됩니다" />
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.muted }}>대기 {queue.length}건</div>
          {queue.map((q) => (
            <div key={q.id} style={{ ...A.card, cursor: "pointer", padding: 12, border: item?.id === q.id ? `1.5px solid ${C.green}` : `1px solid ${C.line}` }} onClick={() => setSel(q.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b style={{ fontSize: 13 }}>{q.name}</b>
                <ChevronRight size={14} color={C.muted} />
              </div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{q.type} · {q.zone}</div>
              <div style={{ color: C.muted, fontSize: 10.5, marginTop: 2 }}>제출 {q.submitted}</div>
            </div>
          ))}
          {queue.length === 0 && <div style={{ ...A.card, color: C.muted, fontSize: 12.5, textAlign: "center" }}>대기 중인 요청이 없습니다.</div>}

          {approved.length > 0 && (
            <>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.muted, marginTop: 10 }}>최근 승인</div>
              {approved.map((a) => (
                <div key={a.id} style={{ ...A.card, padding: 12, background: "rgba(14,90,62,.05)" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <BadgeCheck size={13} color={C.green2} /><b style={{ fontSize: 12.5 }}>{a.name}</b>
                  </div>
                  <div style={{ color: C.muted, fontSize: 10.5, marginTop: 2 }}>승인됨 · {a.at} · MY BUSINESS 활성</div>
                </div>
              ))}
            </>
          )}
        </div>

        {item ? (
          <div style={A.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <b style={{ fontSize: 17 }}>{item.name}</b>
                  <span style={A.badge}><Rocket size={10} /> 신규</span>
                </div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{item.type} · {item.zone} · 신청인 {item.owner}</div>
              </div>
              <span style={{ fontSize: 11, color: C.muted }}>제출 {item.submitted}</span>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 800, margin: "18px 0 8px" }}>AI 구조화 등록 정보</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {Object.entries(item.ai).map(([k, v]) => (
                <div key={k} style={{ background: C.cream, borderRadius: 10, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{k}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            {item.note !== "-" && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, fontSize: 11.5, color: C.muted }}>
                <FileText size={13} /> {item.note}
              </div>
            )}

            <div style={{ fontSize: 12.5, fontWeight: 800, margin: "18px 0 8px" }}>공개 전 필수 확인 (3종)</div>
            {CHECK_LIST.map((c) => (
              <button key={c.id} style={{ ...A.checkRow, borderColor: ck[c.id] ? C.green2 : C.line }} onClick={() => setCk(c.id)}>
                <div style={{ ...A.checkBox, background: ck[c.id] ? C.green2 : "white" }}>{ck[c.id] && <Check size={13} color="white" />}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5 }}>{c.label}</div>
                  <div style={{ color: C.muted, fontSize: 11 }}>{c.desc}</div>
                </div>
                <span style={{ fontSize: 11, color: C.blue, fontWeight: 700 }}>서류 보기</span>
              </button>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button style={{ ...A.btn, flex: 1, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={() => onReject(item)}>
                <X size={14} /> 반려 (사유 통보)
              </button>
              <button style={{ ...A.btn, flex: 2, opacity: allOk ? 1 : 0.4 }} disabled={!allOk} onClick={() => onApprove(item)}>
                <Check size={14} /> 승인 — 앱에 MY BUSINESS 생성 · +50CP 지급
              </button>
            </div>
            <div style={{ fontSize: 10.5, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
              승인 후: Consumer First Ranking으로만 순위 결정 (광고비 미반영) · 초기 discovery boost로 최소 노출 보장 · 리뷰는 실제 예약·결제 이용자만 작성 가능
            </div>
          </div>
        ) : (
          <div style={{ ...A.card, textAlign: "center", color: C.muted, padding: 60 }}>승인 대기 건이 없습니다.</div>
        )}
      </div>
    </>
  );
}

/* ─────────── Zone 관리 ─────────── */

function ZonesView() {
  return (
    <>
      <PageTitle title="Zone 관리" desc="생활권 단위 운영 현황 · discovery boost 배정" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {ZONES_DATA.map((z) => (
          <div key={z.name} style={A.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <b style={{ fontSize: 15 }}>{z.name}</b>
              <span style={{ ...A.badge, background: z.status === "정상 운영" ? "rgba(14,90,62,.1)" : "rgba(198,161,91,.16)", color: z.status === "정상 운영" ? C.green2 : "#8A6A2E" }}>{z.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
              {[["사용자", z.users.toLocaleString()], ["파트너", z.partners], ["일 거래액", z.gmv], ["boost 대상", `${z.boost}곳`]].map(([k, v]) => (
                <div key={k} style={{ background: C.cream, borderRadius: 10, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
              discovery boost: 신규 파트너를 홈 목록 2번째 위치에 노출 (실이용 리뷰 확보 시까지)
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────── 리뷰 · 랭킹 정책 ─────────── */

function ReviewView({ flags, setFlags, showToast }) {
  const act = (id, result) => {
    setFlags((fs) => fs.map((f) => (f.id === id ? { ...f, status: result } : f)));
    showToast(result === "무효 처리" ? "리뷰 무효 처리 · 순위 재계산됩니다" : "정상 리뷰로 확인 처리했습니다");
  };
  const levelColor = { 높음: C.red, 중간: "#8A6A2E", 낮음: C.muted };
  return (
    <>
      <PageTitle title="리뷰 · 랭킹 정책" desc="Consumer First Ranking 파라미터 · Verified Review 이상 탐지" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14 }}>
        <div style={A.card}>
          <b style={{ fontSize: 14 }}>Consumer First Ranking 가중치</b>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>광고비는 어떤 경우에도 순위에 반영되지 않습니다 (정책 고정)</div>
          {RANK_WEIGHTS.map(([k, v]) => (
            <div key={k} style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ fontWeight: 700 }}>{k}</span><b style={{ color: v < 0 ? C.red : C.green2 }}>{v > 0 ? "+" : ""}{v}%</b>
              </div>
              <div style={A.wBg}><div style={{ ...A.wBar, width: `${Math.abs(v) * 2.4}%`, background: v < 0 ? C.red : C.green2 }} /></div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16, fontSize: 11, color: C.muted }}>
            <ShieldCheck size={13} color={C.green2} /> Verified Review = 실제 M4U 예약·결제 이용자만 · 작성 시 +5CP · Contributor 기여점수는 랭킹에 미반영(배지·별도 섹션 노출만)
          </div>
        </div>

        <div style={A.card}>
          <b style={{ fontSize: 14 }}>이상 탐지 플래그</b>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>자동 탐지 규칙: 동일 기기/IP 반복, 미이용 계정 작성 시도, 단시간 대량 작성</div>
          {flags.map((f) => (
            <div key={f.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginTop: 10, opacity: f.status === "대기" ? 1 : 0.55 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <AlertTriangle size={14} color={levelColor[f.level]} />
                  <b style={{ fontSize: 12.5 }}>{f.venue}</b>
                  <span style={{ fontSize: 11, color: C.muted }}>{f.review}</span>
                </div>
                <span style={{ ...A.badge, background: "rgba(180,85,47,.1)", color: levelColor[f.level] }}>위험 {f.level}</span>
              </div>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>{f.reason}</div>
              {f.status === "대기" ? (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button style={{ ...A.btnSm, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={() => act(f.id, "정상 확인")}>정상 확인</button>
                  <button style={{ ...A.btnSm, background: C.red }} onClick={() => act(f.id, "무효 처리")}>리뷰 무효 처리</button>
                </div>
              ) : (
                <div style={{ fontSize: 11.5, fontWeight: 800, color: f.status === "무효 처리" ? C.red : C.green2, marginTop: 8 }}>✓ {f.status} 완료</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────── 정산 · 수수료 (SUPER) ─────────── */

function SettleView({ settle, setSettle, showToast }) {
  const [hostPaid, setHostPaid] = useState(false);
  const pay = (id) => {
    setSettle((s) => s.map((x) => (x.id === id ? { ...x, status: "지급 완료", date: "오늘" } : x)));
    showToast("정산 지급이 실행되었습니다 (데모)");
  };
  return (
    <>
      <PageTitle title="정산 · 수수료" desc="SUPER 전용 · 파트너별 거래액 기반 정산 + Host 추천 보상" />
      <div style={A.card}>
        <b style={{ fontSize: 14 }}>파트너 정산</b>
        <table style={A.table}>
          <thead>
            <tr>
              {["파트너", "월 거래액", "수수료율", "수수료", "지급액", "상태", ""].map((h) => <th key={h} style={A.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {settle.map((s) => {
              const fee = Math.round(s.gmv * (s.fee / 100));
              return (
                <tr key={s.id}>
                  <td style={{ ...A.td, fontWeight: 800 }}>{s.name}</td>
                  <td style={A.td}>{vnd(s.gmv)}</td>
                  <td style={A.td}>{s.fee}%</td>
                  <td style={A.td}>{vnd(fee)}</td>
                  <td style={{ ...A.td, fontWeight: 800 }}>{vnd(s.gmv - fee)}</td>
                  <td style={A.td}>
                    <span style={{ ...A.badge, background: s.status === "지급 완료" ? "rgba(14,90,62,.1)" : "rgba(198,161,91,.16)", color: s.status === "지급 완료" ? C.green2 : "#8A6A2E" }}>{s.status}{s.date !== "-" ? ` · ${s.date}` : ""}</span>
                  </td>
                  <td style={A.td}>
                    {s.status === "지급 대기" && <button style={A.btnSm} onClick={() => pay(s.id)}>지급 실행</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 12, lineHeight: 1.6 }}>
          수수료율은 업종·계약별로 상이 (기본 8%, 마켓형 5%) · 지급 실행은 SUPER 권한 + 2차 승인(실서비스) 전제
        </div>
      </div>

      <div style={{ ...A.card, marginTop: 14 }}>
        <b style={{ fontSize: 14 }}>① Transaction 보상 정산 (Host — 직접 거래 제휴)</b>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>객실 Guest QR 귀속 소비 기반 · 1단계 추천 보상만 허용 (다단계 구조 금지) · 체크인~체크아웃 기간 귀속 · Host 본인 결제 제외</div>
        <table style={A.table}>
          <thead>
            <tr>
              {["Host", "객실", "이용 팀", "Guest Local GMV", "보상률", "Host Reward", "상태", ""].map((h) => <th key={h} style={A.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...A.td, fontWeight: 800 }}>Ocean Residence <span style={{ ...A.badge, marginLeft: 6 }}>★ Recommended Stay</span></td>
              <td style={A.td}>12</td>
              <td style={A.td}>31팀</td>
              <td style={A.td}>{vnd(42800000)}</td>
              <td style={A.td}>2%</td>
              <td style={{ ...A.td, fontWeight: 800 }}>{vnd(856000)}</td>
              <td style={A.td}>
                <span style={{ ...A.badge, background: hostPaid ? "rgba(14,90,62,.1)" : "rgba(198,161,91,.16)", color: hostPaid ? C.green2 : "#8A6A2E" }}>{hostPaid ? "지급 완료 · 오늘" : "지급 대기"}</span>
              </td>
              <td style={A.td}>
                {!hostPaid && <button style={A.btnSm} onClick={() => { setHostPaid(true); showToast("Host 보상 지급 실행 (데모) · 원천징수 처리 포함"); }}>지급 실행</button>}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 10.5, color: C.muted, marginTop: 12, lineHeight: 1.6 }}>
          보상률은 업종별 마진과 현지 규정에 따라 조정 (예시 2%) · 개인 Host 지급 시 베트남 원천징수 처리 · 개별 투숙객 결제 내역은 Host에게 비공개 (집계만 제공)
        </div>
      </div>

      <EcoSettle showToast={showToast} />
    </>
  );
}

function EcoSettle({ showToast }) {
  const [paid, setPaid] = useState(false);
  return (
    <div style={{ ...A.card, marginTop: 14 }}>
      <b style={{ fontSize: 14 }}>② Ecosystem 기여 보상 정산 (Contributor — 신규 유입)</b>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
        재원 = 마케팅 예산 (광고비 대체, 거래 수수료 아님) · 검증 활동 기준(가입→첫 이용→Verified Review) · 유입 기록 영구, 보상은 가입 후 90일 시효 · 1단계 한정 · <b>기여점수는 랭킹에 절대 미반영</b>
      </div>
      <table style={A.table}>
        <thead>
          <tr>{["Contributor", "QR 스캔", "신규 가입", "첫 이용", "Verified", "Score", "기여 보상", "상태", ""].map((h) => <th key={h} style={A.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...A.td, fontWeight: 800 }}>HanCook Korean BBQ <span style={{ ...A.badge, marginLeft: 6 }}>★ Gold</span></td>
            <td style={A.td}>482</td>
            <td style={A.td}>126</td>
            <td style={A.td}>83</td>
            <td style={A.td}>61</td>
            <td style={A.td}>872</td>
            <td style={{ ...A.td, fontWeight: 800 }}>{vnd(186000)} 상당</td>
            <td style={A.td}>
              <span style={{ ...A.badge, background: paid ? "rgba(14,90,62,.1)" : "rgba(198,161,91,.16)", color: paid ? C.green2 : "#8A6A2E" }}>{paid ? "지급 완료 · 오늘" : "지급 대기"}</span>
            </td>
            <td style={A.td}>{!paid && <button style={A.btnSm} onClick={() => { setPaid(true); showToast("Ecosystem 기여 보상 지급 실행 (데모) · 마케팅 예산 차감"); }}>지급 실행</button>}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ fontSize: 10.5, color: C.muted, marginTop: 12, lineHeight: 1.6 }}>
        1인당 보상 상한은 예상 LTV 기준 설정 · 자기 유입(본인·직원 계정) 자동 제외 · 소비자 CP와 파트너 Contribution Score는 장부 분리 (투표 가중치 혼입 금지)
      </div>
    </div>
  );
}

/* ─────────── HRP · CP 발행 (SUPER) ─────────── */

function HrpView({ showToast }) {
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  return (
    <>
      <PageTitle title="HRP · CP 발행" desc="SUPER 전용 · HARU REWARD POINT 발행/소각 및 CP 정책" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={A.card}>
          <b style={{ fontSize: 14 }}>유통 현황</b>
          {HRP_STATS.map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.line}`, fontSize: 12.5 }}>
              <span style={{ color: C.muted }}>{k}</span><b>{v}</b>
            </div>
          ))}
          <div style={{ fontSize: 10.5, color: C.muted, marginTop: 12, lineHeight: 1.7 }}>
            · HRP: 결제·적립용 리워드 포인트 — 추후 유틸리티 토큰 전환 대상<br />
            · CP: 양도·구매 불가 기여 포인트 — 검증 가능 활동만 적립, 투표 가중치<br />
            · 현 단계에서는 코인/토큰 표현을 사용하지 않음 (규제 대응) — Web2 구조로 운영 후 온체인 1:1 이관 전제
          </div>
        </div>
        <div style={A.card}>
          <b style={{ fontSize: 14 }}>발행 요청 (데모)</b>
          <label style={A.fieldLabel}>발행량 (HRP)</label>
          <input style={A.input} placeholder="예) 50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label style={A.fieldLabel}>용도 메모</label>
          <input style={A.input} placeholder="예) 9월 습관 캠페인 보상 재원" value={memo} onChange={(e) => setMemo(e.target.value)} />
          <button
            style={{ ...A.btn, width: "100%", marginTop: 14, opacity: amount.trim() ? 1 : 0.4 }}
            disabled={!amount.trim()}
            onClick={() => { showToast(`발행 요청 접수 · ${Number(amount).toLocaleString()} HRP — 2차 승인 후 반영 (데모)`); setAmount(""); setMemo(""); }}
          >
            발행 요청 제출
          </button>
          <div style={{ fontSize: 10.5, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
            실서비스에서는 발행·소각 모두 감사 로그와 2인 승인(4-eyes)을 거칩니다. CP는 수동 발행이 불가하며 규칙 기반 자동 적립만 허용됩니다.
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────── 신고 · 분쟁 ─────────── */

function DisputeView({ disputes, setDisputes, showToast }) {
  const act = (id, status) => {
    setDisputes((ds) => ds.map((d) => (d.id === id ? { ...d, status } : d)));
    showToast(status === "해결 완료" ? "분쟁 해결 처리되었습니다" : "담당자 배정 · 처리 중으로 전환");
  };
  return (
    <>
      <PageTitle title="신고 · 분쟁" desc="회원 ↔ 파트너 분쟁 · 신고 접수 처리" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {disputes.map((d) => (
          <div key={d.id} style={A.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Flag size={15} color={d.status === "해결 완료" ? C.green2 : C.red} />
                <b style={{ fontSize: 13.5 }}>{d.type}</b>
                <span style={{ fontSize: 11.5, color: C.muted }}>{d.from} → {d.target}</span>
              </div>
              <span style={{ ...A.badge, background: d.status === "해결 완료" ? "rgba(14,90,62,.1)" : d.status === "처리 중" ? "rgba(198,161,91,.16)" : "rgba(180,85,47,.1)", color: d.status === "해결 완료" ? C.green2 : d.status === "처리 중" ? "#8A6A2E" : C.red }}>{d.status}</span>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{d.desc}</div>
            {d.status !== "해결 완료" && (
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {d.status === "대기" && <button style={{ ...A.btnSm, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={() => act(d.id, "처리 중")}>담당자 배정</button>}
                <button style={A.btnSm} onClick={() => act(d.id, "해결 완료")}>해결 완료 처리</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────── 공용 ─────────── */

function PageTitle({ title, desc }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{title}</div>
      <div style={{ color: C.muted, fontSize: 12.5, marginTop: 3 }}>{desc}</div>
    </div>
  );
}

/* ─────────── 스타일 ─────────── */

const A = {
  page: { minHeight: "100vh", display: "flex", background: C.cream, fontFamily: 'Inter, Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: C.text },
  sidebar: { width: 220, background: `linear-gradient(180deg, ${C.green}, ${C.dark})`, display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" },
  brandBox: { padding: "22px 18px 6px" },
  brand: { color: C.gold, fontFamily: "Georgia, serif", fontSize: 26, letterSpacing: 1, fontWeight: 700 },
  brandSub: { color: "rgba(255,255,255,.6)", fontSize: 10, letterSpacing: 4, fontWeight: 700, marginTop: 2 },
  navBtn: { display: "flex", gap: 10, alignItems: "center", border: 0, borderRadius: 10, padding: "11px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" },
  navBadge: { background: C.gold, color: "#2B1F0A", fontSize: 10, fontWeight: 800, borderRadius: 999, padding: "2px 7px" },

  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar: { display: "flex", gap: 16, alignItems: "center", padding: "14px 24px", background: C.ivory, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, zIndex: 10 },
  searchInput: { flex: 1, maxWidth: 420, border: 0, outline: "none", background: "transparent", fontSize: 13 },
  roleBox: { display: "flex", gap: 6, alignItems: "center", background: C.cream, border: `1px solid ${C.line}`, borderRadius: 999, padding: "6px 12px" },
  roleSelect: { border: 0, background: "transparent", fontSize: 12, fontWeight: 800, outline: "none", color: C.text, cursor: "pointer" },
  userChip: { width: 32, height: 32, borderRadius: "50%", background: C.green, color: C.gold, fontWeight: 800, fontSize: 13, display: "grid", placeItems: "center" },
  content: { padding: 24, maxWidth: 1180, width: "100%", margin: "0 auto" },

  kpiRow: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 },
  kpiCard: { background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 },
  card: { background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16 },
  badge: { display: "inline-flex", gap: 4, alignItems: "center", background: "rgba(198,161,91,.16)", color: "#8A6A2E", fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: "4px 9px", whiteSpace: "nowrap" },
  btn: { display: "inline-flex", gap: 6, alignItems: "center", justifyContent: "center", background: C.green, color: "white", border: 0, borderRadius: 10, padding: "11px 16px", fontWeight: 800, fontSize: 13, cursor: "pointer" },
  btnSm: { display: "inline-flex", gap: 5, alignItems: "center", background: C.green, color: "white", border: 0, borderRadius: 8, padding: "8px 12px", fontWeight: 800, fontSize: 11.5, cursor: "pointer" },
  checkRow: { width: "100%", display: "flex", gap: 12, alignItems: "center", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 8, cursor: "pointer" },
  checkBox: { width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${C.green2}`, display: "grid", placeItems: "center", flexShrink: 0 },

  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 11, color: C.muted, fontWeight: 800, padding: "8px 10px", borderBottom: `1px solid ${C.line}` },
  td: { fontSize: 12.5, padding: "11px 10px", borderBottom: `1px solid ${C.line}` },

  wBg: { height: 6, borderRadius: 999, background: "#E6E0D6", marginTop: 5, overflow: "hidden" },
  wBar: { height: "100%" },

  fieldLabel: { display: "block", fontSize: 10.5, fontWeight: 800, color: C.green, margin: "12px 0 4px", letterSpacing: 0.4 },
  input: { width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: "white", outline: "none" },

  toast: { position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", background: C.green, color: "white", borderRadius: 999, padding: "11px 20px", fontSize: 13, fontWeight: 700, display: "flex", gap: 7, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,.25)", zIndex: 100, whiteSpace: "nowrap" },
};

export default App;
