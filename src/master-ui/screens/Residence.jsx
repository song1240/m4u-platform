/**
 * 내 레지던스 — 투숙객 화면 (H04 수용 기준)
 * ROOM Guest QR로 이용하면 소비자에게 HRP가 적립되고 Host에게 1단계 추천 보상이 귀속된다.
 * 귀속은 체크인~체크아웃 기간 한정 (POLICY §7).
 */
import React, { useState } from "react";
import { QrCode, Check } from "lucide-react";
import { SubHead, Card, Note, Sheet, Btn, Photo } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { CONCIERGE_ITEMS, MY_STAY } from "../data.js";
import "../style.css";

const QrBox = () => (
  <div className="qr">
    {Array.from({ length: 81 }).map((_, i) => (
      <i key={i} className={(i * 5 + 2) % 5 < 3 ? "" : "off"} />
    ))}
  </div>
);

export default function Residence({ lang, checkedIn, setCheckedIn, toast, onBack }) {
  const [qr, setQr] = useState(false);

  return (
    <>
      <SubHead lang={lang} title={L(lang, "내 레지던스 · 컨시어지", "Căn hộ của tôi · lễ tân")} onBack={onBack} />

      <div className="stayhero">
        <Photo src={MY_STAY.img} eager />
        <b>{pick(MY_STAY.name, lang)}</b>
      </div>

      <Card>
        <div className="inout">
          <div>
            <em>CHECK-IN</em>
            <b>{pick(MY_STAY.title, lang)}</b>
          </div>
          <div>
            <em>CHECK-OUT</em>
            <b>{pick(MY_STAY.desc, lang)}</b>
          </div>
        </div>
        <Btn onClick={() => setQr(true)}>
          {checkedIn ? L(lang, "체크인 완료 · QR 다시 보기", "Đã nhận phòng · xem lại QR") : L(lang, "QR 체크인", "Check-in QR")}
        </Btn>
      </Card>

      <div className="sechead">
        <h3 className="section">{L(lang, "컨시어지 요청", "Yêu cầu lễ tân")}</h3>
      </div>
      <div className="grid">
        {CONCIERGE_ITEMS.map((c) => (
          <button className="tile" key={c.id} onClick={() => toast(L(lang, `${c.ko} 접수 · 15분 내 처리`, `Đã nhận ${c.vi} · xử lý trong 15 phút`))}>
            <i>{c.emoji}</i>
            <b>{L(lang, c.ko, c.vi)}</b>
          </button>
        ))}
      </div>

      <Card>
        <div className="prof">
          <i><QrCode size={18} /></i>
          <div className="bd">
            <b>{L(lang, `ROOM ${MY_STAY.room} Guest QR 연결됨`, `Đã kết nối QR phòng ${MY_STAY.room}`)}</b>
            <p>{L(lang, "이 객실로 식당 · 살롱 · 이동을 이용하면 HRP가 적립되고, 숙소 Host에게도 추천 보상이 돌아갑니다.", "Dùng nhà hàng · salon · xe qua phòng này sẽ tích HRP, và Host cũng nhận thưởng giới thiệu.")}</p>
          </div>
        </div>
      </Card>
      <Note>
        {L(lang, "Host 보상은 체크인부터 체크아웃까지의 이용에만 귀속되며, 본인 결제는 제외됩니다. Host는 개별 결제 내역을 볼 수 없습니다.", "Thưởng cho Host chỉ tính từ lúc nhận phòng đến khi trả phòng và không gồm thanh toán của chính bạn. Host không xem được chi tiết từng giao dịch.")}
      </Note>

      {qr && (
        <Sheet lang={lang} title={L(lang, "QR 체크인", "Check-in QR")} onClose={() => setQr(false)}>
          <QrBox />
          <Note>{L(lang, "프런트에서 이 QR을 보여주시면 체크인이 완료됩니다. 유효시간 10분.", "Xuất trình QR này tại quầy lễ tân để nhận phòng. Hiệu lực 10 phút.")}</Note>
          <Btn onClick={() => { setCheckedIn(true); setQr(false); toast(L(lang, "체크인 완료 · Guest QR이 활성화되었어요", "Đã nhận phòng · QR khách đã kích hoạt")); }}>
            <Check size={15} /> {L(lang, "체크인 확정", "Xác nhận nhận phòng")}
          </Btn>
        </Sheet>
      )}
    </>
  );
}
