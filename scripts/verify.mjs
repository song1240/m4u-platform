#!/usr/bin/env node
/**
 * M4U verify — 루프 엔지니어링의 VERIFY 단계
 * 1) 빌드 검증 (esbuild 번들)
 * 2) 미번역 스캔 (L() 미경유 한국어 UI 리터럴 — 경고)
 * 3) 금지어 스캔 (POLICY.md 표기·표현 규칙 — 실패)
 *
 * 사용: npm run verify   (커밋 전 필수 — 실패 시 커밋 금지)
 */
import { build } from "esbuild";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = "src";
let failed = false;
const log = (tag, msg) => console.log(`[${tag}] ${msg}`);

/* ── 1. 빌드 검증 ───────────────────────────── */
const entries = ["src/master-ui/MasterUI.jsx", "src/App.jsx", "src/admin/Admin.jsx", "src/main.jsx"];
for (const entry of entries) {
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      loader: { ".jsx": "jsx", ".js": "jsx", ".css": "empty" },
      external: ["react", "react-dom", "react-dom/client", "lucide-react"],
      logLevel: "silent",
    });
    log("BUILD", `PASS  ${entry}`);
  } catch (e) {
    failed = true;
    log("BUILD", `FAIL  ${entry}`);
    console.error(e.errors?.slice(0, 3) ?? e.message);
  }
}

/* ── 파일 수집 ─────────────────────────────── */
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".jsx", ".js"].includes(extname(p))) files.push(p);
  }
})(SRC);

/* ── 2. 미번역 스캔 (경고) ─────────────────── */
// Admin은 한국어 전용(내부 도구)이므로 제외
// master-ui 전 화면 L() 적용 완료 — 예외 없음 (예외를 다시 늘리지 말 것)
const I18N_EXEMPT = [/^src\/admin\//, /design-tokens/, /main\.jsx$/];
const WRAPPERS = /\bL\(|catLabel\(|venueName\(|prodName\(|zoneName\(|pickLabel\(|\bpick\(|\bwalk\(/;
const VIET = /[ăâđêơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵĐ]/;
const DATA_LINE = /^\s*(id:|[a-zA-Z]+Vi:|name:|desc:|title:|label:|product:|policy:|address:|who:|text:|size:|consist:|brand:|cat:|walk:|open:|resp:|greet|search:|popular:|ai[A-Z]|ko:|vi:|q:|opts:|home:|living:|stay:|booking:|order:|habit:|salon:|wallet:|my:)|^\s*\[?"|^\s*\{ (ko|id|q):/;
const KNOWN_OK = /일월화수목금토|WEEKDAYS_KO|const CATS|CAT_VI|SELF_HABITS|MEDI_PLACES|SALON_BOOKINGS|HOST_TOP5|SKIN_QS/;
let warnCount = 0;
for (const f of files) {
  if (I18N_EXEMPT.some((re) => re.test(f.replace(/\\/g, "/")))) continue;
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (!/[가-힣]/.test(line)) return;
    if (WRAPPERS.test(line)) return;
    if (VIET.test(line)) return; // ko/vi 쌍이 같은 라인에 존재 — 번역 완료 데이터
    if (KNOWN_OK.test(line)) return; // 헬퍼 경유가 확인된 상수
    if (/^\s*(\/\/|\/\*|\*)/.test(line) || /\/\/ /.test(line) || /\{\/\*/.test(line)) return;
    if (/===\s*"/.test(line) || /\.test\(/.test(line)) return; // 내부 상태 키 비교·정규식 — 노출 문자열 아님
    if (DATA_LINE.test(line)) return;
    warnCount++;
    if (warnCount <= 15) log("I18N", `WARN  ${f}:${i + 1}  ${line.trim().slice(0, 80)}`);
  });
}
log("I18N", warnCount === 0 ? "PASS  미번역 의심 라인 없음" : `WARN  ${warnCount}개 라인 확인 필요 (L() 미경유 한국어)`);

/* ── 3. 금지어 스캔 (실패) ─────────────────── */
const BANNED = [
  { re: /피부\s*진단/, why: '의료성 표현 — "피부 분석/뷰티 프로필" 사용 (POLICY §5)' },
  { re: /비노\s*그랜드/, why: '단지명 오기 — "빈홈 그랜드 파크" (POLICY §9)' },
  { re: /Habit\s*Reward\s*Point/i, why: "HRP 정식 명칭은 HARU REWARD POINT (POLICY §9)" },
];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const { re, why } of BANNED) {
      if (re.test(line)) {
        failed = true;
        log("POLICY", `FAIL  ${f}:${i + 1}  ${why}`);
      }
    }
  });
}
if (!failed) log("POLICY", "PASS  금지어 없음");

/* ── 결과 ──────────────────────────────────── */
console.log("─".repeat(50));
if (failed) {
  console.log("VERIFY: FAIL — 커밋 금지. 위 항목을 수정 후 재실행하세요.");
  process.exit(1);
} else {
  console.log(`VERIFY: PASS${warnCount ? ` (I18N 경고 ${warnCount}건 — 확인 권장)` : ""}`);
}
