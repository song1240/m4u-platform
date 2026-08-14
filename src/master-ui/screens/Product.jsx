/**
 * 상품 상세 — 히어로 · 가격 · 태그 · 상품 구성(아코디언) · 장바구니/바로구매
 * 결제 금액에 비례해 HRP가 적립된다 (POLICY §3). 수치는 데모 자리표시자.
 */
import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Truck, RotateCcw, ShoppingBag } from "lucide-react";
import { Card, Btn, Note, Tag, CtaBar } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { PRODUCTS } from "../data.js";
import "../style.css";

export default function Product({ lang, productId, onBack, addToCart, buyNow }) {
  const [open, setOpen] = useState(true);
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return null;
  const dc = p.origin ? Math.round((1 - p.price / p.origin) * 100) : null;

  return (
    <>
      <div className="dhero">
        <img src={p.img} alt="" />
        <button className="fabr l" onClick={onBack}><ArrowLeft size={18} /></button>
      </div>

      <div className="vhead">
        <div className="tl">
          <span className="br">{p.brand}</span>
          {p.official && <Tag kind="ok">{L(lang, "공식", "Chính hãng")}</Tag>}
        </div>
        <h1>{pick(p.name, lang)}</h1>
        <div className="pr">
          <span className="now">{num(p.price, lang)} VND</span>
          {p.origin && <span className="was">{num(p.origin, lang)}</span>}
          {dc && <span className="off">-{dc}%</span>}
        </div>
        <div className="tagline">
          <span className="tg"><i className="mono">M</i> {num(p.point, lang)} HRP</span>
          <span className="tg"><Truck size={11} /> {L(lang, "무료배송", "Miễn phí vận chuyển")}</span>
          <span className="tg"><RotateCcw size={11} /> {L(lang, "7일 반품 가능", "Đổi trả trong 7 ngày")}</span>
        </div>
      </div>

      <Card>
        <button className="acc" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {L(lang, "상품 구성", "Thành phần bộ sản phẩm")}
          <ChevronDown size={16} />
        </button>
        {open && <div className="acc-bd">{pick(p.consist, lang)}</div>}
        <button className="acc" aria-expanded="true">
          {L(lang, "상품 설명", "Mô tả sản phẩm")}
        </button>
        <div className="acc-bd">{pick(p.desc, lang)}</div>
      </Card>

      <Note>
        {L(lang, `결제 시 ${num(p.point, lang)} HRP가 적립됩니다. 적립은 배송 완료 후 확정됩니다.`, `Thanh toán sẽ tích ${num(p.point, lang)} HRP. Điểm được xác nhận sau khi giao hàng.`)}
      </Note>

      <CtaBar>
        <div className="two">
          <button className="alt" onClick={() => addToCart(p)}>
            <ShoppingBag size={15} /> {L(lang, "담기", "Giỏ hàng")}
          </button>
          <Btn onClick={() => buyNow(p)}>{L(lang, "바로 구매", "Mua ngay")}</Btn>
        </div>
      </CtaBar>
    </>
  );
}
