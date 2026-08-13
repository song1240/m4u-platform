/**
 * 온보딩 3화면 — ① 언어 선택 → ② 소개 → ③ MY ZONE 선택 (H06 이식 ①)
 * 디자인: 마스터 UI 다크 캔버스 패턴 (docs/DESIGN_SYSTEM.md §4.1) — 신규 인라인 스타일 없음
 * 기능·정책: v10 src/App.jsx 의 LangSelect / Onboarding / ZoneSelectScreen
 */
import React from "react";
import { MapPin, Check, ChevronRight, ChevronLeft, Building2, CalendarCheck, Star } from "lucide-react";
import { Btn } from "../components.jsx";
import { L, zoneName } from "../i18n.js";
import { ZONES, LANGS } from "../data.js";
import "../style.css";

/** 소개 화면 3가지 가치 — 소비자 루프(생활 → 이용 → Verified Review) 요약 */
const VALUES = [
  { icon: <Building2 size={17} />, ko: ["우리동네", "식당 · 카페 · 이동 · 숙박"], vi: ["Khu bạn ở", "Ẩm thực · di chuyển · lưu trú"] },
  { icon: <CalendarCheck size={17} />, ko: ["예약 · 결제", "한 번에 간편하게"], vi: ["Đặt chỗ · thanh toán", "Nhanh gọn một chạm"] },
  { icon: <Star size={17} />, ko: ["믿을 수 있는 리뷰", "실제 이용자만 작성"], vi: ["Đánh giá tin cậy", "Chỉ người đã dùng mới viết"] },
];

/* ── 공통 셸 (하단 네비 없음 · 3단계 진행 표시) ── */
const Frame = ({ step, onBack, children }) => (
  <div className="shell solo">
    <div className="onboard">
      <div className="obtop">
        {onBack ? (
          <button className="back" onClick={onBack}>
            <ChevronLeft size={18} />
          </button>
        ) : (
          <span />
        )}
        <div className="dots">
          {[0, 1, 2].map((i) => (
            <i key={i} className={i === step ? "on" : ""} />
          ))}
        </div>
      </div>
      {children}
    </div>
  </div>
);

const Brandmark = () => (
  <div className="brandmark">
    <b>M4U</b>
    <span>LIVING</span>
  </div>
);

/* ── ① 언어 선택 — 선택 전이므로 두 언어를 함께 노출 ── */
function LangScreen({ onPick }) {
  return (
    <Frame step={0}>
      <div className="mid">
        <Brandmark />
        <p className="center">언어를 선택해 주세요 · Vui lòng chọn ngôn ngữ</p>
        <div className="opts">
          {LANGS.map((l) => (
            <button key={l.id} className="opt" onClick={() => onPick(l.id)}>
              <span className="flag">{l.flag}</span>
              <div>
                <b>{l.name}</b>
                <small>{l.desc}</small>
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ── ② 소개 ── */
function IntroScreen({ lang, onNext, onBack }) {
  return (
    <Frame step={1} onBack={onBack}>
      <div className="mid">
        <Brandmark />
        <h1 className="center">{L(lang, <>내 생활이<br />혜택이 되는 곳</>, <>Nơi cuộc sống<br />trở thành lợi ích</>)}</h1>
        <p className="center">{L(lang, "빈홈 그랜드 파크의 생활 · 습관 · 뷰티가 하나로 이어집니다.", "Sinh hoạt · thói quen · làm đẹp tại Vinhomes Grand Park kết nối làm một.")}</p>
        <div className="values">
          {VALUES.map((v) => {
            const [title, sub] = L(lang, v.ko, v.vi);
            return (
              <div key={title}>
                <i>{v.icon}</i>
                <b>{title}</b>
                <p>{sub}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="obfoot">
        <Btn c="gold" onClick={onNext}>{L(lang, "시작하기", "Bắt đầu")}</Btn>
        <button className="ghost" onClick={onNext}>{L(lang, "먼저 둘러보기", "Xem trước")}</button>
      </div>
    </Frame>
  );
}

/* ── ③ MY ZONE 선택 — 생활권이 이후 모든 화면의 기준이 된다 ── */
function ZoneScreen({ lang, zoneIdx, setZoneIdx, onDone, onBack }) {
  return (
    <Frame step={2} onBack={onBack}>
      <div className="mid">
        <em>MY ZONE</em>
        <h1>{L(lang, <>지금 생활하는<br />지역을 선택해 주세요</>, <>Chọn khu vực bạn<br />đang sinh sống</>)}</h1>
        <p>{L(lang, "식당 · 살롱 · 이동 · 습관 정보가 이 지역 기준으로 구성됩니다.", "Ẩm thực · salon · di chuyển · thói quen sẽ hiển thị theo khu vực này.")}</p>
        <div className="opts">
          {ZONES.map((z, i) => (
            <button key={z.vi} className={"opt" + (zoneIdx === i ? " on" : "")} onClick={() => setZoneIdx(i)}>
              <MapPin size={17} />
              <div>
                <b>{zoneName(z, lang)}</b>
                <small>{z.city}</small>
              </div>
              {zoneIdx === i && <Check size={16} className="ck" />}
            </button>
          ))}
        </div>
      </div>
      <div className="obfoot">
        <Btn c="gold" onClick={onDone}>{L(lang, "이 지역에서 시작하기", "Bắt đầu tại khu vực này")}</Btn>
        <p className="center">{L(lang, "MY 탭에서 언제든 변경할 수 있어요", "Có thể đổi bất cứ lúc nào trong tab MY")}</p>
      </div>
    </Frame>
  );
}

/** stage: "lang" → "intro" → "zone" → (onDone) 앱 진입 */
export default function Onboarding({ stage, setStage, lang, setLang, zoneIdx, setZoneIdx, onDone }) {
  if (stage === "lang")
    return <LangScreen onPick={(id) => { setLang(id); setStage("intro"); }} />;
  if (stage === "intro")
    return <IntroScreen lang={lang} onNext={() => setStage("zone")} onBack={() => setStage("lang")} />;
  return <ZoneScreen lang={lang} zoneIdx={zoneIdx} setZoneIdx={setZoneIdx} onDone={onDone} onBack={() => setStage("intro")} />;
}
