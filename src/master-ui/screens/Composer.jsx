/**
 * 글쓰기 시트 — FEED 게시 (DESIGN_SYSTEM §4.11 · POLICY §11)
 *
 * 두 가지 글을 같은 시트에서 쓴다:
 *  - **습관 기록**  : 셀프 습관의 완료 근거. 완료 시 해당 습관의 HRP를 받는다 (POLICY §5)
 *  - **자유 게시**  : 맛집 · 생활정보 · Salon · 체험. **보상이 없다** (POLICY §11.6)
 *
 * 보상은 글이 아니라 행동에 붙는다. `글을 써서 HRP를 받는다`가 아니라
 * `실제 행동을 하고 그 기록이 FEED에도 남는다` 가 설계 원칙이다.
 * 어느 쪽이든 별점은 없고, 매장을 언급해도 평점 · 순위에 반영되지 않는다 (POLICY §11.3).
 */
import React, { useState } from "react";
import { ImagePlus, X, ShieldCheck } from "lucide-react";
import { Btn, Sheet, Tag, Photo } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { SELF_HABITS, FEED_CATS, FEED_MIN } from "../data.js";
import "../style.css";

export default function Composer({ lang, draft, capped, onClose, onPost }) {
  const [cat, setCat] = useState(draft?.cat || "habit");
  const [habit, setHabit] = useState(draft?.habit || null);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const locked = !!draft?.habit; // 습관 화면에서 들어온 경우 종류를 바꾸지 않는다
  const h = SELF_HABITS.find((x) => x.id === habit);
  const isHabit = cat === "habit";
  const enough = text.trim().length >= FEED_MIN && (!isHabit || !!h);

  /** 보상 안내 — 자유 게시에는 보상이 없다는 것을 쓰기 전에 알린다 (§11.6) */
  const reward = !isHabit
    ? L(lang, "이 글에는 적립이 없어요", "Bài viết này không tích điểm")
    : !h
    ? L(lang, "어떤 습관인지 골라주세요", "Hãy chọn thói quen")
    : capped
    ? L(lang, "오늘 상한 도달 · HRP 없음", "Đã đạt giới hạn hôm nay · không HRP")
    : L(lang, `습관 완료 시 +${h.hrp} HRP (CP 없음)`, `Hoàn thành thói quen: +${h.hrp} HRP (không CP)`);

  return (
    <Sheet lang={lang} title={L(lang, "글쓰기", "Viết bài")} onClose={onClose}>
      <div className="composer">
        {!locked && (
          <div className="chips">
            {FEED_CATS.map((c) => (
              <button
                key={c.id}
                className={"chip" + (cat === c.id ? " on" : "")}
                aria-pressed={cat === c.id}
                onClick={() => { setCat(c.id); if (c.id !== "habit") setHabit(null); }}
              >
                {c.emoji} {pick(c.name, lang)}
              </button>
            ))}
          </div>
        )}

        {isHabit && !locked && (
          <div className="chips">
            {SELF_HABITS.map((x) => (
              <button
                key={x.id}
                className={"chip" + (habit === x.id ? " on" : "")}
                aria-pressed={habit === x.id}
                onClick={() => setHabit(x.id)}
              >
                {x.emoji} {pick(x.name, lang)}
              </button>
            ))}
          </div>
        )}

        <div className="lbl">
          {locked && h && <Tag kind="self">{h.emoji} {pick(h.name, lang)}</Tag>}
          <span className="hintxt">{reward}</span>
        </div>

        <textarea
          className="ta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isHabit
              ? L(lang, "오늘 어떻게 했는지 한 줄 남겨주세요. 이웃에게 좋은 참고가 됩니다.", "Hãy viết một dòng về hôm nay của bạn — rất hữu ích cho hàng xóm.")
              : L(lang, "이웃에게 도움이 될 만한 이야기를 들려주세요. 별점은 매기지 않습니다.", "Hãy chia sẻ điều hữu ích cho hàng xóm. Ở đây không chấm điểm sao.")
          }
        />

        {img ? (
          <div className="prev">
            <Photo src={img} />
            <button onClick={() => setImg(null)} aria-label={L(lang, "사진 삭제", "Xóa ảnh")}><X size={15} /></button>
          </div>
        ) : (
          <label className="pickimg">
            <ImagePlus size={14} /> {L(lang, "사진 첨부 (선택)", "Thêm ảnh (tùy chọn)")}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) setImg(URL.createObjectURL(f)); }} />
          </label>
        )}

        <div className="rvmeta">
          <span>{text.trim().length} / {FEED_MIN}</span>
          {enough && <span className="ok"><ShieldCheck size={11} /> {L(lang, "게시할 수 있어요", "Có thể đăng")}</span>}
        </div>

        <Btn onClick={() => enough && onPost({ cat, habit: isHabit ? habit : null, text: text.trim(), img })}>
          {!enough
            ? L(lang, `${FEED_MIN}자 이상 적어주세요`, `Hãy viết từ ${FEED_MIN} ký tự`)
            : isHabit
            ? L(lang, "기록 남기고 습관 완료", "Đăng và hoàn thành thói quen")
            : L(lang, "게시하기", "Đăng bài")}
        </Btn>
      </div>
    </Sheet>
  );
}
