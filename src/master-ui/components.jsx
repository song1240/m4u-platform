/**
 * MASTER UI 공용 컴포넌트 — 모든 화면이 재사용한다 (docs/DESIGN_SYSTEM.md §4).
 * 독자적 재디자인·인라인 스타일 금지. 새 패턴은 DESIGN_SYSTEM.md → style.css → 이 파일 순서로 추가.
 */
import React from "react";
import { MapPin, ChevronRight } from "lucide-react";
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
