/**
 * Consumer First Ranking — POLICY §1
 *
 * 순위 요소: 별점(Verified) · 재이용률 · 예약 이행률 · 취소율(감점) · 응답 속도 · 소비자 Reward 환원
 * **광고비·플랫폼 납부액은 어떤 경우에도 순위에 반영하지 않는다.**
 * Contributor 기여점수도 반영 금지 — 랭킹 방화벽 (POLICY §10).
 * 가중치는 데모 자리표시자 (CLAUDE.md §6 — 단위 경제 검증 전 변경 금지).
 */
const score = (v) => v.rating * 20 + v.rebook * 0.5 + v.fulfill * 0.3 - v.cancel * 2;

/** 신규 파트너 discovery boost 삽입 위치 — 목록 2번째 (POLICY §1) */
const BOOST_POS = 1;

/** 점수 내림차순 + 신규 파트너를 2번째 위치에 삽입해 최소 노출을 보장한다 */
export function rankVenues(list) {
  const ranked = list
    .filter((v) => !v.boost)
    .sort((a, b) => score(b) - score(a))
    .map((v, i) => ({ ...v, rank: i + 1 }));
  const boosted = list.filter((v) => v.boost).map((v) => ({ ...v, rank: null }));
  const out = [...ranked];
  out.splice(Math.min(BOOST_POS, out.length), 0, ...boosted);
  return out;
}
