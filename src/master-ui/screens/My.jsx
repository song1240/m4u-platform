/**
 * MY — 프로필·지갑·설정·파트너 진입. 앱 분리 없이 파트너 모드로 전환 (POLICY §8).
 */
import React from "react";
import { ChevronRight } from "lucide-react";
import { Card, Btn, Head } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

// ready: 실제 동작하는 항목만 클릭을 받는다 (나머지는 H06 ⑥⑦에서 연결)
const MENUS = [
  { id: "orders", ko: "예약 · 주문", vi: "Đặt chỗ · đơn hàng" },
  { id: "reviews", ko: "내 리뷰", vi: "Đánh giá của tôi" },
  { id: "coupons", ko: "쿠폰 · 혜택", vi: "Ưu đãi · phiếu giảm giá" },
  { id: "zone", ko: "MY ZONE 설정", vi: "Cài đặt MY ZONE", ready: true },
  { id: "lang", ko: "언어 · AI 통역", vi: "Ngôn ngữ · phiên dịch AI", ready: true },
];

export default function My({ lang, zone, onMenu }) {
  return (
    <>
      <Head k="M4U MY" title={L(lang, "나의 M4U", "M4U của tôi")} sub={L(lang, "생활 · 습관 · 혜택을 한 곳에서", "Sinh hoạt · thói quen · ưu đãi trong một nơi")} />
      <Card c="profile">
        <div className="avatar">M</div>
        <div>
          <h2>GOLD MEMBER</h2>
          <p>{zone}</p>
        </div>
      </Card>
      <Card c="wallet">
        <small>M4U POINT · HRP</small>
        <h1>{num(125800, lang)} HRP</h1>
        <p>{L(lang, `이번 달 적립 +${num(4280, lang)} HRP`, `Tích lũy tháng này +${num(4280, lang)} HRP`)}</p>
      </Card>
      <h3 className="section">MY</h3>
      {MENUS.map((m) => (
        <button key={m.id} className="menu" onClick={m.ready && onMenu ? () => onMenu(m.id) : undefined}>
          {L(lang, m.ko, m.vi)}
          <ChevronRight size={16} />
        </button>
      ))}
      <h3 className="section">M4U PARTNER</h3>
      <Card>
        <em>BUSINESS</em>
        <h2>{L(lang, "내 생활권에서 사업하기", "Kinh doanh trong khu bạn ở")}</h2>
        <p>{L(lang, "카트·식당·Salon·Shop. AI에게 말하면 등록 초안을 만들어드려요.", "Xe điện · nhà hàng · salon · cửa hàng. Nói với AI, bản nháp đăng ký sẽ được tạo.")}</p>
        <Btn>{L(lang, "내 사업 시작하기", "Bắt đầu kinh doanh")}</Btn>
      </Card>
    </>
  );
}
