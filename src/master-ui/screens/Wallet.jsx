/**
 * 지갑 — HRP · CP · FIVE 공동구매 · 쿠폰 (H06 ⑥, DESIGN_SYSTEM §4.6)
 *
 * POLICY §3 HRP: 결제·적립용 리워드 포인트. 화폐성 표현(Web3 자산 명칭)은 사용자 노출 문구에 쓰지 않는다.
 * POLICY §4 CP: 양도·구매·수동 발행 불가. 검증 가능한 활동에만 적립. 용도는 투표 가중치.
 * POLICY §6 FIVE: 보상은 구매 건수 비례(인원 모집 비례 금지), 미달 시 자동 취소·전액 환불 문구 상시 노출.
 * 모든 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState } from "react";
import { Vote, Ticket, Users, Timer, ChevronRight } from "lucide-react";
import { SubHead, Card, Note, Sheet, Spec, Btn, Countdown, Photo } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { FIVE_TIERS, FIVE_CP, FIVE_ROOMS, COUPONS } from "../data.js";
import "../style.css";

export default function Wallet({ lang, points, cp, joined, joinRoom, coupons, useCoupon, openVotes, onBack, goSub }) {
  const [target, setTarget] = useState(null);
  const tier = target ? FIVE_TIERS[target.tier] : null;
  const price = target ? Math.round(target.origin * (1 - tier.dc / 100)) : 0;
  const usable = coupons.filter((c) => !c.used).length;

  return (
    <>
      <SubHead title={L(lang, "지갑", "Ví của tôi")} onBack={onBack} />

      <Card c="wcard">
        <div className="assets">
          <button className="asset" onClick={() => goSub("log", { kind: "hrp" })}>
            <small>HRP</small>
            <b>{num(points, lang)}</b>
            <span>{L(lang, "HARU REWARD POINT · 결제 · 적립", "HARU REWARD POINT · thanh toán · tích lũy")}</span>
          </button>
          <span className="sep" />
          <button className="asset" onClick={() => goSub("log", { kind: "cp" })}>
            <small>CP</small>
            <b>{num(cp, lang)}</b>
            <span>{L(lang, "기여 포인트 · 투표 가중치", "Điểm đóng góp · trọng số bỏ phiếu")}</span>
          </button>
        </div>
        <p>{L(lang, "CP는 검증된 활동으로만 적립되며 구매·양도할 수 없습니다. 커뮤니티 의사결정의 투표 가중치로 사용됩니다.", "CP chỉ tích lũy qua hoạt động đã xác minh, không thể mua hay chuyển nhượng. CP dùng làm trọng số bỏ phiếu cộng đồng.")}</p>
      </Card>

      <Card onClick={() => goSub("vote")}>
        <div className="prof">
          <i><Vote size={18} /></i>
          <div className="bd">
            <b>{L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng")}</b>
            <p>{L(lang, `진행 중 ${openVotes}건 · 내 투표권 ${num(cp, lang)} CP`, `${openVotes} đề xuất đang mở · quyền biểu quyết ${num(cp, lang)} CP`)}</p>
          </div>
          <ChevronRight size={16} className="chev" />
        </div>
      </Card>

      <div className="sechead">
        <h3 className="section">{L(lang, "M4U FIVE 공동구매", "Mua chung M4U FIVE")}</h3>
      </div>
      {FIVE_ROOMS.map((r) => {
        const t = FIVE_TIERS[r.tier];
        const p = Math.round(r.origin * (1 - t.dc / 100));
        const isJoined = joined.includes(r.id);
        const cnt = r.joined + (isJoined ? 1 : 0);
        const pct = Math.min(100, Math.round((cnt / r.tier) * 100));
        return (
          <Card c="five" key={r.id}>
            <div className="top">
              <span className="ph"><Photo src={r.img} /></span>
              <div className="bd">
                <b>{pick(r.product, lang)}</b>
                <div className="price">
                  <span className="was">{num(r.origin, lang)} VND</span>
                  <span className="now">{num(p, lang)} VND</span>
                  <span className="dc">-{t.dc}%</span>
                </div>
              </div>
            </div>
            <div className="meta">
              <span><Users size={12} /> {L(lang, `${cnt}/${r.tier}명`, `${cnt}/${r.tier} người`)}</span>
              <span><Timer size={12} /> <Countdown hours={r.leftH} lang={lang} /></span>
              <span className="rw">+{t.hrp} HRP · +{FIVE_CP} CP</span>
            </div>
            <div className="bar"><i style={{ width: `${pct}%` }} /></div>
            <button className="primary" disabled={isJoined} onClick={() => setTarget(r)}>
              {isJoined ? L(lang, "참여 완료", "Đã tham gia") : L(lang, `참여하기 · ${num(p, lang)} VND`, `Tham gia · ${num(p, lang)} VND`)}
            </button>
          </Card>
        );
      })}
      <Note>
        {L(lang, "보상은 구매 건수에 비례해 지급되며, 모집 인원 미달 시 자동 취소되고 전액 환불됩니다.", "Thưởng trả theo số lượt mua; nếu không đủ người, đơn tự động hủy và hoàn tiền toàn bộ.")}
      </Note>

      <div className="sechead">
        <h3 className="section">{L(lang, `쿠폰함 ${usable}장`, `Ví mã ưu đãi ${usable}`)}</h3>
      </div>
      {coupons.map((c) => (
        <Card c={"coupon" + (c.used ? " used" : "")} key={c.id}>
          <Ticket size={19} />
          <div className="bd">
            <b>{pick(c.title, lang)}</b>
            <p>{pick(c.desc, lang)}</p>
          </div>
          <button className="btn-sm" disabled={c.used} onClick={() => useCoupon(c.id)}>
            {c.used ? L(lang, "사용됨", "Đã dùng") : L(lang, "사용", "Dùng")}
          </button>
        </Card>
      ))}

      {target && (
        <Sheet title={L(lang, "공동구매 참여", "Tham gia mua chung")} onClose={() => setTarget(null)}>
          <Spec
            rows={[
              { k: L(lang, "상품", "Sản phẩm"), v: pick(target.product, lang) },
              { k: L(lang, "방 구조", "Cấu trúc phòng"), v: L(lang, `${target.tier}인 방 (${target.joined + 1}/${target.tier})`, `Phòng ${target.tier} người (${target.joined + 1}/${target.tier})`) },
              { k: L(lang, "보상", "Thưởng"), v: `+${tier.hrp} HRP · +${FIVE_CP} CP`, earn: true },
              { k: L(lang, "할인가", "Giá ưu đãi"), v: `${num(price, lang)} VND`, total: true },
            ]}
          />
          <Note>
            {L(lang, "결제는 모집 완료 시 진행되며, 미달 시 자동 취소되고 전액 환불됩니다.", "Thanh toán khi đủ người; nếu không đủ sẽ tự động hủy và hoàn tiền toàn bộ.")}
          </Note>
          <Btn onClick={() => { joinRoom(target); setTarget(null); }}>{L(lang, "참여 확정", "Xác nhận tham gia")}</Btn>
        </Sheet>
      )}
    </>
  );
}
