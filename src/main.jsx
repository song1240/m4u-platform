import React from "react";
import { createRoot } from "react-dom/client";
import MasterUI from "./master-ui/MasterUI.jsx";
import LegacyApp from "./App.jsx";
import Admin from "./admin/Admin.jsx";

/**
 * 라우팅 (해시 기반)
 *   /            → MASTER UI  — 공식 디자인 기준 (새 화면은 여기서 시작)
 *   /#legacy     → v10 기능 프로토타입 — 기능·플로우 참조용 (디자인 이전 버전)
 *   /#admin      → 본사 Admin Web
 */
const pick = () => {
  if (window.location.hash === "#admin") return <Admin />;
  if (window.location.hash === "#legacy") return <LegacyApp />;
  return <MasterUI />;
};
const root = createRoot(document.getElementById("root"));
const render = () => root.render(pick());
window.addEventListener("hashchange", render);
render();
