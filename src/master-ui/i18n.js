/**
 * MASTER UI i18n — 사용자 노출 문자열은 반드시 L() 또는 데이터의 ko/vi 필드를 거친다.
 * (CLAUDE.md §3-6 · POLICY §9)
 */
import { ZONE_TZ, GREETINGS } from "./data.js";

export const L = (lang, ko, vi) => (lang === "ko" ? ko : vi);

/** ZONES 항목 → 현재 언어 표기 */
export const zoneName = (z, lang) => (z ? L(lang, z.ko, z.vi) : "");

/** { ko, vi } 쌍에서 현재 언어 값을 꺼낸다 (데이터의 모든 노출 문자열이 이 형태) */
export const pick = (o, lang) => (o ? L(lang, o.ko, o.vi) : "");

/** 도보 시간 — 데이터는 분(minute) 숫자만 갖고 표기는 언어별로 만든다 */
export const walk = (min, lang) => L(lang, `도보 ${min}분`, `${min} phút đi bộ`);

/** 날짜 — 요일 표기까지 현지화 */
export const fmtDate = (d, lang) =>
  lang === "ko"
    ? `${d.getMonth() + 1}/${d.getDate()} (${"일월화수목금토"[d.getDay()]})`
    : `${d.getDate()}/${d.getMonth() + 1} (${["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()]})`;

/** 생활권(호치민) 기준 현재 시각(0~23) — 기기 시간대와 무관하게 현지 시간을 쓴다 */
export const zoneHour = (now = new Date()) =>
  Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: ZONE_TZ }).format(now)) % 24;

/** 시각 → 인사말 구간. 23시~4시는 night(자정을 넘어가므로 마지막 구간이 앞으로 감김) */
export const greetBand = (h) => {
  if (h >= 23 || h < 5) return GREETINGS[3];
  if (h >= 18) return GREETINGS[2];
  if (h >= 11) return GREETINGS[1];
  return GREETINGS[0];
};

/** 홈 인사말 — 생활권 시간 기준 */
export const greeting = (lang, now) => {
  const g = greetBand(zoneHour(now));
  return L(lang, g.ko, g.vi);
};

/** 숫자 — 한국어 1,000 / 베트남어 1.000 (현지 표기 규칙) */
export const num = (n, lang) => n.toLocaleString(lang === "ko" ? "ko-KR" : "vi-VN");

/** 금액 — VND 표기는 두 언어 공통 */
export const vnd = (n, lang) => num(n, lang) + " VND";
