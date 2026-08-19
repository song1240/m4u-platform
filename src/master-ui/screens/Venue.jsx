/**
 * 매장 상세 — 히어로 + 세그먼트 탭(서비스 / 리뷰 / 정보) + 고정 CTA
 * 리뷰는 실제 이용자만 작성한 Verified Review (POLICY §2) — 보상은 성실한 작성에 지급.
 */
import React, { useState } from "react";
import { ArrowLeft, Heart, Star, Clock, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import { Tag, Note, Empty, CtaBar, Btn, Photo } from "../components.jsx";
import { L, pick, walk, num } from "../i18n.js";
import { VENUES, VENUE_TABS } from "../data.js";
import "../style.css";

export default function Venue({ lang, venueId, myReviews = [], onBack, goSub, liked, toggleLike }) {
  const v = VENUES.find((x) => x.id === venueId);
  // 내가 쓴 Verified Review를 이 매장 목록 맨 위에 얹는다
  const mine = myReviews.filter((r) => r.venueId === venueId).map((r) => ({ id: r.id, rate: r.rate, who: { ko: "회원님", vi: "Bạn" }, text: { ko: r.text, vi: r.text } }));
  const [seg, setSeg] = useState("service");
  if (!v) return null;
  const hasSvc = v.services.length > 0;
  const allReviews = [...mine, ...v.reviews_];

  return (
    <>
      <div className="dhero">
        <Photo src={v.img} eager />
        <button className="fabr l" onClick={onBack}><ArrowLeft size={18} /></button>
        <button className="fabr r" onClick={() => toggleLike(v.id)}>
          <Heart size={17} className={liked ? "on" : ""} />
        </button>
        <span className="logomark">{v.logo}</span>
      </div>

      <div className="vhead">
        <div className="tl">
          {v.boost ? <Tag kind="new">NEW</Tag> : <Tag kind="ok"><ShieldCheck size={10} /> Verified {v.reviews}</Tag>}
          <Tag kind="st">{v.reward}% Reward</Tag>
        </div>
        <h1>{pick(v.name, lang)}</h1>
        <p>
          {v.boost
            ? L(lang, "신규 · 실이용 리뷰 수집 중", "Mới · đang thu thập đánh giá thực tế")
            : `★ ${v.rating} (${v.reviews})`}
          {" · "}{walk(v.walkMin, lang)} · {pick(v.open, lang)}
        </p>
      </div>

      <div className="feats">
        {v.feats.map((f) => (
          <div key={f.ko}>
            <i>{f.emoji}</i>
            <span>{pick(f, lang)}</span>
          </div>
        ))}
      </div>

      <div className="segs">
        {VENUE_TABS.map((t) => (
          <button key={t.id} className={seg === t.id ? "on" : ""} onClick={() => setSeg(t.id)}>
            {pick(t.label, lang)}
            {t.id === "review" && ` ${v.reviews + mine.length}`}
          </button>
        ))}
      </div>

      {seg === "service" &&
        (hasSvc ? (
          v.services.map((s) => (
            <div className="srow" key={s.id}>
              <span className="ph"><Photo src={s.img} /></span>
              <div className="bd">
                <b>{pick(s.name, lang)}</b>
                <p>{pick(s.desc, lang)} · {pick(s.time, lang)}</p>
                <span className="pr">{num(s.price, lang)} VND</span>
              </div>
              <button className="btn-sm" onClick={() => goSub("book", { venueId: v.id, serviceId: s.id })}>
                {L(lang, "예약하기", "Đặt lịch")}
              </button>
            </div>
          ))
        ) : (
          <Empty icon={<Clock size={26} />}>
            {L(lang, "방문 · 주문형 매장입니다. 바로 방문해 주세요.", "Cửa hàng phục vụ tại chỗ — mời bạn ghé trực tiếp.")}
          </Empty>
        ))}

      {seg === "review" && (
        <>
          <Note>
            <b>Verified Review</b>
            {L(
              lang,
              " — M4U로 실제 예약·결제한 이용자만 작성할 수 있고, 보상은 좋은 별점이 아니라 성실한 작성에 지급됩니다.",
              " — chỉ người đã đặt và thanh toán qua M4U mới viết được; thưởng cho bài viết chỉn chu, không phải cho điểm cao."
            )}
          </Note>
          {allReviews.length === 0 ? (
            <Empty icon={<Star size={26} />}>
              {L(lang, "아직 등록된 리뷰가 없습니다.", "Chưa có đánh giá nào.")}
            </Empty>
          ) : (
            allReviews.map((r) => (
              <div className="card" key={r.id}>
                <div className="rvtop">
                  <b>{pick(r.who, lang)}</b>
                  <Tag kind="ok"><ShieldCheck size={10} /> Verified</Tag>
                </div>
                <p className="rvtx">{"★".repeat(r.rate)} · {pick(r.text, lang)}</p>
              </div>
            ))
          )}
        </>
      )}

      {seg === "info" && (
        <>
          <div className="card">
            <div className="irow"><MapPin size={15} /><span>{pick(v.address, lang)}</span></div>
            <div className="irow"><Clock size={15} /><span>{pick(v.open, lang)}</span></div>
            <div className="irow"><ShieldCheck size={15} /><span>{pick(v.resp, lang)}</span></div>
          </div>
          <Note>{L(lang, "취소 규정 · ", "Chính sách hủy · ")}{pick(v.policy, lang)}</Note>
        </>
      )}

      {hasSvc && (
        <CtaBar>
          <Btn onClick={() => goSub("book", { venueId: v.id, serviceId: v.services[0].id })}>
            {L(lang, "예약하기", "Đặt lịch")}
          </Btn>
        </CtaBar>
      )}
    </>
  );
}
