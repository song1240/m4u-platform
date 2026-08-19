/**
 * 장바구니 — 수량 조절 · 명세 · 결제
 * 결제 전에 적립 예정 HRP를 명세로 보여준다 (POLICY §3). 수치는 데모 자리표시자.
 */
import React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { SubHead, Card, Btn, Empty, Note, Spec, CtaBar, Photo } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import "../style.css";

export default function Cart({ lang, cart, setQty, placeOrder, onBack }) {
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const point = cart.reduce((s, x) => s + x.point * x.qty, 0);

  return (
    <>
      <SubHead lang={lang} title={L(lang, "장바구니", "Giỏ hàng")} onBack={onBack} />
      {cart.length === 0 ? (
        <Empty icon={<ShoppingBag size={26} />}>
          {L(lang, "장바구니가 비어 있습니다. M4U Select에서 상품을 담아보세요.", "Giỏ hàng trống. Hãy chọn sản phẩm trong M4U Select.")}
        </Empty>
      ) : (
        <>
          {cart.map((x) => (
            <Card c="cartrow" key={x.id}>
              <span className="ph"><Photo src={x.img} /></span>
              <div className="bd">
                <b>{pick(x.name, lang)}</b>
                <div className="stepper">
                  <button onClick={() => setQty(x.id, -1)} aria-label={L(lang, "수량 줄이기", "Giảm số lượng")}><Minus size={13} /></button>
                  <b>{x.qty}</b>
                  <button onClick={() => setQty(x.id, 1)} aria-label={L(lang, "수량 늘리기", "Tăng số lượng")}><Plus size={13} /></button>
                </div>
              </div>
              <span className="amt">{num(x.price * x.qty, lang)}</span>
            </Card>
          ))}

          <Card>
            <Spec
              rows={[
                { k: L(lang, "상품 금액", "Tiền hàng"), v: `${num(total, lang)} VND` },
                { k: L(lang, "배송비", "Phí vận chuyển"), v: L(lang, "무료", "Miễn phí") },
                { k: L(lang, "적립 예정", "Sẽ tích lũy"), v: `+${num(point, lang)} HRP`, earn: true },
                { k: L(lang, "총 결제 금액", "Tổng thanh toán"), v: `${num(total, lang)} VND`, total: true },
              ]}
            />
          </Card>
          <Note>
            {L(lang, "적립은 배송 완료 후 확정됩니다. 7일 이내 반품 시 적립도 함께 취소됩니다.", "Điểm được xác nhận sau khi giao hàng. Nếu trả hàng trong 7 ngày, điểm cũng bị hủy.")}
          </Note>

          <CtaBar>
            <Btn onClick={() => placeOrder(cart, total, point)}>
              {L(lang, `${num(total, lang)} VND 결제하기`, `Thanh toán ${num(total, lang)} VND`)}
            </Btn>
          </CtaBar>
        </>
      )}
    </>
  );
}
