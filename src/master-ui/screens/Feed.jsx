/**
 * FEED — 습관 기록 커뮤니티 1단계 (DESIGN_SYSTEM §4.11)
 *
 * 피드는 **리뷰가 아니다** (POLICY §11):
 *  - 별점이 없다. 매장을 언급해도 평점 · 사업자 공식 검색/추천 순위에 반영하지 않는다 (§11.3·§11.5)
 *  - **게시 행위 자체에는 HRP를 주지 않는다** (§11.6). HRP는 Habit 완료(§5)·실제 예약/결제(§3)에서 나오고,
 *    피드는 그 행동의 기록이 공유되는 곳이다 — `글을 써서 받는다`가 아니라 `행동하고 기록이 남는다`
 *  - CP 적립 대상이 아니다 (§4)
 */
import React from "react";
import { PenLine } from "lucide-react";
import { Card, Note, Tag, Empty } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { SELF_HABITS, FEED_SEED } from "../data.js";
import "../style.css";

const habitLabel = (id, lang) => {
  const h = SELF_HABITS.find((x) => x.id === id);
  return h ? pick(h.name, lang) : null;
};
const habitEmoji = (id) => SELF_HABITS.find((x) => x.id === id)?.emoji || "📝";

export default function Feed({ lang, posts, onRecord }) {
  const all = [...posts, ...FEED_SEED];

  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>FEED</span></div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "이웃의 오늘", "Hôm nay của hàng xóm")}</h1>
          <p>{L(lang, "같은 생활권 이웃들의 습관 기록", "Ghi chép thói quen của hàng xóm cùng khu")}</p>
        </div>
      </div>

      <h3 className="section sm">{L(lang, "내 기록 남기기", "Ghi lại của tôi")}</h3>
      <div className="chips">
        {SELF_HABITS.map((h) => (
          <button key={h.id} className="chip" onClick={() => onRecord(h.id)}>
            {h.emoji} {pick(h.name, lang)}
          </button>
        ))}
      </div>

      {all.length === 0 ? (
        <Empty icon={<PenLine size={26} />}>
          {L(lang, "아직 기록이 없습니다. 첫 기록을 남겨보세요.", "Chưa có ghi chép nào. Hãy viết ghi chép đầu tiên.")}
        </Empty>
      ) : (
        all.map((p) => (
          <Card c="post" key={p.id}>
            <div className="top">
              <span className="av">{p.av}</span>
              <span className="who">
                <b>{p.mine ? L(lang, "회원님", "Bạn") : L(lang, p.who, p.whoVi)}</b>
                <span>{pick(p.when, lang)}</span>
              </span>
              {p.habit && <Tag kind="self">{habitEmoji(p.habit)} {habitLabel(p.habit, lang)}</Tag>}
            </div>
            <p className="tx">{pick(p.text, lang)}</p>
            {p.img && <span className="ph"><img src={p.img} alt="" /></span>}
          </Card>
        ))
      )}

      <Note>
        <b>{L(lang, "기록과 리뷰는 다릅니다", "Ghi chép khác với đánh giá")}</b>
        {L(
          lang,
          " — 기록에는 별점이 없고, 매장을 언급해도 평점 · 순위 · 검색에 반영되지 않습니다. 매장 평가는 실제 이용자만 쓰는 Verified Review로만 반영됩니다.",
          " — ghi chép không có điểm sao; nhắc tên cửa hàng cũng không ảnh hưởng điểm · xếp hạng · tìm kiếm. Chỉ Verified Review của người đã sử dụng mới được tính."
        )}
      </Note>

    </>
  );
}
