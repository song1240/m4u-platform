/**
 * 뷰티 프로필 — 3문항 설문 → 프로필 결과 → 추천 (H06 ⑤)
 *
 * POLICY §5 (절대 규칙): 의료성 표현 금지.
 *  - 진단을 연상시키는 표현 대신 "피부 분석 / 뷰티 프로필"만 쓴다
 *  - 화면 최상단에 "의료 진단이 아님"을 항상 노출한다
 * 결과 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState } from "react";
import { SubHead, Card, Note, Photo } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { SKIN_QS, SKIN_TYPES, VENUES, IMG } from "../data.js";
import "../style.css";

/** 응답 → 지표(데모 계산). 첫 문항이 유형을, 나머지가 진정 필요도를 좌우한다 */
const metricsOf = (answers) => {
  const type = answers.q1 || "tzone";
  const trouble = { rare: 0, some: 12, often: 24 }[answers.q2] ?? 12;
  const base = { dry: [48, 70, 62], tzone: [62, 48, 71], oily: [74, 32, 66] }[type];
  return { type, moist: base[0], oil: base[1], calm: Math.min(95, base[2] + trouble - 12) };
};

export default function SkinProfile({ lang, onBack, goSub }) {
  const [answers, setAnswers] = useState({});
  const done = SKIN_QS.every((q) => answers[q.id]);
  const m = done ? metricsOf(answers) : null;
  const salon = VENUES.find((x) => x.id === "v1");

  return (
    <>
      <SubHead title={L(lang, "피부 분석 · 뷰티 프로필", "Phân tích da · hồ sơ làm đẹp")} onBack={onBack} />
      <Note>{L(lang, "의료 진단이 아니라, 서비스 추천을 위한 뷰티 프로필입니다.", "Đây là hồ sơ làm đẹp để gợi ý dịch vụ, không phải chẩn đoán y tế.")}</Note>

      {SKIN_QS.map((item, qi) => (
        <Card key={item.id}>
          <b className="qtx">{qi + 1}. {pick(item.q, lang)}</b>
          <div className="chips col">
            {item.opts.map((o) => (
              <button key={o.id} className={"chip" + (answers[item.id] === o.id ? " on" : "")} onClick={() => setAnswers((a) => ({ ...a, [item.id]: o.id }))}>
                {pick(o, lang)}
              </button>
            ))}
          </div>
        </Card>
      ))}

      {done && (
        <>
          <Card c="accent">
            <em>{L(lang, "나의 뷰티 프로필", "Hồ sơ làm đẹp của tôi")}</em>
            <h2>{pick(SKIN_TYPES[m.type], lang)}</h2>
            <div className="metrics">
              {[
                { k: L(lang, "수분", "Độ ẩm"), v: m.moist },
                { k: L(lang, "유분 밸런스", "Cân bằng dầu"), v: m.oil },
                { k: L(lang, "진정 필요도", "Cần làm dịu"), v: m.calm },
              ].map((x) => (
                <div key={x.k}>
                  <div className="lb"><span>{x.k}</span><b>{x.v}%</b></div>
                  <div className="bar"><i style={{ width: `${x.v}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>

          <h3 className="section">{L(lang, "프로필 기반 추천", "Gợi ý theo hồ sơ")}</h3>
          <div className="srow">
            <span className="ph"><Photo src={IMG.massage} /></span>
            <div className="bd">
              <b>{L(lang, "수분 진정 케어", "Chăm sóc cấp ẩm dịu da")}</b>
              <p>{pick(salon.name, lang)} · {L(lang, "첫 방문 -15%", "Lần đầu -15%")}</p>
            </div>
            <button className="btn-sm" onClick={() => goSub("book", { venueId: "v1", serviceId: "s2" })}>
              {L(lang, "예약", "Đặt")}
            </button>
          </div>
          <div className="srow">
            <span className="ph"><Photo src={IMG.salon} /></span>
            <div className="bd">
              <b>{pick(salon.name, lang)}</b>
              <p>{L(lang, "프로필에 맞는 전체 서비스 보기", "Xem toàn bộ dịch vụ phù hợp hồ sơ")}</p>
            </div>
            <button className="btn-sm" onClick={() => goSub("venue", { venueId: "v1" })}>
              {L(lang, "보기", "Xem")}
            </button>
          </div>
          <Note>
            {L(lang, "추천은 MY ZONE · 뷰티 프로필 · Verified Review를 기반으로 하며, 광고비는 반영되지 않습니다.", "Gợi ý dựa trên MY ZONE · hồ sơ làm đẹp · Verified Review; chi phí quảng cáo không được tính.")}
          </Note>
        </>
      )}
      {!done && (
        <p className="hint">{L(lang, "3문항에 모두 답하면 프로필과 추천이 나타납니다.", "Trả lời cả 3 câu hỏi để xem hồ sơ và gợi ý.")}</p>
      )}
    </>
  );
}
