/**
 * 홈 — 마스터 UI 기준 화면 (디자인 변경 금지, 텍스트는 전부 L() 경유)
 */
import React from "react";
import { Building2, Footprints, Scissors, Car, Sparkles, Gift, Star } from "lucide-react";
import { Card, Head, Zone, Tile } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

export default function Home({ lang, zone, steps, goal, go }) {
  const left = Math.max(0, goal - steps);
  const pct = Math.min(100, Math.round((steps / goal) * 100));
  return (
    <>
      <Head k="M4U" title="Good evening" sub={L(lang, "오늘도 나를 위한 좋은 하루", "Một ngày tốt lành dành cho bạn")} />
      <Zone name={zone} />
      <Card c="hero" onClick={() => go("habit")}>
        <div>
          <em>MY DAY</em>
          <h2>{L(lang, `오늘 ${num(steps, lang)}걸음 걸었어요`, `Hôm nay bạn đã đi ${num(steps, lang)} bước`)}</h2>
          <p>{L(lang, `목표까지 ${num(left, lang)}걸음 · +70 HRP`, `Còn ${num(left, lang)} bước · +70 HRP`)}</p>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
        </div>
        <strong>{pct}%</strong>
      </Card>
      <div className="grid">
        <Tile icon={<Building2 />} title="Living" sub={L(lang, "우리동네", "Khu tôi ở")} onClick={() => go("living")} />
        <Tile icon={<Footprints />} title="Habit" sub={L(lang, "오늘습관", "Thói quen")} onClick={() => go("habit")} />
        <Tile icon={<Scissors />} title="Salon" sub={L(lang, "뷰티·케어", "Làm đẹp")} onClick={() => go("salon")} />
        {/* Move는 별도 탭이 없다 — Living의 MOVE 카테고리로 이동 */}
        <Tile icon={<Car />} title="Move" sub={L(lang, "카트·이동", "Di chuyển")} onClick={() => go("living")} />
      </div>
      <Card c="ai">
        <Sparkles />
        <div>
          <small>M4U AI CONCIERGE</small>
          <h2>{L(lang, "무엇을 도와드릴까요?", "Tôi có thể giúp gì cho bạn?")}</h2>
          <p>{L(lang, "“한식당 예약하고 카트도 불러줘.”", "“Đặt nhà hàng Hàn Quốc và gọi xe điện giúp tôi.”")}</p>
        </div>
      </Card>
      <h3 className="section">{L(lang, "오늘의 혜택", "Ưu đãi hôm nay")}</h3>
      <div className="twocol">
        {/* 지갑 화면은 H06-⑥ — 그전까지 HRP 잔액이 있는 MY로 보낸다 */}
        <Card onClick={() => go("my")}>
          <Gift />
          <h2>+420 HRP</h2>
          <p>{L(lang, "오늘 받을 수 있어요", "Có thể nhận hôm nay")}</p>
        </Card>
        <Card onClick={() => go("salon")}>
          <Star />
          <h2>Salon 10%</h2>
          <p>{L(lang, "MY ZONE 혜택", "Ưu đãi MY ZONE")}</p>
        </Card>
      </div>
    </>
  );
}
