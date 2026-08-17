/**
 * Habit — 오늘 습관 (DESIGN_SYSTEM §4.4)
 *
 * POLICY §5:
 *  - 검증형(헬스 데이터 연동: 걷기)만 CP 지급 — **연동돼 있을 때만** 검증 뱃지와 CP를 붙인다.
 *    연동 없이 버튼만으로 CP를 주면 "검증 가능한 활동" 원칙이 깨진다 (POLICY §4).
 *  - 셀프 체크는 소액 HRP · 하루 1회 · 해제 불가 · 일일 상한 15 HRP
 *  - 습관은 지역 시설과 연결한다 (명상 → 주변 장소 예약 → 지역 소비 → Verified Review)
 * 모든 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
import React from "react";
import { Footprints, Check, Flame, ShieldCheck, HeartPulse, Link2 } from "lucide-react";
import { Card, Note, Tag } from "../components.jsx";
import { L, pick, walk, num } from "../i18n.js";
import { SELF_HABITS, MEDI_PLACES, WEEK_DEMO, WEEKDAYS, HEALTH_APPS } from "../data.js";
import "../style.css";

export default function Habit({
  lang, steps, goal, streak,
  walkClaimed, syncSteps, healthLinked, linkHealth,
  water, waterGoal, selfChecks, toggleSelf,
  selfEarned, selfCap, doneCount, mediBooked,
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

      {/* 검증형 — 건강 앱이 연동된 경우에만 검증 뱃지와 CP가 붙는다 (POLICY §4) */}
      {!healthLinked && (
        <div className="linkcard">
          <i><HeartPulse size={19} /></i>
          <div className="bd">
            <b>{L(lang, "건강 앱을 연결하면 CP도 적립돼요", "Kết nối ứng dụng sức khỏe để nhận thêm CP")}</b>
            <p>{L(lang, `${HEALTH_APPS.ko}의 걸음 수를 그대로 가져옵니다. 연결 전에는 HRP만 적립됩니다.`, `Lấy số bước từ ${HEALTH_APPS.vi}. Trước khi kết nối chỉ tích HRP.`)}</p>
          </div>
          <button className="btn-sm" onClick={linkHealth}>
            <Link2 size={13} /> {L(lang, "연결", "Kết nối")}
          </button>
        </div>
      )}
      <div className="hrow">
        <i className="ic"><Footprints size={19} /></i>
        <div className="bd">
          <div className="tl">
            <b>{L(lang, "걷기", "Đi bộ")}</b>
            {healthLinked ? (
              <Tag kind="ok"><ShieldCheck size={10} /> {L(lang, "헬스 데이터 검증", "Xác minh dữ liệu")}</Tag>
            ) : (
              <Tag kind="off">{L(lang, "미연동 · CP 없음", "Chưa kết nối · không CP")}</Tag>
            )}
          </div>
          <div className="v">{num(steps, lang)} <small>/ {num(goal, lang)}</small></div>
          <div className="bar"><i style={{ width: `${pct}%` }} /></div>
          <p>
            {healthLinked
              ? L(lang, "목표 달성 시 +10 HRP · +2 CP (검증형)", "Đạt mục tiêu: +10 HRP · +2 CP (đã xác minh)")
              : L(lang, "건강 앱을 연결하면 걸음이 기록되고 보상을 받아요", "Kết nối ứng dụng sức khỏe để ghi nhận bước chân và nhận thưởng")}
          </p>
        </div>
        <button className="btn-sm" onClick={syncSteps} disabled={walkClaimed || !healthLinked}>
          {walkClaimed ? L(lang, "달성", "Đạt") : L(lang, "동기화", "Đồng bộ")}
        </button>
      </div>

      {/* 셀프 체크 — CP 없음, 하루 1회·해제 불가, 합산 상한 적용 */}
      {SELF_HABITS.map((h) => {
        const done = h.id === "water" ? water >= h.goal : h.id === "meditate" ? !!selfChecks[h.id] || mediBooked : !!selfChecks[h.id];
        return (
          <div className={"hrow" + (done ? " done" : "")} key={h.id}>
            <i className="ic">{h.emoji}</i>
            <div className="bd">
              <div className="tl">
                <b>{pick(h.name, lang)}</b>
                {h.id === "meditate" && mediBooked && !selfChecks.meditate ? (
                  <Tag kind="ok"><ShieldCheck size={10} /> {L(lang, "클래스 예약", "Đã đặt lớp")}</Tag>
                ) : (
                  <Tag kind="self">{L(lang, "자기 신고 · CP 없음", "Tự khai · không CP")}</Tag>
                )}
              </div>
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
              <p>
                {h.id === "meditate" && mediBooked && !selfChecks.meditate
                  ? L(lang, "클래스 예약으로 완료됐어요", "Đã hoàn thành qua đặt lớp")
                  : done
                  ? L(lang, "오늘 완료 · 해제할 수 없어요", "Hoàn thành hôm nay · không thể bỏ")
                  : `+${h.hrp} HRP`}
              </p>
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
            <span className="pr">{L(lang, `예약 시 +${m.hrp} HRP · +3 CP`, `Đặt lớp: +${m.hrp} HRP · +3 CP`)}</span>
          </div>
          <button className="btn-sm" onClick={() => onBookClass(m.venueId)}>
            {L(lang, "클래스 예약", "Đặt lớp")}
          </button>
        </div>
      ))}
      <Note>
        {L(lang, "클래스를 예약하면 명상 습관도 함께 완료됩니다 — 이용 후 Verified Review까지 이어집니다.", "Đặt lớp sẽ hoàn thành luôn thói quen thiền — và dẫn tới Verified Review sau khi dùng.")}
      </Note>
    </>
  );
}
