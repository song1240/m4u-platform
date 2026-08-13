/**
 * M4U MASTER UI — 공식 디자인 기준 (셸 + 앱 상태)
 * Forest #073B2B · Ivory #F7F3EA · Champagne Gold #C6A15B · DM Serif Display 헤드라인
 * 화면은 screens/ 아래로 분리한다. 컴포넌트·CSS 클래스는 components.jsx / style.css 재사용,
 * 독자적 재디자인 금지 (docs/DESIGN_SYSTEM.md).
 */
import React, { useState, useEffect } from "react";
import { Home as HomeIcon, Building2, Activity, Sparkles, User } from "lucide-react";
import Onboarding from "./screens/Onboarding.jsx";
import Home from "./screens/Home.jsx";
import Living from "./screens/Living.jsx";
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

/** 걷기 목표 — 데모 자리표시자 (v10은 10,000. 기준 확정 전 임의 변경 금지 — CLAUDE.md §6) */
const STEP_GOAL = 6000;

export default function App() {
  const [stage, setStage] = useState("lang"); // lang → intro → zone → app
  const [lang, setLang] = useState("ko");
  const [zoneIdx, setZoneIdx] = useState(0);
  const [tab, setTab] = useState("home");
  const [steps] = useState(3200);

  // 스크린리더·번역기가 올바른 언어로 읽도록 문서 언어를 동기화
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  if (stage !== "app")
    return <Onboarding stage={stage} setStage={setStage} lang={lang} setLang={setLang} zoneIdx={zoneIdx} setZoneIdx={setZoneIdx} onDone={() => setStage("app")} />;

  const zone = zoneName(ZONES[zoneIdx], lang);
  const screens = {
    home: <Home lang={lang} zone={zone} steps={steps} goal={STEP_GOAL} />,
    living: <Living lang={lang} zone={zone} />,
    habit: <Habit lang={lang} steps={steps} goal={STEP_GOAL} />,
    salon: <Salon lang={lang} />,
    my: <My lang={lang} zone={zone} />,
  };
  return (
    <div className="shell">
      <main>{screens[tab]}</main>
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
