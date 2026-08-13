/**
 * MASTER UI 공용 데이터 — 사용자 노출 문자열은 ko/vi 쌍으로 보관한다.
 * JSX(아이콘)는 이 파일에 두지 않는다 (.js — 화면 파일에서 조합).
 */

/** 생활권(Zone) — 빈홈 그랜드 파크에서 시작 (CLAUDE.md §1) */
export const ZONES = [
  { ko: "빈홈 그랜드 파크", vi: "Vinhomes Grand Park", city: "Ho Chi Minh, Vietnam" },
  { ko: "타오디엔", vi: "Thảo Điền", city: "Ho Chi Minh, Vietnam" },
  { ko: "푸미흥", vi: "Phú Mỹ Hưng", city: "Ho Chi Minh, Vietnam" },
];

/** 화면 언어 — 선택 전 화면이므로 각 언어를 자기 언어로 표기한다 */
export const LANGS = [
  {
    id: "ko",
    flag: "🇰🇷",
    name: "한국어",
    desc: "화면 언어 · MY 탭에서 언제든 변경",
  },
  {
    id: "vi",
    flag: "🇻🇳",
    name: "Tiếng Việt",
    desc: "Ngôn ngữ hiển thị · Đổi bất cứ lúc nào trong tab MY",
  },
];
