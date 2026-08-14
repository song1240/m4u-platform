/**
 * MY — 프로필 · 지갑 · 내역 · 설정 · 파트너 진입 (H06 ⑦, DESIGN_SYSTEM §4.2 패턴)
 * 앱 분리 없이 하나의 계정 · 하나의 지갑으로 파트너 모드에 진입한다 (POLICY §8).
 */
import React from "react";
import { MapPin, Wallet as WalletIcon, CalendarDays, Ticket, Vote, Globe, Settings, BedDouble, ChevronRight } from "lucide-react";
import { Card, Note } from "../components.jsx";
import { L, num } from "../i18n.js";
import "../style.css";

export default function My({ lang, zone, points, cp, bookings, coupons, openVotes, checkedIn, go, onMenu, onWallet, onPartner, partnerActive }) {
  const usableCoupons = coupons.filter((c) => !c.used).length;
  const menus = [
    {
      id: "residence", icon: <BedDouble size={18} />, act: () => go("residence"),
      label: L(lang, "내 레지던스", "Căn hộ của tôi"),
      desc: checkedIn
        ? L(lang, "체크인 완료 · Ocean Residence 1208호", "Đã nhận phòng · Ocean Residence 1208")
        : L(lang, "QR 체크인 · Ocean Residence", "Check-in QR · Ocean Residence"),
    },
    {
      id: "bookings", icon: <CalendarDays size={18} />, act: () => go("bookings"),
      label: L(lang, "예약 내역", "Lịch sử đặt chỗ"),
      desc: L(lang, `${bookings.length}건`, `${bookings.length} lượt`),
    },
    {
      id: "coupons", icon: <Ticket size={18} />, act: onWallet,
      label: L(lang, "쿠폰 · 혜택", "Ưu đãi · phiếu giảm giá"),
      desc: L(lang, `사용 가능 ${usableCoupons}장`, `${usableCoupons} mã khả dụng`),
    },
    {
      id: "vote", icon: <Vote size={18} />, act: () => go("vote"),
      label: L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng"),
      desc: L(lang, `진행 중 ${openVotes}건 · 투표권 ${num(cp, lang)} CP`, `${openVotes} đang mở · quyền ${num(cp, lang)} CP`),
    },
    {
      id: "zone", icon: <MapPin size={18} />, act: () => onMenu("zone"),
      label: L(lang, "MY ZONE 설정", "Cài đặt MY ZONE"),
      desc: L(lang, `${zone} · 이사 · 여행 시 변경`, `${zone} · đổi khi chuyển nhà · du lịch`),
    },
    {
      id: "lang", icon: <Globe size={18} />, act: () => onMenu("lang"),
      label: L(lang, "언어", "Ngôn ngữ"),
      desc: L(lang, "한국어 · Tiếng Việt", "한국어 · Tiếng Việt"),
    },
  ];

  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>MY</span></div>
        <div className="zonechip"><MapPin size={12} /> {zone}</div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "회원님", "Thành viên")}</h1>
          <p>★ GOLD MEMBER</p>
        </div>
      </div>

      <Card c="wallet" onClick={onWallet}>
        <small>M4U POINT · HRP</small>
        <h1>{num(points, lang)} HRP</h1>
        <p>{L(lang, `기여 포인트 ${num(cp, lang)} CP · 지갑 열기`, `Điểm đóng góp ${num(cp, lang)} CP · mở ví`)}</p>
      </Card>

      <div className="sechead">
        <h3 className="section">MY</h3>
      </div>
      {menus.map((m) => (
        <Card key={m.id} onClick={m.act}>
          <div className="prof">
            <i>{m.icon}</i>
            <div className="bd">
              <b>{m.label}</b>
              <p>{m.desc}</p>
            </div>
            <ChevronRight size={16} className="chev" />
          </div>
        </Card>
      ))}
      <Card>
        <div className="prof dim">
          <i><Settings size={18} /></i>
          <div className="bd">
            <b>{L(lang, "알림 · 결제수단", "Thông báo · thanh toán")}</b>
            <p>{L(lang, "준비 중입니다", "Đang chuẩn bị")}</p>
          </div>
        </div>
      </Card>

      <div className="sechead">
        <h3 className="section">M4U PARTNER</h3>
      </div>
      <Card c="ai" onClick={onPartner}>
        <WalletIcon size={20} />
        <div>
          <small>BUSINESS</small>
          <h2>{partnerActive ? "MY BUSINESS" : L(lang, "내 생활권에서 사업하기", "Kinh doanh trong khu bạn ở")}</h2>
          <p>{partnerActive
            ? L(lang, "운영 현황 · Contributor Center 열기", "Tình hình vận hành · mở Contributor Center")
            : L(lang, "AI에게 말하면 등록 초안을 만들어드려요 · 승인 시 +50 CP", "Nói với AI để tạo bản nháp đăng ký · duyệt xong +50 CP")}</p>
        </div>
        <ChevronRight size={15} className="chev" />
      </Card>
      <Note>
        {L(lang, "앱을 따로 설치하지 않습니다 — 하나의 계정과 하나의 지갑으로 파트너 모드를 함께 사용합니다.", "Không cần cài app riêng — dùng chung một tài khoản và một ví với chế độ đối tác.")}
      </Note>
    </>
  );
}
