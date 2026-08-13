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
import My from "./screens/My.jsx";
import { L, zoneName } from "./i18n.js";
import { ZONES } from "./data.js";
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
  const [sub, setSub] = useState(null); // Living 서브 화면: {name, ...params}
  const [steps] = useState(3200);
  const [points, setPoints] = useState(HRP_START); // 예약 적립이 쌓이는 지갑 잔액
  const [likes, setLikes] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);

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
    window.history.replaceState({ m4u: { stage: saved?.onboarded ? "app" : "lang", overlay: null, sub: null } }, "");
    const onPop = (e) => {
      const s = e.state?.m4u;
      if (!s) return;
      setStage(s.stage);
      setOverlay(s.overlay ?? null);
      setSub(s.sub ?? null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [saved]);

  const go = (nextStage, nextOverlay = null) => {
    window.history.pushState({ m4u: { stage: nextStage, overlay: nextOverlay, sub: null } }, "");
    setStage(nextStage);
    setOverlay(nextOverlay);
    setSub(null);
  };
  const closeOverlay = () => window.history.back(); // 뒤로가기와 같은 경로로 닫는다

  // 서브 화면(카테고리·매장·예약)은 히스토리에 쌓아 브라우저 뒤로가기로 닫힌다
  const goSub = (name, params = {}) => {
    const next = { name, ...params };
    window.history.pushState({ m4u: { stage: "app", overlay: null, sub: next } }, "");
    setSub(next);
  };
  const closeSub = () => window.history.back();
  // 탭 전환은 열린 서브 화면을 닫는다 (v10 동작 유지)
  const setTab = (id) => {
    if (sub) window.history.back();
    setTabState(id);
  };
  const toast = (msg) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2200);
  };
  const toggleLike = (id) => setLikes((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const confirmBooking = (b) => {
    setPoints((p) => p + b.point); // 적립은 검증 가능한 활동에만 (POLICY §3·§4)
    toast(L(lang, `예약 완료 · +${b.point} HRP · +${b.cp} CP`, `Đặt lịch xong · +${b.point} HRP · +${b.cp} CP`));
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
  const subScreens = {
    cat: <Category lang={lang} catId={sub?.catId} onBack={closeSub} goSub={goSub} toast={toast} />,
    venue: <Venue lang={lang} venueId={sub?.venueId} onBack={closeSub} goSub={goSub} liked={likes.includes(sub?.venueId)} toggleLike={toggleLike} />,
    book: <Book lang={lang} venueId={sub?.venueId} serviceId={sub?.serviceId} onBack={closeSub} onDone={closeSub} confirmBooking={confirmBooking} />,
  };
  const screens = {
    home: <Home lang={lang} zone={zone} steps={steps} goal={STEP_GOAL} points={points} go={setTab} />,
    living: <Living lang={lang} zone={zone} go={setTab} goSub={goSub} />,
    habit: <Habit lang={lang} steps={steps} goal={STEP_GOAL} />,
    salon: <Salon lang={lang} />,
    my: <My lang={lang} zone={zone} points={points} onMenu={openReset} />,
  };
  return (
    <div className="shell">
      <main>{sub ? subScreens[sub.name] : screens[tab]}</main>
      {toastMsg && <div className="toast"><Check size={15} /> {toastMsg}</div>}
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
