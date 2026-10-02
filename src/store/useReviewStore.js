import { create } from "zustand";
import { persist } from "zustand/middleware";

import { reviews as initialReviews } from "@/data/reviews";

/* =========================================================
   REVIEW STORE

   Demo / portfolio review system.

   Production aşamasında bu store yerine:
   - PostgreSQL
   - Prisma
   - authenticated API / Server Actions

   kullanılacaktır.
========================================================= */

const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: initialReviews,

      /* ===================================================
         ADD / UPDATE REVIEW
      ==================================================== */

      saveReview: ({ productId, user, rating, comment }) => {
        if (!productId || !user?.id || !rating || !comment?.trim()) {
          return {
            success: false,
            message: "Değerlendirmenizi tamamlayın.",
          };
        }

        const safeRating = Math.min(5, Math.max(1, Number(rating)));

        const reviews = Array.isArray(get().reviews) ? get().reviews : [];

        const existingReview = reviews.find(
          (review) =>
            String(review.productId) === String(productId) &&
            String(review.user?.id) === String(user.id),
        );

        /* ===============================================
           UPDATE
        ================================================ */

        if (existingReview) {
          const updatedReview = {
            ...existingReview,

            rating: safeRating,

            comment: comment.trim(),

            user: {
              id: user.id,
              name: createDisplayName(user),
            },

            updatedAt: new Date().toISOString(),
          };

          set({
            reviews: reviews.map((review) =>
              review.id === existingReview.id ? updatedReview : review,
            ),
          });

          return {
            success: true,
            updated: true,
            review: updatedReview,
          };
        }

        /* ===============================================
           CREATE
        ================================================ */

        const review = {
          id: createReviewId(),

          productId: String(productId),

          user: {
            id: user.id,
            name: createDisplayName(user),
          },

          rating: safeRating,

          comment: comment.trim(),

          createdAt: new Date().toISOString(),

          updatedAt: new Date().toISOString(),
        };

        set({
          reviews: [review, ...reviews],
        });

        return {
          success: true,
          updated: false,
          review,
        };
      },

      /* ===================================================
         USER REVIEW
      ==================================================== */

      getUserReview: (productId, userId) => {
        if (!productId || !userId) {
          return null;
        }

        const reviews = Array.isArray(get().reviews) ? get().reviews : [];

        return (
          reviews.find(
            (review) =>
              String(review.productId) === String(productId) &&
              String(review.user?.id) === String(userId),
          ) || null
        );
      },
    }),

    {
      name: "ares-review-storage",
    },
  ),
);

export default useReviewStore;

/* =========================================================
   DISPLAY NAME
========================================================= */

function createDisplayName(user) {
  const firstName = String(user?.name || "").trim();

  const surname = String(user?.surname || "").trim();

  if (!firstName) {
    return "ARES Üyesi";
  }

  if (!surname) {
    return firstName;
  }

  return `${firstName} ${surname.charAt(0).toLocaleUpperCase("tr-TR")}.`;
}

/* =========================================================
   REVIEW ID
========================================================= */

function createReviewId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `ares-review-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
