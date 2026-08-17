/**
 * 기록 작성 시트 — 습관 완료의 근거를 남긴다 (DESIGN_SYSTEM §4.11)
 *
 * 탭 한 번으로 끝나던 셀프 체크를 대체한다. 한 줄 기록이 있어야 완료로 인정한다.
 * 보상은 해당 습관의 HRP만 — CP는 주지 않는다 (POLICY §4).
 * 사진은 선택이며, 첨부해도 CP 대상이 되지는 않는다.
 */
import React, { useState } from "react";
import { ImagePlus, X, ShieldCheck } from "lucide-react";
import { Btn, Sheet, Tag } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { SELF_HABITS, FEED_MIN } from "../data.js";
import "../style.css";

export default function Recorder({ lang, habitId, capped, onClose, onPost }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const h = SELF_HABITS.find((x) => x.id === habitId);
  if (!h) return null;
  const enough = text.trim().length >= FEED_MIN;

  return (
    <Sheet title={L(lang, "기록 남기기", "Viết ghi chép")} onClose={onClose}>
      <div className="composer">
        <div className="lbl">
          <Tag kind="self">{h.emoji} {pick(h.name, lang)}</Tag>
          <span className="hintxt">
            {capped
              ? L(lang, "오늘 상한 도달 · HRP 없음", "Đã đạt giới hạn hôm nay · không HRP")
              : L(lang, `게시하면 +${h.hrp} HRP (CP 없음)`, `Đăng bài: +${h.hrp} HRP (không CP)`)}
          </span>
        </div>
        <textarea
          className="ta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={L(lang, "오늘 어떻게 했는지 한 줄 남겨주세요. 이웃에게 좋은 참고가 됩니다.", "Hãy viết một dòng về hôm nay của bạn — rất hữu ích cho hàng xóm.")}
        />
        {img ? (
          <div className="prev">
            <img src={img} alt="" />
            <button onClick={() => setImg(null)}><X size={15} /></button>
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
        <Btn onClick={() => enough && onPost({ habit: habitId, text: text.trim(), img })}>
          {enough
            ? L(lang, "기록 남기고 습관 완료", "Đăng và hoàn thành thói quen")
            : L(lang, `${FEED_MIN}자 이상 적어주세요`, `Hãy viết từ ${FEED_MIN} ký tự`)}
        </Btn>
      </div>
    </Sheet>
  );
}
