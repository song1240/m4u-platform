/**
 * MASTER UI 공용 컴포넌트 — 모든 화면이 재사용한다 (docs/DESIGN_SYSTEM.md §4).
 * 독자적 재디자인·인라인 스타일 금지. 새 패턴은 DESIGN_SYSTEM.md → style.css → 이 파일 순서로 추가.
 */
import React from "react";
import { MapPin, ChevronRight, ChevronLeft, ShieldCheck, X } from "lucide-react";
import "./style.css";

/** onClick을 주면 클릭 가능한 카드(button)로 렌더 — 시각은 동일 (DESIGN_SYSTEM §4) */
export const Card = ({ children, c = "", onClick }) =>
  onClick ? (
    <button className={"card " + c} onClick={onClick}>{children}</button>
  ) : (
    <div className={"card " + c}>{children}</div>
  );

/** 주 CTA — 화면당 1개. c="gold" 는 다크 캔버스 전용 (DESIGN_SYSTEM §4.1) */
export const Btn = ({ children, onClick, c = "" }) => (
  <button className={"primary " + c} onClick={onClick}>
    {children}
    <ChevronRight size={15} />
  </button>
);

export const Head = ({ k, title, sub }) => (
  <header>
    <small>{k}</small>
    <h1>{title}</h1>
    <p>{sub}</p>
  </header>
);

export const Zone = ({ name }) => (
  <div className="zone">
    <MapPin size={13} /> {name}
  </div>
);

export const Tile = ({ icon, title, sub, onClick }) => (
  <button className="tile" onClick={onClick}>
    <i>{icon}</i>
    <b>{title}</b>
    <span>{sub}</span>
  </button>
);

/* ── Living 패턴 공용 (DESIGN_SYSTEM §4.3) ── */

/** 서브 화면 상단 바 — 뒤로 + 제목 */
export const SubHead = ({ title, onBack }) => (
  <div className="subhead">
    <button className="bk" onClick={onBack}><ChevronLeft size={20} /></button>
    <b>{title}</b>
  </div>
);

/** 뱃지 — kind: rank | new | ok | st */
export const Tag = ({ kind = "ok", children }) => <span className={"tag " + kind}>{children}</span>;

/** 정책 고지 카드 — 광고비 미반영·Verified 조건 등 상시 노출 */
export const Note = ({ children }) => (
  <div className="note">
    <ShieldCheck size={17} />
    <p>{children}</p>
  </div>
);

/** 빈 상태 — "준비 중" 안내 (특정 파트너 홍보 금지, POLICY §1) */
export const Empty = ({ icon, children }) => (
  <div className="empty">
    {icon && <i>{icon}</i>}
    {children}
  </div>
);

/** 하단 고정 CTA 바 */
export const CtaBar = ({ children }) => <div className="ctabar">{children}</div>;

/** 확인 바텀시트 */
export const Sheet = ({ title, onClose, children }) => (
  <div className="sheetbd" onClick={onClose}>
    <div className="sheet" onClick={(e) => e.stopPropagation()}>
      <div className="sheet-hd">
        <b>{title}</b>
        <button onClick={onClose}><X size={18} /></button>
      </div>
      {children}
    </div>
  </div>
);

/** 명세행 — 결제·적립 내역 */
export const Spec = ({ rows }) => (
  <div className="spec">
    {rows.map((r) => (
      <div key={r.k} className={"r" + (r.total ? " total" : "")}>
        <span>{r.k}</span>
        {r.earn ? <b className="earn">{r.v}</b> : <b>{r.v}</b>}
      </div>
    ))}
  </div>
);

/**
 * 카운트다운 — 남은 시간을 1분 간격으로 갱신한다 (FIVE 모집 마감 · 투표 마감).
 * 기준 시각은 마운트 시점 + endsInH 로 잡는다 (데모 데이터가 상대 시간이라).
 */
export const Countdown = ({ hours, lang }) => {
  const [end] = React.useState(() => Date.now() + hours * 3600e3);
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(t);
  }, []);
  const left = Math.max(0, end - now);
  const d = Math.floor(left / 86400e3);
  const h = Math.floor((left % 86400e3) / 3600e3);
  const m = Math.floor((left % 3600e3) / 60000);
  const txt = d > 0
    ? (lang === "ko" ? `${d}일 ${h}시간 ${m}분` : `${d} ngày ${h} giờ ${m} phút`)
    : (lang === "ko" ? `${h}시간 ${m}분` : `${h} giờ ${m} phút`);
  return <span className={"count" + (left < 24 * 3600e3 ? " urgent" : "")}>{txt}</span>;
};
