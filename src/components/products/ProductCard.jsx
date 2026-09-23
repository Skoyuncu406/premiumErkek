"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import useShopStore from "@/store/useShopStore";

export default function ProductCard({ product }) {
  /* =========================================================
     FAVORITES
  ========================================================== */

  const toggleFavorite = useShopStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useShopStore(
    (state) =>
      state.favorites.some(
        (item) => item.id === product.id
      )
  );

  /* =========================================================
     IMAGE
  ========================================================== */

  const productImage =
    product.image ||
    product.images?.[0] ||
    "/images/products/product-01.jpg";

  /* =========================================================
     FAVORITE HANDLER
  ========================================================== */

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(product);
  };

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <article className="group min-w-0">
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[3/4]
          w-full
          overflow-hidden
          bg-[var(--ares-background-warm)]
        "
      >
        <Link
          href={`/urunler/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="
              object-cover
              object-center
              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.025]
            "
          />
        </Link>

        {/* NEW */}

        {product.isNew && (
          <span
            className="
              pointer-events-none
              absolute
              left-3
              top-3
              z-10

              bg-[var(--ares-background-soft)]

              px-2
              py-[5px]

              text-[7px]
              font-semibold
              uppercase
              tracking-[0.14em]

              text-[var(--ares-dark-deep)]

              sm:left-4
              sm:top-4
              sm:text-[8px]
            "
          >
            Yeni
          </span>
        )}

        {/* FAVORITE */}

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? `${product.name} favorilerden çıkar`
              : `${product.name} favorilere ekle`
          }
          aria-pressed={isFavorite}
          className="
            absolute
            right-3
            top-3
            z-30

            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center

            border-0
            bg-transparent
            p-0

            text-[var(--ares-dark-deep)]

            outline-none

            transition-transform
            duration-300

            hover:scale-110
            hover:text-[var(--ares-brown)]

            focus:outline-none
            focus-visible:outline-none
          "
        >
          <Heart
            size={18}
            strokeWidth={1.25}
            fill={
              isFavorite
                ? "currentColor"
                : "none"
            }
            className="
              pointer-events-none
              transition-all
              duration-300
            "
          />
        </button>
      </div>

      {/* PRODUCT INFORMATION */}

      <div className="pt-4">
        {/* CATEGORY */}

        <p
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-[var(--ares-muted-light)]
            sm:text-[8px]
          "
        >
          {product.category}
        </p>

        {/* NAME / PRICE */}

        <div
          className="
            mt-2
            flex
            flex-col
            gap-1

            xl:flex-row
            xl:items-start
            xl:justify-between
            xl:gap-4
          "
        >
          <Link
            href={`/urunler/${product.slug}`}
            className="
              min-w-0

              text-[10px]
              font-medium
              leading-[1.5]

              text-[var(--ares-dark-deep)]

              transition-colors
              duration-300

              hover:text-[var(--ares-brown)]

              sm:text-[11px]
              lg:text-[12px]
              xl:text-[13px]
            "
          >
            {product.name}
          </Link>

          <span
            className="
              flex-shrink-0

              text-[10px]
              font-medium

              text-[var(--ares-dark-deep)]

              sm:text-[11px]
              lg:text-[12px]
            "
          >
            {product.formattedPrice ||
              formatTRY(product.price)}
          </span>
        </div>

        {/* COLOR */}

        <p
          className="
            mt-1.5
            text-[8px]
            text-[var(--ares-muted)]
            sm:text-[9px]
          "
        >
          {product.color}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   PRICE FORMATTER
========================================================= */

function formatTRY(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}