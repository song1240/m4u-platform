/**
 * MY BUSINESS — 역할별 운영 화면 + CONTRIBUTOR CENTER (H06 ⑦ · H07)
 *
 * POLICY §7 Host 3원칙:
 *  ① 1단계 추천 보상만 (다단계 금지)  ② 체크인~체크아웃 귀속 · Host 본인 결제 제외
 *  ③ 투숙객 개별 결제 내역 비노출 — 카테고리 집계만 제공
 * POLICY §10 Contributor: 보상 2분리(Transaction / Ecosystem), **기여점수는 Consumer First
 *  Ranking과 검색 품질에 절대 반영하지 않는다(랭킹 방화벽)**, 보상 시효 90일, 1단계 한정.
 * 모든 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React, { useState } from "react";
import { ArrowRight, QrCode, ShieldCheck } from "lucide-react";
import { SubHead, Card, Note, Tag, Sheet } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { PARTNER_ROLES, CONTRIB, CONTRIB_QR, HOST_TOP5, HOST_SUMMARY } from "../data.js";
import "../style.css";

const QrBox = () => (
  <div className="qr">
    {Array.from({ length: 81 }).map((_, i) => (
      <i key={i} className={(i * 7 + 3) % 5 < 3 ? "" : "off"} />
    ))}
  </div>
);

export default function MyBusiness({ lang, role = "local", setRole, onBack }) {
  const [qr, setQr] = useState(null);
  const isHost = role === "host";
  const qrTypes = CONTRIB_QR[role] || CONTRIB_QR.local;

  return (
    <>
      <SubHead title="MY BUSINESS" onBack={onBack} />

      <div className="bizsw">
        {PARTNER_ROLES.map((r) => (
          <button key={r.id} className={role === r.id ? "on" : ""} onClick={() => setRole(r.id)}>
            {r.emoji}
          </button>
        ))}
      </div>

      {isHost ? (
        <>
          <Card c="wcard">
            <div className="assets">
              <div className="asset">
                <small>HOST REWARD</small>
                <b>{num(HOST_SUMMARY.reward, lang)}</b>
                <span>{L(lang, `이번 달 · 정산 매월 10일 · 보상률 ${HOST_SUMMARY.rate}%`, `Tháng này · thanh toán ngày 10 · tỷ lệ ${HOST_SUMMARY.rate}%`)}</span>
              </div>
              <span className="sep" />
              <div className="asset">
                <small>GUEST LOCAL GMV</small>
                <b>{num(HOST_SUMMARY.gmv, lang)}</b>
                <span>{L(lang, `객실 ${HOST_SUMMARY.rooms}실 · 투숙객 ${HOST_SUMMARY.guests}명 집계`, `${HOST_SUMMARY.rooms} phòng · tổng hợp ${HOST_SUMMARY.guests} khách`)}</span>
              </div>
            </div>
            <p>{L(lang, "체크인부터 체크아웃까지의 이용만 귀속되며, Host 본인 계정 결제는 보상에서 제외됩니다.", "Chỉ tính từ lúc nhận phòng đến khi trả phòng; thanh toán bằng tài khoản của chính Host không được thưởng.")}</p>
          </Card>

          <div className="sechead">
            <h3 className="section">{L(lang, "투숙객 이용 카테고리", "Danh mục khách sử dụng")}</h3>
          </div>
          {HOST_TOP5.map((h) => (
            <Card c="logrow" key={h.id}>
              <i className="ic">{h.emoji}</i>
              <div className="bd">
                <b>{pick(h.name, lang)}</b>
                <p>{L(lang, "카테고리 집계", "Tổng hợp theo danh mục")}</p>
              </div>
              <span className="amt">{num(h.gmv, lang)}</span>
            </Card>
          ))}
          <Note>
            {L(lang, "투숙객 개별 결제 내역은 제공되지 않습니다 — 카테고리 집계만 확인할 수 있어요. 추천 보상은 1단계로만 지급되며, Host가 다른 Host를 모집해 얻는 수익 구조는 없습니다.", "Không cung cấp chi tiết thanh toán của từng khách — chỉ xem tổng hợp theo danh mục. Thưởng giới thiệu chỉ một cấp; không có cấu trúc thu nhập từ việc tuyển Host khác.")}
          </Note>
        </>
      ) : (
        <>
          <Card c="wcard">
            <div className="assets">
              <div className="asset">
                <small>{L(lang, "오늘 매출", "Doanh thu hôm nay")}</small>
                <b>{num(320000, lang)}</b>
                <span>VND</span>
              </div>
              <span className="sep" />
              <div className="asset">
                <small>{L(lang, "오늘 예약", "Đặt chỗ hôm nay")}</small>
                <b>4</b>
                <span>{L(lang, "★ 4.9 · MY ZONE 2위", "★ 4.9 · hạng 2 MY ZONE")}</span>
              </div>
            </div>
            <p>{L(lang, "순위는 별점 · 재이용 · 이행률로 계산됩니다. 광고비로 순위를 올릴 수 없습니다.", "Xếp hạng tính theo đánh giá · tỷ lệ quay lại · hoàn thành. Không thể mua thứ hạng bằng quảng cáo.")}</p>
          </Card>
          <Note>
            {L(lang, "순위를 올리는 방법은 광고 구매가 아니라 서비스 개선입니다 — 응답 속도와 예약 이행률이 가장 큰 영향을 줍니다.", "Cách tăng hạng là cải thiện dịch vụ, không phải mua quảng cáo — tốc độ phản hồi và tỷ lệ hoàn thành ảnh hưởng lớn nhất.")}
          </Note>
        </>
      )}

      {/* ── CONTRIBUTOR CENTER — 모든 역할 공통 (H07 · POLICY §10) ── */}
      <div className="sechead">
        <h3 className="section">CONTRIBUTOR CENTER</h3>
        <Tag kind="new">★ Gold Contributor</Tag>
      </div>
      <Card>
        <em>{L(lang, "이번 달 생태계 기여", "Đóng góp hệ sinh thái tháng này")}</em>
        <div className="funnel">
          <div><span className="v">{num(CONTRIB.scans, lang)}</span><span className="k">{L(lang, "QR 스캔", "Quét QR")}</span></div>
          <ArrowRight size={13} className="ar" />
          <div><span className="v">{num(CONTRIB.newUsers, lang)}</span><span className="k">{L(lang, "신규 가입", "Đăng ký mới")}</span></div>
          <ArrowRight size={13} className="ar" />
          <div><span className="v">{num(CONTRIB.firstUse, lang)}</span><span className="k">{L(lang, "첫 이용", "Lần dùng đầu")}</span></div>
          <ArrowRight size={13} className="ar" />
          <div><span className="v">{num(CONTRIB.reviews, lang)}</span><span className="k">Verified<br />Review</span></div>
        </div>
        <div className="stat2">
          <div>
            <small>Contribution Score</small>
            <b>{num(CONTRIB.score, lang)}</b>
          </div>
          <div>
            <small>{L(lang, "이번 달 기여 혜택", "Ưu đãi tháng này")}</small>
            <b>{num(CONTRIB.benefit, lang)} VND</b>
          </div>
        </div>
      </Card>

      <div className="sechead">
        <h3 className="section sm">{L(lang, "내 Contributor QR", "QR Contributor của tôi")}</h3>
      </div>
      {qrTypes.map((q) => (
        <div className="hrow" key={q.id}>
          <i className="ic"><QrCode size={19} /></i>
          <div className="bd">
            <b>{q.label}</b>
            <p>{L(lang, "비치하면 스캔한 사용자의 유입이 내 Contributor ID에 기록됩니다", "Đặt QR để lượt giới thiệu được ghi vào Contributor ID của bạn")}</p>
          </div>
          <button className="btn-sm" onClick={() => setQr(q.label)}>{L(lang, "QR 보기", "Xem QR")}</button>
        </div>
      ))}

      <Note>
        <b>{L(lang, "랭킹 방화벽", "Tường lửa xếp hạng")}</b>
        {L(lang, " — 기여점수는 검색·랭킹에 절대 반영되지 않습니다(배지와 별도 섹션 노출만). 보상은 검증된 행동(가입 → 첫 실제 이용 → Verified Review)에만 지급되고, 유입 기록은 영구 보존하되 보상은 가입 후 ", " — điểm đóng góp không bao giờ ảnh hưởng tìm kiếm · xếp hạng (chỉ huy hiệu và khu hiển thị riêng). Thưởng chỉ cho hành vi đã xác minh (đăng ký → dùng thật lần đầu → Verified Review); ghi nhận vĩnh viễn nhưng thưởng chỉ trong ")}
        {CONTRIB.days}
        {L(lang, "일 내 활동까지 적용됩니다. 자기 유입과 다단계 구조는 자동 제외됩니다.", " ngày sau đăng ký. Tự giới thiệu và cấu trúc đa cấp bị loại trừ tự động.")}
      </Note>

      {qr && (
        <Sheet title={`M4U Contributor QR · ${qr}`} onClose={() => setQr(null)}>
          <QrBox />
          <Note>
            {L(lang, "매장 · 객실 · 차량에 비치하면 스캔한 사용자가 M4U로 유입되고, 그 기여가 내 Contributor ID에 기록됩니다.", "Đặt tại cửa hàng · phòng · xe — người quét sẽ vào M4U và lượt giới thiệu được ghi cho Contributor ID của bạn.")}
          </Note>
          <div className="qrfoot">
            <ShieldCheck size={14} />
            {L(lang, "자기 유입(본인·직원 계정)은 자동으로 제외됩니다.", "Tự giới thiệu (tài khoản của bạn · nhân viên) bị loại trừ tự động.")}
          </div>
        </Sheet>
      )}
    </>
  );
}
