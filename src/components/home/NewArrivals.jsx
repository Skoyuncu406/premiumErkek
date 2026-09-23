"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

import useShopStore from "@/store/useShopStore";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Wool Blend Overshirt",
    category: "Outerwear",
    color: "Kahverengi",
    price: "₺6.490",
    image: "/images/products/product-01.jpg",
    href: "/urunler/wool-blend-overshirt",
    isNew: true,
  },
  {
    id: 2,
    name: "Tailored Wool Trousers",
    category: "Tailoring",
    color: "Kum",
    price: "₺4.890",
    image: "/images/products/product-02.jpg",
    href: "/urunler/tailored-wool-trousers",
    isNew: true,
  },
  {
    id: 3,
    name: "Merino Polo Knit",
    category: "Essentials",
    color: "Ekru",
    price: "₺3.990",
    image: "/images/products/product-03.jpg",
    href: "/urunler/merino-polo-knit",
    isNew: true,
  },
  {
    id: 4,
    name: "Structured Blazer",
    category: "Tailoring",
    color: "Antrasit",
    price: "₺8.990",
    image: "/images/products/product-04.jpg",
    href: "/urunler/structured-blazer",
    isNew: true,
  },
];

/* =========================================================
   NEW ARRIVALS
========================================================= */

export default function NewArrivals() {
  return (
    <section
      className="
        w-full
        bg-[var(--ares-background-soft)]
      "
    >
      <div className="ares-container-wide">
        {/* =====================================================
            DESKTOP / TABLET FULL VIEWPORT AREA
        ====================================================== */}

        <div
          className="
            flex
            min-h-[calc(100dvh-108px)]
            flex-col

            py-8

            lg:h-[calc(100dvh-126px)]
            lg:min-h-[650px]
            lg:py-8

            xl:py-10
          "
        >
          {/* ===================================================
              COMPACT HEADER
          ==================================================== */}

          <div
            className="
              grid
              flex-shrink-0
              gap-5

              border-b
              border-[var(--ares-border)]

              pb-7

              md:grid-cols-12
              md:items-end

              lg:gap-8
              lg:pb-8
            "
          >
            {/* LABEL */}

            <div className="md:col-span-3">
              <div className="flex items-center gap-4">
                <span
                  className="
                    h-px
                    w-8
                    flex-shrink-0
                    bg-[var(--ares-gold)]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[var(--ares-muted)]
                    sm:text-[9px]
                  "
                >
                  ARES / New Season
                </span>
              </div>
            </div>

            {/* HEADING */}

            <div className="md:col-span-6">
              <h2
                className="
                  font-editorial
                  text-[clamp(2.8rem,5vw,5.2rem)]
                  font-medium
                  leading-[0.84]
                  tracking-[-0.04em]
                  text-[var(--ares-dark-deep)]
                "
              >
                New Arrivals.
              </h2>
            </div>

            {/* DESKTOP ALL PRODUCTS */}

            <div
              className="
                hidden
                md:col-span-3
                md:flex
                md:justify-end
              "
            >
              <AllProductsLink />
            </div>
          </div>

          {/* ===================================================
              PRODUCT GRID
          ==================================================== */}

          <div
            className="
              grid
              grid-cols-2

              gap-x-3
              gap-y-10

              pt-7

              sm:gap-x-5

              md:gap-x-6

              lg:min-h-0
              lg:flex-1
              lg:grid-cols-4
              lg:gap-x-5
              lg:gap-y-0
              lg:pt-8

              xl:gap-x-7
            "
          >
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* ===================================================
              MOBILE ALL PRODUCTS
          ==================================================== */}

          <div
            className="
              mt-10
              flex
              justify-center
              md:hidden
            "
          >
            <Link
              href="/urunler?filter=new"
              className="ares-button ares-button-outline"
            >
              Tüm Yeni Ürünler
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT ITEM
========================================================= */

function ProductItem({ product }) {
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
     FAVORITE HANDLER
  ========================================================== */

  function handleFavoriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(product);
  }

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <article
      className="
        group
        flex
        min-h-0
        flex-col
      "
    >
      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}

      <div
        className="
          relative

          aspect-[3/4]

          w-full

          flex-shrink-0

          overflow-hidden

          bg-[var(--ares-background-warm)]

          lg:aspect-auto
          lg:min-h-0
          lg:flex-1
        "
      >
        <Link
          href={product.href}
          className="block h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1023px) 50vw, 25vw"
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

        {/* ===================================================
            NEW LABEL
        ==================================================== */}

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

        {/* ===================================================
            FAVORITE
        ==================================================== */}

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
            right-2
            top-2
            z-30

            flex
            h-9
            w-9

            cursor-pointer

            items-center
            justify-center

            border-0
            bg-transparent
            p-0

            text-[var(--ares-dark-deep)]

            outline-none

            transition-all
            duration-300

            hover:scale-110
            hover:text-[var(--ares-brown)]

            focus:outline-none
            focus-visible:outline-none

            sm:right-3
            sm:top-3
          "
        >
          <Heart
            size={17}
            strokeWidth={1.2}
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

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <div
        className="
          flex-shrink-0

          pt-3

          sm:pt-4

          lg:pb-1
        "
      >
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
            xl:gap-3
          "
        >
          <Link
            href={product.href}
            className="
              text-[10px]
              font-medium

              leading-[1.45]

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
            {product.price}
          </span>
        </div>

        {/* COLOR */}

        <p
          className="
            mt-1.5

            text-[8px]

            text-[var(--ares-muted)]

            sm:text-[9px]

            lg:text-[10px]
          "
        >
          {product.color}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   ALL PRODUCTS LINK
========================================================= */

function AllProductsLink() {
  return (
    <Link
      href="/urunler?filter=new"
      className="
        group

        inline-flex
        w-fit

        items-center
        gap-4

        border-b
        border-[var(--ares-dark)]

        pb-2

        text-[8px]
        font-semibold

        uppercase

        tracking-[0.16em]

        text-[var(--ares-dark-deep)]

        sm:text-[9px]

        lg:text-[10px]
      "
    >
      Tümünü Gör

      <ArrowUpRight
        size={15}
        strokeWidth={1.3}
        className="
          transition-transform

          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:-translate-y-1
          group-hover:translate-x-1
        "
      />
    </Link>
  );
}