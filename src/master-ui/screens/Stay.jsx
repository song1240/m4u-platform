/**
 * STAY — 객실 목록 (Living STAY 타일에서 진입)
 * 투숙 기간의 지역 소비는 객실 Guest QR로 Host에게 귀속된다 (POLICY §7).
 */
import React from "react";
import { ChevronRight } from "lucide-react";
import { SubHead, Card, Note, Tag, Photo } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { STAYS } from "../data.js";
import "../style.css";

export default function Stay({ lang, stays, onBack, goSub }) {
  return (
    <>
      <SubHead title="STAY" onBack={onBack} />

      {stays.length > 0 && (
        <>
          <div className="sechead">
            <h3 className="section">{L(lang, "내 스테이", "Lưu trú của tôi")}</h3>
          </div>
          {stays.map((s) => (
            <Card c="logrow" key={s.id}>
              <div className="bd">
                <b>{s.name}</b>
                <p>{s.range} · {s.nights} · {num(s.total, lang)} VND</p>
              </div>
              <Tag kind="ok">+{num(s.point, lang)} HRP</Tag>
            </Card>
          ))}
        </>
      )}

      <div className="sechead">
        <h3 className="section">{L(lang, "레지던스 객실", "Phòng lưu trú")}</h3>
      </div>
      {STAYS.map((r) => (
        <Card c="bene" key={r.id} onClick={() => goSub("staybook", { stayId: r.id })}>
          <Photo src={r.img} />
          <div className="bd">
            <div className="tl">
              <Tag kind="st">★ {r.rating} ({r.reviews})</Tag>
            </div>
            <h2>{pick(r.name, lang)}</h2>
            <p>{pick(r.size, lang)} · {L(lang, `1박 ${num(r.price, lang)} VND`, `${num(r.price, lang)} VND/đêm`)}</p>
          </div>
        </Card>
      ))}
      <Note>
        {L(lang, "투숙 기간에 객실 QR로 이용한 식당 · 살롱 · 이동은 HRP로 적립되고, 숙소 Host에게도 1단계 추천 보상이 귀속됩니다.", "Trong thời gian lưu trú, dịch vụ dùng qua QR phòng sẽ tích HRP và Host cũng nhận thưởng giới thiệu một cấp.")}
      </Note>
    </>
  );
}
