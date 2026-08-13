/**
 * MASTER UI i18n — 사용자 노출 문자열은 반드시 L() 또는 데이터의 ko/vi 필드를 거친다.
 * (CLAUDE.md §3-6 · POLICY §9)
 */
export const L = (lang, ko, vi) => (lang === "ko" ? ko : vi);

/** ZONES 항목 → 현재 언어 표기 */
export const zoneName = (z, lang) => (z ? L(lang, z.ko, z.vi) : "");

/** 숫자 — 한국어 1,000 / 베트남어 1.000 (현지 표기 규칙) */
export const num = (n, lang) => n.toLocaleString(lang === "ko" ? "ko-KR" : "vi-VN");

/** 금액 — VND 표기는 두 언어 공통 */
export const vnd = (n, lang) => num(n, lang) + " VND";
