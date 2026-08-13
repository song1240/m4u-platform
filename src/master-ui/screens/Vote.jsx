/**
 * 커뮤니티 투표 — CP 가중 (H06 ⑥)
 * POLICY §4: CP는 구매·양도·수동 발행 불가. 투표 가중치가 유일한 용도다.
 * 정족수·찬반 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React from "react";
import { Check, Timer } from "lucide-react";
import { SubHead, Card, Note, Tag } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { PROPOSALS } from "../data.js";
import "../style.css";

export default function Vote({ lang, cp, myVotes, castVote, onBack }) {
  return (
    <>
      <SubHead title={L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng")} onBack={onBack} />
      <Note>
        {L(lang, `내 투표권은 ${num(cp, lang)} CP입니다. `, `Quyền biểu quyết của bạn là ${num(cp, lang)} CP. `)}
        {L(lang, "CP 가중 투표로 단지 운영 안건이 결정되며, 정족수를 채워야 반영됩니다. CP는 구매할 수 없습니다.", "Đề xuất vận hành khu được quyết định theo trọng số CP và chỉ có hiệu lực khi đủ định mức. CP không thể mua được.")}
      </Note>

      {PROPOSALS.map((p) => {
        const total = p.yes + p.no;
        const yesPct = total ? Math.round((p.yes / total) * 100) : 0;
        const quorumPct = Math.min(100, Math.round((total / p.quorum) * 100));
        const voted = myVotes[p.id];
        const closed = p.status !== "open";
        return (
          <Card c="vcard" key={p.id}>
            <div className="top">
              <b>{pick(p.title, lang)}</b>
              {closed ? (
                <Tag kind="new">{L(lang, "가결 · 반영 완료", "Đã thông qua")}</Tag>
              ) : (
                <Tag kind="st"><Timer size={10} /> {L(lang, `${Math.floor(p.leftH / 24)}일 남음`, `còn ${Math.floor(p.leftH / 24)} ngày`)}</Tag>
              )}
            </div>
            <p>{pick(p.desc, lang)}</p>
            <div className="tally">
              <span className="yes">{L(lang, `찬성 ${num(p.yes, lang)} CP (${yesPct}%)`, `Đồng ý ${num(p.yes, lang)} CP (${yesPct}%)`)}</span>
              <span className="no">{L(lang, `반대 ${num(p.no, lang)} CP`, `Không đồng ý ${num(p.no, lang)} CP`)}</span>
            </div>
            <div className="bar"><i style={{ width: `${yesPct}%` }} /></div>
            <div className="quorum">{L(lang, `정족수 ${num(p.quorum, lang)} CP 중 ${quorumPct}% 달성`, `Đạt ${quorumPct}% trên định mức ${num(p.quorum, lang)} CP`)}</div>
            {!closed &&
              (voted ? (
                <div className="voted">
                  <Check size={13} />{" "}
                  {L(lang, `${voted === "yes" ? "찬성" : "반대"}에 ${num(cp, lang)} CP 투표 완료`, `Đã bỏ phiếu ${voted === "yes" ? "đồng ý" : "không đồng ý"} với ${num(cp, lang)} CP`)}
                </div>
              ) : (
                <div className="acts">
                  <button onClick={() => castVote(p.id, "yes")}>{L(lang, "찬성", "Đồng ý")}</button>
                  <button className="alt" onClick={() => castVote(p.id, "no")}>{L(lang, "반대", "Không đồng ý")}</button>
                </div>
              ))}
          </Card>
        );
      })}
      <Note>
        {L(lang, "투표는 CP 보유량에 비례한 가중치로 집계되며, 투표로 CP가 차감되지 않습니다.", "Phiếu được tính theo trọng số CP đang có; bỏ phiếu không làm giảm CP.")}
      </Note>
    </>
  );
}
