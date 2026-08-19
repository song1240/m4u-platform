/**
 * 파트너 등록 — 역할 선택 → 자유 서술 → AI 구조화 초안 → 필수 확인 3종 → 제출 (H06 ⑦)
 *
 * POLICY §8: 앱 분리 없음(하나의 계정·하나의 지갑). 등록은 AI 대화 → 구조화 초안 →
 * 필수 확인 3종 → Admin 승인 → MY BUSINESS 생성 +50 CP.
 * POLICY §7: HOST는 1단계 추천 보상만 받으며 투숙객 개별 결제 내역은 볼 수 없다.
 */
import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { SubHead, Card, Btn, Note, CtaBar } from "../components.jsx";
import { L, pick } from "../i18n.js";
import { PARTNER_ROLES, CHECK_ITEMS, CATS, DRAFT_RULES, DRAFT_FALLBACK, PARTNER_CP } from "../data.js";
import "../style.css";

/** 자유 서술 → 업종·가격·예약형태·운영시간 구조화 (데모 규칙, 실서비스는 n8n+LLM) */
const structure = (text) => {
  const hit = DRAFT_RULES.find((r) => r.re.test(text)) || DRAFT_FALLBACK;
  const m = text.match(/(\d{1,2})\s*(?:시|h|giờ)(.*?)(\d{1,2})\s*(?:시|h|giờ)/);
  let hours = "10:00 - 20:00";
  if (m) {
    let open = Number(m[1]);
    let close = Number(m[3]);
    // "저녁 8시" 처럼 오후 표현이 붙으면 24시간제로 보정한다
    if (/저녁|오후|밤|tối|chiều/.test(m[2]) && close < 12) close += 12;
    if (close <= open) close = (close + 12) % 24 || 24;
    hours = `${String(open).padStart(2, "0")}:00 - ${String(close).padStart(2, "0")}:00`;
  }
  return { cat: hit.cat, price: hit.price, booking: hit.booking, hours };
};

export default function Partner({ lang, onBack, onApproved }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("local");
  const [text, setText] = useState("");
  const [draft, setDraft] = useState(null);
  const [name, setName] = useState("");
  const [checks, setChecks] = useState({});
  const allChecked = CHECK_ITEMS.every((c) => checks[c.id]);
  const labels = [
    L(lang, "설명", "Mô tả"),
    L(lang, "AI 초안", "Bản nháp AI"),
    L(lang, "필수 확인", "Xác nhận"),
    L(lang, "제출", "Gửi"),
  ];
  const catLabel = (id) => {
    const c = CATS.find((x) => x.id === id);
    return c ? pick(c.label, lang) : id;
  };

  return (
    <>
      <SubHead lang={lang} title={L(lang, "내 사업 시작하기", "Bắt đầu kinh doanh")} onBack={onBack} />
      <div className="steps">
        {labels.map((x, i) => (
          <div key={x} className={step >= i ? "on" : ""}>
            <i>{i + 1}</i>
            <span>{x}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <>
          <h3 className="section sm">{L(lang, "어떤 사업인가요?", "Bạn kinh doanh gì?")}</h3>
          <div className="chips">
            {PARTNER_ROLES.map((r) => (
              <button key={r.id} className={"chip" + (role === r.id ? " on" : "")} onClick={() => setRole(r.id)}>
                {r.emoji} {pick(r.name, lang)}
              </button>
            ))}
          </div>
          {role === "host" && (
            <Note>
              {L(lang, "HOST는 객실별 Guest QR로 투숙객의 지역 소비에서 1단계 추천 보상을 받습니다. 투숙객 개별 결제 내역은 제공되지 않고 집계만 확인할 수 있습니다.", "HOST nhận thưởng giới thiệu một cấp từ tiêu dùng địa phương của khách qua QR theo phòng. Không cung cấp chi tiết thanh toán của từng khách, chỉ xem số liệu tổng hợp.")}
            </Note>
          )}
          <Card>
            <b className="qtx">{L(lang, "사업을 자유롭게 설명해 주세요", "Hãy mô tả tự do về việc kinh doanh")}</b>
            <p className="hint2">{L(lang, "누구나 등록을 요청할 수 있어요. AI가 업종 · 가격 · 운영시간 · 예약형태로 정리합니다.", "Ai cũng có thể gửi yêu cầu. AI sẽ sắp xếp thành ngành · giá · giờ · hình thức đặt chỗ.")}</p>
            <textarea
              className="ta"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={role === "host"
                ? L(lang, "예) 오션 레지던스에서 객실 12개를 운영해요. 투숙객에게 주변 식당·살롱·카트를 연결하고 싶어요.", "VD) Tôi vận hành 12 phòng ở Ocean Residence, muốn kết nối khách với nhà hàng · salon · xe điện.")
                : L(lang, "예) 빈홈 그랜드 파크에서 아침 7시부터 저녁 8시까지 쌀국수 가게를 하려고 해요.", "VD) Tôi muốn mở quán phở ở Vinhomes Grand Park, mở từ 7 giờ sáng đến 8 giờ tối.")}
            />
          </Card>
          <CtaBar>
            <Btn onClick={() => { if (text.trim()) { setDraft(structure(text)); setStep(1); } }}>
              {L(lang, "AI 초안 만들기", "Tạo bản nháp AI")}
            </Btn>
          </CtaBar>
        </>
      )}

      {step === 1 && draft && (
        <>
          <Card c="accent">
            <em>AI DRAFT</em>
            <h2>{L(lang, "이렇게 정리했어요", "Đã sắp xếp như sau")}</h2>
            <div className="fields">
              <div className="r">
                <span>{L(lang, "상호명", "Tên cửa hàng")}</span>
                <input className="inp" value={name} onChange={(e) => setName(e.target.value)} placeholder={L(lang, "상호명 입력", "Nhập tên")} />
              </div>
              <div className="r"><span>{L(lang, "업종 (AI 추정)", "Ngành (AI gợi ý)")}</span><b>{catLabel(draft.cat)}</b></div>
              <div className="r"><span>{L(lang, "가격 체계", "Cách tính giá")}</span><b>{pick(draft.price, lang)}</b></div>
              <div className="r"><span>{L(lang, "운영시간", "Giờ hoạt động")}</span><b>{draft.hours}</b></div>
              <div className="r"><span>{L(lang, "예약 형태", "Hình thức đặt chỗ")}</span><b>{pick(draft.booking, lang)}</b></div>
            </div>
          </Card>
          <Note>{L(lang, "초안은 언제든 수정할 수 있고, 최종 확정은 Admin 승인 후에 이뤄집니다.", "Bản nháp có thể sửa bất cứ lúc nào; xác nhận cuối cùng sau khi Admin duyệt.")}</Note>
          <CtaBar>
            <Btn onClick={() => setStep(2)}>{L(lang, "다음 · 필수 확인", "Tiếp · xác nhận bắt buộc")}</Btn>
          </CtaBar>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="section sm">{L(lang, "필수 확인 3종", "3 mục xác nhận bắt buộc")}</h3>
          {CHECK_ITEMS.map((c) => (
            <div className={"hrow" + (checks[c.id] ? " done" : "")} key={c.id}>
              <div className="bd">
                <b>{pick(c.label, lang)}</b>
                <p>{pick(c.desc, lang)}</p>
              </div>
              <button className={"chk" + (checks[c.id] ? " on" : "")} onClick={() => setChecks((s) => ({ ...s, [c.id]: !s[c.id] }))}>
                <Check size={16} />
              </button>
            </div>
          ))}
          <Note>{L(lang, "확인한 내용은 Admin 심사에서 서류로 검증됩니다. 허위 기재 시 승인이 취소됩니다.", "Nội dung xác nhận sẽ được Admin kiểm tra bằng hồ sơ. Khai sai sẽ bị hủy duyệt.")}</Note>
          <CtaBar>
            <Btn onClick={() => allChecked && setStep(3)}>
              {allChecked ? L(lang, "심사 요청 제출", "Gửi yêu cầu xét duyệt") : L(lang, "3가지를 모두 확인해 주세요", "Vui lòng xác nhận cả 3 mục")}
            </Btn>
          </CtaBar>
        </>
      )}

      {step === 3 && (
        <>
          <Card>
            <div className="done">
              <div className="ck"><Sparkles size={26} /></div>
              <h2>{L(lang, "심사 요청이 접수되었습니다", "Đã tiếp nhận yêu cầu xét duyệt")}</h2>
              <p>{L(lang, "본사 Admin이 서류와 위치를 확인한 뒤 승인합니다. 보통 1~3일 걸려요.", "Admin sẽ kiểm tra hồ sơ và vị trí rồi duyệt. Thường mất 1~3 ngày.")}</p>
              <span className="earn">{L(lang, `승인 시 +${PARTNER_CP} CP · MY BUSINESS 생성`, `Khi duyệt: +${PARTNER_CP} CP · tạo MY BUSINESS`)}</span>
            </div>
          </Card>
          <Note>{L(lang, "승인 전까지 소비자 화면에는 노출되지 않습니다. 승인 후 Consumer First Ranking의 신규 파트너 노출 보장이 적용됩니다.", "Trước khi duyệt sẽ không hiển thị với người dùng. Sau khi duyệt sẽ được đảm bảo hiển thị dành cho đối tác mới.")}</Note>
          <CtaBar>
            <Btn onClick={() => onApproved(role)}>{L(lang, "승인 시뮬레이션 · MY BUSINESS 열기", "Mô phỏng duyệt · mở MY BUSINESS")}</Btn>
          </CtaBar>
        </>
      )}
    </>
  );
}
