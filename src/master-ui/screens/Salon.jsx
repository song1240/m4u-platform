/**
 * Salon — 뷰티 · 케어 (H06 ⑤, DESIGN_SYSTEM §4.5)
 * 의료성 표현 금지 — "피부 분석 / 뷰티 프로필"만 사용한다 (POLICY §5).
 * 리뷰는 실제 이용자만 작성한 Verified Review, 보상은 성실한 작성에 지급 (POLICY §2).
 */
import React from "react";
import { Sparkles, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, Note, Tag } from "../components.jsx";
import { L, pick, walk, num } from "../i18n.js";
import { VENUES, SALON_QUICK } from "../data.js";
import "../style.css";

export default function Salon({ lang, goSub }) {
  const v = VENUES.find((x) => x.id === "v1");
  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>SALON</span></div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "가까운 뷰티 · 케어를 나에게 맞게", "Làm đẹp gần bạn, theo cách của bạn")}</h1>
          <p>{L(lang, "MY ZONE의 살롱 · 스파 · 네일", "Salon · spa · nail trong MY ZONE")}</p>
        </div>
      </div>

      <div className="qrow">
        {SALON_QUICK.map((q) => (
          <button className="q" key={q.id} onClick={() => goSub("book", { venueId: "v1", serviceId: q.id })}>
            <i>{q.emoji}</i>
            <b>{pick(q.name, lang)}</b>
          </button>
        ))}
      </div>

      <Card c="accent" onClick={() => goSub("skin")}>
        <div className="prof">
          <i><Sparkles size={18} /></i>
          <div className="bd">
            <b>{L(lang, "피부 분석 · 뷰티 프로필 만들기", "Phân tích da · tạo hồ sơ làm đẹp")}</b>
            <p>{L(lang, "3가지 질문으로 맞는 케어와 살롱을 찾아드려요", "3 câu hỏi để tìm dịch vụ và salon phù hợp")}</p>
          </div>
          <ChevronRight size={16} className="chev" />
        </div>
      </Card>

      <div className="sechead">
        <h3 className="section">{L(lang, "프로필 기반 추천", "Gợi ý theo hồ sơ")}</h3>
      </div>
      <Card c="bene" onClick={() => goSub("venue", { venueId: "v1" })}>
        <img src={v.img} alt="" />
        <div className="bd">
          <div className="tl">
            <Tag kind="ok"><ShieldCheck size={10} /> Verified {v.reviews}</Tag>
            <Tag kind="st">{L(lang, "첫 방문 -15%", "Lần đầu -15%")}</Tag>
          </div>
          <h2>{pick(v.name, lang)}</h2>
          <p>★ {num(v.rating, lang)} · {walk(v.walkMin, lang)} · {pick(v.open, lang)}</p>
        </div>
      </Card>

      <div className="sechead">
        <h3 className="section">{L(lang, "최근 Verified Review", "Verified Review gần đây")}</h3>
      </div>
      {v.reviews_.map((r) => (
        <Card c="rvcard" key={r.id}>
          <div className="top">
            <span className="who">
              {pick(r.who, lang)}
              <Tag kind="ok"><ShieldCheck size={10} /> {L(lang, "인증", "Đã xác minh")}</Tag>
            </span>
            <span className="rt">★ {r.rate}</span>
          </div>
          <p>{pick(r.text, lang)}</p>
        </Card>
      ))}
      <Note>
        {L(lang, "리뷰는 실제 예약 · 결제 이용자만 작성할 수 있고, 성실한 작성에 +5 CP가 지급됩니다.", "Chỉ khách đã đặt và thanh toán mới viết được; bài viết chỉn chu nhận +5 CP.")}
      </Note>
    </>
  );
}
