/**
 * MASTER UI i18n — 사용자 노출 문자열은 반드시 L() 또는 데이터의 ko/vi 필드를 거친다.
 * (CLAUDE.md §3-6 · POLICY §9)
 */
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

/** 숫자 — 한국어 1,000 / 베트남어 1.000 (현지 표기 규칙) */
export const num = (n, lang) => n.toLocaleString(lang === "ko" ? "ko-KR" : "vi-VN");

/** 금액 — VND 표기는 두 언어 공통 */
export const vnd = (n, lang) => num(n, lang) + " VND";
