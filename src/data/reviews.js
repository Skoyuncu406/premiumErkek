/* =========================================================
   ARES / PRODUCT REVIEWS

   Demo review data.
   Gerçek authentication + PostgreSQL + Prisma aşamasında
   bu veri database üzerinden alınacak.
========================================================= */

export const reviews = [
  /* =======================================================
     PRODUCT 1
  ======================================================== */

  {
    id: "review-001",
    productId: "1",
    user: {
      id: "user-001",
      name: "Mert K.",
    },
    rating: 5,
    comment:
      "Kumaş kalitesi ve kalıbı gerçekten çok başarılı. Normal bedenimi tercih ettim ve üzerime tam oturdu.",
    createdAt: "2026-09-18",
  },

  {
    id: "review-002",
    productId: "1",
    user: {
      id: "user-002",
      name: "Emre A.",
    },
    rating: 5,
    comment:
      "Detayları fotoğraflarda göründüğünden daha iyi. Özellikle kumaş dokusunu çok beğendim.",
    createdAt: "2026-09-10",
  },

  {
    id: "review-003",
    productId: "1",
    user: {
      id: "user-003",
      name: "Kerem D.",
    },
    rating: 4,
    comment:
      "Kesimi oldukça başarılı. Günlük kullanımda da daha klasik kombinlerde de rahatlıkla kullanılabilir.",
    createdAt: "2026-09-03",
  },

  /* =======================================================
     PRODUCT 2
  ======================================================== */

  {
    id: "review-004",
    productId: "2",
    user: {
      id: "user-004",
      name: "Can T.",
    },
    rating: 5,
    comment:
      "Pantolonun kalıbı ve kumaşın duruşu çok iyi. Özellikle ceketlerle kombinlendiğinde oldukça şık görünüyor.",
    createdAt: "2026-09-22",
  },

  {
    id: "review-005",
    productId: "2",
    user: {
      id: "user-005",
      name: "Burak E.",
    },
    rating: 4,
    comment: "Beklediğimden daha rahat. Kumaşı kaliteli ve kesimi modern.",
    createdAt: "2026-09-08",
  },

  /* =======================================================
     PRODUCT 3
  ======================================================== */

  {
    id: "review-006",
    productId: "3",
    user: {
      id: "user-006",
      name: "Onur S.",
    },
    rating: 5,
    comment:
      "İnce dokusu ve sade tasarımı çok başarılı. Tek başına da ceket altında da güzel duruyor.",
    createdAt: "2026-09-25",
  },

  {
    id: "review-007",
    productId: "3",
    user: {
      id: "user-007",
      name: "Tolga Y.",
    },
    rating: 5,
    comment: "Yumuşak ve oldukça rahat. Premium hissi gerçekten veriyor.",
    createdAt: "2026-09-12",
  },

  /* =======================================================
     PRODUCT 4
  ======================================================== */

  {
    id: "review-008",
    productId: "4",
    user: {
      id: "user-008",
      name: "Berk A.",
    },
    rating: 5,
    comment:
      "Omuz yapısı ve kesimi çok iyi. Özellikle kumaşın tok duruşunu beğendim.",
    createdAt: "2026-09-27",
  },

  {
    id: "review-009",
    productId: "4",
    user: {
      id: "user-009",
      name: "Arda M.",
    },
    rating: 4,
    comment:
      "Minimal ve şık bir blazer. Günlük kombinlere de rahatlıkla uyuyor.",
    createdAt: "2026-09-14",
  },

  /* =======================================================
     PRODUCT 5
  ======================================================== */

  {
    id: "review-010",
    productId: "5",
    user: {
      id: "user-010",
      name: "Kaan B.",
    },
    rating: 5,
    comment:
      "Paltonun ağırlığı ve kumaş hissi çok başarılı. Soğuk havalarda oldukça iyi koruyor.",
    createdAt: "2026-09-21",
  },

  /* =======================================================
     PRODUCT 6
  ======================================================== */

  {
    id: "review-011",
    productId: "6",
    user: {
      id: "user-011",
      name: "Ege C.",
    },
    rating: 4,
    comment:
      "Pile detayları çok hoş. Rahat kalıbına rağmen oldukça derli toplu duruyor.",
    createdAt: "2026-09-16",
  },

  /* =======================================================
     PRODUCT 7
  ======================================================== */

  {
    id: "review-012",
    productId: "7",
    user: {
      id: "user-012",
      name: "Deniz Ö.",
    },
    rating: 5,
    comment:
      "Dokusu çok yumuşak ve beden ölçüsü tam. Özellikle geçiş mevsimleri için güzel bir parça.",
    createdAt: "2026-09-19",
  },

  /* =======================================================
     PRODUCT 8
  ======================================================== */

  {
    id: "review-013",
    productId: "8",
    user: {
      id: "user-013",
      name: "Alp G.",
    },
    rating: 5,
    comment:
      "Çift düğmeli tasarımı ve kesimi çok başarılı. Beklediğim premium görünümü veriyor.",
    createdAt: "2026-09-24",
  },
];

/* =========================================================
   GET PRODUCT REVIEWS
========================================================= */

export function getProductReviews(productId) {
  if (productId === null || productId === undefined) {
    return [];
  }

  return reviews.filter(
    (review) => String(review.productId) === String(productId),
  );
}

/* =========================================================
   GET PRODUCT REVIEW SUMMARY
========================================================= */

export function getProductReviewSummary(productId) {
  const productReviews = getProductReviews(productId);

  const count = productReviews.length;

  if (count === 0) {
    return {
      average: 0,
      count: 0,
    };
  }

  const total = productReviews.reduce(
    (sum, review) => sum + Number(review.rating || 0),
    0,
  );

  const average = total / count;

  return {
    average: Number(average.toFixed(1)),
    count,
  };
}
