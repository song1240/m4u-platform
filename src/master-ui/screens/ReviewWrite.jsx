/**
 * Verified Review 작성 (POLICY §2)
 *
 *  - 실제 M4U 예약·결제 이용자만 작성 가능 → **예약 내역에서만 진입**한다(구조로 강제).
 *  - 보상은 좋은 별점이 아니라 **성실한 작성**에 지급 (+5 CP). 별점이 낮아도 동일하게 지급된다.
 *  - 반복·대량 작성은 Admin 이상 탐지 대상임을 고지한다.
 * 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { SubHead, Card, Btn, Note, CtaBar } from "../components.jsx";
import { L } from "../i18n.js";
import { REVIEW_CP, REVIEW_MIN } from "../data.js";
import "../style.css";

export default function ReviewWrite({ lang, booking, onBack, onSubmit }) {
  const [rate, setRate] = useState(5);
  const [text, setText] = useState("");
  if (!booking) return null;
  const enough = text.trim().length >= REVIEW_MIN;

  return (
    <>
      <SubHead title={L(lang, "Verified Review 작성", "Viết Verified Review")} onBack={onBack} />

      <Card>
        <em>VERIFIED</em>
        <h2>{booking.name}</h2>
        <p>{booking.venue} · {booking.date} · {booking.slot}</p>
      </Card>

      <h3 className="section sm">{L(lang, "만족도", "Mức hài lòng")}</h3>
      <Card>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} className={n <= rate ? "on" : ""} onClick={() => setRate(n)} aria-label={`${n}`}>
              ★
            </button>
          ))}
        </div>
        <p>{L(lang, "별점은 보상과 무관합니다 — 낮은 별점도 동일하게 적립됩니다.", "Điểm sao không ảnh hưởng đến thưởng — đánh giá thấp vẫn được tích lũy như nhau.")}</p>
      </Card>

      <h3 className="section sm">{L(lang, "이용 후기", "Trải nghiệm của bạn")}</h3>
      <Card>
        <textarea
          className="ta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={L(lang, "무엇이 좋았고 아쉬웠는지 구체적으로 적어주시면 다른 이웃에게 큰 도움이 됩니다.", "Hãy viết cụ thể điều bạn hài lòng và chưa hài lòng — rất hữu ích cho hàng xóm khác.")}
        />
        <div className="rvmeta">
          <span>{text.trim().length} / {REVIEW_MIN}</span>
          {enough ? (
            <span className="ok"><ShieldCheck size={11} /> {L(lang, `성실 작성 조건 충족 · +${REVIEW_CP} CP`, `Đủ điều kiện · +${REVIEW_CP} CP`)}</span>
          ) : (
            <span>{L(lang, `${REVIEW_MIN}자 이상 작성해 주세요`, `Vui lòng viết từ ${REVIEW_MIN} ký tự`)}</span>
          )}
        </div>
      </Card>

      <Note>
        <b>Verified Review</b>
        {L(
          lang,
          " — 실제 예약·결제한 이용자만 작성할 수 있습니다. 보상은 별점이 아니라 성실한 작성에 지급되며, 동일 내용 반복이나 단시간 대량 작성은 검토 대상이 됩니다.",
          " — chỉ người đã đặt và thanh toán mới viết được. Thưởng dựa trên bài viết chỉn chu chứ không phải điểm sao; nội dung lặp lại hoặc viết hàng loạt trong thời gian ngắn sẽ bị xem xét."
        )}
      </Note>

      <CtaBar>
        <Btn onClick={() => enough && onSubmit({ bookingId: booking.id, venueId: booking.venueId, rate, text: text.trim() })}>
          {enough
            ? L(lang, `리뷰 등록 · +${REVIEW_CP} CP`, `Đăng đánh giá · +${REVIEW_CP} CP`)
            : L(lang, "조금만 더 적어주세요", "Hãy viết thêm một chút")}
        </Btn>
      </CtaBar>
    </>
  );
}
