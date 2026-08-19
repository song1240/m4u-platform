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
  hairoil: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=70",
  room2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=70",
  room3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70",
};

/** 생활권(Zone) — 빈홈 그랜드 파크에서 시작 (CLAUDE.md §1) */
export const ZONES = [
  { ko: "빈홈 그랜드 파크", vi: "Vinhomes Grand Park", city: "Ho Chi Minh, Vietnam" },
  { ko: "타오디엔", vi: "Thảo Điền", city: "Ho Chi Minh, Vietnam" },
  { ko: "푸미흥", vi: "Phú Mỹ Hưng", city: "Ho Chi Minh, Vietnam" },
];

/**
 * 생활권 표준시 — ZONES 3곳 모두 호치민(ICT, UTC+7).
 * 인사말은 사용자가 사는 생활권 시간을 따른다 (기기 시간이 아니라).
 * 한국에서 시연해도 현지 시간 기준으로 보이는 것이 이 제품에 맞다.
 */
export const ZONE_TZ = "Asia/Ho_Chi_Minh";

/** 시간대별 인사말 — 경계는 현지 생활 리듬 기준 (데모 자리표시자) */
export const GREETINGS = [
  { id: "morning", from: 5, ko: "좋은 아침이에요", vi: "Chào buổi sáng" },
  { id: "afternoon", from: 11, ko: "좋은 오후예요", vi: "Chào buổi chiều" },
  { id: "evening", from: 18, ko: "좋은 저녁이에요", vi: "Chào buổi tối" },
  { id: "night", from: 23, ko: "편안한 밤 되세요", vi: "Chúc ngủ ngon" },
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
    id: "m1", cat: "life", img: IMG.medi1, logo: "MG", boost: false,
    name: { ko: "Mindful Garden", vi: "Mindful Garden" },
    rating: 4.9, reviews: 38, rebook: 68, fulfill: 97, cancel: 2, walkMin: 8, reward: 8,
    open: { ko: "영업중 · 06:00 - 21:00", vi: "Đang mở · 06:00 - 21:00" },
    address: { ko: "S4.01 빈홈 그랜드 파크", vi: "S4.01 Vinhomes Grand Park" },
    policy: { ko: "클래스 3시간 전까지 무료 취소", vi: "Miễn phí hủy trước 3 tiếng" },
    resp: { ko: "평균 응답 9분", vi: "Phản hồi trung bình 9 phút" },
    feats: [
      { emoji: "🌿", ko: "가든 명상", vi: "Thiền trong vườn" },
      { emoji: "🧘", ko: "그룹 클래스", vi: "Lớp nhóm" },
      { emoji: "🕕", ko: "새벽 · 저녁반", vi: "Sáng sớm · buổi tối" },
      { emoji: "🧺", ko: "매트 대여", vi: "Cho thuê thảm" },
    ],
    services: [
      { id: "c1", img: IMG.medi1, price: 180000, point: 18, name: { ko: "저녁 명상 클래스", vi: "Lớp thiền buổi tối" }, desc: { ko: "19:30 · 그룹 60분", vi: "19:30 · nhóm 60 phút" }, time: { ko: "60분", vi: "60 phút" } },
    ],
    reviews_: [
      { id: "r1", rate: 5, who: { ko: "은*님", vi: "Chị E." }, text: { ko: "퇴근 후 들르기 좋아요. 정원에서 하니 확실히 다릅니다.", vi: "Rất hợp ghé sau giờ làm. Thiền trong vườn khác hẳn." } },
    ],
  },
  {
    id: "m2", cat: "life", img: IMG.medi2, logo: "LOTUS", boost: false,
    name: { ko: "Lotus Yoga Studio", vi: "Lotus Yoga Studio" },
    rating: 4.8, reviews: 44, rebook: 65, fulfill: 96, cancel: 3, walkMin: 10, reward: 7,
    open: { ko: "영업중 · 07:00 - 21:30", vi: "Đang mở · 07:00 - 21:30" },
    address: { ko: "S6.02 빈홈 그랜드 파크", vi: "S6.02 Vinhomes Grand Park" },
    policy: { ko: "클래스 3시간 전까지 무료 취소", vi: "Miễn phí hủy trước 3 tiếng" },
    resp: { ko: "평균 응답 11분", vi: "Phản hồi trung bình 11 phút" },
    feats: [
      { emoji: "🌅", ko: "선셋 요가", vi: "Yoga hoàng hôn" },
      { emoji: "👥", ko: "주 5회 운영", vi: "5 buổi mỗi tuần" },
      { emoji: "🚿", ko: "샤워실", vi: "Phòng tắm" },
      { emoji: "🅿️", ko: "주차 가능", vi: "Có chỗ đậu xe" },
    ],
    services: [
      { id: "c1", img: IMG.medi2, price: 220000, point: 22, name: { ko: "선셋 요가", vi: "Yoga hoàng hôn" }, desc: { ko: "17:30 · 그룹 75분", vi: "17:30 · nhóm 75 phút" }, time: { ko: "75분", vi: "75 phút" } },
    ],
    reviews_: [],
  },
  {
    id: "m3", cat: "life", img: IMG.medi3, logo: "SR", boost: false,
    name: { ko: "Silence Retreat", vi: "Silence Retreat" },
    rating: 4.7, reviews: 21, rebook: 62, fulfill: 95, cancel: 3, walkMin: 15, reward: 9,
    open: { ko: "예약제 · 09:00 - 20:00", vi: "Theo lịch hẹn · 09:00 - 20:00" },
    address: { ko: "S7.03 빈홈 그랜드 파크", vi: "S7.03 Vinhomes Grand Park" },
    policy: { ko: "1:1 세션은 24시간 전 취소", vi: "Hủy buổi 1:1 trước 24 tiếng" },
    resp: { ko: "평균 응답 20분", vi: "Phản hồi trung bình 20 phút" },
    feats: [
      { emoji: "🤫", ko: "1:1 코칭", vi: "Huấn luyện 1:1" },
      { emoji: "🕯", ko: "사운드 힐링", vi: "Chữa lành âm thanh" },
      { emoji: "📵", ko: "디지털 디톡스", vi: "Cai nghiện thiết bị" },
      { emoji: "☕", ko: "허브티 제공", vi: "Trà thảo mộc" },
    ],
    services: [
      { id: "c1", img: IMG.medi3, price: 350000, point: 35, name: { ko: "1:1 명상 코칭", vi: "Huấn luyện thiền 1:1" }, desc: { ko: "개인 세션 50분", vi: "Buổi cá nhân 50 phút" }, time: { ko: "50분", vi: "50 phút" } },
    ],
    reviews_: [],
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

/**
 * 건강 앱 연동 (POLICY §4) — CP는 검증 가능한 활동에만 규칙 기반 자동 적립된다.
 * 연동 전에는 걷기 목표를 채워도 CP를 주지 않고 HRP만 지급한다.
 * 실서비스는 HealthKit / Google Fit 연동으로 대체된다.
 */
export const HEALTH_APPS = { ko: "건강 앱 (Apple 건강 · Google Fit)", vi: "Ứng dụng sức khỏe (Apple Health · Google Fit)" };

/** 주변 명상 장소 — 습관을 지역 소비·Verified Review로 연결한다 (POLICY §5) */
/** Habit 화면의 주변 명상 장소 — venueId로 실제 매장(VENUES)에 연결된다 (POLICY §5 퍼널) */
export const MEDI_PLACES = [
  { id: "m1", venueId: "m1", img: IMG.medi1, rate: 4.9, walkMin: 8, hrp: 18, name: { ko: "Mindful Garden", vi: "Mindful Garden" }, desc: { ko: "오늘 19:30 클래스", vi: "Lớp học 19:30 hôm nay" } },
  { id: "m2", venueId: "m2", img: IMG.medi2, rate: 4.8, walkMin: 10, hrp: 22, name: { ko: "Lotus Yoga Studio", vi: "Lotus Yoga Studio" }, desc: { ko: "선셋 요가 · 주 5회", vi: "Yoga hoàng hôn · 5 buổi/tuần" } },
  { id: "m3", venueId: "m3", img: IMG.medi3, rate: 4.7, walkMin: 15, hrp: 35, name: { ko: "Silence Retreat", vi: "Silence Retreat" }, desc: { ko: "1:1 명상 코칭", vi: "Huấn luyện thiền 1:1" } },
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
 * 보상은 **구매 건수 비례**로만 지급한다 (인원 모집 비례 금지).
 * 이는 관련 법적 리스크를 낮추기 위한 내부 원칙이며, 실제 운영 전 법률 검토가 필요하다.
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

/** 파트너 역할 — 앱 분리 없이 하나의 계정에서 전환한다 (POLICY §8) */
export const PARTNER_ROLES = [
  { id: "local", emoji: "🏪", name: { ko: "로컬 비즈니스", vi: "Kinh doanh địa phương" } },
  { id: "salon", emoji: "💇", name: { ko: "SALON", vi: "SALON" } },
  { id: "mobility", emoji: "🛺", name: { ko: "MOBILITY", vi: "MOBILITY" } },
  { id: "host", emoji: "🏨", name: { ko: "HOST", vi: "HOST" } },
];

/** 등록 필수 확인 3종 — Admin 승인 전 사업자가 직접 확인한다 (POLICY §8) */
export const CHECK_ITEMS = [
  { id: "biz", label: { ko: "사업자 등록 확인", vi: "Xác nhận đăng ký kinh doanh" }, desc: { ko: "사업자등록증 또는 개인사업 신고 서류", vi: "Giấy đăng ký kinh doanh hoặc hộ kinh doanh cá thể" } },
  { id: "loc", label: { ko: "위치 확인", vi: "Xác nhận vị trí" }, desc: { ko: "실제 영업 위치 · 지도 검증", vi: "Vị trí kinh doanh thực tế · xác minh bản đồ" } },
  { id: "doc", label: { ko: "업종별 필수 서류", vi: "Hồ sơ bắt buộc theo ngành" }, desc: { ko: "위생 · 자격 · 인허가 (해당 업종)", vi: "Vệ sinh · chứng chỉ · giấy phép (nếu có)" } },
];

/** 파트너 등록 승인 시 CP (POLICY §8, 데모 자리표시자) */
export const PARTNER_CP = 50;

/**
 * AI 구조화 규칙 — 자유 서술을 업종·가격·예약형태로 정리한다 (데모).
 * 실서비스는 n8n + LLM으로 대체 예정.
 */
export const DRAFT_RULES = [
  { id: "beauty", re: /미용|헤어|네일|살롱|스파|salon|tóc|nail/i, cat: "beauty", price: { ko: "시술별 정찰제", vi: "Giá cố định theo dịch vụ" }, booking: { ko: "시간제 예약", vi: "Đặt lịch theo giờ" } },
  { id: "eat", re: /식당|음식|쌀국수|분식|밥|요리|반미|국수|그릴|nhà hàng|phở|quán ăn/i, cat: "eat", price: { ko: "메뉴판 기준", vi: "Theo thực đơn" }, booking: { ko: "테이블 예약 + 픽업", vi: "Đặt bàn + mang đi" } },
  { id: "cafe", re: /카페|커피|디저트|베이커리|cà phê|cafe|bánh/i, cat: "cafe", price: { ko: "메뉴판 기준", vi: "Theo thực đơn" }, booking: { ko: "픽업 예약", vi: "Đặt mang đi" } },
  { id: "move", re: /카트|이동|배달|운송|픽업|차량|렌트|xe|giao hàng/i, cat: "move", price: { ko: "거리 비례 요금", vi: "Tính theo khoảng cách" }, booking: { ko: "호출형 (실시간 배차)", vi: "Gọi xe (điều phối thời gian thực)" } },
  { id: "shop", re: /마켓|마트|쇼핑|잡화|스토어|chợ|siêu thị|cửa hàng/i, cat: "shop", price: { ko: "상품별 개별 가격", vi: "Giá theo từng sản phẩm" }, booking: { ko: "주문 + 배달", vi: "Đặt hàng + giao hàng" } },
];
export const DRAFT_FALLBACK = { cat: "life", price: { ko: "상품별 개별 가격", vi: "Giá theo từng sản phẩm" }, booking: { ko: "방문형 (예약 불필요)", vi: "Tại chỗ (không cần đặt trước)" } };

/**
 * Contributor Center (POLICY §10) — 모든 파트너는 Contributor다.
 * 기여점수는 Consumer First Ranking·검색 품질에 **절대 반영하지 않는다**(랭킹 방화벽).
 * 보상은 검증된 행동(가입 → 첫 실제 이용 → Verified Review)에만, 가입 후 90일 내까지. 전부 데모 수치.
 */
export const CONTRIB = { scans: 482, newUsers: 126, firstUse: 83, reviews: 61, score: 872, benefit: 186000, days: 90 };
export const CONTRIB_QR = {
  local: [{ id: "counter", label: "COUNTER" }, { id: "table", label: "TABLE" }],
  salon: [{ id: "mirror", label: "MIRROR" }, { id: "counter", label: "COUNTER" }],
  mobility: [{ id: "vehicle", label: "VEHICLE" }],
  host: [{ id: "room", label: "ROOM A-1208" }, { id: "lobby", label: "LOBBY" }],
};

/** HOST 정산 — 투숙객 개별 결제 내역은 노출하지 않고 카테고리 집계만 보여준다 (POLICY §7-3) */
export const HOST_TOP5 = [
  { id: "h1", emoji: "🍽", gmv: 12400000, name: { ko: "레스토랑", vi: "Nhà hàng" } },
  { id: "h2", emoji: "💇", gmv: 9800000, name: { ko: "살롱", vi: "Salon" } },
  { id: "h3", emoji: "🛺", gmv: 7200000, name: { ko: "전기카트", vi: "Xe điện" } },
  { id: "h4", emoji: "💆", gmv: 6900000, name: { ko: "마사지", vi: "Massage" } },
  { id: "h5", emoji: "✈️", gmv: 6500000, name: { ko: "공항 이동", vi: "Đưa đón sân bay" } },
];
export const HOST_SUMMARY = { gmv: 42800000, reward: 856000, rate: 2, rooms: 12, guests: 34 };

/** 컨시어지 요청 4종 — 레지던스 화면 (투숙객) */
export const CONCIERGE_ITEMS = [
  { id: "clean", emoji: "🧺", ko: "청소 요청", vi: "Dọn phòng" },
  { id: "towel", emoji: "🛁", ko: "수건 · 어메니티", vi: "Khăn · tiện nghi" },
  { id: "cart", emoji: "🛺", ko: "카트 호출", vi: "Gọi xe điện" },
  { id: "fix", emoji: "🔧", ko: "시설 수리", vi: "Sửa chữa" },
];

/** 내 숙소 — 데모 자리표시자 */
export const MY_STAY = {
  room: "1208",
  name: { ko: "Ocean Residence · 1208호", vi: "Ocean Residence · phòng 1208" },
  // 날짜 표기는 언어별로 다르다 — ko/vi 쌍으로 보관
  title: { ko: "8월 12일 15:00", vi: "12/8 · 15:00" },
  desc: { ko: "8월 19일 11:00", vi: "19/8 · 11:00" },
  img: IMG.stay,
};

/**
 * Verified Review (POLICY §2)
 *  - 실제 M4U 예약·결제 이용자만 작성 가능 → 예약 내역에서만 진입하도록 구조로 강제한다
 *  - 보상은 **좋은 별점이 아니라 성실한 작성**에 지급 (+5 CP)
 *  - 이상 탐지(반복·대량 작성)는 Admin 플래그 대상임을 고지한다
 */
export const REVIEW_CP = 5;
/** 성실한 작성 기준 — 이 길이를 넘어야 제출할 수 있다 (데모 자리표시자) */
export const REVIEW_MIN = 20;

/** AI Manager 추천 발화 — online 상태에 따라 마지막 칩이 바뀐다 */
export const AI_CHIPS = [
  { id: "sales", ko: "오늘 매출 알려줘", vi: "Doanh thu hôm nay" },
  { id: "price", ko: "가격 25,000동으로 바꿔줘", vi: "Đổi giá 25.000đ" },
];
export const AI_CHIP_TOGGLE = {
  stop: { ko: "운영 중단해줘", vi: "Tạm dừng" },
  start: { ko: "운영 시작해줘", vi: "Mở lại" },
};

/** 카트 운영 초기값 — 데모 자리표시자 (CLAUDE.md §6) */
export const CART_INIT = { calls: 12, bookings: 4, revenue: 320000, rating: 4.9, rank: 2, price: 20000 };

/**
 * M4U 셀렉트 상품 (SHOP) — 결제 시 HRP 적립 (POLICY §3).
 * "공식"은 M4U가 직접 소싱했다는 표시이며 광고 노출과 무관하다 (POLICY §1).
 * 가격·적립률은 전부 데모 자리표시자 (CLAUDE.md §6).
 */
export const PRODUCTS = [
  {
    id: "p1", img: IMG.skinset, price: 620000, origin: 820000, point: 62, official: true,
    brand: "M4U Living",
    name: { ko: "M4U 어성초 수딩 스킨케어 세트", vi: "Bộ chăm sóc da dịu nhẹ diếp cá M4U" },
    consist: { ko: "토너 150ml · 세럼 30ml · 크림 50ml · 클렌저 120ml", vi: "Toner 150ml · serum 30ml · kem 50ml · sữa rửa mặt 120ml" },
    desc: { ko: "어성초 추출물과 병풀 성분이 민감한 피부를 진정시키고 수분 밸런스를 맞춰주는 저자극 세트입니다.", vi: "Chiết xuất diếp cá và rau má giúp làm dịu da nhạy cảm và cân bằng độ ẩm." },
  },
  {
    id: "p2", img: IMG.serum, price: 380000, origin: 450000, point: 38, official: true,
    brand: "M4U Living",
    name: { ko: "그린 티트리 진정 세럼 30ml", vi: "Serum dịu da trà tràm 30ml" },
    consist: { ko: "세럼 30ml 단품", vi: "Serum 30ml" },
    desc: { ko: "티트리 잎 추출물이 트러블 부위를 빠르게 진정시키는 데일리 세럼입니다.", vi: "Chiết xuất lá tràm trà giúp làm dịu nhanh vùng da mụn, dùng hằng ngày." },
  },
  {
    id: "p3", img: IMG.maskpack, price: 190000, origin: 220000, point: 19, official: true,
    brand: "M4U Living",
    name: { ko: "시카 리페어 마스크팩 10매", vi: "Mặt nạ phục hồi Cica 10 miếng" },
    consist: { ko: "시트 마스크 10매", vi: "Mặt nạ giấy 10 miếng" },
    desc: { ko: "센텔라 성분이 자극받은 피부 장벽을 회복시키는 진정 마스크입니다.", vi: "Thành phần rau má giúp phục hồi hàng rào bảo vệ da đang bị kích ứng." },
  },
  {
    id: "p4", img: IMG.hairoil, price: 240000, origin: null, point: 24, official: true,
    brand: "M4U Salon",
    name: { ko: "프리미엄 헤어 케어 오일", vi: "Dầu dưỡng tóc cao cấp" },
    consist: { ko: "헤어 오일 100ml", vi: "Dầu dưỡng tóc 100ml" },
    desc: { ko: "살롱에서 쓰는 그 오일 그대로, 열 손상 모발을 케어합니다.", vi: "Đúng loại dầu salon đang dùng, chăm sóc tóc hư tổn do nhiệt." },
  },
];

/**
 * STAY 객실 (POLICY §7) — 스테이 예약 완료 시 +5 CP (POLICY §4).
 * 투숙 기간의 지역 소비는 객실 Guest QR로 Host에게 1단계 추천 보상이 귀속된다.
 * 요금·적립률은 데모 자리표시자 (CLAUDE.md §6).
 */
export const STAY_CP = 5;
/** HRP 적립 = 결제액 / 이 값 (데모) */
export const STAY_HRP_DIV = 10000;

export const STAYS = [
  {
    id: "r1", img: IMG.stay, price: 1450000, rating: 4.9, reviews: 64,
    name: { ko: "Ocean Residence Studio", vi: "Ocean Residence Studio" },
    size: { ko: "42㎡ · 최대 2인", vi: "42m² · tối đa 2 người" },
    desc: { ko: "체크인 즉시 생활이 가능한 풀옵션 스튜디오. M4U 컨시어지가 상주합니다.", vi: "Studio đầy đủ tiện nghi, sinh hoạt ngay khi nhận phòng. Có lễ tân M4U." },
    amen: [
      { emoji: "🌊", ko: "오션뷰", vi: "View biển" },
      { emoji: "🏊", ko: "인피니티 풀", vi: "Hồ bơi vô cực" },
      { emoji: "🧺", ko: "주 2회 청소", vi: "Dọn phòng 2 lần/tuần" },
      { emoji: "🛜", ko: "기가 와이파이", vi: "Wifi tốc độ cao" },
    ],
  },
  {
    id: "r2", img: IMG.room2, price: 2300000, rating: 4.8, reviews: 41,
    name: { ko: "Sky Garden 2BR", vi: "Sky Garden 2BR" },
    size: { ko: "78㎡ · 최대 4인", vi: "78m² · tối đa 4 người" },
    desc: { ko: "가족 단위 중장기 체류에 맞춘 2베드룸. 국제학교 셔틀 정류장 도보 3분.", vi: "2 phòng ngủ cho gia đình ở dài hạn. Cách trạm xe trường quốc tế 3 phút đi bộ." },
    amen: [
      { emoji: "🌿", ko: "가든 테라스", vi: "Sân vườn" },
      { emoji: "👨‍👩‍👧", ko: "패밀리형", vi: "Phù hợp gia đình" },
      { emoji: "🍳", ko: "풀키친", vi: "Bếp đầy đủ" },
      { emoji: "🅿️", ko: "전용 주차", vi: "Chỗ đậu xe riêng" },
    ],
  },
  {
    id: "r3", img: IMG.room3, price: 1800000, rating: 4.8, reviews: 52,
    name: { ko: "Park View 1BR", vi: "Park View 1BR" },
    size: { ko: "56㎡ · 최대 3인", vi: "56m² · tối đa 3 người" },
    desc: { ko: "재택근무자를 위한 워크 프렌들리 1베드룸. 라운지 미팅룸 무료 이용.", vi: "1 phòng ngủ phù hợp làm việc từ xa. Miễn phí dùng phòng họp chung." },
    amen: [
      { emoji: "🌳", ko: "파크뷰", vi: "View công viên" },
      { emoji: "💼", ko: "워크데스크", vi: "Bàn làm việc" },
      { emoji: "🧖", ko: "사우나", vi: "Phòng xông hơi" },
      { emoji: "🛜", ko: "기가 와이파이", vi: "Wifi tốc độ cao" },
    ],
  },
];

/**
 * AI 컨시어지 (안내 + 초안 범위 — 대표 승인 2026-08-13)
 *  - AI가 하는 것: 의도 파악 · 후보 제시(랭킹 그대로) · 화면 딥링크 · 폼 미리 채우기
 *  - AI가 하지 않는 것: 결제 · 예약 확정 · 쿠폰 사용 · 리뷰 작성 · 투표
 * 후보는 ranking.js 결과를 그대로 쓴다 — AI가 따로 정렬하지 않는다 (POLICY §1).
 * 실서비스는 n8n + LLM으로 대체 예정이며, 아래 규칙은 데모용 의도 매칭이다.
 */
export const AI_INTENTS = [
  {
    id: "eat", re: /맛집|식당|밥|한식|먹|배고|음식|nhà hàng|quán|món|đói|ăn/i,
    say: { ko: "MY ZONE 랭킹 상위 맛집을 모아왔어요. 예약 화면까지 열어드릴게요.", vi: "Đây là các quán ăn xếp hạng cao trong MY ZONE. Tôi sẽ mở màn hình đặt chỗ." },
    act: { sub: "cat", params: { catId: "eat" }, label: { ko: "맛집 목록 열기", vi: "Mở danh sách quán ăn" } },
  },
  {
    id: "salon", re: /살롱|미용|헤어|네일|피부|스파|마사지|salon|tóc|nail|da|massage/i,
    say: { ko: "뷰티 프로필을 만들면 더 잘 맞는 케어를 찾을 수 있어요. 살롱 화면으로 안내할게요.", vi: "Tạo hồ sơ làm đẹp sẽ giúp tìm dịch vụ phù hợp hơn. Tôi sẽ mở màn hình salon." },
    act: { tab: "salon", label: { ko: "Salon 열기", vi: "Mở Salon" } },
  },
  {
    id: "move", re: /카트|이동|택시|차량|렌트|타고|xe|di chuyển|taxi/i,
    say: { ko: "단지 전역에서 전기카트를 부를 수 있어요. 호출 화면을 열어드릴게요.", vi: "Bạn có thể gọi xe điện trong toàn khu. Tôi sẽ mở màn hình gọi xe." },
    act: { sub: "cat", params: { catId: "move" }, label: { ko: "E-카트 호출 화면", vi: "Màn hình gọi xe điện" } },
  },
  {
    id: "stay", re: /숙소|객실|스테이|레지던스|숙박|묵|phòng|lưu trú|ở/i,
    say: { ko: "레지던스 객실을 보여드릴게요. 기간을 고르면 적립 예정 금액까지 계산됩니다.", vi: "Tôi sẽ hiển thị các phòng. Chọn thời gian sẽ tính luôn điểm tích lũy dự kiến." },
    act: { sub: "stay", label: { ko: "객실 보기", vi: "Xem phòng" } },
  },
  {
    id: "shop", re: /상품|사고|구매|쇼핑|스킨|세럼|마스크|mua|sản phẩm|serum/i,
    say: { ko: "M4U Select 상품을 모아뒀어요. 결제 금액에 비례해 HRP가 적립됩니다.", vi: "Đây là sản phẩm M4U Select. HRP tích theo số tiền thanh toán." },
    act: { sub: "shop", label: { ko: "SHOP 열기", vi: "Mở SHOP" } },
  },
  {
    id: "wallet", re: /적립|포인트|지갑|HRP|CP|쿠폰|공동구매|투표|ví|điểm|phiếu/i,
    say: { ko: "지갑에서 HRP · CP 내역과 공동구매 · 투표를 볼 수 있어요.", vi: "Trong ví bạn xem được lịch sử HRP · CP, mua chung và bỏ phiếu." },
    act: { sub: "wallet", label: { ko: "지갑 열기", vi: "Mở ví" } },
  },
  {
    id: "habit", re: /습관|걷기|운동|물|명상|thói quen|đi bộ|thiền/i,
    say: { ko: "오늘 습관 현황을 볼 수 있어요. 걷기는 헬스 데이터 검증으로 CP도 함께 적립됩니다.", vi: "Xem tình hình thói quen hôm nay. Đi bộ được xác minh dữ liệu nên tích cả CP." },
    act: { tab: "habit", label: { ko: "Habit 열기", vi: "Mở Habit" } },
  },
  {
    id: "translate", re: /통역|번역|베트남어|한국어|말|dịch|tiếng việt|tiếng hàn/i,
    say: { ko: "화면 언어는 MY · 언어에서 언제든 바꿀 수 있어요. 매장에서 쓸 표현도 도와드릴게요.", vi: "Bạn có thể đổi ngôn ngữ trong MY · Ngôn ngữ bất cứ lúc nào. Tôi cũng giúp câu nói khi ở cửa hàng." },
    act: { tab: "my", label: { ko: "MY 열기", vi: "Mở MY" } },
  },
];

/** 시트를 열었을 때 먼저 보여주는 예시 질문 */
export const AI_SUGGEST = [
  { id: "s1", ko: "근처 한식당 추천해줘", vi: "Gợi ý quán ăn Hàn gần đây" },
  { id: "s2", ko: "카트 부르고 싶어", vi: "Tôi muốn gọi xe điện" },
  { id: "s3", ko: "적립 얼마나 됐어?", vi: "Tôi tích được bao nhiêu?" },
  { id: "s4", ko: "객실 보여줘", vi: "Cho tôi xem phòng" },
];

/**
 * FEED — 습관 기록 커뮤니티 1단계 (DESIGN_SYSTEM §4.11)
 *  - 피드는 리뷰가 아니다: 별점 없음, 평점·랭킹·검색에 반영 금지 (POLICY §1·§2·§10)
 *  - 게시물 보상은 HRP만. CP는 주지 않는다 (POLICY §4 — 사진은 검증 가능한 활동이 아니다)
 *  - HRP는 셀프 체크와 같은 일일 상한을 공유한다
 */
/** 기록 최소 길이 — 탭 한 번보다 강한 근거를 남기게 한다 */
export const FEED_MIN = 10;

/**
 * FEED 카테고리 (POLICY §11.2)
 *
 * 습관 기록뿐 아니라 맛집 · 생활정보 · Salon · 체험을 자유롭게 공유한다.
 * **습관 외 게시에는 보상이 없다** (§11.6) — 글을 써서 HRP를 받는 구조를 만들지 않는다.
 */
export const FEED_CATS = [
  { id: "habit", emoji: "\u2705", name: { ko: "습관", vi: "Thói quen" } },
  { id: "food", emoji: "\ud83c\udf5c", name: { ko: "맛집", vi: "Quán ngon" } },
  { id: "life", emoji: "\ud83c\udfe1", name: { ko: "생활정보", vi: "Đời sống" } },
  { id: "salon", emoji: "\ud83d\udc87", name: { ko: "Salon", vi: "Salon" } },
  { id: "exp", emoji: "\ud83c\udf9f", name: { ko: "체험", vi: "Trải nghiệm" } },
];

/** 이웃 기록 데모 — 실서비스는 서버에서 온다 */
export const FEED_SEED = [
  {
    id: "f1", cat: "habit", who: "지*님", whoVi: "Chị T.", av: "지", habit: "meditate", img: IMG.medi1,
    when: { ko: "20분 전", vi: "20 phút trước" },
    text: { ko: "퇴근하고 Mindful Garden 저녁 클래스 다녀왔어요. 정원에서 하니 확실히 다르네요.", vi: "Sau giờ làm ghé lớp thiền tối ở Mindful Garden. Thiền trong vườn khác hẳn." },
  },
  {
    id: "f2", cat: "habit", who: "현*님", whoVi: "Anh H.", av: "현", habit: "run", img: null,
    when: { ko: "1시간 전", vi: "1 giờ trước" },
    text: { ko: "단지 한 바퀴 5km 완주. 아침에 뛰면 하루가 길어지는 느낌이에요.", vi: "Chạy hết một vòng khu 5km. Chạy buổi sáng làm ngày dài hơn." },
  },
  {
    id: "f3", cat: "habit", who: "수*님", whoVi: "Chị S.", av: "수", habit: "water", img: IMG.cafe,
    when: { ko: "3시간 전", vi: "3 giờ trước" },
    text: { ko: "The Coffee House에서 물 두 잔 추가. 오늘 8잔 채웠습니다!", vi: "Uống thêm 2 ly nước ở The Coffee House. Hôm nay đủ 8 ly!" },
  },
  {
    id: "f4", cat: "food", who: "민*님", whoVi: "Chị M.", av: "민", habit: null, img: IMG.grill,
    venue: "v2", used: true,
    when: { ko: "2시간 전", vi: "2 giờ trước" },
    text: { ko: "S2 상가 1층 숯불집, 점심에 가면 줄이 짧아요. 반찬 리필도 잘 해주세요.", vi: "Quán nướng than tầng 1 khu S2, đi buổi trưa ít phải xếp hàng. Đồ ăn kèm cũng được thêm thoải mái." },
  },
  {
    id: "f5", cat: "life", who: "안*님", whoVi: "Anh A.", av: "안", habit: null, img: null,
    when: { ko: "4시간 전", vi: "4 giờ trước" },
    text: { ko: "S3 쪽 정전은 오후 4시에 복구됐대요. 엘리베이터도 다시 움직입니다.", vi: "Khu S3 đã có điện lại lúc 4 giờ chiều. Thang máy cũng hoạt động bình thường." },
  },
  {
    id: "f6", cat: "salon", who: "린*님", whoVi: "Chị L.", av: "린", habit: null, img: IMG.salon,
    venue: "v1", used: true,
    when: { ko: "어제", vi: "Hôm qua" },
    text: { ko: "두피 케어 받고 왔어요. 예약은 평일 오전이 여유 있습니다.", vi: "Vừa đi chăm sóc da đầu về. Đặt lịch buổi sáng ngày thường thì thoáng hơn." },
  },
  {
    id: "f7", cat: "food", who: "빈홈 그릴 하우스", whoVi: "Vinhomes Grill House", av: "G",
    habit: null, img: null, venue: "v2", partner: true,
    when: { ko: "오늘", vi: "Hôm nay" },
    text: { ko: "이번 주 평일 점심에 오시면 음료를 드립니다. 예약 없이 오셔도 됩니다.", vi: "Tuần này dùng bữa trưa ngày thường sẽ được tặng nước. Không cần đặt trước." },
  },
];
