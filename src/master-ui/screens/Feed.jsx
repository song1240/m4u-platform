/**
 * FEED — 커뮤니티 (POLICY §11 · DESIGN_SYSTEM §4.11)
 *
 * 발견과 공유의 공간이지 평가의 공간이 아니다:
 *  - **별점이 없다.** 매장을 언급해도 평점 · 사업자 공식 검색/추천 순위에 반영하지 않는다 (§11.3·§11.5)
 *  - **게시 자체에는 보상이 없다.** HRP는 습관 완료(§5)·실제 예약/결제(§3)에서 나온다 (§11.6)
 *  - CP 적립 대상이 아니다 (§4)
 *
 * 피드 안에서의 정렬·필터(최신·카테고리)는 §11.5가 명시적으로 허용한다.
 * 다만 그 결과가 사업자 공식 순위로 이어지지 않는다.
 */
import React, { useState } from "react";
import { PenLine, MapPin, ShieldCheck } from "lucide-react";
import { Card, Note, Tag, Empty, Photo } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { SELF_HABITS, FEED_CATS, FEED_SEED, VENUES } from "../data.js";
import "../style.css";

const habitOf = (id) => SELF_HABITS.find((x) => x.id === id);
const catOf = (id) => FEED_CATS.find((x) => x.id === id);
const venueOf = (id) => VENUES.find((x) => x.id === id);

export default function Feed({ lang, posts, onWrite, goSub }) {
  const [filter, setFilter] = useState("all");
  const all = [...posts, ...FEED_SEED];
  const shown = filter === "all" ? all : all.filter((p) => (p.cat || "habit") === filter);

  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>FEED</span></div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "이웃의 오늘", "Hôm nay của hàng xóm")}</h1>
          <p>{L(lang, "같은 생활권 이웃들이 나누는 이야기", "Chuyện hàng xóm cùng khu chia sẻ")}</p>
        </div>
      </div>

      <button className="writebar" onClick={() => onWrite({ cat: "food" })}>
        <i><PenLine size={15} /></i>
        {L(lang, "이웃에게 무엇을 알려줄까요?", "Bạn muốn chia sẻ điều gì?")}
      </button>

      <div className="chips">
        <button
          className={"chip" + (filter === "all" ? " on" : "")}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          {L(lang, "전체", "Tất cả")}
        </button>
        {FEED_CATS.map((c) => (
          <button
            key={c.id}
            className={"chip" + (filter === c.id ? " on" : "")}
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.emoji} {pick(c.name, lang)}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <Empty icon={<PenLine size={26} />}>
          {L(lang, "아직 이 주제의 글이 없습니다. 첫 글을 남겨보세요.", "Chưa có bài viết nào ở mục này. Hãy viết bài đầu tiên.")}
        </Empty>
      ) : (
        shown.map((p) => {
          const h = habitOf(p.habit);
          const c = catOf(p.cat || "habit");
          const v = venueOf(p.venue);
          return (
            <Card c="post" key={p.id}>
              <div className="top">
                <span className="av">{p.av}</span>
                <span className="who">
                  <b>{p.mine ? L(lang, "회원님", "Bạn") : L(lang, p.who, p.whoVi)}</b>
                  <span>{pick(p.when, lang)}</span>
                </span>
                {p.partner && <Tag kind="partner">PARTNER</Tag>}
                {h ? (
                  <Tag kind="self">{h.emoji} {pick(h.name, lang)}</Tag>
                ) : (
                  c && <Tag kind="st">{c.emoji} {pick(c.name, lang)}</Tag>
                )}
              </div>
              <p className="tx">{pick(p.text, lang)}</p>
              {p.img && <span className="ph"><Photo src={p.img} /></span>}
              {v && (
                <div className="vrow">
                  <button className="vchip" onClick={() => goSub("venue", { venueId: v.id })}>
                    <MapPin size={11} /> {pick(v.name, lang)}
                  </button>
                  {/* 예약·결제 기록으로 "이용했다"는 사실만 표시한다. 리뷰가 아니고 평점에 반영되지 않는다 (§11.4) */}
                  {p.used && (
                    <Tag kind="ok">
                      <ShieldCheck size={10} /> {L(lang, "M4U 이용 확인", "Đã xác nhận sử dụng M4U")}
                    </Tag>
                  )}
                </div>
              )}
            </Card>
          );
        })
      )}

      <Note>
        <b>{L(lang, "기록과 리뷰는 다릅니다", "Ghi chép khác với đánh giá")}</b>
        {L(
          lang,
          " — 여기에는 별점이 없고, 매장을 언급해도 평점 · 순위 · 검색에 반영되지 않습니다. 매장 평가는 실제 이용자만 쓰는 Verified Review로만 반영됩니다. `M4U 이용 확인`은 예약·결제 기록이 있다는 표시일 뿐 리뷰가 아닙니다. 글쓰기 자체에는 적립이 없으며, HRP는 습관 완료와 실제 이용에서 나옵니다.",
          " — ở đây không có điểm sao; nhắc tên cửa hàng cũng không ảnh hưởng điểm · xếp hạng · tìm kiếm. Chỉ Verified Review của người đã sử dụng mới được tính. `Đã xác nhận sử dụng M4U` chỉ là dấu hiệu có lịch sử đặt/thanh toán, không phải đánh giá. Viết bài không tích điểm; HRP đến từ việc hoàn thành thói quen và sử dụng thực tế."
        )}
      </Note>
    </>
  );
}
