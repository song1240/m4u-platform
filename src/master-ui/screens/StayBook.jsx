/**
 * 객실 예약 — 체크인 날짜 · 숙박일 수 → 확인 시트 → 완료
 * 스테이 예약 완료 시 +5 CP (POLICY §4), 결제액 비례 HRP (POLICY §3).
 * 수치는 전부 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState, useMemo } from "react";
import { ArrowLeft, Minus, Plus, Check, QrCode } from "lucide-react";
import { Card, Btn, Note, Sheet, Spec, CtaBar, Tag, Photo } from "../components.jsx";
import { L, pick, num, fmtDate } from "../i18n.js";
import { STAYS, STAY_CP, STAY_HRP_DIV } from "../data.js";
import "../style.css";

export default function StayBook({ lang, stayId, onBack, onDone, confirmStay }) {
  const [dayIdx, setDayIdx] = useState(0);
  const [nights, setNights] = useState(3);
  const [sheet, setSheet] = useState(false);
  const [done, setDone] = useState(false);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const r = STAYS.find((x) => x.id === stayId);
  if (!r) return null;

  const inDate = days[dayIdx];
  const outDate = new Date(inDate);
  outDate.setDate(outDate.getDate() + nights);
  const range = `${fmtDate(inDate, lang)} → ${fmtDate(outDate, lang)}`;
  const nightsLabel = L(lang, `${nights}박`, `${nights} đêm`);
  const total = r.price * nights;
  const point = Math.round(total / STAY_HRP_DIV);

  const confirm = () => {
    confirmStay({ name: pick(r.name, lang), range, nights: nightsLabel, total, point, cp: STAY_CP });
    setSheet(false);
    setDone(true);
  };

  if (done)
    return (
      <>
        <div className="dhero">
          <Photo src={r.img} eager />
          <button className="fabr l" onClick={onDone} aria-label={L(lang, "뒤로", "Quay lại")}><ArrowLeft size={18} /></button>
        </div>
        <Card>
          <div className="done">
            <div className="ck"><Check size={28} /></div>
            <h2>{pick(r.name, lang)}</h2>
            <p>{range} · {nightsLabel}</p>
            <span className="earn">+{num(point, lang)} HRP · +{STAY_CP} CP</span>
          </div>
          <Spec
            rows={[
              { k: L(lang, "결제 예정", "Sẽ thanh toán"), v: `${num(total, lang)} VND` },
              { k: L(lang, "적립", "Tích lũy"), v: `+${num(point, lang)} HRP · +${STAY_CP} CP`, earn: true },
            ]}
          />
        </Card>
        <Card>
          <div className="prof">
            <i><QrCode size={18} /></i>
            <div className="bd">
              <b>{L(lang, "체크인 당일 QR이 발급됩니다", "QR sẽ được cấp vào ngày nhận phòng")}</b>
              <p>{L(lang, "MY · 내 레지던스에서 셀프 체크인할 수 있어요", "Có thể tự nhận phòng tại MY · căn hộ của tôi")}</p>
            </div>
          </div>
        </Card>
        <Note>
          {L(lang, "투숙 기간에 객실 QR로 이용한 지역 서비스는 HRP로 적립되고, Host에게도 1단계 추천 보상이 귀속됩니다. 본인 결제는 Host 보상에서 제외됩니다.", "Dịch vụ dùng qua QR phòng trong thời gian lưu trú sẽ tích HRP và Host nhận thưởng giới thiệu một cấp. Thanh toán của chính Host không được tính.")}
        </Note>
        <CtaBar>
          <Btn onClick={onDone}>{L(lang, "확인", "Xác nhận")}</Btn>
        </CtaBar>
      </>
    );

  return (
    <>
      <div className="dhero">
        <Photo src={r.img} eager />
        <button className="fabr l" onClick={onBack} aria-label={L(lang, "뒤로", "Quay lại")}><ArrowLeft size={18} /></button>
      </div>

      <div className="vhead">
        <div className="tl">
          <Tag kind="st">★ {r.rating} ({r.reviews})</Tag>
        </div>
        <h1>{pick(r.name, lang)}</h1>
        <p>{pick(r.size, lang)} · {L(lang, `1박 ${num(r.price, lang)} VND`, `${num(r.price, lang)} VND/đêm`)}</p>
      </div>

      <div className="feats">
        {r.amen.map((a) => (
          <div key={a.ko}>
            <i>{a.emoji}</i>
            <span>{pick(a, lang)}</span>
          </div>
        ))}
      </div>
      <Card>
        <p className="rvtx">{pick(r.desc, lang)}</p>
      </Card>

      <h3 className="section sm">{L(lang, "체크인", "Ngày nhận phòng")}</h3>
      <div className="chips">
        {days.map((d, i) => (
          <button key={i} className={"chip" + (i === dayIdx ? " on" : "")} onClick={() => setDayIdx(i)}>
            {fmtDate(d, lang)}
          </button>
        ))}
      </div>

      <h3 className="section sm">{L(lang, "숙박", "Số đêm")}</h3>
      <Card>
        <div className="nights">
          <b>{nightsLabel}</b>
          <div className="stepper">
            <button onClick={() => setNights((n) => Math.max(1, n - 1))}><Minus size={13} /></button>
            <b>{nights}</b>
            <button onClick={() => setNights((n) => Math.min(30, n + 1))}><Plus size={13} /></button>
          </div>
        </div>
        <Spec
          rows={[
            { k: L(lang, "기간", "Thời gian"), v: range },
            { k: L(lang, "적립 예정", "Sẽ tích lũy"), v: `+${num(point, lang)} HRP · +${STAY_CP} CP`, earn: true },
            { k: L(lang, "총 결제 금액", "Tổng thanh toán"), v: `${num(total, lang)} VND`, total: true },
          ]}
        />
      </Card>

      <CtaBar>
        <Btn onClick={() => setSheet(true)}>{L(lang, "예약 확인", "Xác nhận đặt phòng")}</Btn>
      </CtaBar>

      {sheet && (
        <Sheet lang={lang} title={L(lang, "객실 예약 확인", "Xác nhận đặt phòng")} onClose={() => setSheet(false)}>
          <Spec
            rows={[
              { k: L(lang, "객실", "Phòng"), v: pick(r.name, lang) },
              { k: L(lang, "기간", "Thời gian"), v: `${range} · ${nightsLabel}` },
              { k: L(lang, "적립", "Tích lũy"), v: `+${num(point, lang)} HRP · +${STAY_CP} CP`, earn: true },
              { k: L(lang, "결제", "Thanh toán"), v: `${num(total, lang)} VND`, total: true },
            ]}
          />
          <Btn onClick={confirm}>{L(lang, "예약 확정", "Xác nhận")}</Btn>
        </Sheet>
      )}
    </>
  );
}
