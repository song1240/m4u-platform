/**
 * Living — 우리동네(먹고·이동하고·머무는 것). 마스터 UI 기준 화면.
 */
import React from "react";
import { Utensils, Car, Building2, Sparkles } from "lucide-react";
import { Card, Btn, Head, Zone, Tile } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

/** M4U Selected — Consumer First Ranking 기준 노출 (광고비 반영 금지, POLICY §1) */
const PLACES = [
  { pic: "🍜", name: "HanCook Korean BBQ", walk: 300, reward: 10 },
  { pic: "☕", name: "The Coffee House", walk: 450, reward: 9 },
  { pic: "✨", name: "M4U Salon & Spa", walk: 600, reward: 8 },
];

export default function Living({ lang, zone }) {
  return (
    <>
      <Head k="M4U LIVING" title={L(lang, "우리동네를 더 가깝게", "Khu bạn ở, gần hơn")} sub={L(lang, "먹고 · 이동하고 · 머무는 모든 것", "Ăn uống · di chuyển · lưu trú")} />
      <Zone name={zone} />
      <div className="grid">
        <Tile icon={<Utensils />} title="EAT" sub={L(lang, "맛집·카페", "Quán ăn · cà phê")} />
        <Tile icon={<Car />} title="MOVE" sub={L(lang, "전기카트", "Xe điện")} />
        <Tile icon={<Building2 />} title="STAY" sub={L(lang, "숙박", "Lưu trú")} />
        <Tile icon={<Sparkles />} title="LOCAL" sub={L(lang, "체험", "Trải nghiệm")} />
      </div>
      <Card>
        <em>{L(lang, "3분 거리", "Cách 3 phút")}</em>
        <h2>🛺 Electric Cart</h2>
        <p>Ocean Residence → Korean BBQ</p>
        <b>{num(20000, lang)} VND</b>
        <Btn>{L(lang, "지금 호출", "Gọi ngay")}</Btn>
      </Card>
      <h3 className="section">M4U Selected</h3>
      {PLACES.map((p) => (
        <Card c="row" key={p.name}>
          <span className="pic">{p.pic}</span>
          <div>
            <b>{p.name}</b>
            <p>★ 4.9 · Verified · {p.walk}m</p>
            <em>{p.reward}% Reward</em>
          </div>
        </Card>
      ))}
    </>
  );
}
