/**
 * Habit — 오늘 습관. 검증형(걷기)만 CP, 셀프 체크는 소액 HRP (POLICY §5).
 */
import React from "react";
import { Footprints, Waves, Droplets, Sparkles } from "lucide-react";
import { Card, Btn, Head, Tile } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

export default function Habit({ lang, steps, goal }) {
  const pct = Math.min(100, Math.round((steps / goal) * 100));
  return (
    <>
      <Head k="M4U HABIT" title={L(lang, "작은 습관이 내일을 바꿔요", "Thói quen nhỏ đổi thay ngày mai")} sub={L(lang, "오늘의 나를 위한 건강 루틴", "Thói quen khỏe mạnh cho hôm nay")} />
      <Card c="hero">
        <div>
          <em>{L(lang, "오늘 걷기", "Đi bộ hôm nay")}</em>
          <h2>{num(steps, lang)} / {num(goal, lang)}</h2>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
          <p>{L(lang, "2.4 km · 32분", "2,4 km · 32 phút")}</p>
        </div>
        <strong>{pct}%</strong>
      </Card>
      <div className="grid">
        <Tile icon={<Footprints />} title={L(lang, "걷기", "Đi bộ")} sub="+70 HRP" />
        <Tile icon={<Waves />} title={L(lang, "수영", "Bơi")} sub={L(lang, "주 3회", "3 lần/tuần")} />
        <Tile icon={<Droplets />} title={L(lang, "물마시기", "Uống nước")} sub="5/7" />
        <Tile icon={<Sparkles />} title={L(lang, "명상", "Thiền")} sub={L(lang, "10분", "10 phút")} />
      </div>
      <h3 className="section">{L(lang, "습관 챌린지", "Thử thách thói quen")}</h3>
      <Card>
        <h2>{L(lang, "🏃 30일 달리기", "🏃 Chạy bộ 30 ngày")}</h2>
        <p>{L(lang, "12/30 완료 · 꾸준히 이어가고 있어요.", "Hoàn thành 12/30 · Bạn đang duy trì rất tốt.")}</p>
        <div className="bar"><i style={{ width: "40%" }} /></div>
        <em>+300 HRP</em>
      </Card>
      <Card c="space">
        <h2>🧘 Mindful Garden</h2>
        <p>{L(lang, "도보 8분 · 오늘 19:30 명상 클래스", "Đi bộ 8 phút · Lớp thiền 19:30 hôm nay")}</p>
        <Btn>{L(lang, "명상 예약하기", "Đặt lớp thiền")}</Btn>
      </Card>
    </>
  );
}
