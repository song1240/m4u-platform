/**
 * AI 컨시어지 — 안내 + 초안 범위 (대표 승인 2026-08-13, DESIGN_SYSTEM §4.10)
 *
 *  AI가 하는 것  : 의도 파악 · 후보 제시(랭킹 그대로) · 화면 딥링크 · 폼 미리 채우기
 *  AI가 안 하는 것: 결제 · 예약 확정 · 쿠폰 사용 · 리뷰 작성 · 투표 — 확정은 항상 사람이 누른다
 *
 * 후보 제시는 ranking.js 결과를 그대로 쓴다. AI가 따로 정렬하지 않는다 (POLICY §1).
 * 데모 규칙 기반이며 실서비스는 n8n + LLM으로 대체 예정.
 */
import React, { useState } from "react";
import { Sparkles, ShieldCheck, X, ChevronRight, Send } from "lucide-react";
import { Note, Photo } from "../components.jsx";
import { L, pick, num, walk } from "../i18n.js";
import { AI_INTENTS, AI_SUGGEST, VENUES } from "../data.js";
import { rankVenues } from "../ranking.js";
import "../style.css";

/** 의도 매칭 — 못 찾으면 무엇을 도울 수 있는지 안내한다 */
const match = (text) => AI_INTENTS.find((i) => i.re.test(text)) || null;

export default function Concierge({ lang, onClose, onGo }) {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");

  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const hit = match(msg);
    const reply = hit
      ? { id: log.length + 1, text: pick(hit.say, lang), act: hit.act, venues: hit.id === "eat" ? rankVenues(VENUES).filter((v) => v.cat === "eat").slice(0, 2) : null }
      : {
          id: log.length + 1,
          text: L(
            lang,
            "맛집 · 살롱 · 카트 · 객실 · 상품 · 적립 · 습관 · 통역을 도와드릴 수 있어요. 예약과 결제는 직접 확인하고 눌러주세요.",
            "Tôi có thể giúp về quán ăn · salon · xe điện · phòng · sản phẩm · tích điểm · thói quen · phiên dịch. Việc đặt và thanh toán bạn hãy tự xác nhận."
          ),
        };
    setLog((l) => [...l, { id: l.length, me: true, text: msg }, reply]);
    setInput("");
  };

  return (
    <div className="sheetbd" onClick={onClose}>
      <div className="sheet aisheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-hd">
          <b><Sparkles size={15} /> M4U AI CONCIERGE</b>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="body">
          {log.length === 0 && (
            <>
              <div className="aibub">
                {L(lang, "무엇을 도와드릴까요? 생활권 안에서 찾고 계신 것을 말씀해 주세요.", "Tôi có thể giúp gì? Hãy cho biết bạn đang tìm gì trong khu bạn ở.")}
              </div>
              <div className="chips">
                {AI_SUGGEST.map((s) => (
                  <button key={s.id} className="chip" onClick={() => send(L(lang, s.ko, s.vi))}>
                    {L(lang, s.ko, s.vi)}
                  </button>
                ))}
              </div>
            </>
          )}

          {log.map((m) => (
            <div key={m.id}>
              <div className={"aibub" + (m.me ? " me" : "")}>{m.text}</div>
              {m.venues && m.venues.map((v) => (
                <button className="prow" key={v.id} onClick={() => onGo({ sub: "venue", params: { venueId: v.id } })}>
                  <span className="ph"><Photo src={v.img} /></span>
                  <span className="bd">
                    <b>{pick(v.name, lang)}</b>
                    <p>{walk(v.walkMin, lang)} · {v.reward}% Reward</p>
                    <span className="mt">{v.boost ? L(lang, "신규 · 리뷰 수집 중", "Mới · đang thu thập") : `★ ${num(v.rating, lang)} (${v.reviews})`}</span>
                  </span>
                  <ChevronRight size={16} className="chev" />
                </button>
              ))}
              {m.act && (
                <button className="aiact" onClick={() => onGo(m.act)}>
                  {pick(m.act.label, lang)} <ChevronRight size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="chatin">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={L(lang, "무엇이든 물어보세요", "Hỏi tôi bất cứ điều gì")}
          />
          <button onClick={() => send()}><Send size={15} /></button>
        </div>

        <div className="aiscope">
          <ShieldCheck size={13} />
          {L(
            lang,
            "AI는 안내와 초안까지만 도와드려요 — 결제 · 예약 확정 · 리뷰 작성은 직접 확인하고 누르셔야 합니다. 추천 순서는 Consumer First Ranking 그대로이며 광고비가 반영되지 않습니다.",
            "AI chỉ hỗ trợ hướng dẫn và bản nháp — thanh toán · xác nhận đặt chỗ · viết đánh giá do bạn tự thực hiện. Thứ tự gợi ý theo Consumer First Ranking, không tính chi phí quảng cáo."
          )}
        </div>
      </div>
    </div>
  );
}
