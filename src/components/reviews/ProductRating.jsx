"use client";

import { useMemo } from "react";

import ReviewStars from "./ReviewStars";

import useReviewStore from "@/store/useReviewStore";

/* =========================================================
   PRODUCT RATING

   Tüm ürün rating alanlarının ortak component'i.

   Review verileri useReviewStore üzerinden okunur.
   Böylece yeni değerlendirme eklendiğinde:
   - Product Detail
   - Homepage
   - Products
   - Favorites
   - Navbar Search

   otomatik olarak güncellenir.
========================================================= */

export default function ProductRating({
  productId,
  onClick,
  compact = false,
  className = "",
}) {
  /* =======================================================
     REVIEWS
  ======================================================== */

  const reviews = useReviewStore(
    (state) => state.reviews,
  );

  /* =======================================================
     PRODUCT REVIEW SUMMARY
  ======================================================== */

  const { average, count } =
    useMemo(() => {
      const safeReviews =
        Array.isArray(reviews)
          ? reviews
          : [];

      const productReviews =
        safeReviews.filter(
          (review) =>
            String(review.productId) ===
            String(productId),
        );

      const reviewCount =
        productReviews.length;

      if (reviewCount === 0) {
        return {
          average: 0,
          count: 0,
        };
      }

      const total =
        productReviews.reduce(
          (sum, review) =>
            sum +
            Number(
              review?.rating || 0,
            ),
          0,
        );

      return {
        average: Number(
          (
            total / reviewCount
          ).toFixed(1),
        ),
        count: reviewCount,
      };
    }, [reviews, productId]);

  /* =======================================================
     STATE
  ======================================================== */

  const hasReviews = count > 0;

  /* =======================================================
     CONTENT
  ======================================================== */

  const content = (
    <>
      <ReviewStars
        rating={average}
        size={compact ? 11 : 12}
        gap={1.5}
      />

      <span
        className="
          text-[8px]
          font-medium

          tracking-[0.02em]

          text-[var(--ares-muted)]

          sm:text-[9px]
        "
      >
        {hasReviews ? (
          <>
            <span
              className="
                text-[var(--ares-dark-deep)]
              "
            >
              {average.toFixed(1)}
            </span>

            <span
              className="
                mx-1
                opacity-45
              "
            >
              ·
            </span>

            {count} değerlendirme
          </>
        ) : (
          "Henüz değerlendirme yok"
        )}
      </span>
    </>
  );

  /* =======================================================
     CLICKABLE
  ======================================================== */

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Ürün değerlendirmelerini görüntüle"
        className={`
          group/rating

          inline-flex
          items-center

          gap-2

          border-0
          bg-transparent
          p-0

          text-left

          outline-none

          transition-opacity
          duration-300

          hover:opacity-65

          focus:outline-none
          focus-visible:outline-none

          ${className}
        `}
      >
        {content}
      </button>
    );
  }

  /* =======================================================
     STATIC
  ======================================================== */

  return (
    <div
      className={`
        inline-flex
        items-center

        gap-2

        ${className}
      `}
    >
      {content}
    </div>
  );
}