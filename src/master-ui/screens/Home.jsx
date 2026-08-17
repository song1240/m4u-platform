/**
 * 홈 — 프로덕션 홈 패턴 (DESIGN_SYSTEM §4.2, 레퍼런스: M4U 프리미엄 목업)
 * 이동 흐름은 리디자인 전과 동일: MY DAY→Habit, 퀵엔트리→Living/Habit/Salon/Living(Move),
 * 혜택→MY/Salon, 프로모·인기 상점→Living. AI 카드는 진입점 미확정(P1-6)으로 표시만.
 * 사진은 Unsplash 임시 소스 (HANDOFF 메모 — 실서비스 전 실사 교체).
 */
import React from "react";
import { MapPin, Building2, Footprints, Scissors, Car, Sparkles, ChevronRight } from "lucide-react";
import { Card } from "../components.jsx";
import { L, num, greeting } from "../i18n.js";
import "../style.css";

const IMG = {
  cart: "https://images.unsplash.com/photo-1548099212-9e653bfa85ca?auto=format&fit=crop&w=700&q=70",
  dine: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=70",
  spa: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=500&q=70",
  bbq: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=70",
  cafe: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=70",
  salon: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=500&q=70",
  stay: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=70",
};

/** MY ZONE 인기 — Consumer First Ranking 노출 (광고비 미반영, POLICY §1) */
const PLACES = [
  { img: IMG.bbq, name: "HanCook Korean BBQ", rate: 4.9, walk: 3, reward: 10 },
  { img: IMG.cafe, name: "The Coffee House", rate: 4.8, walk: 5, reward: 9 },
  { img: IMG.salon, name: "M4U Salon & Spa", rate: 4.9, walk: 7, reward: 8 },
  { img: IMG.stay, name: "Grand Park Residence", rate: 4.7, walk: 9, reward: 5 },
];

export default function Home({ lang, zone, steps, goal, points, go, goSub, onAi }) {
  const left = Math.max(0, goal - steps);
  const pct = Math.min(100, Math.round((steps / goal) * 100));
  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>LIVING</span></div>
        <div className="zonechip"><MapPin size={12} /> {zone}</div>
      </div>

      <div className="greet">
        <div>
          <h1>{greeting(lang)}</h1>
          <p>{L(lang, "오늘도 나를 위한 좋은 하루", "Một ngày tốt lành dành cho bạn")}</p>
        </div>
        <button className="hrpchip" onClick={() => goSub("wallet")}>
          <i>M</i>
          <div>
            <b>{num(points, lang)}</b>
            <span>HRP</span>
          </div>
        </button>
      </div>

      <button className="mrow" onClick={() => go("habit")}>
        <i className="ic"><Footprints size={18} /></i>
        <div className="mid">
          <b>{L(lang, `오늘 ${num(steps, lang)}걸음`, `Hôm nay ${num(steps, lang)} bước`)}</b>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
          <p>{L(lang, `목표까지 ${num(left, lang)}걸음 · +70 HRP`, `Còn ${num(left, lang)} bước · +70 HRP`)}</p>
        </div>
        <strong>{pct}%</strong>
        <ChevronRight size={16} className="chev" />
      </button>

      <div className="qrow">
        <button className="q" onClick={() => go("living")}><i><Building2 size={22} /></i><b>Living</b><span>{L(lang, "우리동네", "Khu tôi ở")}</span></button>
        <button className="q" onClick={() => go("habit")}><i><Footprints size={22} /></i><b>Habit</b><span>{L(lang, "오늘습관", "Thói quen")}</span></button>
        <button className="q" onClick={() => go("salon")}><i><Scissors size={22} /></i><b>Salon</b><span>{L(lang, "뷰티·케어", "Làm đẹp")}</span></button>
        {/* Move는 별도 탭이 없다 — Living의 MOVE 카테고리로 이동 */}
        <button className="q" onClick={() => go("living")}><i><Car size={22} /></i><b>Move</b><span>{L(lang, "카트·이동", "Di chuyển")}</span></button>
      </div>

      <button className="promo" onClick={() => go("living")}>
        <img src={IMG.cart} alt="" />
        <div className="ptext">
          <em>M4U MOVE · E-CART</em>
          <h2>{L(lang, <>단지 안 어디든,<br />3분이면 도착해요</>, <>Đi khắp khu đô thị,<br />chỉ trong 3 phút</>)}</h2>
          <p>{L(lang, "전기카트 · 20,000 VND부터", "Xe điện · từ 20.000 VND")}</p>
          <span className="minicta">{L(lang, "지금 호출", "Gọi ngay")} <ChevronRight size={11} /></span>
        </div>
      </button>

      <div className="sechead">
        <h3 className="section">{L(lang, "오늘의 혜택", "Ưu đãi hôm nay")}</h3>
      </div>
      <div className="twocol">
        {/* 혜택 적립은 지갑에서 확인한다 (H02 수용 기준) */}
        <Card c="bene" onClick={() => goSub("wallet")}>
          <img src={IMG.dine} alt="" />
          <div className="bd">
            <em>REWARD</em>
            <h2>+420 HRP</h2>
            <p>{L(lang, "오늘 받을 수 있어요", "Có thể nhận hôm nay")}</p>
          </div>
        </Card>
        <Card c="bene" onClick={() => go("salon")}>
          <img src={IMG.spa} alt="" />
          <div className="bd">
            <em>MY ZONE</em>
            <h2>Salon 10%</h2>
            <p>{L(lang, "이번 주 뷰티 혜택", "Ưu đãi làm đẹp tuần này")}</p>
          </div>
        </Card>
      </div>

      <div className="sechead">
        <h3 className="section">{L(lang, "MY ZONE 인기", "Nổi bật MY ZONE")}</h3>
        <button className="seeall" onClick={() => go("living")}>
          {L(lang, "전체보기", "Xem tất cả")} <ChevronRight size={12} />
        </button>
      </div>
      <div className="hscroll">
        {PLACES.map((p) => (
          <button className="shopcard" key={p.name} onClick={() => go("living")}>
            <span className="ph">
              <img src={p.img} alt="" />
              <span className="badge">{p.reward}% Reward</span>
            </span>
            <b>{p.name}</b>
            <p>★ {num(p.rate, lang)} · Verified · {L(lang, `도보 ${p.walk}분`, `${p.walk} phút`)}</p>
          </button>
        ))}
      </div>

      <Card c="ai slim" onClick={onAi}>
        <Sparkles size={20} />
        <div>
          <small>M4U AI CONCIERGE</small>
          <h2>{L(lang, "무엇을 도와드릴까요?", "Tôi có thể giúp gì cho bạn?")}</h2>
          <p>{L(lang, "“한식당 예약하고 카트도 불러줘.”", "“Đặt nhà hàng Hàn và gọi xe giúp tôi.”")}</p>
        </div>
      </Card>
    </>
  );
}
