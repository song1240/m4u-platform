/**
 * 적립 내역 — HRP · CP (H06 ⑥)
 * CP 탭에는 적립 규칙을 함께 보여준다 — 구매·양도가 불가능하고 검증된 활동에만 쌓인다 (POLICY §4).
 */
import React, { useState } from "react";
import { SubHead, Card, Note, Empty } from "../components.jsx";
import { L, num } from "../i18n.js";
import { CP_RULES } from "../data.js";
import "../style.css";

export default function PointLog({ lang, kind = "hrp", points, cp, txs, cpLog, onBack }) {
  const [tab, setTab] = useState(kind === "cp" ? "cp" : "hrp");
  const isCp = tab === "cp";
  const list = isCp ? cpLog : txs;

  return (
    <>
      <SubHead title={L(lang, "적립 내역", "Lịch sử tích lũy")} onBack={onBack} />
      <div className="segs">
        <button className={!isCp ? "on" : ""} onClick={() => setTab("hrp")}>HRP</button>
        <button className={isCp ? "on" : ""} onClick={() => setTab("cp")}>CP</button>
      </div>

      <Card c="wcard">
        <div className="assets">
          <div className="asset">
            <small>{isCp ? "CP" : "HRP"}</small>
            <b>{num(isCp ? cp : points, lang)}</b>
            <span>
              {isCp
                ? L(lang, "기여 포인트 · 투표 가중치", "Điểm đóng góp · trọng số bỏ phiếu")
                : L(lang, "HARU REWARD POINT · 결제 · 적립", "HARU REWARD POINT · thanh toán · tích lũy")}
            </span>
          </div>
        </div>
      </Card>

      {list.length === 0 ? (
        <Empty>{L(lang, "아직 내역이 없습니다. 예약 · 습관 · 공동구매로 적립해 보세요.", "Chưa có lịch sử. Hãy tích lũy qua đặt lịch · thói quen · mua chung.")}</Empty>
      ) : (
        list.map((t) => (
          <Card c="logrow" key={t.id}>
            <div className="bd">
              <b>{t.label}</b>
              <p>{t.when}</p>
            </div>
            <span className="amt up">+{num(t.amount, lang)} {isCp ? "CP" : "HRP"}</span>
          </Card>
        ))
      )}

      {isCp && (
        <>
          <h3 className="section">{L(lang, "CP 적립 규칙", "Quy tắc tích lũy CP")}</h3>
          <Card>
            <div className="spec">
              {CP_RULES.map((r) => (
                <div className="r" key={r.id}>
                  <span>{L(lang, r.ko, r.vi)}</span>
                  <b className="earn">{r.val}</b>
                </div>
              ))}
            </div>
          </Card>
          <Note>
            {L(lang, "CP는 검증 가능한 활동에만 규칙에 따라 자동 적립됩니다. 구매 · 양도 · 수동 발행은 불가능합니다.", "CP chỉ tự động tích lũy theo quy tắc cho hoạt động có thể xác minh. Không thể mua, chuyển nhượng hay cấp thủ công.")}
          </Note>
        </>
      )}
    </>
  );
}
