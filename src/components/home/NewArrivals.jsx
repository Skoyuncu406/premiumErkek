"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { products } from "@/data/products";
import useShopStore from "@/store/useShopStore";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   NEW ARRIVALS
========================================================= */

export default function NewArrivals() {
  const sectionRef = useRef(null);

  /* ---------------------------------------------------------
     FEATURED PRODUCTS
  --------------------------------------------------------- */

  const newProducts = products.filter((product) => product.isNew);

  const featuredProducts =
    newProducts.length >= 4 ? newProducts.slice(0, 4) : products.slice(0, 4);

  /* =========================================================
     GSAP / SCROLLTRIGGER
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(
        "[data-new-arrival-image]",
        section,
      );

      if (!images.length) return;

      const mm = gsap.matchMedia();

      /* =====================================================
         REDUCED MOTION
      ====================================================== */

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(images, {
          opacity: 1,
          scale: 1,
          y: 0,
        });
      });

      /* =====================================================
         DESKTOP ANIMATION
      ====================================================== */

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const animations = images.map((image, index) => {
            return gsap.fromTo(
              image,
              {
                opacity: 0.42,

                scale: 1.06,

                y: 26,
              },
              {
                opacity: 1,

                scale: 1,

                y: 0,

                ease: "none",

                scrollTrigger: {
                  trigger: image,

                  /*
                    Her ürün çok küçük bir farkla
                    reveal olmaya başlar.
                  */

                  start: `top ${88 - index * 2}%`,

                  end: `top ${55 - index * 2}%`,

                  scrub: 0.8,

                  invalidateOnRefresh: true,
                },
              },
            );
          });

          return () => {
            animations.forEach((animation) => {
              animation.scrollTrigger?.kill();
              animation.kill();
            });
          };
        },
      );

      /* =====================================================
         MOBILE / TABLET ANIMATION
      ====================================================== */

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const animations = images.map((image) => {
            return gsap.fromTo(
              image,
              {
                opacity: 0.55,

                scale: 1.035,

                y: 16,
              },
              {
                opacity: 1,

                scale: 1,

                y: 0,

                ease: "none",

                scrollTrigger: {
                  trigger: image,

                  start: "top 92%",

                  end: "top 68%",

                  scrub: 0.55,

                  invalidateOnRefresh: true,
                },
              },
            );
          });

          return () => {
            animations.forEach((animation) => {
              animation.scrollTrigger?.kill();
              animation.kill();
            });
          };
        },
      );

      /* =====================================================
         REFRESH
      ====================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full

        bg-[var(--ares-background)]

        px-5
        py-16

        sm:px-8
        sm:py-20

        lg:min-h-screen
        lg:px-12
        lg:py-24

        xl:px-16

        2xl:px-20
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1680px]
        "
      >
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <div
          className="
            mb-10

            flex
            items-end
            justify-between

            gap-6

            sm:mb-12

            lg:mb-14
          "
        >
          {/* =================================================
              TITLE
          ================================================== */}

          <div>
            <p
              className="
                ares-eyebrow

                mb-3

                text-[9px]

                uppercase
                tracking-[0.18em]

                text-[var(--ares-muted)]

                sm:text-[10px]
              "
            >
              ARES / Selection
            </p>

            <h2
              className="
                font-editorial

                text-[clamp(2.6rem,8vw,4.5rem)]
                font-medium

                leading-[0.9]

                tracking-[-0.035em]

                text-[var(--ares-dark)]

                lg:text-[clamp(3.5rem,5vw,5.5rem)]
              "
            >
              New Arrivals
            </h2>
          </div>

          {/* =================================================
              DESKTOP ALL PRODUCTS
          ================================================== */}

          <div className="hidden sm:block">
            <AllProductsLink />
          </div>
        </div>

        {/* ===================================================
            PRODUCTS GRID
        ==================================================== */}

        <div
          className="
            grid

            grid-cols-2

            gap-x-3
            gap-y-10

            sm:gap-x-5
            sm:gap-y-12

            lg:grid-cols-4
            lg:gap-x-5
            lg:gap-y-0

            xl:gap-x-6
          "
        >
          {featuredProducts.map((product) => (
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
            mt-12

            flex
            justify-center

            sm:hidden
          "
        >
          <AllProductsLink />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT ITEM
========================================================= */

function ProductItem({ product }) {
  const favorites = useShopStore((state) => state.favorites);

  const toggleFavorite = useShopStore(
    (state) => state.toggleFavorite,
  );

  const isFavorite = favorites.some(
    (favorite) =>
      String(favorite.id) === String(product.id),
  );

  /* =========================================================
     FAVORITE
  ========================================================= */

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(product);
  };

  return (
    <article
      className="
        group
        relative
        min-w-0
      "
    >
      {/* =====================================================
          PRODUCT IMAGE

          GSAP yalnızca bu container'ı kontrol eder.

          Ürün:
          - adı
          - fiyatı
          - rengi
          - favori state'i

          animasyondan etkilenmez.
      ====================================================== */}

      <div
        data-new-arrival-image
        className="
          relative

          aspect-[3/4]

          w-full

          overflow-hidden

          bg-[var(--ares-background-soft)]

          will-change-[transform,opacity]
        "
      >
        {/* ===================================================
            IMAGE LINK
        ==================================================== */}

        <Link
          href={`/urunler/${product.slug}`}
          aria-label={`${product.name} ürününü görüntüle`}
          className="
            absolute
            inset-0
            z-0
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="
              (max-width: 639px) 50vw,
              (max-width: 1023px) 50vw,
              25vw
            "
            className="
              object-cover

              transition-transform
              duration-700

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

              text-[8px]
              font-semibold

              uppercase
              tracking-[0.16em]

              text-[var(--ares-dark)]

              sm:left-4
              sm:top-4
              sm:text-[9px]
            "
          >
            New
          </span>
        )}

        {/* ===================================================
            FAVORITE BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? "Favorilerden kaldır"
              : "Favorilere ekle"
          }
          className="
            absolute

            right-3
            top-3
            z-20

            flex
            h-8
            w-8

            items-center
            justify-center

            border-0

            bg-transparent

            text-[var(--ares-dark)]

            outline-none

            transition-transform
            duration-300

            hover:scale-110

            focus:outline-none
            focus-visible:outline-none

            sm:right-4
            sm:top-4
            sm:h-9
            sm:w-9
          "
        >
          <Heart
            size={18}
            strokeWidth={1.3}
            className={
              isFavorite
                ? "fill-[var(--ares-dark)]"
                : "fill-transparent"
            }
          />
        </button>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION

          Tamamen statik.
      ====================================================== */}

      <div className="pt-4 sm:pt-5">
        {/* ===================================================
            PRODUCT NAME
        ==================================================== */}

        <Link href={`/urunler/${product.slug}`}>
          <h3
            className="
              font-editorial

              text-[17px]
              font-medium

              leading-[1.1]

              tracking-[-0.015em]

              text-[var(--ares-dark)]

              transition-opacity
              duration-300

              hover:opacity-65

              sm:text-[19px]

              lg:text-[20px]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* ===================================================
            PRODUCT COLOR
        ==================================================== */}

        <p
          className="
            mt-2

            text-[9px]

            uppercase
            tracking-[0.12em]

            text-[var(--ares-muted)]

            sm:text-[10px]
          "
        >
          {product.color}
        </p>

        {/* ===================================================
            PRODUCT PRICE
        ==================================================== */}

        <p
          className="
            mt-3

            text-[11px]
            font-medium

            tracking-[0.02em]

            text-[var(--ares-dark)]

            sm:text-[12px]
          "
        >
          {formatPrice(product.price)}
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
      href="/urunler"
      className="
        group

        inline-flex
        items-center

        gap-3

        border-b
        border-[var(--ares-border-dark)]

        pb-2

        text-[9px]
        font-semibold

        uppercase
        tracking-[0.14em]

        text-[var(--ares-dark)]

        transition-colors
        duration-300

        hover:border-[var(--ares-gold)]

        sm:text-[10px]
      "
    >
      Tüm Ürünler

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

/* =========================================================
   PRICE FORMATTER
========================================================= */

function formatPrice(price) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}