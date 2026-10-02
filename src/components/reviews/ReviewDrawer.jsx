"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  Check,
  X,
} from "lucide-react";

import ReviewStars from "./ReviewStars";

import useAuthStore from "@/store/useAuthStore";
import useReviewStore from "@/store/useReviewStore";

/* =========================================================
   REVIEW DRAWER
========================================================= */

export default function ReviewDrawer({
  open,
  onClose,
  product,
}) {
  const productId = product?.id;

  /* =======================================================
     AUTH
  ======================================================== */

  const currentUser = useAuthStore(
    (state) => state.currentUser,
  );

  /* =======================================================
     REVIEWS
  ======================================================== */

  const allReviews = useReviewStore(
    (state) => state.reviews,
  );

  const saveReview = useReviewStore(
    (state) => state.saveReview,
  );

  /* =======================================================
     PRODUCT REVIEWS
  ======================================================== */

  const productReviews = useMemo(() => {
    const safeReviews = Array.isArray(
      allReviews,
    )
      ? allReviews
      : [];

    return safeReviews
      .filter(
        (review) =>
          String(review.productId) ===
          String(productId),
      )
      .sort((a, b) => {
        return (
          new Date(
            b.updatedAt ||
              b.createdAt ||
              0,
          ).getTime() -
          new Date(
            a.updatedAt ||
              a.createdAt ||
              0,
          ).getTime()
        );
      });
  }, [allReviews, productId]);

  /* =======================================================
     SUMMARY
  ======================================================== */

  const summary = useMemo(() => {
    const count =
      productReviews.length;

    if (count === 0) {
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
      average:
        Number(
          (total / count).toFixed(1),
        ),
      count,
    };
  }, [productReviews]);

  const {
    average,
    count,
  } = summary;

  /* =======================================================
     CURRENT USER REVIEW
  ======================================================== */

  const currentUserReview =
    useMemo(() => {
      if (!currentUser?.id) {
        return null;
      }

      return (
        productReviews.find(
          (review) =>
            String(review.user?.id) ===
            String(currentUser.id),
        ) || null
      );
    }, [
      productReviews,
      currentUser?.id,
    ]);

  /* =======================================================
     FORM
  ======================================================== */

  const [rating, setRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  /* =======================================================
     SYNC FORM
  ======================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    setMessage("");
    setSuccess(false);

    if (currentUserReview) {
      setRating(
        Number(
          currentUserReview.rating ||
            0,
        ),
      );

      setComment(
        currentUserReview.comment ||
          "",
      );

      return;
    }

    setRating(0);
    setComment("");
  }, [
    open,
    productId,
    currentUser?.id,
    currentUserReview,
  ]);

  /* =======================================================
     ESC + BODY SCROLL
  ======================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  /* =======================================================
     SUBMIT REVIEW
  ======================================================== */

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!currentUser?.id) {
      setMessage(
        "Değerlendirme yapmak için hesabınıza giriş yapın.",
      );

      return;
    }

    if (!rating) {
      setMessage(
        "Lütfen 1 ile 5 arasında bir yıldız seçin.",
      );

      return;
    }

    if (!comment.trim()) {
      setMessage(
        "Lütfen değerlendirmenizi yazın.",
      );

      return;
    }

    if (comment.trim().length < 10) {
      setMessage(
        "Değerlendirmeniz en az 10 karakter olmalıdır.",
      );

      return;
    }

    const result = saveReview({
      productId,
      user: currentUser,
      rating,
      comment,
    });

    if (!result?.success) {
      setMessage(
        result?.message ||
          "Değerlendirmeniz kaydedilemedi.",
      );

      return;
    }

    setSuccess(true);

    setMessage(
      result.updated
        ? "Değerlendirmeniz güncellendi."
        : "Değerlendirmeniz yayınlandı.",
    );
  }

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div
      className={`
        fixed
        inset-0
        z-[120]

        transition
        duration-500

        ${
          open
            ? `
                pointer-events-auto
                visible
              `
            : `
                pointer-events-none
                invisible
              `
        }
      `}
      aria-hidden={!open}
    >
      {/* ===================================================
          BACKDROP
      ==================================================== */}

      <button
        type="button"
        aria-label="Değerlendirmeleri kapat"
        onClick={onClose}
        className={`
          absolute
          inset-0

          h-full
          w-full

          border-0

          bg-[#211A16]/45

          transition-opacity
          duration-500

          ${
            open
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />

      {/* ===================================================
          DRAWER
      ==================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Müşteri değerlendirmeleri"
        className={`
          absolute
          right-0
          top-0

          flex

          h-full
          w-full
          max-w-[520px]

          flex-col

          bg-[var(--ares-background-soft)]

          shadow-[-20px_0_60px_rgba(33,26,22,0.12)]

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className="
            flex
            min-h-[76px]

            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            px-5

            sm:min-h-[84px]
            sm:px-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-7

                bg-[var(--ares-gold)]
              "
            />

            <p
              className="
                text-[8px]
                font-semibold

                uppercase
                tracking-[0.18em]

                text-[var(--ares-muted)]
              "
            >
              ARES / Reviews
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              border-0
              bg-transparent

              text-[var(--ares-dark-deep)]

              outline-none

              transition-transform
              duration-300

              hover:rotate-90

              focus:outline-none
              focus-visible:outline-none
            "
          >
            <X
              size={18}
              strokeWidth={1.2}
            />
          </button>
        </header>

        {/* =================================================
            SCROLL AREA
        ================================================== */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-5
            py-7

            sm:px-8
            sm:py-9

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {/* ===============================================
              PRODUCT
          ================================================ */}

          <p
            className="
              text-[8px]
              font-semibold

              uppercase
              tracking-[0.14em]

              text-[var(--ares-muted-light)]
            "
          >
            {product?.name}
          </p>

          <h2
            className="
              mt-3

              font-editorial

              text-[34px]
              font-medium

              leading-[0.95]

              tracking-[-0.035em]

              text-[var(--ares-dark-deep)]

              sm:text-[40px]
            "
          >
            Müşteri
            <br />
            Değerlendirmeleri
          </h2>

          {/* ===============================================
              SUMMARY
          ================================================ */}

          <div
            className="
              mt-8

              flex
              items-end
              justify-between

              gap-5

              border-b
              border-[var(--ares-border)]

              pb-7
            "
          >
            <div>
              <div
                className="
                  flex
                  items-end
                  gap-3
                "
              >
                <span
                  className="
                    font-editorial

                    text-[48px]
                    font-medium

                    leading-none

                    tracking-[-0.04em]

                    text-[var(--ares-dark-deep)]
                  "
                >
                  {count > 0
                    ? average.toFixed(1)
                    : "—"}
                </span>

                <span
                  className="
                    pb-1

                    text-[8px]

                    uppercase
                    tracking-[0.12em]

                    text-[var(--ares-muted)]
                  "
                >
                  / 5
                </span>
              </div>

              <div className="mt-3">
                <ReviewStars
                  rating={average}
                  size={14}
                  gap={2}
                />
              </div>
            </div>

            <p
              className="
                pb-1

                text-[8px]
                font-medium

                uppercase
                tracking-[0.1em]

                text-[var(--ares-muted)]
              "
            >
              {count} değerlendirme
            </p>
          </div>

          {/* ===============================================
              REVIEWS
          ================================================ */}

          <div>
            {productReviews.length >
            0 ? (
              productReviews.map(
                (review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    isCurrentUser={
                      String(
                        review.user?.id,
                      ) ===
                      String(
                        currentUser?.id,
                      )
                    }
                  />
                ),
              )
            ) : (
              <div
                className="
                  border-b
                  border-[var(--ares-border)]

                  py-10
                "
              >
                <p
                  className="
                    font-editorial

                    text-[22px]

                    text-[var(--ares-dark-deep)]
                  "
                >
                  İlk değerlendirmeyi
                  siz yapın.
                </p>

                <p
                  className="
                    mt-3

                    max-w-[340px]

                    text-[9px]
                    leading-[1.8]

                    text-[var(--ares-muted)]
                  "
                >
                  Bu ürün için henüz bir
                  müşteri değerlendirmesi
                  bulunmuyor.
                </p>
              </div>
            )}
          </div>

          {/* ===============================================
              REVIEW ACCESS
          ================================================ */}

          {currentUser ? (
            <MemberReviewForm
              user={currentUser}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              message={message}
              success={success}
              editing={Boolean(
                currentUserReview,
              )}
              onSubmit={handleSubmit}
            />
          ) : (
            <GuestReviewAccess
              onClose={onClose}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   MEMBER REVIEW FORM
========================================================= */

function MemberReviewForm({
  user,
  rating,
  setRating,
  comment,
  setComment,
  message,
  success,
  editing,
  onSubmit,
}) {
  return (
    <div
      className="
        py-9

        sm:py-10
      "
    >
      {/* LABEL */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-px
            w-7

            bg-[var(--ares-gold)]
          "
        />

        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.18em]

            text-[var(--ares-muted)]
          "
        >
          Değerlendirmeniz
        </p>
      </div>

      {/* TITLE */}

      <h3
        className="
          mt-5

          font-editorial

          text-[26px]
          font-medium

          leading-[1]

          tracking-[-0.025em]

          text-[var(--ares-dark-deep)]
        "
      >
        {editing
          ? "Deneyiminizi güncelleyin."
          : "Deneyiminizi paylaşın."}
      </h3>

      <p
        className="
          mt-4

          max-w-[390px]

          text-[9px]
          leading-[1.8]

          text-[var(--ares-muted)]
        "
      >
        {user?.name}, ürün hakkındaki
        deneyiminizi diğer ARES
        müşterileriyle paylaşabilirsiniz.
      </p>

      {/* FORM */}

      <form
        onSubmit={onSubmit}
        className="mt-7"
      >
        {/* RATING */}

        <div>
          <p
            className="
              text-[7px]
              font-semibold

              uppercase
              tracking-[0.14em]

              text-[var(--ares-muted-light)]
            "
          >
            Puanınız
          </p>

          <div
            className="
              mt-3

              flex
              items-center
              gap-4
            "
          >
            <ReviewStars
              rating={rating}
              size={22}
              gap={5}
              interactive
              onChange={(value) => {
                setRating(value);
              }}
            />

            {rating > 0 && (
              <span
                className="
                  text-[8px]
                  font-medium

                  uppercase
                  tracking-[0.1em]

                  text-[var(--ares-muted)]
                "
              >
                {rating} / 5
              </span>
            )}
          </div>
        </div>

        {/* COMMENT */}

        <div className="mt-7">
          <label
            htmlFor="ares-review-comment"
            className="
              block

              text-[7px]
              font-semibold

              uppercase
              tracking-[0.14em]

              text-[var(--ares-muted-light)]
            "
          >
            Değerlendirmeniz
          </label>

          <textarea
            id="ares-review-comment"
            value={comment}
            onChange={(event) => {
              setComment(
                event.target.value,
              );

              if (success) {
                // Yeni değişiklik yapıldığında
                // önceki başarı mesajı görsel
                // olarak kalabilir; submit
                // edildiğinde yeniden güncellenir.
              }
            }}
            rows={4}
            maxLength={600}
            placeholder="Ürünün kalıbı, kumaşı ve kullanım deneyiminiz hakkında düşüncelerinizi paylaşın."
            className="
              ares-account-input

              mt-2

              min-h-[120px]
              w-full

              resize-none

              px-2
              py-3

              text-[10px]
              leading-[1.8]

              sm:text-[11px]
            "
          />

          <div
            className="
              mt-2

              flex
              justify-end
            "
          >
            <span
              className="
                text-[7px]

                tracking-[0.08em]

                text-[var(--ares-muted-light)]
              "
            >
              {comment.length} / 600
            </span>
          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className={`
              mt-5

              flex
              items-start
              gap-2.5

              text-[9px]
              leading-[1.6]

              ${
                success
                  ? "text-[var(--ares-dark-deep)]"
                  : "text-[var(--ares-brown)]"
              }
            `}
            role={
              success
                ? "status"
                : "alert"
            }
          >
            {success && (
              <Check
                size={13}
                strokeWidth={1.4}
                className="
                  mt-[1px]

                  flex-shrink-0

                  text-[var(--ares-gold)]
                "
              />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* SUBMIT */}

        <button
          type="submit"
          className="
            group

            mt-7

            flex
            min-h-[48px]
            w-full

            items-center
            justify-between

            bg-[#211A16]

            px-6

            text-[#FAF8F3]

            transition-colors
            duration-300

            hover:bg-[#35271F]

            focus:outline-none
            focus-visible:outline-none
          "
        >
          <span
            className="
              text-[8px]
              font-semibold

              uppercase
              tracking-[0.14em]

              text-[#FAF8F3]

              sm:text-[9px]
            "
          >
            {editing
              ? "Değerlendirmeyi Güncelle"
              : "Değerlendirmeyi Yayınla"}
          </span>

          <ArrowRight
            size={14}
            strokeWidth={1.4}
            className="
              flex-shrink-0

              text-[#C9AD78]

              transition-transform
              duration-300

              group-hover:translate-x-1
            "
          />
        </button>
      </form>
    </div>
  );
}

/* =========================================================
   GUEST REVIEW ACCESS
========================================================= */

function GuestReviewAccess({
  onClose,
}) {
  return (
    <div
      className="
        py-9

        sm:py-10
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-px
            w-7

            bg-[var(--ares-gold)]
          "
        />

        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.18em]

            text-[var(--ares-muted)]
          "
        >
          Değerlendirmeniz
        </p>
      </div>

      <h3
        className="
          mt-5

          font-editorial

          text-[26px]
          font-medium

          leading-[1]

          tracking-[-0.025em]

          text-[var(--ares-dark-deep)]
        "
      >
        Deneyiminizi paylaşın.
      </h3>

      <p
        className="
          mt-4

          max-w-[390px]

          text-[9px]
          leading-[1.8]

          text-[var(--ares-muted)]
        "
      >
        Yalnızca ARES üyeleri
        ürünlere yıldız verebilir ve
        değerlendirme paylaşabilir.
        Devam etmek için hesabınıza
        giriş yapın.
      </p>

      <Link
        href="/hesabim"
        onClick={onClose}
        className="
          group

          mt-7

          flex
          min-h-[48px]
          w-full

          items-center
          justify-between

          bg-[#211A16]

          px-6

          text-[#FAF8F3]

          transition-colors
          duration-300

          hover:bg-[#35271F]

          focus:outline-none
          focus-visible:outline-none
        "
      >
        <span
          className="
            text-[8px]
            font-semibold

            uppercase
            tracking-[0.14em]

            text-[#FAF8F3]

            sm:text-[9px]
          "
        >
          Giriş Yap / Hesap Oluştur
        </span>

        <ArrowRight
          size={14}
          strokeWidth={1.4}
          className="
            flex-shrink-0

            text-[#C9AD78]

            transition-transform
            duration-300

            group-hover:translate-x-1
          "
        />
      </Link>
    </div>
  );
}

/* =========================================================
   REVIEW ITEM
========================================================= */

function ReviewItem({
  review,
  isCurrentUser = false,
}) {
  return (
    <article
      className="
        border-b
        border-[var(--ares-border)]

        py-7
      "
    >
      <div
        className="
          flex
          items-start
          justify-between

          gap-5
        "
      >
        <div>
          <ReviewStars
            rating={review.rating}
            size={12}
            gap={1.5}
          />

          <div
            className="
              mt-3

              flex
              flex-wrap
              items-center

              gap-x-3
              gap-y-1
            "
          >
            <p
              className="
                text-[9px]
                font-semibold

                uppercase
                tracking-[0.08em]

                text-[var(--ares-dark-deep)]
              "
            >
              {review.user?.name}
            </p>

            {isCurrentUser && (
              <span
                className="
                  text-[6px]
                  font-semibold

                  uppercase
                  tracking-[0.12em]

                  text-[var(--ares-gold)]
                "
              >
                Sizin Değerlendirmeniz
              </span>
            )}
          </div>
        </div>

        <time
          dateTime={
            review.updatedAt ||
            review.createdAt
          }
          className="
            flex-shrink-0

            text-[7px]

            uppercase
            tracking-[0.08em]

            text-[var(--ares-muted-light)]
          "
        >
          {formatReviewDate(
            review.updatedAt ||
              review.createdAt,
          )}
        </time>
      </div>

      <p
        className="
          mt-5

          max-w-[420px]

          text-[10px]
          leading-[1.8]

          text-[var(--ares-muted)]

          sm:text-[11px]
        "
      >
        {review.comment}
      </p>

      <p
        className="
          mt-4

          text-[7px]
          font-semibold

          uppercase
          tracking-[0.12em]

          text-[var(--ares-gold)]
        "
      >
        Doğrulanmış Üye
      </p>
    </article>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatReviewDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "tr-TR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  ).format(parsedDate);
}