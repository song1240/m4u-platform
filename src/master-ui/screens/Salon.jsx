/**
 * Salon — 뷰티·케어. 의료성 표현 금지: "피부 분석 / 뷰티 프로필" 표기 (POLICY §5).
 */
import React from "react";
import { Scissors, Sparkles, Star, Gift } from "lucide-react";
import { Card, Btn, Head, Tile } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

export default function Salon({ lang }) {
  return (
    <>
      <Head k="M4U SALON" title="Beauty, made personal." sub={L(lang, "가까운 뷰티·케어를 나에게 맞게", "Làm đẹp gần bạn, theo cách của bạn")} />
      <div className="salonhero">
        <div>
          <em>M4U SELECTED</em>
          <h1>M4U Salon & Spa</h1>
          <p>Hair · Nail · Skin · Spa · ★4.9</p>
        </div>
      </div>
      <div className="grid">
        <Tile icon={<Scissors />} title="Hair" sub={L(lang, "헤어", "Tóc")} />
        <Tile icon={<Sparkles />} title="Skin" sub={L(lang, "스킨", "Da")} />
        <Tile icon={<Star />} title="Nail" sub={L(lang, "네일", "Móng")} />
        <Tile icon={<Gift />} title="Spa" sub={L(lang, "케어", "Chăm sóc")} />
      </div>
      <h3 className="section">For You</h3>
      <Card>
        <em>AI PICK</em>
        <h2>Glow Skin & Spa</h2>
        <p>{L(lang, "지난 뷰티 프로필을 바탕으로 추천했어요.", "Gợi ý dựa trên hồ sơ làm đẹp trước đây của bạn.")}</p>
        <b>{num(950000, lang)} VND</b>
        <Btn>{L(lang, "예약하기", "Đặt lịch")}</Btn>
      </Card>
    </>
  );
}
