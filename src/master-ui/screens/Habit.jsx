/**
 * Habit — 오늘 습관 (DESIGN_SYSTEM §4.4)
 *
 * POLICY §5:
 *  - 검증형(헬스 데이터 연동: 걷기)만 CP 지급
 *  - 셀프 체크는 소액 HRP · 하루 1회 · 해제 불가 · 일일 상한 15 HRP
 *  - 습관은 지역 시설과 연결한다 (명상 → 주변 장소 예약 → 지역 소비 → Verified Review)
 * 모든 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React from "react";
import { Footprints, Check, Flame, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, Note, Tag } from "../components.jsx";
import { L, pick, walk, num } from "../i18n.js";
import { SELF_HABITS, MEDI_PLACES, WEEK_DEMO, WEEKDAYS } from "../data.js";
import "../style.css";

export default function Habit({
  lang, steps, goal, streak,
  walkClaimed, syncSteps,
  water, waterGoal, selfChecks, toggleSelf,
  selfEarned, selfCap, doneCount,
  onBookClass,
}) {
  const pct = Math.min(100, Math.round((steps / goal) * 100));
  const capped = selfEarned >= selfCap;
  const week = [...WEEK_DEMO, doneCount];
  const days = WEEKDAYS[lang] || WEEKDAYS.ko;
  const total = week.reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="appbar">
        <div className="logotype">M4U<span>HABIT</span></div>
        <div className="streak"><Flame size={12} /> {L(lang, `연속 ${streak}일`, `${streak} ngày liên tiếp`)}</div>
      </div>

      <div className="greet">
        <div>
          <h1>{L(lang, "작은 습관이 내일을 바꿔요", "Thói quen nhỏ đổi thay ngày mai")}</h1>
          <p>{L(lang, `오늘 ${doneCount}/5 완료 · HARU REWARD POINT`, `Hôm nay ${doneCount}/5 · HARU REWARD POINT`)}</p>
        </div>
      </div>

      {/* 검증형 — 헬스 데이터 연동이라 CP를 받는다 (POLICY §5) */}
      <div className="hrow">
        <i className="ic"><Footprints size={19} /></i>
        <div className="bd">
          <div className="tl">
            <b>{L(lang, "걷기", "Đi bộ")}</b>
            <Tag kind="ok"><ShieldCheck size={10} /> {L(lang, "헬스 데이터 검증", "Xác minh dữ liệu")}</Tag>
          </div>
          <div className="v">{num(steps, lang)} <small>/ {num(goal, lang)}</small></div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
          <p>{L(lang, "목표 달성 시 +10 HRP · +2 CP (검증형)", "Đạt mục tiêu: +10 HRP · +2 CP (đã xác minh)")}</p>
        </div>
        <button className="btn-sm" onClick={syncSteps} disabled={walkClaimed}>
          {walkClaimed ? L(lang, "달성", "Đạt") : L(lang, "동기화", "Đồng bộ")}
        </button>
      </div>

      {/* 셀프 체크 — CP 없음, 하루 1회·해제 불가, 합산 상한 적용 */}
      {SELF_HABITS.map((h) => {
        const done = h.id === "water" ? water >= h.goal : !!selfChecks[h.id];
        return (
          <div className={"hrow" + (done ? " done" : "")} key={h.id}>
            <i className="ic">{h.emoji}</i>
            <div className="bd">
              <b>{pick(h.name, lang)}</b>
              {h.id === "water" ? (
                <>
                  <div className="v">{water} <small>/ {L(lang, `${h.goal}잔`, `${h.goal} ly`)}</small></div>
                  <div className="gauge">
                    {Array.from({ length: h.goal }).map((_, i) => <i key={i} className={i < water ? "on" : ""} />)}
                  </div>
                </>
              ) : (
                <p>{pick(h.desc, lang)}</p>
              )}
              <p>{done ? L(lang, "오늘 완료 · 해제할 수 없어요", "Hoàn thành hôm nay · không thể bỏ") : `+${h.hrp} HRP`}</p>
            </div>
            {h.id === "water" ? (
              <button className="btn-sm" onClick={() => toggleSelf("water")} disabled={done}>
                {done ? L(lang, "완료", "Xong") : L(lang, "+1잔", "+1 ly")}
              </button>
            ) : (
              <button className={"chk" + (done ? " on" : "")} onClick={() => toggleSelf(h.id)} disabled={done}>
                <Check size={16} />
              </button>
            )}
          </div>
        );
      })}

      <Note>
        {L(lang, `셀프 체크는 하루 1회 · 해제 불가이며, 하루 최대 ${selfCap} HRP까지 적립됩니다 (오늘 ${selfEarned}/${selfCap}).`, `Tự đánh dấu chỉ 1 lần/ngày · không thể bỏ, tối đa ${selfCap} HRP mỗi ngày (hôm nay ${selfEarned}/${selfCap}).`)}
        {capped && L(lang, " 상한에 도달해 추가 적립은 없습니다.", " Đã đạt giới hạn, không tích lũy thêm.")}
        {L(lang, " CP는 검증 가능한 활동에만 지급됩니다.", " CP chỉ dành cho hoạt động có thể xác minh.")}
      </Note>

      <h3 className="section">{L(lang, "이번 주 리포트", "Báo cáo tuần này")}</h3>
      <Card>
        <div className="wchart">
          {week.map((n, i) => (
            <div key={i}>
              <span className="col">
                <i className={i === 6 ? "today" : n >= 4 ? "hit" : ""} style={{ height: `${Math.max(6, (n / 5) * 100)}%` }} />
              </span>
              <span className={i === 6 ? "today" : ""}>{days[i]}</span>
            </div>
          ))}
        </div>
        <p>{L(lang, `이번 주 ${total}회 완료 · 주 4회 이상 달성 시 주간 보너스 +20 HRP`, `Tuần này ${total} lượt · đạt từ 4 lần/tuần: thưởng +20 HRP`)}</p>
      </Card>

      <div className="sechead">
        <h3 className="section">{L(lang, "주변 명상 장소", "Địa điểm thiền gần bạn")}</h3>
      </div>
      {MEDI_PLACES.map((m) => (
        <div className="srow" key={m.id}>
          <span className="ph"><img src={m.img} alt="" /></span>
          <div className="bd">
            <b>{pick(m.name, lang)}</b>
            <p>★ {num(m.rate, lang)} · {walk(m.walkMin, lang)} · {pick(m.desc, lang)}</p>
            <span className="pr">{L(lang, `클래스 완료 시 +${m.hrp} HRP`, `Hoàn thành lớp: +${m.hrp} HRP`)}</span>
          </div>
          <button className="btn-sm" onClick={() => onBookClass(pick(m.name, lang))}>
            {L(lang, "예약", "Đặt")}
          </button>
        </div>
      ))}
      <Note>
        {L(lang, "온라인 명상에서 끝나지 않습니다 — 예약하면 지역 소비와 Verified Review로 이어집니다.", "Không dừng ở thiền online — đặt lớp sẽ dẫn tới tiêu dùng địa phương và Verified Review.")}
      </Note>
    </>
  );
}
