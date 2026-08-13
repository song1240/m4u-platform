/**
 * 예약 내역 — 실제로 확정한 예약이 쌓인다 (H06 ⑦)
 * 적립은 방문 확인 후 확정된다 (POLICY §3·§4).
 */
import React from "react";
import { CalendarDays } from "lucide-react";
import { SubHead, Card, Empty, Note } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

export default function Bookings({ lang, bookings, onBack }) {
  return (
    <>
      <SubHead title={L(lang, "예약 내역", "Lịch sử đặt chỗ")} onBack={onBack} />
      {bookings.length === 0 ? (
        <Empty icon={<CalendarDays size={26} />}>
          {L(lang, "아직 예약 내역이 없습니다. Living에서 가까운 매장을 예약해 보세요.", "Chưa có lịch sử đặt chỗ. Hãy đặt một cửa hàng gần bạn trong Living.")}
        </Empty>
      ) : (
        <>
          {bookings.map((b) => (
            <Card c="logrow" key={b.id}>
              <div className="bd">
                <b>{b.name}</b>
                <p>{b.venue} · {b.date} · {b.slot}</p>
              </div>
              <span className="amt up">+{num(b.point, lang)} HRP</span>
            </Card>
          ))}
          <Note>
            {L(lang, "적립은 방문 확인 후 확정됩니다. 이용 후 Verified Review를 남기면 +5 CP가 추가됩니다.", "Điểm được xác nhận sau khi bạn đến. Viết Verified Review sau khi dùng sẽ được thêm +5 CP.")}
          </Note>
        </>
      )}
    </>
  );
}
