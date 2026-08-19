/**
 * 카테고리 목록 — Living 타일에서 진입. 순서는 Consumer First Ranking (POLICY §1).
 * MOVE(전기카트)와 STAY(레지던스)는 매장 목록이 아니라 전용 안내 화면으로 분기한다.
 */
import React, { useMemo } from "react";
import { Store } from "lucide-react";
import { SubHead, Btn, Card, Empty, Note, Photo } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { VENUES, LIVING_TILES, IMG } from "../data.js";
import { rankVenues } from "../ranking.js";
import { VenueRow } from "./Living.jsx";
import "../style.css";

export default function Category({ lang, catId, onBack, goSub, toast }) {
  const tile = LIVING_TILES.find((t) => t.id === catId) || LIVING_TILES[0];
  const list = useMemo(() => rankVenues(VENUES).filter((v) => tile.cats.includes(v.cat)), [tile]);
  const title = `${tile.name} · ${pick(tile.sub, lang)}`;

  if (catId === "move")
    return (
      <>
        <SubHead title={title} onBack={onBack} />
        <div className="dhero">
          <Photo src={IMG.cart} eager />
        </div>
        <Card c="space">
          <em>M4U MOVE</em>
          <h2>{L(lang, "M4U E-카트 호출", "Gọi xe điện M4U")}</h2>
          <p>{L(lang, `단지 전역 · 06:00 - 23:00 · 기본요금 ${num(20000, lang)} VND`, `Toàn khu · 06:00 - 23:00 · giá cơ bản ${num(20000, lang)} VND`)}</p>
          <Btn onClick={() => toast(L(lang, "가장 가까운 카트를 배차했어요 · 3분 후 도착", "Đã điều xe gần nhất · đến sau 3 phút"))}>
            {L(lang, "지금 호출", "Gọi ngay")}
          </Btn>
        </Card>
        <Note>{L(lang, "이용 요금은 이동 거리 기준이며, 결제 시 HRP로 적립됩니다.", "Cước tính theo quãng đường, thanh toán được tích lũy HRP.")}</Note>
      </>
    );

  return (
    <>
      <SubHead title={title} onBack={onBack} />
      {list.length === 0 ? (
        <Empty icon={<Store size={26} />}>
          {L(lang, "이 카테고리의 입점 매장을 준비 중입니다.", "Đang chuẩn bị cửa hàng cho danh mục này.")}
        </Empty>
      ) : (
        <>
          {list.map((v) => (
            <VenueRow key={v.id} v={v} lang={lang} onClick={() => goSub("venue", { venueId: v.id })} />
          ))}
          <Note>
            <b>Consumer First Ranking</b>
            {L(lang, " — 광고비는 순위에 반영되지 않습니다.", " — chi phí quảng cáo không ảnh hưởng đến xếp hạng.")}
          </Note>
        </>
      )}
    </>
  );
}
