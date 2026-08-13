/**
 * Living — 우리동네(먹고 · 이동하고 · 머무는 것). 프로덕션 패턴 (DESIGN_SYSTEM §4.2/§4.3)
 * 목록 순서는 Consumer First Ranking(ranking.js) — 광고비 미반영, 신규 파트너는 2번째 (POLICY §1).
 */
import React, { useMemo } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Note, Tag } from "../components.jsx";
import { L, pick, walk, num } from "../i18n.js";
import { VENUES, LIVING_TILES, IMG } from "../data.js";
import { rankVenues } from "../ranking.js";
import "../style.css";

/** 랭킹·카테고리 목록의 공통 행 — 신규 파트너는 지표 대신 수집 중 문구 (POLICY §2) */
export function VenueRow({ v, lang, onClick }) {
  return (
    <button className="prow" onClick={onClick}>
      <span className="ph"><img src={v.img} alt="" /></span>
      <span className="bd">
        <span className="tl">
          {v.rank && <Tag kind="rank">{v.rank}</Tag>}
          {v.boost && <Tag kind="new">NEW</Tag>}
          <b>{pick(v.name, lang)}</b>
        </span>
        <p>{walk(v.walkMin, lang)} · {v.reward}% Reward</p>
        <span className="mt">
          {v.boost
            ? L(lang, "신규 · 실이용 리뷰 수집 중", "Mới · đang thu thập đánh giá thực tế")
            : L(lang, `★ ${v.rating} (${v.reviews}) · 재이용 ${v.rebook}%`, `★ ${v.rating} (${v.reviews}) · quay lại ${v.rebook}%`)}
        </span>
      </span>
      <ChevronRight size={16} className="chev" />
    </button>
  );
}

export default function Living({ lang, zone, go, goSub }) {
  const ranked = useMemo(() => rankVenues(VENUES), []);
  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>LIVING</span></div>
        <div className="zonechip"><MapPin size={12} /> {zone}</div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "우리동네를 더 가깝게", "Khu bạn ở, gần hơn")}</h1>
          <p>{L(lang, "먹고 · 이동하고 · 머무는 모든 것", "Ăn uống · di chuyển · lưu trú")}</p>
        </div>
      </div>

      <div className="grid g3">
        {LIVING_TILES.map((t) => (
          <button className="tile" key={t.id} onClick={() => goSub("cat", { catId: t.id })}>
            <i>{t.emoji}</i>
            <b>{t.name}</b>
            <span>{pick(t.sub, lang)}</span>
          </button>
        ))}
      </div>

      <button className="promo" onClick={() => goSub("cat", { catId: "move" })}>
        <img src={IMG.cart} alt="" />
        <div className="ptext">
          <em>M4U MOVE · E-CART</em>
          <h2>{L(lang, <>단지 안 어디든,<br />3분이면 도착해요</>, <>Đi khắp khu đô thị,<br />chỉ trong 3 phút</>)}</h2>
          <p>{L(lang, `전기카트 · ${num(20000, lang)} VND부터`, `Xe điện · từ ${num(20000, lang)} VND`)}</p>
          <span className="minicta">{L(lang, "지금 호출", "Gọi ngay")} <ChevronRight size={11} /></span>
        </div>
      </button>

      <div className="sechead">
        <h3 className="section">{L(lang, "MY ZONE 랭킹", "Xếp hạng MY ZONE")}</h3>
      </div>
      {ranked.map((v) => (
        <VenueRow key={v.id} v={v} lang={lang} onClick={() => goSub("venue", { venueId: v.id })} />
      ))}
      <Note>
        {L(lang, "순위는 ", "Xếp hạng dựa trên ")}
        <b>Consumer First Ranking</b>
        {L(
          lang,
          " — 별점 · 재이용 · 이행률 · 취소율 · 응답 · 소비자 Reward로만 계산되며 광고비는 반영되지 않습니다.",
          " — chỉ tính theo đánh giá, tỷ lệ quay lại, hoàn thành, hủy, phản hồi và Reward của khách. Chi phí quảng cáo không được tính."
        )}
      </Note>
    </>
  );
}
