import React, { useEffect, useMemo, useState } from "react";
import {
  Home, CalendarDays, ShoppingBag, User, Bell, Search, Star, ChevronRight,
  ChevronDown, MapPin, Heart, Share2, ArrowLeft, Check, X, QrCode, Sparkles,
  Send, Clock3, Users, Timer, Ticket, ShieldCheck, BadgeCheck, Rocket, Store,
  Zap, Package, Truck, RotateCcw, Minus, Plus, Settings, Building2, CreditCard,
  Award, Wallet, Vote, Globe, BedDouble, KeyRound, Leaf, Footprints, Flame, Droplets, Power, TrendingUp, Compass, Scissors,
} from "lucide-react";

/* ─────────── TOKENS ─────────── */

const C = {
  green: "#073E2B", green2: "#0E5A3E", cream: "#F5F1E8", ivory: "#FFFDF8",
  gold: "#C6A15B", goldSoft: "#E8D9B8", line: "#E7DFD0", text: "#1B2E26",
  muted: "#8A8578", red: "#B4552F", blue: "#3E5E8A",
};

const IMG = {
  salon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
  facial: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  nail: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
  grill: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  market: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  noodle: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
  skin1: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
  skin2: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
  serum: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
  mask: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  res1: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
  res2: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
  res3: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
};

// L(lang, ko, vi) — 어디서나 쓰는 번역 헬퍼. lang이 있는 곳이면 어디서든 호출 가능.
const L = (lang, ko, vi) => (lang === "ko" ? ko : vi);

const ZONES = [
  { ko: "빈홈 그랜드 파크", vi: "Vinhomes Grand Park" },
  { ko: "타오디엔", vi: "Thảo Điền" },
  { ko: "푸미흥", vi: "Phú Mỹ Hưng" },
];
const zoneName = (z, lang) => (z ? (lang === "ko" ? z.ko : z.vi) : "");

const vnd = (n) => n.toLocaleString("ko-KR") + " VND";
const fmtDate = (d, lang) =>
  lang === "ko"
    ? `${d.getMonth() + 1}/${d.getDate()} (${"일월화수목금토"[d.getDay()]})`
    : `${d.getDate()}/${d.getMonth() + 1} (${["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()]})`;

/* ─────────── i18n (탭·공용 라벨) ─────────── */

const T = {
  ko: {
    home: "홈", living: "리빙", stay: "스테이", booking: "예약", order: "주문", habit: "습관", salon: "살롱", wallet: "지갑", my: "마이",
    greet: "좋은 아침이에요, 회원님!", greetSub: "오늘도 편리하고 특별한 하루 되세요.",
    search: "가게, 서비스, 상품을 검색해보세요", popular: "우리 단지 인기 서비스",
    aiIntro: "안녕하세요! 숙소 · 예약 · 이동 · 맛집, 무엇이든 도와드릴게요.",
    aiName: "M4U AI 컨시어지",
  },
  vi: {
    home: "Trang chủ", living: "Đời sống", stay: "Lưu trú", booking: "Đặt chỗ", order: "Đơn hàng", habit: "Thói quen", salon: "Salon", wallet: "Ví", my: "Của tôi",
    greet: "Chào buổi sáng!", greetSub: "Chúc bạn một ngày thuận tiện và đặc biệt.",
    search: "Tìm cửa hàng, dịch vụ, sản phẩm", popular: "Dịch vụ nổi bật trong khu",
    aiIntro: "Xin chào! Tôi có thể giúp bạn đặt chỗ, gọi xe, tìm quán ăn.",
    aiName: "Trợ lý AI M4U",
  },
};

/* ─────────── DATA (카테고리) ─────────── */

const CATS = [["🍜", "맛집"], ["☕", "카페"], ["💇", "살롱·뷰티"], ["🛍", "쇼핑"], ["🛺", "이동·렌트"], ["🏠", "생활·편의"]];
const CAT_VI = {
  "맛집": "Ẩm thực", "카페": "Cà phê", "살롱·뷰티": "Salon · Làm đẹp",
  "쇼핑": "Mua sắm", "이동·렌트": "Di chuyển", "생활·편의": "Tiện ích", "전체": "Tất cả",
};
// 내부 매칭 키는 한국어 문자열로 고정(안정적인 filter/goSub 키), 화면 표시만 언어별로 분기
const catLabel = (cat, lang) => (lang === "ko" ? cat : (CAT_VI[cat] || cat));

/* ─────────── DATA (매장) ─────────── */

const VENUES = [
  {
    id: "v1", name: "M4U Salon & Spa", cat: "살롱·뷰티", img: IMG.salon, logo: "M4U",
    rating: 4.9, reviews: 128,
    walk: "도보 3분", walkVi: "Đi bộ 3 phút",
    open: "영업중 · 10:00 - 20:00", openVi: "Đang mở · 10:00 - 20:00",
    rebook: 74, fulfill: 99, cancel: 1, resp: "5분", respVi: "5 phút", verified: 128, boost: false,
    features: [
      ["🧑‍⚕️", "전문 테라피스트", "Chuyên viên trị liệu"],
      ["🌿", "프리미엄 제품", "Sản phẩm cao cấp"],
      ["📅", "예약제 운영", "Hoạt động theo lịch hẹn"],
      ["🅿️", "주차 가능", "Có chỗ đậu xe"],
    ],
    address: "S1.05 빈홈 그랜드 파크", addressVi: "S1.05 Vinhomes Grand Park",
    policy: "예약 2시간 전까지 무료 취소", policyVi: "Miễn phí hủy trước giờ hẹn 2 tiếng",
    services: [
      { id: "s1", img: IMG.hair, name: "헤어컷 & 스타일링", nameVi: "Cắt & Tạo Kiểu Tóc", desc: "고객님의 이미지에 맞춘 디자인 컷 & 스타일링", descVi: "Kiểu tóc được thiết kế riêng theo hình ảnh của bạn", time: "60분", timeVi: "60 phút", price: 250000, point: 25 },
      { id: "s2", img: IMG.spa, name: "두피 케어 스파", nameVi: "Spa Chăm Sóc Da Đầu", desc: "두피 클렌징과 영양 케어로 건강한 두피 관리", descVi: "Làm sạch và dưỡng chất giúp da đầu khỏe mạnh", time: "50분", timeVi: "50 phút", price: 350000, point: 35 },
      { id: "s3", img: IMG.facial, name: "아로마 바디 마사지", nameVi: "Massage Body Aroma", desc: "100% 천연 아로마 오일로 피로 회복 & 릴랙싱", descVi: "Tinh dầu thiên nhiên 100% giúp phục hồi năng lượng", time: "80분", timeVi: "80 phút", price: 550000, point: 55 },
      { id: "s4", img: IMG.nail, name: "젤 네일 아트", nameVi: "Nail Gel Nghệ Thuật", desc: "시즌 컬러 추천과 함께하는 젤 네일 케어", descVi: "Chăm sóc móng gel theo màu xu hướng mùa", time: "70분", timeVi: "70 phút", price: 320000, point: 32 },
    ],
    reviewList: [
      { who: "지*님", whoVi: "Chị T.", text: "예약 시간 정확하고 두피 스파 최고예요. 재방문 의사 100%!", textVi: "Đặt lịch đúng giờ, spa da đầu tuyệt vời. Chắc chắn quay lại!", rate: 5 },
      { who: "민*님", whoVi: "Chị M.", text: "베트남에서 이 퀄리티의 K-살롱은 처음이에요.", textVi: "Lần đầu thấy salon Hàn chất lượng cao thế này ở Việt Nam.", rate: 5 },
    ],
  },
  {
    id: "v2", name: "빈홈 그릴 하우스", nameVi: "Nhà Hàng Nướng Vinhomes", cat: "맛집", img: IMG.grill, logo: "GRILL",
    rating: 4.8, reviews: 96,
    walk: "도보 2분", walkVi: "Đi bộ 2 phút",
    open: "영업중 · 11:00 - 22:00", openVi: "Đang mở · 11:00 - 22:00",
    rebook: 71, fulfill: 98, cancel: 2, resp: "8분", respVi: "8 phút", verified: 96, boost: false,
    features: [
      ["🔥", "참숯 그릴", "Nướng than hoa"],
      ["🥩", "당일 손질", "Thịt tươi trong ngày"],
      ["👨‍👩‍👧", "단체석", "Bàn nhóm đông"],
      ["🛵", "단지 내 배달", "Giao hàng nội khu"],
    ],
    address: "S2.01 빈홈 그랜드 파크", addressVi: "S2.01 Vinhomes Grand Park",
    policy: "노쇼 시 예약 보증금 차감", policyVi: "Mất tiền cọc nếu không đến",
    services: [
      { id: "s1", img: IMG.grill, name: "프리미엄 모둠 그릴 세트", nameVi: "Set Nướng Thập Cẩm Cao Cấp", desc: "삼겹 · 목살 · 갈비 구성, 2~3인", descVi: "Ba chỉ · vai · sườn, dành cho 2-3 người", time: "테이블 예약", timeVi: "Đặt bàn", price: 590000, point: 59 },
      { id: "s2", img: IMG.grill, name: "런치 그릴 정식", nameVi: "Cơm Trưa Nướng", desc: "1인 그릴 정식 + 반찬 무제한", descVi: "Phần ăn nướng 1 người + rau ăn kèm không giới hạn", time: "테이블 예약", timeVi: "Đặt bàn", price: 180000, point: 18 },
    ],
    reviewList: [{ who: "현*님", whoVi: "Anh H.", text: "고기 질이 한국 못지않아요. 도보 2분이라 최고.", textVi: "Chất lượng thịt không thua gì Hàn Quốc, lại đi bộ 2 phút là tới.", rate: 5 }],
  },
  {
    id: "v3", name: "그린마켓", nameVi: "Green Market", cat: "쇼핑", img: IMG.market, logo: "GM",
    rating: 4.7, reviews: 74,
    walk: "도보 4분", walkVi: "Đi bộ 4 phút",
    open: "영업중 · 08:00 - 22:00", openVi: "Đang mở · 08:00 - 22:00",
    rebook: 69, fulfill: 99, cancel: 1, resp: "10분", respVi: "10 phút", verified: 74, boost: false,
    features: [
      ["🥬", "당일 입고", "Hàng mới mỗi ngày"],
      ["🇰🇷", "한국 식료품", "Thực phẩm Hàn Quốc"],
      ["🛵", "무료 배달", "Giao hàng miễn phí"],
      ["🧊", "콜드체인", "Chuỗi lạnh đảm bảo"],
    ],
    address: "S3.02 빈홈 그랜드 파크", addressVi: "S3.02 Vinhomes Grand Park",
    policy: "단지 내 무료 배달 (30분 내)", policyVi: "Giao hàng miễn phí trong khu (trong 30 phút)",
    services: [],
    reviewList: [{ who: "제*님", whoVi: "Chị J.", text: "김치랑 반찬 퀄리티가 좋아요.", textVi: "Kim chi và món ăn kèm chất lượng tốt, giao hàng cũng nhanh.", rate: 5 }],
  },
  {
    id: "v4", name: "카페 아치", nameVi: "Cafe Arch", cat: "카페", img: IMG.coffee, logo: "ARCH",
    rating: 4.8, reviews: 82,
    walk: "도보 3분", walkVi: "Đi bộ 3 phút",
    open: "영업중 · 07:00 - 21:00", openVi: "Đang mở · 07:00 - 21:00",
    rebook: 77, fulfill: 99, cancel: 1, resp: "3분", respVi: "3 phút", verified: 82, boost: false,
    features: [
      ["☕", "스페셜티 원두", "Cà phê đặc sản"],
      ["🥐", "당일 베이킹", "Bánh nướng trong ngày"],
      ["💻", "워크 프렌들리", "Phù hợp làm việc"],
      ["🐶", "펫 동반", "Cho phép thú cưng"],
    ],
    address: "S1.09 빈홈 그랜드 파크", addressVi: "S1.09 Vinhomes Grand Park",
    policy: "픽업 주문 시 5% 할인", policyVi: "Giảm 5% khi đặt mang đi",
    services: [{ id: "s1", img: IMG.coffee, name: "모닝 세트 예약", nameVi: "Đặt Set Sáng", desc: "아메리카노 + 크루아상, 픽업 시간 지정", descVi: "Americano + Croissant, chọn giờ lấy", time: "픽업 예약", timeVi: "Đặt mang đi", price: 95000, point: 9 }],
    reviewList: [{ who: "라*님", whoVi: "Chị L.", text: "아침마다 픽업 예약해서 받아가요.", textVi: "Sáng nào cũng đặt trước rồi ghé lấy, rất tiện.", rate: 5 }],
  },
  {
    id: "v5", name: "반꾸온 하노이", nameVi: "Bánh Cuốn Hà Nội", cat: "맛집", img: IMG.noodle, logo: "NEW",
    rating: 4.5, reviews: 3,
    walk: "도보 5분", walkVi: "Đi bộ 5 phút",
    open: "영업중 · 08:00 - 20:00", openVi: "Đang mở · 08:00 - 20:00",
    rebook: null, fulfill: null, cancel: null, resp: "—", respVi: "—", verified: 3, boost: true,
    features: [
      ["🥟", "북부식 반꾸온", "Bánh cuốn kiểu Bắc"],
      ["🌅", "아침 영업", "Mở cửa buổi sáng"],
      ["🌿", "현지 신선 재료", "Nguyên liệu tươi địa phương"],
      ["🆕", "신규 오픈", "Mới khai trương"],
    ],
    address: "S5.03 빈홈 그랜드 파크", addressVi: "S5.03 Vinhomes Grand Park",
    policy: "첫 주문 10% 할인", policyVi: "Giảm 10% đơn đầu tiên",
    services: [{ id: "s1", img: IMG.noodle, name: "반꾸온 아침 세트", nameVi: "Set Sáng Bánh Cuốn", desc: "반꾸온 + 짜루아 + 연유커피", descVi: "Bánh cuốn + chả lụa + cà phê sữa", time: "픽업 예약", timeVi: "Đặt mang đi", price: 85000, point: 8 }],
    reviewList: [{ who: "타*님", whoVi: "Anh T.", text: "신규 오픈인데 맛이 벌써 자리 잡았어요.", textVi: "Mới mở nhưng hương vị đã rất ổn định.", rate: 4.5 }],
  },
];
const venueName = (v, lang) => (lang === "ko" ? v.name : (v.nameVi || v.name));

/* ─────────── DATA (스테이) ─────────── */

const STAYS = [
  {
    id: "r1", name: "Ocean Residence Studio", img: IMG.res1,
    size: "42㎡ · 최대 2인", sizeVi: "42m² · Tối đa 2 người",
    price: 1450000, rating: 4.9, reviews: 64,
    amen: [["🌊", "오션뷰", "View biển"], ["🏊", "인피니티 풀", "Hồ bơi vô cực"], ["🧺", "주 2회 청소", "Dọn phòng 2 lần/tuần"], ["🛜", "기가 와이파이", "Wifi tốc độ cao"]],
    desc: "체크인 즉시 생활이 가능한 풀옵션 스튜디오. M4U 컨시어지가 상주합니다.",
    descVi: "Studio đầy đủ tiện nghi, sẵn sàng sinh hoạt ngay khi nhận phòng. Có lễ tân M4U hỗ trợ.",
  },
  {
    id: "r2", name: "Sky Garden 2BR", img: IMG.res2,
    size: "78㎡ · 최대 4인", sizeVi: "78m² · Tối đa 4 người",
    price: 2300000, rating: 4.8, reviews: 41,
    amen: [["🌿", "가든 테라스", "Sân vườn"], ["👨‍👩‍👧", "패밀리형", "Phù hợp gia đình"], ["🍳", "풀키친", "Bếp đầy đủ"], ["🅿️", "전용 주차", "Chỗ đậu xe riêng"]],
    desc: "가족 단위 중장기 체류에 최적화된 2베드룸. 국제학교 셔틀 정류장 도보 3분.",
    descVi: "2 phòng ngủ lý tưởng cho gia đình ở dài hạn. Cách trạm xe buýt trường quốc tế 3 phút đi bộ.",
  },
  {
    id: "r3", name: "Park View 1BR", img: IMG.res3,
    size: "56㎡ · 최대 3인", sizeVi: "56m² · Tối đa 3 người",
    price: 1800000, rating: 4.8, reviews: 52,
    amen: [["🌳", "파크뷰", "View công viên"], ["💼", "워크데스크", "Bàn làm việc"], ["🧖", "사우나", "Sauna"], ["🛜", "기가 와이파이", "Wifi tốc độ cao"]],
    desc: "재택근무자를 위한 워크 프렌들리 1베드룸. 라운지 미팅룸 무료 이용.",
    descVi: "1 phòng ngủ phù hợp làm việc từ xa. Miễn phí sử dụng phòng họp chung.",
  },
];

/* ─────────── DATA (상품) ─────────── */

const PRODUCTS = [
  {
    id: "p1", brand: "M4U Living", name: "M4U 어성초 수딩 스킨케어 세트", nameVi: "Bộ Chăm Sóc Da Dịu Nhẹ Diếp Cá M4U",
    img: IMG.skin1, price: 620000, origin: 820000, official: true, point: 62,
    consist: "토너 150ml · 세럼 30ml · 크림 50ml · 클렌저 120ml", consistVi: "Toner 150ml · Serum 30ml · Kem 50ml · Sữa rửa mặt 120ml",
    desc: "어성초 추출물과 병풀 성분이 민감한 피부를 진정시키고 수분 밸런스를 맞춰주는 저자극 스킨케어 세트입니다.",
    descVi: "Chiết xuất diếp cá và rau má giúp làm dịu da nhạy cảm và cân bằng độ ẩm cho làn da.",
  },
  {
    id: "p2", brand: "M4U Living", name: "그린 티트리 진정 세럼 30ml", nameVi: "Serum Dịu Da Trà Tràm 30ml",
    img: IMG.serum, price: 380000, origin: 450000, official: true, point: 38,
    consist: "세럼 30ml 단품", consistVi: "Serum 30ml",
    desc: "티트리 잎 추출물이 트러블 부위를 빠르게 진정시키는 데일리 세럼입니다.",
    descVi: "Chiết xuất lá tràm trà giúp làm dịu nhanh vùng da mụn, dùng được hằng ngày.",
  },
  {
    id: "p3", brand: "M4U Living", name: "시카 리페어 마스크팩 10매", nameVi: "Mặt Nạ Phục Hồi Cica 10 Miếng",
    img: IMG.mask, price: 190000, origin: 220000, official: true, point: 19,
    consist: "시트 마스크 10매", consistVi: "Mặt nạ giấy 10 miếng",
    desc: "센텔라 성분이 자극받은 피부 장벽을 회복시키는 진정 마스크입니다.",
    descVi: "Thành phần rau má giúp phục hồi hàng rào da đang bị kích ứng.",
  },
  {
    id: "p4", brand: "M4U Salon", name: "프리미엄 헤어 케어 오일", nameVi: "Dầu Dưỡng Tóc Cao Cấp",
    img: IMG.skin2, price: 240000, origin: null, official: true, point: 24,
    consist: "헤어 오일 100ml", consistVi: "Dầu dưỡng tóc 100ml",
    desc: "살롱에서 사용하는 그 오일 그대로, 열 손상 모발을 케어합니다.",
    descVi: "Đúng loại dầu salon đang sử dụng, chăm sóc tóc hư tổn do nhiệt.",
  },
];
const prodName = (p, lang) => (lang === "ko" ? p.name : p.nameVi);

/* ─────────── DATA (FIVE / 쿠폰 / 투표 / CP) ─────────── */

const FIVE_TIERS = { 5: { dc: 40, hrp: 20, hours: 72 }, 10: { dc: 45, hrp: 40, hours: 96 }, 15: { dc: 50, hrp: 60, hours: 120 } };
const initialRooms = [
  { id: "f1", tier: 5, product: "어성초 수딩 스킨케어 세트", productVi: "Bộ Chăm Sóc Da Dịu Nhẹ Diếp Cá", origin: 820000, joined: 3, endsAt: Date.now() + 26 * 3600e3, img: IMG.skin1 },
  { id: "f2", tier: 10, product: "시카 리페어 마스크팩 10매", productVi: "Mặt Nạ Phục Hồi Cica 10 Miếng", origin: 220000, joined: 7, endsAt: Date.now() + 61 * 3600e3, img: IMG.mask },
  { id: "f3", tier: 15, product: "그린 티트리 세럼 더블 세트", productVi: "Bộ Đôi Serum Trà Tràm", origin: 900000, joined: 9, endsAt: Date.now() + 98 * 3600e3, img: IMG.serum },
];

const initialCoupons = [
  { id: "c1", title: "Salon 10% 할인", titleVi: "Giảm 10% Salon", desc: "8월 31일까지 · 전 서비스", descVi: "Đến 31/8 · Tất cả dịch vụ", used: false },
  { id: "c2", title: "주문 20,000 VND 할인", titleVi: "Giảm 20.000 VND", desc: "1회 · 최소 결제 200,000 VND", descVi: "1 lần · Đơn tối thiểu 200.000 VND", used: false },
  { id: "c3", title: "E-카트 무료 1회", titleVi: "Miễn Phí 1 Lượt Xe Điện", desc: "단지 내 구간", descVi: "Trong khu vực nội khu", used: false },
];

// CP 가중 투표 — Web3 전환 시 온체인 거버넌스로 1:1 이관되는 구조
const initialProposals = [
  { id: "g1", title: "단지 셔틀 노선 2개 추가", titleVi: "Thêm 2 Tuyến Xe Buýt Nội Khu", desc: "출퇴근 시간 국제학교·오피스 구역 직행 노선 신설", descVi: "Mở tuyến trực tiếp đến trường quốc tế và khu văn phòng vào giờ cao điểm", yes: 1240, no: 380, quorum: 2000, endsAt: Date.now() + 48 * 3600e3, status: "open" },
  { id: "g2", title: "신규 입점 카테고리: 키즈 클래스", titleVi: "Danh Mục Mới: Lớp Học Cho Trẻ", desc: "단지 내 유휴 공간을 활용한 키즈 클래스 파트너 모집", descVi: "Tuyển đối tác tổ chức lớp học cho trẻ tại không gian trống trong khu", yes: 860, no: 210, quorum: 2000, endsAt: Date.now() + 72 * 3600e3, status: "open" },
  { id: "g3", title: "E-카트 운행시간 연장 (23시 → 24시)", titleVi: "Kéo Dài Giờ Chạy Xe Điện (23h → 24h)", desc: "야간 이동 수요 반영", descVi: "Đáp ứng nhu cầu di chuyển ban đêm", yes: 2310, no: 420, quorum: 2000, endsAt: Date.now() - 24 * 3600e3, status: "passed" },
];

// CP 적립 규칙 (데모 수치)
const CP_RULES = [
  ["Verified 리뷰 작성", "Viết đánh giá đã xác minh", "+5 CP"],
  ["FIVE 공동구매 참여", "Tham gia mua chung FIVE", "+10 CP"],
  ["예약 이행 (노쇼 없음)", "Hoàn thành đặt lịch (không hủy)", "+3 CP"],
  ["스테이 예약 완료", "Hoàn tất đặt lưu trú", "+5 CP"],
  ["파트너 등록 승인", "Đăng ký đối tác được duyệt", "+50 CP"],
];

const SLOT_TIMES = ["11:00", "13:00", "14:00", "15:30", "17:00", "18:30"];

/* ─────────── APP ─────────── */

function App() {
  const [stage, setStage] = useState("lang"); // lang → intro → app
  const [mode, setMode] = useState("guest"); // guest(스테이 중심) | local(커머스 중심) — 화면 구성
  const [uiLang, setUiLang] = useState("ko"); // 화면 언어 — 모드와 독립
  const lang = uiLang;
  const t = T[lang];

  const [tab, setTab] = useState("home");
  const [sub, setSub] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [zoneIdx, setZoneIdx] = useState(0);
  const zone = ZONES[zoneIdx];
  const [zonePick, setZonePick] = useState(false);

  const [points, setPoints] = useState(2450);
  const [cp, setCp] = useState(120);
  const [txs, setTxs] = useState([
    { id: "t1", label: "Salon 결제 적립", labelVi: "Tích điểm thanh toán Salon", amount: +38, when: "8/9" },
    { id: "t2", label: "주문 적립", labelVi: "Tích điểm đơn hàng", amount: +62, when: "8/7" },
  ]);
  const [cpLog, setCpLog] = useState([
    { id: "c1", label: "Verified 리뷰 작성", labelVi: "Viết đánh giá đã xác minh", amount: +5, when: "8/8" },
    { id: "c2", label: "FIVE 공동구매 참여", labelVi: "Tham gia mua chung FIVE", amount: +10, when: "8/5" },
    { id: "c3", label: "가입 웰컴 기여", labelVi: "Đóng góp chào mừng thành viên mới", amount: +105, when: "7/30" },
  ]);

  const [bookings, setBookings] = useState([]);
  const [stays, setStays] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [rooms, setRooms] = useState(initialRooms);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [proposals, setProposals] = useState(initialProposals);
  const [myVotes, setMyVotes] = useState({});
  const [likes, setLikes] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [chat, setChat] = useState(null);

  // Habit 상태 — 걷기는 헬스 데이터 연동(검증형), 나머지는 셀프 체크(소액 HRP·일일 상한)
  const [steps, setSteps] = useState(3200);
  const [walkClaimed, setWalkClaimed] = useState(false);
  const [water, setWater] = useState(3);
  const [waterClaimed, setWaterClaimed] = useState(false);
  const [habitChecks, setHabitChecks] = useState({ run: false, mask: false, meditate: false });
  const streak = 7; // 데모: 연속 달성일
  const [partnerActive, setPartnerActive] = useState(false); // 파트너 승인 여부 (데모)

  const showToast = (x) => { setToast(x); setTimeout(() => setToast(null), 2200); };
  const addPoints = (amount, label) => { setPoints((p) => p + amount); setTxs((x) => [{ id: "t" + Date.now(), label, amount, when: L(lang, "오늘", "Hôm nay") }, ...x]); };
  const earnCp = (amount, label) => { setCp((p) => p + amount); setCpLog((x) => [{ id: "c" + Date.now(), label, amount, when: L(lang, "오늘", "Hôm nay") }, ...x]); };
  const goSub = (name, params = {}) => setSub({ name, ...params });
  const closeSub = () => setSub(null);
  const toggleLike = (id) => setLikes((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  const confirmBooking = (b) => {
    setBookings((prev) => [b, ...prev]);
    addPoints(b.point, L(lang, `예약 적립 (${b.name})`, `Tích điểm đặt lịch (${b.name})`));
    earnCp(3, L(lang, "예약 이행 (노쇼 없음)", "Hoàn thành đặt lịch (không hủy)"));
    showToast(L(lang, `예약 완료 · +${b.point} HRP · +3CP`, `Đặt lịch thành công · +${b.point} HRP · +3CP`));
  };
  const confirmStay = (s) => {
    setStays((prev) => [s, ...prev]);
    addPoints(s.point, L(lang, `스테이 예약 적립 (${s.name})`, `Tích điểm đặt lưu trú (${s.name})`));
    earnCp(5, L(lang, "스테이 예약 완료", "Hoàn tất đặt lưu trú"));
    showToast(L(lang, `스테이 예약 완료 · +${s.point} HRP · +5CP`, `Đặt lưu trú thành công · +${s.point} HRP · +5CP`));
  };
  const placeOrder = (items, total, pt) => {
    setOrders((o) => [{ id: "o" + Date.now(), items, total, when: L(lang, "오늘", "Hôm nay"), status: L(lang, "배송 준비", "Đang chuẩn bị giao") }, ...o]);
    setCart([]);
    addPoints(pt, L(lang, "주문 적립", "Tích điểm đơn hàng"));
    showToast(L(lang, `주문 완료 · +${pt} HRP`, `Đặt hàng thành công · +${pt} HRP`));
  };
  const joinRoom = (room) => {
    setRooms((rs) => rs.map((r) => (r.id === room.id ? { ...r, joined: r.joined + 1 } : r)));
    setJoinedRooms((j) => [...j, room.id]);
    const tier = FIVE_TIERS[room.tier];
    const pname = lang === "ko" ? room.product : room.productVi;
    addPoints(tier.hrp, L(lang, `공동구매 참여 적립 (${pname})`, `Tích điểm mua chung (${pname})`));
    earnCp(10, L(lang, "FIVE 공동구매 참여", "Tham gia mua chung FIVE"));
    showToast(L(lang, `참여 완료 · +${tier.hrp} HRP · +10CP`, `Tham gia thành công · +${tier.hrp} HRP · +10CP`));
  };
  const castVote = (propId, side) => {
    if (myVotes[propId]) return;
    setProposals((ps) => ps.map((p) => (p.id === propId ? { ...p, [side]: p[side] + cp } : p)));
    setMyVotes((v) => ({ ...v, [propId]: side }));
    showToast(L(lang, `투표 완료 · ${cp} CP 반영`, `Bỏ phiếu thành công · ${cp} CP đã ghi nhận`));
  };

  // Habit 핸들러
  const syncSteps = () => {
    const gained = 1200 + Math.floor(Math.random() * 900);
    setSteps((s) => {
      const next = s + gained;
      if (next >= 10000 && !walkClaimed) {
        setWalkClaimed(true);
        addPoints(10, L(lang, "습관 · 걷기 10,000보 달성", "Thói quen · Đạt 10.000 bước"));
        earnCp(2, L(lang, "걷기 목표 달성 (헬스 데이터 검증)", "Đạt mục tiêu đi bộ (xác minh dữ liệu sức khỏe)"));
        showToast(L(lang, "10,000보 달성! +10 HRP · +2CP", "Đạt 10.000 bước! +10 HRP · +2CP"));
      } else {
        showToast(L(lang, `걸음 동기화 · +${gained.toLocaleString()}보`, `Đồng bộ bước chân · +${gained.toLocaleString()} bước`));
      }
      return next;
    });
  };
  const drinkWater = () => {
    setWater((w) => {
      const next = Math.min(8, w + 1);
      if (next === 8 && !waterClaimed) {
        setWaterClaimed(true);
        addPoints(5, L(lang, "습관 · 물 8잔 완료", "Thói quen · Uống đủ 8 ly nước"));
        showToast(L(lang, "물 8잔 완료! +5 HRP", "Hoàn thành 8 ly nước! +5 HRP"));
      }
      return next;
    });
  };
  const toggleHabit = (key, labelKo, labelVi) => {
    setHabitChecks((h) => {
      if (h[key]) return h; // 하루 1회, 해제 불가 (어뷰징 방지)
      addPoints(5, L(lang, `습관 · ${labelKo} 완료`, `Thói quen · Hoàn thành ${labelVi}`));
      showToast(L(lang, `${labelKo} 완료! +5 HRP`, `Hoàn thành ${labelVi}! +5 HRP`));
      return { ...h, [key]: true };
    });
  };
  const habitDone = (walkClaimed ? 1 : 0) + (water >= 8 ? 1 : 0) + Object.values(habitChecks).filter(Boolean).length;

  const currentChat = chat ?? [{ from: "ai", type: "text", text: t.aiIntro }];
  const setChatSafe = (updater) => setChat(typeof updater === "function" ? updater(currentChat) : updater);

  const shared = {
    goSub, closeSub, showToast, mode, setMode, lang, setUiLang, t,
    points, cp, txs, cpLog, addPoints, earnCp,
    bookings, confirmBooking, stays, confirmStay, orders, cart, setCart, placeOrder,
    rooms, joinedRooms, joinRoom, coupons, setCoupons,
    proposals, myVotes, castVote,
    likes, toggleLike, checkedIn, setCheckedIn, zone, setZonePick, setAiOpen, setTab,
    chat: currentChat, setChat: setChatSafe,
    steps, syncSteps, walkClaimed, water, drinkWater, habitChecks, toggleHabit, streak, habitDone,
    partnerActive, setPartnerActive,
  };

  const screen = useMemo(() => {
    if (sub?.name === "venue") return <VenueScreen venueId={sub.venueId} {...shared} />;
    if (sub?.name === "book") return <BookScreen venueId={sub.venueId} serviceId={sub.serviceId} {...shared} />;
    if (sub?.name === "staydetail") return <StayDetailScreen stayId={sub.stayId} {...shared} />;
    if (sub?.name === "staybook") return <StayBookScreen stayId={sub.stayId} {...shared} />;
    if (sub?.name === "product") return <ProductScreen productId={sub.productId} {...shared} />;
    if (sub?.name === "cart") return <CartScreen {...shared} />;
    if (sub?.name === "cat") return <CategoryScreen cat={sub.cat} {...shared} />;
    if (sub?.name === "partner") return <PartnerScreen {...shared} />;
    if (sub?.name === "mybiz") return <MyBusinessScreen {...shared} />;
    if (sub?.name === "residence") return <ResidenceScreen {...shared} />;
    if (sub?.name === "pointlog") return <PointLogScreen {...shared} />;
    if (sub?.name === "cplog") return <CpLogScreen {...shared} />;
    if (sub?.name === "vote") return <VoteScreen {...shared} />;
    if (sub?.name === "skinprofile") return <SkinProfileScreen {...shared} />;
    if (tab === "home") return <HomeTab {...shared} />;
    if (tab === "living") return <LivingTab {...shared} />;
    if (tab === "salon") return <SalonTab {...shared} />;
    if (tab === "habit") return <HabitTab {...shared} />;
    if (tab === "stay") return <StayTab {...shared} />;
    if (tab === "booking") return <BookingTab {...shared} />;
    if (tab === "order") return <OrderTab {...shared} />;
    if (tab === "wallet") return <WalletTab {...shared} />;
    if (tab === "my") return <MyTab {...shared} />;
  }, [tab, sub, points, cp, bookings, stays, orders, cart, rooms, joinedRooms, coupons, proposals, myVotes, likes, checkedIn, zone, chat, mode, steps, water, habitChecks, walkClaimed, waterClaimed, uiLang, partnerActive]);

  if (stage === "lang") return (
    <div style={S.page}><div style={S.phone}>
      <LangSelect onPick={(l) => { setUiLang(l); setChat(null); setStage("intro"); }} />
    </div></div>
  );
  if (stage === "intro") return (
    <div style={S.page}><div style={S.phone}><Onboarding lang={lang} onEnter={() => setStage("zone")} /></div></div>
  );
  if (stage === "zone") return (
    <div style={S.page}><div style={S.phone}>
      <ZoneSelectScreen lang={lang} zoneIdx={zoneIdx} setZoneIdx={setZoneIdx} onDone={() => setStage("app")} />
    </div></div>
  );

  return (
    <div style={S.page}>
      <div style={S.phone}>
        {screen}
        <BottomNav mode={mode} t={t} tab={tab} setTab={(x) => { setSub(null); setTab(x); }} cartCount={cart.length} />
        {aiOpen && <AISheet {...shared} onClose={() => setAiOpen(false)} />}
        {zonePick && (
          <Modal title={L(lang, "단지 생활권 변경", "Đổi khu dân cư")} onClose={() => setZonePick(false)}>
            {ZONES.map((z, i) => (
              <button key={z.ko} style={{ ...S.zoneOption, borderColor: i === zoneIdx ? C.green : C.line }} onClick={() => { setZoneIdx(i); setZonePick(false); }}>
                <MapPin size={16} color={i === zoneIdx ? C.green : C.muted} />
                <span style={{ flex: 1, textAlign: "left", fontWeight: i === zoneIdx ? 700 : 500 }}>{zoneName(z, lang)}</span>
                {i === zoneIdx && <Check size={16} color={C.green} />}
              </button>
            ))}
          </Modal>
        )}
        {toast && <div style={S.toast}><Check size={15} /> {toast}</div>}
        {!aiOpen && <button style={S.aiFab} onClick={() => setAiOpen(true)}><Sparkles size={20} color={C.green} /></button>}
      </div>
    </div>
  );
}

/* ─────────── LANG SELECT + ONBOARDING ─────────── */

function LangSelect({ onPick }) {
  return (
    <div style={{ ...S.onboard, justifyContent: "center", gap: 0 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...S.brandGold, fontSize: 40 }}>M4U</div>
        <div style={{ ...S.brandSub, fontSize: 14, letterSpacing: 6 }}>LIVING</div>
        <div style={{ color: "rgba(255,255,255,.8)", fontSize: 13.5, marginTop: 26 }}>
          언어를 선택해 주세요<br /><span style={{ opacity: 0.7 }}>Vui lòng chọn ngôn ngữ</span>
        </div>
      </div>
      <div style={{ padding: "30px 28px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        <button style={S.langBtn} onClick={() => onPick("ko")}>
          <span style={{ fontSize: 22 }}>🇰🇷</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <b style={{ fontSize: 15 }}>한국어</b>
            <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>화면 언어 · 마이 탭에서 언제든 변경</div>
          </div>
          <ChevronRight size={17} />
        </button>
        <button style={S.langBtn} onClick={() => onPick("vi")}>
          <span style={{ fontSize: 22 }}>🇻🇳</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <b style={{ fontSize: 15 }}>Tiếng Việt</b>
            <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>Ngôn ngữ hiển thị · Đổi bất cứ lúc nào trong "Của tôi"</div>
          </div>
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

function ZoneSelectScreen({ lang, zoneIdx, setZoneIdx, onDone }) {
  return (
    <div style={{ ...S.onboard, justifyContent: "center" }}>
      <div style={{ padding: "0 26px" }}>
        <div style={{ ...S.smallGold, fontSize: 11 }}>MY ZONE</div>
        <div style={{ color: "white", fontSize: 21, fontWeight: 800, marginTop: 6, lineHeight: 1.4 }}>
          {L(lang, <>지금 생활하는 지역을<br />선택해 주세요</>, <>Chọn khu vực bạn<br />đang sinh sống</>)}
        </div>
        <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>
          {L(lang, "식당 · 살롱 · 이동 · 습관 정보가 이 지역 기준으로 구성됩니다.", "Ẩm thực · salon · di chuyển · thói quen sẽ hiển thị theo khu vực này.")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          {ZONES.map((z, i) => (
            <button key={z.ko} style={{ ...S.langBtn, borderColor: zoneIdx === i ? C.gold : "rgba(198,161,91,.4)", background: zoneIdx === i ? "rgba(198,161,91,.16)" : "rgba(255,255,255,.07)" }} onClick={() => setZoneIdx(i)}>
              <MapPin size={17} color={zoneIdx === i ? C.gold : "rgba(255,255,255,.6)"} />
              <div style={{ flex: 1, textAlign: "left" }}>
                <b style={{ fontSize: 14.5 }}>{zoneName(z, lang)}</b>
                <div style={{ fontSize: 10.5, opacity: 0.65, marginTop: 2 }}>Ho Chi Minh, Vietnam</div>
              </div>
              {zoneIdx === i && <Check size={16} color={C.gold} />}
            </button>
          ))}
        </div>
        <button style={{ ...S.goldButton, marginTop: 26 }} onClick={onDone}>
          {L(lang, "이 지역에서 시작하기", "Bắt đầu tại khu vực này")}
        </button>
        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 10.5, textAlign: "center", marginTop: 12 }}>
          {L(lang, "마이 탭에서 언제든 변경할 수 있어요", "Có thể đổi bất cứ lúc nào trong tab Của tôi")}
        </div>
      </div>
    </div>
  );
}

function Onboarding({ lang, onEnter }) {
  const ko = lang === "ko";
  return (
    <div style={S.onboard}>
      <div style={S.archOuter}><div style={S.archInner} /></div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <div style={{ ...S.brandGold, fontSize: 40 }}>M4U</div>
        <div style={{ ...S.brandSub, fontSize: 14, letterSpacing: 6 }}>LIVING</div>
        <div style={S.onboardCopy}>
          {ko ? <>우리 단지의 모든 생활,<br />M4U Living으로 연결됩니다</> : <>Mọi tiện ích trong khu của bạn,<br />kết nối qua M4U Living</>}
        </div>
      </div>
      <div style={S.onboardIcons}>
        {(ko
          ? [["🏠", "스테이 예약", "레지던스 · 리빙패스"], ["🗓", "예약·주문·결제", "간편하게 한 번에"], ["⭐", "신뢰할 수 있는", "리뷰와 혜택"]]
          : [["📍", "Khu dân cư", "Cửa hàng & dịch vụ"], ["🗓", "Đặt & thanh toán", "Nhanh gọn một chạm"], ["⭐", "Đánh giá", "Tin cậy & ưu đãi"]]
        ).map(([e, a, b]) => (
          <div key={a} style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 22 }}>{e}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, color: C.goldSoft }}>{a}</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.55)", marginTop: 2 }}>{b}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 24px 40px" }}>
        <button style={S.goldButton} onClick={onEnter}>{ko ? "로그인 / 회원가입" : "Đăng nhập / Đăng ký"}</button>
        <button style={S.ghostLink} onClick={onEnter}>{ko ? "둘러보기" : "Khám phá"}</button>
      </div>
    </div>
  );
}

/* ─────────── HOME ─────────── */

function HomeHeader({ lang, zone, setZonePick, setTab, points }) {
  return (
    <>
      <div style={S.homeHead}>
        <div>
          <div style={S.brand}>M4U</div>
          <div style={S.brandSub}>LIVING</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button style={S.zonePill} onClick={() => setZonePick(true)}>
            <MapPin size={13} color={C.green} /> {zoneName(zone, lang)} <ChevronDown size={13} />
          </button>
          <Bell size={20} color={C.text} />
        </div>
      </div>
      <div style={{ padding: "4px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800 }}>{L(lang, "좋은 아침이에요, 회원님!", "Chào buổi sáng!")}</div>
          <div style={{ ...S.muted, marginTop: 3 }}>{L(lang, "오늘도 편리하고 특별한 하루 되세요.", "Chúc bạn một ngày thuận tiện và đặc biệt.")}</div>
        </div>
        <button style={S.pointPill} onClick={() => setTab("wallet")}>
          <span style={S.pointM}>M</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>{points.toLocaleString()}</div>
            <div style={{ fontSize: 9, opacity: 0.8 }}>HRP</div>
          </div>
        </button>
      </div>
    </>
  );
}

function HabitWidget({ lang, steps, habitDone, setTab }) {
  return (
    <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setTab("habit")}>
      <div style={S.habitIcon}><Footprints size={19} color={C.green} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, `오늘의 걸음 ${steps.toLocaleString()}`, `${steps.toLocaleString()} bước hôm nay`)}</b>
          <span style={{ ...S.muted, fontSize: 10.5 }}>{L(lang, "목표 10,000", "Mục tiêu 10.000")}</span>
        </div>
        <div style={{ fontSize: 11, color: C.green2, fontWeight: 700, marginTop: 2 }}>{L(lang, `습관 ${habitDone}/5 완료 · 오늘 최대 +30 HRP`, `Đã hoàn thành ${habitDone}/5 · Tối đa +30 HRP hôm nay`)}</div>
      </div>
      <ChevronRight size={16} color={C.muted} />
    </div>
  );
}

function HomeTab(props) {
  const { goSub, setTab, setAiOpen, lang, points, stays } = props;
  const ranked = useMemo(() => rankVenues(VENUES), []);
  const myStay = stays[0];
  return (
    <div style={S.scroll}>
      <HomeHeader {...props} />
      <button style={S.searchBar} onClick={() => setAiOpen(true)}>
        <span style={{ color: C.muted, fontSize: 13.5 }}>{L(lang, "AI에게 무엇이든 말해보세요 — 예약 · 이동 · 맛집 · 통역", "Nói với AI — đặt chỗ · gọi xe · quán ăn · thông dịch")}</span>
        <Sparkles size={16} color={C.gold} />
      </button>

      {/* AI 개인화 카드 스택 — 통합 홈 (④) */}
      <HabitWidget {...props} />

      <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer", border: `1.5px solid ${C.gold}` }} onClick={() => setTab("wallet")}>
        <div style={{ ...S.habitIcon, background: "rgba(198,161,91,.14)" }}><Award size={19} color={C.gold} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "받을 수 있는 혜택", "Ưu đãi có thể nhận")} <span style={{ color: C.gold }}>+420 HRP</span></b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, `보유 ${points.toLocaleString()} HRP · FIVE 공동구매 3건 진행 중`, `Số dư ${points.toLocaleString()} HRP · 3 phòng mua chung FIVE đang mở`)}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setTab("habit")}>
        <div style={S.habitIcon}><span style={{ fontSize: 18 }}>🧘</span></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "저녁 명상 클래스 예약 가능", "Lớp thiền buổi tối còn chỗ")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "Mindful Garden · 도보 8분 · 완료 시 +20 HRP", "Mindful Garden · Đi bộ 8 phút · Hoàn thành +20 HRP")}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setTab("salon")}>
        <div style={S.habitIcon}><Scissors size={17} color={C.green} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "Salon 체험 추천", "Gợi ý trải nghiệm Salon")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "피부 분석 기반 · M4U Salon & Spa 첫 방문 -15%", "Theo hồ sơ làm đẹp · Lần đầu tại M4U Salon -15%")}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      {myStay && (
        <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center", cursor: "pointer", background: C.green, border: 0 }} onClick={() => goSub("residence")}>
          <div style={{ ...S.habitIcon, background: "rgba(198,161,91,.2)" }}><BedDouble size={18} color={C.gold} /></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5, color: "white" }}>{myStay.name}</b>
            <div style={{ fontSize: 11, marginTop: 2, color: "rgba(255,255,255,.75)" }}>{myStay.range} · {L(lang, "컨시어지 이용 가능", "Có thể dùng lễ tân")}</div>
          </div>
          <ChevronRight size={16} color={C.gold} />
        </div>
      )}

      <div style={S.sectionTitle2}>{L(lang, "LIVING 바로가기", "Truy cập nhanh LIVING")}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, padding: "0 12px" }}>
        {LIVING_CATS.map(([e, ko, vi, fn]) => (
          <button key={ko} style={S.catItem} onClick={() => fn(props)}>
            <div style={S.catCircle}>{e}</div>
            <div style={{ fontSize: 10, fontWeight: 600 }}>{L(lang, ko, vi)}</div>
          </button>
        ))}
      </div>

      <div style={S.rowBetween}>
        <div style={S.sectionTitle}>{L(lang, "MY ZONE 인기 서비스", "Dịch vụ nổi bật MY ZONE")}</div>
        <div style={{ ...S.muted, fontSize: 12 }} onClick={() => setTab("living")}>{L(lang, "전체보기 ›", "Xem tất cả ›")}</div>
      </div>
      <PopularRow ranked={ranked} {...props} />
      <TrustNote lang={lang} />
    </div>
  );
}

// LIVING 카테고리 — EAT · MOVE · SHOP · STAY · EXPERIENCE · BEAUTY
const LIVING_CATS = [
  ["🍜", "EAT", "EAT", (p) => p.goSub("cat", { cat: "맛집" })],
  ["🛺", "MOVE", "MOVE", (p) => p.goSub("cat", { cat: "이동·렌트" })],
  ["🛍", "SHOP", "SHOP", (p) => p.setTab("order")],
  ["🛏", "STAY", "STAY", (p) => p.setTab("stay")],
  ["🎨", "EXP", "EXP", (p) => p.goSub("cat", { cat: "생활·편의" })],
  ["💇", "BEAUTY", "BEAUTY", (p) => p.goSub("cat", { cat: "살롱·뷰티" })],
];

function LivingTab(props) {
  const { goSub, setTab, lang, t } = props;
  const ranked = useMemo(() => rankVenues(VENUES), []);
  const stay = STAYS[0];
  return (
    <div style={S.scroll}>
      <TabHead title="LIVING" right={<span style={{ ...S.muted, fontSize: 11 }}>{L(lang, "우리동네 생활 서비스", "Dịch vụ đời sống khu bạn")}</span>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "6px 18px 0" }}>
        {[
          ["🍜", "EAT", L(lang, "맛집 · 카페 · 배달", "Ẩm thực · Cà phê"), (p) => p.goSub("cat", { cat: "맛집" })],
          ["🛺", "MOVE", L(lang, "E-카트 · 셔틀", "Xe điện · Xe buýt"), (p) => p.goSub("cat", { cat: "이동·렌트" })],
          ["🛍", "SHOP", L(lang, "마트 · M4U 셀렉트", "Chợ · M4U Select"), (p) => p.setTab("order")],
          ["🛏", "STAY", L(lang, "레지던스 · 게스트 서비스", "Căn hộ · Dịch vụ khách"), (p) => p.setTab("stay")],
          ["🎨", "EXPERIENCE", L(lang, "클래스 · 지역 체험", "Lớp học · Trải nghiệm"), (p) => p.goSub("cat", { cat: "생활·편의" })],
          ["💇", "BEAUTY", L(lang, "살롱 · 스파 · 네일", "Salon · Spa · Nail"), (p) => p.setTab("salon")],
        ].map(([e, name, desc, fn]) => (
          <button key={name} style={{ ...S.card, border: `1px solid ${C.line}`, padding: "13px 8px", textAlign: "center", cursor: "pointer" }} onClick={() => fn(props)}>
            <div style={{ fontSize: 21 }}>{e}</div>
            <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 5 }}>{name}</div>
            <div style={{ ...S.muted, fontSize: 9, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
          </button>
        ))}
      </div>

      <div style={S.sectionTitle2}>{L(lang, "MY ZONE 랭킹 · Consumer First", "Xếp hạng MY ZONE · Consumer First")}</div>
      {ranked.map((v) => (
        <div key={v.id} style={S.listCard} onClick={() => goSub("venue", { venueId: v.id })}>
          <img src={v.img} alt="" style={S.listImg} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              {v.rank && <span style={{ ...S.pill, padding: "2px 7px", fontSize: 10 }}>{v.rank}</span>}
              {v.boost && <span style={S.boostBadge}><Rocket size={9} /> NEW</span>}
              <b style={{ fontSize: 13.5 }}>{venueName(v, lang)}</b>
            </div>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{catLabel(v.cat, lang)} · {L(lang, v.walk, v.walkVi)}</div>
            {!v.boost && <div style={{ fontSize: 11, marginTop: 2 }}>⭐ {v.rating} ({v.reviews}) · {L(lang, `재이용 ${v.rebook}%`, `Quay lại ${v.rebook}%`)}</div>}
          </div>
          <ChevronRight size={16} color={C.muted} />
        </div>
      ))}
      <TrustNote lang={lang} />

      <div style={S.sectionTitle2}>STAY</div>
      <div style={{ ...S.card, margin: "0 18px 20px", padding: 0, overflow: "hidden", cursor: "pointer" }} onClick={() => setTab("stay")}>
        <img src={stay.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
        <div style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b style={{ fontSize: 13.5 }}>{L(lang, "레지던스 & 게스트 서비스", "Căn hộ & dịch vụ khách")}</b>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "숙소 예약 · 청소 · 컨시어지 · 리빙패스", "Đặt phòng · Dọn dẹp · Lễ tân · Living Pass")}</div>
          </div>
          <ChevronRight size={16} color={C.muted} />
        </div>
      </div>
    </div>
  );
}

/* ─────────── SALON 탭 + 피부 분석(뷰티 프로필) ─────────── */

function SalonTab(props) {
  const { goSub, lang } = props;
  const v1 = VENUES.find((x) => x.id === "v1");
  return (
    <div style={S.scroll}>
      <TabHead title="SALON" right={<span style={{ ...S.muted, fontSize: 11 }}>{L(lang, "뷰티 & 케어 서비스", "Dịch vụ làm đẹp & chăm sóc")}</span>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "6px 18px 0" }}>
        {[
          ["💇", L(lang, "헤어", "Tóc"), "s1"],
          ["💅", L(lang, "네일", "Nail"), "s4"],
          ["🧴", L(lang, "스킨케어", "Da"), "s2"],
          ["💆", L(lang, "마사지", "Massage"), "s3"],
        ].map(([e, label, sid]) => (
          <button key={sid} style={S.quick} onClick={() => goSub("book", { venueId: "v1", serviceId: sid })}>
            <div style={{ fontSize: 20 }}>{e}</div>
            <div style={{ fontSize: 10.5, fontWeight: 700 }}>{label}</div>
          </button>
        ))}
      </div>

      <div style={{ ...S.card, margin: "12px 18px 0", border: `1.5px solid ${C.gold}`, cursor: "pointer" }} onClick={() => goSub("skinprofile")}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ ...S.habitIcon, background: "rgba(198,161,91,.14)" }}><Sparkles size={18} color={C.gold} /></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{L(lang, "피부 분석 · 뷰티 프로필 만들기", "Phân tích da · Tạo hồ sơ làm đẹp")}</b>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "3가지 질문 · AI가 맞는 케어와 살롱을 추천해요", "3 câu hỏi · AI gợi ý chăm sóc và salon phù hợp")}</div>
          </div>
          <ChevronRight size={16} color={C.muted} />
        </div>
      </div>

      <div style={S.sectionTitle2}>{L(lang, "AI 추천 살롱", "Salon do AI gợi ý")}</div>
      <div style={{ ...S.card, margin: "0 18px 10px", padding: 0, overflow: "hidden", cursor: "pointer" }} onClick={() => goSub("venue", { venueId: "v1" })}>
        <img src={v1.img} alt="" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
        <div style={{ padding: 13 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <b style={{ fontSize: 14 }}>{v1.name}</b>
            <span style={S.verifiedBadge}><BadgeCheck size={9} /> Verified</span>
          </div>
          <div style={{ fontSize: 11.5, marginTop: 4 }}>⭐ {v1.rating} ({v1.reviews}) · {L(lang, v1.walk, v1.walkVi)} · {L(lang, "첫 방문 -15%", "Lần đầu -15%")}</div>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 4 }}>{L(lang, "MY ZONE · 뷰티 프로필 · Verified Review 기반 추천", "Gợi ý theo MY ZONE · hồ sơ làm đẹp · Verified Review")}</div>
        </div>
      </div>

      <div style={S.sectionTitle2}>{L(lang, "최근 Verified Review", "Verified Review gần đây")}</div>
      {v1.reviewList.map((r, i) => (
        <div key={i} style={{ ...S.card, margin: "0 18px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b style={{ fontSize: 12.5 }}>{L(lang, r.who, r.whoVi)} <span style={S.verifiedBadge}><BadgeCheck size={9} /> {L(lang, "인증", "Đã xác minh")}</span></b>
            <span style={{ fontSize: 12 }}>⭐ {r.rate}</span>
          </div>
          <div style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.6 }}>{L(lang, r.text, r.textVi)}</div>
        </div>
      ))}
      <div style={{ ...S.muted, fontSize: 10.5, margin: "4px 18px 20px", lineHeight: 1.6 }}>
        {L(lang, "리뷰 작성은 실제 예약·결제 이용자만 가능하며, 성실한 작성에 +5CP가 지급됩니다.", "Chỉ khách đã đặt·thanh toán mới viết được đánh giá; đánh giá chi tiết nhận +5CP.")}
      </div>
    </div>
  );
}

const SKIN_QS = [
  { q: ["세안 후 피부 상태는 어떤가요?", "Sau khi rửa mặt, da bạn thế nào?"], opts: [["당김이 심해요", "Rất căng khô"], ["T존만 번들거려요", "Chỉ vùng chữ T bóng dầu"], ["전체적으로 번들거려요", "Bóng dầu toàn mặt"]] },
  { q: ["트러블은 얼마나 자주 생기나요?", "Bạn có hay nổi mụn không?"], opts: [["거의 없어요", "Hầu như không"], ["가끔 생겨요", "Thỉnh thoảng"], ["자주 생겨요", "Thường xuyên"]] },
  { q: ["지금 가장 관심 있는 케어는?", "Bạn quan tâm chăm sóc gì nhất?"], opts: [["수분 · 진정", "Cấp ẩm · Dịu da"], ["미백 · 톤업", "Sáng da"], ["탄력 · 안티에이징", "Săn chắc · Chống lão hóa"]] },
];

function SkinProfileScreen({ closeSub, goSub, lang }) {
  const [answers, setAnswers] = useState([null, null, null]);
  const done = answers.every((a) => a !== null);
  const pick = (qi, oi) => setAnswers((a) => a.map((x, i) => (i === qi ? oi : x)));
  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "피부 분석 · 뷰티 프로필", "Phân tích da · Hồ sơ làm đẹp")} onBack={closeSub} />
      <div style={{ ...S.muted, fontSize: 11, margin: "6px 18px 0", lineHeight: 1.6 }}>
        {L(lang, "의료 진단이 아닌, 서비스 추천을 위한 뷰티 프로필입니다.", "Đây là hồ sơ làm đẹp để gợi ý dịch vụ, không phải chẩn đoán y tế.")}
      </div>
      {SKIN_QS.map((item, qi) => (
        <div key={qi} style={{ ...S.card, margin: "12px 18px 0" }}>
          <b style={{ fontSize: 13.5 }}>{qi + 1}. {L(lang, item.q[0], item.q[1])}</b>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 10 }}>
            {item.opts.map((o, oi) => (
              <button key={oi} style={{ ...S.chipBtn, textAlign: "left", background: answers[qi] === oi ? C.green : C.ivory, color: answers[qi] === oi ? "white" : C.text }} onClick={() => pick(qi, oi)}>
                {L(lang, o[0], o[1])}
              </button>
            ))}
          </div>
        </div>
      ))}
      {done && (
        <>
          <div style={{ ...S.card, margin: "14px 18px 0", border: `1.5px solid ${C.gold}` }}>
            <div style={S.smallGoldDark}>{L(lang, "나의 뷰티 프로필", "Hồ sơ làm đẹp của tôi")}</div>
            <b style={{ fontSize: 16 }}>{L(lang, "복합성 경향 · 수분 보강 필요", "Da hỗn hợp · Cần bổ sung độ ẩm")}</b>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              {[[L(lang, "수분", "Ẩm"), 62], [L(lang, "유분 밸런스", "Dầu"), 48], [L(lang, "진정 필요도", "Dịu da"), 71]].map(([k, val]) => (
                <div key={k} style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5 }}><span>{k}</span><b>{val}%</b></div>
                  <div style={S.progressBg}><div style={{ ...S.progressBar, width: `${val}%`, background: C.green2 }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div style={S.sectionTitle2}>{L(lang, "프로필 기반 추천", "Gợi ý theo hồ sơ")}</div>
          <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => goSub("book", { venueId: "v1", serviceId: "s2" })}>
            <img src={IMG.spa} alt="" style={{ width: 50, height: 50, borderRadius: 12, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>{L(lang, "수분 진정 케어 예약", "Đặt chăm sóc cấp ẩm dịu da")}</b>
              <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>M4U Salon & Spa · {L(lang, "첫 방문 -15%", "Lần đầu -15%")}</div>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </div>
          <div style={{ ...S.card, margin: "0 18px 20px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => goSub("product", { productId: "p1" })}>
            <img src={IMG.skin1} alt="" style={{ width: 50, height: 50, borderRadius: 12, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>{L(lang, "어성초 수딩 스킨케어 세트", "Bộ chăm sóc dịu nhẹ diếp cá")}</b>
              <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "수분·진정 프로필 맞춤 · -24%", "Phù hợp hồ sơ cấp ẩm · -24%")}</div>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </div>
        </>
      )}
    </div>
  );
}

function PopularRow({ ranked, goSub, likes, toggleLike, lang }) {
  return (
    <div style={S.hScroll}>
      {ranked.map((v) => (
        <div key={v.id} style={S.popCard} onClick={() => goSub("venue", { venueId: v.id })}>
          <div style={{ position: "relative" }}>
            <img src={v.img} alt="" style={S.popImg} />
            {v.rank && <div style={S.rankTag}>{L(lang, `${v.rank}위`, `#${v.rank}`)}</div>}
            {v.boost && <div style={{ ...S.rankTag, background: C.gold }}><Rocket size={9} /> NEW</div>}
            <button style={S.heartBtn} onClick={(e) => { e.stopPropagation(); toggleLike(v.id); }}>
              <Heart size={14} color={likes.includes(v.id) ? C.red : "white"} fill={likes.includes(v.id) ? C.red : "none"} />
            </button>
          </div>
          <div style={{ padding: "10px 4px 4px" }}>
            <div style={{ fontSize: 13.5, fontWeight: 800 }}>{venueName(v, lang)}</div>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{catLabel(v.cat, lang)}</div>
            <div style={{ fontSize: 11.5, marginTop: 3 }}>
              <Star size={11} fill={C.gold} color={C.gold} /> {v.rating} ({v.reviews}) · {L(lang, v.walk, v.walkVi)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrustNote({ lang }) {
  return (
    <div style={S.trustCard}>
      <ShieldCheck size={18} color={C.green2} />
      <div style={{ fontSize: 11, lineHeight: 1.6 }}>
        {L(lang, "순위는 ", "Xếp hạng dựa trên ")}
        <b>Consumer First Ranking</b>
        {L(
          lang,
          " — 별점·재이용·이행률·취소율·응답·소비자 Reward로만 계산되며 광고비는 반영되지 않습니다.",
          " — chỉ tính theo điểm đánh giá, tỷ lệ quay lại, tỷ lệ hoàn thành, tỷ lệ hủy, tốc độ phản hồi và Reward của khách hàng. Chi phí quảng cáo không được tính."
        )}
      </div>
    </div>
  );
}

function rankVenues(list) {
  const score = (v) => v.rating * 20 + v.rebook * 0.5 + v.fulfill * 0.3 - v.cancel * 2;
  const main = list.filter((v) => !v.boost).sort((a, b) => score(b) - score(a)).map((v, i) => ({ ...v, rank: i + 1 }));
  const boosted = list.filter((v) => v.boost).map((v) => ({ ...v, rank: null }));
  const out = [...main];
  out.splice(Math.min(2, out.length), 0, ...boosted);
  return out;
}

/* ─────────── STAY (게스트 모드) ─────────── */

function StayTab({ goSub, stays, checkedIn, lang, t }) {
  return (
    <div style={S.scroll}>
      <TabHead title={t.stay} right={<KeyRound size={19} color={C.gold} />} />
      {stays.length > 0 && (
        <>
          <div style={S.sectionTitle2}>{L(lang, "나의 스테이", "Lưu trú của tôi")}</div>
          {stays.map((s) => (
            <div key={s.id} style={{ ...S.card, margin: "0 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b style={{ fontSize: 14 }}>{s.name}</b>
                <div style={{ ...S.muted, fontSize: 11.5, marginTop: 3 }}>{s.range} · {L(lang, `${s.nights}박`, `${s.nights} đêm`)} · {vnd(s.total)}</div>
              </div>
              <span style={S.pill}>{L(lang, "확정", "Đã xác nhận")}</span>
            </div>
          ))}
        </>
      )}
      <div style={{ ...S.card, margin: "12px 18px 4px" }}>
        <b style={{ fontSize: 14 }}>LIVING PASS</b>
        <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{L(lang, "연간 이용권 30일 · 스테이 예약 시 차감 가능", "Gói năm 30 ngày · Có thể dùng khi đặt lưu trú")}</div>
        <div style={{ display: "flex", gap: 12, fontSize: 11.5, marginTop: 12 }}>
          <span>{L(lang, "사용 14일", "Đã dùng 14 ngày")}</span><span>{L(lang, "남음 16일", "Còn lại 16 ngày")}</span><b style={{ marginLeft: "auto" }}>47%</b>
        </div>
        <div style={S.progressBg}><div style={{ ...S.progressBar, width: "47%", background: C.green2 }} /></div>
      </div>
      <div style={S.sectionTitle2}>{L(lang, "레지던스 찾기", "Tìm căn hộ dịch vụ")}</div>
      {STAYS.map((r) => (
        <div key={r.id} style={{ ...S.card, margin: "0 18px 12px", padding: 0, overflow: "hidden", cursor: "pointer" }} onClick={() => goSub("staydetail", { stayId: r.id })}>
          <img src={r.img} alt="" style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <b style={{ fontSize: 14.5 }}>{r.name}</b>
                <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{L(lang, r.size, r.sizeVi)}</div>
              </div>
              <span style={{ fontSize: 12 }}>⭐ {r.rating} ({r.reviews})</span>
            </div>
            <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <b style={{ fontSize: 15 }}>{vnd(r.price)} <span style={{ ...S.muted, fontWeight: 500, fontSize: 11 }}>{L(lang, "/ 박", "/ đêm")}</span></b>
              <span style={{ color: C.green2, fontSize: 11, fontWeight: 800 }}>{L(lang, `+${Math.round(r.price / 10000)} HRP 적립`, `+${Math.round(r.price / 10000)} HRP`)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StayDetailScreen({ stayId, closeSub, goSub, lang }) {
  const r = STAYS.find((x) => x.id === stayId);
  return (
    <div style={{ ...S.scroll, paddingBottom: 90 }}>
      <div style={{ position: "relative" }}>
        <img src={r.img} alt="" style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
        <button style={{ ...S.circleBtn, left: 14 }} onClick={closeSub}><ArrowLeft size={18} /></button>
        <button style={{ ...S.circleBtn, right: 14 }}><Share2 size={16} /></button>
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <b style={{ fontSize: 18 }}>{r.name}</b>
        <div style={{ ...S.muted, fontSize: 12, marginTop: 3 }}>{L(lang, r.size, r.sizeVi)} · ⭐ {r.rating} ({r.reviews})</div>
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7 }}>{L(lang, r.desc, r.descVi)}</div>
      </div>
      <div style={S.featureRow}>
        {r.amen.map(([e, ko, vi]) => (
          <div key={ko} style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 19 }}>{e}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{L(lang, ko, vi)}</div>
          </div>
        ))}
      </div>
      <div style={{ ...S.card, margin: "14px 18px" }}>
        <Row2 a={L(lang, "1박 요금", "Giá 1 đêm")} b={vnd(r.price)} strong />
        <Row2 a={L(lang, "HRP 적립", "Tích điểm HRP")} b={L(lang, `+${Math.round(r.price / 10000)} HRP / 박`, `+${Math.round(r.price / 10000)} HRP / đêm`)} />
        <Row2 a={L(lang, "청소 서비스", "Dịch vụ dọn phòng")} b={L(lang, "주 2회 포함", "2 lần/tuần, đã bao gồm")} />
        <Row2 a={L(lang, "취소 정책", "Chính sách hủy")} b={L(lang, "체크인 3일 전 무료", "Miễn phí trước 3 ngày nhận phòng")} />
      </div>
      <div style={S.fixedCta}>
        <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => goSub("staybook", { stayId: r.id })}>
          {L(lang, "날짜 선택하고 예약하기", "Chọn ngày và đặt chỗ")}
        </button>
      </div>
    </div>
  );
}

function StayBookScreen({ stayId, closeSub, confirmStay, lang }) {
  const r = STAYS.find((x) => x.id === stayId);
  const days = useMemo(() => Array.from({ length: 10 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + 1 + i); return d; }), []);
  const [inIdx, setInIdx] = useState(0);
  const [nights, setNights] = useState(3);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [done, setDone] = useState(false);

  const inDate = days[inIdx];
  const outDate = new Date(inDate); outDate.setDate(outDate.getDate() + nights);
  const range = `${fmtDate(inDate, lang)} → ${fmtDate(outDate, lang)}`;
  const total = r.price * nights;
  const point = Math.round(total / 10000);
  const nightsLabel = L(lang, `${nights}박`, `${nights} đêm`);

  const doConfirm = () => {
    confirmStay({ id: "st" + Date.now(), name: r.name, range, nights, total, point });
    setConfirmOpen(false); setDone(true);
  };

  if (done) return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "예약 완료", "Đặt chỗ thành công")} onBack={closeSub} />
      <div style={{ ...S.card, textAlign: "center", padding: 28, margin: "24px 18px" }}>
        <div style={S.doneCircle}><Check size={30} color="white" /></div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 16 }}>{r.name}</div>
        <div style={{ ...S.muted, marginTop: 5 }}>{range} · {nightsLabel}</div>
        <div style={{ color: C.green2, fontWeight: 800, fontSize: 13, marginTop: 10 }}>{L(lang, `+${point} HRP · +5CP 적립 완료`, `+${point} HRP · +5CP đã tích điểm`)}</div>
        <div style={{ ...S.muted, fontSize: 11.5, marginTop: 10 }}>{L(lang, "체크인 당일 QR로 셀프 체크인하세요.", "Vào ngày nhận phòng, hãy tự check-in bằng mã QR.")}</div>
        <button style={{ ...S.greenBtn, width: "100%", marginTop: 20 }} onClick={closeSub}>{L(lang, "확인", "Xác nhận")}</button>
      </div>
    </div>
  );

  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "스테이 예약", "Đặt lưu trú")} onBack={closeSub} />
      <div style={{ ...S.card, margin: "12px 18px", display: "flex", gap: 12 }}>
        <img src={r.img} alt="" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
        <div>
          <b style={{ fontSize: 14 }}>{r.name}</b>
          <div style={{ ...S.muted, fontSize: 11.5, marginTop: 3 }}>{L(lang, r.size, r.sizeVi)}</div>
          <b style={{ fontSize: 13.5, marginTop: 4, display: "block" }}>{vnd(r.price)} {L(lang, "/ 박", "/ đêm")}</b>
        </div>
      </div>

      <div style={S.sectionTitle2}>{L(lang, "체크인 날짜", "Ngày nhận phòng")}</div>
      <div style={S.hScrollTight}>
        {days.map((d, i) => (
          <button key={i} style={{ ...S.chipBtn, minWidth: 76, background: inIdx === i ? C.green : C.ivory, color: inIdx === i ? "white" : C.text }} onClick={() => setInIdx(i)}>
            {fmtDate(d, lang)}
          </button>
        ))}
      </div>

      <div style={S.sectionTitle2}>{L(lang, "숙박 일수", "Số đêm ở")}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 18px" }}>
        <div style={{ ...S.qtyBox, padding: "8px 14px" }}>
          <button style={S.qtyBtn} onClick={() => setNights((n) => Math.max(1, n - 1))}><Minus size={14} /></button>
          <b style={{ fontSize: 16, minWidth: 40, textAlign: "center" }}>{nightsLabel}</b>
          <button style={S.qtyBtn} onClick={() => setNights((n) => Math.min(30, n + 1))}><Plus size={14} /></button>
        </div>
        <div style={{ ...S.muted, fontSize: 12 }}>{range}</div>
      </div>

      <div style={{ ...S.card, margin: "16px 18px" }}>
        <Row2 a={`${vnd(r.price)} × ${nightsLabel}`} b={vnd(total)} />
        <Row2 a={L(lang, "청소·관리비", "Phí dọn phòng & quản lý")} b={L(lang, "포함", "Đã bao gồm")} />
        <Row2 a={L(lang, "HRP 적립", "Tích điểm HRP")} b={`+${point} HRP · +5CP`} />
        <Row2 a={L(lang, "총 결제 금액", "Tổng thanh toán")} b={vnd(total)} strong />
      </div>
      <div style={{ padding: "0 18px" }}>
        <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => setConfirmOpen(true)}>{L(lang, `${vnd(total)} 예약하기`, `Đặt chỗ · ${vnd(total)}`)}</button>
      </div>

      {confirmOpen && (
        <Modal title={L(lang, "스테이 예약 확인", "Xác nhận đặt lưu trú")} onClose={() => setConfirmOpen(false)}>
          <Row2 a={L(lang, "레지던스", "Căn hộ")} b={r.name} />
          <Row2 a={L(lang, "기간", "Thời gian")} b={`${range} (${nightsLabel})`} />
          <Row2 a={L(lang, "총 결제", "Tổng thanh toán")} b={vnd(total)} strong />
          <div style={{ ...S.muted, fontSize: 11, margin: "10px 0 14px" }}>{L(lang, "체크인 3일 전까지 무료 취소됩니다.", "Miễn phí hủy trước 3 ngày nhận phòng.")}</div>
          <button style={{ ...S.greenBtn, width: "100%" }} onClick={doConfirm}>{L(lang, "예약 확정", "Xác nhận đặt chỗ")}</button>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── CATEGORY / VENUE / BOOK (공통) ─────────── */

function CategoryScreen({ cat, closeSub, goSub, lang }) {
  const list = useMemo(() => rankVenues(VENUES).filter((v) => cat === "전체" || v.cat === cat), [cat]);
  const isMove = cat === "이동·렌트";
  return (
    <div style={S.scroll}>
      <SubHead title={catLabel(cat, lang)} onBack={closeSub} />
      {isMove ? (
        <div style={{ padding: 16 }}>
          <div style={{ ...S.card, textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 52 }}>🛺</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 8 }}>{L(lang, "M4U E-카트 호출", "Gọi Xe Điện M4U")}</div>
            <div style={{ ...S.muted, marginTop: 4 }}>{L(lang, "단지 전역 · 06:00 - 23:00 · 기본요금 20,000 VND", "Toàn khu · 06:00 - 23:00 · Giá cơ bản 20.000 VND")}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {[L(lang, "지금 호출", "Gọi ngay"), L(lang, "시간 예약", "Đặt giờ")].map((x, i) => (
                <button key={x} style={{ ...S.greenBtn, flex: 1, background: i === 0 ? C.green : C.ivory, color: i === 0 ? "white" : C.text, border: i === 0 ? 0 : `1px solid ${C.line}` }}>{x}</button>
              ))}
            </div>
          </div>
        </div>
      ) : list.length === 0 ? (
        <div style={{ ...S.muted, textAlign: "center", padding: 40 }}>{L(lang, "이 카테고리의 입점 매장을 준비 중입니다.", "Đang chuẩn bị cửa hàng cho danh mục này.")}</div>
      ) : (
        list.map((v) => (
          <div key={v.id} style={S.listCard} onClick={() => goSub("venue", { venueId: v.id })}>
            <img src={v.img} alt="" style={S.listImg} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <b style={{ fontSize: 14 }}>{venueName(v, lang)}</b>
                {v.boost ? <span style={S.boostBadge}><Rocket size={9} /> NEW</span> : <span style={S.verifiedBadge}><BadgeCheck size={9} /> {v.verified}</span>}
              </div>
              <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{catLabel(v.cat, lang)} · {L(lang, v.walk, v.walkVi)}</div>
              {v.boost
                ? <div style={{ ...S.muted, fontSize: 11, marginTop: 3 }}>{L(lang, "신규 · 실이용 리뷰 수집 중", "Mới · Đang thu thập đánh giá thực tế")}</div>
                : <div style={{ fontSize: 11.5, marginTop: 3 }}>⭐ {v.rating} · {L(lang, `재이용 ${v.rebook}% · 이행 ${v.fulfill}%`, `Quay lại ${v.rebook}% · Hoàn thành ${v.fulfill}%`)}</div>}
            </div>
            <ChevronRight size={17} color={C.muted} />
          </div>
        ))
      )}
    </div>
  );
}

const VENUE_TABS = [["서비스", "Dịch vụ"], ["리뷰", "Đánh giá"], ["정보", "Thông tin"]];

function VenueScreen({ venueId, closeSub, goSub, likes, toggleLike, lang }) {
  const v = VENUES.find((x) => x.id === venueId);
  const [vt, setVt] = useState("서비스");
  if (!v) return null;
  const liked = likes.includes(v.id);
  return (
    <div style={{ ...S.scroll, paddingBottom: 90 }}>
      <div style={{ position: "relative" }}>
        <img src={v.img} alt="" style={{ width: "100%", height: 230, objectFit: "cover", display: "block" }} />
        <button style={{ ...S.circleBtn, left: 14 }} onClick={closeSub}><ArrowLeft size={18} /></button>
        <button style={{ ...S.circleBtn, right: 56 }} onClick={() => toggleLike(v.id)}>
          <Heart size={17} color={liked ? C.red : C.text} fill={liked ? C.red : "none"} />
        </button>
        <button style={{ ...S.circleBtn, right: 14 }}><Share2 size={16} /></button>
        <div style={S.logoCircle}>{v.logo}</div>
      </div>
      <div style={{ padding: "34px 18px 0" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 19, fontWeight: 800 }}>{venueName(v, lang)}</div>
          {v.boost ? <span style={S.boostBadge}><Rocket size={9} /> NEW</span> : <span style={S.verifiedBadge}><BadgeCheck size={9} /> Verified</span>}
        </div>
        <div style={{ ...S.muted, fontSize: 12, marginTop: 3 }}>{catLabel(v.cat, lang)}</div>
        <div style={{ fontSize: 12.5, marginTop: 6 }}>
          <Star size={12} fill={C.gold} color={C.gold} /> <b>{v.rating}</b> ({v.reviews}) · {L(lang, v.walk, v.walkVi)} · <span style={{ color: C.green2, fontWeight: 700 }}>{L(lang, v.open, v.openVi)}</span>
        </div>
      </div>
      <div style={S.featureRow}>
        {v.features.map(([e, ko, vi]) => (
          <div key={ko} style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: 19 }}>{e}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{L(lang, ko, vi)}</div>
          </div>
        ))}
      </div>
      <div style={S.tabRow}>
        {VENUE_TABS.map(([key, vi]) => {
          const label = L(lang, key, vi);
          const display = key === "리뷰" ? `${label} ${v.reviews}` : label;
          const active = vt === key;
          return (
            <button key={key} style={{ ...S.tabItem, borderBottom: active ? `2px solid ${C.green}` : "2px solid transparent", color: active ? C.green : C.muted }} onClick={() => setVt(key)}>
              {display}
            </button>
          );
        })}
      </div>
      {vt === "서비스" && (
        v.services.length === 0 ? (
          <div style={{ ...S.muted, textAlign: "center", padding: 30 }}>{L(lang, "이 매장은 방문·주문형 매장입니다.", "Cửa hàng này phục vụ tại chỗ hoặc theo đơn đặt hàng.")}</div>
        ) : (
          v.services.map((s) => (
            <div key={s.id} style={S.serviceCard}>
              <img src={s.img} alt="" style={S.serviceImg} />
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 13.5 }}>{L(lang, s.name, s.nameVi)}</b>
                <div style={{ ...S.muted, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{L(lang, s.desc, s.descVi)}</div>
                <div style={{ fontSize: 13, fontWeight: 800, marginTop: 5 }}>{vnd(s.price)}</div>
              </div>
              <button style={S.smallGreenBtn} onClick={() => goSub("book", { venueId: v.id, serviceId: s.id })}>{L(lang, "예약하기", "Đặt chỗ")}</button>
            </div>
          ))
        )
      )}
      {vt === "리뷰" && (
        <div style={{ padding: "4px 18px" }}>
          <div style={{ ...S.trustCard, margin: "10px 0 12px" }}>
            <BadgeCheck size={16} color={C.green2} />
            <div style={{ fontSize: 11, lineHeight: 1.55 }}>
              {L(lang, "실제 M4U 예약·결제 이용자의 ", "Chỉ hiển thị ")}
              <b>Verified Review</b>
              {L(lang, "만 표시됩니다. 작성 시 +5CP", " từ khách đã đặt·thanh toán qua M4U. Viết đánh giá +5CP")}
            </div>
          </div>
          {v.reviewList.map((r, i) => (
            <div key={i} style={{ ...S.card, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b style={{ fontSize: 12.5 }}>{L(lang, r.who, r.whoVi)} <span style={S.verifiedBadge}><BadgeCheck size={9} /> {L(lang, "인증", "Đã xác minh")}</span></b>
                <span style={{ fontSize: 12 }}>⭐ {r.rate}</span>
              </div>
              <div style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.6 }}>{L(lang, r.text, r.textVi)}</div>
            </div>
          ))}
        </div>
      )}
      {vt === "정보" && (
        <div style={{ padding: "10px 18px" }}>
          <div style={S.card}>
            <InfoRow icon={<MapPin size={14} color={C.gold} />} text={L(lang, v.address, v.addressVi)} />
            <InfoRow icon={<Clock3 size={14} color={C.gold} />} text={L(lang, v.open, v.openVi)} />
            <InfoRow icon={<ShieldCheck size={14} color={C.gold} />} text={L(lang, v.policy, v.policyVi)} />
            {!v.boost && <InfoRow icon={<Award size={14} color={C.gold} />} text={L(lang, `재이용 ${v.rebook}% · 이행률 ${v.fulfill}% · 평균 응답 ${v.resp}`, `Quay lại ${v.rebook}% · Hoàn thành ${v.fulfill}% · Phản hồi TB ${v.respVi}`)} />}
          </div>
        </div>
      )}
      {v.services.length > 0 && (
        <div style={S.fixedCta}>
          <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => goSub("book", { venueId: v.id, serviceId: v.services[0].id })}>{L(lang, "예약하기", "Đặt chỗ")}</button>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, text }) {
  return <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "7px 0", fontSize: 12.5 }}>{icon} {text}</div>;
}

function BookScreen({ venueId, serviceId, closeSub, confirmBooking, lang }) {
  const v = VENUES.find((x) => x.id === venueId);
  const [sid, setSid] = useState(serviceId);
  const s = v.services.find((x) => x.id === sid);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [done, setDone] = useState(false);
  const date = fmtDate(days[dayIdx], lang);
  const taken = (i) => (dayIdx + i) % 4 === 1;

  const doConfirm = () => {
    confirmBooking({
      id: "b" + Date.now(),
      venue: venueName(v, lang), name: L(lang, s.name, s.nameVi),
      date, slot, time: L(lang, s.time, s.timeVi), price: s.price, point: s.point,
    });
    setConfirmOpen(false); setDone(true);
  };

  if (done) return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "예약 완료", "Đặt chỗ thành công")} onBack={closeSub} />
      <div style={{ ...S.card, textAlign: "center", padding: 28, margin: "24px 18px" }}>
        <div style={S.doneCircle}><Check size={30} color="white" /></div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 16 }}>{L(lang, s.name, s.nameVi)}</div>
        <div style={{ ...S.muted, marginTop: 5 }}>{venueName(v, lang)} · {date} · {slot}</div>
        <div style={{ color: C.green2, fontWeight: 800, fontSize: 13, marginTop: 10 }}>{L(lang, `+${s.point} HRP · +3CP 적립 완료`, `+${s.point} HRP · +3CP đã tích điểm`)}</div>
        <button style={{ ...S.greenBtn, width: "100%", marginTop: 20 }} onClick={closeSub}>{L(lang, "확인", "Xác nhận")}</button>
      </div>
    </div>
  );

  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "예약하기", "Đặt chỗ")} onBack={closeSub} />
      <div style={{ padding: "12px 18px 0" }}>
        <div style={{ ...S.muted, fontSize: 12, marginBottom: 8 }}>{venueName(v, lang)}</div>
        <div style={S.hScrollTight}>
          {v.services.map((x) => (
            <button key={x.id} style={{ ...S.chipBtn, background: x.id === sid ? C.green : C.ivory, color: x.id === sid ? "white" : C.text }} onClick={() => setSid(x.id)}>
              {L(lang, x.name, x.nameVi)}
            </button>
          ))}
        </div>
        <div style={{ ...S.card, marginTop: 12, display: "flex", gap: 12 }}>
          <img src={s.img} alt="" style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
          <div>
            <b style={{ fontSize: 14 }}>{L(lang, s.name, s.nameVi)}</b>
            <div style={{ ...S.muted, fontSize: 11.5, marginTop: 3 }}>{L(lang, s.desc, s.descVi)}</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 4 }}>{vnd(s.price)} <span style={{ color: C.green2, fontSize: 11, fontWeight: 700 }}>+{s.point} HRP</span></div>
          </div>
        </div>
      </div>
      <div style={S.sectionTitle2}>{L(lang, "날짜 선택", "Chọn ngày")}</div>
      <div style={S.hScrollTight}>
        {days.map((d, i) => (
          <button key={i} style={{ ...S.chipBtn, minWidth: 76, background: dayIdx === i ? C.green : C.ivory, color: dayIdx === i ? "white" : C.text }} onClick={() => { setDayIdx(i); setSlot(null); }}>
            {fmtDate(d, lang)}
          </button>
        ))}
      </div>
      <div style={S.sectionTitle2}>{L(lang, "시간 선택", "Chọn giờ")}</div>
      <div style={{ ...S.hScrollTight, flexWrap: "wrap" }}>
        {SLOT_TIMES.map((x, i) => (
          <button
            key={x}
            disabled={taken(i)}
            style={{
              ...S.chipBtn, minWidth: 66,
              background: slot === x ? C.green : taken(i) ? "#ECE6D8" : C.ivory,
              color: slot === x ? "white" : taken(i) ? "#B7B0A0" : C.text,
              textDecoration: taken(i) ? "line-through" : "none",
            }}
            onClick={() => setSlot(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <div style={{ padding: 18 }}>
        <button style={{ ...S.greenBtn, width: "100%", opacity: slot ? 1 : 0.4 }} disabled={!slot} onClick={() => setConfirmOpen(true)}>
          {slot ? L(lang, `${date} ${slot} 예약하기`, `Đặt chỗ · ${date} ${slot}`) : L(lang, "시간을 선택해 주세요", "Vui lòng chọn giờ")}
        </button>
      </div>
      {confirmOpen && (
        <Modal title={L(lang, "예약 확인", "Xác nhận đặt chỗ")} onClose={() => setConfirmOpen(false)}>
          <Row2 a={L(lang, "매장", "Cửa hàng")} b={venueName(v, lang)} />
          <Row2 a={L(lang, "서비스", "Dịch vụ")} b={L(lang, s.name, s.nameVi)} />
          <Row2 a={L(lang, "일시", "Thời gian")} b={`${date} ${slot}`} />
          <Row2 a={L(lang, "결제 금액", "Số tiền thanh toán")} b={vnd(s.price)} strong />
          <Row2 a={L(lang, "적립", "Tích điểm")} b={`+${s.point} HRP · +3CP`} />
          <div style={{ ...S.muted, fontSize: 11, margin: "10px 0 14px" }}>{L(lang, v.policy, v.policyVi)}</div>
          <button style={{ ...S.greenBtn, width: "100%" }} onClick={doConfirm}>{L(lang, "예약 확정", "Xác nhận đặt chỗ")}</button>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── BOOKING TAB ─────────── */

function BookingTab({ bookings, goSub, t, lang }) {
  const bookable = VENUES.filter((v) => v.services.length > 0);
  return (
    <div style={S.scroll}>
      <TabHead title={t.booking} />
      {bookings.length > 0 ? (
        <>
          <div style={S.sectionTitle2}>{L(lang, "나의 예약", "Đặt chỗ của tôi")}</div>
          {bookings.map((b) => (
            <div key={b.id} style={{ ...S.card, margin: "0 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b style={{ fontSize: 14 }}>{b.name}</b>
                <div style={{ ...S.muted, fontSize: 11.5, marginTop: 3 }}>{b.venue} · {b.date} · {b.slot}</div>
              </div>
              <span style={S.pill}>{L(lang, "확정", "Đã xác nhận")}</span>
            </div>
          ))}
        </>
      ) : (
        <div style={{ ...S.card, margin: "14px 18px", textAlign: "center", padding: 24 }}>
          <CalendarDays size={26} color={C.gold} />
          <div style={{ ...S.muted, marginTop: 8 }}>{L(lang, "아직 예약이 없어요.", "Bạn chưa có đặt chỗ nào.")}<br />{L(lang, "단지 서비스를 예약해 보세요.", "Hãy đặt một dịch vụ trong khu.")}</div>
        </div>
      )}
      <div style={S.sectionTitle2}>{L(lang, "예약 가능한 서비스", "Dịch vụ có thể đặt")}</div>
      {bookable.map((v) => (
        <div key={v.id} style={S.listCard} onClick={() => goSub("venue", { venueId: v.id })}>
          <img src={v.img} alt="" style={S.listImg} />
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 14 }}>{venueName(v, lang)}</b>
            <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{catLabel(v.cat, lang)} · {L(lang, v.walk, v.walkVi)}</div>
            <div style={{ fontSize: 11.5, marginTop: 3 }}>⭐ {v.rating} ({v.reviews})</div>
          </div>
          <ChevronRight size={17} color={C.muted} />
        </div>
      ))}
    </div>
  );
}

/* ─────────── ORDER + COMMERCE ─────────── */

function OrderTab({ goSub, orders, cart, t, lang }) {
  return (
    <div style={S.scroll}>
      <TabHead
        title={t.order}
        right={
          <button style={S.iconBtn} onClick={() => goSub("cart")}>
            <ShoppingBag size={20} color={C.text} />
            {cart.length > 0 && <span style={S.cartDot}>{cart.length}</span>}
          </button>
        }
      />
      {orders.length > 0 && (
        <>
          <div style={S.sectionTitle2}>{L(lang, "주문 내역", "Lịch sử đơn hàng")}</div>
          {orders.map((o) => (
            <div key={o.id} style={{ ...S.card, margin: "0 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b style={{ fontSize: 13.5 }}>{o.items[0].name}{o.items.length > 1 ? L(lang, ` 외 ${o.items.length - 1}건`, ` và ${o.items.length - 1} sản phẩm khác`) : ""}</b>
                <div style={{ ...S.muted, fontSize: 11.5, marginTop: 3 }}>{o.when} · {vnd(o.total)}</div>
              </div>
              <span style={S.pill}>{o.status}</span>
            </div>
          ))}
        </>
      )}
      <div style={S.sectionTitle2}>{L(lang, "M4U 셀렉트", "M4U Select")}</div>
      <div style={S.prodGrid}>
        {PRODUCTS.map((p) => {
          const dc = p.origin ? Math.round((1 - p.price / p.origin) * 100) : null;
          return (
            <div key={p.id} style={{ cursor: "pointer" }} onClick={() => goSub("product", { productId: p.id })}>
              <img src={p.img} alt="" style={S.prodImg} />
              <div style={{ padding: "8px 2px 2px" }}>
                <div style={{ ...S.muted, fontSize: 10 }}>{p.brand}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.35, marginTop: 2 }}>{prodName(p, lang)}</div>
                <div style={{ marginTop: 4, display: "flex", gap: 5, alignItems: "baseline", flexWrap: "wrap" }}>
                  <b style={{ fontSize: 13.5 }}>{vnd(p.price)}</b>
                  {dc && <span style={{ color: C.gold, fontWeight: 800, fontSize: 12 }}>-{dc}%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductScreen({ productId, closeSub, setCart, placeOrder, showToast, lang }) {
  const p = PRODUCTS.find((x) => x.id === productId);
  const [open, setOpen] = useState(true);
  const dc = p.origin ? Math.round((1 - p.price / p.origin) * 100) : null;
  const addCart = () => {
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id);
      return ex ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...p, name: prodName(p, lang), qty: 1 }];
    });
    showToast(L(lang, "장바구니에 담았어요", "Đã thêm vào giỏ hàng"));
  };
  return (
    <div style={{ ...S.scroll, paddingBottom: 90 }}>
      <div style={{ position: "relative" }}>
        <img src={p.img} alt="" style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }} />
        <button style={{ ...S.circleBtn, left: 14 }} onClick={closeSub}><ArrowLeft size={18} /></button>
        <button style={{ ...S.circleBtn, right: 14 }}><Heart size={17} /></button>
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ ...S.muted, fontSize: 12 }}>{p.brand}</div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 3, lineHeight: 1.4 }}>
          {prodName(p, lang)} {p.official && <span style={S.officialBadge}>{L(lang, "공식", "Chính hãng")}</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginTop: 8 }}>
          <b style={{ fontSize: 21 }}>{vnd(p.price)}</b>
          {p.origin && <span style={{ ...S.muted, textDecoration: "line-through", fontSize: 13 }}>{vnd(p.origin)}</span>}
          {dc && <span style={{ color: C.gold, fontWeight: 800, fontSize: 15 }}>-{dc}%</span>}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          <span style={S.tagBadge}><span style={S.pointMSmall}>M</span> {p.point} HRP</span>
          <span style={S.tagBadge}><Truck size={11} /> {L(lang, "무료배송", "Miễn phí vận chuyển")}</span>
          <span style={S.tagBadge}><RotateCcw size={11} /> {L(lang, "7일 반품 가능", "Đổi trả trong 7 ngày")}</span>
        </div>
      </div>
      <div style={{ padding: "16px 18px 0" }}>
        <button style={S.accordion} onClick={() => setOpen(!open)}>
          {L(lang, "상품 구성", "Thành phần sản phẩm")} <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
        {open && <div style={{ fontSize: 12.5, padding: "10px 2px", borderBottom: `1px solid ${C.line}` }}>{L(lang, p.consist, p.consistVi)}</div>}
        <div style={{ fontSize: 13.5, fontWeight: 800, margin: "16px 0 6px" }}>{L(lang, "상품 설명", "Mô tả sản phẩm")}</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>{L(lang, p.desc, p.descVi)}</div>
      </div>
      <div style={{ ...S.fixedCta, display: "flex", gap: 8 }}>
        <button style={S.cartCta} onClick={addCart}><ShoppingBag size={17} /><span style={{ fontSize: 10 }}>{L(lang, "장바구니", "Giỏ hàng")}</span></button>
        <button style={{ ...S.greenBtn, flex: 1 }} onClick={() => placeOrder([{ ...p, name: prodName(p, lang), qty: 1 }], p.price, p.point)}>{L(lang, "바로 구매", "Mua ngay")}</button>
      </div>
    </div>
  );
}

function CartScreen({ closeSub, cart, setCart, placeOrder, lang }) {
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const pt = cart.reduce((s, x) => s + x.point * x.qty, 0);
  const chQty = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const rm = (id) => setCart((c) => c.filter((x) => x.id !== id));
  return (
    <div style={{ ...S.scroll, paddingBottom: 90 }}>
      <SubHead title={L(lang, `장바구니 (${cart.length})`, `Giỏ hàng (${cart.length})`)} onBack={closeSub} />
      {cart.length === 0 ? (
        <div style={{ ...S.muted, textAlign: "center", padding: 50 }}>{L(lang, "장바구니가 비어 있어요.", "Giỏ hàng của bạn đang trống.")}</div>
      ) : (
        <>
          {cart.map((x) => (
            <div key={x.id} style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12 }}>
              <img src={x.img} alt="" style={{ width: 62, height: 62, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <b style={{ fontSize: 13 }}>{x.name}</b>
                  <button style={S.iconBtn} onClick={() => rm(x.id)}><X size={15} color={C.muted} /></button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <div style={S.qtyBox}>
                    <button style={S.qtyBtn} onClick={() => chQty(x.id, -1)}><Minus size={12} /></button>
                    <span style={{ fontSize: 13, fontWeight: 700, minWidth: 18, textAlign: "center" }}>{x.qty}</span>
                    <button style={S.qtyBtn} onClick={() => chQty(x.id, 1)}><Plus size={12} /></button>
                  </div>
                  <b style={{ fontSize: 14 }}>{vnd(x.price * x.qty)}</b>
                </div>
              </div>
            </div>
          ))}
          <div style={{ ...S.card, margin: "14px 18px 0" }}>
            <Row2 a={L(lang, "상품 금액", "Tiền hàng")} b={vnd(total)} />
            <Row2 a={L(lang, "배송비", "Phí vận chuyển")} b={L(lang, "무료", "Miễn phí")} />
            <Row2 a={L(lang, "적립 예정", "Điểm sẽ tích")} b={`+${pt} HRP`} />
            <Row2 a={L(lang, "총 결제 금액", "Tổng thanh toán")} b={vnd(total)} strong />
          </div>
          <div style={S.fixedCta}>
            <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => { placeOrder(cart, total, pt); closeSub(); }}>
              {L(lang, `${vnd(total)} 결제하기`, `Thanh toán · ${vnd(total)}`)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────── HABIT (하루 습관) ─────────── */

const WEEK_DEMO = [5, 4, 5, 3, 5, 4, 0]; // 주간 완료 습관 수 (오늘은 실시간)
const SELF_HABITS = [
  ["run", "🏃", "달리기", "Chạy bộ", "30분 러닝 · 이번 주 2/3회", "Chạy 30 phút · Tuần này 2/3 lần"],
  ["mask", "🎭", "마스크팩하기", "Đắp mặt nạ", "저녁 스킨케어 루틴", "Chăm sóc da buổi tối"],
  ["meditate", "🧘", "명상하기", "Thiền định", "10분 마음 챙김", "10 phút thiền chánh niệm"],
];
const MEDI_PLACES = [
  ["Mindful Garden", "도보 8분 · 600m", "Đi bộ 8 phút · 600m", "4.9"],
  ["Lotus Yoga Studio", "도보 10분 · 750m", "Đi bộ 10 phút · 750m", "4.8"],
  ["Silence Retreat", "도보 15분 · 1.2km", "Đi bộ 15 phút · 1.2km", "4.7"],
];
const WEEKDAYS_KO = ["월", "화", "수", "목", "금", "토", "오늘"];
const WEEKDAYS_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "Hôm nay"];

function HabitTab({ t, lang, steps, syncSteps, walkClaimed, water, drinkWater, habitChecks, toggleHabit, streak, habitDone, goSub, setTab, showToast }) {
  const stepPct = Math.min(100, Math.round((steps / 10000) * 100));
  const week = [...WEEK_DEMO.slice(0, 6), habitDone];
  const weekdays = lang === "ko" ? WEEKDAYS_KO : WEEKDAYS_VI;

  return (
    <div style={S.scroll}>
      <TabHead
        title={t.habit}
        right={<span style={{ ...S.pill, background: "rgba(198,161,91,.16)", color: "#8A6A2E" }}><Flame size={11} /> {L(lang, `연속 ${streak}일`, `${streak} ngày liên tiếp`)}</span>}
      />

      <div style={S.pointHero}>
        <div>
          <div style={S.smallGold}>{L(lang, "오늘 받을 수 있는 혜택", "Ưu đãi có thể nhận hôm nay")}</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{L(lang, "최대 +30 HRP", "Tối đa +30 HRP")}</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.6)", marginTop: 4 }}>{L(lang, `오늘 완료 ${habitDone}/5 · HARU REWARD POINT`, `Hoàn thành ${habitDone}/5 hôm nay · HARU REWARD POINT`)}</div>
        </div>
        <Leaf size={26} color={C.gold} />
      </div>

      <div style={S.sectionTitle2}>{L(lang, "오늘의 습관", "Thói quen hôm nay")}</div>

      <div style={{ ...S.card, margin: "0 18px 10px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={S.habitIcon}><Footprints size={19} color={C.green} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <b style={{ fontSize: 13.5 }}>{L(lang, "걷기", "Đi bộ")}</b>
              <span style={S.verifiedBadge}><BadgeCheck size={9} /> {L(lang, "헬스 데이터 검증", "Xác minh dữ liệu sức khỏe")}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3 }}>{steps.toLocaleString()} <span style={{ ...S.muted, fontSize: 11, fontWeight: 500 }}>{L(lang, "/ 10,000 걸음", "/ 10.000 bước")}</span></div>
          </div>
          <button style={{ ...S.smallGreenBtn, background: walkClaimed ? C.green2 : C.green }} onClick={syncSteps} disabled={walkClaimed}>
            {walkClaimed ? L(lang, "달성", "Đạt") : L(lang, "동기화", "Đồng bộ")}
          </button>
        </div>
        <div style={S.progressBg}><div style={{ ...S.progressBar, width: `${stepPct}%`, background: stepPct >= 100 ? C.gold : C.green2 }} /></div>
        <div style={{ ...S.muted, fontSize: 10.5, marginTop: 6 }}>{L(lang, "목표 달성 시 +10 HRP · +2CP (검증형)", "Đạt mục tiêu: +10 HRP · +2CP (đã xác minh)")}</div>
      </div>

      <div style={{ ...S.card, margin: "0 18px 10px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={S.habitIcon}><Droplets size={19} color={C.blue} /></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{L(lang, "물마시기", "Uống nước")}</b>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 3 }}>{water} <span style={{ ...S.muted, fontSize: 11, fontWeight: 500 }}>{L(lang, "/ 8잔", "/ 8 ly")}</span></div>
          </div>
          <button style={{ ...S.smallGreenBtn, background: water >= 8 ? C.green2 : C.green }} onClick={drinkWater} disabled={water >= 8}>
            {water >= 8 ? L(lang, "완료", "Hoàn thành") : L(lang, "+1잔", "+1 ly")}
          </button>
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 999, background: i < water ? C.blue : "#E6E0D6" }} />
          ))}
        </div>
        <div style={{ ...S.muted, fontSize: 10.5, marginTop: 6 }}>{L(lang, "8잔 완료 시 +5 HRP", "Hoàn thành 8 ly: +5 HRP")}</div>
      </div>

      {SELF_HABITS.map(([key, emoji, labelKo, labelVi, descKo, descVi]) => (
        <div key={key} style={{ ...S.card, margin: "0 18px 10px", display: "flex", gap: 12, alignItems: "center", opacity: habitChecks[key] ? 0.85 : 1 }}>
          <div style={S.habitIcon}><span style={{ fontSize: 18 }}>{emoji}</span></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{L(lang, labelKo, labelVi)}</b>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, descKo, descVi)} · +5 HRP</div>
          </div>
          <button
            style={{ ...S.habitCheck, background: habitChecks[key] ? C.green2 : "white", borderColor: habitChecks[key] ? C.green2 : C.line }}
            onClick={() => toggleHabit(key, labelKo, labelVi)}
          >
            {habitChecks[key] && <Check size={15} color="white" />}
          </button>
        </div>
      ))}

      <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 4px", lineHeight: 1.6 }}>
        {L(lang, "셀프 체크 습관은 하루 1회, 최대 15 HRP까지 적립됩니다. CP는 검증 가능한 활동에만 지급됩니다.", "Thói quen tự đánh dấu chỉ tính 1 lần/ngày, tối đa 15 HRP. CP chỉ được cấp cho hoạt động có thể xác minh.")}
      </div>

      <div style={S.sectionTitle2}>{L(lang, "이번 주 리포트", "Báo cáo tuần này")}</div>
      <div style={{ ...S.card, margin: "0 18px 10px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 74 }}>
          {week.map((n, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 54, display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", height: `${(n / 5) * 100}%`, minHeight: n ? 6 : 3, borderRadius: 6, background: i === 6 ? C.gold : n >= 4 ? C.green2 : "#CFC8B8" }} />
              </div>
              <div style={{ fontSize: 9.5, color: i === 6 ? C.gold : C.muted, fontWeight: i === 6 ? 800 : 500, marginTop: 5 }}>
                {weekdays[i]}
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...S.muted, fontSize: 11, marginTop: 10 }}>{L(lang, `이번 주 습관 완료 ${week.reduce((a, b) => a + b, 0)}회 · 주 4회 이상 달성 시 주간 보너스 +20 HRP`, `Hoàn thành ${week.reduce((a, b) => a + b, 0)} lượt tuần này · Đạt 4 lần/tuần trở lên: +20 HRP`)}</div>
      </div>

      <div style={S.sectionTitle2}>{L(lang, "주변 명상 장소 · 습관을 지역과 연결", "Địa điểm thiền gần bạn · Kết nối thói quen với khu vực")}</div>
      {MEDI_PLACES.map(([name, distKo, distVi, rate]) => (
        <div key={name} style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={S.habitIcon}><span style={{ fontSize: 17 }}>🧘</span></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13 }}>{name}</b>
            <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>⭐ {rate} · {L(lang, distKo, distVi)} · {L(lang, "클래스 완료 시 +20 HRP", "Hoàn thành lớp +20 HRP")}</div>
          </div>
          <button style={S.smallGreenBtn} onClick={() => showToast(L(lang, `${name} 클래스 예약 완료 (데모)`, `Đã đặt lớp tại ${name} (demo)`))}>{L(lang, "예약", "Đặt")}</button>
        </div>
      ))}
      <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 8px", lineHeight: 1.6 }}>
        {L(lang, "온라인 명상에서 끝나지 않습니다 — 예약하면 지역 소비와 Verified Review로 이어집니다.", "Không dừng ở thiền online — đặt lớp sẽ kết nối với tiêu dùng địa phương và Verified Review.")}
      </div>

      <div style={S.sectionTitle2}>{L(lang, "습관과 연결된 케어", "Chăm sóc gắn với thói quen")}</div>
      <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => goSub("product", { productId: "p3" })}>
        <img src={IMG.mask} alt="" style={{ width: 50, height: 50, borderRadius: 12, objectFit: "cover" }} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "마스크팩 소진 임박", "Sắp hết mặt nạ")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "시카 리페어 마스크팩 10매 · -14%로 재구매", "Mặt nạ phục hồi Cica 10 miếng · Mua lại giảm 14%")}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>
      <div style={{ ...S.card, margin: "0 18px 20px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => goSub("venue", { venueId: "v1" })}>
        <img src={IMG.facial} alt="" style={{ width: 50, height: 50, borderRadius: 12, objectFit: "cover" }} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "피부 컨디션 기반 케어 추천", "Gợi ý chăm sóc theo tình trạng da")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "수분 진정 케어 · M4U Salon & Spa 예약 가능", "Chăm sóc dịu ẩm · Có thể đặt tại M4U Salon & Spa")}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>
    </div>
  );
}

/* ─────────── WALLET (HRP + CP + FIVE + 쿠폰 + 투표) ─────────── */

function WalletTab({ points, cp, goSub, rooms, joinedRooms, joinRoom, coupons, setCoupons, showToast, proposals, t, lang }) {
  const [joinTarget, setJoinTarget] = useState(null);
  const useCoupon = (id) => { setCoupons((cs) => cs.map((c) => (c.id === id ? { ...c, used: true } : c))); showToast(L(lang, "쿠폰 사용 처리 완료", "Đã sử dụng mã ưu đãi")); };
  const openProps = proposals.filter((p) => p.status === "open").length;

  return (
    <div style={S.scroll}>
      <TabHead title={t.wallet} right={<Wallet size={19} color={C.gold} />} />

      <div style={S.walletHero}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={S.walletAsset} onClick={() => goSub("pointlog")}>
            <div style={S.smallGold}>HRP</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 3 }}>{points.toLocaleString()} HRP</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginTop: 3 }}>{L(lang, "HARU REWARD POINT · 결제·적립", "HARU REWARD POINT · Thanh toán & tích điểm")}</div>
          </button>
          <div style={S.walletDivider} />
          <button style={S.walletAsset} onClick={() => goSub("cplog")}>
            <div style={S.smallGold}>{L(lang, "CP 기여 포인트", "Điểm đóng góp CP")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 3 }}>{cp.toLocaleString()} CP</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", marginTop: 3 }}>{L(lang, "양도 불가 · 투표 가중치", "Không thể chuyển nhượng · Trọng số bỏ phiếu")}</div>
          </button>
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", marginTop: 12, lineHeight: 1.5 }}>
          {L(lang, "CP는 생태계 기여로만 적립되며 구매할 수 없습니다. 커뮤니티 의사결정의 투표 가중치로 사용됩니다.", "CP chỉ được tích lũy qua đóng góp cho hệ sinh thái và không thể mua. CP dùng làm trọng số khi bỏ phiếu quyết định cộng đồng.")}
        </div>
      </div>

      <div style={{ ...S.card, margin: "12px 18px 4px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => goSub("vote")}>
        <div style={S.myIcon}><Vote size={18} color={C.green} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng")}</b>
          <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{L(lang, `진행 중 ${openProps}건 · 내 투표권 ${cp} CP`, `${openProps} đề xuất đang mở · Quyền biểu quyết ${cp} CP`)}</div>
        </div>
        <ChevronRight size={17} color={C.muted} />
      </div>

      <div style={S.rowBetween}>
        <div style={S.sectionTitle}>{L(lang, "M4U FIVE 공동구매", "Mua chung M4U FIVE")}</div>
        <div style={{ ...S.muted, fontSize: 11 }}>{L(lang, "구매 건수 비례 보상", "Thưởng theo số lượt tham gia")}</div>
      </div>
      {rooms.map((r) => {
        const tier = FIVE_TIERS[r.tier];
        const price = Math.round(r.origin * (1 - tier.dc / 100));
        const joined = joinedRooms.includes(r.id);
        const pct = Math.round((r.joined / r.tier) * 100);
        const pname = lang === "ko" ? r.product : r.productVi;
        return (
          <div key={r.id} style={{ ...S.card, margin: "0 18px 12px" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <img src={r.img} alt="" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 13.5 }}>{pname}</b>
                <div style={{ display: "flex", gap: 6, alignItems: "baseline", marginTop: 4, flexWrap: "wrap" }}>
                  <span style={{ ...S.muted, textDecoration: "line-through", fontSize: 11 }}>{vnd(r.origin)}</span>
                  <b style={{ fontSize: 14 }}>{vnd(price)}</b>
                  <span style={{ color: C.gold, fontWeight: 800, fontSize: 12 }}>-{tier.dc}%</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11.5, marginTop: 12, alignItems: "center" }}>
              <span><Users size={11} /> {L(lang, `${r.joined}/${r.tier}명`, `${r.joined}/${r.tier} người`)}</span>
              <span><Timer size={11} /> <Countdown endsAt={r.endsAt} /></span>
              <b style={{ marginLeft: "auto", color: C.green2 }}>+{tier.hrp} HRP · +10CP</b>
            </div>
            <div style={S.progressBg}><div style={{ ...S.progressBar, width: `${pct}%`, background: pct >= 80 ? C.gold : C.green2 }} /></div>
            <button style={{ ...S.greenBtn, width: "100%", marginTop: 12, opacity: joined ? 0.75 : 1 }} disabled={joined} onClick={() => setJoinTarget(r)}>
              {joined ? L(lang, "참여 완료", "Đã tham gia") : L(lang, `참여하기 · ${vnd(price)}`, `Tham gia · ${vnd(price)}`)}
            </button>
          </div>
        );
      })}
      <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 6px", lineHeight: 1.6 }}>
        {L(lang, "보상은 구매 건수에 비례하여 지급되며, 모집 미달 시 자동 취소 및 전액 환불됩니다.", "Thưởng được trả theo số lượt mua. Nếu không đủ số lượng, đơn sẽ tự động hủy và hoàn tiền toàn bộ.")}
      </div>

      <div style={S.sectionTitle2}>{L(lang, `쿠폰함 · 사용 가능 ${coupons.filter((c) => !c.used).length}장`, `Mã ưu đãi · ${coupons.filter((c) => !c.used).length} mã khả dụng`)}</div>
      {coupons.map((c) => (
        <div key={c.id} style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 10, alignItems: "center", opacity: c.used ? 0.5 : 1 }}>
          <Ticket size={19} color={C.gold} />
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13 }}>{L(lang, c.title, c.titleVi)}</b>
            <div style={{ ...S.muted, fontSize: 11 }}>{L(lang, c.desc, c.descVi)}</div>
          </div>
          <button style={{ ...S.smallGreenBtn, opacity: c.used ? 0.6 : 1 }} disabled={c.used} onClick={() => useCoupon(c.id)}>
            {c.used ? L(lang, "사용됨", "Đã dùng") : L(lang, "사용", "Sử dụng")}
          </button>
        </div>
      ))}

      {joinTarget && (
        <Modal title={L(lang, "공동구매 참여", "Tham gia mua chung")} onClose={() => setJoinTarget(null)}>
          {(() => {
            const tier = FIVE_TIERS[joinTarget.tier];
            const price = Math.round(joinTarget.origin * (1 - tier.dc / 100));
            const pname = lang === "ko" ? joinTarget.product : joinTarget.productVi;
            return (
              <>
                <Row2 a={L(lang, "상품", "Sản phẩm")} b={pname} />
                <Row2 a={L(lang, "방 구조", "Cấu trúc phòng")} b={L(lang, `${joinTarget.tier}인 방 (${joinTarget.joined + 1}/${joinTarget.tier})`, `Phòng ${joinTarget.tier} người (${joinTarget.joined + 1}/${joinTarget.tier})`)} />
                <Row2 a={L(lang, "할인가", "Giá ưu đãi")} b={vnd(price)} strong />
                <Row2 a={L(lang, "보상", "Thưởng")} b={`+${tier.hrp} HRP · +10CP`} />
                <div style={{ ...S.muted, fontSize: 11, margin: "10px 0 14px" }}>{L(lang, "결제는 모집 완료 시 진행되며, 미달 시 자동 취소됩니다.", "Thanh toán được thực hiện khi đủ số lượng; nếu không đủ sẽ tự động hủy.")}</div>
                <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => { joinRoom(joinTarget); setJoinTarget(null); }}>{L(lang, "참여 확정", "Xác nhận tham gia")}</button>
              </>
            );
          })()}
        </Modal>
      )}
    </div>
  );
}

/* ─────────── GOVERNANCE ─────────── */

function VoteScreen({ closeSub, proposals, myVotes, castVote, cp, lang }) {
  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng")} onBack={closeSub} />
      <div style={{ ...S.card, margin: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={S.myIcon}><Vote size={18} color={C.green} /></div>
        <div style={{ flex: 1, fontSize: 12, lineHeight: 1.55 }}>
          {L(lang, "내 투표권 ", "Quyền biểu quyết của tôi: ")}<b>{cp} CP</b>
          {L(lang, " — CP 가중 투표로 단지 운영 안건이 결정됩니다. 결과는 정족수 충족 시 반영됩니다.", " — Các đề xuất vận hành khu được quyết định theo trọng số CP. Kết quả có hiệu lực khi đủ định mức tối thiểu.")}
        </div>
      </div>
      {proposals.map((p) => {
        const total = p.yes + p.no;
        const yesPct = total ? Math.round((p.yes / total) * 100) : 0;
        const quorumPct = Math.min(100, Math.round((total / p.quorum) * 100));
        const voted = myVotes[p.id];
        const closed = p.status !== "open";
        return (
          <div key={p.id} style={{ ...S.card, margin: "0 18px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <b style={{ fontSize: 14, lineHeight: 1.45 }}>{L(lang, p.title, p.titleVi)}</b>
              {closed
                ? <span style={{ ...S.pill, background: "rgba(198,161,91,.16)", color: "#8A6A2E" }}>{L(lang, "가결 · 반영 완료", "Đã thông qua")}</span>
                : <span style={S.pill}><Timer size={10} /> <Countdown endsAt={p.endsAt} /></span>}
            </div>
            <div style={{ ...S.muted, fontSize: 11.5, marginTop: 4, lineHeight: 1.5 }}>{L(lang, p.desc, p.descVi)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginTop: 12 }}>
              <span style={{ color: C.green2, fontWeight: 800 }}>{L(lang, `찬성 ${p.yes.toLocaleString()} CP (${yesPct}%)`, `Đồng ý ${p.yes.toLocaleString()} CP (${yesPct}%)`)}</span>
              <span style={{ color: C.red, fontWeight: 700 }}>{L(lang, `반대 ${p.no.toLocaleString()} CP`, `Không đồng ý ${p.no.toLocaleString()} CP`)}</span>
            </div>
            <div style={S.progressBg}>
              <div style={{ ...S.progressBar, width: `${yesPct}%`, background: C.green2 }} />
            </div>
            <div style={{ ...S.muted, fontSize: 10.5, marginTop: 6 }}>{L(lang, `정족수 ${p.quorum.toLocaleString()} CP 중 ${quorumPct}% 달성`, `Đạt ${quorumPct}% trên định mức ${p.quorum.toLocaleString()} CP`)}</div>
            {!closed && (
              voted ? (
                <div style={{ ...S.muted, fontSize: 12, marginTop: 12, textAlign: "center", fontWeight: 700 }}>
                  <Check size={13} color={C.green2} /> {L(
                    lang,
                    `${voted === "yes" ? "찬성" : "반대"}에 ${cp} CP 투표 완료`,
                    `Đã bỏ phiếu ${voted === "yes" ? "đồng ý" : "không đồng ý"} với ${cp} CP`
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button style={{ ...S.greenBtn, flex: 1, padding: 11, fontSize: 13 }} onClick={() => castVote(p.id, "yes")}>{L(lang, "찬성", "Đồng ý")}</button>
                  <button style={{ ...S.greenBtn, flex: 1, padding: 11, fontSize: 13, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={() => castVote(p.id, "no")}>{L(lang, "반대", "Không đồng ý")}</button>
                </div>
              )
            )}
          </div>
        );
      })}
      <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 20px", lineHeight: 1.6 }}>
        {L(lang, "CP는 구매할 수 없으며 기여 활동으로만 적립됩니다. 본 투표 체계는 추후 온체인 거버넌스로 동일 구조 이관을 전제로 설계되었습니다.", "CP không thể mua và chỉ được tích lũy qua đóng góp. Hệ thống bỏ phiếu này được thiết kế để chuyển sang quản trị on-chain với cùng cấu trúc trong tương lai.")}
      </div>
    </div>
  );
}

/* ─────────── 내역 화면 ─────────── */

const pickLabel = (x, lang) => (lang === "ko" ? x.label : (x.labelVi || x.label));

function PointLogScreen({ closeSub, points, txs, lang }) {
  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "HRP 내역", "Lịch sử HRP")} onBack={closeSub} />
      <div style={S.pointHero}>
        <div>
          <div style={S.smallGold}>{L(lang, "보유 HRP · HARU REWARD POINT", "Số dư HRP · HARU REWARD POINT")}</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{points.toLocaleString()} HRP</div>
        </div>
        <Award size={26} color={C.gold} />
      </div>
      <div style={{ ...S.card, margin: "0 18px" }}>
        {txs.map((x) => (
          <div key={x.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.line}`, fontSize: 13 }}>
            <span>{pickLabel(x, lang)}<div style={{ ...S.muted, fontSize: 10.5 }}>{x.when}</div></span>
            <b style={{ color: x.amount > 0 ? C.green2 : C.red }}>{x.amount > 0 ? "+" : ""}{x.amount} HRP</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function CpLogScreen({ closeSub, cp, cpLog, lang }) {
  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "CP 기여 내역", "Lịch sử đóng góp CP")} onBack={closeSub} />
      <div style={S.pointHero}>
        <div>
          <div style={S.smallGold}>{L(lang, "보유 CP · 양도 불가", "Số dư CP · Không thể chuyển nhượng")}</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>{cp.toLocaleString()} CP</div>
        </div>
        <ShieldCheck size={26} color={C.gold} />
      </div>
      <div style={{ ...S.card, margin: "0 18px 14px" }}>
        {cpLog.map((x) => (
          <div key={x.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.line}`, fontSize: 13 }}>
            <span>{pickLabel(x, lang)}<div style={{ ...S.muted, fontSize: 10.5 }}>{x.when}</div></span>
            <b style={{ color: C.green2 }}>+{x.amount}CP</b>
          </div>
        ))}
      </div>
      <div style={S.sectionTitle2}>{L(lang, "CP 적립 방법", "Cách tích lũy CP")}</div>
      <div style={{ ...S.card, margin: "0 18px" }}>
        {CP_RULES.map(([ko, vi, val]) => <Row2 key={ko} a={L(lang, ko, vi)} b={val} />)}
      </div>
    </div>
  );
}

/* ─────────── MY TAB ─────────── */

function MyTab({ goSub, points, cp, bookings, stays, orders, checkedIn, mode, setMode, lang, setUiLang, setTab, showToast, t, partnerActive, zone, setZonePick }) {
  const guest = true; // v9: 모드 통합 — 스테이 내역은 모두에게 표시
  const menu = [
    { icon: <Building2 size={18} color={C.green} />, label: L(lang, "내 레지던스", "Căn hộ của tôi"), desc: checkedIn ? L(lang, "체크인 완료 · Ocean Residence 1208호", "Đã nhận phòng · Ocean Residence 1208") : L(lang, "QR 체크인 · Ocean Residence", "Check-in QR · Ocean Residence"), to: "residence" },
    { icon: <BedDouble size={18} color={C.green} />, label: L(lang, "스테이 내역", "Lịch sử lưu trú"), desc: L(lang, `${stays.length}건`, `${stays.length} lượt`), act: () => setTab("stay"), hide: !guest },
    { icon: <CalendarDays size={18} color={C.green} />, label: L(lang, "예약 내역", "Lịch sử đặt chỗ"), desc: L(lang, `${bookings.length}건`, `${bookings.length} lượt`), act: () => setTab("booking") },
    { icon: <Package size={18} color={C.green} />, label: L(lang, "주문 내역", "Lịch sử đơn hàng"), desc: L(lang, `${orders.length}건`, `${orders.length} đơn`), act: () => setTab("order") },
    { icon: <Vote size={18} color={C.green} />, label: L(lang, "커뮤니티 투표", "Bỏ phiếu cộng đồng"), desc: L(lang, `투표권 ${cp} CP`, `Quyền biểu quyết ${cp} CP`), to: "vote" },
    { icon: <Settings size={18} color={C.green} />, label: L(lang, "설정", "Cài đặt"), desc: L(lang, "알림 · 결제수단", "Thông báo · Phương thức thanh toán") },
  ].filter((m) => !m.hide);

  return (
    <div style={S.scroll}>
      <TabHead title={t.my} right={<Bell size={20} color={C.text} />} />
      <div style={{ ...S.card, margin: "12px 18px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={S.avatarBig}><User size={22} color={C.green} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 15 }}>{L(lang, "회원님", "Thành viên")}</b>
          <div style={{ color: C.gold, fontSize: 11.5, fontWeight: 800, marginTop: 2 }}>★ GOLD MEMBER</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{points.toLocaleString()} HRP</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: C.green2 }}>{cp} CP</div>
        </div>
      </div>

      <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }} onClick={() => setTab("wallet")}>
        <Wallet size={17} color={C.gold} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "지갑 · HRP & CP", "Ví · HRP & CP")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, `${points.toLocaleString()} HRP · ${cp} CP · FIVE · 쿠폰 · 투표`, `${points.toLocaleString()} HRP · ${cp} CP · FIVE · Mã ưu đãi · Bỏ phiếu`)}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }} onClick={() => setZonePick(true)}>
        <MapPin size={17} color={C.gold} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "MY ZONE 관리", "Quản lý MY ZONE")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{zoneName(zone, lang)} · {L(lang, "이사·여행 시 생활권을 변경하세요", "Đổi khu vực khi chuyển nhà hoặc du lịch")}</div>
        </div>
        <ChevronRight size={16} color={C.muted} />
      </div>

      <div style={{ ...S.card, margin: "0 18px 12px", display: "flex", gap: 10, alignItems: "center" }}>
        <Globe size={17} color={C.gold} />
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "언어", "Ngôn ngữ")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "화면 언어만 변경됩니다", "Chỉ thay đổi ngôn ngữ hiển thị")}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["ko", "🇰🇷 한국어"], ["vi", "🇻🇳 Tiếng Việt"]].map(([l, label]) => (
            <button
              key={l}
              style={{ ...S.modeBtn, background: lang === l ? C.green : C.ivory, color: lang === l ? "white" : C.text }}
              onClick={() => { if (lang !== l) { setUiLang(l); showToast(l === "ko" ? "한국어로 변경되었습니다" : "Đã chuyển sang tiếng Việt"); } }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {menu.map((m) => (
        <div key={m.label} style={{ ...S.listCard, border: m.gold ? `1px dashed ${C.gold}` : `1px solid ${C.line}` }} onClick={() => (m.to ? goSub(m.to) : m.act && m.act())}>
          <div style={S.myIcon}>{m.icon}</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5 }}>{m.label}</b>
            <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{m.desc}</div>
          </div>
          <ChevronRight size={17} color={C.muted} />
        </div>
      ))}

      <div style={{ ...S.sectionTitle2, display: "flex", gap: 6, alignItems: "center" }}>🏪 M4U PARTNER</div>
      {partnerActive && (
        <div style={{ ...S.listCard, background: C.green, border: `1px solid ${C.green}` }} onClick={() => goSub("mybiz")}>
          <div style={{ ...S.myIcon, background: "rgba(198,161,91,.2)" }}><Store size={18} color={C.gold} /></div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 13.5, color: "white" }}>MY BUSINESS</b>
            <div style={{ fontSize: 11.5, marginTop: 2, color: "rgba(255,255,255,.75)" }}>GRAND PARK CART · Ocean Residence HOST <span style={{ color: "#7FD8A8", fontWeight: 800 }}>● ONLINE</span></div>
          </div>
          <ChevronRight size={17} color={C.gold} />
        </div>
      )}
      <div style={{ ...S.listCard, border: `1px dashed ${C.gold}` }} onClick={() => goSub("partner")}>
        <div style={S.myIcon}><Plus size={18} color={C.green} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "내 사업 시작하기", "Bắt đầu kinh doanh")}</b>
          <div style={{ ...S.muted, fontSize: 11.5, marginTop: 2 }}>{L(lang, "AI에게 말하면 등록 초안 자동 생성 · 승인 시 +50CP", "Mô tả cho AI để tạo bản đăng ký tự động · Duyệt xong +50CP")}</div>
        </div>
        <ChevronRight size={17} color={C.muted} />
      </div>
      {!partnerActive && (
        <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 16px", lineHeight: 1.6 }}>
          {L(lang, "소비자 계정 그대로 사업을 등록할 수 있어요. 하나의 계정 · 하나의 지갑으로 운영됩니다.", "Bạn có thể đăng ký kinh doanh ngay trên tài khoản hiện tại. Một tài khoản · một ví.")}
        </div>
      )}
    </div>
  );
}

/* ─────────── RESIDENCE (컨시어지) ─────────── */

const CONCIERGE_ITEMS = [
  ["✨", "청소 요청", "Yêu cầu dọn phòng"],
  ["🧺", "수건 요청", "Yêu cầu khăn tắm"],
  ["🗣", "통역 지원", "Hỗ trợ thông dịch"],
  ["🛺", "이동 요청", "Yêu cầu xe di chuyển"],
];

function ResidenceScreen({ closeSub, showToast, checkedIn, setCheckedIn, lang }) {
  const [qrOpen, setQrOpen] = useState(false);
  const request = (labelKo, labelVi) => showToast(L(lang, `${labelKo} 접수 완료 · 15분 내 처리`, `Đã tiếp nhận ${labelVi} · Xử lý trong 15 phút`));
  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "내 레지던스 · 컨시어지", "Căn hộ của tôi · Lễ tân")} onBack={closeSub} />
      <div style={{ position: "relative", margin: 16, borderRadius: 18, overflow: "hidden" }}>
        <img src={IMG.res1} alt="" style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", left: 14, bottom: 12, color: "white", fontWeight: 800 }}>{L(lang, "Ocean Residence · 1208호", "Ocean Residence · Phòng 1208")}</div>
      </div>
      <div style={{ ...S.card, margin: "0 18px 14px" }}>
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ flex: 1 }}><div style={S.smallGoldDark}>CHECK-IN</div><b style={{ fontSize: 13.5 }}>{L(lang, "8월 12일 15:00", "12/8 · 15:00")}</b></div>
          <div style={{ flex: 1 }}><div style={S.smallGoldDark}>CHECK-OUT</div><b style={{ fontSize: 13.5 }}>{L(lang, "8월 19일 11:00", "19/8 · 11:00")}</b></div>
        </div>
        <button style={{ ...S.greenBtn, width: "100%", marginTop: 14, background: checkedIn ? C.green2 : C.green }} onClick={() => setQrOpen(true)}>
          {checkedIn ? <><Check size={16} /> {L(lang, "체크인 완료", "Đã nhận phòng")}</> : <><QrCode size={16} /> {L(lang, "QR 체크인", "Check-in QR")}</>}
        </button>
      </div>
      <div style={S.sectionTitle2}>{L(lang, "컨시어지 요청", "Yêu cầu lễ tân")}</div>
      <div style={S.grid4}>
        {CONCIERGE_ITEMS.map(([e, ko, vi]) => (
          <button key={ko} style={S.quick} onClick={() => request(ko, vi)}>
            <div style={{ fontSize: 20 }}>{e}</div>
            <div style={{ fontSize: 10.5, fontWeight: 700 }}>{L(lang, ko, vi)}</div>
          </button>
        ))}
      </div>

      <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ ...S.habitIcon, background: "rgba(198,161,91,.14)" }}><QrCode size={17} color={C.gold} /></div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 13 }}>{L(lang, "ROOM 1208 Guest QR 연결됨", "Đã kết nối QR phòng 1208")}</b>
          <div style={{ ...S.muted, fontSize: 11, marginTop: 2, lineHeight: 1.5 }}>
            {L(lang, "이 객실을 통한 식당·살롱·이동 이용 시 HRP가 적립되고, 숙소 Host에게도 추천 보상이 돌아갑니다.", "Dùng nhà hàng · salon · xe qua phòng này sẽ tích HRP, và Host cũng nhận thưởng giới thiệu.")}
          </div>
        </div>
      </div>
      {qrOpen && (
        <Modal title={L(lang, "QR 체크인", "Check-in QR")} onClose={() => setQrOpen(false)}>
          <div style={S.qrBox}>
            <div style={S.qrGrid}>
              {Array.from({ length: 81 }).map((_, i) => (
                <div key={i} style={{ background: (i * 7 + 3) % 5 < 3 ? C.green : "transparent" }} />
              ))}
            </div>
          </div>
          <div style={{ ...S.muted, textAlign: "center", marginBottom: 14 }}>{L(lang, "프런트 리더기에 스캔해 주세요 · 유효 5:00", "Quét mã tại quầy lễ tân · Hiệu lực 5:00")}</div>
          <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => { setCheckedIn(true); setQrOpen(false); showToast(L(lang, "체크인 완료!", "Đã nhận phòng!")); }}>
            {L(lang, "스캔 완료 (데모)", "Đã quét (demo)")}
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── PARTNER ─────────── */

const CHECK_ITEMS = [
  { id: "biz", label: "사업자 등록 확인", labelVi: "Xác nhận đăng ký kinh doanh", desc: "사업자등록증 또는 개인사업 신고 서류", descVi: "Giấy đăng ký kinh doanh hoặc hồ sơ hộ kinh doanh cá thể" },
  { id: "loc", label: "위치 확인", labelVi: "Xác nhận vị trí", desc: "실제 영업 위치 · 지도 검증", descVi: "Vị trí kinh doanh thực tế · Xác minh trên bản đồ" },
  { id: "doc", label: "업종별 필수 서류", labelVi: "Hồ sơ bắt buộc theo ngành", desc: "위생 · 자격 · 인허가 (해당 업종)", descVi: "Vệ sinh · Chứng chỉ · Giấy phép (nếu áp dụng)" },
];

function structureDraft(text, lang) {
  const t2 = text.toLowerCase();
  let cat = L(lang, "생활·편의", "Tiện ích"), booking = L(lang, "방문형 (예약 불필요)", "Tại chỗ (không cần đặt trước)"), price = L(lang, "상품별 개별 가격", "Giá theo từng sản phẩm");
  if (/(미용|헤어|네일|살롱|피부|스파|salon)/.test(t2)) {
    cat = L(lang, "살롱·뷰티", "Salon · Làm đẹp"); booking = L(lang, "시간제 예약", "Đặt lịch theo giờ"); price = L(lang, "시술별 정찰제", "Giá cố định theo dịch vụ");
  } else if (/(식당|음식|쌀국수|분식|밥|요리|반미|국수|그릴)/.test(t2)) {
    cat = L(lang, "맛집", "Ẩm thực"); booking = L(lang, "테이블 예약 + 픽업", "Đặt bàn + mang đi"); price = L(lang, "메뉴판 기준", "Theo thực đơn");
  } else if (/(카페|커피|디저트|베이커리)/.test(t2)) {
    cat = L(lang, "카페", "Cà phê"); booking = L(lang, "픽업 예약", "Đặt mang đi"); price = L(lang, "메뉴판 기준", "Theo thực đơn");
  } else if (/(카트|이동|배달|운송|픽업|차량|렌트)/.test(t2)) {
    cat = L(lang, "이동·렌트", "Di chuyển"); booking = L(lang, "호출형 (실시간 배차)", "Gọi xe (điều phối thời gian thực)"); price = L(lang, "거리 비례 요금", "Tính theo khoảng cách");
  } else if (/(마켓|마트|쇼핑|잡화|스토어)/.test(t2)) {
    cat = L(lang, "쇼핑", "Mua sắm"); booking = L(lang, "주문 + 배달", "Đặt hàng + giao hàng"); price = L(lang, "상품별 개별 가격", "Giá theo từng sản phẩm");
  }
  const hourMatch = text.match(/(\d{1,2})\s*시.*?(\d{1,2})\s*시/);
  const hours = hourMatch ? `${hourMatch[1]}:00 - ${hourMatch[2]}:00` : L(lang, "10:00 - 20:00 (제안)", "10:00 - 20:00 (đề xuất)");
  return { cat, booking, price, hours };
}

function PartnerScreen({ closeSub, showToast, lang, earnCp, setPartnerActive, goSub }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("local"); // local | host | salon | mobility
  const [desc, setDesc] = useState("");
  const [draft, setDraft] = useState(null);
  const [checks, setChecks] = useState({});
  const allChecked = CHECK_ITEMS.every((c) => checks[c.id]);

  const generate = () => {
    if (!desc.trim()) return;
    setDraft({ name: "", ...structureDraft(desc, lang) });
    setStep(1);
    showToast(L(lang, "AI가 등록 초안을 생성했어요", "AI đã tạo bản nháp đăng ký"));
  };
  const submit = () => {
    setStep(3);
    showToast(L(lang, "심사 요청이 제출되었습니다", "Đã gửi yêu cầu xét duyệt"));
  };

  const steps4 = [L(lang, "설명", "Mô tả"), L(lang, "AI 초안", "Bản nháp AI"), L(lang, "필수 확인", "Xác nhận"), L(lang, "제출", "Gửi")];
  const fields = [
    [L(lang, "상호명", "Tên cửa hàng"), "name", L(lang, "상호명 입력", "Nhập tên cửa hàng")],
    [L(lang, "업종 (AI 추정)", "Ngành (AI gợi ý)"), "cat"],
    [L(lang, "가격 체계", "Cách tính giá"), "price"],
    [L(lang, "운영시간", "Giờ hoạt động"), "hours"],
    [L(lang, "예약 형태", "Hình thức đặt chỗ"), "booking"],
  ];

  return (
    <div style={S.scroll}>
      <SubHead title={L(lang, "내 사업 시작하기", "Bắt đầu kinh doanh")} onBack={closeSub} />
      <div style={S.stepRow}>
        {steps4.map((x, i) => (
          <div key={x} style={{ ...S.stepItem, opacity: step >= i ? 1 : 0.35 }}>
            <div style={{ ...S.stepDot, background: step >= i ? C.green : "#CFC8B8" }}>{i + 1}</div>
            <span>{x}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <>
          <div style={{ ...S.card, margin: "0 18px 12px" }}>
            <b style={{ fontSize: 14 }}>{L(lang, "어떤 역할로 시작하시나요?", "Bạn bắt đầu với vai trò nào?")}</b>
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {[
                ["local", "🏪", L(lang, "로컬 비즈니스", "Kinh doanh địa phương")],
                ["host", "🏨", "HOST"],
                ["salon", "💇", "SALON"],
                ["mobility", "🛺", "MOBILITY"],
              ].map(([k, e, label]) => (
                <button key={k} style={{ ...S.chipBtn, background: role === k ? C.green : C.ivory, color: role === k ? "white" : C.text }} onClick={() => setRole(k)}>
                  {e} {label}
                </button>
              ))}
            </div>
            {role === "host" && (
              <div style={{ ...S.muted, fontSize: 10.5, marginTop: 8, lineHeight: 1.6 }}>
                {L(lang, "HOST는 객실별 Guest QR을 발급받아 투숙객의 지역 소비에서 추천 보상을 받습니다. 숙박 이후의 생활이 두 번째 매출이 됩니다.", "HOST được cấp QR theo phòng và nhận thưởng giới thiệu từ tiêu dùng địa phương của khách. Đời sống sau lưu trú trở thành nguồn thu thứ hai.")}
              </div>
            )}
          </div>
          <div style={{ ...S.card, margin: "0 18px 12px" }}>
            <b style={{ fontSize: 14 }}>{L(lang, "사업을 자유롭게 설명해 주세요", "Hãy mô tả tự do về việc kinh doanh của bạn")}</b>
            <div style={{ ...S.muted, fontSize: 11.5, margin: "6px 0 10px" }}>
              {L(lang, "누구나 등록 요청할 수 있어요. AI가 업종 · 가격 · 운영시간 · 예약형태로 구조화합니다.", "Ai cũng có thể gửi yêu cầu đăng ký. AI sẽ cấu trúc thành ngành · giá · giờ hoạt động · hình thức đặt chỗ.")}
            </div>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={role === "host"
                ? L(lang, "예) 오션 레지던스에서 객실 12개를 운영하고 있어요. 투숙객에게 주변 식당·살롱·카트 혜택을 연결해 주고 싶어요.", "VD) Tôi vận hành 12 phòng ở Ocean Residence, muốn kết nối khách với nhà hàng · salon · xe điện gần đó.")
                : L(lang, "예) 빈홈 그랜드 파크에서 아침 7시부터 저녁 8시까지 쌀국수 가게를 하려고 해요. 배달도 하고 싶어요.", "VD) Tôi muốn mở quán phở ở Vinhomes Grand Park, mở cửa từ 7h sáng đến 8h tối. Tôi cũng muốn giao hàng.")}
              style={S.textarea}
              rows={5}
            />
          </div>
          <div style={{ margin: "0 18px" }}>
            <button style={{ ...S.greenBtn, width: "100%", opacity: desc.trim() ? 1 : 0.4 }} disabled={!desc.trim()} onClick={generate}>
              <Zap size={15} /> {L(lang, "AI 구조화 초안 생성", "Tạo bản nháp bằng AI")}
            </button>
          </div>
        </>
      )}

      {step === 1 && draft && (
        <>
          <div style={{ ...S.card, margin: "0 18px 12px" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Zap size={15} color={C.gold} /><b style={{ fontSize: 14 }}>{L(lang, "AI 등록 초안", "Bản nháp đăng ký của AI")}</b>
            </div>
            <div style={{ ...S.muted, fontSize: 11.5, margin: "4px 0 8px" }}>{L(lang, "내용을 확인하고 필요하면 수정하세요.", "Kiểm tra nội dung và chỉnh sửa nếu cần.")}</div>
            {fields.map(([label, key, ph]) => (
              <div key={key}>
                <label style={S.fieldLabel}>{label}</label>
                <input style={S.fieldInput} placeholder={ph} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
              </div>
            ))}
          </div>
          <div style={{ margin: "0 18px" }}>
            <button style={{ ...S.greenBtn, width: "100%", opacity: draft.name.trim() ? 1 : 0.4 }} disabled={!draft.name.trim()} onClick={() => setStep(2)}>
              {L(lang, "다음 · 필수 확인", "Tiếp theo · Xác nhận")}
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ ...S.card, margin: "0 18px 12px" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
              <ShieldCheck size={15} color={C.green2} /><b style={{ fontSize: 14 }}>{L(lang, "공개 전 필수 확인", "Xác nhận trước khi công khai")}</b>
            </div>
            <div style={{ ...S.muted, fontSize: 11.5, marginBottom: 10 }}>{L(lang, "세 항목이 모두 확인되어야 공개됩니다.", "Cả 3 mục phải được xác nhận trước khi công khai.")}</div>
            {CHECK_ITEMS.map((c) => (
              <button key={c.id} style={{ ...S.checkRow, borderColor: checks[c.id] ? C.green2 : C.line }} onClick={() => setChecks((p) => ({ ...p, [c.id]: !p[c.id] }))}>
                <div style={{ ...S.checkBox, background: checks[c.id] ? C.green2 : "white" }}>{checks[c.id] && <Check size={13} color="white" />}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{L(lang, c.label, c.labelVi)}</div>
                  <div style={{ ...S.muted, fontSize: 11 }}>{L(lang, c.desc, c.descVi)}</div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ margin: "0 18px" }}>
            <button style={{ ...S.greenBtn, width: "100%", opacity: allChecked ? 1 : 0.4 }} disabled={!allChecked} onClick={submit}>
              {L(lang, "심사 제출", "Gửi xét duyệt")}
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <div style={{ ...S.card, textAlign: "center", padding: 26, margin: "0 18px" }}>
          <div style={S.doneCircle}><Check size={30} color="white" /></div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 14 }}>{draft?.name || L(lang, "내 사업", "Việc kinh doanh của tôi")}</div>
          <div style={{ ...S.muted, marginTop: 5 }}>{draft?.cat} · {draft?.hours} · {draft?.booking}</div>
          <div style={{ color: C.green2, fontWeight: 800, fontSize: 13, marginTop: 10 }}>{L(lang, "심사 대기 중 · 통상 1~2 영업일 · 승인 시 +50CP", "Đang chờ xét duyệt · Thường 1-2 ngày làm việc · Duyệt xong +50CP")}</div>
          <div style={{ ...S.muted, fontSize: 11, lineHeight: 1.7, marginTop: 12, textAlign: "left" }}>
            {L(lang, "승인 후 안내", "Sau khi được duyệt")}<br />
            {L(lang, "· 순위는 Consumer First Ranking으로만 결정됩니다 (광고비 미반영)", "· Xếp hạng chỉ theo Consumer First Ranking (không tính chi phí quảng cáo)")}<br />
            {L(lang, "· 리뷰는 실제 M4U 예약·결제 이용자만 작성할 수 있습니다", "· Chỉ khách đã đặt·thanh toán qua M4U mới viết được đánh giá")}<br />
            {L(lang, "· 초기에는 discovery boost로 최소 노출이 보장됩니다", "· Ban đầu được đảm bảo hiển thị tối thiểu qua discovery boost")}
          </div>
          <button style={{ ...S.greenBtn, width: "100%", marginTop: 16, background: `linear-gradient(135deg, ${C.gold}, #B08D45)`, color: "#2B1F0A" }} onClick={() => { setPartnerActive(true); earnCp(50, L(lang, "파트너 등록 승인", "Đăng ký đối tác được duyệt")); showToast(L(lang, "승인 완료! +50CP · MY BUSINESS 생성", "Đã duyệt! +50CP · MY BUSINESS đã được tạo")); goSub("mybiz"); }}>
            {L(lang, "관리자 승인 완료 → MY BUSINESS (데모)", "Admin duyệt xong → MY BUSINESS (demo)")}
          </button>
          <button style={{ ...S.greenBtn, width: "100%", marginTop: 8, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={closeSub}>{L(lang, "완료", "Hoàn tất")}</button>
        </div>
      )}
    </div>
  );
}

/* ─────────── MY BUSINESS (파트너 모드) ─────────── */

const SALON_BOOKINGS = [
  { time: "10:00", ko: "헤어컷 & 스타일링 · 김O아", vi: "Cắt tóc & tạo kiểu · Chị Kim" },
  { time: "13:00", ko: "두피 케어 스파 · 응우옌 O", vi: "Spa da đầu · Anh Nguyễn" },
  { time: "15:30", ko: "젤 네일 아트 · 박O진", vi: "Nail gel · Chị Park" },
  { time: "18:30", ko: "아로마 마사지 · 레O란", vi: "Massage aroma · Chị Lê" },
];

// Contributor Center 데모 지표 (모든 역할 공통 — Ecosystem Contribution)
const CONTRIB = { scans: 482, newUsers: 126, firstUse: 83, reviews: 61, score: 872, benefit: "186,000" };
const CONTRIB_QR = { cart: ["VEHICLE"], salon: ["MIRROR", "COUNTER"], host: ["ROOM A-1208", "LOBBY"] };

const HOST_TOP5 = [
  ["🍽", "Restaurant", "12,400,000"],
  ["💇", "M4U Salon", "9,800,000"],
  ["🛺", "Electric Cart", "7,200,000"],
  ["💆", "Massage", "6,900,000"],
  ["✈️", "Airport Transfer", "6,500,000"],
];

function MyBusinessScreen({ closeSub, showToast, lang }) {
  const [biz, setBiz] = useState("cart"); // cart | salon | host — 역할별 화면 구성 데모
  const [online, setOnline] = useState(true);
  const [price, setPrice] = useState(20000);
  const [stats, setStats] = useState({ calls: 12, bookings: 4, revenue: 320000, rating: 4.9, rank: 2 });
  const [callOpen, setCallOpen] = useState(true);
  const [riding, setRiding] = useState(false);
  const [qrLabel, setQrLabel] = useState(null); // Contributor QR 모달 (역할별 타입 라벨)
  const [aiInput, setAiInput] = useState("");
  const [aiLog, setAiLog] = useState([
    { from: "ai", text: L(lang, "사장님, 좋은 아침이에요 👋 매출 · 예약 · 가격 · 운영, 전부 말로 지시하시면 됩니다.", "Chào buổi sáng 👋 Doanh thu · lịch hẹn · giá · vận hành — chỉ cần nói với tôi.") },
  ]);

  const isCart = biz === "cart";
  const isHost = biz === "host";
  const bizName = isCart ? "GRAND PARK CART" : isHost ? "OCEAN RESIDENCE" : "M4U Salon & Spa";

  const aiReply = (x) => {
    if (/(기여|contributor|신규|유입)/i.test(x)) {
      return L(lang, `이번 달 QR 스캔 ${CONTRIB.scans}회 → 신규 가입 ${CONTRIB.newUsers}명 → 첫 이용 ${CONTRIB.firstUse}명 → Verified Review ${CONTRIB.reviews}건. Contribution Score ${CONTRIB.score}점, 기여 혜택 +${CONTRIB.benefit} VND 상당입니다. 기여점수는 랭킹에 반영되지 않습니다.`, `Tháng này: ${CONTRIB.scans} lượt quét QR → ${CONTRIB.newUsers} thành viên mới → ${CONTRIB.firstUse} lần dùng đầu → ${CONTRIB.reviews} Verified Review. Điểm đóng góp ${CONTRIB.score}, ưu đãi +${CONTRIB.benefit} VND. Điểm này không ảnh hưởng xếp hạng.`);
    }
    if (isHost) {
      if (/(리워드|보상|reward|thưởng)/i.test(x)) return L(lang, "이번 달 Host Reward는 856,000 VND입니다. 투숙객 Local GMV 42,800,000 VND 기준이며, 정산은 매월 10일에 지급됩니다.", "Host Reward tháng này: 856.000 VND, dựa trên Guest Local GMV 42.800.000 VND. Thanh toán ngày 10 hằng tháng.");
      if (/(gmv|매출|소비|이용)/i.test(x)) return L(lang, "이번 달 투숙 47팀 중 39팀이 QR 접속, 31팀이 실제 서비스를 이용했어요. 가장 많이 쓴 건 Restaurant → Salon → E-카트 순입니다.", "47 nhóm khách, 39 nhóm quét QR, 31 nhóm dùng dịch vụ. Nhiều nhất: Nhà hàng → Salon → Xe điện.");
      if (/(qr|큐알|객실|room)/i.test(x)) { setQrLabel("ROOM A-1208"); return L(lang, "객실 QR을 띄웠어요. 12개 객실 모두 발급 완료 상태입니다. 새 객실 추가 시 '객실 추가'라고 말씀해 주세요.", "Đã mở QR phòng. Cả 12 phòng đã được cấp mã. Nói 'thêm phòng' để tạo mã mới."); }
      return L(lang, `이렇게 말씀해 보세요: "이번 달 리워드 알려줘" · "투숙객 이용 현황" · "객실 QR 보여줘"`, `Thử nói: "thưởng tháng này" · "tình hình khách dùng dịch vụ" · "QR phòng"`);
    }
    const priceM = x.match(/(\d[\d,\.]{2,})\s*(동|đ|vnd)?/i);
    if (/(가격|요금|giá)/i.test(x) && priceM) {
      const p = parseInt(priceM[1].replace(/[,\.]/g, ""), 10);
      setPrice(p);
      return L(lang, `기본요금을 ${vnd(p)}으로 변경했습니다. 지금부터 신규 ${isCart ? "호출" : "예약"}에 적용됩니다.`, `Đã đổi giá cơ bản thành ${vnd(p)}. Áp dụng cho ${isCart ? "cuốc" : "lịch hẹn"} mới từ bây giờ.`);
    }
    if (/(중단|중지|멈|쉬|dừng|tạm)/i.test(x)) {
      setOnline(false);
      return L(lang, `${bizName} 운영을 중단했습니다. 신규 ${isCart ? "호출" : "예약"} 접수가 멈춥니다. 재개하려면 "운영 시작"이라고 말씀해 주세요.`, `Đã tạm dừng ${bizName}. Ngừng nhận ${isCart ? "cuốc" : "lịch"} mới. Nói "mở lại" để tiếp tục.`);
    }
    if (/(시작|재개|열어|켜|mở|bật)/i.test(x)) {
      setOnline(true);
      return L(lang, "운영을 재개했습니다. 다시 ONLINE 상태입니다.", "Đã mở lại. Trạng thái ONLINE.");
    }
    if (/(매출|정산|doanh thu)/i.test(x)) {
      return L(lang, `오늘 매출은 ${vnd(stats.revenue)}입니다. ${isCart ? `호출 ${stats.calls}건 · 예약 ${stats.bookings}건` : `예약 ${SALON_BOOKINGS.length}건 완료 예정`} · 평균 리뷰 ${stats.rating}점이에요.`, `Doanh thu hôm nay: ${vnd(stats.revenue)}. ${isCart ? `${stats.calls} cuốc · ${stats.bookings} đặt trước` : `${SALON_BOOKINGS.length} lịch hẹn`} · Đánh giá TB ${stats.rating}.`);
    }
    if (/(예약|일정|lịch|đặt)/i.test(x)) {
      return L(lang, `내일 예약 ${SALON_BOOKINGS.length}건입니다: ${SALON_BOOKINGS.map((b) => b.time).join(" / ")}. 캘린더에 정리해 두었어요.`, `Ngày mai có ${SALON_BOOKINGS.length} lịch: ${SALON_BOOKINGS.map((b) => b.time).join(" / ")}. Đã sắp xếp vào lịch.`);
    }
    if (/(리뷰|평가|đánh giá)/i.test(x)) {
      return L(lang, `최근 리뷰 평균 ${stats.rating}점, ZONE ${stats.rank}위입니다. 순위는 Consumer First Ranking 기준으로만 계산됩니다.`, `Đánh giá TB ${stats.rating}, hạng ${stats.rank} trong ZONE. Xếp hạng chỉ theo Consumer First Ranking.`);
    }
    return L(lang, `이렇게 말씀해 보세요: "오늘 매출 알려줘" · "내일 예약 정리해줘" · "가격 25,000동으로 바꿔줘" · "운영 중단해줘"`, `Thử nói: "doanh thu hôm nay" · "lịch ngày mai" · "đổi giá 25.000đ" · "tạm dừng"`);
  };

  const sendAi = (text) => {
    const msg = (text ?? aiInput).trim();
    if (!msg) return;
    const reply = aiReply(msg);
    setAiLog((l) => [...l, { from: "user", text: msg }, { from: "ai", text: reply }]);
    setAiInput("");
  };

  const acceptCall = () => {
    setCallOpen(false); setRiding(true);
    setStats((s) => ({ ...s, calls: s.calls + 1, revenue: s.revenue + price }));
    showToast(L(lang, `호출 수락 · +${vnd(price)}`, `Đã nhận cuốc · +${vnd(price)}`));
  };

  const chips = isHost
    ? (lang === "ko" ? ["이번 달 리워드 알려줘", "투숙객 이용 현황", "객실 QR 보여줘"] : ["Thưởng tháng này", "Tình hình khách", "QR phòng"])
    : lang === "ko"
    ? ["오늘 매출 알려줘", "내일 예약 정리해줘", `가격 25,000동으로 바꿔줘`, online ? "운영 중단해줘" : "운영 시작해줘"]
    : ["Doanh thu hôm nay", "Lịch ngày mai", "Đổi giá 25.000đ", online ? "Tạm dừng" : "Mở lại"];

  return (
    <div style={S.scroll}>
      <SubHead title="MY BUSINESS" onBack={closeSub} />

      <div style={{ display: "flex", gap: 8, padding: "6px 18px 0", flexWrap: "wrap" }}>
        {[["cart", "🛺 GRAND PARK CART"], ["salon", "💇 M4U Salon"], ["host", "🏨 Ocean Residence"]].map(([k, label]) => (
          <button key={k} style={{ ...S.chipBtn, background: biz === k ? C.green : C.ivory, color: biz === k ? "white" : C.text }} onClick={() => setBiz(k)}>{label}</button>
        ))}
      </div>
      <div style={{ ...S.muted, fontSize: 10, padding: "6px 18px 0" }}>{L(lang, "데모: 역할(카트·살롱·Host)에 따라 관리 화면이 자동으로 다르게 구성됩니다", "Demo: giao diện quản lý tự đổi theo vai trò (xe · salon · host)")}</div>

      <div style={{ ...S.walletHero, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={S.smallGold}>{isHost ? "M4U PARTNER · HOST" : "M4U PARTNER"}</div>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3 }}>{bizName}</div>
          {isHost ? (
            <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 5, color: C.gold }}>★ M4U RECOMMENDED STAY · 12 Rooms</div>
          ) : (
            <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 5, color: online ? "#7FD8A8" : "#E8A87C" }}>
              ● {online ? "ONLINE" : "OFFLINE"} {riding && isCart && online ? L(lang, " · 운행 중", " · Đang chạy") : ""}
            </div>
          )}
        </div>
        {!isHost && (
          <button
            style={{ ...S.smallGreenBtn, background: online ? "rgba(255,255,255,.14)" : C.gold, color: online ? "white" : "#2B1F0A", display: "flex", gap: 5, alignItems: "center" }}
            onClick={() => { setOnline(!online); showToast(online ? L(lang, "운영 중단됨", "Đã tạm dừng") : L(lang, "운영 재개됨", "Đã mở lại")); }}
          >
            <Power size={13} /> {online ? L(lang, "중단", "Dừng") : L(lang, "시작", "Mở")}
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, padding: "0 18px" }}>
        {(isHost
          ? [[L(lang, "객실", "Phòng"), 12], [L(lang, "투숙", "Nhóm ở"), "47"], [L(lang, "QR 접속", "Quét QR"), 39], [L(lang, "이용", "Sử dụng"), 31], ["Reward", "856K"]]
          : isCart
          ? [[L(lang, "호출", "Cuốc"), stats.calls], [L(lang, "예약", "Đặt"), stats.bookings], [L(lang, "매출", "D.thu"), `${Math.round(stats.revenue / 1000)}K`], [L(lang, "리뷰", "Đ.giá"), `${stats.rating}⭐`], ["ZONE", `#${stats.rank}`]]
          : [[L(lang, "예약", "Lịch"), SALON_BOOKINGS.length], [L(lang, "고객", "Khách"), 38], [L(lang, "매출", "D.thu"), "1.2M"], [L(lang, "리뷰", "Đ.giá"), "4.9⭐"], ["ZONE", "#1"]]
        ).map(([k, v2]) => (
          <div key={k} style={{ ...S.card, padding: "10px 4px", textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{v2}</div>
            <div style={{ ...S.muted, fontSize: 9.5, marginTop: 2 }}>{k}</div>
          </div>
        ))}
      </div>

      {isHost ? (
        <>
          <div style={{ ...S.card, margin: "12px 18px 0", border: `1.5px solid ${C.gold}` }}>
            <div style={S.smallGoldDark}>TRANSACTION · {L(lang, "이번 달 Guest Local GMV", "Guest Local GMV tháng này")}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <b style={{ fontSize: 20 }}>42,800,000 VND</b>
              <span style={{ color: C.green2, fontWeight: 800, fontSize: 13 }}>Host Reward 856,000 VND</span>
            </div>
            <div style={{ ...S.muted, fontSize: 10.5, marginTop: 6 }}>{L(lang, "투숙객이 QR로 이용한 지역 서비스 결제 합계 · 정산 매월 10일", "Tổng thanh toán dịch vụ địa phương qua QR của khách · Thanh toán ngày 10 hằng tháng")}</div>
          </div>

          <div style={S.sectionTitle2}>{L(lang, "투숙객이 가장 많이 이용한 서비스", "Dịch vụ khách dùng nhiều nhất")}</div>
          {HOST_TOP5.map(([e, name, amt], i) => (
            <div key={name} style={{ ...S.card, margin: "0 18px 6px", display: "flex", gap: 12, alignItems: "center", padding: "10px 14px" }}>
              <b style={{ fontSize: 12, color: i === 0 ? C.gold : C.muted, minWidth: 14 }}>{i + 1}</b>
              <span style={{ fontSize: 16 }}>{e}</span>
              <b style={{ flex: 1, fontSize: 13 }}>{name}</b>
              <span style={{ ...S.muted, fontSize: 11.5 }}>{amt} VND</span>
            </div>
          ))}

          <div style={{ ...S.card, margin: "10px 18px 0", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={S.habitIcon}><QrCode size={18} color={C.green} /></div>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>{L(lang, "객실 Guest QR", "QR phòng cho khách")}</b>
              <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "12개 객실 발급 완료 · ROOM A-1208 → HOST 귀속", "Đã cấp cho 12 phòng · ROOM A-1208 → thuộc HOST")}</div>
            </div>
            <button style={S.smallGreenBtn} onClick={() => setQrLabel("ROOM A-1208")}>{L(lang, "QR 보기", "Xem QR")}</button>
          </div>

          <div style={{ ...S.muted, fontSize: 10.5, margin: "10px 18px 4px", lineHeight: 1.6 }}>
            <ShieldCheck size={11} color={C.green2} /> {L(lang, "투숙객 개인별 결제 내역은 표시되지 않습니다 — Host에게는 집계 수치와 카테고리만 제공됩니다. 귀속은 체크인~체크아웃 기간에 한하며, 본인 계정 결제는 보상에서 제외됩니다.", "Không hiển thị chi tiết thanh toán của từng khách — Host chỉ xem số liệu tổng hợp theo danh mục. Chỉ tính trong thời gian lưu trú; thanh toán từ tài khoản của Host bị loại khỏi thưởng.")}
          </div>
        </>
      ) : isCart ? (
        online && callOpen ? (
          <div style={{ ...S.card, margin: "12px 18px 0", border: `1.5px solid ${C.gold}` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
              <Bell size={14} color={C.gold} /><b style={{ fontSize: 13 }}>{L(lang, "새로운 호출", "Cuốc mới")}</b>
            </div>
            <div style={{ textAlign: "center", fontSize: 13.5, fontWeight: 700, lineHeight: 1.9 }}>
              Ocean Residence<br /><span style={{ color: C.muted }}>↓</span><br />M4U Salon
            </div>
            <div style={{ ...S.muted, textAlign: "center", fontSize: 11.5, marginTop: 6 }}>1.2 km · {vnd(price)}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...S.greenBtn, flex: 1, padding: 11, fontSize: 13, background: C.ivory, color: C.text, border: `1px solid ${C.line}` }} onClick={() => { setCallOpen(false); showToast(L(lang, "호출을 거절했습니다", "Đã từ chối cuốc")); }}>{L(lang, "거절", "Từ chối")}</button>
              <button style={{ ...S.greenBtn, flex: 1, padding: 11, fontSize: 13 }} onClick={acceptCall}>{L(lang, "수락", "Nhận")}</button>
            </div>
          </div>
        ) : riding && online ? (
          <div style={{ ...S.card, margin: "12px 18px 0", display: "flex", gap: 10, alignItems: "center" }}>
            <div style={S.habitIcon}>🛺</div>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>{L(lang, "운행 중 · Ocean Residence → M4U Salon", "Đang chạy · Ocean Residence → M4U Salon")}</b>
              <div style={{ ...S.muted, fontSize: 11, marginTop: 2 }}>{L(lang, "15:42 도착 예정 · 완료 시 매출 자동 반영", "Đến lúc 15:42 · Doanh thu tự cập nhật khi hoàn tất")}</div>
            </div>
          </div>
        ) : null
      ) : (
        <>
          <div style={S.sectionTitle2}>{L(lang, "오늘 예약", "Lịch hẹn hôm nay")}</div>
          {SALON_BOOKINGS.map((b) => (
            <div key={b.time} style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 12, alignItems: "center" }}>
              <b style={{ fontSize: 13, minWidth: 44 }}>{b.time}</b>
              <div style={{ flex: 1, fontSize: 12.5 }}>{L(lang, b.ko, b.vi)}</div>
              <span style={S.pill}>{L(lang, "확정", "Đã xác nhận")}</span>
            </div>
          ))}
          <div style={{ ...S.card, margin: "4px 18px 0", display: "flex", gap: 10, alignItems: "center" }}>
            <TrendingUp size={16} color={C.gold} />
            <div style={{ flex: 1, fontSize: 12 }}>{L(lang, "이번 주 프로모션: 두피 스파 -15% 진행 중", "Khuyến mãi tuần: Spa da đầu -15% đang chạy")}</div>
          </div>
        </>
      )}

      <div style={{ ...S.sectionTitle2, display: "flex", gap: 6, alignItems: "center" }}>
        🌐 CONTRIBUTOR CENTER
        <span style={{ ...S.pill, background: "rgba(198,161,91,.16)", color: "#8A6A2E", marginLeft: "auto" }}>★ Gold Contributor</span>
      </div>
      <div style={{ ...S.card, margin: "0 18px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <b style={{ fontSize: 13.5 }}>{L(lang, "이번 달 생태계 기여", "Đóng góp hệ sinh thái tháng này")}</b>
          <b style={{ fontSize: 15, color: C.green2 }}>Score {CONTRIB.score}</b>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
          {[[L(lang, "QR 스캔", "Quét QR"), CONTRIB.scans], [L(lang, "신규 가입", "TV mới"), CONTRIB.newUsers], [L(lang, "첫 이용", "Dùng đầu"), CONTRIB.firstUse], ["Verified", CONTRIB.reviews]].map(([k, v2], i) => (
            <div key={k} style={{ textAlign: "center", padding: "8px 2px", borderRadius: 10, background: "rgba(14,90,62,.05)" }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{v2}</div>
              <div style={{ ...S.muted, fontSize: 9 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ fontSize: 12 }}>{L(lang, "이번 달 기여 혜택", "Ưu đãi đóng góp tháng này")}</span>
          <b style={{ fontSize: 13.5, color: C.gold }}>+{CONTRIB.benefit} VND {L(lang, "상당", "tương đương")}</b>
        </div>
      </div>
      <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 10, alignItems: "center" }}>
        <b style={{ fontSize: 12.5, minWidth: 46 }}>{L(lang, "내 QR", "QR của tôi")}</b>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {(CONTRIB_QR[biz] || []).map((q) => (
            <button key={q} style={{ ...S.chipBtn, padding: "8px 11px", fontSize: 11 }} onClick={() => setQrLabel(q)}>{q}</button>
          ))}
        </div>
      </div>
      <div style={{ ...S.card, margin: "0 18px 8px", display: "flex", gap: 10, alignItems: "center", background: C.green, border: 0 }}>
        <Sparkles size={15} color={C.gold} />
        <div style={{ flex: 1, fontSize: 12, color: "white", lineHeight: 1.55 }}>
          {L(lang, `이번 달 귀하의 QR을 통해 ${CONTRIB.newUsers}명의 신규 사용자가 M4U에 들어왔습니다.`, `Tháng này, ${CONTRIB.newUsers} người dùng mới đã vào M4U qua QR của bạn.`)}
        </div>
      </div>
      <div style={{ ...S.muted, fontSize: 10.5, margin: "0 18px 4px", lineHeight: 1.6 }}>
        {L(lang, "기여점수는 검색·랭킹에 반영되지 않습니다(배지·별도 노출만). 보상은 검증된 활동(가입→첫 이용→Verified Review) 기준이며, 유입 기록은 영구 보존되지만 보상은 가입 후 90일 내 활동까지 적용됩니다.", "Điểm đóng góp không ảnh hưởng tìm kiếm · xếp hạng (chỉ huy hiệu · khu hiển thị riêng). Thưởng dựa trên hoạt động đã xác minh (đăng ký → dùng đầu → Verified Review); ghi nhận vĩnh viễn nhưng thưởng chỉ áp dụng trong 90 ngày sau đăng ký.")}
      </div>

      <div style={{ ...S.sectionTitle2, display: "flex", gap: 6, alignItems: "center" }}>🤖 AI MANAGER</div>
      <div style={{ display: "flex", gap: 6, padding: "0 18px 8px", flexWrap: "wrap" }}>
        {chips.map((x) => <button key={x} style={S.aiChip} onClick={() => sendAi(x)}>{x}</button>)}
      </div>
      <div style={{ ...S.card, margin: "0 18px 10px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 240, overflowY: "auto" }}>
        {aiLog.map((m, i) => (
          <div key={i} style={{
            ...S.chatBubble, margin: 0, maxWidth: "88%",
            alignSelf: m.from === "user" ? "flex-end" : "flex-start",
            background: m.from === "user" ? C.green : "#F0ECE3",
            color: m.from === "user" ? "white" : C.text,
            fontSize: 12.5,
          }}>
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 18px 20px" }}>
        <input
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendAi()}
          placeholder={L(lang, "예) 가격 25,000동으로 바꿔줘", "VD) đổi giá 25.000đ")}
          style={S.chatInput}
        />
        <button onClick={() => sendAi()} style={S.sendBtn}><Send size={17} /></button>
      </div>

      {qrLabel && (
        <Modal title={`${L(lang, "M4U Contributor QR", "QR Contributor M4U")} · ${qrLabel}`} onClose={() => setQrLabel(null)}>
          <div style={S.qrBox}>
            <div style={S.qrGrid}>
              {Array.from({ length: 81 }).map((_, i) => (
                <div key={i} style={{ background: (i * 11 + 5) % 5 < 3 ? C.green : "transparent" }} />
              ))}
            </div>
          </div>
          <div style={{ ...S.muted, textAlign: "center", fontSize: 11.5, lineHeight: 1.6, marginBottom: 14 }}>
            {L(lang, "매장·객실·차량에 비치하면 스캔한 사용자가 M4U로 유입되고, 유입 기여가 내 Contributor ID에 기록됩니다.", "Đặt tại cửa hàng · phòng · xe — người quét sẽ vào M4U và lượt giới thiệu được ghi cho Contributor ID của bạn.")}
          </div>
          <button style={{ ...S.greenBtn, width: "100%" }} onClick={() => { setQrLabel(null); showToast(L(lang, "QR 이미지가 저장되었습니다 (데모)", "Đã lưu ảnh QR (demo)")); }}>
            {L(lang, "QR 이미지 저장 · 인쇄", "Lưu · In QR")}
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ─────────── AI SHEET ─────────── */

function AISheet({ onClose, chat, setChat, goSub, setTab, lang, t }) {
  const [input, setInput] = useState("");
  const ko = lang === "ko";

  const reply = (x) => {
    if (/(스테이|숙소|방|레지던스|체크인)/.test(x)) return [
      { from: "ai", type: "text", text: ko ? "스테이 예약을 도와드릴게요. 오션뷰 스튜디오가 이번 주 예약 가능해요." : "Tôi sẽ giúp bạn đặt lưu trú. Studio view biển còn trống tuần này." },
      { from: "ai", type: "action", label: ko ? "스테이 찾기" : "Tìm lưu trú", act: () => { onClose(); setTab("stay"); } },
    ];
    if (/(맛집|식당|먹|밥|quán|ăn)/i.test(x)) return [
      { from: "ai", type: "text", text: ko ? "단지 내 Consumer First 상위 맛집을 추천드려요." : "Đây là các quán ăn được xếp hạng cao trong khu theo Consumer First Ranking." },
      { from: "ai", type: "venues", ids: ["v2", "v5"] },
    ];
    if (/(살롱|salon|미용|헤어|스파|예약|đặt)/i.test(x)) return [
      { from: "ai", type: "text", text: ko ? "M4U Salon & Spa 예약을 도와드릴게요. 오늘 14:00, 15:30이 여유 있어요." : "Salon M4U còn trống lúc 14:00 và 15:30 hôm nay." },
      { from: "ai", type: "action", label: ko ? "Salon 바로 예약" : "Đặt Salon ngay", act: () => { onClose(); goSub("venue", { venueId: "v1" }); } },
    ];
    if (/(카트|이동|택시|차량|xe)/i.test(x)) return [
      { from: "ai", type: "text", text: ko ? "E-카트를 배차해 드릴게요. 3분 내 도착 가능한 카트가 있어요." : "Xe điện có thể đến trong 3 phút." },
      { from: "ai", type: "action", label: ko ? "E-카트 호출하기" : "Gọi xe điện", act: () => { onClose(); goSub("cat", { cat: "이동·렌트" }); } },
    ];
    if (/(통역|번역|말이 안|언어|thông dịch|dịch)/i.test(x)) return [
      { from: "ai", type: "text", text: ko ? "통역 지원을 연결해 드릴게요. 컨시어지에서 실시간 통역 요청이 가능합니다." : "Tôi sẽ kết nối hỗ trợ thông dịch. Bạn có thể yêu cầu thông dịch trực tiếp qua lễ tân." },
      { from: "ai", type: "action", label: ko ? "컨시어지 열기" : "Mở lễ tân", act: () => { onClose(); goSub("residence"); } },
    ];
    if (/(할인|공동구매|five|혜택|투표|ưu đãi)/i.test(x)) return [
      { from: "ai", type: "text", text: ko ? "지갑에서 공동구매 3건과 커뮤니티 투표 2건이 진행 중이에요." : "Có 3 phòng mua chung và 2 cuộc bỏ phiếu đang diễn ra trong Ví." },
      { from: "ai", type: "action", label: ko ? "지갑 열기" : "Mở ví", act: () => { onClose(); setTab("wallet"); } },
    ];
    return [{ from: "ai", type: "text", text: ko ? "네! 스테이 · 맛집 · 예약 · 이동 · 통역 · 혜택 중 말씀해 주세요." : "Bạn cần gì? Đặt chỗ, quán ăn, gọi xe, thông dịch hay ưu đãi?" }];
  };

  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setChat((c) => [...c, { from: "user", type: "text", text: msg }, ...reply(msg)]);
    setInput("");
  };

  const chips = ko
    ? ["스테이 예약", "맛집 추천", "E-카트 호출", "통역 지원", "혜택·투표"]
    : ["Quán ăn ngon", "Đặt Salon", "Gọi xe điện", "Thông dịch", "Ưu đãi"];

  return (
    <div style={S.aiBackdrop} onClick={onClose}>
      <div style={S.aiSheet} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 8px" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Sparkles size={17} color={C.gold} />
            <b style={{ fontSize: 15 }}>{t.aiName}</b>
            <span style={{ ...S.verifiedBadge, fontSize: 8.5 }}>{ko ? "한국어" : "Tiếng Việt"}</span>
          </div>
          <button style={S.iconBtn} onClick={onClose}><X size={19} color={C.muted} /></button>
        </div>
        <div style={{ display: "flex", gap: 6, padding: "6px 18px 10px", flexWrap: "wrap" }}>
          {chips.map((x) => <button key={x} style={S.aiChip} onClick={() => send(x)}>{x}</button>)}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          {chat.map((m, i) => {
            if (m.type === "venues") return (
              <div key={i}>
                {m.ids.map((id) => {
                  const v = VENUES.find((y) => y.id === id);
                  return (
                    <div key={id} style={{ ...S.listCard, margin: "0 18px 8px" }} onClick={() => { onClose(); goSub("venue", { venueId: id }); }}>
                      <img src={v.img} alt="" style={{ ...S.listImg, width: 50, height: 50 }} />
                      <div style={{ flex: 1 }}>
                        <b style={{ fontSize: 13 }}>{venueName(v, lang)}</b>
                        <div style={{ ...S.muted, fontSize: 11 }}>⭐ {v.rating} · {L(lang, v.walk, v.walkVi)}</div>
                      </div>
                      <ChevronRight size={16} color={C.muted} />
                    </div>
                  );
                })}
              </div>
            );
            if (m.type === "action") return (
              <button key={i} style={{ ...S.greenBtn, margin: "0 18px", alignSelf: "flex-start", padding: "10px 16px", fontSize: 13 }} onClick={m.act}>
                {m.label} <ChevronRight size={14} />
              </button>
            );
            return (
              <div key={i} style={{
                ...S.chatBubble,
                alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                background: m.from === "user" ? C.green : "#F0ECE3",
                color: m.from === "user" ? "white" : C.text,
              }}>
                {m.text}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, padding: "10px 18px 18px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={ko ? "무엇이든 물어보세요..." : "Hỏi tôi bất cứ điều gì..."}
            style={S.chatInput}
          />
          <button onClick={() => send()} style={S.sendBtn}><Send size={17} /></button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── COMMON UI ─────────── */

function TabHead({ title, right }) {
  return (
    <div style={S.tabHead}>
      <div style={{ fontSize: 20, fontWeight: 800 }}>{title}</div>
      <div>{right}</div>
    </div>
  );
}

function SubHead({ title, onBack }) {
  return (
    <div style={{ ...S.tabHead, gap: 10, justifyContent: "flex-start" }}>
      <button style={S.iconBtn} onClick={onBack}><ArrowLeft size={20} color={C.text} /></button>
      <div style={{ fontSize: 17, fontWeight: 800 }}>{title}</div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={S.modalBackdrop} onClick={onClose}>
      <div style={S.modalSheet} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <b style={{ fontSize: 15 }}>{title}</b>
          <button onClick={onClose} style={S.iconBtn}><X size={19} color={C.muted} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Row2({ a, b, strong }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.line}`, fontSize: 13 }}>
      <span style={{ fontWeight: strong ? 800 : 400 }}>{a}</span>
      <span style={{ fontWeight: strong ? 800 : 600, textAlign: "right" }}>{b}</span>
    </div>
  );
}

function Countdown({ endsAt }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const x = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(x); }, []);
  const left = Math.max(0, endsAt - now);
  const h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000), s = Math.floor((left % 60000) / 1000);
  return <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700, color: h < 24 ? C.red : C.green2 }}>{h}h {String(m).padStart(2, "0")}m {String(s).padStart(2, "0")}s</span>;
}

function BottomNav({ mode, t, tab, setTab, cartCount }) {
  const items = [
    ["home", <Home size={20} />, t.home],
    ["living", <Compass size={20} />, t.living],
    ["habit", <Leaf size={20} />, t.habit],
    ["salon", <Scissors size={20} />, t.salon],
    ["my", <User size={20} />, t.my],
  ];
  return (
    <div style={S.bottomNav}>
      {items.map(([key, icon, label]) => (
        <button key={key} onClick={() => setTab(key)} style={{ ...S.navBtn, color: tab === key ? C.green : "#9B9689" }}>
          <div style={{ position: "relative" }}>
            {icon}
            {key === "order" && cartCount > 0 && <span style={S.cartDot}>{cartCount}</span>}
          </div>
          <span style={{ fontSize: 10, fontWeight: tab === key ? 800 : 500 }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

/* ─────────── STYLES ─────────── */

const S = {
  page: { minHeight: "100vh", background: "#D9D4CA", display: "flex", justifyContent: "center", alignItems: "center", padding: 24, fontFamily: 'Inter, Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: C.text },
  phone: { width: 390, height: 844, background: C.cream, borderRadius: 34, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,.22)", position: "relative", border: "1px solid rgba(0,0,0,.1)" },
  scroll: { height: "calc(100% - 68px)", overflowY: "auto", background: C.cream, paddingBottom: 24 },

  onboard: { height: "100%", background: `linear-gradient(180deg, ${C.green} 0%, #052B1E 100%)`, display: "flex", flexDirection: "column", justifyContent: "flex-end" },
  archOuter: { width: 180, height: 235, margin: "50px auto 0", border: `2px solid ${C.gold}`, borderRadius: "90px 90px 0 0", display: "grid", placeItems: "center", background: "rgba(255,255,255,.03)" },
  archInner: { width: 132, height: 188, border: `1px solid rgba(198,161,91,.5)`, borderRadius: "66px 66px 0 0", background: "linear-gradient(180deg, rgba(198,161,91,.14), transparent)" },
  onboardCopy: { color: "rgba(255,255,255,.9)", fontSize: 15, lineHeight: 1.7, marginTop: 22, fontWeight: 500 },
  onboardIcons: { display: "flex", gap: 8, padding: "28px 28px 24px" },
  goldButton: { width: "100%", border: 0, borderRadius: 999, background: `linear-gradient(135deg, ${C.gold}, #B08D45)`, color: "#2B1F0A", padding: 15, fontWeight: 800, fontSize: 15, cursor: "pointer" },
  ghostLink: { width: "100%", background: "transparent", border: 0, color: "rgba(255,255,255,.75)", marginTop: 14, fontSize: 13.5, cursor: "pointer" },
  langBtn: { display: "flex", gap: 12, alignItems: "center", background: "rgba(255,255,255,.07)", border: `1px solid rgba(198,161,91,.4)`, borderRadius: 16, padding: "15px 16px", color: "white", cursor: "pointer" },
  brandGold: { color: C.gold, fontFamily: "Georgia, serif", letterSpacing: 1, fontWeight: 700 },

  brand: { color: C.green, fontFamily: "Georgia, serif", fontSize: 24, letterSpacing: 1, fontWeight: 700 },
  brandSub: { color: C.gold, fontSize: 10, letterSpacing: 3, fontWeight: 700 },
  homeHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 18px 12px" },
  zonePill: { display: "flex", gap: 5, alignItems: "center", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 999, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: C.text },
  pointPill: { display: "flex", gap: 7, alignItems: "center", background: C.green, color: "white", border: 0, borderRadius: 999, padding: "7px 12px", cursor: "pointer" },
  pointM: { width: 20, height: 20, borderRadius: "50%", background: C.gold, color: C.green, fontWeight: 900, fontSize: 12, display: "grid", placeItems: "center" },
  pointMSmall: { width: 13, height: 13, borderRadius: "50%", background: C.gold, color: C.green, fontWeight: 900, fontSize: 9, display: "inline-grid", placeItems: "center" },
  searchBar: { margin: "14px 18px 0", width: "calc(100% - 36px)", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 999, padding: "13px 16px", cursor: "pointer" },
  catRow: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, padding: "16px 12px 4px" },
  catItem: { background: "transparent", border: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" },
  catCircle: { width: 46, height: 46, borderRadius: "50%", background: C.ivory, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", fontSize: 19 },
  cartBanner: { margin: "16px 18px 0", background: `linear-gradient(135deg, ${C.green}, #0B4A34)`, borderRadius: 18, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", border: "1px solid rgba(198,161,91,.35)" },
  stayHero: { margin: "16px 18px 4px", background: `linear-gradient(135deg, ${C.green}, #0B4A34)`, borderRadius: 18, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", border: "1px solid rgba(198,161,91,.35)", gap: 10 },
  bannerBtn: { marginTop: 10, background: "transparent", border: `1px solid ${C.gold}`, color: C.gold, borderRadius: 999, padding: "7px 16px", fontSize: 12, fontWeight: 800, cursor: "pointer" },
  rowBetween: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 18px 10px" },
  sectionTitle: { fontSize: 15, fontWeight: 800 },
  sectionTitle2: { fontSize: 14, fontWeight: 800, padding: "18px 18px 10px" },
  hScroll: { display: "flex", gap: 12, overflowX: "auto", padding: "0 18px 6px" },
  hScrollTight: { display: "flex", gap: 8, overflowX: "auto", padding: "0 18px" },
  popCard: { minWidth: 150, maxWidth: 150, cursor: "pointer" },
  popImg: { width: 150, height: 110, borderRadius: 14, objectFit: "cover", display: "block" },
  rankTag: { position: "absolute", top: 8, left: 8, background: C.green, color: "white", fontSize: 9.5, fontWeight: 800, borderRadius: 999, padding: "3px 8px", display: "flex", gap: 3, alignItems: "center" },
  heartBtn: { position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,.28)", border: 0, borderRadius: "50%", width: 26, height: 26, display: "grid", placeItems: "center", cursor: "pointer" },
  trustCard: { margin: "14px 18px 4px", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 14, padding: 12, display: "flex", gap: 10, alignItems: "center" },

  card: { background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 },
  listCard: { margin: "0 18px 10px", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 16, padding: 12, display: "flex", gap: 12, alignItems: "center", cursor: "pointer" },
  listImg: { width: 62, height: 62, borderRadius: 12, objectFit: "cover" },
  muted: { color: C.muted, fontSize: 12 },
  smallGold: { color: C.gold, fontSize: 10.5, letterSpacing: 0.6, fontWeight: 800 },
  smallGoldDark: { color: C.gold, fontSize: 10, letterSpacing: 0.6, fontWeight: 800, marginBottom: 3 },
  pill: { background: "rgba(14,90,62,.1)", color: C.green2, fontSize: 11, fontWeight: 800, borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap", display: "inline-flex", gap: 4, alignItems: "center" },
  verifiedBadge: { display: "inline-flex", gap: 3, alignItems: "center", background: "rgba(14,90,62,.1)", color: C.green2, fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "3px 7px" },
  boostBadge: { display: "inline-flex", gap: 3, alignItems: "center", background: "rgba(198,161,91,.16)", color: "#8A6A2E", fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "3px 7px" },
  greenBtn: { background: C.green, color: "white", border: 0, borderRadius: 12, padding: 13, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", gap: 6, alignItems: "center", justifyContent: "center" },
  smallGreenBtn: { background: C.green, color: "white", border: 0, borderRadius: 10, padding: "9px 13px", fontWeight: 800, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" },
  iconBtn: { background: "transparent", border: 0, padding: 3, cursor: "pointer", position: "relative", display: "grid", placeItems: "center" },
  tabHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 18px 8px" },
  grid4: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, padding: "8px 18px" },
  quick: { background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 14, padding: "13px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" },

  circleBtn: { position: "absolute", top: 14, background: "rgba(255,253,248,.92)", border: 0, borderRadius: "50%", width: 34, height: 34, display: "grid", placeItems: "center", cursor: "pointer", color: C.text },
  logoCircle: { position: "absolute", left: 18, bottom: -24, width: 58, height: 58, borderRadius: "50%", background: C.green, color: C.gold, fontFamily: "Georgia, serif", fontWeight: 800, fontSize: 13, display: "grid", placeItems: "center", border: `3px solid ${C.cream}` },
  featureRow: { display: "flex", gap: 4, margin: "16px 18px 0", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 14, padding: "12px 6px" },
  tabRow: { display: "flex", margin: "16px 18px 6px", borderBottom: `1px solid ${C.line}` },
  tabItem: { flex: 1, background: "transparent", border: 0, padding: "10px 0", fontSize: 13.5, fontWeight: 800, cursor: "pointer" },
  serviceCard: { margin: "8px 18px", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 16, padding: 12, display: "flex", gap: 12, alignItems: "center" },
  serviceImg: { width: 62, height: 62, borderRadius: 12, objectFit: "cover" },
  fixedCta: { position: "absolute", bottom: 68, left: 0, right: 0, padding: "10px 18px 12px", background: "linear-gradient(180deg, rgba(245,241,232,0), rgba(245,241,232,.95) 30%)" },

  prodGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 18px" },
  prodImg: { width: "100%", height: 150, borderRadius: 14, objectFit: "cover", display: "block" },
  officialBadge: { background: C.green, color: "white", fontSize: 9.5, fontWeight: 800, borderRadius: 5, padding: "3px 6px", verticalAlign: "middle", marginLeft: 4 },
  tagBadge: { display: "inline-flex", gap: 4, alignItems: "center", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 9px", fontSize: 10.5, fontWeight: 700 },
  accordion: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: 0, borderBottom: `1px solid ${C.line}`, padding: "12px 2px", fontSize: 13.5, fontWeight: 800, cursor: "pointer", color: C.text },
  cartCta: { width: 74, border: `1px solid ${C.line}`, background: C.ivory, borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 0", cursor: "pointer", color: C.text, fontWeight: 700 },
  cartDot: { position: "absolute", top: -5, right: -7, background: C.gold, color: "white", fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "1px 5px", minWidth: 14 },
  qtyBox: { display: "flex", gap: 8, alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 999, padding: "4px 8px" },
  qtyBtn: { background: "transparent", border: 0, cursor: "pointer", display: "grid", placeItems: "center", color: C.text },

  walletHero: { margin: "12px 18px 10px", background: `linear-gradient(135deg, ${C.green}, #0B4A34)`, borderRadius: 18, padding: 18, color: "white", border: "1px solid rgba(198,161,91,.35)" },
  walletAsset: { flex: 1, background: "transparent", border: 0, color: "white", textAlign: "left", cursor: "pointer", padding: 0 },
  walletDivider: { width: 1, background: "rgba(255,255,255,.15)", margin: "0 14px" },
  pointHero: { margin: "12px 18px", background: `linear-gradient(135deg, ${C.green}, #0B4A34)`, borderRadius: 18, padding: 18, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(198,161,91,.35)" },
  progressBg: { height: 6, borderRadius: 999, background: "#E6E0D6", marginTop: 8, overflow: "hidden" },
  progressBar: { height: "100%", transition: "width .4s" },

  avatarBig: { width: 46, height: 46, borderRadius: "50%", background: "rgba(14,90,62,.1)", display: "grid", placeItems: "center" },
  habitIcon: { width: 40, height: 40, borderRadius: 12, background: "rgba(14,90,62,.08)", display: "grid", placeItems: "center", flexShrink: 0 },
  habitCheck: { width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.line}`, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 },
  myIcon: { width: 38, height: 38, borderRadius: 12, background: "rgba(14,90,62,.08)", display: "grid", placeItems: "center", flexShrink: 0 },
  modeBtn: { border: `1px solid ${C.line}`, borderRadius: 999, padding: "7px 11px", fontSize: 11, fontWeight: 800, cursor: "pointer" },

  stepRow: { display: "flex", justifyContent: "space-between", padding: "14px 26px 14px" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700 },
  stepDot: { width: 24, height: 24, borderRadius: "50%", color: "white", fontSize: 12, fontWeight: 800, display: "grid", placeItems: "center" },
  textarea: { width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, fontSize: 13, fontFamily: "inherit", background: "white", outline: "none", resize: "none" },
  fieldLabel: { display: "block", fontSize: 10.5, fontWeight: 800, color: C.green, margin: "11px 0 4px", letterSpacing: 0.4 },
  fieldInput: { width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: "white", outline: "none" },
  checkRow: { width: "100%", display: "flex", gap: 12, alignItems: "center", background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, marginBottom: 8, cursor: "pointer" },
  checkBox: { width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${C.green2}`, display: "grid", placeItems: "center", flexShrink: 0 },

  zoneOption: { width: "100%", display: "flex", gap: 10, alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 12, padding: "13px 14px", marginBottom: 8, cursor: "pointer", fontSize: 14, background: C.ivory },
  doneCircle: { width: 60, height: 60, borderRadius: "50%", background: C.green2, display: "grid", placeItems: "center", margin: "0 auto" },

  aiFab: { position: "absolute", right: 16, bottom: 86, width: 50, height: 50, borderRadius: "50%", background: C.gold, border: 0, display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 8px 22px rgba(198,161,91,.45)", zIndex: 30 },
  aiBackdrop: { position: "absolute", inset: 0, background: "rgba(23,49,40,.45)", zIndex: 45, display: "flex", alignItems: "flex-end" },
  aiSheet: { width: "100%", height: "78%", background: C.cream, borderRadius: "22px 22px 0 0", display: "flex", flexDirection: "column" },
  aiChip: { background: C.ivory, border: `1px solid ${C.line}`, borderRadius: 999, padding: "8px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: C.text },
  chatBubble: { maxWidth: "78%", margin: "0 18px", borderRadius: 16, padding: "11px 14px", fontSize: 13.5, lineHeight: 1.55 },
  chatInput: { flex: 1, border: `1px solid ${C.line}`, borderRadius: 16, padding: "12px 14px", outline: "none", background: C.ivory, fontSize: 13.5 },
  sendBtn: { width: 44, borderRadius: 14, border: 0, background: C.green, color: "white", cursor: "pointer", display: "grid", placeItems: "center" },
  chipBtn: { borderRadius: 10, padding: "10px 12px", border: `1px solid ${C.line}`, cursor: "pointer", fontSize: 12, whiteSpace: "nowrap", fontWeight: 700 },

  modalBackdrop: { position: "absolute", inset: 0, background: "rgba(23,49,40,.45)", zIndex: 50, display: "flex", alignItems: "flex-end" },
  modalSheet: { width: "100%", background: C.cream, borderRadius: "22px 22px 0 0", padding: "18px 18px 24px" },
  qrBox: { width: 180, height: 180, margin: "6px auto 14px", background: "white", border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 },
  qrGrid: { width: "100%", height: "100%", display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gridTemplateRows: "repeat(9, 1fr)", gap: 1 },

  toast: { position: "absolute", bottom: 86, left: "50%", transform: "translateX(-50%)", background: C.green, color: "white", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700, display: "flex", gap: 6, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,.25)", whiteSpace: "nowrap", zIndex: 60 },

  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 68, background: C.ivory, borderTop: `1px solid ${C.line}`, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", zIndex: 20 },
  navBtn: { border: 0, background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer" },
};

export default App;
