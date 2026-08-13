/**
 * M4U Design Tokens — MASTER UI 기준 (src/master-ui/style.css 와 동기 유지)
 * 변경 시 style.css · docs/DESIGN_SYSTEM.md 를 함께 수정하고 CR_LOG에 기록한다.
 */
export const color = {
  // Brand
  forest: "#073B2B",   // --g  Primary — 헤더·CTA·네비 활성·다크 카드
  forest2: "#0E533C",  // --g2 진행바·긍정 상태
  gold: "#C6A15B",     // --gold Champagne Gold — 라벨(em/small)·강조·아바타 텍스트
  // Surface
  ivory: "#F7F3EA",    // --iv 앱 배경
  paper: "#FFFDF8",    // --p  카드 배경
  line: "#E8E0D4",     // --line 보더
  shellBg: "#E8E5DE",  // body 배경 (셸 바깥)
  // Text
  ink: "#163128",      // --ink 본문
  muted: "#77817C",    // --mut 보조
};

export const radius = { card: 20, tile: 17, btn: 12, pill: 99, shell: 32, hero: 22 };

export const typography = {
  body: 'Inter, sans-serif',
  display: '"DM Serif Display", serif', // 헤드라인·큰 수치 전용 (weight 400 고정)
  h1: { size: 30, family: "display" },
  sectionTitle: { size: 19, family: "display" },
  cardTitle: { size: 17, weight: 700 },
  bodyText: { size: 12 },
  caption: { size: 11 },
  label: { size: 10, weight: 800, letterSpacing: 1 }, // 골드 라벨 (em/small)
};

export const layout = { shellMax: 430, pagePad: 16, navHeight: 72, cardGap: 9 };
