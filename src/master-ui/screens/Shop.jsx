/**
 * SHOP — M4U 셀렉트 상품 + 주문 내역 + MY ZONE 스토어 (Living SHOP 타일에서 진입)
 * "공식"은 M4U가 직접 소싱했다는 표시이며 광고 노출과 무관하다 (POLICY §1).
 * 결제 금액에 비례해 HRP가 적립된다 (POLICY §3). 가격·적립률은 데모 자리표시자.
 */
import React from "react";
import { ShoppingBag } from "lucide-react";
import { SubHead, Card, Tag, Note, Photo } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { PRODUCTS, VENUES } from "../data.js";
import { rankVenues } from "../ranking.js";
import { VenueRow } from "./Living.jsx";
import "../style.css";

export default function Shop({ lang, orders, cartCount, onBack, goSub }) {
  const stores = rankVenues(VENUES).filter((v) => v.cat === "shop");
  return (
    <>
      <SubHead lang={lang} title="SHOP" onBack={onBack} />

      <Card onClick={() => goSub("cart")}>
        <div className="prof">
          <i><ShoppingBag size={18} /></i>
          <div className="bd">
            <b>{L(lang, "장바구니", "Giỏ hàng")}</b>
            <p>{L(lang, `담은 상품 ${cartCount}개`, `${cartCount} sản phẩm`)}</p>
          </div>
          {cartCount > 0 && <Tag kind="st">{cartCount}</Tag>}
        </div>
      </Card>

      {orders.length > 0 && (
        <>
          <div className="sechead">
            <h3 className="section">{L(lang, "주문 내역", "Lịch sử đơn hàng")}</h3>
          </div>
          {orders.map((o) => (
            <Card c="logrow" key={o.id}>
              <div className="bd">
                <b>{o.first}{o.count > 1 ? L(lang, ` 외 ${o.count - 1}건`, ` và ${o.count - 1} sản phẩm khác`) : ""}</b>
                <p>{o.when} · {num(o.total, lang)} VND · +{num(o.point, lang)} HRP</p>
              </div>
              <Tag kind="st">{L(lang, "배송 준비", "Đang chuẩn bị")}</Tag>
            </Card>
          ))}
        </>
      )}

      <div className="sechead">
        <h3 className="section">M4U Select</h3>
      </div>
      <div className="twocol">
        {PRODUCTS.map((p) => {
          const dc = p.origin ? Math.round((1 - p.price / p.origin) * 100) : null;
          return (
            <Card c="pcard" key={p.id} onClick={() => goSub("product", { productId: p.id })}>
              <Photo src={p.img} />
              <div className="bd">
                <span className="br">{p.brand}</span>
                <b>{pick(p.name, lang)}</b>
                <div className="pr">
                  <span className="now">{num(p.price, lang)}</span>
                  {p.origin && <span className="was">{num(p.origin, lang)}</span>}
                  {dc && <span className="off">-{dc}%</span>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Note>
        {L(lang, "M4U가 직접 소싱한 상품에만 공식 표시가 붙습니다. 노출 순서는 광고비와 무관합니다.", "Chỉ sản phẩm do M4U trực tiếp tuyển chọn mới có nhãn chính hãng. Thứ tự hiển thị không liên quan đến chi phí quảng cáo.")}
      </Note>

      {stores.length > 0 && (
        <>
          <div className="sechead">
            <h3 className="section">{L(lang, "MY ZONE 스토어", "Cửa hàng MY ZONE")}</h3>
          </div>
          {stores.map((v) => (
            <VenueRow key={v.id} v={v} lang={lang} onClick={() => goSub("venue", { venueId: v.id })} />
          ))}
        </>
      )}
    </>
  );
}
