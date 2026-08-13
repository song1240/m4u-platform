/**
 * 예약 플로우 — 서비스 · 날짜 · 시간 선택 → 확인 시트 → 완료(적립 표시)
 * 적립은 검증 가능한 활동에만: 예약 이행 시 HRP(서비스별 point) + CP +3 (POLICY §3·§4).
 * 수치는 전부 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState, useMemo } from "react";
import { Check, ChevronRight } from "lucide-react";
import { SubHead, Btn, Card, CtaBar, Sheet, Spec, Note } from "../components.jsx";
import { L, pick, fmtDate, num } from "../i18n.js";
import { VENUES, SLOTS } from "../data.js";
import "../style.css";

/** 예약 이행 시 CP 적립 — POLICY §4 (데모 자리표시자) */
const CP_PER_BOOKING = 3;

export default function Book({ lang, venueId, serviceId, onBack, onDone, confirmBooking }) {
  const v = VENUES.find((x) => x.id === venueId);
  const [sid, setSid] = useState(serviceId);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(null);
  const [sheet, setSheet] = useState(false);
  const [done, setDone] = useState(false);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  if (!v) return null;
  const s = v.services.find((x) => x.id === sid) || v.services[0];
  const date = fmtDate(days[dayIdx], lang);
  const taken = (i) => (dayIdx + i) % 4 === 1; // 데모: 일부 슬롯 마감

  const confirm = () => {
    confirmBooking({ venue: pick(v.name, lang), name: pick(s.name, lang), date, slot, price: s.price, point: s.point, cp: CP_PER_BOOKING });
    setSheet(false);
    setDone(true);
  };

  if (done)
    return (
      <>
        <SubHead title={L(lang, "예약 완료", "Đặt lịch hoàn tất")} onBack={onDone} />
        <Card>
          <div className="done">
            <div className="ck"><Check size={28} /></div>
            <h2>{pick(s.name, lang)}</h2>
            <p>{pick(v.name, lang)}<br />{date} · {slot} · {pick(s.time, lang)}</p>
            <span className="earn">+{num(s.point, lang)} HRP · +{CP_PER_BOOKING} CP</span>
          </div>
          <Spec
            rows={[
              { k: L(lang, "결제 예정", "Sẽ thanh toán"), v: `${num(s.price, lang)} VND` },
              { k: L(lang, "적립", "Tích lũy"), v: `+${num(s.point, lang)} HRP · +${CP_PER_BOOKING} CP`, earn: true },
            ]}
          />
        </Card>
        <Note>
          {L(
            lang,
            "적립은 방문 확인 후 확정됩니다. 이용 후 Verified Review를 남기면 +5 CP가 추가됩니다.",
            "Điểm được xác nhận sau khi bạn đến. Viết Verified Review sau khi dùng sẽ được thêm +5 CP."
          )}
        </Note>
        <CtaBar>
          <Btn onClick={onDone}>{L(lang, "확인", "Xác nhận")}</Btn>
        </CtaBar>
      </>
    );

  return (
    <>
      <SubHead title={L(lang, "예약하기", "Đặt lịch")} onBack={onBack} />

      <h3 className="section sm">{L(lang, "서비스", "Dịch vụ")}</h3>
      <div className="chips">
        {v.services.map((x) => (
          <button key={x.id} className={"chip" + (x.id === s.id ? " on" : "")} onClick={() => setSid(x.id)}>
            {pick(x.name, lang)}
          </button>
        ))}
      </div>

      <h3 className="section sm">{L(lang, "날짜", "Ngày")}</h3>
      <div className="chips">
        {days.map((d, i) => (
          <button key={i} className={"chip" + (i === dayIdx ? " on" : "")} onClick={() => { setDayIdx(i); setSlot(null); }}>
            {fmtDate(d, lang)}
          </button>
        ))}
      </div>

      <h3 className="section sm">{L(lang, "시간", "Giờ")}</h3>
      <div className="chips wrap">
        {SLOTS.map((t, i) => (
          <button key={t} className={"chip" + (slot === t ? " on" : "")} disabled={taken(i)} onClick={() => setSlot(t)}>
            {t}
          </button>
        ))}
      </div>

      <Card>
        <Spec
          rows={[
            { k: L(lang, "매장", "Cửa hàng"), v: pick(v.name, lang) },
            { k: L(lang, "소요 시간", "Thời lượng"), v: pick(s.time, lang) },
            { k: L(lang, "적립 예정", "Sẽ tích lũy"), v: `+${num(s.point, lang)} HRP · +${CP_PER_BOOKING} CP`, earn: true },
            { k: L(lang, "결제 예정", "Sẽ thanh toán"), v: `${num(s.price, lang)} VND`, total: true },
          ]}
        />
      </Card>
      <Note>{pick(v.policy, lang)}</Note>

      <CtaBar>
        <Btn onClick={() => slot && setSheet(true)}>
          {slot ? L(lang, "예약 확인", "Xác nhận đặt lịch") : L(lang, "시간을 선택해 주세요", "Vui lòng chọn giờ")}
        </Btn>
      </CtaBar>

      {sheet && (
        <Sheet title={L(lang, "예약 확인", "Xác nhận đặt lịch")} onClose={() => setSheet(false)}>
          <Spec
            rows={[
              { k: L(lang, "서비스", "Dịch vụ"), v: pick(s.name, lang) },
              { k: L(lang, "일시", "Thời gian"), v: `${date} · ${slot}` },
              { k: L(lang, "적립", "Tích lũy"), v: `+${num(s.point, lang)} HRP · +${CP_PER_BOOKING} CP`, earn: true },
              { k: L(lang, "결제", "Thanh toán"), v: `${num(s.price, lang)} VND`, total: true },
            ]}
          />
          <Btn onClick={confirm}>{L(lang, "예약 확정", "Xác nhận")}</Btn>
        </Sheet>
      )}
    </>
  );
}
