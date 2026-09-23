"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Heart,
  X,
} from "lucide-react";

import useShopStore from "@/store/useShopStore";
import { products } from "@/data/products";

/* =========================================================
   FAVORITES PAGE
========================================================= */

export default function FavoritesPage() {
  const favorites = useShopStore(
    (state) => state.favorites
  );

  const toggleFavorite = useShopStore(
    (state) => state.toggleFavorite
  );

  /* =======================================================
     NORMALIZE FAVORITES

     Favoride eski bir ürün kaydı varsa merkezi products.js
     içindeki güncel ürünle ID üzerinden eşleştiriyoruz.

     Böylece eski kayıtta slug bulunmasa bile ürün detay
     sayfası doğru şekilde açılır.
  ======================================================== */

  const normalizedFavorites = favorites.map(
    (favorite) => {
      const currentProduct = products.find(
        (product) =>
          String(product.id) ===
          String(favorite.id)
      );

      if (!currentProduct) {
        return favorite;
      }

      return {
        ...favorite,
        ...currentProduct,
      };
    }
  );

  /* =======================================================
     EMPTY FAVORITES
  ======================================================== */

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  /* =======================================================
     FAVORITES
  ======================================================== */

  return (
    <section
      className="
        min-h-[70vh]

        bg-[var(--ares-background-soft)]

        py-5

        sm:py-8
        lg:py-10
      "
    >
      <div className="ares-container-wide">
        {/* =================================================
            SMALL TOP INFORMATION
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            pb-4

            sm:pb-5
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
              Kaydedilen Ürünler
            </p>
          </div>

          <span
            className="
              text-[8px]
              font-medium

              uppercase
              tracking-[0.12em]

              text-[var(--ares-muted-light)]
            "
          >
            {favorites.length} ürün
          </span>
        </div>

        {/* =================================================
            PRODUCT GRID
        ================================================== */}

        <div
          className="
            grid
            grid-cols-2

            gap-x-3
            gap-y-9

            pt-6

            sm:gap-x-5
            sm:gap-y-11
            sm:pt-8

            md:grid-cols-3

            lg:gap-x-6
            lg:gap-y-12

            xl:grid-cols-4
            xl:gap-x-7
          "
        >
          {normalizedFavorites.map(
            (product) => (
              <FavoriteProduct
                key={product.id}
                product={product}
                onRemove={() => {
                  const originalFavorite =
                    favorites.find(
                      (favorite) =>
                        String(
                          favorite.id
                        ) ===
                        String(
                          product.id
                        )
                    );

                  if (originalFavorite) {
                    toggleFavorite(
                      originalFavorite
                    );
                  }
                }}
              />
            )
          )}
        </div>

        {/* =================================================
            BOTTOM
        ================================================== */}

        <div
          className="
            mt-12

            flex

            border-t
            border-[var(--ares-border)]

            pt-6

            sm:mt-16
          "
        >
          <Link
            href="/urunler"
            className="
              ares-link

              text-[8px]

              text-[var(--ares-dark-deep)]
            "
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FAVORITE PRODUCT
========================================================= */

function FavoriteProduct({
  product,
  onRemove,
}) {
  /* =======================================================
     PRODUCT URL

     Öncelik slug.
     Eski kayıtlarda yalnızca href varsa onu kullan.
  ======================================================== */

  const productHref = product.slug
    ? `/urunler/${product.slug}`
    : product.href || "/urunler";

  /* =======================================================
     PRODUCT IMAGE
  ======================================================== */

  const productImage =
    product.image ||
    product.images?.[0] ||
    "/images/products/product-01.jpg";

  return (
    <article
      className="
        group
        min-w-0
      "
    >
      {/* ===================================================
          IMAGE
      ==================================================== */}

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
          href={productHref}
          className="
            block
            h-full
            w-full
          "
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
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
              absolute
              left-3
              top-3

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

        {/* REMOVE FAVORITE */}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`${product.name} ürününü favorilerden çıkar`}
          className="
            absolute
            right-3
            top-3

            z-10

            flex
            h-9
            w-9

            items-center
            justify-center

            bg-[var(--ares-background-soft)]/90

            text-[var(--ares-dark-deep)]

            backdrop-blur-sm

            transition-all
            duration-300

            hover:bg-[var(--ares-dark)]
            hover:text-[var(--ares-background-soft)]

            sm:right-4
            sm:top-4
          "
        >
          <X
            size={14}
            strokeWidth={1.2}
          />
        </button>
      </div>

      {/* ===================================================
          PRODUCT INFORMATION
      ==================================================== */}

      <div className="pt-4">
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

        {/* NAME + PRICE */}

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
            href={productHref}
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
            {product.formattedPrice}
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

        {/* PRODUCT LINK */}

        <Link
          href={productHref}
          className="
            group/link

            mt-4

            inline-flex
            items-center
            gap-2

            text-[7px]
            font-semibold

            uppercase
            tracking-[0.12em]

            text-[var(--ares-muted)]

            transition-colors
            duration-300

            hover:text-[var(--ares-dark-deep)]

            sm:text-[8px]
          "
        >
          Ürünü İncele

          <ArrowRight
            size={11}
            strokeWidth={1.2}
            className="
              transition-transform
              duration-300

              group-hover/link:translate-x-1
            "
          />
        </Link>
      </div>
    </article>
  );
}

/* =========================================================
   EMPTY FAVORITES
========================================================= */

function EmptyFavorites() {
  return (
    <section
      className="
        flex
        min-h-[70vh]

        items-center
        justify-center

        bg-[var(--ares-background-soft)]

        px-5
        py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-[600px]

          text-center
        "
      >
        <Heart
          size={27}
          strokeWidth={1}
          className="
            mx-auto

            text-[var(--ares-gold)]
          "
        />

        <p
          className="
            mt-7

            text-[8px]
            font-semibold

            uppercase
            tracking-[0.2em]

            text-[var(--ares-muted)]
          "
        >
          ARES / Saved Pieces
        </p>

        <p
          className="
            mx-auto
            mt-5

            max-w-[410px]

            font-editorial

            text-[32px]
            font-medium

            leading-[1]

            tracking-[-0.025em]

            text-[var(--ares-dark-deep)]

            sm:text-[40px]
          "
        >
          Henüz kaydettiğiniz bir ürün yok.
        </p>

        <p
          className="
            mx-auto
            mt-5

            max-w-[380px]

            text-[10px]
            leading-[1.8]

            text-[var(--ares-muted)]

            sm:text-[11px]
          "
        >
          Beğendiğiniz parçaları kalp simgesine
          dokunarak favorilerinize ekleyebilir ve
          daha sonra burada tekrar bulabilirsiniz.
        </p>

        <Link
          href="/urunler"
          className="
            ares-button

            mt-8
          "
        >
          Koleksiyonu Keşfet

          <ArrowRight
            size={14}
            strokeWidth={1.3}
          />
        </Link>
      </div>
    </section>
  );
}