/**
 * MASTER UI 공용 데이터 — 사용자 노출 문자열은 { ko, vi } 쌍으로 보관한다.
 * JSX(아이콘)는 이 파일에 두지 않는다 (.js — 화면 파일에서 조합).
 * 사진은 Unsplash 임시 소스 — 실서비스 전 매장별 실사 촬영 필요 (HANDOFF 메모).
 */

export const IMG = {
  salon: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=70",
  grill: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=70",
  cafe: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=70",
  market: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=70",
  noodle: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=70",
  stay: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=70",
  hair: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=500&q=70",
  headspa: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=500&q=70",
  massage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=500&q=70",
  nail: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=70",
  dine: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=70",
  cart: "https://images.unsplash.com/photo-1548099212-9e653bfa85ca?auto=format&fit=crop&w=800&q=70",
  cls: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=70",
  medi1: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=500&q=70",
  medi2: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=70",
  medi3: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=500&q=70",
  skinset: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=70",
  maskpack: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=70",
  serum: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=70",
};

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

/**
 * 매장 분류 — 내부 키는 id 슬러그(언어 무관), 표시는 label을 거친다.
 * (v10은 한국어 문자열을 키로 썼으나 이식하며 슬러그로 정리)
 */
export const CATS = [
  { id: "eat", emoji: "🍜", label: { ko: "맛집", vi: "Ẩm thực" } },
  { id: "cafe", emoji: "☕", label: { ko: "카페", vi: "Cà phê" } },
  { id: "beauty", emoji: "💇", label: { ko: "살롱 · 뷰티", vi: "Salon · Làm đẹp" } },
  { id: "shop", emoji: "🛍", label: { ko: "쇼핑", vi: "Mua sắm" } },
  { id: "move", emoji: "🛺", label: { ko: "이동 · 렌트", vi: "Di chuyển" } },
  { id: "life", emoji: "🏠", label: { ko: "생활 · 편의", vi: "Tiện ích" } },
];

/** Living 6종 진입 타일 — cats는 목록에 포함할 분류(도달 불가 분류가 없도록 매핑) */
export const LIVING_TILES = [
  { id: "eat", emoji: "🍜", name: "EAT", cats: ["eat", "cafe"], sub: { ko: "맛집 · 카페", vi: "Ẩm thực · cà phê" } },
  { id: "move", emoji: "🛺", name: "MOVE", cats: ["move"], sub: { ko: "E-카트 · 셔틀", vi: "Xe điện · xe buýt" } },
  { id: "shop", emoji: "🛍", name: "SHOP", cats: ["shop"], sub: { ko: "마트 · 셀렉트", vi: "Chợ · M4U Select" } },
  { id: "stay", emoji: "🛏", name: "STAY", cats: ["stay"], sub: { ko: "레지던스 · 게스트", vi: "Căn hộ · khách" } },
  { id: "exp", emoji: "🎨", name: "EXPERIENCE", cats: ["life"], sub: { ko: "클래스 · 체험", vi: "Lớp học · trải nghiệm" } },
  { id: "beauty", emoji: "💇", name: "BEAUTY", cats: ["beauty"], sub: { ko: "살롱 · 스파 · 네일", vi: "Salon · spa · nail" } },
];

/** 매장 상세 세그먼트 탭 */
export const VENUE_TABS = [
  { id: "service", label: { ko: "서비스", vi: "Dịch vụ" } },
  { id: "review", label: { ko: "리뷰", vi: "Đánh giá" } },
  { id: "info", label: { ko: "정보", vi: "Thông tin" } },
];

/** 예약 시간 슬롯 — 데모 자리표시자 */
export const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

/**
 * 매장 — rating/rebook/fulfill/cancel은 Consumer First Ranking 입력값 (POLICY §1).
 * boost=true는 신규 파트너(실이용 리뷰 확보 전) — 지표를 노출하지 않는다 (POLICY §2).
 * 모든 수치는 데모 자리표시자 (CLAUDE.md §6).
 */
export const VENUES = [
  {
    id: "v1", cat: "beauty", img: IMG.salon, logo: "M4U", boost: false,
    name: { ko: "M4U Salon & Spa", vi: "M4U Salon & Spa" },
    rating: 4.9, reviews: 128, rebook: 74, fulfill: 99, cancel: 1, walkMin: 3, reward: 10,
    open: { ko: "영업중 · 10:00 - 20:00", vi: "Đang mở · 10:00 - 20:00" },
    address: { ko: "S1.05 빈홈 그랜드 파크", vi: "S1.05 Vinhomes Grand Park" },
    policy: { ko: "예약 2시간 전까지 무료 취소", vi: "Miễn phí hủy trước giờ hẹn 2 tiếng" },
    resp: { ko: "평균 응답 5분", vi: "Phản hồi trung bình 5 phút" },
    feats: [
      { emoji: "🧑‍⚕️", ko: "전문 테라피스트", vi: "Chuyên viên trị liệu" },
      { emoji: "🌿", ko: "프리미엄 제품", vi: "Sản phẩm cao cấp" },
      { emoji: "📅", ko: "예약제 운영", vi: "Hoạt động theo lịch hẹn" },
      { emoji: "🅿️", ko: "주차 가능", vi: "Có chỗ đậu xe" },
    ],
    services: [
      { id: "s1", img: IMG.hair, price: 250000, point: 25, name: { ko: "헤어컷 & 스타일링", vi: "Cắt & tạo kiểu tóc" }, desc: { ko: "이미지에 맞춘 디자인 컷", vi: "Kiểu tóc thiết kế riêng" }, time: { ko: "60분", vi: "60 phút" } },
      { id: "s2", img: IMG.headspa, price: 350000, point: 35, name: { ko: "두피 케어 스파", vi: "Spa chăm sóc da đầu" }, desc: { ko: "클렌징과 영양 케어", vi: "Làm sạch và dưỡng chất" }, time: { ko: "50분", vi: "50 phút" } },
      { id: "s3", img: IMG.massage, price: 550000, point: 55, name: { ko: "아로마 바디 마사지", vi: "Massage body aroma" }, desc: { ko: "천연 아로마 오일 릴랙싱", vi: "Tinh dầu thiên nhiên thư giãn" }, time: { ko: "80분", vi: "80 phút" } },
      { id: "s4", img: IMG.nail, price: 320000, point: 32, name: { ko: "젤 네일 아트", vi: "Nail gel nghệ thuật" }, desc: { ko: "시즌 컬러 젤 네일 케어", vi: "Chăm sóc móng gel theo mùa" }, time: { ko: "70분", vi: "70 phút" } },
    ],
    reviews_: [
      { id: "r1", rate: 5, who: { ko: "지*님", vi: "Chị T." }, text: { ko: "예약 시간 정확하고 두피 스파 최고예요.", vi: "Đặt lịch đúng giờ, spa da đầu tuyệt vời." } },
      { id: "r2", rate: 5, who: { ko: "민*님", vi: "Chị M." }, text: { ko: "이 퀄리티의 K-살롱은 처음이에요.", vi: "Lần đầu thấy salon Hàn chất lượng thế này." } },
    ],
  },
  {
    id: "v2", cat: "eat", img: IMG.grill, logo: "GRILL", boost: false,
    name: { ko: "빈홈 그릴 하우스", vi: "Nhà Hàng Nướng Vinhomes" },
    rating: 4.8, reviews: 96, rebook: 71, fulfill: 98, cancel: 2, walkMin: 2, reward: 9,
    open: { ko: "영업중 · 11:00 - 22:00", vi: "Đang mở · 11:00 - 22:00" },
    address: { ko: "S2.01 빈홈 그랜드 파크", vi: "S2.01 Vinhomes Grand Park" },
    policy: { ko: "노쇼 시 예약 보증금 차감", vi: "Mất tiền cọc nếu không đến" },
    resp: { ko: "평균 응답 8분", vi: "Phản hồi trung bình 8 phút" },
    feats: [
      { emoji: "🔥", ko: "참숯 그릴", vi: "Nướng than hoa" },
      { emoji: "🥩", ko: "당일 손질", vi: "Thịt tươi trong ngày" },
      { emoji: "👨‍👩‍👧", ko: "단체석", vi: "Bàn nhóm đông" },
      { emoji: "🛵", ko: "단지 내 배달", vi: "Giao hàng nội khu" },
    ],
    services: [
      { id: "s1", img: IMG.dine, price: 450000, point: 45, name: { ko: "프리미엄 그릴 세트", vi: "Set nướng cao cấp" }, desc: { ko: "2인 기준 · 사이드 3종", vi: "Cho 2 người · 3 món phụ" }, time: { ko: "90분", vi: "90 phút" } },
      { id: "s2", img: IMG.grill, price: 280000, point: 28, name: { ko: "런치 코스", vi: "Set trưa" }, desc: { ko: "평일 11:00 - 14:00", vi: "Ngày thường 11:00 - 14:00" }, time: { ko: "60분", vi: "60 phút" } },
    ],
    reviews_: [
      { id: "r1", rate: 5, who: { ko: "현*님", vi: "Anh H." }, text: { ko: "숯불 향이 제대로예요. 단체 예약도 편했어요.", vi: "Hương than rất chuẩn, đặt bàn nhóm dễ dàng." } },
    ],
  },
  {
    id: "v3", cat: "shop", img: IMG.market, logo: "GM", boost: false,
    name: { ko: "그린마켓", vi: "Green Market" },
    rating: 4.7, reviews: 74, rebook: 66, fulfill: 97, cancel: 2, walkMin: 4, reward: 7,
    open: { ko: "영업중 · 07:00 - 22:00", vi: "Đang mở · 07:00 - 22:00" },
    address: { ko: "S3.02 빈홈 그랜드 파크", vi: "S3.02 Vinhomes Grand Park" },
    policy: { ko: "당일 픽업 주문만 가능", vi: "Chỉ nhận đơn lấy trong ngày" },
    resp: { ko: "평균 응답 12분", vi: "Phản hồi trung bình 12 phút" },
    feats: [
      { emoji: "🥬", ko: "신선 채소", vi: "Rau tươi mỗi ngày" },
      { emoji: "🇰🇷", ko: "한국 식자재", vi: "Thực phẩm Hàn" },
      { emoji: "🛒", ko: "픽업 주문", vi: "Đặt trước lấy hàng" },
      { emoji: "🕖", ko: "이른 오픈", vi: "Mở cửa sớm" },
    ],
    services: [],
    reviews_: [
      { id: "r1", rate: 5, who: { ko: "수*님", vi: "Chị S." }, text: { ko: "한국 식자재가 다 있어서 자주 갑니다.", vi: "Có đủ thực phẩm Hàn nên tôi hay ghé." } },
    ],
  },
  {
    id: "v4", cat: "cafe", img: IMG.cafe, logo: "ARCH", boost: false,
    name: { ko: "카페 아치", vi: "Cafe Arch" },
    rating: 4.6, reviews: 61, rebook: 60, fulfill: 95, cancel: 3, walkMin: 5, reward: 8,
    open: { ko: "영업중 · 08:00 - 23:00", vi: "Đang mở · 08:00 - 23:00" },
    address: { ko: "S1.02 빈홈 그랜드 파크", vi: "S1.02 Vinhomes Grand Park" },
    policy: { ko: "단체 예약은 하루 전까지", vi: "Đặt nhóm trước một ngày" },
    resp: { ko: "평균 응답 10분", vi: "Phản hồi trung bình 10 phút" },
    feats: [
      { emoji: "☕", ko: "스페셜티 원두", vi: "Cà phê đặc sản" },
      { emoji: "💻", ko: "작업 좌석", vi: "Chỗ ngồi làm việc" },
      { emoji: "🥐", ko: "당일 베이커리", vi: "Bánh nướng trong ngày" },
      { emoji: "🌙", ko: "밤 11시까지", vi: "Mở đến 23:00" },
    ],
    services: [
      { id: "s1", img: IMG.cafe, price: 120000, point: 12, name: { ko: "커피 클래스", vi: "Lớp học cà phê" }, desc: { ko: "핸드드립 기초 · 2인", vi: "Pha tay cơ bản · 2 người" }, time: { ko: "60분", vi: "60 phút" } },
    ],
    reviews_: [
      { id: "r1", rate: 4, who: { ko: "예*님", vi: "Chị Y." }, text: { ko: "조용해서 작업하기 좋아요.", vi: "Yên tĩnh, rất hợp để làm việc." } },
    ],
  },
  {
    id: "v5", cat: "eat", img: IMG.noodle, logo: "NEW", boost: true,
    name: { ko: "반꾸온 하노이", vi: "Bánh Cuốn Hà Nội" },
    rating: null, reviews: 3, rebook: null, fulfill: null, cancel: null, walkMin: 6, reward: 12,
    open: { ko: "영업중 · 06:30 - 21:00", vi: "Đang mở · 06:30 - 21:00" },
    address: { ko: "S5.01 빈홈 그랜드 파크", vi: "S5.01 Vinhomes Grand Park" },
    policy: { ko: "포장 주문 우선", vi: "Ưu tiên đơn mang đi" },
    resp: { ko: "신규 입점", vi: "Mới khai trương" },
    feats: [
      { emoji: "🍚", ko: "매일 아침 반죽", vi: "Tráng bánh mỗi sáng" },
      { emoji: "🌿", ko: "현지 허브", vi: "Rau thơm địa phương" },
      { emoji: "🥡", ko: "포장 가능", vi: "Có mang đi" },
      { emoji: "🌅", ko: "아침 6시 30분", vi: "Mở từ 6:30" },
    ],
    services: [],
    reviews_: [],
  },
];

/**
 * 습관 — 검증형(헬스 데이터)과 셀프 체크를 분리한다 (POLICY §5).
 * 검증형만 CP를 받고, 셀프 체크는 소액 HRP·하루 1회·해제 불가·일일 상한 대상이다.
 */
export const SELF_HABITS = [
  { id: "water", emoji: "💧", goal: 8, hrp: 5, name: { ko: "물마시기", vi: "Uống nước" }, desc: { ko: "하루 8잔", vi: "8 ly mỗi ngày" } },
  { id: "run", emoji: "🏃", hrp: 5, name: { ko: "달리기", vi: "Chạy bộ" }, desc: { ko: "30분 러닝 · 이번 주 2/3회", vi: "Chạy 30 phút · tuần này 2/3 lần" } },
  { id: "mask", emoji: "🎭", hrp: 5, name: { ko: "마스크팩하기", vi: "Đắp mặt nạ" }, desc: { ko: "저녁 스킨케어 루틴", vi: "Chăm sóc da buổi tối" } },
  { id: "meditate", emoji: "🧘", hrp: 5, name: { ko: "명상하기", vi: "Thiền định" }, desc: { ko: "10분 마음 챙김", vi: "10 phút thiền chánh niệm" } },
];

/** 주변 명상 장소 — 습관을 지역 소비·Verified Review로 연결한다 (POLICY §5) */
export const MEDI_PLACES = [
  { id: "m1", img: IMG.medi1, rate: 4.9, walkMin: 8, hrp: 20, name: { ko: "Mindful Garden", vi: "Mindful Garden" }, desc: { ko: "오늘 19:30 클래스", vi: "Lớp học 19:30 hôm nay" } },
  { id: "m2", img: IMG.medi2, rate: 4.8, walkMin: 10, hrp: 20, name: { ko: "Lotus Yoga Studio", vi: "Lotus Yoga Studio" }, desc: { ko: "선셋 요가 · 주 5회", vi: "Yoga hoàng hôn · 5 buổi/tuần" } },
  { id: "m3", img: IMG.medi3, rate: 4.7, walkMin: 15, hrp: 20, name: { ko: "Silence Retreat", vi: "Silence Retreat" }, desc: { ko: "1:1 명상 코칭", vi: "Huấn luyện thiền 1:1" } },
];

/** 주간 리포트 — 데모 자리표시자 (오늘은 실제 완료 수로 대체) */
export const WEEK_DEMO = [4, 5, 3, 5, 4, 2];
export const WEEKDAYS = {
  ko: ["월", "화", "수", "목", "금", "토", "오늘"],
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "Hôm nay"],
};

/**
 * 뷰티 프로필 설문 — 의료 진단이 아니라 서비스 추천용이다 (POLICY §5).
 * 의료 진단을 연상시키는 표현은 화면·데이터 어디에도 쓰지 않는다 (verify 금지어 스캔 대상).
 */
export const SKIN_QS = [
  {
    id: "q1",
    q: { ko: "세안 후 피부 상태는 어떤가요?", vi: "Sau khi rửa mặt, da bạn thế nào?" },
    opts: [
      { id: "dry", ko: "당김이 심해요", vi: "Rất căng khô" },
      { id: "tzone", ko: "T존만 번들거려요", vi: "Chỉ vùng chữ T bóng dầu" },
      { id: "oily", ko: "전체적으로 번들거려요", vi: "Bóng dầu toàn mặt" },
    ],
  },
  {
    id: "q2",
    q: { ko: "트러블은 얼마나 자주 생기나요?", vi: "Bạn có hay nổi mụn không?" },
    opts: [
      { id: "rare", ko: "거의 없어요", vi: "Hầu như không" },
      { id: "some", ko: "가끔 생겨요", vi: "Thỉnh thoảng" },
      { id: "often", ko: "자주 생겨요", vi: "Thường xuyên" },
    ],
  },
  {
    id: "q3",
    q: { ko: "지금 가장 관심 있는 케어는?", vi: "Bạn quan tâm chăm sóc gì nhất?" },
    opts: [
      { id: "hydra", ko: "수분 · 진정", vi: "Cấp ẩm · dịu da" },
      { id: "tone", ko: "미백 · 톤업", vi: "Sáng da" },
      { id: "firm", ko: "탄력 · 안티에이징", vi: "Săn chắc · chống lão hóa" },
    ],
  },
];

/** 프로필 결과 라벨 — 수치는 응답으로 계산하되 전부 데모 자리표시자 (CLAUDE.md §6) */
export const SKIN_TYPES = {
  dry: { ko: "건성 경향 · 수분 보강 필요", vi: "Da khô · cần bổ sung độ ẩm" },
  tzone: { ko: "복합성 경향 · 수분 보강 필요", vi: "Da hỗn hợp · cần bổ sung độ ẩm" },
  oily: { ko: "지성 경향 · 유분 밸런스 필요", vi: "Da dầu · cần cân bằng dầu" },
};

/** Salon 4서비스 퀵 진입 — v1(M4U Salon & Spa)의 서비스에 대응 */
export const SALON_QUICK = [
  { id: "s1", emoji: "💇", name: { ko: "헤어", vi: "Tóc" } },
  { id: "s4", emoji: "💅", name: { ko: "네일", vi: "Nail" } },
  { id: "s2", emoji: "🧴", name: { ko: "스킨케어", vi: "Chăm sóc da" } },
  { id: "s3", emoji: "💆", name: { ko: "마사지", vi: "Massage" } },
];

/**
 * M4U FIVE 공동구매 (POLICY §6) — 5/10/15인 방, 할인 40/45/50%, 보상 HRP 20/40/60, 모집 72/96/120시간.
 * 보상은 **구매 건수 비례**로만 지급한다 (인원 모집 비례 금지 — 방문판매법 리스크 회피).
 * 미달 시 자동 취소 + 전액 환불 — 이 문구는 참여 화면에 항상 노출한다.
 */
export const FIVE_TIERS = {
  5: { dc: 40, hrp: 20, hours: 72 },
  10: { dc: 45, hrp: 40, hours: 96 },
  15: { dc: 50, hrp: 60, hours: 120 },
};
/** FIVE 참여 시 CP — 검증 가능한 활동 (POLICY §4, 데모 자리표시자) */
export const FIVE_CP = 10;

export const FIVE_ROOMS = [
  { id: "f1", tier: 5, img: IMG.skinset, origin: 820000, joined: 3, leftH: 26, product: { ko: "어성초 수딩 스킨케어 세트", vi: "Bộ chăm sóc da dịu nhẹ diếp cá" } },
  { id: "f2", tier: 10, img: IMG.maskpack, origin: 220000, joined: 7, leftH: 61, product: { ko: "시카 리페어 마스크팩 10매", vi: "Mặt nạ phục hồi Cica 10 miếng" } },
  { id: "f3", tier: 15, img: IMG.serum, origin: 900000, joined: 9, leftH: 98, product: { ko: "그린 티트리 세럼 더블 세트", vi: "Bộ đôi serum trà tràm" } },
];

export const COUPONS = [
  { id: "c1", used: false, title: { ko: "Salon 10% 할인", vi: "Giảm 10% Salon" }, desc: { ko: "8월 31일까지 · 전 서비스", vi: "Đến 31/8 · tất cả dịch vụ" } },
  { id: "c2", used: false, title: { ko: "주문 20,000 VND 할인", vi: "Giảm 20.000 VND" }, desc: { ko: "1회 · 최소 결제 200,000 VND", vi: "1 lần · đơn tối thiểu 200.000 VND" } },
  { id: "c3", used: false, title: { ko: "E-카트 무료 1회", vi: "Miễn phí 1 lượt xe điện" }, desc: { ko: "단지 내 구간", vi: "Trong khu nội bộ" } },
];

/** 커뮤니티 투표 — CP 가중. CP는 구매 불가·양도 불가 (POLICY §4) */
export const PROPOSALS = [
  { id: "g1", yes: 1240, no: 380, quorum: 2000, leftH: 48, status: "open", title: { ko: "단지 셔틀 노선 2개 추가", vi: "Thêm 2 tuyến xe buýt nội khu" }, desc: { ko: "출퇴근 시간 국제학교 · 오피스 직행 노선 신설", vi: "Mở tuyến trực tiếp tới trường quốc tế và khu văn phòng giờ cao điểm" } },
  { id: "g2", yes: 860, no: 210, quorum: 2000, leftH: 72, status: "open", title: { ko: "신규 입점 카테고리: 키즈 클래스", vi: "Danh mục mới: lớp học cho trẻ" }, desc: { ko: "단지 내 유휴 공간을 활용한 파트너 모집", vi: "Tuyển đối tác dùng không gian trống trong khu" } },
  { id: "g3", yes: 2310, no: 420, quorum: 2000, leftH: 0, status: "passed", title: { ko: "E-카트 운행시간 연장 (23시 → 24시)", vi: "Kéo dài giờ chạy xe điện (23h → 24h)" }, desc: { ko: "야간 이동 수요 반영", vi: "Đáp ứng nhu cầu di chuyển ban đêm" } },
];

/** CP 적립 규칙 — 검증 가능한 활동에만 (POLICY §4, 전부 데모 자리표시자) */
export const CP_RULES = [
  { id: "review", val: "+5 CP", ko: "Verified 리뷰 작성", vi: "Viết đánh giá đã xác minh" },
  { id: "five", val: "+10 CP", ko: "FIVE 공동구매 참여", vi: "Tham gia mua chung FIVE" },
  { id: "booking", val: "+3 CP", ko: "예약 이행 (노쇼 없음)", vi: "Hoàn thành đặt lịch (không hủy)" },
  { id: "stay", val: "+5 CP", ko: "스테이 예약 완료", vi: "Hoàn tất đặt lưu trú" },
  { id: "partner", val: "+50 CP", ko: "파트너 등록 승인", vi: "Đăng ký đối tác được duyệt" },
];
