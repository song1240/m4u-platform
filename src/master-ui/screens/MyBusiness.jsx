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
import { ArrowRight, QrCode, ShieldCheck, Sparkles, Car } from "lucide-react";
import { SubHead, Card, Note, Tag, Sheet } from "../components.jsx";
import { L, pick, num } from "../i18n.js";
import { PARTNER_ROLES, CONTRIB, CONTRIB_QR, HOST_TOP5, HOST_SUMMARY, CART_INIT, AI_CHIPS, AI_CHIP_TOGGLE } from "../data.js";
import "../style.css";

const QrBox = () => (
  <div className="qr">
    {Array.from({ length: 81 }).map((_, i) => (
      <i key={i} className={(i * 7 + 3) % 5 < 3 ? "" : "off"} />
    ))}
  </div>
);

export default function MyBusiness({ lang, role = "local", setRole, onBack, toast }) {
  const [qr, setQr] = useState(null);
  const [online, setOnline] = useState(true);
  const [price, setPrice] = useState(CART_INIT.price);
  const [stats, setStats] = useState(CART_INIT);
  const [callOpen, setCallOpen] = useState(true);
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");
  const isHost = role === "host";
  const qrTypes = CONTRIB_QR[role] || CONTRIB_QR.local;

  /** AI Manager — 자연어로 가격 변경 · 운영 중단/재개 · 현황 조회 (데모 규칙) */
  const reply = (x) => {
    const pm = x.match(/(\d[\d,.]{2,})/);
    if (/가격|요금|giá/i.test(x) && pm) {
      const p = parseInt(pm[1].replace(/[,.]/g, ""), 10);
      setPrice(p);
      return L(lang, `기본요금을 ${num(p, lang)} VND으로 변경했습니다. 지금부터 신규 호출에 적용됩니다.`, `Đã đổi giá cơ bản thành ${num(p, lang)} VND, áp dụng cho cuốc mới.`);
    }
    if (/중단|중지|멈|쉬|dừng|tạm/i.test(x)) {
      setOnline(false);
      return L(lang, "운영을 중단했습니다. 신규 호출 접수가 멈춥니다.", "Đã tạm dừng. Ngừng nhận cuốc mới.");
    }
    if (/시작|재개|열어|켜|mở|bật/i.test(x)) {
      setOnline(true);
      return L(lang, "운영을 재개했습니다. 다시 ONLINE 상태입니다.", "Đã mở lại. Trạng thái ONLINE.");
    }
    if (/매출|정산|doanh thu/i.test(x))
      return L(lang, `오늘 매출은 ${num(stats.revenue, lang)} VND입니다. 호출 ${stats.calls}건 · 예약 ${stats.bookings}건 · 평균 ★${stats.rating}.`, `Doanh thu hôm nay ${num(stats.revenue, lang)} VND. ${stats.calls} cuốc · ${stats.bookings} đặt trước · TB ★${stats.rating}.`);
    if (/리뷰|평가|순위|đánh giá|hạng/i.test(x))
      return L(lang, `평균 ★${stats.rating}, MY ZONE ${stats.rank}위입니다. 순위는 Consumer First Ranking으로만 계산되며 광고비는 반영되지 않습니다.`, `TB ★${stats.rating}, hạng ${stats.rank} MY ZONE. Xếp hạng chỉ theo Consumer First Ranking, không tính quảng cáo.`);
    return L(lang, '이렇게 말해 보세요 — "오늘 매출 알려줘" · "가격 25,000동으로 바꿔줘" · "운영 중단해줘"', 'Thử nói — "doanh thu hôm nay" · "đổi giá 25.000đ" · "tạm dừng"');
  };
  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setLog((l) => [...l, { id: l.length, me: true, text: msg }, { id: l.length + 1, me: false, text: reply(msg) }]);
    setInput("");
  };
  const acceptCall = () => {
    setCallOpen(false);
    setStats((s) => ({ ...s, calls: s.calls + 1, revenue: s.revenue + price }));
    toast(L(lang, `호출 수락 · +${num(price, lang)} VND`, `Đã nhận cuốc · +${num(price, lang)} VND`));
  };
  const chips = [...AI_CHIPS, online ? AI_CHIP_TOGGLE.stop : AI_CHIP_TOGGLE.start].map((c) => L(lang, c.ko, c.vi));

  return (
    <>
      <SubHead title="MY BUSINESS" onBack={onBack} />
      {isHost && (
        <div className="sechead">
          <Tag kind="ok"><ShieldCheck size={10} /> M4U Recommended Stay</Tag>
          <span className="hintxt">{L(lang, "이용률 · 만족도 기반 · 구매 불가", "Theo tỷ lệ sử dụng · hài lòng · không thể mua")}</span>
        </div>
      )}

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
          <Card c="togg">
            <div className="bd">
              <b>{online ? "ONLINE" : "OFFLINE"}</b>
              <p>{online ? L(lang, "신규 호출을 받고 있어요", "Đang nhận cuốc mới") : L(lang, "신규 호출 접수가 멈춰 있어요", "Đang ngừng nhận cuốc")}</p>
            </div>
            <button className={"sw" + (online ? " on" : "")} onClick={() => setOnline((o) => !o)}><i /></button>
          </Card>

          <Card c="wcard">
            <div className="assets">
              <div className="asset">
                <small>{L(lang, "오늘 매출", "Doanh thu hôm nay")}</small>
                <b>{num(stats.revenue, lang)}</b>
                <span>{L(lang, `호출 ${stats.calls}건 · 예약 ${stats.bookings}건`, `${stats.calls} cuốc · ${stats.bookings} đặt trước`)}</span>
              </div>
              <span className="sep" />
              <div className="asset">
                <small>{L(lang, "기본요금", "Giá cơ bản")}</small>
                <b>{num(price, lang)}</b>
                <span>{L(lang, `★ ${stats.rating} · MY ZONE ${stats.rank}위`, `★ ${stats.rating} · hạng ${stats.rank} MY ZONE`)}</span>
              </div>
            </div>
            <p>{L(lang, "순위는 별점 · 재이용 · 이행률로 계산됩니다. 광고비로 순위를 올릴 수 없습니다.", "Xếp hạng tính theo đánh giá · tỷ lệ quay lại · hoàn thành. Không thể mua thứ hạng bằng quảng cáo.")}</p>
          </Card>

          {online && callOpen && (
            <Card c="call">
              <div className="rowx">
                <i className="ic"><Car size={19} /></i>
                <div className="bd">
                  <b>{L(lang, "새 호출 · 도보 2분 거리", "Cuốc mới · cách 2 phút")}</b>
                  <p>S2.01 → Ocean Residence · {num(price, lang)} VND</p>
                </div>
              </div>
              <div className="acts">
                <button onClick={() => setCallOpen(false)}>{L(lang, "거절", "Từ chối")}</button>
                <button className="go" onClick={acceptCall}>{L(lang, "수락", "Nhận cuốc")}</button>
              </div>
            </Card>
          )}

          <div className="sechead">
            <h3 className="section">AI MANAGER</h3>
          </div>
          <Card>
            <div className="chips">
              {chips.map((c) => (
                <button key={c} className="chip" onClick={() => send(c)}>{c}</button>
              ))}
            </div>
            {log.length > 0 && (
              <div className="chat">
                {log.map((m) => (
                  <div key={m.id} className={"bub" + (m.me ? " me" : "")}>{m.text}</div>
                ))}
              </div>
            )}
            <div className="chatin">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={L(lang, "AI Manager에게 말하기", "Nói với AI Manager")}
              />
              <button onClick={() => send()}><Sparkles size={15} /></button>
            </div>
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
